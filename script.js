document.addEventListener('DOMContentLoaded', function() {
    const characteristics = [
        { title: 'Leadership Skills', description: 'Leadership is crucial for guiding and motivating the mentorship team towards common goals.' },
        { title: 'Communication Skills', description: 'Effective communication fosters clarity and understanding within the team and with mentees.' },
        { title: 'Organizational Abilities', description: 'Organizational skills are essential for planning and executing mentorship activities efficiently.' },
        { title: 'Empathy and Supportiveness', description: 'Empathy helps in understanding mentees\' perspectives and providing necessary support.' },
        { title: 'Adaptability and Problem-Solving Skills', description: 'Adaptability and problem-solving are key for handling unexpected challenges in mentorship.' },
        { title: 'Commitment and Dedication', description: 'Commitment ensures consistent effort towards achieving mentorship program goals.' },
        { title: 'Vision and Strategic Thinking', description: 'Vision and strategic thinking help in setting long-term goals and planning for growth.' },
        { title: 'Role Model and Integrity', description: 'Being a role model with integrity sets a positive example for mentees and peers.' }
    ];

    const dial = document.querySelector('.dial');
    const labels = document.querySelector('.labels');
    const centerDescription = document.querySelector('.description');

    const angleIncrement = 360 / characteristics.length;
    let isDragging = false;
    let startAngle = 0;
    let currentAngle = 0;

    // Create labels around the dial
    characteristics.forEach((char, index) => {
        const label = document.createElement('div');
        label.classList.add('label');
        label.style.transform = `rotate(${index * angleIncrement}deg)`;
        labels.appendChild(label);

        const span = document.createElement('span');
        span.textContent = char.title;
        label.appendChild(span);

        // Store description in custom data attribute
        label.dataset.description = char.description;
    });

    // Function to update the bolded label and center description
    function updateCurrentLabel() {
        const adjustedAngle = (currentAngle % 360 + 360) % 360;
        const currentLabelIndex = Math.round(adjustedAngle / angleIncrement) % characteristics.length;
        const labelsArray = document.querySelectorAll('.label');
        
        labelsArray.forEach((label, index) => {
            if (index === currentLabelIndex) {
                label.classList.add('bold');
                centerDescription.textContent = characteristics[index].description;
            } else {
                label.classList.remove('bold');
            }
        });
    }

    // Helper function to get the angle from the mouse event
    function getAngle(event, centerX, centerY) {
        return Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI);
    }

    // Event listeners for mouse interactions
    dial.addEventListener('mousedown', function(event) {
        isDragging = true;
        const rect = dial.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        startAngle = getAngle(event, centerX, centerY) - currentAngle;
    });

    document.addEventListener('mousemove', function(event) {
        if (isDragging) {
            const rect = dial.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const newAngle = getAngle(event, centerX, centerY);
            currentAngle = newAngle - startAngle;
            dial.style.setProperty('--angle', `${currentAngle}deg`);
            updateCurrentLabel();
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    document.addEventListener('mouseleave', function() {
        isDragging = false;
    })

    // Initial setup to ensure the first label is bolded and description is shown
    updateCurrentLabel();
});
