let seuVotoPara = document.querySelector('.linha-1 span');
let cargo = document.querySelector('.linha-2 span');
let descriçao = document.querySelector('.linha-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.foto');
let numeros = document.querySelector('.linha-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let som1 = new Audio("audio/som-de-urna-eletronica2.mp3");
let votos =[];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numerosHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0;i<etapa.numeros;i++) {
        if(i===0) {
            numerosHtml +='<div class="numero pisca"></div>'
        }else{    
            numerosHtml += '<div class="numero"></div>';
        }
    }
    seuVotoPara.style.display = 'none';
    cargo.innerHTML= etapa.titulo;
    descriçao.innerHTML = '';
    aviso.style.display= 'none';
    lateral.innerHTML = '';
    numeros.innerHTML= numerosHtml;
}


function atualizarInterface() {
   let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero===numero){
            return true;
        }else{
            return false;
        }
    });
    if(candidato.length>0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descriçao.innerHTML =`Candidato: ${candidato.nome}<br/> Partido: ${candidato.partido}`;
        aviso.style.display= 'block';
        let fotoHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small===true){
                fotoHtml +=  `<div class="d-1-foto small"><img src=${candidato.fotos[i].url} ><div>${candidato.fotos[i].legenda}</div></div>`;
            }else{
                fotoHtml +=  `<div class="d-1-foto"><img src=${candidato.fotos[i].url} ><div>${candidato.fotos[i].legenda}</div></div>`;
            };
        }
        lateral.innerHTML = fotoHtml;
    }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display= 'block';
        descriçao.innerHTML ='<div class="aviso-grande">VOTO NULO</div>';
    };
};
function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero!==null) {
        elNumero.innerHTML = n;
        numero=`${numero}${n}`;
        elNumero.classList.remove('pisca');
        if( elNumero.nextElementSibling!==null){
          elNumero.nextElementSibling.classList.add('pisca');                  
        }else{
            atualizarInterface();
        };
        
    }
};

function audio() {
    som1.play();
};

function branco() {
    if(numero===''){
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display= 'block';
        numeros.innerHTML= '';
        descriçao.innerHTML ='<div class="aviso-grande">VOTO BRANCO</div>';
    }else{
        alert('Para votar em BRANCO, nao deve haver nenhum número.');
    };
};
function corrige() {
    comecarEtapa();
};
function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    if(votoBranco===true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    }else if(numero.length===etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    };
    if(votoConfirmado===true){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        }else{  
            document.querySelector('.tela').innerHTML = '<div class="fim">FIM</div>';
            audio();
            console.log(votos);
        };
    };
};
comecarEtapa();