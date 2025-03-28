// Handles split calculations when the "Calculate" button is clicked

function splitTimeToString(splitTime) {
    let minutes = Math.floor(splitTime / 60);
    let seconds = Math.round(splitTime % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function createSplits(distance, splitTime) {
    let splits = [];
    for (let i = 100; i <= distance; i += 100) {
        splits.push(splitTimeToString((splitTime * i) / 100));
    }
    return splits;
}

function calculateSplits() {
    let distance = parseInt(document.getElementById("distance").value, 10);
    let goalTime = document.getElementById("goalTime").value.trim();

    if (isNaN(distance) || !goalTime.match(/^\d+:\d{2}$/)) {
        alert("Please enter a valid distance and goal time in mm:ss format.");
        return;
    }

    let timeParts = goalTime.split(":").map(Number);
    let totalSeconds = timeParts[0] * 60 + timeParts[1];
    let splitTime = (totalSeconds / distance) * 100;
    let splits = createSplits(distance, splitTime);

    console.log(`100m split time: ${splitTime.toFixed(2)}s`);
    console.log("Splits:", splits);

    renderSplits(splits);
}