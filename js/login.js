const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');


const validateInput = ({ target}) => {
    const minLength = 4; 
    const maxLength = 11;
    if (target.value.length > minLength && target.value.length <= maxLength) {   // valida o nome se tiver mais de 4 caracteres
        button.removeAttribute('disabled');
        return;
    }

    button.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
    event.preventDefault();
  
    localStorage.setItem('player', input.value);
    window.location = 'pages/game.html';
}


input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);