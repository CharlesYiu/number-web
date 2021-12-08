const NumberLabel = document.getElementById("number");
let NumberValue = 0;
function UpdateNumberLabel() {
    NumberLabel.textContent = NumberValue.toString();
}
// on left click
NumberLabel.onclick = function() {
    NumberValue += 1;
    UpdateNumberLabel();
}
// on right click
NumberLabel.oncontextmenu = function() {
    NumberValue -= 1;
    UpdateNumberLabel();
    return false;
}
let RunningSpaceLoop = false;
let AddNumber = true;
let NegativeNumber = false;
let LastNegativeNumber = true;
let InvertAddNumber = false;
function SpaceLoop() {
    let InvertedAddNumber = AddNumber;
    if (InvertAddNumber) {
        InvertedAddNumber = !InvertedAddNumber;
    }
    if (InvertedAddNumber) {
        NumberValue += 1;
    } else {
        NumberValue -= 1;
    }
    UpdateNumberLabel();
    if (RunningSpaceLoop) {
        setTimeout(SpaceLoop, 100);
    }
}
window.onkeydown = function(event) {
    if (event.keyCode === 32 && !RunningSpaceLoop) {
        // start space loop if not running space loop
        InvertAddNumber = NumberValue < 0;
        RunningSpaceLoop = true;
        SpaceLoop();
    // reset
    } else if (event.keyCode === 82) {
        NumberValue = 0;
        UpdateNumberLabel();
    }
};
window.onkeyup = function(event) {
    if (event.keyCode === 32) {
        RunningSpaceLoop = false;
    }
};
window.onmousemove = function(event) {
    // negative number
    NegativeNumber = event.clientX < (NumberLabel.clientWidth / 2);
    if (NegativeNumber !== LastNegativeNumber && RunningSpaceLoop) {
        if (NegativeNumber) {
            NumberValue = -Math.abs(NumberValue);
        } else {
            NumberValue = Math.abs(NumberValue);
        }
        InvertAddNumber = NegativeNumber;
        LastNegativeNumber = NegativeNumber;
    }
    // add number
    AddNumber = event.clientY < (NumberLabel.clientHeight / 2);
};
document.getElementById("button").onclick = function() {
    document.getElementById("banner").hidden = true;
};