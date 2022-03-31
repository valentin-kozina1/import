let canvas = document.getElementsByClassName('canvas');
let canvas_foto = document.getElementsByClassName('negotiation-foto-first');
let left = document.getElementById('left');
let right = document.getElementById('right');

let ctx = Array();
let canvasWidth = canvas[0].width;
let canvasHeight = canvas[0].height;
let image = Array();
let requestId;
let k;
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
			