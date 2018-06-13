
//compass open function
function openCompass(){

	alert("this workds");


}

window.onload = function(){
	hide();
}

function hide(){
	$("#hidden-text").hide();
}

function solutionEnter(){
	for(i = 0; i<29; i++){
		document.getElementById("b-"+((i+1).toString())).innerHTML = "_" + " <br> " + ((i+1).toString()) ;
	}
	for(i = 0; i<Math.min(29,document.getElementById("input-sam").value.length); i++){

		document.getElementById("b-"+((i+1).toString())).innerHTML = document.getElementById("input-sam").value.charAt(i) + " <br> " + ((i+1).toString()) ;
	}

	if(document.getElementById("input-sam").value.toLocaleLowerCase().localeCompare("they were finding their scale")==0){
		$("#hidden-text").show();

		document.getElementById("hidden-text").textContent="You did it! Did you find the joke funny?";
	}else if(document.getElementById("input-sam").value.toLocaleLowerCase().localeCompare("yes")!=0 && document.getElementById("input-sam").value.length==29){
		$("#hidden-text").show();

		document.getElementById("hidden-text").textContent="Nope, try again.";
	}
	else{
		$("#hidden-text").hide();
	}
}






