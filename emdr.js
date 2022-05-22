// call rate of render func in milliseconds
let refreshRate = 5;
// total elapsed time in milliseconds
let time = 0;
// emdr routine text
let lines = [
    "think of a memory",
    "visualize the image that represents the worst part of that memory",
    "hold that image in your mind, are there any negative beliefs\n you have about yourself right now that go along with that image?",
    "is there a belief that you would prefer to feel about\n yourself that would go along with that image?",
    "as you say that belief to yourself, how true does it feel\n to you on the deepest level? (scale 1-7)",
    "as you hold that image in your mind and you say to yourself\n the negative belief, what feelings come to mind?",
    "where do you feel that in your body?",
    "how strong is that feeling from 0-10?",
    "take that negative image and feelings associated and go with it."
]
// text currently being displayed
let currentText = lines[0];
// text fade direction
let fade = 0;
// general use start time pointer
let start = 0;
// bilateral stimulation toggle
let bls = false;
// duration of bls
let blsDuration = 20 * 1000;

function drawCircle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.stroke();
}

function drawText(ctx, x, y, text) {
    // if text is fading
    if (fade !== 0) {
        // time elapsed since fade began
        let elapsed = time - start;
        if (elapsed < 1000) {
            let total = fade ? fade == 1 : 0;
            ctx.strokeStyle = "rgb(255, 255, 255, " + (total - (elapsed / 1000) * fade).toString() + ")";
        }
        else {
            if (fade == 1) {
                // advance dialogue
                advanceText();
                // set to fade in new text
                start = time;
                fade = -1;
            }
            else if (fade == -1) {
                fade = 0;
            }
        }
    }
    else {
        ctx.strokeStyle = "#fff";
    }

    ctx.font = "48px serif";
    ctx.textAlign = "center";
    // if text is multiline
    if (currentText.includes("\n")) {
        parts = currentText.split("\n");
        for (var i = 0; i < parts.length; i++) {
            ctx.strokeText(parts[i], x, y + (i * 75));
        }
    }
    else {
        ctx.strokeText(text, x, y);
    }
}

// create event listener for space / enter
document.addEventListener('keydown', event => {
    if (!bls) {
        if(event.code == 'Space' || event.code == 'Enter') {
            fadeOut();
        }
    }
});

// create event listener for click
document.addEventListener('click', event => {
    if (!bls) {
        fadeOut();
    }
});

function fadeOut() {
    start = time;
    // fade out current text
    fade = 1;
}

function advanceText() {
    var index = lines.indexOf(currentText);
    // if the user has not reached the end of the dialogue
    if (index != lines.length - 1) {

        currentText = lines[index + 1];
    }
    // begin bilateral stimulation
    else {
        start = 0;
        bls = true;
    }
}

function resizeWindow(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function centroid() {
    return [window.innerWidth / 2, window.innerHeight / 2];
}

function render() {
    let canvas = document.getElementById("root");
    // adjust canvas height to window size
    resizeWindow(canvas);
    let ctx = canvas.getContext('2d');
    // clear canvas before frame draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (canvas.getContext) {
        let center = centroid();
        if (bls) {
            let elapsed = time - start;
            if (elapsed < blsDuration) {
                drawCircle(ctx, center[0] + (Math.sin(time / 225) * (center[0] / 2)), center[1], 75);
            }
            else {
                currentText = lines[0];
                time = 0;
                bls = false;
            }
        }
        else {
            drawText(ctx, center[0], center[1], currentText);
        }
    }
    time += refreshRate;
}

setInterval(render, refreshRate);