const btn = document.querySelector("#btn")
const img = document.querySelector("#dogImg")
const errorMSG = document.querySelector("#errorMessage")
const downloadBtn = document.getElementById('download');
const downloadMenu = document.getElementById('menu-download');

let currentImageUrl = ''

async function fetchDogImage() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random")
        const data = await response.json()
        
        currentImageUrl = data.message
        console.log(currentImageUrl)
 
        img.src = currentImageUrl
        errorMSG.textContent = "" 
        
        downloadBtn.disabled = false
        
    } catch (error) {
        errorMSG.textContent = error.message
        downloadBtn.disabled = true
    }
}

fetchDogImage()

btn.addEventListener("click", function() {
    fetchDogImage()
})

downloadBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    downloadMenu.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
    if (!downloadBtn.contains(e.target) && !downloadMenu.contains(e.target)) {
        downloadMenu.classList.add('hidden');
    }
});

document.querySelectorAll('#menu-download button[data-size]').forEach(button => {
    button.addEventListener('click', async () => {
        try {
            const img = document.getElementById('dogImg');
            const response = await fetch(img.src);
            const blob = await response.blob();
            
            const fileType = button.textContent.trim().split(' ').pop().toLowerCase();
            const fileName = `dog-image.${fileType}`;
            
            const downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = fileName;
            
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            window.URL.revokeObjectURL(downloadLink.href);
            downloadMenu.classList.add('hidden');
        } catch (error) {
            console.error('Download failed:', error);
            alert('Failed to download image. Please try again.');
        }
    });
});
