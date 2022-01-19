


/*********************************************************************** start card *************************************/

(function() {
    function $(id) {
        return document.getElementById(id);
    }

    var card = $('card'),
        openB = $('open'),
        closeB = $('close'),
        timer = null;
    console.log('wat', card);
    openB.addEventListener('click', function () {
        card.setAttribute('class', 'open-half');
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
            card.setAttribute('class', 'open-fully');
            timer = null;
        }, 1000);
    });

    closeB.addEventListener('click', function () {
        card.setAttribute('class', 'close-half');
        if (timer) clearTimerout(timer);
        timer = setTimeout(function () {
            card.setAttribute('class', '');
            timer = null;
        }, 1000);
    });

}());


/*************************************************************** End Card **********************************************/





/**************************************************************** start clock ******************************************/


(function createSecondLines(){
    var clock = document.querySelector(".clock");
    var rotate = 0;

    var byFive = function(n) {
        return (n / 5 === parseInt(n / 5, 10)) ? true : false;
    };

    for (i=0; i < 30; i++) {
        var span = document.createElement("span");

        if (byFive(i)) {
            span.className = "fives";
        }

        span.style.transform = "translate(-50%,-50%) rotate("+ rotate + "deg)";
        clock.appendChild(span);
        rotate += 6;
    }
})();

(function setClock() {
    var time = new Date();

    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    var clock = {
        hours: document.querySelector('.hours'),
        minutes: document.querySelector('.minutes'),
        seconds: document.querySelector('.seconds')
    };

    var deg = {
        hours: 30 * hours + .5 * minutes,
        minutes: 6 * minutes + .1 * seconds,
        seconds: 6 * seconds
    }

    clock.hours.style.transform = 'rotate(' + deg.hours + 'deg)';
    clock.minutes.style.transform = 'rotate(' + deg.minutes + 'deg)';
    clock.seconds.style.transform = 'rotate(' + deg.seconds + 'deg)';

    var runClock = function(){
        deg.hours += 360/43200;
        deg.minutes += 360/3600;
        deg.seconds += 360/60;

        clock.hours.style.transform = 'rotate(' + deg.hours + 'deg)';
        clock.minutes.style.transform = 'rotate(' + deg.minutes + 'deg)';
        clock.seconds.style.transform = 'rotate(' + deg.seconds + 'deg)';
    };

    setInterval(runClock,1000);

    (function printDate(){
        var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        var print = time.getDate() + ' / ' + months[time.getMonth()];
        var output = document.querySelectorAll('output');

        [].forEach.call(output, function(node){
            node.innerHTML = print;
        });
    })();

})();


/************************************************************************* end clock **********************************/


/************************************************************************* start  flour *************************************/

if (navigator.userAgent.match(/AppleWebKit/) && ! navigator.userAgent.match(/Chrome/)) {
    document.documentElement.className += " safari";
}


/************************************************************************* end flour *************************************/



/////////////////////////////////////////////////////////////////////////// Start Slider ///////////////////////////////

function roll()
{
    var slider = $('.slider > .widget');
    slider.removeClass('do-slide');

    $('.slider > .controls > .bottom > label').html(slider.find('> li').first().attr('num') + ' of ' + slider.find('> li').size());

    window.sliderTimeout = setTimeout(function()
    {
        slider.addClass('do-slide');
        window.sliderTimeout = setTimeout(function()
        {
            slider.find('> li').first().appendTo(slider);
            roll();
        }, 1000);
    }, 5000);
}

$(function()
{
    $('.slider > .widget > li').each(function()
    {
        $(this).attr('num', $(this).index() + 1);
    });

    $('.slider a').click(function()
    {
        switch($(this).attr('href'))
        {
            case '#share':
                alert('You clicked share!\nGood for you! :)');
                break;
            case '#close':
                alert('This would trigger a widget.close() event');
                break;
            case '#like':
                alert('You clicked like!\nAwesome! :D');
                break;
            case '#search':
                alert('This would trigger a modal with a search box');
                break;
            case '#comments':
                alert('This would trigger a modal with any comments');
                break;
            case '#prev':
                window.clearTimeout(window.sliderTimeout);
                $('.slider > .widget').addClass('backwards-slide').find('> li').last().prependTo('.slider > .widget');
                window.sliderTimeout = setTimeout(function()
                {
                    $('.slider > .widget').removeClass('backwards-slide');
                    roll();
                }, 1000);
                break;
            case '#next':
                window.clearTimeout(window.sliderTimeout);
                $('.slider > .widget').addClass('do-slide');
                window.sliderTimeout = setTimeout(function()
                {
                    $('.slider > .widget').removeClass('do-slide').find('> li').first().appendTo('.slider > .widget');
                    roll();
                }, 1000);
                break;
        }
        return false;
    });

    roll();
});

///////////////////////////////////////////////////////////////////////////////////// End Slider ////////////////////////