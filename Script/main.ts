/**
 * Created by Ashesh and Fouzaan
 * student id are: 100886468 and 100857977
 * date of completion is 26-01-2023
 *
 */
let slideIndex: number = 0;

interface BlogData {
    title: string;
    imageSrc: string;
    summary: string;
    link: string;
}

const blogdata: BlogData[] = [
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
]

/**
 * This is a function which will show the slide show of the images
 */
function showSlides(): void {
    let i: number;
    const slides: HTMLCollectionOf<Element> = document.getElementsByClassName("mySlides");

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        (slides[i] as HTMLElement).style.display = "none";
    }

    // Move to the next slide
    slideIndex++;

    // If at the end of the slides, start from the first slide
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // Display the current slide
    (slides[slideIndex - 1] as HTMLElement).style.display = "block";

    // Change slide every 5 seconds
    setTimeout(showSlides, 3000);
}

// Portfolio Page

document.addEventListener("DOMContentLoaded", function () {
    showSlides();
});

document.addEventListener("DOMContentLoaded", function () {


    const projectList: JQuery<HTMLElement> = $("#project-list");
    const loadMoreButton: JQuery<HTMLElement> = $("#load-more");

    let projectsData: {title: string, description: string, imageSrc: string}[] = [
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

    const projectsPerPage: number = 4;
    let projectsToShow: {title: string, description: string, imageSrc: string}[] = projectsData.slice(0, projectsPerPage);

    function createProjectCard(project: {title: string, description: string, imageSrc: string}): JQuery<HTMLElement> {
        const card: JQuery<HTMLElement> = $("<div>").addClass("project-card");
        card.html(`
            <img src="${project.imageSrc}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `);
        return card;
    }

    function renderProjects(projects: {title: string, description: string, imageSrc: string}[]): void {
        $.each(projects, function(index, project) {
            const card: JQuery<HTMLElement> = createProjectCard(project);
            projectList.append(card);
        });
    }

    function loadMoreProjects(): void {
        const remainingProjects: {title: string, description: string, imageSrc: string}[] = projectsData.slice(projectsToShow.length, projectsToShow.length + projectsPerPage);
        projectsToShow = projectsToShow.concat(remainingProjects);

        renderProjects(remainingProjects);

        if (projectsToShow.length === projectsData.length) {
            loadMoreButton.hide();
        }
    }

    loadMoreButton.on("click", loadMoreProjects);
    renderProjects(projectsToShow);

    const projectJokes: HTMLElement | null = document.getElementById("project-joke-lists");

    function createJokeCard(joke: {setup: string, delivery: string}): HTMLElement {
        const card: HTMLElement = document.createElement("div");
        card.className = "project-joke-card";
        card.innerHTML = `
            <h3>${joke.setup}</h3>
            <p>${joke.delivery}</p>
        `;
        return card;
    }

    function fetchDataFromAPI(apiUrl: string): JQuery.jqXHR<any> {
        return $.ajax({
            url: apiUrl,
            method: 'GET',
            dataType: 'json'
        });
    }

    function renderJokes(jokes: {setup: string, delivery: string}[]): void {
        jokes.forEach(joke => {
            if (joke?.setup != undefined || joke?.delivery != undefined ) {
                const card: HTMLElement = createJokeCard(joke);
                if (projectJokes) projectJokes.appendChild(card);
            }

        });
    }

    function getJokes(): JQuery.PromiseBase<{
        setup: string;
        delivery: string
    }[], never, never, never, never, never, never, never, never, never, never, never> {
        var apiUrl: string = 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?amount=20';
        return fetchDataFromAPI(apiUrl).then(function(data: { jokes: { setup: string; delivery: string }[] }) {
            return data.jokes || [];
        });
    }

    getJokes().then(function(jokes) {
        renderJokes(jokes);
    }).catch(function(error) {
        console.error('Error fetching API data:', error);
    });

    // const projectQuotes = document.getElementById("project-quotes-lists");
    //
    // function createQuoteCard(quote) {
    //     const card = document.createElement("div");
    //     card.className = "project-card-quote";
    //     card.innerHTML = `
    //         <h3>${quote.text}</h3>
    //         <p>${quote.author || 'Unknown'}</p>
    //     `;
    //     return card;
    // }
    //
    // function fetchDataFromAPIQ(apiUrl) {
    //     return $.ajax({
    //         url: apiUrl,
    //         method: 'GET',
    //         dataType: 'json'
    //     });
    // }
    //
    // function renderQuotes(quotes) {
    //     quotes.forEach(quote => {
    //         const card = createQuoteCard(quote);
    //         projectQuotes.appendChild(card);
    //     });
    // }
    //
    // function getQuotes() {
    //     var apiUrl = 'https://type.fit/api/quotes';
    //     return fetchDataFromAPIQ(apiUrl).then(function(data) {
    //         console.log(data)
    //         return data || [];
    //     });
    // }
    //
    // getQuotes().then(function(quotes) {
    //     renderQuotes(quotes);
    // }).catch(function(error) {
    //     console.error('Error fetching API data:', error);
    // });

});





document.addEventListener("DOMContentLoaded", function () {
    // Your existing JavaScript code

    // Function to show service details in the modal
    /**
     * Function to show service details in the modal
     * @param serviceNumber the index of the modal
     */
    function showServiceModal(serviceNumber: number): void {
        // Define service details
        const services: { title: string, description: string }[] = [
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

        // Populate modal content
        document.getElementById(`serviceModalLabel${serviceNumber}`)!.innerText = service.title;
        document.getElementById(`serviceModalContent${serviceNumber}`)!.innerHTML = `
            <h1>${service.title}</h1>
            <p>${service.description}</p>
        `;

        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById(`serviceModal${serviceNumber}`)!);
        modal.show();
    }

    /**
     *
     * @param ShowTeamModal the index of the team modal
     */
    function showTeamModal(ShowTeamModal: number): void {
        const TeamMembers: { title: string, description: string, Projects: { [key: string]: string } }[] = [
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

        // Populate modal content
        document.getElementById(`TeamMemberModalLable${ShowTeamModal}`)!.innerText = Team.title;
        document.getElementById(`TeamMemberModalContent${ShowTeamModal}`)!.innerHTML = `
            <h1>${Team.title}</h1>
            <p>${Team.description}</p>
            <h2>Projects:</h2>
            <ul>
                ${Object.entries(Team.Projects).map(([day, timing]) => `<li>${day}: ${timing}</li>`).join('')}
            </ul>
        `;

        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById(`teamModal${ShowTeamModal}`)!);
        modal.show();


    }
    // Attach click event listeners to service tabs
    document.querySelectorAll('.service-tab').forEach((tab, index) => {
        tab.addEventListener('click', () => showServiceModal(index + 1));
    });
    document.querySelectorAll('.team-member').forEach((tab, index) => {
        tab.addEventListener('click', () => showTeamModal(index + 1));
    });

});

/**
 * An IIFY function doing the modification of dom elements
 */
(function() {

    document.addEventListener("DOMContentLoaded", function () {
        // Dynamically add 'Careers' link
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
        navbarLinks?.appendChild(EventLink)
        const navbarLinksgal = document.querySelector(".navbar-nav");
        navbarLinks?.appendChild(GalleryLink)
        const navbarHumorLink = document.querySelector(".navbar-nav");
        navbarLinks?.appendChild(HumorLink)
        const navbaraloginLink = document.querySelector(".navbar-nav");
        navbarLinks?.appendChild(LoginLink)

        // Programmatically change 'Blog' link to 'News'
        const blogLink = document.querySelector(".nav-link[href='blog.html']");
        if (blogLink) {
            blogLink.innerHTML = '<i class="fa-solid fa-newspaper"></i> News';
        }


    });
})();


document.addEventListener("DOMContentLoaded", function () {
    const user = sessionStorage.getItem("user");
    const loginLink = document.getElementById("login") as HTMLAnchorElement | null;
    if (user) {
        const DynaLink = document.querySelector(".nav-link[href='login.html']") as HTMLAnchorElement | null;
        if (DynaLink) {
            DynaLink.innerHTML = '<i class="fa-solid fa-newspaper"></i> logout';
            DynaLink.onclick = function() {
                sessionStorage.clear();
                location.href = "index.html";
            };
        }
    } else {
        if (loginLink) {
            loginLink.innerHTML = '<a class="nav-link" href="login.html"><i class="fas fa-sign-in-alt"></i> Login</a>';
        }
    }
});

// main.js

// Function to create the footer element
/**
 * Function to create the footer element
 */
function createFooter(): void {
    // Create footer element
    const footer = document.createElement("footer");
    footer.className = "bg-dark text-white mt-5 fixed-bottom";

    // Create navbar inside the footer
    const navbar = document.createElement("nav");
    navbar.className = "navbar navbar-expand-lg bg-body-tertiary";

    // Create container inside the navbar
    const container = document.createElement("div");
    container.className = "container-fluid";

    // Create button for toggling navigation
    const button = document.createElement("button");
    button.className = "navbar-toggler";
    button.type = "button";
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", "#navbarSupportedContent");
    button.setAttribute("aria-controls", "navbarSupportedContent");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Toggle navigation");

    // Create span for the toggler icon
    const span = document.createElement("span");
    span.className = "navbar-toggler-icon";

    // Appending the span to the button
    button.appendChild(span);

    // Appending the button to the container
    container.appendChild(button);

    // Create navbar content inside the container
    const navbarContent = document.createElement("div");
    navbarContent.className = "collapse navbar-collapse";
    navbarContent.id = "navbarSupportContent";

    // Create unordered list inside the navbar content
    const ul = document.createElement("ul");
    ul.className = "navbar-nav me-auto mb-2 mb-lg-0";

    // Create list items for the navbar links
    const navItems = [
        { text: "Privacy Policy", icon: "fa-shield-halved", href: "privacypolicy.html" },
        { text: "Terms of Service", icon: "fa-envelope-open-text", href: "termsofservice.html" },
        { text: "Feedback", icon: "fa-inbox", href: "./feedback.html" },
    ];

    // Loop through the navItems and create list items
    navItems.forEach((item) => {
        const li = document.createElement("li");
        li.className = "nav-item";

        const a = document.createElement("a");
        a.className = "nav-link";
        a.href = item.href;

        const icon = document.createElement("i");
        icon.className = `fa-solid ${item.icon}`;

        const text = document.createTextNode(` ${item.text}`);

        // Appending the icon and text to the link
        a.appendChild(icon);
        a.appendChild(text);

        // Appending the link to the list item
        li.appendChild(a);

        // Appending the list item to the unordered list
        ul.appendChild(li);
    });

    // Appending the unordered list to the navbar content
    navbarContent.appendChild(ul);

    // Appending the navbar content to the container
    container.appendChild(navbarContent);

    // Appending the container to the navbar
    navbar.appendChild(container);

    // Appending the navbar to the footer
    footer.appendChild(navbar);

    // Appending the footer to the body
    document.body.appendChild(footer);
}

// Call the createFooter function to generate and append the footer
createFooter();

/**
 * Validation for the Contact Form, and submission and redirection.
 * @returns {boolean}
 */
function validateForm(): boolean {
    // Get form inputs
    let fullName = (document.getElementById('fullName') as HTMLInputElement).value;
    let subject = (document.getElementById('subject') as HTMLInputElement).value;
    let emailAddress = (document.getElementById('emailAddress') as HTMLInputElement).value;
    let message = (document.getElementById('message') as HTMLInputElement).value;

    // Check if required fields are empty
    if (fullName === '' || subject === '' || emailAddress === '' || message === '') {
        alert('Please fill in all required fields.');
        return false;
    }

    // Check email format
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
        alert('Please enter a valid email address.');
        return false;
    } else {
        if (confirm('Thank you for your submission! You will be redirected to the Home page in 5 seconds.')) {
            setTimeout(function () {
                window.location.href = './index.html';
            }, 5000);
        }
    }
    return false;
}
// Define a function to handle the retrieved data
function handleData(data: { title: string; description: string }[]) {
    // Iterate through each item in the response data
    data.forEach((item) => {
        // Create HTML elements to display title and description
        const title = '<h2>' + item.title + '</h2>';
        const description = '<p>' + item.description + '</p>';

        // Append title and description to the #api-data div
        $('#project-card-joke').append(title + description);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = $("#search-input");
    const searchResults = $("#search-results");

    displayResults(blogdata);

    // Event listener for search input
    if (searchInput) {
        searchInput.on("input", function() {
            const query = searchInput.val()?.toString().trim().toLowerCase(); // Type assertion used
            if (query !== undefined) { // Check if query is defined
                const filteredResults = filterResults(blogdata, query);
                displayResults(filteredResults);
            }
        });
    }



    // Function to filter results based on search query
    function filterResults(results: { title: string; imageSrc: string; summary: string }[], query: string) {
        if (!query) {
            return results; // If no query, return all results
        }
        return results.filter(function(result) {
            return result.title.toLowerCase().includes(query);
        });
    }

    // Function to display results
    function displayResults(results: { title: string; imageSrc: string; summary: string }[]) {
        searchResults.empty();
        if (results.length > 0) {
            results.forEach(function(result) {
                const resultElement = $("<div>").addClass("result-card");
                resultElement.html(`
                    <img src="${result.imageSrc}" alt="${result.title}">
                    <h3>${result.title}</h3>
                    <p>${result.summary}</p>
                `);
                searchResults.append(resultElement);
            });
        } else {
            searchResults.html("<p>No results found.</p>");
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const galleryItems = document.querySelectorAll(".gallery-item img");
    const lightbox = document.querySelector(".lightbox") as HTMLElement | null;
    const lightboxImg = document.querySelector(".lightbox-img") as HTMLImageElement | null;
    const closeBtn = document.querySelector(".close-btn") as HTMLElement | null;
    const prevBtn = document.querySelector(".prev-btn") as HTMLElement | null;
    const nextBtn = document.querySelector(".next-btn") as HTMLElement | null;

    let currentIndex = 0;

    // Open lightbox when clicking on thumbnail
    galleryItems.forEach((item, index) => {
        item.addEventListener("click", function() {
            currentIndex = index;
            showImage(index);
            if (lightbox) lightbox.style.display = "block";
        });
    });

    // Close lightbox when clicking close button
    if (closeBtn) {
        closeBtn.addEventListener("click", function() {
            if (lightbox) lightbox.style.display = "none";
        });
    }

    // Show previous image
    if (prevBtn) {
        prevBtn.addEventListener("click", function() {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            showImage(currentIndex);
        });
    }

    // Show next image
    if (nextBtn) {
        nextBtn.addEventListener("click", function() {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            showImage(currentIndex);
        });
    }

    // Show image in lightbox
    function showImage(index: number) {
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

document.addEventListener("DOMContentLoaded", function() {
    const storedData = localStorage.getItem("Events");
    let feedbacks: { name: string; address: string; description: string }[] = storedData ? JSON.parse(storedData) : [];
    if (feedbacks.length > 0) {
        displayEvents(feedbacks);
    }



    // Function to display events as cards
    function displayEvents(events: { name: string; address: string; description: string }[]) {
        const eventCards = $('#event-cards');
        eventCards.empty(); // Clear existing event cards

        events.forEach(function(event) {
            const card = createEventCard(event);
            eventCards.append(card);
        });
    }

    // Function to create an event card
    function createEventCard(event: { name: string; address: string; description: string }) {
        const card = $('<div>').addClass('event-card');
        const cardContent = `
            <div class="event-card-content">
                <h3 class="event-title">${event.name}</h3>
                <p class="event-address">${event.address}</p>
                <p class="event-description">${event.description}</p>
            </div>
        `;
        card.html(cardContent);
        return  card;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Fetch JSON data
    fetch('./../Data/graphData.json')
        .then(response => response.json())
        .then((data: { label: string; value: number }[]) => {
            const labels = data.map(bar => bar.label);
            const values = data.map(bar => bar.value);
            console.log(labels);
            // Render the bar graph
            const ctx = (document.getElementById('barChart') as HTMLCanvasElement).getContext('2d');
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
        .then((data: { label: string; value: number }[]) => {
            const labels = data.map(bar => bar.label);
            const values = data.map(bar => bar.value);
            console.log(labels);
            // Render the bar graph
            const ctx = (document.getElementById('PieChart') as HTMLCanvasElement).getContext('2d');
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
        .then((data: { label: string; value: number }[]) => {
            const labels = data.map(bar => bar.label);
            const values = data.map(bar => bar.value);
            console.log(labels);
            // Render the bar graph
            const ctx = (document.getElementById('viewChartChart') as HTMLCanvasElement).getContext('2d');
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
