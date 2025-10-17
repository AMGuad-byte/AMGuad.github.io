// Get references to our HTML elements
const image = document.getElementById('my-image');
const resultsDiv = document.getElementById('results');

// This function will run once the page is fully loaded
window.onload = function() {
  
  // Load the MobileNet model.
  // mobilenet.load() returns a "promise", so we use .then() to wait for it to finish.
  mobilenet.load().then(model => {
    
    // Once the model is loaded, classify the image.
    model.classify(image).then(predictions => {
      
      console.log('Predictions: ', predictions); // You can still see the raw data in the console
      
      // Clear the "Loading..." message
      resultsDiv.innerHTML = '';
      
      // Loop through the predictions and display them on the page
      for (let i = 0; i < predictions.length; i++) {
        const prediction = predictions[i];
        
        // Create a new paragraph element for each prediction
        const p = document.createElement('p');
        
        // Format the text: "Cat: 90%"
        const confidence = Math.round(prediction.probability * 100);
        p.innerText = `${prediction.className}: ${confidence}% sure`;
        
        // Add the new paragraph to our results div
        resultsDiv.appendChild(p);
      }
    });
  });
};