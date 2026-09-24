function calcular(){

    let n1 = Number(document.getElementById("n1").value);
    let n2 = Number(document.getElementById("n2").value);
    let op = document.getElementById("op").value;

    let resultado;

    if(op == "+"){
        resultado = n1 + n2;
    }

    if(op == "-"){
        resultado = n1 - n2;
    }

    if(op == "*"){
        resultado = n1 * n2;
    }

    if(op == "/"){

        if(n2 == 0){
            document.getElementById("resultado").innerHTML = "Não é possível dividir por zero.";
            return;
        }

        resultado = n1 / n2;
    }

    document.getElementById("resultado").innerHTML = "Resultado: " + resultado;

}