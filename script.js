// Animate the main title letters
const title = document.getElementById("main-title");

if (title) {
    // Get the text and clear it
    const text = title.textContent;
    title.innerHTML = "";

    let delay = 0;

    // Wrap each character in a <span> for letter animation
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement("span");

        if (text[i] === " ") {
            span.innerHTML = "&nbsp;"; // Preserve spaces
        } else {
            span.textContent = text[i];
        }

        span.classList.add("letter");
        span.style.animationDelay = `${delay}s`;
        title.appendChild(span);

        // Stagger animation delay
        delay += 0.05;
    }
}

// Navigation and Section Toggling Logic
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navBtns = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".page-section");

// Toggle menu open/close
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("toggle");
});

// Handle navigation clicks
navBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();

        // Close the menu when a link is clicked
        navLinks.classList.remove("active");
        hamburger.classList.remove("toggle");

        // Remove active class from all buttons and add to the clicked one
        navBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Get target section id
        const targetId = btn.getAttribute("data-target");

        // Dynamic Nav Swapping
        // Toggle normal items (including Home) and careers items based on target section
        const normalItems = document.querySelectorAll(".nav-item-normal");
        const careersItems = document.querySelectorAll(".nav-item-careers");

        if (["careers", "science", "technology", "engineering", "mathematics"].includes(targetId)) {
            normalItems.forEach(item => item.classList.add("hidden-nav-item"));
            careersItems.forEach(item => item.classList.remove("hidden-nav-item"));
            hamburger.classList.add("hidden-nav-item");
        } else if (["home", "vision", "about"].includes(targetId)) {
            normalItems.forEach(item => item.classList.remove("hidden-nav-item"));
            careersItems.forEach(item => item.classList.add("hidden-nav-item"));
            hamburger.classList.remove("hidden-nav-item");
        }

        // Hide all sections and show the target section
        sections.forEach(sec => {
            if (sec.id === targetId) {
                sec.classList.remove("hidden");
                sec.classList.add("active");
            } else {
                sec.classList.remove("active");
                sec.classList.add("hidden");
            }
        });
    });
});

// Accordion Toggle Logic
const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
        const accordionItem = header.parentElement;
        
        // Toggle active class on the clicked item
        accordionItem.classList.toggle("active");
    });
});