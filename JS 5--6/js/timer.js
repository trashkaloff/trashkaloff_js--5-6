var count = document.getElementsByClassName('stopwatch');

[].forEach.call(count, function (elem) {
    var currentTimer = 0,
        interval = 0,
        lastUpdateTime = new Date().getTime(),
        start = elem.querySelector('button.start'),
        stop = elem.querySelector('button.stop'),
        reset = elem.querySelector('button.reset'),
        mins = elem.querySelector('span.minutes'),
        secs = elem.querySelector('span.seconds'),
        cents = elem.querySelector('span.centiseconds');

    start.addEventListener('click', startTimer);
    stop.addEventListener('click', stopTimer);
    reset.addEventListener('click', resetTimer);

    function timer (n) {
        return ('00' + n).substr(-2);
    }

    function update () {
        var now = new Date().getTime(),
            upd = now - lastUpdateTime;

        currentTimer += upd;

        var time = new Date(currentTimer);

        mins.innerHTML = timer(time.getMinutes());
        secs.innerHTML = timer(time.getSeconds());
        cents.innerHTML = timer(Math.floor(time.getMilliseconds() / 10));

        lastUpdateTime = now;
    }

    function startTimer () {
        if (!interval) {
            lastUpdateTime = new Date().getTime();
            interval = setInterval(update, 1);
        }
    }

    function stopTimer () {
        clearInterval(interval);
        interval = 0;
    }

    function resetTimer () {
        stopTimer();

        currentTimer = 0;

        mins.innerHTML = secs.innerHTML = cents.innerHTML = timer(0);
    }
});