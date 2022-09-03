const dataLoad=async(url)=>{
    try{
        let res= await fetch(url)
        let data=await res.json()
        return data;
    }
    catch(err){
        console.log(err)
    }
}


// add a spinner
const showSpinner=(display)=>{
    let elements=document.getElementById('spinner')
   if(display===true){
    elements.classList.remove('hidden')
   }
   else{
    elements.classList.add('hidden')
   }
}