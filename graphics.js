/**
 * @class       : graphics
 * @author      : mailitg (mailitg@$HOSTNAME)
 * @created     : Wednesday Dec 11, 2024 20:56:37 CET
 * @description : graphics
 */

export const canvas = document.getElementById('game-canvas');
export const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 700;

const backgroundImg = new Image();
backgroundImg.src = './assets/background.png';

const playerImg = new Image();
playerImg.src = './assets/player.png';

const narratorImg = new Image();
narratorImg.src = './assets/narrator.png';

const bubbleImg = new Image();
bubbleImg.src = './assets/bubble.png';

const bookImg = new Image();
bookImg.src = './assets/book.png';

export const player = { x: 150, y: 400, width: 100, height: 100 };
export const narrator = { x: 600, y: 100, width: 100, height: 100 };
export const narratorBubble = { x: narrator.x - 120, y: narrator.y - 50, width: 210, height: 110 };
export const playerBubble = { x: player.x + 50, y: player.y - 80, width: 210, height: 110 };

export function drawScene(narratorText, playerText) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
        ctx.drawImage(narratorImg, narrator.x, narrator.y, narrator.width, narrator.height);
        ctx.drawImage(bubbleImg, narratorBubble.x, narratorBubble.y, narratorBubble.width, narratorBubble.height);
        drawText(narratorText, narratorBubble.x + 20, narratorBubble.y + 40, 180);
        ctx.drawImage(bubbleImg, playerBubble.x, playerBubble.y, playerBubble.width, playerBubble.height);
        drawText(playerText, playerBubble.x + 20, playerBubble.y + 40, 180);
}

function drawText(text, x, y, maxWidth) {
    const lines = text.split('\n');
    let currentY = y;

    ctx.fillStyle = "black";
    ctx.font = "13px Arial";

    lines.forEach(lineText => {
        const words = lineText.split(' ');
        let line = '';

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';

            if (ctx.measureText(testLine).width > maxWidth && line) {
                ctx.fillText(line, x, currentY);
                line = words[n] + ' ';
                currentY += parseInt(ctx.font) * 1.2;
            } else {
                line = testLine;
            }
        }

        if (line) {
            ctx.fillText(line, x, currentY);
        }

        currentY += parseInt(ctx.font) * 1.2;
    });
}

export function drawDoc(outputText) {
    ctx.drawImage(bookImg, 0, 0, canvas.width, canvas.height);
    drawText(outputText, bookImg.x + 150, bookImg.y + 100, 700);
}



