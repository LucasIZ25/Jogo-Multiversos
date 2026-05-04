class Universo {
    constructor(nome, descricao, imagem) {
        this.nome = nome;
        this.descricao = descricao;
        this.imagem = imagem;
        this.pontos = 0;
    }
}

const A = new Universo("Medieval", "Você irá para o universo medieval, terra da anarquia onde apenas os mais fortes consegues sobreviver, você conseguira sobreviver?", "medieval.jpg");
const B = new Universo("Futurista","Você irá para o universo futurista, um lugar onde o dinheiro manda, a natureza é um vislumbre do captalismo selvagem, a cidades são cheias de bandidos e drogados, Boa sorte.", "futurista.jpg");
const C = new Universo("Apocalíptico","Você irá para o universo Pos Apocalíptico, um mundo devastado pela desordem e extremismo da humanidade, os recurços são escassos e as relações são razas e perigosas, cuidado com o que encontra.", "apocaliptico.webp");
const D = new Universo("Fantasia Urbana","Você irá para o universo Fantasia Urbana, um lugar  onde a vida parece normal mas, nas sombras grupos de multantes se reunem para se adaptarem a essa vida, alguns para o bem e outros para o mal, de qual lado vc será?", "fantasiaUrbana.jpg");

const universos = [A, B, C, D];

let respostasUsuario = {};

function responder(pergunta, valores, botao) {

    if (respostasUsuario[pergunta]) {
        const valoresAntigos = respostasUsuario[pergunta];

        universos.forEach((u, i) => {
            u.pontos -= valoresAntigos[i];
        });
    }


    universos.forEach((u, i) => {
        u.pontos += valores[i];
    });

    respostasUsuario[pergunta] = valores;

    // controle visual
    const botoes = botao.parentElement.querySelectorAll("button");
    botoes.forEach(b => b.classList.remove("selecionado"));
    botao.classList.add("selecionado");

    if (Object.keys(respostasUsuario).length === 10) {
        verResultado();
    }
}


// Q1
document.getElementById("p1q1").onclick = function(){ responder(1, [3,2,1,2], this); };
document.getElementById("p1q2").onclick = function(){ responder(1, [1,3,2,1], this); };
document.getElementById("p1q3").onclick = function(){ responder(1, [2,1,3,1], this); };
document.getElementById("p1q4").onclick = function(){ responder(1, [1,1,2,3], this); };

// Q2 até Q10 (automático)
for (let i = 2; i <= 10; i++) {
    const botoes = document.querySelectorAll(`#Q${i} button`);

    botoes[0].onclick = function(){ responder(i, [3,1,1,2], this); };
    botoes[1].onclick = function(){ responder(i, [1,3,2,1], this); };
    botoes[2].onclick = function(){ responder(i, [1,1,3,1], this); };
    botoes[3].onclick = function(){ responder(i, [2,2,1,3], this); };
}

function verResultado() {
    let vencedor = universos[0];

    universos.forEach(u => {
        if (u.pontos > vencedor.pontos) {
            vencedor = u;
        }
    });

    document.getElementById("resultado-titulo").innerText = "Você seria do universo:";
    document.getElementById("resultado-texto").innerText = vencedor.nome + " - " + vencedor.descricao;
    document.getElementById("resultado-img").src = vencedor.imagem;
}

document.getElementById("reiniciar").onclick = () => {
    location.reload();
};
