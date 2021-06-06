let file = document.getElementById('file');

let image = new Image();
let textSizeTop = 15;
let textSizeBottom = 15;
let sizeText = 15;
let textColor = 'white';
let textLow = '';
let textUp = '';
let strokeStyle = true;

let canvas = document.getElementById('media-source');
canvas.width = 600
canvas.height = 600
let ctx = canvas.getContext('2d');

let upperTextInput = document.getElementById('upper-text');
let lowerTextInput = document.getElementById('lower-text');
let textSizeDrug = document.getElementById('text-size');
let textColorInput = document.getElementById('text-color');
let textStrokeCheck = document.getElementById('text-stroke');
let downloadButton = document.getElementById('download-button');
let resetButton = document.getElementById('reset-button');

function clearAll(){
    sizeText = 15;
    if (image.src !== '')
        sizeText = 15 / 100 * canvas.width
    textUp = '';
    textLow = ''
    textColor = 'white';
    strokeStyle = true;
    upperTextInput.value = '';
    lowerTextInput.value = '';
    textSizeDrug.value = 15;
    document.getElementById('value-text-size').innerText = textSizeDrug.value;
    textColorInput.value = '#ffffff';
    textStrokeCheck.checked = true;
}

file.addEventListener("change", (e) => {
    let reader  = new FileReader();
    clearAll();
    reader.addEventListener('load',  (e) => {
        image.src = reader.result;
    }, false);
    reader.readAsDataURL(file.files[0]);
    image.onload = () =>{
        let size = getSizes();
        sizeText = sizeText/100 * size[0];
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

textSizeDrug.addEventListener('change', (e) => {
    sizeText = textSizeDrug.value / 100 * canvas.width;
    document.getElementById('value-text-size').innerText = textSizeDrug.value;
    draw();
}, false);

textColorInput.addEventListener('change', (e) => {
    textColor = textColorInput.value;
    draw();
}, false);

textStrokeCheck.addEventListener('input', (e) => {
    strokeStyle = textStrokeCheck.checked;
    draw();
}, false);

window.addEventListener('resize', (e) => {
    sizeText = textSizeDrug.value / 100 * canvas.width;
    draw();
}, false);

downloadButton.addEventListener('click', (e) => {
    if (image.src !== '') {
        let link = document.createElement('a');
        link.download = '5051memorial.png';
        let can = document.createElement('canvas');
        let fakeCtx = can.getContext('2d');
        can.width = image.naturalWidth;
        can.height = image.naturalHeight;
        draw(true, can);
        link.href = can.toDataURL("image/png")
        link.click();
    }
}, false);

resetButton.addEventListener('click', (e) => {
    clearAll();
    draw();
}, false);

function getSizes() {
    let bodyWith = document.body.clientWidth;
    let width = image.naturalWidth;
    let aspect = width / image.naturalHeight;
    if (width > bodyWith * 0.6)
        width = bodyWith * 0.6;
    return [width, width / aspect];
}

function draw(fake=false, can=canvas){
    if (image.src === '')
        return;
    let textSize = sizeText;
    let context = can.getContext('2d');
    if (!fake){
        let canvasSizes = getSizes();
        context.clearRect(0, 0, can.width, can.height);
        can.setAttribute('width', canvasSizes[0]);
        can.setAttribute('height', canvasSizes[1]);
    } else {
        textSize = textSizeDrug.value / 100 * can.width;
    }
    context.drawImage(image, 0, 0, can.width, can.height);
    context.font = `${textSize}px Impact`;
    context.lineWidth = 8;
    context.textAlign = "center"
    context.fillStyle = textColor;
    if (strokeStyle){
        context.strokeStyle = 'black';
        context.strokeText(textUp, can.width / 2, textSizeTop / 100 * can.height + 15);
        context.strokeText(textLow, can.width / 2, can.height - textSizeBottom - 15);
    }
    context.fillText(textUp, can.width / 2, textSizeTop / 100 * can.height + 15);
    context.fillText(textLow, can.width / 2, can.height - textSizeBottom - 15);
}