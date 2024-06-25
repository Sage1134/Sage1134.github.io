const whooshSound = document.getElementById('whooshSound');

document.addEventListener('DOMContentLoaded', function() {
    const characteristics = [
        { title: 'Leadership', description: 'A good leader allows for the club\'s full potential to be utilized to benefit the school.' },
        { title: 'Communication', description: 'Clarity in communication ensures nothing is misunderstood when running an event.' },
        { title: 'Organization', description: 'Effective planning begins with organization. An unorganized event will not be successful!' },
        { title: 'Empathy', description: 'Understanding other\'s perspectives is the building block of planning excellent school events.' },
        { title: 'Adaptability', description: 'Being able to adapt to a situation ensures success even when an unforeseeable event occurs.' },
        { title: 'Commitment', description: 'A lack of commitment hinders upon all other important traits of being a mentor president.' },
        { title: 'Vision', description: 'A compelling vision guides the club towards impactful long-term goals and inspires its members.' },
        { title: 'Role Model', description: 'Being a role model exemplifies integrity, dedication, and positive influence for the entire school community.' }
    ];

    const buttonsContainer = document.querySelector('.buttons-characteristics');
    const centerDescription = document.querySelector('.description-characteristics');
    const angleIncrement = (2 * Math.PI) / characteristics.length;
    const radius = 155;

    characteristics.forEach((char, index) => {
        const angle = index * angleIncrement;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        const button = document.createElement('button');
        button.classList.add('button-characteristics');
        button.textContent = char.title;
        button.style.position = 'absolute';
        button.style.left = `calc(50% + ${x}px - 43px)`;
        button.style.top = `calc(50% + ${y}px - 43px)`;

        button.addEventListener('click', () => {
            centerDescription.textContent = char.description;
        });

        buttonsContainer.appendChild(button);
    });

    centerDescription.textContent = 'Select a characteristic to view its importance.';
});

document.addEventListener('DOMContentLoaded', function() {
    const events = [
        { title: 'Interviews', description: 'Parent-Teacher Interviews saw limited success due to poorly organized mentor volunteers. Most mentors remained in the back foyer, resulting in insufficient support across the rest of the school.' },
        { title: 'Steam Day', description: 'Many grade 8 students were initially excited about STEAM day. However, there was some disappointment when some mentors withdrew last minute, causing a scramble to find replacements that were less prepared.' },
        { title: 'School Tours', description: 'Throughout the year, many parents requested tours of the school. While generally successful, availability of tour guides was sometimes limited.' },
        { title: 'Grade 8 Tour', description: 'The grade 8 tour at the end of semester 2 showed moderate success as a result of well planned activities. Unfortunately some enthusiasm was lost by the mentors after the tours of the inside of the school.' },
        { title: 'Grade 8/9 Night', description: 'The Grade 8/9 Night was successful, thanks to in depth planning and enthusiastic mentor participation in guiding groups. The groups lead by the mentors showed appreciation to the support from the group leaders.' },
        { title: 'Club Fair', description: 'A large number of clubs were displayed at the club fair this year. The variety of clubs this year was greater than the previous year, exemplifying growth and improvement.' },
        { title: 'Terry Fox Walk', description: 'Many mentor volunteers contributed to the Terry Fox Walk with great energy and effort, resulting in a very well-executed event. The encouragement from the mentors motivated participants to complete the walk.' },
        { title: 'Orientation Day', description: 'The grade 9 orientation day at the beginning of the year underwent a lot of planning ahead of time. This, coupled with the enthusiasm of all the mentors resulted in an unforgettable orientation day for staff and students!' }
    ];

    const buttonsContainer = document.querySelector('.buttons-events');
    const descriptionBox = document.querySelector('.description-events');

    events.forEach((event) => {
        const button = document.createElement('button');
        button.classList.add('button-events');
        button.textContent = event.title;
        button.dataset.description = event.description;

        button.addEventListener('click', () => {
            descriptionBox.textContent = event.description;
        });

        buttonsContainer.appendChild(button);
    });

    descriptionBox.textContent = 'Select an event to view its details.';
});

document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    let currentIndex = 0;

    // Show the initial page
    pages[currentIndex].classList.add('active');

    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    leftArrow.addEventListener('click', function() {
        whooshSound.play();
        navigatePages(-1);
    });

    rightArrow.addEventListener('click', function() {
        whooshSound.play();
        navigatePages(1);
    });

    function navigatePages(direction) {
        const nextPageIndex = (currentIndex + direction + pages.length) % pages.length;
        
        // Check boundaries
        if (nextPageIndex < 0 || nextPageIndex >= pages.length) {
            return; // Do nothing if trying to go out of bounds
        }
        
        // Slide out the current page
        pages[currentIndex].classList.remove('active');
        pages[currentIndex].classList.add(direction === 1 ? 'previous' : 'next');

        // Slide in the next page
        pages[nextPageIndex].classList.add('active');
        pages[nextPageIndex].classList.remove('previous', 'next');

        currentIndex = nextPageIndex;

        // Manage arrow visibility
        manageArrowVisibility();
    }
    
    // Function to manage arrow visibility based on current page index
    function manageArrowVisibility() {
        if (currentIndex === 0) {
            leftArrow.style.display = 'none';
        } else {
            leftArrow.style.display = 'flex';
        }

        if (currentIndex === pages.length - 1) {
            rightArrow.style.display = 'none';
        } else {
            rightArrow.style.display = 'flex';
        }
    }

    // Manage arrow visibility
    manageArrowVisibility();
});