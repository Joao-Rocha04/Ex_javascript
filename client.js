const axios = require("axios");

const config = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
}

function get_token(){
    return axios
        .post("https://tecweb-js.insper-comp.com.br/token", { username: "joaovr4" }, config)
        .then((response) => response.data.accessToken);
}


function get_exercises(token){
    config.headers.Authorization = `Bearer ${token}`;
    return axios
        .get("https://tecweb-js.insper-comp.com.br/exercicio", config)
        .then((response) => response.data)
}


async function soma(a,b,config2){
    return axios
    .post("https://tecweb-js.insper-comp.com.br/exercicio/soma", { "resposta": a+b}, 
    config2)
    .then((response) => response.data);
}
async function tamanho_string(s,config2){
    return axios
    .post("https://tecweb-js.insper-comp.com.br/exercicio/tamanho-string", { "resposta": s.length}, 
    config2)
    .then((response) => response.data);
}
async function nome_usuario(nome,config2){
    return axios
    .post("https://tecweb-js.insper-comp.com.br/exercicio/nome-do-usuario", { "resposta": nome.split("@")[0]}, 
    config2)
    .then((response) => response.data);

}
async function jaca_wars(entrada,config2){
    v = entrada.v;
    theta = entrada.theta*Math.PI/180;
    distancia = v*v*Math.sin(2*theta)/9.8;
    if (distancia > 98 && distancia < 102){
        acertou = 0;
    }else if (distancia < 98){
        acertou = -1;
    }else{
        acertou = 1;
    }
    return axios
    .post("https://tecweb-js.insper-comp.com.br/exercicio/jaca-wars", { "resposta": acertou},
    config2)
    .then((response) => response.data);
}
async function ano_bissexto(ano,config2){
    return axios
    .post("https://tecweb-js.insper-comp.com.br/exercicio/ano-bissexto", { "resposta": ano%4 == 0 && (ano%100 != 0 || ano%400 == 0)},
    config2)
    .then((response) => response.data);
}
async function volume_pizza(entrada,config2){
    raio = entrada.z;
    altura = entrada.a;
    volume = Math.round(Math.PI*raio*raio*altura);
    return axios
    .post("https://tecweb-js.insper-comp.com.br/exercicio/volume-da-pizza", { "resposta": volume},
    config2)
    .then((response) => response.data);
}
async function mru(entrada,config2){
    s0 = entrada.s0;
    v = entrada.v;
    t = entrada.t;
    x = s0 + v*t;
    return axios
    .post("https://tecweb-js.insper-comp.com.br/exercicio/mru", { "resposta": x},
    config2)
    .then((response) => response.data);
}
async function inverte_string(entrada,config2){
    return axios
    .post("https://tecweb-js.insper-comp.com.br/exercicio/inverte-string", { "resposta": entrada.split("").reverse().join("")},
    config2)
    .then((response) => response.data);
}
async function soma_objeto(objeto,config2){
    let soma = 0;
    for (let key in objeto){
        soma += objeto[key];
    }
    return axios
    .post("https://tecweb-js.insper-comp.com.br/exercicio/soma-valores", { "resposta": soma},
    config2)
    .then((response) => response.data);
}
async function is_prime(n){
    if (n == 1){
        return false;
    }
    for (let i = 2; i < n; i++){
        if (n%i == 0){
            return false;
        }
    }
    return true;
}
async function n_esimo_primo(n,config2){
    let contador = 0;
    let resposta = 2;
    while (contador < n) {
        if (await is_prime(resposta)) {
            contador++;
        }
        resposta++;
    }
    axios
    .post("https://tecweb-js.insper-comp.com.br/exercicio/n-esimo-primo", { "resposta": resposta-1},
    config2)
    .then((response) => response.data);
}
async function maior_prefixo_comum(lista,config2){
    let maior = "";
    for (let i = 0; i < lista.length - 1; i++) {
        for (let j = i + 1; j < lista.length; j++) {
            let prefixo = "";
            let k = 0;
            while (k < lista[i].length && k < lista[j].length && lista[i][k] === lista[j][k]) {
                prefixo += lista[i][k];
                k++;
            }
            if (prefixo.length > maior.length) {
                maior = prefixo;
            }
        }
    }
        return axios
            .post("https://tecweb-js.insper-comp.com.br/exercicio/maior-prefixo-comum", { "resposta": maior },
                config2)
            .then((response) => response.data);
    }
async function soma_segundo_maior_e_menor(lista,config2){
    lista.sort((a, b) => a - b);
    let resposta = 0;
    if (lista.length>2){
        resposta = lista[1] + lista[lista.length-2];
    }
    else if (lista.length==2){
        resposta = lista[0] + lista[1];
    }
    else{
        resposta = lista[0];
    }
    return axios
    .post("https://tecweb-js.insper-comp.com.br/exercicio/soma-segundo-maior-e-menor-numeros", { "resposta": resposta},
    config2)
    .then((response) => response.data);

}


async function main(){
    let token = await get_token();
    let exercises = await get_exercises(token);
    const config2 = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        }
    }
    console.log(exercises);
    let soma_dois = await soma(exercises.soma.entrada.a,exercises.soma.entrada.b,config2);
    let tamanho_string_dois = await tamanho_string(exercises["tamanho-string"].entrada.string,config2);
    let nome_usuario_dois = await nome_usuario(exercises["nome-do-usuario"].entrada.email,config2);
    let jaca_wars_dois = await jaca_wars(exercises["jaca-wars"].entrada,config2);
    let ano_bissexto_dois = await ano_bissexto(exercises["ano-bissexto"].entrada.ano,config2);
    let volume_pizza_dois = await volume_pizza(exercises["volume-da-pizza"].entrada,config2);
    let mru_dois = await mru(exercises.mru.entrada,config2);
    let inverte_string_dois = await inverte_string(exercises["inverte-string"].entrada.string,config2);
    let soma_objeto_dois = await soma_objeto(exercises["soma-valores"].entrada.objeto,config2);
    let n_esimo_primo_dois = await n_esimo_primo(exercises["n-esimo-primo"].entrada.n,config2);
    let maior_prefixo_comum_dois = await maior_prefixo_comum(exercises["maior-prefixo-comum"].entrada.strings,config2);
    let soma_segundo_maior_e_menor_dois = await soma_segundo_maior_e_menor(exercises["soma-segundo-maior-e-menor-numeros"].entrada.numeros,config2);
    console.log(soma_dois);
    console.log(tamanho_string_dois);
    console.log(nome_usuario_dois);
    console.log(jaca_wars_dois);
    console.log(ano_bissexto_dois);
    console.log(volume_pizza_dois);
    console.log(mru_dois);
    console.log(inverte_string_dois);
    console.log(soma_objeto_dois);
    console.log(n_esimo_primo_dois);
    console.log(maior_prefixo_comum_dois);
    console.log(soma_segundo_maior_e_menor_dois);
}



main();