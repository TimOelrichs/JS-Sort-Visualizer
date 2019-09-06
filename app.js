window.onload = function() {

    let n = 100;
    let arr = [];
    let sleeptime = 1;

    function init() {
        for (let index = 0; index < n; index++) {
            arr.push(index);
        }

        let canvas = document.getElementById("canvas");
        canvas.style.backgroundColor = '#333333';
        var btn = document.getElementById("sortButton");
        btn.addEventListener("click", bubblesort);
        var btn = document.getElementById("shuffleButton");
        btn.addEventListener("click", shuffle);
    }

    function swap(a, b) {
        let tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    }

    function shuffle() {
        for (let index = 0; index < n; index++) {
            let a = getRandomIntInclusive(0, n - 1);
            let b = getRandomIntInclusive(0, n - 1);
            swap(a, b);
        }
        draw();
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    function draw() {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");

        if (ctx) {
            let w = canvas.width;
            let h = canvas.height;
            let breite = w / n;
            ctx.clearRect(0, 0, w, h);

            for (let index = 0; index < n; index++) {
                ctx.fillStyle = perc2color(arr[index]);
                ctx.fillRect(index * breite, h, breite, -arr[index]);
            }
        }
    }

    async function bubblesort() {
        var len = arr.length;

        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    swap(j, j + 1);
                    await sleep(sleeptime);
                    draw();
                }

            }
        }
    }


    function sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }


    function perc2color(perc) {
        var r, g, b = 0;
        if (perc < 50) {
            r = 255;
            g = Math.round(5.1 * perc);
        } else {
            g = 255;
            r = Math.round(510 - 5.10 * perc);
        }
        var h = r * 0x10000 + g * 0x100 + b * 0x1;
        return '#' + ('000000' + h.toString(16)).slice(-6);
    }

    init();
    shuffle();
}