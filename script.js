document.addEventListener("DOMContentLoaded", function() {
    introButton = document.getElementById("introButton");
    projectsButton = document.getElementById("projectsButton");
    contactButton = document.getElementById("contactButton");

    introButton.addEventListener("click", function() {
        scrollTo("#intro");
    })

    projectsButton.addEventListener("click", function() {
        scrollTo("#projects");
    })

    contactButton.addEventListener("click", function() {
        scrollTo("#bottom");
    })

    function scrollTo(targetSelector) {
        var targetElement = document.querySelector(targetSelector);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: "smooth"
            });
        }
    }
})