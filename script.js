let seuVotoPara = document.querySelector('.linha-1 span');
let cargo = document.querySelector('.linha-2 span');
let descriçao = document.querySelector('.linha-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.foto');
let numeros = document.querySelector('.linha-3');

let etapaAtual = 0;

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numerosHtml = '';

    for(let i=0; i<etapa.numeros;i++) {
    numerosHtml += '<div class="numero"></div>';
    }
    seuVotoPara.style.display = 'none';
    cargo.innerHTML= etapa.titulo;
    descriçao.innerHTML = '';
    aviso.style.display= 'none';
    lateral.innerHTML = '';
    numeros.innerHTML= numerosHtml;
}

function clicou(n) {
    alert(n);
};
function branco() {

};
function corrige() {

};
function confirma() {

};
comecarEtapa();