function facebookHover(element) {
    element.setAttribute('src', 'img/facebook-hover.png');
}

function facebookUnhover(element) {
    element.setAttribute('src', 'img/facebook.png');
}

function twitterHover(element) {
    element.setAttribute('src', 'img/twitter-hover.png');
}

function twitterUnhover(element) {
    element.setAttribute('src', 'img/twitter.png');
}

function googleHover(element) {
    element.setAttribute('src', 'img/google-plus-hover.png');
}

function googleUnhover(element) {
    element.setAttribute('src', 'img/google-plus.png');
}

function pinterestHover(element) {
    element.setAttribute('src', 'img/pinterest-hover.png');
}

function pinterestUnhover(element) {
    element.setAttribute('src', 'img/pinterest.png');
}

function instagramHover(element) {
    element.setAttribute('src', 'img/instagram-hover.png');
}

function instagramUnhover(element) {
    element.setAttribute('src', 'img/instagram.png');
}

function leaveWhite(element, marginTop, borderBottom){
    if (element.val() != '') {
        console.log(element.val());
        element.css("margin-top", marginTop);
        element.css("border-bottom", borderBottom);
    }
    if (element.val() == '') {
        console.log(element.val());
        element.css("margin-top", "-30px");
        element.css("border-bottom", "2px solid #565656");
    }
}

$(document).ready(function () {
    $("#footer-feedback-firstname")
        .focusout(function () {
            var element = $("#footer-feedback-firstname");
            var marginTop = "10px";
            var borderBottom = "1px solid #ffffff";
            leaveWhite(element, marginTop, borderBottom);
        });
});
$(document).ready(function () {
    $("#footer-feedback-mail")
        .focusout(function () {
            var element = $("#footer-feedback-mail");
            var marginTop = "22px";
            var borderBottom = "1px solid #ffffff";
            leaveWhite(element, marginTop, borderBottom);
        });
});
$(document).ready(function () {
    $("#footer-feedback-message")
        .focusout(function () {
            var element = $("#footer-feedback-message");
            var marginTop = "22px";
            var borderBottom = "1px solid #ffffff";
            leaveWhite(element, marginTop, borderBottom);
        });
});

function submitFeedback(event){
    event.preventDefault();
    $("#footer-feedback-form").hide();
    $("#thank-you-div").show();
}

function newFeedback(event){
    event.preventDefault();
    $("#thank-you-div").hide();
    $("#footer-feedback-form").show();
}
