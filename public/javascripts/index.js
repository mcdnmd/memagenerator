let file = document.getElementById('file');

let image = new Image();
let textSizeTop = 15;
let textSizeBottom = 15;
let sizeText = 15;
let textColor = 'white';
let textLow = '';
let textUp = '';

let canvas = document.getElementById('media-source');
canvas.width = 600
canvas.height = 600
let ctx = canvas.getContext('2d');

let upperTextInput = document.getElementById('upper-text');
let lowerTextInput = document.getElementById('lower-text');
let textSizeDrug = document.getElementById('text-size');
let textColorInput = document.getElementById('text-color');
let downloadButton = document.getElementById('download-button');

function clearAll(){
    sizeText = 15;
    textUp = '';
    textLow = ''
    textColor = 'white';
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
        //ctx.drawImage(image, 0, 0);
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

textSizeDrug.addEventListener('change', (e) => {
    sizeText = textSizeDrug.value / 100 * canvas.width;
    draw();
}, false);

textColorInput.addEventListener('change', (e) => {
    textColor = textColorInput.value;
    draw();
}, false);

window.addEventListener('resize', (e) => {
    sizeText = textSizeDrug.value / 100 * canvas.width;
    draw();
}, false);


downloadButton.addEventListener('click', (e) => {
    let link = document.createElement('a');
    link.download = '5051memorial.png';
    let can = document.getElementById("media-source");
    link.href = can.toDataURL("image/png")
    link.click();
}, false);

function getSizes() {
    let bodyWith = document.body.clientWidth;
    let bodyHeight = document.body.clientHeight;
    let width = image.naturalWidth;
    let aspect = width / image.naturalHeight;
    if (width > bodyWith * 0.8){
        width = bodyWith * 0.8;
    }
    console.log(width, width / aspect);
    return [width, width / aspect];
}

function draw(){
    if (image.src !== '') {
        let canvasSizes = getSizes();
        //console.log(canvasSizes, image.width, image.width * canvasSizes[0], image.height, image.height * canvasSizes[1]);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
       //canvas.setAttribute('width', image.width * canvasSizes[0]);
        //canvas.setAttribute('height', image.height * canvasSizes[1]);
        let aspect = image.naturalWidth / image.naturalHeight;
        canvas.setAttribute('width', canvasSizes[0]);
        canvas.setAttribute('height', canvasSizes[1]);

        let xc = image.width / 2;
        let yc = image.height / 2;
        let xStart = xc - canvas.width / 2;
        let yStart = yc - canvas.width / 2;
        let xEnd = xc + canvas.width / 2;
        let yEnd = yc + canvas.width / 2;
        //ctx.drawImage(image, xStart, yStart, xEnd, yEnd, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        ctx.lineWidth = canvas.width*0.004
        ctx.font = `${sizeText}px Impact`;
        ctx.lineWidth = 8;
        ctx.textAlign = "center"
        ctx.strokeStyle = 'black';
        ctx.fillStyle = textColor;
        ctx.strokeText(textUp, canvas.width / 2, textSizeTop / 100 * canvas.width + 15);
        ctx.strokeText(textLow, canvas.width / 2, canvas.height - textSizeBottom - 15);
        ctx.fillText(textUp, canvas.width / 2, textSizeTop / 100 * canvas.width + 15);
        ctx.fillText(textLow, canvas.width / 2, canvas.height - textSizeBottom - 15);
    }
}