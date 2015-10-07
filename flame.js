var firstName = "Apeksha";
var secondName = "Nitin";

var MAGICWORD = 'FLAME';
var MAGICWORD_LENGTH = 5;

function stripCharacters(firstName,secondName) {
	
	firstName = firstName.toUpperCase();
	secondName = secondName.toUpperCase();
	
	var combinedName = firstName + secondName;
	var i = firstName.length;
	
	
	while (i--) {
		var charToReplace = firstName.charAt(i);
		
		if( secondName.indexOf(charToReplace) !== -1 ) {
			var replaceRegEx = new RegExp(charToReplace,'g');
			combinedName = combinedName.replace(replaceRegEx,'');
		}
	}
	
	return combinedName;
}



function calculateFLAME(count){
	var magicWord = MAGICWORD;
	
	for(var i = 0; i< MAGICWORD.length - 1 ; i++) {
		
		var mod = count % magicWord.length;
		var charToRemove="";
		
		if(mod){
		 	charToRemove = magicWord.charAt( mod - 1 );
		}
		else {
			// if modulus is 0 means take the last character out
			charToRemove = magicWord.charAt( magicWord.length - 1 );
		}
		
		var magicWordArr = magicWord.split(charToRemove);
		magicWord = magicWordArr[1] + magicWordArr[0];	
	}
	
	console.log("Your Result: " + magicWord);
}

var resultantWord = stripCharacters(firstName,secondName);
calculateFLAME(resultantWord.length);
