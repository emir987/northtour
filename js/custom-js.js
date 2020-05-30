$('.owl-carousel').owlCarousel({
    dots: false,
    nav: true,
    responsiveClass: true,
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    loop: false,
    responsiveClass: true,
    autoplay: true,
    autoplayTimeout: 444000,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1,
        },
        768: {
            items: 2,
        },
        992: {
            items: 3,
        }
    }
})

$('.play').on('click', function () {
    owl.trigger('play.owl.autoplay', [1000])
})
$('.stop').on('click', function () {
    owl.trigger('stop.owl.autoplay')
})

//hamburger menu

$(document).ready(function () {
    $('#nav-icon1').click(function () {
        $(this).toggleClass('open');
    });
});


// validate form
$(document).ready(function () {




    const contactForm = document.getElementById('forma-kontakt');
    const subject = document.getElementById('predmet');
    const emailContact = document.getElementById('email-contact');
    const nameSurname = document.getElementById('ime-prezime');
    const message = document.getElementById('poruka');

    const subjectShow = document.getElementById('subject-show');
    const nameSurnameShow = document.getElementById('name-surname-show');
    const emailShow = document.getElementById('email-show');
    const messageShow = document.getElementById('message-show');


    const formNews = document.getElementById('newsletter');
    const emailNews = document.getElementById('emailNewsletter');

    formNews.addEventListener('submit', (e) => {
        e.preventDefault();

        let errorMessage = "";

        const activeLanguage = document.getElementsByClassName('active-lang')[0].id;

        if (activeLanguage == "cg") {
            errorMessage = "Unesite email"
        } else {
            errorMessage = "Enter your email"
        }
        //email validate
        if (!validateEmail(emailNews, errorMessage)) return;

        $('.modal-news-output').modal('show');

        formNews.reset();
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let errorMessages = {};
        let showMessages = {};

        const activeLanguage = document.getElementsByClassName('active-lang')[0].id;

        if (activeLanguage == "cg") {
            errorMessages = {
                "email": "Unesite email",
                "predmet": "Unesite predmet!",
                "imePrezime": "Unesite vaše ime i prezime",
                "message": "Unesite poruku"
            }
            showMessages = ["Predmet: ", "Ime: ", "Email: ", "Poruka: "]
        } else {
            errorMessages = {
                "email": "Input your email address",
                "predmet": "Input subject!",
                "imePrezime": "Enter your name and surname",
                "message": "Leave a message"
            }
            showMessages = ["Subject: ", "Name: ", "Email: ", "Message: "]

        }

        //subject validate
        if (!isEmpty(subject, errorMessages.predmet, 2)) return;

        //email validate
        if (!validateEmail(emailContact, errorMessages.email)) return;

        // name surname validate
        if (!validateNameSurname(nameSurname, errorMessages.imePrezime, 2)) return;

        //message validate
        if (!isEmpty(message, errorMessages.message, 8)) return;

        subjectShow.innerHTML = showMessages[0] + subject.value.trim();
        nameSurnameShow.innerHTML = showMessages[1] + nameSurname.value.trim();
        emailShow.innerHTML = showMessages[2] + emailContact.value.trim();
        messageShow.innerHTML = showMessages[3] + message.value.trim();

        $('.modal-output').modal('show');

        contactForm.reset();
    });

    function isEmpty(element, message, letters) {
        if (element.value.length < letters) {
            showError(element, message);
            return false;
        } else {
            removeInvaild(element);
            return true;
        }
    }

    function validateEmail(element, message) {
        const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = emailRe.test(element.value);

        if (isValid) {
            removeInvaild(element);
            return true;
        } else {
            showError(element, message);
            return false;
        }
    }

    function validateNameSurname(element, message, letters) {

        const nameSurnameRe = /^[a-zA-Z]+[ ]+[a-zA-Z]+$/;
        isValid = nameSurnameRe.test(element.value);

        if (isValid) {
            const nameAndSurname = element.value.split(" ");
            if (nameAndSurname[0].length >= letters && nameAndSurname[1].length >= letters) {
                removeInvaild(element);
                return true;
            } else {
                showError(element, "Neispravan unos");
                return false;
            }
        } else {
            showError(element, message);
            return false;
        }
    }

    function removeInvaild(element) {
        element.classList.remove('invalid-input');
        element.nextElementSibling.classList.add('hide-error');
    }

    function showError(element, message) {
        element.classList.add('invalid-input');
        element.nextElementSibling.innerHTML = message;
        element.nextElementSibling.classList.remove('hide-error');
        element.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }

});