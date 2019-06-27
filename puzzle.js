var contaclick = 0;

var cellavuota = 9;

var celle = ['1','2','3','4','5','6','7','8','9'];

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