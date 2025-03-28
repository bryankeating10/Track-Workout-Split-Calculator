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
    // const LINE_COLOR = "#000000";   // Black lane lines
    // const TEXT_COLOR = "#FFFFFF";   // White text

	    // Draw the entire track
    function drawTrack() {
		ctx.fillStyle = GRASS_COLOR;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Calculate dimensions
		const outerRadius = (TRACK_WIDTH / 4.682) + ((LANES + 1) * LANE_WIDTH);
		const startX = (TRACK_WIDTH / 4.847) + LANES * LANE_WIDTH + 50;
		const endX = startX + TRACK_WIDTH / 2.096;
		const centerY = TRACK_HEIGHT / 2 + 50;

		// Fill the left circle
		ctx.beginPath();
		ctx.arc(startX, centerY, outerRadius, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fillStyle = TRACK_COLOR;
		ctx.fill();

		// Fill the right circle
		ctx.beginPath();
		ctx.arc(endX, centerY, outerRadius, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fillStyle = TRACK_COLOR;
		ctx.fill();

		// Fill the rectangle in the center
		ctx.beginPath();
		ctx.moveTo(startX, centerY - outerRadius);
		ctx.lineTo(endX, centerY - outerRadius);
		ctx.lineTo(endX, centerY + outerRadius);
		ctx.lineTo(startX, centerY + outerRadius);
		ctx.closePath();
		ctx.fillStyle = TRACK_COLOR;
		ctx.fill();
	}

	function render() {
        drawTrack();
        drawTextBoxes();
    }

    render();
});