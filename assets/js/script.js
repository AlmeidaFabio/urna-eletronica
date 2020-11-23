let span1 = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateralR = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function iniciarVotacao() {
    let etapa = etapas[etapaAtual];

    numero = '';
    votoBranco = false;

    let numeroHtml = '';
    for(let i = 0; i < etapa.numeros; i++) {
       if(i === 0) {
        numeroHtml += '<div class="num pisca"></div>';
       } else {
        numeroHtml += '<div class="num"></div>';
       }
    }

    span1.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateralR.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];

    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

    if(candidato.length > 0) {
        candidato = candidato[0];

        if(etapas[etapaAtual].titulo === 'VEREADOR') {
            span1.style.display = 'block';
            descricao.innerHTML = `
            Vereador(a): ${candidato.nome}<br/>
            Partido: ${candidato.partido}<br/>`;
            aviso.style.display = 'block';
        } else if(etapas[etapaAtual].titulo === 'PREFEITO') {
            span1.style.display = 'block';
            descricao.innerHTML = `
                Prefeito(a): ${candidato.nome}<br/>
                Vice: ${candidato.vice}<br/>
                Partido: ${candidato.partido}<br/>
            `;
            aviso.style.display = 'block';
        }
       

        let fotosHtaml = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHtaml += `<div class="d-1-image small">
                <img src="assets/images/${candidato.fotos[i].url}" alt="">
                ${candidato.fotos[i].legenda}</div>`
            } else {
                fotosHtaml += `<div class="d-1-image">
                <img src="assets/images/${candidato.fotos[i].url}" alt="">
                ${candidato.fotos[i].legenda}</div>`
            }
        }

        lateralR.innerHTML = fotosHtaml;

    } else {
        span1.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="alert pisca">VOTO NULO</div>';
    }
}

function clicou(n) {
    let num = document.querySelector('.num.pisca');
    if(num !== null) {
        num.innerHTML = n;
        numero =`${numero}${n}`;

        num.classList.remove('pisca');

        if(num.nextElementSibling !== null) {
            num.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
        
    }
}

function branco() {
    numero = '';
    votoBranco = true;
    span1.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="alert pisca">VOTO EM BRANCO</div>';
    lateralR.innerHTML = '';
}

function corrige() {
    iniciarVotacao();
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'
        });

    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            iniciarVotacao();
        } else {
           document.querySelector('.tela').innerHTML = '<div class="fim pisca">FIM</div>'; 
           console.log(votos);
        }
    }
}

iniciarVotacao();