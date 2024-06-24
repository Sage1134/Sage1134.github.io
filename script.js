document.addEventListener('DOMContentLoaded', function() {
    const characteristics = [
        { title: 'Leadership', description: 'A good leader allows for the club\'s full potential to be utilized to benefit the school.' },
        { title: 'Communication', description: 'Clarity in communication ensures nothing is misunderstood when running an event.' },
        { title: 'Organization', description: 'Effective planning begins with organization. An unorganized event will not be successful!' },
        { title: 'Empathy', description: 'Understanding other\'s perspectives is the building block of planning excellent school events.' },
        { title: 'Adaptability', description: 'Being able to adapt to a situation ensures success even when an unforeseeable event occurs.' },
        { title: 'Commitment', description: 'A lack of commitment hinders upon all other important traits of being a mentor president.' },
        { title: 'Vision', description: 'Vision and strategic thinking help in setting long-term goals and planning for growth.' },
        { title: 'Role Model', description: 'Being a role model sets a positive example for those around you.' }
    ];

    const buttonsContainer = document.querySelector('.buttons-characteristics');
    const centerDescription = document.querySelector('.description-characteristics');

    const angleIncrement = (2 * Math.PI) / characteristics.length;
    const radius = 180; // Radius for button placement

    characteristics.forEach((char, index) => {
        const angle = index * angleIncrement;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        const button = document.createElement('button');
        button.classList.add('button-characteristics');
        button.textContent = char.title;

        button.style.position = 'absolute';
        button.style.left = `calc(50% + ${x}px - 50px)`;
        button.style.top = `calc(50% + ${y}px - 50px)`; // Adjusted top position for better alignment

        button.addEventListener('click', () => {
            centerDescription.textContent = char.description;
        });

        buttonsContainer.appendChild(button);
    });

    // Set the initial description to the default message
    centerDescription.textContent = 'Select a characteristic to view its importance.';
});



document.addEventListener('DOMContentLoaded', function() {
    const events = [
        { title: 'Interviews', description: 'Parent Teacher Interviews saw little success as mentor volunteers were poorly organized. Most mentors stayed at the back foyer, resulting in little help being provided around the rest of the school.' },
        { title: 'Steam Day', description: 'Although many mentors offered to help lead groups of grade 8s on STEAM day, many mentors backed out of the commitment last minute. This resulted in a scramble to find replacements.' },
        { title: 'School Tours', description: 'Throughout the year, many parents ask for tours of the school. Overall, the tours had some success, however not everyone was always available to give a tour.' },
        { title: 'Grade 8 Tour', description: 'The grade 8 tour at the end of semester 2 showed moderate success through well planned activities. Unfortunately some enthusiasm was lost by the mentors following the tour of the inside of the school.' },
        { title: 'Grade 8/9 Night', description: 'The grade 8/9 night was relatively successful as it was well planned and there were many mentors who volunteered to help tour the grade 8/9 groups.' },
        { title: 'Club Fair', description: 'A large number of clubs were displayed at the club fair this year. The variety of clubs this year was greater than the previous year, exemplifying growth and improvement.' },
        { title: 'Terry Fox Walk', description: 'Many mentor volunteers helped with the terry fox walk. All mentors showed great energy and effort, collectively resulting in a well run event!' },
        { title: 'Orientation Day', description: 'The grade 9 orientation day at the beginning of the year underwent tremendous planning ahead of time. This, coupled with the enthusiam of all the mentors resulted in an unforgettable orientation day for staff and students!' }
    ];

    const buttonsContainer = document.querySelector('.buttons-events');
    const descriptionBox = document.querySelector('.description-events');

    // Create buttons based on events
    events.forEach((event) => {
        const button = document.createElement('button');
        button.classList.add('button-events');
        button.textContent = event.title;

        // Store description in dataset for easy access
        button.dataset.description = event.description;

        button.addEventListener('click', () => {
            // Update description box with event description
            descriptionBox.textContent = event.description;
        });

        buttonsContainer.appendChild(button);
    });

    // Initial setup to show the default description
    descriptionBox.textContent = 'Select an event to view its details.';
});

document.addEventListener('DOMContentLoaded', function() {
    // Initial page to show
    showPage('page1');

    // Get references to navigation arrows
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    // Add click event listeners to navigation arrows
    leftArrow.addEventListener('click', function() {
        navigatePages(-1);
    });

    rightArrow.addEventListener('click', function() {
        navigatePages(1);
    });

    // Function to navigate between pages
    function navigatePages(direction) {
        let currentPage = getCurrentPageId();
        let nextPageId;

        switch (currentPage) {
            case 'page1':
                nextPageId = (direction === 1) ? 'page2' : 'page6';
                break;
            case 'page2':
                nextPageId = (direction === 1) ? 'page3' : 'page1';
                break;
            case 'page3':
                nextPageId = (direction === 1) ? 'page4' : 'page2';
                break;
            case 'page4':
                nextPageId = (direction === 1) ? 'page5' : 'page3';
                break;
            case 'page5':
                nextPageId = (direction === 1) ? 'page6' : 'page4';
                break;
            case 'page6':
                nextPageId = (direction === 1) ? 'page1' : 'page5';
                break;
            default:
                break;
        }

        hideAllPages();
        showPage(nextPageId);
    }

    // Function to get the ID of the current visible page
    function getCurrentPageId() {
        const pages = document.querySelectorAll('.page');
        for (let page of pages) {
            if (page.style.display === 'block') {
                return page.id;
            }
        }
        return null;
    }

    // Function to hide all pages
    function hideAllPages() {
        const pages = document.querySelectorAll('.page');
        for (let page of pages) {
            page.style.display = 'none';
        }
    }

    // Function to show a specific page
    function showPage(pageId) {
        document.getElementById(pageId).style.display = 'block';
    }
});
