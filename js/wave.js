/*class WaveGlitch {
    constructor(
        id,
        src,
        width,
        height,
        posX = 0,
        posY = 0,
        waveAmplitude = 10,
        intensity = 2,
        speed = 0.10,
    ) {
        this.src  = src
        this.posX = posX
        this.posY = posY
        this.requestAnim = null

        // get image
        this.image     = new Image()
        this.image.src = this.src
        this.imgWidth  = width
        this.imgHeight = height

        // get canvas
        this.canvas       = document.querySelector(`${ id }`)
        this.ctx          = this.canvas.getContext('2d')  // получаем контекст canvas
        this.canvasWidth  = this.imgWidth
        this.canvasHeight = this.imgHeight
        this.canvas.setAttribute('width', this.canvasWidth)   // width  === ширине img
        this.canvas.setAttribute('height', this.canvasHeight) // height === ширине img

        // cut image
        this.imgSlice      = this.imgWidth / 2  // кол-во кусочков на которое обрезается img
        this.imgSliceWidth = 2                  // ширина кусочка

        // control animation
        this.waveAmplitude = waveAmplitude
        this.intensity     = intensity
        this.speed         = 0
        this.speedPlus     = speed
    }

    startAnimate = () => {
        this.speed += this.speedPlus
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

        for (let i = 0; i <= this.imgSlice; i++) {
            this.ctx.drawImage(
                this.image,

                i * this.imgSliceWidth - this.posX,
                Math.sin(this.speed - (i / this.waveAmplitude)) * this.intensity,
                this.imgSliceWidth,
                this.imgHeight,

                i * this.imgSliceWidth,
                this.posY,
                this.imgSliceWidth,
                this.imgHeight,
            )
        }

        this.requestAnim = requestAnimationFrame(this.startAnimate)
    }

    init = () => {
        this.image.addEventListener('load', this.startAnimate)
    }

    destroy = () => {
        // stop animation
        cancelAnimationFrame(this.requestAnim)
    }
}

 /*const draw = new Draw(
 		this.ctx.drawImage(image, 0, 0)
 	)*/
    	

/*const waveGlitch = new WaveGlitch(
    '#canvas',         // id элемента, или селектор
    'img/negotiation-foto0.jpg',   // путь до картинки(от HTML)
    300,
    245,

    // ↓ необязательные параметры ↓
    0,
    0,
    10,
    10,
    0.01, // значение от 0.1 до 1 (0.01, 0.001 и тд)
)

waveGlitch.init()

this.canvas.onmouseover = function()
		{ 
			waveGlitch.init() // вызвать анимацию
		}
		

	this.canvas.onmouseout = function()
		{       	
			waveGlitch.destroy();   // остановить анимацию
		}*/


// waveGlitch.destroy() // остановить анимацию
// для канваса width и height установятся автоматически !


//___________________________________________________


let canvas = document.getElementsByClassName('canvas');
let ctx = Array();
let canvasWidth = canvas[0].width;
let canvasHeight = canvas[0].height;
let image = Array();
let requestId;
let k;
let left = document.getElementById('left');
let right = document.getElementById('right');
let canvas_foto = document.getElementsByClassName('negotiation-foto-first');
let speed = 0;
let imgWidth = 300/2;
let imgHeight = 245;
const imageSlice = 2;   //ширина каждого анимируемого кусочка изобр 

for (var i = 0; i < 3; i++) 
{
	ctx[i]   = canvas[i].getContext('2d'); // получаем контекст canvas
	image[i] = new Image();  // создали новое изображение	
	image[i].src = 'img/negotiation-foto'+i+'.jpg';
	image[i].addEventListener('load', draw);  // загрузили изображение
}											// вызвав ф-цию draw

function draw() 
{
	for (var i = 0; i <= canvas.length - 1; i++) {
		ctx[i].drawImage(image[i], 0, 0); 
		canvas_foto[i].style.order = i
	}
}

left.onclick = function()   //карусель фотографий
{ 
	for (var i = 0; i <= canvas.length-1; i++) 
	{
		canvas_foto[i].style.order--
		if (canvas_foto[i].style.order<0) 
		{
			canvas_foto[i].style.order = canvas.length-1	
		}
		text_left(i, canvas_foto[i].style.order) 
		karusel(i)
	}		
}

right.onclick = function()    //карусель фотографий
{	
	for (var i = canvas.length - 1; i >= 0; i--) 
	{ 
		canvas_foto[i].style.order++
		if (canvas_foto[i].style.order>canvas.length-1) 
		{
			canvas_foto[i].style.order = 0
		}
		text_left(i, canvas_foto[i].style.order) 
		karusel(i)
	}
}

function text_left(num, or) 
{
	foto_text =
	canvas_foto[num].getElementsByClassName('negotiation-foto-text')
		
	text = 
	canvas_foto[num].getElementsByClassName('negotiation-text')

	if (foto_text[0] && text[0]) 
	{ 
		if ((or < 2) && (window.innerWidth>999)) left = 185
			else left = 25
		Array.from(foto_text)[0].style.left = left+'px'
		Array.from(text)[0].style.left = left+'px'
	}	
}

function karusel(num)
{
	ord = canvas_foto[num].style.order
	if (ord == 0) canvas_foto[num].classList.remove('desktop')
		else canvas_foto[num].classList.add('desktop')
}

	
canvas[0].onmouseover = function()
{ 	k=0;
	draw_wave();
}
	canvas[1].onmouseover = function()
{ 	k=1;
	draw_wave();
}
	canvas[2].onmouseover = function()
{ 	k=2;
	draw_wave();
}
	
	
canvas[0].onmouseout = function()
{       	
	cancelAnimationFrame(requestId);
	ctx[0].drawImage(image[0], 0, 0);
}

canvas[1].onmouseout = function()
{       	
	cancelAnimationFrame(requestId);
	ctx[1].drawImage(image[1], 0, 0);
}

canvas[2].onmouseout = function()
{       	
	cancelAnimationFrame(requestId);
	ctx[2].drawImage(image[2], 0, 0);
}




function draw_wave()  //волна фотографии
			{
				speed += 0.05;
				ctx[k].clearRect(0, 0, canvasWidth, canvasHeight); // очистка холста
					
				for (var i = 0; i < imgWidth; i++) { 
					ctx[k].drawImage(
						image[k], 
				
						i*imageSlice,   //позиция и размер холста
						Math.sin((speed-i/20)*3),
						imageSlice,
						imgHeight,

						i*imageSlice, //позиция и размер изображения
						0,
						imageSlice,
						imgHeight
					)
					
					}
					requestId = requestAnimationFrame(draw_wave);				
				}
			