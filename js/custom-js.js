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