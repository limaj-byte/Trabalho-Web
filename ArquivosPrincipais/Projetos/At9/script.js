const input = document.getElementById("input");

var btn= document.getElementById("Btn");

btn.addEventListener('click', function(){
    cep = input.value;
    async function Apichama(cep){
        const ceplimpo= cep.replace(/\D/g, '');
        const resposta= await fetch(`https://viacep.com.br/ws/${ceplimpo}/json/`);
        const dadosEnd=await resposta.json();
        document.getElementById("Estado").textContent= dadosEnd.estado;
        document.getElementById("Cidade").textContent= dadosEnd.bairro;
        document.getElementById("ddd").textContent=dadosEnd.ddd;
    }
    Apichama(cep)
});     