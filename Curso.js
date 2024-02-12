
function capitalize(str){
    let capitalizedString = str.charAt(0).toUpperCase();	
    for (let i = 1; i < str.length; i++){
        if (str.charAt(i-1) === ' '){
            capitalizedString += str.charAt(i).toUpperCase();
        }
        else{
            capitalizedString += str.charAt(i).toLowerCase();
        }
    }
    return capitalizedString;
  }
    
  const capitalized = capitalize("pensar incomoda como andar bajo la lluvia");
  console.log(capitalized);


  function capitalize2(str){
    function capitalizeWord(word){
        let capitalizeWord = word.charAt(0).toUpperCase() + word.slice(1);
        return capitalizeWord;
    }
    let wordsInString = str.toLowerCase().split(' ');

    for (let i = 0; i < words_in_string.length; i++){
        wordsInString[i] = capitalizeWord(wordsInString[i]);
    }
    return wordsInString.join(' ');
}
capitalize("pensar incomoda como andar bajo la lluvia");

