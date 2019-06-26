var contaclick = 0;

var cellavuota = 9;

var celle = ['1','2','3','4','5','6','7','8','9'];


function mostra_puzzle(){

    var html = 	'<div class="container">' +
		'<h1>8 Puzzle Game</h1>'+
		'<br>'+
		'<label class="invisible" id="win">Complimenti, hai vinto!</label>'+
			'<div class="row" id="0">'+
				'<div class="col-" id="1"><img src="img/1.png"></div>'+
				'<div class="col-" id="2"><img src="img/2.png"></div>'+
				'<div class="col-" id="3"><img src="img/3.png"></div>'+
			'</div>'+
			'<div class="row" id="1">'+
				'<div class="col-" id="4"><img src="img/4.png"></div>'+
				'<div class="col-" id="5"><img src="img/5.png"></div>'+
				'<div class="col-" id="6"><img src="img/6.png"></div>'+
			'</div>'+
			'<div class="row" id="2">'+
				'<div class="col-" id="7"><img src="img/7.png"></div>'+
				'<div class="col-" id="8"><img src="img/8.png"></div>'+
				'<div class="col-" id="9"><img src="img/vuoto.png"></div>'+
			'</div>'+
	
	'<button id="nuovogioco" type="submit" class="btn btn-primary">Nuovo Gioco</button>'+
	'<br>'+
	'<label>numero mosse effettuate:<b id="mosse"></b></label>'+
	'</div>';
    $("#playground").html(html);
}

//var celle = [];

// mescola i numeri    
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// rinfreca matrice html
function refreshtabella(a){

    //console.log(a);
    // itero gli elementi dell'array
    for ( var i = 0 ; i < a.length ; i++ ){  
        // id usato per la cella nell'html
        var idcella = i+1;

        if (a[i] == 9){
            $("#"+idcella+" img" ).attr("src", "img/vuoto.png");
			cellavuota = idcella;
        }
        else{
            //console.log("#"+idcella+" img"+" valore: "+a[i]);
            $("#"+idcella+" img" ).attr("src", "img/"+a[i]+".png");
        }
    }
}

function scambio(pos){
	
    // funziona che controlla:
    // 1) la posizione subito a destra e a sinistra
    // 2) tre posizioni a destre e a sinistra 
    // se in almeno una c'è l'elemento vuoto si può fare lo scambio
	if (pos != cellavuota){
		console.log("posizione:",pos);
		console.log("cellavuota:",cellavuota);
		console.log("pos+1:",pos+1);
		console.log("pos-1:",pos-1);
		console.log("pos-3:",pos-3);
		console.log("pos+3:",pos+3);
		if ((pos-1 == cellavuota) || (pos+1 == cellavuota) || (pos-3 == cellavuota) || (pos+3 == cellavuota))
		{
			var tmp = celle[pos-1];
			celle[pos-1] = celle[cellavuota-1];
			celle[cellavuota-1] = tmp;
			cellavuota = pos;
			console.log(celle);
			refreshtabella(celle);
			contaclick = contaclick + 1;
			$('#mosse').html(contaclick);
			//alert("aaa");
			if (haiVinto())
			{
				$('#win').attr("class","visible");
			};
			//alert("bbb");
		}
	}
	else {console.log("ho cliccato la cella vuota");}

}

function haiVinto(){
	var ordinato = false;
	for (var i=0; i<celle.length; i++)
	{
		if (i != 0)
		{
			if (celle[i] > celle[i-1])
			{
				ordinato = true;
			}
			else
			{
				ordinato = false;
				break;
			}
		}
	}
	//console.log(ordinato);
	return ordinato;
}

$(document).ready(function(){
    
    // inzia nuovo gioco
	$('#nuovogioco').click(function () {
		$('#win').attr("class","invisible");
		contaclick = 0;
		$('#mosse').html(contaclick);
        shuffle(celle);//commentare x velocizzare soluzione
        refreshtabella(celle);
	});

    // click su di una cella 
    $('.col-').click(function (){
		var clickcella = $(this).attr('id');
		scambio(Number(clickcella));
    });

});

