let color = "black";
let lineWidth = 5;
let lineCap = "round";

window.addEventListener('load', () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    // Make it visually fill the positioned parent
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    // ...then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    


    //variables
    let painting = false;

    let lastX, lastY;
    let lastPoints = [];

    //functions
    function draw(e) {

        if (!painting) return;

        //Set the line config
        ctx.lineWidth = lineWidth;
        ctx.lineCap = lineCap;
        ctx.strokeStyle = color;
        //paint the line on the canvas
        //Note: The can be improved so when painting curves the line is smoother (we can use something like quadraticCurveTo() or bezierCurveTo())
            //ctx.lineTo(e.clientX, e.clientY);
            //ctx.stroke();
            //ctx.beginPath();
            //ctx.moveTo(e.clientX, e.clientY);

        //quadraticCurveTo() example
        const currentX = e.clientX - canvas.offsetLeft;
        const currentY = e.clientY - canvas.offsetTop;

        lastPoints.push({ x: currentX, y: currentY });

        if (lastPoints.length > 2) {
            const firstPoint = lastPoints[0];
            const secondPoint = lastPoints[1];
            const thirdPoint = lastPoints[2];

            const cx = (secondPoint.x + lastX) / 2;
            const cy = (secondPoint.y + lastY) / 2;

            ctx.beginPath();
            ctx.moveTo(firstPoint.x, firstPoint.y);
            ctx.quadraticCurveTo(secondPoint.x, secondPoint.y, cx, cy);
            ctx.stroke();

            lastPoints.shift();
        }

        lastX = currentX;
        lastY = currentY;
        //--

    }


    function startPosition(e) {
        painting = true;

        //quadraticCurveTo() example
        lastX = e.clientX - canvas.offsetLeft;
        lastY = e.clientY - canvas.offsetTop;
        //--

        draw(e);
    }

    function finishPosition() {
        painting = false;

        //quadraticCurveTo() example
        lastPoints = [];
        //--

        ctx.beginPath();
    }

    

   

    

    //EventListeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishPosition);
    canvas.addEventListener('mousemove', draw);
 
    // Add a mousemove event listener to the canvas
    canvas.addEventListener("mousemove", function (event) {
        // Set the cursor position to the mouse position
        cursor.style.left = event.clientX + "px";
        cursor.style.top = event.clientY + "px";
    });


});

let currentCursorStyle = "colorBlack";
const cursor = document.getElementById("cursor");

function SetColorBlack() {

    if (currentCursorStyle == "colorBlack") return;

    lineCap = "round";
    color = "black";
    lineWidth = 5;

    cursor.classList.remove(currentCursorStyle);
    currentCursorStyle = "colorBlack";
    cursor.classList.add("colorBlack");
}
function SetColorRed() {

    if (currentCursorStyle == "colorRed") return;

    lineCap = "round";
    color = "red";
    lineWidth = 5;

    cursor.classList.remove(currentCursorStyle);
    currentCursorStyle = "colorRed";
    cursor.classList.add("colorRed");
}
function SetEraser() {
    if (currentCursorStyle == "colorWhite") return;

    lineCap = "square";
    color = "white";
    lineWidth = 15;

    cursor.classList.remove(currentCursorStyle);
    currentCursorStyle = "colorWhite";
    cursor.classList.add("colorWhite");
}

function SetHigligther() {

    if (currentCursorStyle == "colorHighlighter") return;
    lineCap = "square";
    color = "rgba(255, 195, 0,0.2)";
    lineWidth = 20;

    cursor.classList.remove(currentCursorStyle);
    currentCursorStyle = "colorHighlighter";
    cursor.classList.add("colorHighlighter");
}

function downloadCanvas() {
    const canvas = document.querySelector("#canvas");
    const url = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');
    link.download = 'myWhiteboard.jpg';
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


