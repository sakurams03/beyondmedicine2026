// Animate the main title letters
const title = document.getElementById("main-title");

if (title) {
    // Get the HTML nodes to preserve <br> tags
    const contentNodes = Array.from(title.childNodes);
    title.innerHTML = "";

    let delay = 0;

    contentNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            for (let i = 0; i < text.length; i++) {
                const span = document.createElement("span");

                if (text[i] === " " || text[i] === "\n") {
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
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "BR") {
            title.appendChild(document.createElement("br"));
        }
    });
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
        const navbar = document.querySelector(".navbar");

        if (["careers", "science", "technology", "engineering", "mathematics", "explore"].includes(targetId)) {
            normalItems.forEach(item => item.classList.add("hidden-nav-item"));
            careersItems.forEach(item => item.classList.remove("hidden-nav-item"));
            hamburger.classList.add("hidden-nav-item");
            if (navbar) navbar.classList.add("careers-view");
        } else if (["home", "vision", "about", "references"].includes(targetId)) {
            normalItems.forEach(item => item.classList.remove("hidden-nav-item"));
            careersItems.forEach(item => item.classList.add("hidden-nav-item"));
            hamburger.classList.remove("hidden-nav-item");
            if (navbar) navbar.classList.remove("careers-view");
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

// Hero Carousel Logic
const carouselImages = document.querySelectorAll('.hero-carousel-img');
if (carouselImages.length > 0) {
    let currentImageIndex = 0;
    setInterval(() => {
        carouselImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
        carouselImages[currentImageIndex].classList.add('active');
    }, 4000); // 4 seconds per image
}

// Explore Button Logic
const exploreBtn = document.getElementById("explore-btn");
const pathwaysSection = document.getElementById("explore-pathways");

if (exploreBtn && pathwaysSection) {
    exploreBtn.addEventListener("click", () => {
        pathwaysSection.classList.add("active");
        exploreBtn.style.display = "none"; // Hide button once clicked
    });
}

// Pathway Cards Flip Logic
const pathwayCards = document.querySelectorAll(".pathway-card");
pathwayCards.forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
    });
});

// Home Page Quiz CTA Button
const homeQuizBtn = document.getElementById("home-quiz-btn");
if (homeQuizBtn) {
    homeQuizBtn.addEventListener("click", () => {
        const careersNavBtn = document.querySelector('.nav-btn[data-target="careers"]');
        if (careersNavBtn) {
            careersNavBtn.click();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
}

// Footer Navigation Logic
const footerLinks = document.querySelectorAll(".footer-link");
footerLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        const target = link.getAttribute("data-target");
        if (target) {
            e.preventDefault();
            // Reuse the existing navigation logic by finding the correct nav-btn
            const navBtn = document.querySelector(`.nav-btn[data-target="${target}"]`);
            if (navBtn) {
                navBtn.click();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
        // If no data-target (like Contact Us), let the natural link action (mailto:) happen
    });
});

// Footer Feedback Form
const feedbackForm = document.getElementById("feedback-form");
const feedbackStatus = document.getElementById("feedback-status");
const feedbackBtn = feedbackForm ? feedbackForm.querySelector(".feedback-submit-btn") : null;

if (feedbackForm) {
    feedbackForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // Prepare data
        const formData = new FormData(feedbackForm);
        
        // Show loading state
        if (feedbackBtn) {
            feedbackBtn.textContent = "...";
            feedbackBtn.disabled = true;
        }

        try {
            const response = await fetch(feedbackForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                feedbackStatus.classList.remove("hidden");
                feedbackForm.reset();
                setTimeout(() => {
                    feedbackStatus.classList.add("hidden");
                }, 5000);
            } else {
                alert("Oops! There was a problem sending your feedback.");
            }
        } catch (error) {
            alert("Oops! There was a problem sending your feedback.");
        } finally {
            if (feedbackBtn) {
                feedbackBtn.textContent = "Send";
                feedbackBtn.disabled = false;
            }
        }
    });
}

// ---- QUIZ LOGIC ----
const quizQuestions = [
    {
        question: "1. What kind of learner are you?",
        options: [
            { text: "📖 I love understanding how living things work", path: "bioscience" },
            { text: "🧪 I love practical lab experiments", path: "biotechnology" },
            { text: "🔧 I love making and building things", path: "bioengineering" },
            { text: "📊 I love solving problems with numbers", path: "biomathematics" }
        ]
    },
    {
        question: "2. What kind of career outcome excites you most?",
        options: [
            { text: "🌍 Understanding and protecting the natural world", path: "bioscience" },
            { text: "💊 Developing new medicines and treatments", path: "biotechnology" },
            { text: "🏥 Creating devices that help patients", path: "bioengineering" },
            { text: "📊 Using data to guide scientific decisions", path: "biomathematics" }
        ]
    },
    {
        question: "3. Which word describes you best?",
        options: [
            { text: "🔍 Curious; always asking why", path: "bioscience" },
            { text: "🧬 Innovative; always finding new solutions", path: "biotechnology" },
            { text: "⚙️ Practical; always trying building or fixing things", path: "bioengineering" },
            { text: "📈 Analytical ; always looking for patterns", path: "biomathematics" }
        ]
    },
    {
        question: "4. Where would you rather spend your working day?",
        options: [
            { text: "🌊 Out in nature ; field, ocean or wildlife reserve", path: "bioscience" },
            { text: "🏭 Inside a lab or biotech company", path: "biotechnology" },
            { text: "🏥 In a medical design studio", path: "bioengineering" },
            { text: "🖥️ At a desk working with data and models", path: "biomathematics" }
        ]
    },
    {
        question: "5. Which scientist's work inspires you most?",
        options: [
            { text: "🌊 David Attenborough — dedicating his life to documenting and protecting the natural world", path: "bioscience" },
            { text: "🧬 Jennifer Doudna — Nobel Prize winning biochemist who co-invented CRISPR gene editing", path: "biotechnology" },
            { text: "🦾 Robert Langer — biomedical engineer who revolutionized drug delivery and tissue engineering", path: "bioengineering" },
            { text: "📊 Florence Nightingale — pioneer who used statistical data to transform hospital healthcare", path: "biomathematics" }
        ]
    },
    {
        question: "6. Which news headline would you stop scrolling for?",
        options: [
            { text: "🦋 \"New species discovered in the Amazon rainforest\"", path: "bioscience" },
            { text: "💉 \"Scientists create breakthrough cancer treatment\"", path: "biotechnology" },
            { text: "🦾 \"Lab-grown organs ready for human transplant\"", path: "bioengineering" },
            { text: "📈 \"AI model predicts next pandemic 6 months early\"", path: "biomathematics" }
        ]
    },
    {
        question: "7. Which skill would you most want to master professionally?",
        options: [
            { text: "🔭 \"Advanced microscopy and species identification techniques\"", path: "bioscience" },
            { text: "🧫 \"Cell culture and genetic modification laboratory techniques\"", path: "biotechnology" },
            { text: "💡 \"CAD design and biomaterial engineering for medical implants\"", path: "bioengineering" },
            { text: "💻 \"Python programming and statistical modelling for biological data\"", path: "biomathematics" }
        ]
    },
    {
        question: "8. Which social media account would you follow?",
        options: [
            { text: "🦁 A field biologist documenting endangered species and ecosystems", path: "bioscience" },
            { text: "💊 A scientist sharing lab discoveries and breakthroughs", path: "biotechnology" },
            { text: "🤖 An engineer showcasing medical tech innovations", path: "bioengineering" },
            { text: "📈 A data analyst explaining science through statistics", path: "biomathematics" }
        ]
    },
    {
        question: "9. What do you spend your free time watching on YouTube?",
        options: [
            { text: "🌊 Wildlife and nature documentaries", path: "bioscience" },
            { text: "🧪 Science experiment and discovery channel", path: "biotechnology" },
            { text: "🤖 Engineering and tech innovation videos", path: "bioengineering" },
            { text: "💻 Data science and coding tutorials", path: "biomathematics" }
        ]
    },
    {
        question: "10. Which university module sounds most fascinating to you?",
        options: [
            { text: "🐠 \"Marine Ecology and Conservation — studying ocean biodiversity and reef systems\"", path: "bioscience" },
            { text: "🧬 \"Molecular Biology and Genomics — understanding how genes control life\"", path: "biotechnology" },
            { text: "⚙️ \"Biomechanics and Tissue Engineering — designing biological replacement parts\"", path: "bioengineering" },
            { text: "📐 \"Epidemiology and Biostatistics — using numbers to understand population health\"", path: "biomathematics" }
        ]
    }
];

const pathsInfo = {
    bioscience: {
        name: "Bioscience",
        desc: "Where curiosity meets discovery to understand the living world around us.",
        color: "#3498db"
    },
    biotechnology: {
        name: "Biotechnology",
        desc: "Where biology meets technology to create solutions that transform medicine, food, and the environment.",
        color: "#9b59b6" 
    },
    bioengineering: {
        name: "Bioengineering",
        desc: "Where biology meets engineering to design and build the medical innovations of tomorrow.",
        color: "#e74c3c"
    },
    biomathematics: {
        name: "Biomathematics",
        desc: "Where biology meets mathematics to solve the world's most complex scientific problems.",
        color: "#2ecc71"
    }
};

let currentQuestion = 0;
let userAnswers = [];

const quizContent = document.getElementById("quiz-content");
const progressBar = document.getElementById("quiz-progress-bar");
const questionCounter = document.getElementById("question-counter");
const progressPercentage = document.getElementById("progress-percentage");
const quizArea = document.getElementById("quiz-area");
const quizResult = document.getElementById("quiz-result");

function loadQuestion() {
    if (!quizContent) return;
    
    quizContent.innerHTML = "";
    // Trigger tiny animation by resetting opacity
    quizContent.style.opacity = 0;
    setTimeout(() => { quizContent.style.opacity = 1; }, 50);

    const qData = quizQuestions[currentQuestion];
    
    const qTitle = document.createElement("h3");
    qTitle.textContent = qData.question;
    qTitle.className = "quiz-question-title";
    quizContent.appendChild(qTitle);
    
    const optionsContainer = document.createElement("div");
    optionsContainer.className = "quiz-options-container";
    
    qData.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.className = "quiz-option-btn";
        btn.textContent = opt.text;
        btn.onclick = () => handleOptionClick(opt.path);
        optionsContainer.appendChild(btn);
    });
    
    quizContent.appendChild(optionsContainer);
    
    updateProgress();
}

function handleOptionClick(path) {
    // Disable all buttons in the container to prevent multiple clicks
    const buttons = quizContent.querySelectorAll(".quiz-option-btn");
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.7";
        btn.style.cursor = "default";
    });

    userAnswers.push(path);
    currentQuestion++;
    
    // Update progress immediately after click
    updateProgress();

    if (currentQuestion < quizQuestions.length) {
        // Short delay before loading next question for better UX
        setTimeout(() => {
            loadQuestion();
        }, 300);
    } else {
        // QUIZ FINISHED - Show loading state
        setTimeout(() => {
            quizArea.classList.add("hidden");
            const quizLoader = document.getElementById("quiz-loading");
            if (quizLoader) quizLoader.classList.remove("hidden");
            
            // Show results after a slightly longer delay for the loading effect
            setTimeout(() => {
                showResults();
            }, 2500); // 2.5 second loading period
        }, 500); 
    }
}

function updateProgress() {
    // Ensure the percentage is exactly 100 at the end
    const percentage = Math.min(((currentQuestion) / quizQuestions.length) * 100, 100);
    const progressBar = document.getElementById("quiz-progress-bar");
    if (progressBar) progressBar.style.width = `${percentage}%`;
    
    // Update labels
    const displayIndex = currentQuestion < quizQuestions.length ? currentQuestion + 1 : quizQuestions.length;
    const questionCounter = document.getElementById("question-counter");
    const progressPercentage = document.getElementById("progress-percentage");
    if (questionCounter) questionCounter.textContent = `Question ${displayIndex} of ${quizQuestions.length}`;
    if (progressPercentage) progressPercentage.textContent = `${Math.round(percentage)}%`;
}

function showResults() {
    const quizLoader = document.getElementById("quiz-loading");
    if (quizLoader) quizLoader.classList.add("hidden");
    
    if (quizResult) quizResult.classList.remove("hidden");
    
    // Calculate Mode 
    const counts = {};
    let maxCount = 0;
    let resultPath = "bioscience"; // Default fallback
    
    for (const path of userAnswers) {
        counts[path] = (counts[path] || 0) + 1;
        if (counts[path] > maxCount) {
            maxCount = counts[path];
            resultPath = path;
        }
    }
    
    const pInfo = pathsInfo[resultPath];
    const resultName = document.getElementById("result-path-name");
    const resultDesc = document.getElementById("result-path-desc");
    if (resultName) {
        resultName.textContent = pInfo.name;
        resultName.style.color = pInfo.color;
    }
    if (resultDesc) resultDesc.textContent = pInfo.desc;
    
    const highlightBox = document.getElementById("result-highlight-box");
    if (highlightBox) highlightBox.style.borderTopColor = pInfo.color;
    
    // Set target section
    const exploreBtn = document.getElementById("explore-path-btn");
    let targetSection = "science";
    if (resultPath === "biotechnology") targetSection = "technology";
    if (resultPath === "bioengineering") targetSection = "engineering";
    if (resultPath === "biomathematics") targetSection = "mathematics";
    
    if (exploreBtn) {
        exploreBtn.onclick = () => {
            const targetNavBtn = document.querySelector(`.nav-btn[data-target="${targetSection}"]`);
            if(targetNavBtn) targetNavBtn.click();
        };
    }
    
    const retakeBtn = document.getElementById("retake-quiz-btn");
    if (retakeBtn) {
        retakeBtn.onclick = () => {
            currentQuestion = 0;
            userAnswers = [];
            
            // Explicitly clear previous result text
            const resultName = document.getElementById("result-path-name");
            const resultDesc = document.getElementById("result-path-desc");
            if (resultName) resultName.textContent = "";
            if (resultDesc) resultDesc.textContent = "";
            
            // Reset Progress Bar to 0
            updateProgress();
            
            if (quizResult) quizResult.classList.add("hidden");
            if (quizArea) quizArea.classList.remove("hidden");
            loadQuestion();
        };
    }
}

// Initial load check
if (document.getElementById("quiz-area")) {
    loadQuestion();
}