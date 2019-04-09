/////////////////
// This code uses the contents of omiLibrary.js to build out on-page DOM elements and respond user choices
// This code calls functions declared in omiFilterLogic.js, omiLibrary.js and selectableValue.js
// Made by Travis Nelson - travis.nelson@zonarsystems.com in 2019
/////////////////

var matchingCallObjects = {}
var checkedReturnElements = []


/////////////////

const checkBoxBuilder = (function(){
	let returnElements = [];
	const checkboxHook = document.getElementById('checkboxValues');
	for (prop in omiCallsLibrary){
		for (i =0; i < omiCallsLibrary[prop].returned.length; ++i){
			returnElements.push(omiCallsLibrary[prop].returned[i]);
		}
	}
	let returnElementsUniqueValues = remove_duplicates_es6(returnElements);
    returnElementsUniqueValues.sort();
	for (i=0; i < returnElementsUniqueValues.length; ++i){
		checkboxHook.appendChild(checkboxMaker(returnElementsUniqueValues[i]));
	}
})();

/////////////////

function remove_duplicates_es6(arr) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
}


/////////////////

function checkboxMaker(libraryReturnElementValue){
	let frag = document.createDocumentFragment();
	let newDiv = document.createElement('div');
	let newInput = document.createElement('input');
	let newLabel = document.createElement('label');
	let newLabelText = document.createTextNode(libraryReturnElementValue);
	frag.appendChild(newDiv);
	newInput.type = "checkbox";
	newInput.name = "omiReturnValueOptions";
	newInput.value = libraryReturnElementValue;
	newInput.id = libraryReturnElementValue;
	newLabel.htmlFor = libraryReturnElementValue;
	newLabel.appendChild(newLabelText);
	newDiv.appendChild(newInput);
	newDiv.appendChild(newLabel);
	return frag;
	}


/////////////////



var returnElementCheckboxes = document.querySelectorAll("input[name=omiReturnValueOptions]");
for (i = 0; i < returnElementCheckboxes.length; ++i) {
    // console.log(returnElementCheckboxes[i]);
  	returnElementCheckboxes[i].addEventListener( 'change', function() {
  		ulClear();
		let checkboxValue = this.id;
        console.log(checkboxValue);
		updateCheckedReturnElements();
    	if(this.checked) {
    		console.log("Checkbox Value " + checkboxValue + " has been checked...");
            matchingCallInstructions();
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
    	// console.log(matchingCallObjects);
    	ulPopulator();
	});
}


/////////////////

var logicButtonValue = "orLogicButton";
const logicButtons = document.querySelectorAll("input[name=logicButton]");
for (i = 0; i < logicButtons.length; ++i){
	logicButtons[i].addEventListener( 'change', function() {
		logicButtonValue = this.id;
	});
}


/////////////////



function liMaker(callNameText, CallIdText){
	let frag = document.createDocumentFragment();
	let newLi = document.createElement('li');
	let newH2 = document.createElement('h2');
	let newP = document.createElement('p');
	let omiCallNameText = document.createTextNode(callNameText);
	frag.appendChild(newLi);
	newH2.appendChild(omiCallNameText);
	newLi.appendChild(newH2);
	newLi.id = CallIdText;
	return frag;
	}


const matchingCallsUL = document.getElementById('omiCallItems');
function ulPopulator(){
	var omiCallName = "";
	for (var prop in matchingCallObjects){
		omiCallName = matchingCallObjects[prop].name;
		omiCallID = prop;
		// console.log(omiCallName);
		matchingCallsUL.appendChild(liMaker(omiCallName, omiCallID));
		const el = document.getElementById(prop);
		el.addEventListener("click", matchingCallClicker, false)
	}
}

///////////////

function ulClear(){
	document.getElementById("omiCallItems").innerHTML = "";
}

function matchingCallInstructions(){
    document.getElementById("matchingCallInstructions").innerHTML = "Select one of the matching OMI calls below to view its details.";
}

function matchingCallInstructionsDefault(){
    document.getElementById("matchingCallInstructions").innerHTML = "Click on a Return Checkbox to view all associated OMI calls.";
}

function callDetailClear(){
	document.getElementById("callRequiredHook").innerHTML = "";
    document.getElementById("callOptionalHook").innerHTML = "";
    document.getElementById("callReturnedHook").innerHTML = "";
    document.getElementById("callDetailsInstructions").innerHTML = "";
    document.getElementById("callDetailsExternalURLlinkHook").innerHTML = "";
}

function callBuilderClear(){
    document.getElementById('callBuilderInputsSelectable').innerHTML = "";
}

function callBuilderEventListener(){
    console.log("eventListener Triggered");
    // console.log(this);
    // console.log(this.value);
    const newBuilderParameter = this.value;



    // console.log(newBuilderParameter);


    const callBuilderHook = document.getElementById('callBuilderInputsSelectable');

    if (this.checked){

        // console.log(this);
        // console.log(this.nextSibling);
        // console.log(this.nextSibling.innerHTML);
        // postHyphenStringCut(stringCutTest);
        // postHyphenStringCut(this.nextSibling.innerHTML);

        const frag = document.createDocumentFragment();
        const newBuilderDiv = document.createElement('div');
        const newBuilderLabel = document.createElement('label');
        const newBuilderLabelText = document.createTextNode(newBuilderParameter);
        const newBuilderInput = document.createElement('input');
        newBuilderDiv.id = "callBuilderParameter_" + newBuilderParameter;
        newBuilderLabel.appendChild(newBuilderLabelText);
        newBuilderLabel.htmlFor = newBuilderParameter;
        newBuilderLabel.appendChild(newBuilderLabelText);
        newBuilderInput.type = "text";
        newBuilderInput.name = "callBuilderParameter";


        let stringCutTest = this.nextSibling.innerHTML;        
        if(postHyphenStringCut(stringCutTest)){
            newBuilderInput.value = postHyphenStringCut(stringCutTest);
        }
        
        
        newBuilderInput.id = newBuilderParameter;
        newBuilderDiv.appendChild(newBuilderLabel);
        newBuilderDiv.appendChild(newBuilderInput);
        frag.appendChild(newBuilderDiv);
        callBuilderHook.appendChild(frag);
    } else {
        console.log("Call Builder Parameter Removal Triggered");
        const callBuilderParameterRemover = document.getElementById("callBuilderParameter_" + newBuilderParameter);
        return callBuilderParameterRemover.parentNode.removeChild(callBuilderParameterRemover);
    }
}

function matchingCallClicker(){
	callDetailClear();
    callBuilderClear();
	// console.log(this.id);
	const callDetail = this.id;
	// console.log(omiCallsLibrary[callDetail]);
	const callDetailName = omiCallsLibrary[callDetail].name;
    const callDetailDescription = omiCallsLibrary[callDetail].description;
    const callDetailExternalLink = omiCallsLibrary[callDetail].link;
	const callDetailRequired = omiCallsLibrary[callDetail].required;
	const callDetailOptional = omiCallsLibrary[callDetail].optional;
	const callDetailReturned = omiCallsLibrary[callDetail].returnedDetail;
    

    const callRequiredHook = document.getElementById("callRequiredHook");
    const callOptionalHook = document.getElementById("callOptionalHook");
    const callReturnedHook = document.getElementById("callReturnedHook");

    const requiredFrag = document.createDocumentFragment();
    const optionalFrag = document.createDocumentFragment();
    const returnedFrag = document.createDocumentFragment();

	const newReturnedUl = document.createElement('ul');
	
	for (prop in callDetailRequired){
        let newDiv = document.createElement('div');
        let newInput = document.createElement('input');
        let newLabel = document.createElement('label');
        let newLabelText = document.createTextNode((prop + " - " + callDetailRequired[prop]));
        requiredFrag.appendChild(newDiv);
        newInput.type = "checkbox";
        newInput.name = "callDetailRequiredOptions";
        newInput.value = prop;
        newInput.id = prop;
        newInput.addEventListener('change', callBuilderEventListener, false);
        newLabel.htmlFor = prop;

        newLabel.id = prop + "-label";


        newLabel.appendChild(newLabelText);
        newDiv.appendChild(newInput);
        newDiv.appendChild(newLabel);
        requiredFrag.appendChild(newDiv);
	}

	for (prop in callDetailOptional){
        let newDiv = document.createElement('div');
        let newInput = document.createElement('input');
        let newLabel = document.createElement('label');
        let newLabelText = document.createTextNode((prop + " - " + callDetailOptional[prop]));
        optionalFrag.appendChild(newDiv);
        newInput.type = "checkbox";
        newInput.name = "callDetailOptionalOptions";
        newInput.value = prop;
        newInput.id = prop;
        newInput.addEventListener('change', callBuilderEventListener, false);
        newLabel.htmlFor = prop;

        newLabel.id = prop + "-label";
        newLabel.appendChild(newLabelText);
        newDiv.appendChild(newInput);
        newDiv.appendChild(newLabel);
        optionalFrag.appendChild(newDiv);
	}

	for (i=0; i<callDetailReturned.length;++i){
		let newReturnedLi = document.createElement('li');
		let newReturnedLiText = document.createTextNode(callDetailReturned[i]);
		newReturnedLi.appendChild(newReturnedLiText);
		newReturnedUl.appendChild(newReturnedLi);
	}

    returnedFrag.appendChild(newReturnedUl);
    // console.log(callRequiredHook);
    // console.log(requiredFrag);
    callRequiredHook.appendChild(requiredFrag);
    callOptionalHook.appendChild(optionalFrag);
    callReturnedHook.appendChild(returnedFrag);



    let x = document.getElementById("callDetailsName");
    x.innerHTML = callDetailName;

    let y = document.getElementById("callDetailsInstructions");
    y.innerHTML = callDetailDescription;

    let z = document.getElementById("callDetailsExternalURLlinkHook");
    z.setAttribute('href',callDetailExternalLink);
    z.setAttribute('target', "_blank");
    z.innerHTML = "Click here to go to the full documentation page for this call.";

    let checkTest = document.getElementsByName("callDetailRequiredOptions");
    // console.log(checkTest);
    checkTest.forEach((x) => {x.click()});
}



function generateOMI(){
    console.log("Generate OMI URL Button Clicked")
    let omiURIstring = "https://omi.zonarsystems.net/interface.php?";
    const callBuilderContainer= document.querySelectorAll('#callBuilderInputs input[type=text');
    for (var i=0; i < callBuilderContainer.length; ++i){
        console.log(callBuilderContainer[i].id);
        let newParam = callBuilderContainer[i].id;
        console.log(callBuilderContainer[i].value);
        let newValue = callBuilderContainer[i].value;
        omiURIstring = omiURIstring + newParam + "=" + newValue + "&";
    }
    omiURIstring = omiURIstring.slice(0, -1);
    console.log(omiURIstring);
    let y = document.getElementById("callBuilderURLtext");
    y.value = omiURIstring;
    let x = document.getElementById("callBuilderURLlinkHook");
    x.setAttribute('href',omiURIstring);
    x.setAttribute('target','_blank');
    x.innerHTML = "Click to Perform OMI Call";


}

function postHyphenStringCut(string) {
    // console.log(string);
    let snipped = string.substring(string.indexOf('-')+2);
    // console.log(snipped);
    if (snipped.indexOf('(') > -1){
        // console.log("there are multiple options");
        return;
    } else {
        // console.log(snipped);
        return snipped;
    }
}