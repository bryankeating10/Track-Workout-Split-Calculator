// JavaScript Track Workout Split Calculator (HTML5 Canvas)
// Draws an 8-lane track and calculates split times for a given distance and pace

// Wait for the HTML document to load before running script
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("trackCanvas");
    const ctx = canvas.getContext("2d");

    const TRACK_WIDTH = 1161;
    const TRACK_HEIGHT = 607;
    const LANE_WIDTH = 8;
    const LANES = 8;

    canvas.width = TRACK_WIDTH + 100;
    canvas.height = TRACK_HEIGHT + 100;

    // Colors
    const TRACK_COLOR = "#E07832";  // Orange track
    const GRASS_COLOR = "#90EE90";  // Light green grass
    const LINE_COLOR = "#000000";   // Black lane lines
    const TEXT_COLOR = "#FFFFFF";   // White text

    // Convert seconds to mm:ss format
    function splitTimeToString(splitTime) {
        let minutes = Math.floor(splitTime / 60);
        let seconds = Math.round(splitTime % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Calculate split times for each 100m segment
    function createSplits(distance, splitTime) {
        let splits = [];
        for (let i = 100; i <= distance; i += 100) {
            splits.push(splitTimeToString((splitTime * i) / 100));
        }
        return splits;
    }

    // Draws one lane ring
    function drawRing(lane) {
        const innerRadius = (TRACK_WIDTH / 4.682) + ((lane - 1) * LANE_WIDTH);
        const startX = (TRACK_WIDTH / 4.847) + LANES * LANE_WIDTH + 50;
        const endX = startX + TRACK_WIDTH / 2.096;
        const centerY = TRACK_HEIGHT / 2 + 50;

        ctx.beginPath();
        ctx.arc(startX, centerY, innerRadius, Math.PI / 2, -Math.PI / 2);
        ctx.arc(endX, centerY, innerRadius, -Math.PI / 2, Math.PI / 2);
        ctx.closePath(); // Closes the path, creating a line from the end to the start
        ctx.strokeStyle = LINE_COLOR;
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Draw the entire track
    function drawTrack() {
        ctx.fillStyle = GRASS_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = TRACK_COLOR;
        ctx.fillRect(50, 50, TRACK_WIDTH, TRACK_HEIGHT);

        for (let i = LANES + 2; i > 1; i--) {
            drawRing(i);
        }
    }

    // User input prompts
    let distance = parseInt(prompt("Enter your distance in meters (Ex. 1600): "), 10);
    let goalTime = prompt("Enter your time in hh:mm:ss format (Ex. 4:48): ");

    // Convert input time to seconds
    let timeParts = goalTime.split(":").map(Number);
    let totalSeconds = timeParts.length === 3
        ? timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2]
        : timeParts.length === 2
            ? timeParts[0] * 60 + timeParts[1]
            : timeParts[0];

    let splitTime = (totalSeconds / distance) * 100;
    let splits = createSplits(distance, splitTime);

    console.log(`100m split time: ${splitTime.toFixed(2)}s`);
    console.log("Splits:", splits);

    // Define text box positions for 100m, 200m, 300m, 400m marks
    let textBoxes = [
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

    function drawTextBoxes() {
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "18px Arial";
        ctx.textAlign = "center";

        textBoxes.forEach(box => {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(box.x, box.y, 180, 90);
            ctx.strokeStyle = LINE_COLOR;
            ctx.strokeRect(box.x, box.y, 180, 90);

            ctx.fillStyle = "#000000";
            ctx.fillText(box.text, box.x + 90, box.y + 45);
            ctx.fillText(box.label, box.x + 90, box.y - 10);
        });
    }

    function render() {
        drawTrack();
        drawTextBoxes();
    }

    render();
});