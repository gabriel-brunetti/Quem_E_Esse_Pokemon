// SELETORES

// SELECIONANDO A IMAGEM (só temos uma na imagem)
const img = document.querySelector('img');
// selecionando o imput
const input = document.querySelector('input');
// selecionando o formulario
const formulario = document.querySelector('form');
// selecionando a DIV do formulário (vai piscar de acordo com o resultado)
const div = document.querySelector('div');
// seletor SPAN (pontuação), dentro do P
const span = document.querySelector('span');

// RANDOMIZANDO O ID DO POKEMON
const idPokemon = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }

// OUTRA FORMA DE RANDOMIZAR
    // queremos o intervalo entre 1 e 150, por isso o '149 + 1'
    // Math.floor(Math.random() * 149 + 1)

// CONSUMINDO UMA API
const gerarPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon(1,150)}`)
    // salvando minha resposta como json
    .then((resposta) => {return resposta.json() })
    // salvando minha resposta json dentro da variavel pokemon
    // e imprimindo o resultado
    .then((pokemon) => {
        // já tenho a imagem selecionada é necessário mudar o atributo src
        img.setAttribute('src', pokemon.sprites.front_default);
        // salvando o nome do pokemon no localStorage para comparar com o input
        localStorage.setItem('nomePokemon', pokemon.name);
     })
}

// MINHA
// const validarReposta = (evt) => {
//     evt.preventDefault();
//     let respostaCorreta = localStorage.getItem('nomePokemon');
//     let respostaUsuario = input.getAttribute('value');
//     if (respostaCorreta === respostaUsuario) {
//         console.log("Resposta Certa");
//         let score = localStorage.getItem('score');
//         score += 100;
//         localStorage.setItem('score')
        
//     } else {
//         console.log("Resposta Errada");
//     }
// }

// VERSAO THOMAZ
const validarReposta = (evt) => {
    evt.preventDefault();

    if (input.value === localStorage.getItem('nomePokemon')){
        div.style.backgroundColor = '#4caf50';
        localStorage.setItem(
            'score',
            String(parseInt(localStorage.getItem('score')) + 100)   
        );
    } else {
        div.style.backgroundColor = '#ff5722';
        localStorage.setItem(
            'score',
            String(parseInt(localStorage.getItem('score')) - 100)   
        );
    }

    img.style.filter = 'none';
    
    setTimeout(() => {
        input.value = '';
        input.focus();
        div.style.backgroundColor = '#f9f9f9';
        img.style.filter = 'brightness(0)';
        gerarPokemon();
        mostrarPontuacao();
    }, 1000);
}

const mostrarPontuacao = () => {
    if (localStorage.getItem('score') == null) {
        localStorage.setItem('score', '0');
    }
    span.innerHTML = localStorage.getItem('score')
}


// EVENTOS
window.onload = () => {
    gerarPokemon();
    localStorage.setItem('score', '0');
    mostrarPontuacao();

}
formulario.onsubmit = validarReposta;