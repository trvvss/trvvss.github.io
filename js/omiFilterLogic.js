/////////////////
// This code handles how a users choices result in Matching OMI Calls. It references objects in omiBuilder.js and omiLibrary.js
// Made by Travis Nelson - travis.nelson@zonarsystems.com in 2019
/////////////////

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/////////////////

function updateCheckedReturnElements(){
	for (i=0; i < returnElementCheckboxes.length; ++i){
		checkboxValue = returnElementCheckboxes[i].id;
		if(returnElementCheckboxes[i].checked){
			if(checkedReturnElements.includes(checkboxValue)){
				continue;
			}
			checkedReturnElements.push(checkboxValue);
		} else {
			var index = checkedReturnElements.indexOf(checkboxValue);
			if (index > -1) {
				checkedReturnElements.splice(index, 1);
			}	
		}
	}
	console.log("Checkbox Array Updated...");
}


/////////////////


function matchingCallLookupAndLogic(checkboxValue){

	if (isEmpty(matchingCallObjects)) {
		updateCheckedReturnElements();
		if (checkedReturnElements.length == 1){
			matchingCallLookupOrLogic(checkboxValue);
		}

		} else {
			console.log("AND Logic Lookup Initiated...Searching Through Matching Call Objects...");
			for (const individualCall in matchingCallObjects){
				if (matchingCallObjects.hasOwnProperty(individualCall)){
					var removalTrigger = true;
					if(matchingCallObjects[individualCall].returned.includes(checkboxValue) || matchingCallObjects[individualCall].returnedDetail.includes(checkboxValue)){
						removalTrigger=false;
						}
					if (removalTrigger == true){
						delete matchingCallObjects[individualCall];
						}		
					}
				}
			}
}

/////////////////


function matchingCallLookupOrLogic(checkboxValue){
	console.log("OR Logic Lookup Initiated...Searching Through OMI Calls Library...")
	for (const individualCall in omiCallsLibrary){
		if (omiCallsLibrary.hasOwnProperty(individualCall)) {
			var omiCallsLibraryReturnedElementsArray = omiCallsLibrary[individualCall].returned;
			var omiCallsLibraryReturnedDetailElementsArray = omiCallsLibrary[individualCall].returnedDetail;
			omiCallsLibraryReturnedElementsArray.forEach((x) => {
				var omiCallReturnedElement = x;
				if (omiCallReturnedElement == checkboxValue){
					var triggeredCallBuilderKey = individualCall;
					var triggeredCallBuilderValue = omiCallsLibrary[individualCall];
					matchingCallObjects[triggeredCallBuilderKey] = triggeredCallBuilderValue;
				}
			});
			omiCallsLibraryReturnedDetailElementsArray.forEach((x) => {
				var omiCallReturnedDetailElement = x;
				if (omiCallReturnedDetailElement == checkboxValue){
					var triggeredCallBuilderKey = individualCall;
					var triggeredCallBuilderValue = omiCallsLibrary[individualCall];
					matchingCallObjects[triggeredCallBuilderKey] = triggeredCallBuilderValue;
				}
			});			
		}
	} 
}


/////////////////

 
function matchingCallLookupRemove(checkboxValue){
	
	console.log("Uncheck Function Processes Initiated...")

	if (isEmpty(matchingCallObjects)){
		console.log("...No Matching Call Objects Currently Present");
		if (checkedReturnElements.length == 1){
			console.log("...A Single Return Value is Checked, But No Calls Match")
			matchingCallLookupOrLogic(checkedReturnElements[0]);
		} else {
			console.log("...There Are No Matching Calls, But There Are Return Values Checked");
			for (i=0; i<checkedReturnElements.length; ++i){
				matchingCallLookupOrLogic(checkedReturnElements[i]);
			}
			for (i=0; i<checkedReturnElements.length; ++i){
				matchingCallLookupAndLogic(checkedReturnElements[i]);
			}
		}
	}

	for (const individualCall in matchingCallObjects){
		console.log("There Are Matching Calls, But We Need To Remove Some Based On De-Selected Boxes...")
		var removalTrigger = true;
		
		if (matchingCallObjects.hasOwnProperty(individualCall)){
			if(matchingCallObjects[individualCall].returned.includes(checkboxValue)){
				checkedReturnElements.forEach((remainingReturnedElement) => {
				 	if (matchingCallObjects[individualCall].returned.includes(remainingReturnedElement)){
				 		removalTrigger = false;
				 		return;
				 	}
				
				 });
		
				if (removalTrigger == true){
					delete matchingCallObjects[individualCall];
					updateCheckedReturnElements();
				}	
			}  
			else if(matchingCallObjects[individualCall].returnedDetail.includes(checkboxValue)){
				checkedReturnElements.forEach((remainingReturnedElement) => {
				 	if (matchingCallObjects[individualCall].returnedDetail.includes(remainingReturnedElement)){
				 		removalTrigger = false;
				 		return;
				 	}
				
				 });
		
				if (removalTrigger == true){
					delete matchingCallObjects[individualCall];
					updateCheckedReturnElements();
				}	
			}



		} 

	if (isEmpty(matchingCallObjects)){
		console.log("All Matching Objects Have Been Removed");
		callBuilderClear();
		callDetailClear();
		matchingCallInstructionsDefault();
		let x = document.getElementById("callDetailsName");
    	x.innerHTML = "Begin By Checking a Return Value";
		}
	}
}