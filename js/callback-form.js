const callback= document.querySelector('.feedback-container');
const userName = document.querySelector('#userName');
const userPhone = document.querySelector('#userPhone');
const userkomments = document.querySelector('#komments');
let hasError;

userPhone.addEventListener('click', function() { 
	if (!userPhone.value.trim()) {userPhone.value = '+380';}
})
userPhone.addEventListener('blur', function() {
	if (userPhone.value === '+380') userPhone.value = '';
})

callback.addEventListener('submit', function(event) {

	hasError = false;

	if (!userName.value.trim()){ 
		userName.classList.add('callback-form-input-error');
		hasError = true;	
	} 
	else userName.classList.remove('callback-form-input-error');
	
	if (!userPhone.value.trim() || !isPhoneValid(userPhone.value)){ 
		userPhone.classList.add('callback-form-input-error');
		hasError = true;	
	}
	else userPhone.classList.remove('callback-form-input-error');
	console.log(hasError) 
	if (hasError) event.preventDefault();
	else toggleMenu(feedback);
})

function isPhoneValid(phone = '') {
    const regexp = /(\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4})/;
    return phone.match(regexp);
}
