let perguntas=[
{
    pergunta:"Quanto é 2+2?",
    respostas:["2","3","4"],
    certa:2
},
{
    pergunta:"Capital do Brasil?",
    respostas:["Brasília","Rio","São Paulo"],
    certa:0
},
{
    pergunta:"HTML é:",
    respostas:["Linguagem de marcação","Banco de dados","Sistema"],
    certa:0
},
{
    pergunta:"CSS serve para:",
    respostas:["Estilizar","Programar","Compilar"],
    certa:0
},
{
    pergunta:"JavaScript roda no navegador?",
    respostas:["Sim","Não","Às vezes"],
    certa:0
}
];

let atual=0;
let pontos=0;

mostrar();

function mostrar(){

    document.getElementById("pergunta").innerHTML=perguntas[atual].pergunta;

    let texto="";

    perguntas[atual].respostas.forEach(function(r,i){

        texto += `<input type="radio" name="r" value="${i}"> ${r}<br>`;

    });

    document.getElementById("respostas").innerHTML=texto;

}

function proxima(){

    let resposta=document.querySelector('input[name="r"]:checked');

    if(resposta && Number(resposta.value)==perguntas[atual].certa){
        pontos++;
    }

    atual++;

    if(atual<perguntas.length){
        mostrar();
    }else{
        let msg="Precisa melhorar.";

        if(pontos>=4){
            msg="Muito bem!";
        }else if(pontos>=2){
            msg="Bom trabalho!";
        }

        document.querySelector(".quiz").innerHTML=
        "<h2>Fim!</h2><p>Pontuação: "+pontos+"/5</p><p>"+msg+"</p>";
    }

}