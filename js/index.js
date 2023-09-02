let currentData = [];

const loadCategory = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await res.json()
    const category = data.data
    displayCategory(category)

}
const displayCategory = (category) => {
    const tabContainer = document.getElementById('tab-container')
    tabContainer.textContent = ''
    category.forEach(catagories => {
        // console.log(catagories)
        const catagoriesDiv = document.createElement('div')
        catagoriesDiv.innerHTML = `
        <a onclick=" handleLoadVideo('${catagories.category_id}')" class="bg-[#2525251A] rounded px-4 lg:px-5 py-2 text-sm  lg:text-lg text-[#252525B2] font-semibold">${catagories.category}</a> 
        `
        tabContainer.appendChild(catagoriesDiv)
    })
}
const handleLoadVideo = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json()
    const video = data.data
    currentData = video
    handleDisplayVideo(video)

}
const handleDisplayVideo = (video) => {
    const noDataContainer = document.getElementById('no-data-container')
    if (video.length === 0) {
        noDataContainer.classList.add('flex')
        noDataContainer.classList.remove('hidden')
    }
    else {
        noDataContainer.classList.add('hidden')
        noDataContainer.classList.remove('flex')
    }

    const videoContainer = document.getElementById('video-container')
    videoContainer.textContent = ''
    video.forEach(videos => {
        console.log(videos)
        const videoDiv = document.createElement('div')
        videoDiv.innerHTML = `
        <div class="px-5 lg:px-0">
        <div class="relative">
            <img class="rounded-lg w-full h-[200px]" src="${videos.thumbnail}" alt="">
       ${videos.others.posted_date && `<div class="absolute bottom-2 right-2 text-xs text-[#FFF] bg-[#171717] rounded p-1 ">
            <p class="">${secondsConversion(videos.others.posted_date)}</p>
            </div>` }
        </div>
        <div class="flex gap-3 mt-7">
            <img class="w-10 h-10 rounded-full" src="${videos.authors[0].profile_picture}" alt="">
            <div>
                <h3 class="text-base text-[#171717] font-bold mb-2 w-[260px] mx-auto">${videos.title}</h3>
                <div class="flex gap-2 items-center mb-2">
                <h5 class="text-sm text-[#111111B2]">${videos.authors[0].profile_name}</h5>
               ${videos.authors[0].verified ? '<img src="./image/fi_10629607.svg" alt="">' : ''}
                </div>
                <p class="text-sm text-[#111111B2]">${videos.others.views}</p>
            </div>
        </div>
    </div>
        `
        videoContainer.appendChild(videoDiv)
    })

}
const sortByLoad = () => {
    const sortedData = currentData.sort((a, b) => {
        const v1 = parseFloat(a.others.views)
        const v2 = parseFloat(b.others.views)

        return v2 - v1;
    })

    handleDisplayVideo(sortedData)
}
const secondsConversion = (second) => {
    const hours = Math.floor(second / 3600)
    const remainingSeconds = (second % 3600)
    const minute = Math.floor(remainingSeconds / 60)
    return `${hours}hrs ${minute} mins ago`
}
loadCategory()
handleLoadVideo("1000")

