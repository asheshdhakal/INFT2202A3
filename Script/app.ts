"use strict";

(() => {

    /**
     * Binds click, mouseover , and mouseout events to anchor tags with class 'link' and a matching
     * data attribute. Applies CSS changes for visual feedback and handles link activation on click
     * @param link
     */
    function AddLinkEvents(link:string):void{
        let linkQuery = $(`a.link[data=${link}]`);
        //Removes all link events from the event queue
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");

        linkQuery.css("text-decoration","underline");
        linkQuery.css("color","blue");

        linkQuery.on("click",function (){
            LoadLink(`${link}`);
        });

        linkQuery.on("click",function (){
            $(this).css("cursor","pointer");
            $(this).css("font-weight","bold");
        });

        linkQuery.on("mouseout", function (){
            $(this).css("font-weight","normal");
        });



    }


    /**
     * Sets up event listeners for navigation links found within list items or the unordered list
     * Removes any existing clicks and mouseover events before re-establishing new ones to control
     * navigation behaviour and visual cues.
     * @constructor
     */
    function AddNavigationEvents():void{
        let navLinksExtra = $(".navbar-brand");
        let navlinks = $("ul>li>a");

        navLinksExtra.off("click");
        navLinksExtra.off("mouseover");

        navlinks.off("click");
        navlinks.off("mouseover");

        navlinks.on("click",function(){
            LoadLink($(this).attr("data") as string);
        });

        navLinksExtra.on("click",function(){
            LoadLink($(this).attr("data") as string);
        });

        navlinks.on("mouseover",function(){
            $(this).css("cursor","pointer")
        });

        navLinksExtra.on("mouseover",function(){
            $(this).css("cursor","pointer")
        });

    }

    /**
     * Updates the application current active link,manages authentication and updates browser history
     * It also updates the navigation UI to reflect the current active link and loads the corresponding content
     * @param link
     * @param data
     * @constructor
     */
    function LoadLink(link:string, data:string = ""):void{

        router.ActiveLink = link;

        AuthGuard();

        router.LinkData = data;

        history.pushState({},"",router.ActiveLink);

        document.title = CapitalizeFirstCharacter(router.ActiveLink);

        $("ul>li>a").each(function(){
            $(this).removeClass("active");
        });

        $(".navbar-brand").each(function(){
            $(this).removeClass("active");
        });

        $("li>a:contains(${document.title})").addClass("active");

        LoadContent();


    }

    function AuthGuard(){
        let protected_routes = ["contact-list"];

        if(protected_routes.indexOf(router.ActiveLink) >- 1) {

            if (!sessionStorage.getItem("user")) {
                router.ActiveLink = "login";
            }
        }
    }

    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(`<a id="logout" class="nav-link" href="#">
            <i class="fas fa-undo"></i> Logout</a>`);
        }

        $("#logout").on("click", function () {
            sessionStorage.clear();
            $("#login").html(`<a class="nav-link" href="#" 
            data="login"><i class="fas fa-sign-in-alt"></i> Login</a>`);
            LoadHeader();
            LoadLink("home");
        });

    }

    function ActiveLinkCallback():Function{
        switch(router.ActiveLink){

            case "login": return DisplayLoginPage;
            case "Feedback": return displayContactUs;
            case "EventList": return Eventlistpage;
            case "contact-list": return contactlistpage;
            default:
                console.error("ERROR: callback function does not exist " + router.ActiveLink);
                return new Function();
        }
    }

    function CapitalizeFirstCharacter(str:string){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function LoadHeader(){

        $.get("./views/components/header.html", function(html_data)
        {
            $("header").html(html_data);
            document.title = CapitalizeFirstCharacter(router.ActiveLink);

            $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current","page");

            AddNavigationEvents();
            CheckLogin();
        });
    }

    function LoadContent(){
        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallback();

        $.get(`./views/content/${page_name}.html`,function(html_data){
            $("main").html(html_data);
            CheckLogin();
            callback();
        });
    }

    function LoadFooter(){
        $.get("./views/components/footer.html", function(html_data){
            $("footer").html(html_data);
        });
    }

    function Start(){
        console.log("App Started...");

        LoadHeader();
        LoadLink("home");
        LoadFooter();



    }


    function checkLogin(): void {
        const user = sessionStorage.getItem("user");
        const loginLink = document.getElementById("login") as HTMLElement;
        if (user) {
            loginLink.innerHTML = '<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>';
            loginLink.onclick = () => {
                sessionStorage.clear();
                location.href = "index.html";
            };
        } else {
            loginLink.innerHTML = '<a class="nav-link" href="login.html"><i class="fas fa-sign-in-alt"></i> Login</a>';
        }
    }


    function DisplayLoginPage(): void {
        console.log("Called DisplayLogin()...");
        $("#loginButton").on("click", () => {
            let username = $("#username").val() as string;
            let password = $("#password").val() as string;
            let success = false;
            $.get("./Data/users.json", (data) => {
                data.users.forEach((user: any) => {
                    if (username === user.Username && password === user.Password) {
                        let userObj = {
                            DisplayName: user.DisplayName,
                            EmailAddress: user.EmailAddress,
                            Username: user.Username,
                            Password: user.Password
                        };
                        sessionStorage.setItem("user", JSON.stringify(userObj));
                        success = true;
                    }
                });
                if (success) {
                    $("#messageArea").removeClass("alert alert-danger").hide();
                    location.href = "feedbacklist.html";
                    LoadLink("contact-list");
                } else {
                    $("#username").trigger("focus").trigger("select");
                    $("#messageArea").addClass("alert alert-danger").text("Error: Invalid Credentials").show();
                }
            });
        });
        $("#cancelButton").on("click", () => {
            document.forms[0].reset();
            location.href = "index.html";
        });
    }

    function contactFormValidation(): boolean {
        let isValid = true;
        let fullNameValid = /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/.test($("#fullName").val() as string);
        let contactNumberValid = /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/.test($("#contactNumber").val() as string);
        let emailAddressValid = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/.test($("#emailAddress").val() as string);

        if (!fullNameValid) {
            $("#messageArea").addClass("alert alert-danger").text("Please enter a valid First and Last name!").show();
            isValid = false;
        } else if (!contactNumberValid) {
            $("#messageArea").addClass("alert alert-danger").text("Please enter a valid Contact number!").show();
            isValid = false;
        } else if (!emailAddressValid) {
            $("#messageArea").addClass("alert alert-danger").text("Please enter a valid Email address!").show();
            isValid = false;
        }
        return isValid;
    }

    function displayContactUs(): void {
        console.log("Called displayContactUs");
        $("#sendButton").click((event) => {
            event.preventDefault();
            if (!contactFormValidation()) {
                console.log("Form validation failed.");
                return;
            }
            console.log("Form validation passed.");
            let formData = {
                fullName: $("#fullName").val(),
                contactNumber: $("#contactNumber").val(),
                emailAddress: $("#emailAddress").val(),
                message: $("#message").val()
            };
            let feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
            feedbacks.push(formData);
            localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
            console.log("Feedback added:", formData.fullName, formData.contactNumber, formData.emailAddress, formData.message);
            alert("Thank you for your feedback!");
            $("#fullName").val('');
            $("#contactNumber").val('');
            $("#emailAddress").val('');
            $("#message").val('');
            location.href = "feedbacklist.html";
        });
    }

    $("#submitButton").click((event) => {
        event.preventDefault();
        console.log("Form validation passed.");
        let formData = {
            name: $("#EventName").val(),
            address: $("#contactNumberEvent").val(),
            emailAddress: $("#emailAddressEvent").val(),
            description: $("#EventDescription").val()
        };
        let feedbacks = JSON.parse(localStorage.getItem("Events") || "[]");
        feedbacks.push(formData);
        localStorage.setItem("Events", JSON.stringify(feedbacks));
        console.log("Event added:", formData.name, formData.address, formData.emailAddress, formData.description);
        $("#EventName").val('');
        $("#contactNumberEvent").val('');
        $("#emailAddressEvent").val('');
        $("#EventDescription").val('');
        window.location.href = "Eventslist.html";
    });

    function contactlistpage(): void {
        let feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
        if (feedbacks.length > 0) {
            let data = feedbacks.map((feedback: any, index: number) => `<tr>
                <td class="text-center">${index + 1}</td>
                <td>${feedback.fullName}</td>
                <td>${feedback.contactNumber}</td>
                <td>${feedback.emailAddress}</td>
                <td>${feedback.message}</td>
            </tr>`).join('');
            document.getElementById("contactlist")!.innerHTML = data;
        }
    }

    function Eventlistpage(): void {
        let feedbacks = JSON.parse(localStorage.getItem("Events") || "[]");
        if (feedbacks.length > 0) {
            let data = feedbacks.map((feedback: any, index: number) => `<tr>
                <td class="text-center">${index + 1}</td>
                <td>${feedback.name}</td>
                <td>${feedback.address}</td>
                <td>${feedback.emailAddress}</td>
                <td>${feedback.description}</td>
            </tr>`).join('');
            document.getElementById("Eventlist")!.innerHTML = data;
        }
    }

    function displayWelcomeMessage(): void {
        if (document.title === "Contact List") {
            if (!sessionStorage.getItem("welcomeMessageShown")) {
                let user = JSON.parse(sessionStorage.getItem("user") || "{}");
                if (user && user.DisplayName) {
                    let welcomeMessage = `Welcome, ${user.DisplayName}!`;
                    $("main.container").prepend(`<div class='alert alert-success' id='welcomeMessage'>${welcomeMessage}</div>`);
                    sessionStorage.setItem("welcomeMessageShown", "true");
                    setTimeout(() => {
                        $("#welcomeMessage").fadeOut();
                    }, 5000);
                }
            }
        }
    }



    window.addEventListener("load", Start)
})();
