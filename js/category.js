const dataLoad=async(url)=>{
    try{
        let res= await fetch(url)
        let data=await res.json()
        return data;
    }
    catch(err){
        return alert(err)
    }
}



const displayCategory=async(url)=>{
    let res=await dataLoad(url)
    let data=res.data.news_category
    let categoryContainer=document.getElementById('categorys')
    data.forEach(category=>{
        let {category_id,category_name}=category
        let Categorydiv=document.createElement('div')
        Categorydiv.innerHTML=`
        <button onclick="newsCard(${category_id},'${category_name}')">${category_name}</button>
        `
        categoryContainer.appendChild(Categorydiv)
    })
}
displayCategory(`https://openapi.programming-hero.com/api/news/categories`)


const newsCard=async(id,name)=>{
    document.getElementById('found-category').innerText=`${name}`
    let res=await dataLoad(`https://openapi.programming-hero.com/api/news/category/0${id}`)
    let data=res.data
    let cardContainer=document.getElementById('all-News-card')
    cardContainer.textContent=''
    
    let sorting=data.map(card=>card.total_view)
    sorting.sort(function(a, b){return b - a});
    console.log(sorting)
    data.forEach(card=>{
        document.getElementById('item-found').innerText=`${data.length}`
        let {author,image_url,details,total_view,_id,title,thumbnail_url}=card
        let div=document.createElement('div')
        div.classList.add('card', 'card-side', 'bg-base-100','shadow-xl', 'pl-5' ,'mb-5')
        div.innerHTML=`
                 <figure class="w-2/12"><img src="${thumbnail_url?thumbnail_url:`https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A=`}" alt="Movie" class="rounded-lg"></figure>
                    <div class="card-body w-10/12">
                      <h2 class="text-2xl font-semibold">${title?title:'Not Available'}</h2>
                      <p>${details?details.slice(0,400)+' ...':'Not available'}</p>
                      <div class="flex justify-between items-center pt-10">
                        <div class="flex items-center">
                            <div class="w-[70px] h-[70px] "><img src="${image_url?image_url:`https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A=`}" class="rounded-full w-full h-full object-cover" /></div>
                            <div class="pl-4">
                                <p class="font-semibold capitalize">${author.name?author.name:'Not Available'}</p>
                                <p class="text-slate-500">${author.published_date?author.published_date.slice(0,10):'Not Available'}</p>
                            </div>
                        </div>
                        <div  class="font-semibold text-lg">
                            <i class="fa-regular fa-eye"></i>
                            <span>${total_view?total_view:'Not Available'} views</span>
                        </div>
                        <div class="text-lg">
                            <i class="fa-solid fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <button class=""><i class="fa-solid fa-arrow-right text-xl"></i></button>
                      </div>
                    </div>
        `
        cardContainer.appendChild(div)
    })
   
    // sorting.forEach(a=>console.log(a))
}
newsCard(4,'Sports')