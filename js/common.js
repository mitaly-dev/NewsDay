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
    let data=res.data
    console.log(data)
}