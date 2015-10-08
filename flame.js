
var MAGICWORD = 'FLAME';
var MAGICWORD_LENGTH = 5;
var FLAME_OBJ = {
	F:'Friend',
	L:'Love',
	A:'Affair',
	M:'Marriage',
	E:'Enemy'
}
var FIREBASE_URL = "https://flameapp.firebaseio.com";
var FIREBASE_REF = new Firebase(FIREBASE_URL);

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

function storeToFirebase(firstName,secondName,result){
	var obj;
	
	obj ['flame_row'+Date.now()] = {
			'firstName':firstName,
			'secondName':secondName,
			'result':result
		};
		
	FIREBASE_REF.set(obj);
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
	
	return magicWord;
}

function FlameButtonHandler(event){
	var firstName = document.getElementById('firstName').value;
	var secondName = document.getElementById('secondName').value;
	var result = document.getElementById('result');
	var resultGroup = document.getElementById('resultGroup');
	
	if(firstName.trim() == "" || secondName.trim() == ""){
		alert('Please enter valid values in name textfields');
		return;
	}
	var strippedName = stripCharacters(firstName,secondName);
	var FLAME_VALUE = calculateFLAME(strippedName.length);
	
	resultGroup.style.display = 'block';
	result.innerHTML = FLAME_OBJ[FLAME_VALUE];
	
	storeToFirebase(firstName,secondName,FLAME_OBJ[FLAME_VALUE]);
}
function init(){
	var button = document.getElementById('calculate');
	button.onclick = FlameButtonHandler;
}

window.onload = init;