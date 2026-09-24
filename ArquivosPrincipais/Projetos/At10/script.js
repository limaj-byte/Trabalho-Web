function adicionar(){

    let nome=document.getElementById("nome").value;
    let n1=Number(document.getElementById("n1").value);
    let n2=Number(document.getElementById("n2").value);

    let media=(n1+n2)/2;

    let situacao="Reprovado";

    if(media>=7){
        situacao="Aprovado";
    }else if(media>=5){
        situacao="Recuperação";
    }

    document.getElementById("tabela").innerHTML+=`
    <tr>
        <td>${nome}</td>
        <td>${media.toFixed(1)}</td>
        <td>${situacao}</td>
    </tr>
    `;

}