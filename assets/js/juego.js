// 2C = Two of clubs
// 2C = Two of diamonds
// 2C = Two of hearts
// 2C = Two of spades

// const _ = require("underscore");

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias de html
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');



const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');



const puntosHTML = document.querySelectorAll('small'); //sE TIENEN LOS DOS ELEMENTOS SMALL

// Esta funcion crea una nueva baraja
const crearDeck = () => {
    for(let i=2; i<=10; i++){
        for(let tipo of tipos){
            deck.push(i+tipo);
        }
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp+tipo);
        }
    }
    
    // console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);

    return deck;

};

crearDeck();

//Esta funcion me permite tomar una carta
const pedirCarta = () => {
    if(deck.length === 0){
        throw 'No hay cartas en del deck'
    }
    const carta = deck.pop();
    // console.log(deck);
    // console.log(carta)
    return carta;
};

// for(let i = 0; i <= 100; i++){
//     pedirCarta();
// }


// pedirCarta();
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length-1);
    return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    // let puntos = 0;
    // console.log({valor});
    // 2 = 2, 10 = 10, 3 = 3
    // if(isNaN(valor)){
    //     // console.log('no es un numero');
    //     puntos = (valor === 'A') ? 11 : 10;
    // } else {
    //     // console.log('es un numero');
    //     puntos = valor * 1;
    // }
    // console.log(puntos);
};
// en Js ojo con los strings ya que un string numero al sumar algo se concanera
// string gris, number morado


//Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    do{
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        if(puntosMinimos>21){
            break;
        }
    } while((puntosComputadora<puntosMinimos) && (puntosMinimos<=21));

    setTimeout(() => {
        if(puntosComputadora===puntosMinimos){
            alert('nadie gana :(');
        } else if(puntosMinimos>21){
            alert('la computadora gana');
        } else if(puntosComputadora>21) {
            alert('jugador gana');
        } else{
            alert('Computadora gana');
        }
    }, 10);
    

};



//DOM - Document Object Model

//Eventos
//hay un monton de eventos
btnPedir.addEventListener('click', () =>{
    const carta = pedirCarta();
    // console.log({carta});
    puntosJugador = puntosJugador + valorCarta(carta);
    // console.log({puntosJugador});
    puntosHTML[0].innerText = puntosJugador;
    // puntosHTML[1].innerText = puntosJugador;
    //crea solo la etiqueta <img> se necesita crear la class y el source
    const imgCarta = document.createElement('img');
    //src
    imgCarta.src = `assets/cartas/${carta}.png`;
    //class
    imgCarta.classList.add('carta');
    //Inserta la carta
    divCartasJugador.append(imgCarta);

    if(puntosJugador>21){
        console.warn('Perdistes!!!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21, Ganastes!!!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }


});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0] = 0;
    puntosHTML[1] = 0;

    divCartasComputadora.innerText = '';
    divCartasJugador.innerText = '';
    
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    
});