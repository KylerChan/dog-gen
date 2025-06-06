const btn = document.querySelector("#btn")
const img = document.querySelector("#dogImg")
const errorMSG = document.querySelector("#errorMessage")

async function fetchDogImage() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random")
        const data = await response.json()
        
        const imageUrl = data.message
        console.log(imageUrl)
 
        img.src = imageUrl
        errorMSG.textContent = "" // Clear previous errors
        
    } catch (error) {
        errorMSG.textContent = error.message
    }
}

fetchDogImage()

btn.addEventListener("click", function() {
    fetchDogImage()
})