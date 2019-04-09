
//https://github.com/Pikaday/Pikaday



var pickedDate = "";
var pickedHr = "";
var pickedMin = "";
var pickedSec = "";
const epochDisplay = document.getElementById("epochValueOutput");

//Create and configure date picker input

var picker = new Pikaday({ 
	field: document.getElementById('datepicker'),
	format: "MMM Do YYYY",
    onSelect: function() {
    	pickedDate=this.getMoment().format('LL', 'MMMM D YYYY');
    	// console.log(pickedDate);
    	epochConversion(epochStringInputMaker());
	}
});


const epochConverterInputListeners = (function(){
	
	let epochConverterInputListenerHrTarget = document.getElementById("epochConverterInputHr")
	let epochConverterInputListenerMinTarget = document.getElementById("epochConverterInputMin")
	let epochConverterInputListenerSecTarget = document.getElementById("epochConverterInputSec")

	epochConverterInputListenerHrTarget.addEventListener('keyup', function(){
		pickedHr = this.value;
		epochConversion(epochStringInputMaker());
		});
	epochConverterInputListenerMinTarget.addEventListener('keyup', function(){
		pickedMin = this.value;
		epochConversion(epochStringInputMaker());
		});	
	epochConverterInputListenerSecTarget.addEventListener('keyup', function(){
		pickedSec = this.value;
		epochConversion(epochStringInputMaker());
		});
})();


function epochStringInputMaker(){
	let x = pickedDate + " " + pickedHr + ":" + pickedMin + ":" + pickedSec;
	// console.log(x);
	return x; 
}


function epochConversion(x){
	//Human readable dates to epoch from https://www.epochconverter.com/programming/#javascript
	var myDate = new Date(x); // Your timezone!
	var myEpoch = myDate.getTime()/1000.0;
	// console.log(myEpoch);
	if (isNaN(myEpoch)){
		epochDisplay.value = "Try Again";
	} else {
		epochDisplay.value = myEpoch;
	}
}
