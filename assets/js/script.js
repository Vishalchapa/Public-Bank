document.addEventListener('DOMContentLoaded', function() {
//     //  Change the logo image when clicked
//     const logo = document.getElementById('logo');
//     logo.addEventListener('click', function() {
//         this.src = 'path/to/another-logo.webp'; // Change to a different image
//         this.alt = 'Silverstone New Logo';
//     });

    //  1. Change the background color of a button on hover
    const aboutBtn = document.getElementById('about-btn');
    aboutBtn.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#007BFF'; // Silver background on hover
        this.style.color = '#fff'; // White text on hover
    });
    aboutBtn.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#676767'; // Reset background color
        this.style.color = '#34r222'; // Reset text color
    });
    // 2. Change the background color of a button on hover
    const investorrelationsBtn = document.getElementById('investor-relations-btn');
    investorrelationsBtn.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#007BFF'; // Silver background on hover
        this.style.color = '#fff'; // White text on hover
    });
    investorrelationsBtn.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#676767'; // Reset background color
        this.style.color = '#34r222'; // Reset text color
    });
   // 3. Change the background color of a button on hover
    const newsBtn = document.getElementById('news-btn');
    newsBtn.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#007BFF'; // Silver background on hover
        this.style.color = '#fff'; // White text on hover
    });
    newsBtn.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#676767'; // Reset background color
        this.style.color = '#34r222'; // Reset text color
    });
});