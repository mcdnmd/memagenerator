let file = document.getElementById('file');

let image = null;
var textSizeTop = 10;
var textSizeBottom = 10;

file.addEventListener("change", (e) => {
    let canvas = document.getElementById('media-source');
    let ctx = canvas.getContext('2d');
    let reader  = new FileReader();
    image = new Image();

    reader.addEventListener('load',  (e) => {
        image.src = reader.result;
    }, false);

    reader.readAsDataURL(file.files[0]);

    image.onload = () =>{
        canvas.setAttribute('width', image.width);
        canvas.setAttribute('height', image.height);
        console.log(image.width, image.height)
        console.log(image);
        ctx.drawImage(image, 0, 0);
        draw()
    };
}, false);


let upperText = document.getElementById('upper-text');
let textUp = '';

upperText.addEventListener('input', (e) => {
    textUp = upperText.value;
    draw();
}, false);

let lowerText = document.getElementById('lower-text');
let textLow = '';

lowerText.addEventListener('input', (e) => {
    textLow = lowerText.value;
    draw();
}, false);


let textSize = document.getElementById('text-size');
let sizeText = 55;

textSize.addEventListener('change', (e) =>{
    sizeText = textSize.value;
    console.log(textSize.value)
    draw();
}, false);

function draw(){
    if (image !== null) {
        let canvas = document.getElementById('media-source');
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
        ctx.font = `${sizeText}px Impact`;
        console.log(ctx);
        ctx.textAlign = "center"
        ctx.strokeStyle = '#000';
        ctx.fillStyle = "white";
        ctx.fillText(textUp, canvas.width / 2, textSizeTop / 100 * canvas.width + 15);
        ctx.fillText(textLow, canvas.width / 2, canvas.height - 15);
    }
}