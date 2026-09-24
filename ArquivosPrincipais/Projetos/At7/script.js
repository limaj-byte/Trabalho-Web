function atualizar(){

    let agora = new Date();

    let h = String(agora.getHours()).padStart(2,"0");
    let m = String(agora.getMinutes()).padStart(2,"0");
    let s = String(agora.getSeconds()).padStart(2,"0");

    document.getElementById("relogio").innerHTML = h + ":" + m + ":" + s;

}

setInterval(atualizar,1000);

atualizar();