const loadCategory=async()=>{
    const res= await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data= await res.json()
    const category= data.data
    displayCategory(category)

}
const displayCategory=(category)=>{
    const tabContainer= document.getElementById('tab-container')
    tabContainer.textContent=''
    category.forEach(catagories=>{
        // console.log(catagories)
        const catagoriesDiv= document.createElement('div')
        catagoriesDiv.innerHTML=`
        <a onclick=" handleLoadVideo('${catagories.category_id}')" class="bg-[#2525251A] rounded px-4 lg:px-5 py-2 text-sm  lg:text-lg text-[#252525B2] font-semibold">${catagories.category}</a> 
        `
        tabContainer.appendChild(catagoriesDiv)
    })
}
const handleLoadVideo=async(categoryId)=>{
    const res= await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json()
    const video= data.data
    handleDisplayVideo(video)
    
}
const handleDisplayVideo=(video)=>{
    // console.log('video')
    const videoContainer=document.getElementById('video-container')
    videoContainer.textContent=''
    video.forEach(videos=>{
        console.log(videos)
        const videoDiv=document.createElement('div')
        videoDiv.innerHTML=`
        <div class="px-3">
        <div class="mb-7">
            <img class="rounded-lg w-full h-[200px]" src="${videos.thumbnail}" alt="">
        </div>
        <div class="flex gap-3">
            <img class="w-10 h-10  rounded-full" src="${videos.authors[0].profile_picture}" alt="">
            <div>
                <h3 class="text-base text-[#171717] font-bold mb-2 w-[260px] mx-auto">${videos.title}</h3>
                <h5 class="text-sm text-[#111111B2] mb-2">${videos.authors[0].profile_name}</h5>
                <p class="text-sm text-[#111111B2]">${videos.others.views}</p>
            </div>
        </div>
    </div>
        `
        videoContainer.appendChild(videoDiv)
    })

}
loadCategory()
handleLoadVideo("1000")

