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
    console.log(soma_dois);
    console.log(tamanho_string_dois);
    console.log(nome_usuario_dois);
    console.log(jaca_wars_dois);
    console.log(ano_bissexto_dois);
    console.log(volume_pizza_dois);
    console.log(mru_dois);
}



main();