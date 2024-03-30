"use strict";
let slideIndex = 0;
const blogdata = [
    {
        "title": "Empowering Local Communities Through Volunteerism",
        "imageSrc": "./images/blogvolunteer.jpg",
        "summary": "Explore the impact of volunteer work in building stronger local communities. Learn about inspiring stories and initiatives that make a difference.",
        "link": "article1.html"
    },
    {
        "title": "Community Gardening: Cultivating Unity and Sustainability",
        "imageSrc": "./images/bloggardening.jpg",
        "summary": "Discover the positive impact of community gardening on fostering unity and sustainability. Learn about the benefits and success stories of communal green spaces.",
        "link": "article2.html"
    },
    {
        "title": "Digital Inclusion: Bridging Gaps in Community Connectivity",
        "imageSrc": "./images/blogdigitalinclusion.jpg",
        "summary": "Explore how digital inclusion initiatives are bridging gaps in community connectivity. Learn about programs that empower individuals through technology.",
        "link": "article3.html"
    }
];
function showSlides() {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000);
}
document.addEventListener("DOMContentLoaded", function () {
    showSlides();
});
document.addEventListener("DOMContentLoaded", function () {
    const projectList = $("#project-list");
    const loadMoreButton = $("#load-more");
    let projectsData = [
        {
            title: "Kids Coding Camp",
            description: "Harmony Hub's Kids Coding Camp introduces young minds to the fun of coding through games and creative projects, making technology an exciting learning experience for our little ones.",
            imageSrc: "./images/kidscodingcamp.jpg"
        },
        {
            title: "Community Garden Makeover",
            description: "Join us in transforming a local community garden into a green oasis where neighbors come together to nurture plants and build a stronger sense of community. Let's cultivate connections and green thumbs!",
            imageSrc: "./images/communitygarden.jpg"
        },
        {
            title: "Neighbor Support Initiative",
            description: "Harmony Hub's Neighbor Support Initiative focuses on small acts of kindness within our community. Whether it's running errands or a friendly chat, join our neighborly network and make a positive impact.",
            imageSrc: "./images/neighborsupport.jpg"
        },
        {
            title: "Tech Basics Workshop",
            description: "Harmony Hub's Tech Basics Workshop makes technology easy for everyone in the community. From smartphones to email, let's navigate the digital world together with practical skills.",
            imageSrc: "./images/techbasicsworkshop.jpg"
        },
        {
            title: "Local Art Showcase",
            description: "Experience the vibrant talent of our community in Harmony Hub's Local Art Showcase. From paintings to sculptures, join us in celebrating the creativity that makes our neighborhood unique.",
            imageSrc: "./images/localartshowcase.jpg"
        }
    ];
    const projectsPerPage = 4;
    let projectsToShow = projectsData.slice(0, projectsPerPage);
    function createProjectCard(project) {
        const card = $("<div>").addClass("project-card");
        card.html(`
            <img src="${project.imageSrc}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `);
        return card;
    }
    function renderProjects(projects) {
        $.each(projects, function (index, project) {
            const card = createProjectCard(project);
            projectList.append(card);
        });
    }
    function loadMoreProjects() {
        const remainingProjects = projectsData.slice(projectsToShow.length, projectsToShow.length + projectsPerPage);
        projectsToShow = projectsToShow.concat(remainingProjects);
        renderProjects(remainingProjects);
        if (projectsToShow.length === projectsData.length) {
            loadMoreButton.hide();
        }
    }
    loadMoreButton.on("click", loadMoreProjects);
    renderProjects(projectsToShow);
    const projectJokes = document.getElementById("project-joke-lists");
    function createJokeCard(joke) {
        const card = document.createElement("div");
        card.className = "project-joke-card";
        card.innerHTML = `
            <h3>${joke.setup}</h3>
            <p>${joke.delivery}</p>
        `;
        return card;
    }
    function fetchDataFromAPI(apiUrl) {
        return $.ajax({
            url: apiUrl,
            method: 'GET',
            dataType: 'json'
        });
    }
    function renderJokes(jokes) {
        jokes.forEach(joke => {
            if (joke?.setup != undefined || joke?.delivery != undefined) {
                const card = createJokeCard(joke);
                if (projectJokes)
                    projectJokes.appendChild(card);
            }
        });
    }
    function getJokes() {
        var apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?amount=20';
        return fetchDataFromAPI(apiUrl).then(function (data) {
            return data.jokes || [];
        });
    }
    getJokes().then(function (jokes) {
        renderJokes(jokes);
    }).catch(function (error) {
        console.error('Error fetching API data:', error);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    function showServiceModal(serviceNumber) {
        const services = [
            {
                title: "Art Corner",
                description: "Immerse yourself in the world of creativity at our Art Corner. Express your artistic side through painting, drawing, and crafts. Unleash your imagination in a welcoming space designed for everyone to enjoy."
            },
            {
                title: "Relaxation Sessions",
                description: "Take a break and join our Relaxation Sessions to unwind and rejuvenate. From guided meditation to calming activities, these sessions provide a peaceful retreat from daily stresses. Embrace tranquility and find your moment of serenity."
            },
            {
                title: "Green Living Workshops",
                description: "Discover sustainable living through our Green Living Workshops. Learn practical tips for an eco-friendly lifestyle, from recycling practices to energy-saving techniques. Join us in building a greener and healthier community together."
            }
        ];
        const service = services[serviceNumber - 1];
        document.getElementById(`serviceModalLabel${serviceNumber}`).innerText = service.title;
        document.getElementById(`serviceModalContent${serviceNumber}`).innerHTML = `
            <h1>${service.title}</h1>
            <p>${service.description}</p>
        `;
        const modal = new bootstrap.Modal(document.getElementById(`serviceModal${serviceNumber}`));
        modal.show();
    }
    function showTeamModal(ShowTeamModal) {
        const TeamMembers = [
            {
                title: "Fozaan",
                description: "WEBD DEVELOPER",
                Projects: {
                    ProjectAlpha: "Developed a responsive website for a client in the healthcare industry.",
                    ProjectBeta: "Implemented new features and optimizations for an e-commerce platform."
                }
            },
            {
                title: "Asish Dhakal",
                description: "Graphics designer",
                Projects: {
                    ProjectX: "Organized and conducted weekly reading sessions for children in a safe environment.",
                    ProjectY: "Collaborated with local schools to promote literacy through interactive storytelling."
                }
            },
            {
                title: "Billy Joel",
                description: "Content writer",
                Projects: {
                    ProjectM: "Hosted gaming nights and events to foster a sense of community among students.",
                    ProjectN: "Facilitated study group sessions with resources and support for academic success."
                }
            }
        ];
        const Team = TeamMembers[ShowTeamModal - 1];
        document.getElementById(`TeamMemberModalLable${ShowTeamModal}`).innerText = Team.title;
        document.getElementById(`TeamMemberModalContent${ShowTeamModal}`).innerHTML = `
            <h1>${Team.title}</h1>
            <p>${Team.description}</p>
            <h2>Projects:</h2>
            <ul>
                ${Object.entries(Team.Projects).map(([day, timing]) => `<li>${day}: ${timing}</li>`).join('')}
            </ul>
        `;
        const modal = new bootstrap.Modal(document.getElementById(`teamModal${ShowTeamModal}`));
        modal.show();
    }
    document.querySelectorAll('.service-tab').forEach((tab, index) => {
        tab.addEventListener('click', () => showServiceModal(index + 1));
    });
    document.querySelectorAll('.team-member').forEach((tab, index) => {
        tab.addEventListener('click', () => showTeamModal(index + 1));
    });
});
(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const careersLink = document.createElement("li");
        careersLink.classList.add("nav-item");
        careersLink.innerHTML = '<a class="nav-link" href="careers.html"><i class="fa-solid fa-briefcase"></i> Careers</a>';
        const GalleryLink = document.createElement("li");
        GalleryLink.classList.add("nav-item");
        GalleryLink.innerHTML = '<a class="nav-link" href="Gallery1.html"><i class="fa-solid fa-image"></i> Gallery </a>';
        const HumorLink = document.createElement("li");
        HumorLink.classList.add("nav-item");
        HumorLink.innerHTML = '<a class="nav-link" href="Humour.html"><i class="fa-solid fa-face-smile"></i> Humour </a>';
        const EventLink = document.createElement("li");
        EventLink.classList.add("nav-item");
        EventLink.innerHTML = '<a class="nav-link" href="Events.html"><i class="fa-solid fa-calendar-days"></i> Events </a>';
        const LoginLink = document.createElement("li");
        LoginLink.classList.add("nav-item");
        LoginLink.innerHTML = '<a class="nav-link fas fa-sign-in-alt" id="login" href="login.html"></a>';
        const navbarLinks = document.querySelector(".navbar-nav");
        navbarLinks?.appendChild(careersLink);
        const navbareventLink = document.querySelector(".navbar-nav");
        navbarLinks?.appendChild(EventLink);
        const navbarLinksgal = document.querySelector(".navbar-nav");
        navbarLinks?.appendChild(GalleryLink);
        const navbarHumorLink = document.querySelector(".navbar-nav");
        navbarLinks?.appendChild(HumorLink);
        const navbaraloginLink = document.querySelector(".navbar-nav");
        navbarLinks?.appendChild(LoginLink);
        const blogLink = document.querySelector(".nav-link[href='blog.html']");
        if (blogLink) {
            blogLink.innerHTML = '<i class="fa-solid fa-newspaper"></i> News';
        }
    });
})();
document.addEventListener("DOMContentLoaded", function () {
    const user = sessionStorage.getItem("user");
    const loginLink = document.getElementById("login");
    if (user) {
        const DynaLink = document.querySelector(".nav-link[href='login.html']");
        if (DynaLink) {
            DynaLink.innerHTML = '<i class="fa-solid fa-newspaper"></i> logout';
            DynaLink.onclick = function () {
                sessionStorage.clear();
                location.href = "index.html";
            };
        }
    }
    else {
        if (loginLink) {
            loginLink.innerHTML = '<a class="nav-link" href="login.html"><i class="fas fa-sign-in-alt"></i> Login</a>';
        }
    }
});
function createFooter() {
    const footer = document.createElement("footer");
    footer.className = "bg-dark text-white mt-5 fixed-bottom";
    const navbar = document.createElement("nav");
    navbar.className = "navbar navbar-expand-lg bg-body-tertiary";
    const container = document.createElement("div");
    container.className = "container-fluid";
    const button = document.createElement("button");
    button.className = "navbar-toggler";
    button.type = "button";
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", "#navbarSupportedContent");
    button.setAttribute("aria-controls", "navbarSupportedContent");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Toggle navigation");
    const span = document.createElement("span");
    span.className = "navbar-toggler-icon";
    button.appendChild(span);
    container.appendChild(button);
    const navbarContent = document.createElement("div");
    navbarContent.className = "collapse navbar-collapse";
    navbarContent.id = "navbarSupportContent";
    const ul = document.createElement("ul");
    ul.className = "navbar-nav me-auto mb-2 mb-lg-0";
    const navItems = [
        { text: "Privacy Policy", icon: "fa-shield-halved", href: "privacypolicy.html" },
        { text: "Terms of Service", icon: "fa-envelope-open-text", href: "termsofservice.html" },
        { text: "Feedback", icon: "fa-inbox", href: "./feedback.html" },
    ];
    navItems.forEach((item) => {
        const li = document.createElement("li");
        li.className = "nav-item";
        const a = document.createElement("a");
        a.className = "nav-link";
        a.href = item.href;
        const icon = document.createElement("i");
        icon.className = `fa-solid ${item.icon}`;
        const text = document.createTextNode(` ${item.text}`);
        a.appendChild(icon);
        a.appendChild(text);
        li.appendChild(a);
        ul.appendChild(li);
    });
    navbarContent.appendChild(ul);
    container.appendChild(navbarContent);
    navbar.appendChild(container);
    footer.appendChild(navbar);
    document.body.appendChild(footer);
}
createFooter();
function validateForm() {
    let fullName = document.getElementById('fullName').value;
    let subject = document.getElementById('subject').value;
    let emailAddress = document.getElementById('emailAddress').value;
    let message = document.getElementById('message').value;
    if (fullName === '' || subject === '' || emailAddress === '' || message === '') {
        alert('Please fill in all required fields.');
        return false;
    }
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
        alert('Please enter a valid email address.');
        return false;
    }
    else {
        if (confirm('Thank you for your submission! You will be redirected to the Home page in 5 seconds.')) {
            setTimeout(function () {
                window.location.href = './index.html';
            }, 5000);
        }
    }
    return false;
}
function handleData(data) {
    data.forEach((item) => {
        const title = '<h2>' + item.title + '</h2>';
        const description = '<p>' + item.description + '</p>';
        $('#project-card-joke').append(title + description);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = $("#search-input");
    const searchResults = $("#search-results");
    displayResults(blogdata);
    if (searchInput) {
        searchInput.on("input", function () {
            const query = searchInput.val()?.toString().trim().toLowerCase();
            if (query !== undefined) {
                const filteredResults = filterResults(blogdata, query);
                displayResults(filteredResults);
            }
        });
    }
    function filterResults(results, query) {
        if (!query) {
            return results;
        }
        return results.filter(function (result) {
            return result.title.toLowerCase().includes(query);
        });
    }
    function displayResults(results) {
        searchResults.empty();
        if (results.length > 0) {
            results.forEach(function (result) {
                const resultElement = $("<div>").addClass("result-card");
                resultElement.html(`
                    <img src="${result.imageSrc}" alt="${result.title}">
                    <h3>${result.title}</h3>
                    <p>${result.summary}</p>
                `);
                searchResults.append(resultElement);
            });
        }
        else {
            searchResults.html("<p>No results found.</p>");
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".gallery-item img");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeBtn = document.querySelector(".close-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    let currentIndex = 0;
    galleryItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            currentIndex = index;
            showImage(index);
            if (lightbox)
                lightbox.style.display = "block";
        });
    });
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            if (lightbox)
                lightbox.style.display = "none";
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            showImage(currentIndex);
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            showImage(currentIndex);
        });
    }
    function showImage(index) {
        if (lightboxImg) {
            const imgUrl = galleryItems[index].getAttribute("src");
            const imgAlt = galleryItems[index].getAttribute("alt");
            if (imgUrl && imgAlt) {
                lightboxImg.setAttribute("src", imgUrl);
                lightboxImg.setAttribute("alt", imgAlt);
            }
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const storedData = localStorage.getItem("Events");
    let feedbacks = storedData ? JSON.parse(storedData) : [];
    if (feedbacks.length > 0) {
        displayEvents(feedbacks);
    }
    function displayEvents(events) {
        const eventCards = $('#event-cards');
        eventCards.empty();
        events.forEach(function (event) {
            const card = createEventCard(event);
            eventCards.append(card);
        });
    }
    function createEventCard(event) {
        const card = $('<div>').addClass('event-card');
        const cardContent = `
            <div class="event-card-content">
                <h3 class="event-title">${event.name}</h3>
                <p class="event-address">${event.address}</p>
                <p class="event-description">${event.description}</p>
            </div>
        `;
        card.html(cardContent);
        return card;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    fetch('./../Data/graphData.json')
        .then(response => response.json())
        .then((data) => {
        const labels = data.map(bar => bar.label);
        const values = data.map(bar => bar.value);
        console.log(labels);
        const ctx = document.getElementById('barChart').getContext('2d');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                            label: 'Yearly sales by K ',
                            data: values,
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                }
            });
        }
    })
        .catch(error => console.error('Error fetching data:', error));
    fetch('./../Data/pieData.json')
        .then(response => response.json())
        .then((data) => {
        const labels = data.map(bar => bar.label);
        const values = data.map(bar => bar.value);
        console.log(labels);
        const ctx = document.getElementById('PieChart').getContext('2d');
        if (ctx) {
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                            label: 'Yearly sales by K ',
                            data: values,
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                }
            });
        }
    })
        .catch(error => console.error('Error fetching data:', error));
    fetch('./../Data/viewChartData.json')
        .then(response => response.json())
        .then((data) => {
        const labels = data.map(bar => bar.label);
        const values = data.map(bar => bar.value);
        console.log(labels);
        const ctx = document.getElementById('viewChartChart').getContext('2d');
        if (ctx) {
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                            label: 'Yearly sales by K ',
                            data: values,
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                }
            });
        }
    })
        .catch(error => console.error('Error fetching data:', error));
});
//# sourceMappingURL=main.js.map