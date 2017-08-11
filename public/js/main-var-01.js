$(document).ready(function () {

    var myWindow = $(document);

    var myPos = myWindow.scrollTop(),
        up = false,
        newScroll;

    var navigation = $('.navigation'),
        projectsCollapseButton = $('.navigation-projects-collapse-button');

    if (myPos > 0) {
        navigation.removeClass('navigation-transparent-bg show-panel');
    }

    myWindow.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function () {
        newScroll = myWindow.scrollTop();
        if (newScroll > myPos && !up) {
            navigation.addClass('projects-collapsed hide-navigation').removeClass('navigation-transparent-bg show-panel');
            projectsCollapseButton.addClass('now-click');
            up = !up;
        } else if (newScroll < myPos && up) {
            navigation.removeClass('hide-navigation show-panel');
            up = !up;
        } else if (newScroll === 0) {
            navigation.addClass('navigation-transparent-bg').removeClass('hide-navigation');
        }
        myPos = newScroll;
    });

    projectsCollapseButton.on('click', function (e) {

        if (!$(this).hasClass('now-click')) {
            if (myPos === 0) {
                $('html, body').animate({
                    scrollTop: 108
                }, 300, function () {
                });
            }

        } else {
            navigation.toggleClass('show-panel');
        }

        e.preventDefault();
        e.stopPropagation();
    });

    checkDesktopWidth();

});


$(window).resize(function () {
    checkDesktopWidth();
});

function checkDesktopWidth() {
    var bh = document.documentElement.clientHeight,
        bw = document.documentElement.clientWidth;

    if (bw > 1200 && bh > 640) {
        $('.main-w-video').css({
            height: bh
        });
    }

};
