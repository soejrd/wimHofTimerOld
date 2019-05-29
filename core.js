var i = 0;
var factor = 1;
var loop = 2;
var number;

function cookieBoi(e) {
    var number = e.parentElement.children[0].value;
    localStorage.setItem("loopCount", number);
    console.log(localStorage.loopCount);
    setTimeout(function(){
        location.reload();
    }, 500)
}

resetTimer();

function resetTimer() {
    if(localStorage.loopCount){
        loop = localStorage.loopCount;
        document.getElementById('number').value = localStorage.loopCount;
    } else {
        loop = 20;
    }
    anime({
        targets: '#breathingCircle',
        scale: 0.75,
        opacity: 1,
        duration: 400 * factor
    });
    anime({
        targets: '#progressBar',
        width: '0px',
        opacity: 1,
        easing: 'easeOutQuad',
        duration: 400 * factor
    });
    anime({
        targets: '#breathCount',
        opacity: 1,
        delay: 5000 * factor,
        duration: 1500 * factor
    });
    setTimeout(function () {
        timerMain();
        anime({
            targets: '#progressBar',
            width: '100%',
            easing: 'linear',
            duration: 3600 * (loop - 1) * factor,
            delay: 3600 * factor
        });
    }, 1000 * factor)
    //vertragen van functie van 1 seconde
    function timerMain() {
        var count = 0;
        var countTimer = setInterval(function () {
            count++;
            var breathCount = anime({
                targets: '#breathCount',
                value: count,
                round: 1,
                duration: 10,
                delay: 200 * factor
            });
        }, 3500 * factor);
        setTimeout(function () {
            clearInterval(countTimer)
        }, 3600 * loop * factor)


        var basicTimeline = anime.timeline({
            loop: loop+1
        });
        basicTimeline
            .add({
                targets: '#breathingCircle',
                scale: 1,
                easing: 'easeOutQuad',
                duration: 2000 * factor,
                delay: 250 * factor
            })
            .add({
                targets: '#breathingCircle',
                scale: 0.75,
                easing: 'easeOutQuad',
                delay: 250 * factor,
                duration: 1000 * factor
            });
    }

    setTimeout(function () {
        anime({
            targets: '#breathingCircle',
            opacity: 0,
            duration: 1000 * factor
        });
        anime({
            targets: '#breathCount',
            opacity: 0,
            duration: 1000 * factor
        });
        anime({
            targets: '#progressBar',
            opacity: 0,
            easing: 'easeOutQuad',
            duration: 1000 * factor,
        });
        anime({
            targets: '#counter',
            opacity: 1,
            easing: 'easeOutQuad',
            delay: 4000 * factor,
            duration: 400 * factor,
        });
        anime({
            targets: '#holdBreath',
            opacity: 1,
            easing: 'easeOutQuad',
            delay: 20000 * factor,
            duration: 2000 * factor,
        });
        anime({
            targets: '#outBreath',
            opacity: 1,
            easing: 'easeOutQuad',
            delay: 0,
            duration: 1000 * factor,
        });
        setTimeout(function () {
            anime({
                targets: '#outBreath',
                opacity: 0,
                easing: 'easeOutQuad',
                duration: 1000 * factor,
            });
            var sec = 0;

            function pad(val) {
                return val > 9 ? val : "0" + val;
            }
            setInterval(function () {
                $("#seconds").html(pad(++sec % 60));
                $("#minutes").html(pad(parseInt(sec / 60, 10)));
            }, 1000 * factor);
        }, 3000 * factor)

    }, (loop * 3600 + 1000) * factor)
}

document.onclick = function () {
    //location.reload(); 
}
