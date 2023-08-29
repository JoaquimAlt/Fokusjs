const foco = document.querySelector('.app__card-button--foco');
const curto = document.querySelector('.app__card-button--curto');
const longo = document.querySelector('.app__card-button--longo');

const botoes = document.querySelectorAll('.app__card-button');

const musicaInput = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
musica.loop = true;

const play = new Audio('sons/play.wav');
const pause = new Audio('sons/pause.mp3');
const final = new Audio('sons/beep.mp3');

const botaoTemporizador = document.querySelector('#start-pause');
const iconeTemporizador = document.querySelector('.app__card-primary-butto-icon');
const textoBotaoTemporizador = document.querySelector('#start-pause').lastElementChild;

const tempoNaTela = document.querySelector('#timer')

const banner = document.querySelector('.app__image')

const titulo = document.querySelector('.app__title');

const html = document.querySelector('html');

let intervaloId = null;
let tempoDecorrido = 1500;

musicaInput.onchange = function(){
    if(musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
}

foco.onclick = function(){
    tempoDecorrido = 1500;
    alterarContexto('foco')
    foco.classList.add('active')
}

curto.onclick = function(){
    tempoDecorrido = 300;
    alterarContexto('descanso-curto')
    curto.classList.add('active')
}

longo.onclick = function(){
    tempoDecorrido = 900;
    alterarContexto('descanso-longo')
    longo.classList.add('active')
}

function alterarContexto(contexto){
    mostrarTempo()
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;

        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? 
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
        break;

        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.
            <strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        break;
    
        default:
            break;
    }

    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
}

const contagemRegressiva = function(){
    if(tempoDecorrido <= 0){
        parar();
        final.play();
        return;
    }
    tempoDecorrido -= 1;
    console.log('Temporizador ' + tempoDecorrido);

    mostrarTempo()
}

botaoTemporizador.onclick = function(){
    contadorDeTempo();
}

function contadorDeTempo(){
    if(intervaloId){
        parar();
        pause.play();
        return;
    }
    play.play();
    iconeTemporizador.src = '/imagens/pause.png';
    textoBotaoTemporizador.innerHTML = 'Pausar';
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function parar(){
    clearInterval(intervaloId);
    iconeTemporizador.src = '/imagens/play_arrow.png';
    textoBotaoTemporizador.innerHTML = 'Começar';
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorrido * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();


