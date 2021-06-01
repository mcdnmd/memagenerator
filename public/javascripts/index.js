let file = document.getElementById('file');

let image = new Image();
let textSizeTop = 15;
let textSizeBottom = 15;
let sizeText = 15;

let canvas = document.getElementById('media-source');
canvas.width = 500
canvas.height = 500
let ctx = canvas.getContext('2d');

let upperTextInput = document.getElementById('upper-text');
let textUp = '';

let lowerTextInput = document.getElementById('lower-text');
let textLow = '';

let textSizeDrug = document.getElementById('text-size');

function clearAll(){
    sizeText = 15;
    textUp = '';
    textLow = ''
    document.getElementById('text-size').value = 15;
    document.getElementById('lower-text').value = '';
    document.getElementById('upper-text').value = '';
}

file.addEventListener("change", (e) => {
    let reader  = new FileReader();
    clearAll();

    reader.addEventListener('load',  (e) => {
        image.src = reader.result;
    }, false);

    reader.readAsDataURL(file.files[0]);

    image.onload = () =>{
        canvas.setAttribute('width', image.width);
        canvas.setAttribute('height', image.height);
        ctx.drawImage(image, 0, 0);
        sizeText = sizeText/100 * canvas.width;
        draw()
    };
}, false);

upperTextInput.addEventListener('input', (e) => {
    textUp = upperTextInput.value;
    draw();
}, false);

lowerTextInput.addEventListener('input', (e) => {
    textLow = lowerTextInput.value;
    draw();
}, false);

textSizeDrug.addEventListener('change', (e) =>{
    sizeText = textSizeDrug.value / 100 * canvas.width;
    draw();
}, false);

function draw(){
    if (image.src !== '') {
        console.log(sizeText, sizeText/100, canvas.width);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
        ctx.lineWidth = canvas.width*0.004
        ctx.font = `${sizeText}px Impact`;
        ctx.lineWidth = 8;
        ctx.textAlign = "center"
        ctx.strokeStyle = 'black';
        ctx.fillStyle = "white";
        ctx.strokeText(textUp, canvas.width / 2, textSizeTop / 100 * canvas.width + 15);
        ctx.strokeText(textLow, canvas.width / 2, canvas.height - textSizeBottom - 15);
        ctx.fillText(textUp, canvas.width / 2, textSizeTop / 100 * canvas.width + 15);
        ctx.fillText(textLow, canvas.width / 2, canvas.height - textSizeBottom - 15);
    }
}