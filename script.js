const btn = document.querySelector("#btn")
const img = document.querySelector("#dogImg")
const errorMSG = document.querySelector("#errorMessage")
const download = document.querySelector("#download")

let currentImageUrl = ''

async function fetchDogImage() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random")
        const data = await response.json()
        
        currentImageUrl = data.message
        console.log(currentImageUrl)
 
        img.src = currentImageUrl
        errorMSG.textContent = "" 
        
        download.disabled = false
        
    } catch (error) {
        errorMSG.textContent = error.message
        download.disabled = true
    }
}

fetchDogImage()

btn.addEventListener("click", function() {
    fetchDogImage()
})

download.addEventListener("click", async function() {
    if (!currentImageUrl) {
        alert('No image to download!');
        return;
    }
    
    try {
        const response = await fetch(currentImageUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);   
        const urlParts = currentImageUrl.split('/');
        const breed = urlParts[urlParts.length - 2] || 'dog';
        const timestamp = new Date().getTime();
        const filename = `${breed}-${timestamp}.jpg`;
        
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(blobUrl);
        
    } catch (error) {
        console.error('Download failed:', error);
        alert('Failed to download image. Please try again.');
    }
})
