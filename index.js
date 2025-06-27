

var verificaContinente = sessionStorage.getItem("continente")

if(verificaContinente){

    mostrarCarregando()

    if(verificaContinente === "Europa"){

         var capturaAudio = "audio/champions.mp3"
            var player = document.getElementById("audioteste")

            player.src = capturaAudio
            player.play()

    }

     if(verificaContinente === "America Do Sul"){

         var capturaAudio = "audio/libertadores.mp3"
            var player = document.getElementById("audioteste")

            player.src = capturaAudio
            player.play()

    }


    if(verificaContinente === "FifaCup"){

         var capturaAudio = "audio/mundial.mp3"
            var player = document.getElementById("audioteste")

            player.src = capturaAudio
            player.play()

    }

    if(verificaContinente === "Brasileirao"){

         var capturaAudio = "audio/brasileirao.mpeg"
            var player = document.getElementById("audioteste")

            player.src = capturaAudio
            player.play()

    }


    setTimeout(() => {
         document.getElementById("carregando-campeonato").style.display = "none"
         document.getElementById("um").style.display = "none"
    document.getElementById("dois").style.display = "block"

    var capturaAudio = "audio/sortear.m4a"
            var player = document.getElementById("audioteste")

            player.src = capturaAudio
            player.play()
    }, 6000);
   
   
    
}else{
   
   document.getElementById("carregando-campeonato").style.display = "none"
       document.getElementById("um").style.display = "block"
       document.getElementById("dois").style.display = "none"
}

document.getElementById("americadosul").addEventListener("click",function(){
    
   sessionStorage.setItem("continente","America Do Sul")
    window.location.href = "index.html"
   
})


document.getElementById("europa").addEventListener("click",function(){
    sessionStorage.setItem("continente","Europa")
    window.location.href = "index.html"
  
})

document.getElementById("fifacup").addEventListener("click",function(){
    sessionStorage.setItem("continente","FifaCup")
   window.location.href = "index.html"
 
})

document.getElementById("brasileirao").addEventListener("click",function(){
    sessionStorage.setItem("continente","Brasileirao")
    window.location.href = "index.html"
  
    //alert("Brasileirão (Página em construção)")
})



    // ACESSANDO O SERVIDOR PARA FAZER REQUISIÇÕES

fetch("backend.json")
.then(response => response.json())
.then(data => {
    console.log("Sucesso ao fazer a requisição. :)");

// SALVANDO A REQUISIÇÃO NO BANCO DE DADOS LOCAL

var salvarLocalmente = sessionStorage.setItem("requisicao",JSON.stringify(data))

    console.log("A requisição foi salva no banco de dados local :)")
  
})

.catch( error => console.error("Erro ao fazer a requisição. :/" , error));







 

// COMANDO PARA QUANDO APERTAR NO BOTÃO SELECIONAR ADICIONAR O NOME DO JOGADOR NO BANCO DE DADOS LOCAL
var clicouBotao = document.getElementById("btn-sortear")
clicouBotao.addEventListener("click", function(){

    var captura_times_bd_local = JSON.parse(sessionStorage.getItem("requisicao"))

 var capturaContinente =  sessionStorage.getItem("continente")

 var confronto = captura_times_bd_local.find( tbd => tbd.Continente === capturaContinente)

if(confronto){

    if(confronto.times.length < 1){

        alert("NÃO HÁ MAIS TIMES NESTE CAMPEONATO DISPONÍVEL :)")

    }else{

        console.log(confronto.times.length)

    var capturaNome =  document.getElementById("selecionar").value

    var sorteio = Math.floor(Math.random()* confronto.times.length)

    var timesRecuperados = confronto.times.splice(sorteio,1)

     timesRecuperados.forEach(t => {

        var capturaAudio = t.audio
            var player = document.getElementById("audioteste")

            player.src = capturaAudio
            player.play()



    sessionStorage.setItem(capturaNome,JSON.stringify(t))

$("."+capturaNome).attr('src', t.imagem)
$("#times-"+capturaNome).attr('style', "background-color: green;")
$("#time-"+capturaNome).html(t.time)


     sessionStorage.setItem("requisicao",JSON.stringify(captura_times_bd_local))


 // alert(`O jogador ${capturaNome} escolheu o time : ${t.time}`)
    
  })

   


    }

    
 } else{

    console.log("Não existe esse continente no banco de Dados", capturaContinente )
 }




 

 // APÓS CAPTURAR O NOME DO JOGADOR SALVAR NO BANCO DE DADOS LOCAL




 
});
    







document.getElementById("reiniciar").addEventListener("click",function(){
    sessionStorage.clear()
    alert("Você apagou o Banco de Dados")
    window.location.href="index.html"
})



function mostrarCarregando(){

     document.getElementById("dois").style.display = "none"


var montarHTML = `


<img src="img/carregando.gif" width="150px;">
        O campeonato está <br>sendo carregado..
`
$("#carregando-campeonato").append(montarHTML)
}




