function adicionar(){

    let texto=document.getElementById("tarefa").value;

    if(texto=="") return;

    let li=document.createElement("li");

    let span=document.createElement("span");
    span.innerText=texto;

    span.onclick=function(){
        span.classList.toggle("concluida");
    };

    let botao=document.createElement("button");
    botao.innerText="Remover";

    botao.onclick=function(){
        li.remove();
    };

    li.appendChild(span);
    li.appendChild(document.createTextNode(" "));
    li.appendChild(botao);

    document.getElementById("lista").appendChild(li);

    document.getElementById("tarefa").value="";
}