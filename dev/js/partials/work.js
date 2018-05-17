$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        },
        navText: ['prev', 'next'],
        onInitialized: counter, //When the plugin has initialized.
        onTranslated: counter //When the translation of the stage has finished.
    });

    function counter(event) {
        var element = event.target;         // DOM element, in this example .owl-carousel
        var items = event.item.count;     // Number of items
        var item = event.item.index + 1;     // Position of the current item
        $('#work-images-counter').html(item + "/" + items)
    }
});

function facebookBlackHover(element) {
    element.setAttribute('src', 'img/facebook-pink.png');
}

function facebookBlackUnhover(element) {
    element.setAttribute('src', 'img/facebook-black.png');
}

function twitterBlackHover(element) {
    element.setAttribute('src', 'img/twitter-pink.png');
}

function twitterBlackUnhover(element) {
    element.setAttribute('src', 'img/twitter-black.png');
}

function googleBlackHover(element) {
    element.setAttribute('src', 'img/google-plus-pink.png');
}

function googleBlackUnhover(element) {
    element.setAttribute('src', 'img/google-plus-black.png');
}

function pinterestBlackHover(element) {
    element.setAttribute('src', 'img/pinterest-pink.png');
}

function pinterestBlackUnhover(element) {
    element.setAttribute('src', 'img/pinterest-black.png');
}

function instagramBlackHover(element) {
    element.setAttribute('src', 'img/instagram-pink.png');
}

function instagramBlackUnhover(element) {
    element.setAttribute('src', 'img/instagram-black.png');
}