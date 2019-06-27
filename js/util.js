//con questa funzione applico le preferenze scelte al momento della registrzione dell'utente
function applicaPreferenze(){
	var user = JSON.parse(localStorage.getItem('user'));
	$('#titolo').attr("class","visible");
	$('#name').html(user.username);
	console.log(user);
	$('body').css("background-color", user.background);
	$('body').css("font-size", user.dimension);
	$('body').css("font-family", user.type); 
	$('body').css("color", user.color);
	if (user.menu == "sin")
		{
			$('#menuHome').removeClass("order-2").addClass("order-1");
			$('#bodyHome').removeClass("order-1").addClass("order-2");
		}
	else
		{
			$('#menuHome').removeClass("order-1").addClass("order-2");
			$('#bodyHome').removeClass("order-2").addClass("order-1");
		}
}

function utenteLoggato(){
if (localStorage.getItem('user') != null)
	{
		var user = JSON.parse(localStorage.getItem('user'));
		
		//se user.loggato = false, cioè se non c'è un utente loggato
		if (!user.loggato)
			{
				//faccio visualizzare le pagine solo se un utente è loggato
				window.location.replace("index.html");
			}
	}
}