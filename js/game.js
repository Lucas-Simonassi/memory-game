const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'Kurumi022',
    'ren',
    'kanojo022',
    'zero_two005',
    'suzune_',
    'Kurumi055',
    'Komi_sann',
    'Kaguya022',
    'Kaguya01',
    'utaha',
    'firee',
    'suzune011',
    'miku',
    'kitagawa',
    
];

const createElement  = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
 const disabledCards = document.querySelectorAll('.disabled-card');

if (disabledCards.length == 28) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
 
    setTimeout(() => {
  
      // Criar os botões
      const buttonsContainer = document.createElement('div');
      buttonsContainer.id = 'endgame-buttons';
  
      const restartButton = document.createElement('button');
      restartButton.textContent = 'Tentar novamente';
      restartButton.onclick = () => {
        // Reiniciar o jogo
        location.reload(); 
      };
  
      const exitButton = document.createElement('button');
      exitButton.textContent = 'Sair';
      exitButton.onclick = () => {
        // Voltar à tela de login
        window.location.href = 'file:///C:/Users/User/Documents/Jogo/index.html';
      };
  
      buttonsContainer.appendChild(restartButton);
      buttonsContainer.appendChild(exitButton);
  
      document.body.appendChild(buttonsContainer);
    }, 0); 
}
};
    
  

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout(() => {

        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');

        firstCard = '';
        secondCard = '';

        }, 500);
    }

}

const revealCard = ({ target }) => {
if (target.parentNode.className.includes('reveal-card')) {
    return;
}
   if (firstCard == '') {
  target.parentNode.classList.add('reveal-card');
   firstCard = target.parentNode; 

} else if (secondCard == '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards()


} 
}

const createCard = (character) => {

const card = createElement('div', 'card');
const front = createElement('div','face front');
const back = createElement('div','face back');

front.style.backgroundImage =  `url('../images/${character}.png')`;

card.appendChild(front);
card.appendChild(back);

card.addEventListener('click', revealCard);
card.setAttribute('data-character', character)

return card;
}

const loadGame = () => {
   const duplicateCharacters = [ ...characters, ...characters ];

const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5 );

    shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
});

}

// precisa disso fora da const  pro tempo funcionar
timer.innerHTML = '00:00';
timer.dataset.time = 0;

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.dataset.time; // Obter o tempo total em segundos
        timer.dataset.time = currentTime + 1; // Incrementar o tempo total

        // Calcular minutos e segundos
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;

        // Formatar para MM:SS
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        // Atualizar a exibição do timer
        timer.innerHTML = formattedTime;

    }, 1000);
}

// serve pra trazer o nome do player
window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();


loadGame();
}