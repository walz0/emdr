import React, { useRef, useEffect, useState } from 'react';

function Emdr() {
    const canvasRef = useRef(null);

    const refreshRate = 5; // call rate of render func in milliseconds
    const blsDuration = 40 * 1000; // length of bls in milliseconds
    const textFadeDuration = 500; // length of text fade in milliseconds
    let x = 0; // width of the window
    let y = 0; // height of the window
    let bls = false; // bilateral stimulation toggle
    let start = 0; // general purpose pointer for starting timers
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
    let currentText = lines[0]; // text currently being displayed
    let fade = 0; // text fade direction

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
            let elapsed = Date.now() - start;
            if (elapsed < textFadeDuration) {
                let total = fade ? fade == 1 : 0;
                ctx.strokeStyle = "rgb(255, 255, 255, " + (total - (elapsed / textFadeDuration) * fade).toString() + ")";
            }
            else {
                if (fade == 1) {
                    // advance dialogue
                    advanceText();
                    // set to fade in new text
                    start = Date.now();
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
            let parts = currentText.split("\n");
            for (var i = 0; i < parts.length; i++) {
                ctx.strokeText(parts[i], x, y + (i * 75));
            }
        }
        else {
            ctx.strokeText(text, x, y);
        }
    }   

    function advanceText() {
        var index = lines.indexOf(currentText);
        // if the user has not reached the end of the dialogue
        if (index != lines.length - 1) {
            currentText = lines[index + 1];
        }
        // begin bilateral stimulation
        else {
            start = Date.now();
            bls = true;
        }
    }

    function fadeOut() {
        start = Date.now();
        // fade out current text
        fade = 1;
    }

    function resizeWindow(canvas) {
        canvas.width = x;
        canvas.height = y;
    }

    function render() {
        const canvas = canvasRef.current;
        // adjust canvas height to window size
        resizeWindow(canvas);
        const ctx = canvas.getContext('2d');
        // clear canvas before frame draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (bls) {
            let elapsed = Date.now() - start;
            if (elapsed < blsDuration) {
                drawCircle(ctx, (x / 2) + (Math.sin(Date.now() / 250) * ((x / 2) / 2)), (y / 2), 75);
            }
            else {
                currentText = lines[0];
                start = Date.now();
                fade = -1;
                bls = false;
            }
        }
        else {
            drawText(ctx, x / 2, y / 2, currentText);
        }
    }

    function setWindowDimensions() {
        x = window.innerWidth;
        y = window.innerHeight;
    }

    useEffect(() => {
        // set initial window dimensions
        setWindowDimensions();
        // set window dimensions on resize
        window.addEventListener('resize', ()=> {
            setWindowDimensions();
        });
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

        setInterval(render, refreshRate);
    }, [])

    return (
        <div>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}

export default Emdr;