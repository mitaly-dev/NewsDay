//all category
const displayCategory=async()=>{
    let res=await dataLoad(`https://openapi.programming-hero.com/api/news/categories`)
    let data=res.data.news_category
    let categoryContainer=document.getElementById('categorys')
    data.forEach(category=>{
        let {category_id,category_name}=category
        let Categorydiv=document.createElement('div')
        Categorydiv.innerHTML=`
        <button class="hover:text-red-500 outline-none border-b-2 border-transparent hover:border-red-700 pb-1 " onclick="newsCard(${category_id},'${category_name}')">${category_name}</button>
        `
        categoryContainer.appendChild(Categorydiv)
    })
}
displayCategory()


//all news card
const newsCard=async(id,name)=>{
    document.getElementById('not-found').innerText=''
    showSpinner(true)
    let cardContainer=document.getElementById('all-News-card')
    cardContainer.textContent=''
    document.getElementById('found-category').innerText=`${name}`
    let res=await dataLoad(`https://openapi.programming-hero.com/api/news/category/0${id}`)
    document.getElementById('item-found').innerText=`${res.data.length}`
  if(res.data.length==0){
    document.getElementById('not-found').innerText='Sorry,not found'
    showSpinner(false)
  }
  else{
    document.getElementById('not-found').innerText=''
  }
    let data=res.data
    data.sort(function(a,b){
      return b.total_view - a.total_view
    })
    console.log(data)
    data.forEach(card=>{
        let {author,image_url,details,total_view,_id,title,thumbnail_url,rating}=card
        let div=document.createElement('div')
        div.classList.add('card','card' ,'lg:card-side', 'bg-base-100','shadow-xl', 'md:pl-5' ,'mb-5')
        div.innerHTML=`
                 <figure class="w-full lg:w-2/12 lg:ml-7"><img src="${thumbnail_url?thumbnail_url:`https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A=`}" alt="Movie" class="rounded-lg"></figure>
                    <div class="card-body w-full lg:w-10/12 p-4 lg:pl-20 xl:p-14">
                      <h2 class="text-2xl font-semibold">${title?title:'Not Available'}</h2>
                      <p class="">${details?details.slice(0,400)+' ...':'Not available'}</p>
                      <div class="md:flex justify-between items-center md:pt-5">
                        <div class="flex items-center pt-5">
                            <div class="w-[70px] h-[70px] "><img src="${author.img?author.img:`https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A=`}" class="rounded-full w-full h-full object-cover" /></div>
                            <div class="pl-4">
                                <p class="font-semibold capitalize">${author.name?author.name:'Not Available'}</p>
                                <p class="text-slate-500">${author.published_date?author.published_date.slice(0,10):'Not Available'}</p>
                            </div>
                        </div>
                        <div  class="font-semibold text-lg pt-5">
                            <i class="fa-regular fa-eye"></i>
                            <span>${total_view?total_view:'Not Available'} views</span>
                        </div>
                        <div class="text-lg pt-5">
                            ${rating?
                            `<i class="fa-solid fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>`:"Not Available"}
                        </div>
                        <label onclick="newsDetails('${_id}')" for="my-modal-3" class="modal-button pt-5 float-right cursor-pointer"><i class="fa-solid fa-arrow-right text-xl text-violet-600"></i></label>
                        </div>
                    </div>
        `
        cardContainer.appendChild(div)
        showSpinner(false)
    })
}
newsCard(8,'All news')


// news details
const newsDetails=async(id)=>{
    let res=await dataLoad(`https://openapi.programming-hero.com/api/news/${id}`)
    let data=res.data[0]
    let {author,image_url,details,total_view,_id,title,thumbnail_url,rating,others_info}=data
    let modalBody=document.getElementById('modal-body')
    modalBody.innerHTML=`
    <figure class="mb-3"><img src="${thumbnail_url?thumbnail_url:`https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A=`}" alt="Movie" class="rounded-lg"></figure>
    <h3><span class="font-semibold">Title : </span>${title?title:'Not Available'}</h3>
    <h3><span class="font-semibold">Details : </span>${details?details.slice(0,200)+' ...':'Not available'}</h3>
    <div class="flex items-center py-5">
    <div class="w-[70px] h-[70px] "><img src="${author.img?author.img:`https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A=`}" class="rounded-full w-full h-full object-cover" /></div>
    <div class="pl-4">
    <h3><span class="font-semibold">Author Name : </span>${author.name?author.name:'Not Available'}</h3>
    <h3><span class="font-semibold">Published Date : </span>${author.published_date?author.published_date:'Not Available'}</h3>
    </div>
    </div>
    <h3><span class="font-semibold">Total View : </span>${total_view?total_view:'Not Available'}</h3>
    <div class="text-lg py-3">
    ${rating?
    `<i class="fa-solid fa-star-half-stroke"></i>
    <i class="fa-regular fa-star"></i>
    <i class="fa-regular fa-star"></i>
    <i class="fa-regular fa-star"></i>
    <i class="fa-regular fa-star"></i>`:"Not Available"}
    </div>
    <div class="flex justify-between">
    <h3><span class="font-semibold">is_todays_pick : </span>${others_info.is_todays_pick?'Today Pick':'Not Available'}</h3>
    <h3><span class="font-semibold">is_trending : </span>${others_info.is_trending?'Trending':'Not Available'}</h3>
    </div>
    `
}
