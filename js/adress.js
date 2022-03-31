
/*функционал кнопок (контакты в России и Белоруси)*/

function name(name, x) { return document.getElementsByClassName(name)[x];}
function elem(id) { return document.getElementById(id);}

const toggleMenu2 = function() 
{     
 for (var i = 0; i < 3; i++) 
 {
    name('contacts-adress-Russia', i).classList.toggle('nonactive')
	name('contacts-adress-Belorus', i).classList.toggle('active')
	if (i<2) 
	{
		name('contacts-country', i).classList.toggle('contacts-countries-active')
		name('contacts-country', i).classList.toggle('contacts-countries-nonactive')
	}	
  }
}

for (var i = 0; i < 2; i++) 
{
	name('contacts-country', i).onclick = function()	
	{
		toggleMenu2()
	}
}