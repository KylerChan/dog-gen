# Dog Image Generator

A simple web application that generates random dog images using the Dog CEO API.

## Features

- 🐕 Fetches random dog images from the Dog CEO API
- 🎨 Clean, modern UI built with Tailwind CSS
- 📱 Responsive design that works on all devices
- ⚡ Fast loading with error handling
- 🔄 Click to generate new random dog images

## Demo

The app displays a random dog image on page load and allows users to generate new random dog images by clicking the "Generate" button.

## Technologies Used

- **HTML5** - Structure and markup
- **CSS** - Styling with Tailwind CSS (via CDN)
- **JavaScript** - Fetching data from API and DOM manipulation
- **Dog CEO API** - Source for random dog images

## Project Structure

```
dog-gen/
├── index.html    # Main HTML file with UI structure
└── script.js     # JavaScript for API calls and interactions
```

## How It Works

1. The app automatically loads a random dog image when the page loads
2. Users can click the "Generate" button to fetch a new random dog image
3. The app uses the [Dog CEO API](https://dog.ceo/dog-api/) to fetch random dog images
4. Error handling displays messages if the API request fails

## Getting Started

1. Clone or download the project files
2. Open `index.html` in your web browser
3. Click "Generate" to get new random dog images!

## API Reference

This project uses the Dog CEO API:
- **Endpoint**: `https://dog.ceo/api/breeds/image/random`
- **Method**: GET
- **Response**: JSON object with a random dog image URL

## Browser Compatibility

This app works in all modern browsers that support:
- ES6+ JavaScript (async/await, fetch API)
- CSS Grid and Flexbox

## License

This project is open source and available under the MIT License
        
