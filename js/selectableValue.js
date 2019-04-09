/////////////////
// Added functionality to display an expanded list of selectable return value options.
// Made by Travis Nelson - travis.nelson@zonarsystems.com in 2019 
/////////////////

const returnValueSelectionBehavior = (function(){
	let selectoChango = document.getElementById("returnValueSelector");
	selectoChango.addEventListener("change", selectorTest);
})();


function selectableReturnElementAppender(x){
	let returnElements = [];
	let selectedElement = x;
	const checkboxHook = document.getElementById('checkboxValues');
	for (prop in omiCallsLibrary){
		for (i =0; i < omiCallsLibrary[prop].returnedDetail.length; ++i){
			// console.log(omiCallsLibrary[prop].returnedDetail[i]);
			if (x==omiCallsLibrary[prop].returnedDetail[i]) {
				returnElements.push(omiCallsLibrary[prop].returnedDetail[i])
			}
		}
	}
	let returnElementsUniqueValues = remove_duplicates_es6(returnElements);
	// console.log(returnElementsUniqueValues);
	for (i=0; i < returnElementsUniqueValues.length; ++i){
		checkboxHook.appendChild(checkboxMaker(returnElementsUniqueValues[i]));
	}

	const selectedElementCheckbox = document.getElementById(x);
	console.log(selectedElementCheckbox);
  	selectedElementCheckbox.addEventListener( 'change', function() {
  		ulClear();
		let checkboxValue = this.id;
		updateCheckedReturnElements();
    	if(this.checked) {
    		console.log("Checkbox Value " + checkboxValue + " has been checked...");
    		if (logicButtonValue == "orLogicButton"){
    			matchingCallLookupOrLogic(checkboxValue);
    		} else {
    			matchingCallLookupAndLogic(checkboxValue);
    		}
    	} else {
    		matchingCallLookupRemove(checkboxValue);
			if (checkedReturnElements.length == 1){
				matchingCallLookupOrLogic(checkedReturnElements[0]);
			}
    	}

    	ulPopulator();
	});

	returnElementCheckboxes = document.querySelectorAll("input[name=omiReturnValueOptions]");
	// console.log(returnElementCheckboxes);


}


const selectableReturnElementBuilder = (function(){
	let ReturnElements = [];
	const valueSelectorHook = document.getElementById('returnValueSelector');
	for (prop in omiCallsLibrary){
		for (i =0; i < omiCallsLibrary[prop].returnedDetail.length; ++i){
			ReturnElements.push(omiCallsLibrary[prop].returnedDetail[i]);
		}
	}
	let returnElementsUniqueValues = remove_duplicates_es6(ReturnElements);
	returnElementsUniqueValues.sort();
	for (i=0; i < returnElementsUniqueValues.length; ++i){
		valueSelectorHook.appendChild(selectoMaker(returnElementsUniqueValues[i]));
	}
})();




function selectorTest(){
	console.log("test");
	var x = document.getElementById("returnValueSelector").value;
	console.log(x);
	selectableReturnElementAppender(x);
	let selectoAutoCheck=document.getElementById(x)
	selectoAutoCheck.click();
}


function selectoMaker(libraryReturnElementValue){
	let frag = document.createDocumentFragment();
	let newOption = document.createElement('option');
	let newOptionText = document.createTextNode(libraryReturnElementValue);
	frag.appendChild(newOption);
	newOption.value = libraryReturnElementValue;
	newOption.appendChild(newOptionText);
	return frag;
	}