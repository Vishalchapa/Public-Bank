document.addEventListener('DOMContentLoaded', function () {
    //     //  Change the logo image when clicked
    //     const logo = document.getElementById('logo');
    //     logo.addEventListener('click', function() {
    //         this.src = 'path/to/another-logo.webp'; // Change to a different image
    //         this.alt = 'Silverstone New Logo';
    //     });

    //  1. Change the background color of a button on hover
    const aboutBtn = document.getElementById('about-btn');
    aboutBtn.addEventListener('mouseover', function () {
        this.style.backgroundColor = '#070753'; // Silver background on hover
        this.style.color = '#fff'; // White text on hover
    });
    aboutBtn.addEventListener('mouseout', function () {
        this.style.backgroundColor = '#676767'; // Reset background color
        this.style.color = '#34r222'; // Reset text color
    });
    // 2. Change the background color of a button on hover
    const investorrelationsBtn = document.getElementById('investor-relations-btn');
    investorrelationsBtn.addEventListener('mouseover', function () {
        this.style.backgroundColor = '#070753'; // Silver background on hover
        this.style.color = '#fff'; // White text on hover
    });
    investorrelationsBtn.addEventListener('mouseout', function () {
        this.style.backgroundColor = '#676767'; // Reset background color
        this.style.color = '#34r222'; // Reset text color
    });
    //  3. Change the background color of a button on hover
    const corporategovernanceBtn = document.getElementById('corporate-governance-btn');
    corporategovernanceBtn.addEventListener('mouseover', function () {
        this.style.backgroundColor = '#070753'; // Silver background on hover
        this.style.color = '#fff'; // White text on hover
    });
    corporategovernanceBtn.addEventListener('mouseout', function () {
        this.style.backgroundColor = '#676767'; // Reset background color
        this.style.color = '#34r222'; // Reset text color
    });
    // 4. Change the background color of a button on hover
    const newsBtn = document.getElementById('news-btn');
    newsBtn.addEventListener('mouseover', function () {
        this.style.backgroundColor = '#070753'; // Silver background on hover
        this.style.color = '#fff'; // White text on hover
    });
    newsBtn.addEventListener('mouseout', function () {
        this.style.backgroundColor = '#676767'; // Reset background color
        this.style.color = '#34r222'; // Reset text color
    });

    // small-card components 

    document.addEventListener('DOMContentLoaded', () => {
        const container = document.querySelector('.small-boxes');
        let scrollAmount = 6;
        const boxWidth = document.querySelector('.small-box').offsetWidth + 10; // Adjust based on your margin
        const scrollSpeed = 6; // Adjust this value to control the speed of scrolling

        function autoScroll() {
            scrollAmount += scrollSpeed;
            if (scrollAmount > container.scrollWidth - container.offsetWidth) {
                scrollAmount = 6; // Reset scroll amount to create infinite loop
            }
            container.style.transform = `translateX(-${scrollAmount}px)`;
            requestAnimationFrame(autoScroll);
        }

        autoScroll(); // Start auto-scrolling
    });
});