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

const authorDetails=async(id)=>{
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

    console.log(data)
}


const showSpinner=(display)=>{
    let elements=document.getElementById('spinner')
   if(display===true){
    elements.classList.remove('hidden')
   }
   else{
    elements.classList.add('hidden')
   }
}