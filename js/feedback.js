let	modals_btn = document.getElementsByClassName('callback');
let	burger	= document.getElementById('burger');
let feedback = document.querySelector('.feedback-container');
let feedback_exit = document.getElementById('feedback_exit');
let feedback_sub = document.getElementsByClassName('consultation-callback-form');
let modal = document.querySelector('.modal');
let modal_exit = document.getElementById('mobile-menu-btn');
let modal_a = document.getElementsByTagName('a');

const toggleMenu = function(a) 
{ 
    a.classList.toggle('active');
    document.body.classList.toggle('body-scroll-disable');
}

for (var i = 0; i < modals_btn.length; i++) 
{ 
	modals_btn[i].addEventListener('click', function(e) 
	{ 	
    	e.stopPropagation();
    	toggleMenu(feedback);
    	elem = document.documentElement.getBoundingClientRect();
		var left = 
			(document.documentElement.clientWidth - 
				feedback.clientWidth) /2;
		var top = Math.abs(elem.y) +
			(document.documentElement.clientHeight - 
				feedback.clientHeight) /2;
		feedback.style = "top:" + top + "px; left:" + left + "px;";
	});

	document.addEventListener('click', function(e) 
	{ 
   		const target = e.target; 
   		const its_feedback = target == feedback || feedback.contains(target);
    	const its_modals_btn = target == modals_btn[i];
    	const its_feedback_exit = target == feedback_exit;
    	const feedback_is_active = feedback.classList.contains('active');
    	const its_feedback_sub = 
    	target.classList.contains('consultation-callback-form') ||
    	target.parentNode.classList.contains('consultation-callback-form')

        	if ((!its_feedback && !its_modals_btn && !its_feedback_sub
        		 || its_feedback_exit) && feedback_is_active) 
    	{ 
        	toggleMenu(feedback);
    	}

	});
}

burger.addEventListener('click', function(e) {
	toggleMenu(modal);
});

modal_exit.addEventListener('click', function(e) {
	toggleMenu(modal);
	});

for (var i = modal_a.length - 1; i >= 0; i--) {
	modal_a[i].addEventListener('click', function(e) {
	toggleMenu(modal);
});
}