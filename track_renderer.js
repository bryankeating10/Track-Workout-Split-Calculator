// Draws the track and displays the split times

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("trackCanvas");
    const ctx = canvas.getContext("2d");

    const TRACK_WIDTH = 1161;
    const TRACK_HEIGHT = 607;
    const LANE_WIDTH = 8;
    const LANES = 8;

    canvas.width = TRACK_WIDTH + 100;
    canvas.height = TRACK_HEIGHT + 100;

    const TRACK_COLOR = "#E07832";
    const GRASS_COLOR = "#90EE90";
    const LINE_COLOR = "#000000";
    const TEXT_COLOR = "#FFFFFF";

    function drawRing(lane) {
        const innerRadius = (TRACK_WIDTH / 4.682) + ((lane - 1) * LANE_WIDTH);
        const startX = (TRACK_WIDTH / 4.847) + LANES * LANE_WIDTH + 50;
        const endX = startX + TRACK_WIDTH / 2.096;
        const centerY = TRACK_HEIGHT / 2 + 50;

        ctx.beginPath();
        ctx.arc(startX, centerY, innerRadius, Math.PI / 2, -Math.PI / 2);
        ctx.arc(endX, centerY, innerRadius, -Math.PI / 2, Math.PI / 2);
        ctx.closePath();
        ctx.strokeStyle = LINE_COLOR;
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    function drawTrack() {
        ctx.fillStyle = GRASS_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const outerRadius = (TRACK_WIDTH / 4.682) + ((LANES + 1) * LANE_WIDTH);
        const startX = (TRACK_WIDTH / 4.847) + LANES * LANE_WIDTH + 50;
        const endX = startX + TRACK_WIDTH / 2.096;
        const centerY = TRACK_HEIGHT / 2 + 50;

        ctx.beginPath();
        ctx.arc(startX, centerY, outerRadius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = TRACK_COLOR;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(endX, centerY, outerRadius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = TRACK_COLOR;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(startX, centerY - outerRadius);
        ctx.lineTo(endX, centerY - outerRadius);
        ctx.lineTo(endX, centerY + outerRadius);
        ctx.lineTo(startX, centerY + outerRadius);
        ctx.closePath();
        ctx.fillStyle = TRACK_COLOR;
        ctx.fill();

        const innerRadius = (TRACK_WIDTH / 4.682) + LANE_WIDTH;
        const startXInner = (TRACK_WIDTH / 4.847) + LANES * LANE_WIDTH + 50;
        const endXInner = startXInner + TRACK_WIDTH / 2.096;

        ctx.beginPath();
        ctx.arc(startXInner, centerY, innerRadius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = GRASS_COLOR;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(endXInner, centerY, innerRadius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = GRASS_COLOR;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(startXInner, centerY - innerRadius);
        ctx.lineTo(endXInner, centerY - innerRadius);
        ctx.lineTo(endXInner, centerY + innerRadius);
        ctx.lineTo(startXInner, centerY + innerRadius);
        ctx.closePath();
        ctx.fillStyle = GRASS_COLOR;
        ctx.fill();

        for (let i = LANES + 2; i > 1; i--) {
            drawRing(i);
        }
    }

    function renderSplits(splits) {
        drawTrack();

        const textBoxes = [
            { x: 800, y: 150, label: "100m", text: "" },
            { x: 300, y: 150, label: "200m", text: "" },
            { x: 300, y: 450, label: "300m", text: "" },
            { x: 800, y: 450, label: "400m", text: "" }
        ];

        for (let i = 0; i < splits.length; i++) {
            textBoxes[i % 4].text += splits[i] + ", ";
        }

        textBoxes.forEach(box => {
            box.text = box.text.slice(0, -2);
        });

        ctx.fillStyle = TEXT_COLOR;
        ctx.font = "18px Arial";
        ctx.textAlign = "center";

        textBoxes.forEach(box => {
            ctx.fillStyle = TEXT_COLOR;
            ctx.fillRect(box.x, box.y, 180, 90);
            ctx.strokeStyle = LINE_COLOR;
            ctx.strokeRect(box.x, box.y, 180, 90);

            ctx.fillStyle = "#000000";
            ctx.fillText(box.text, box.x + 90, box.y + 45);
            ctx.fillText(box.label, box.x + 90, box.y - 10);
        });
    }

    drawTrack();
    window.renderSplits = renderSplits;
});
