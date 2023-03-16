import {textMsgs} from './api.js';
import {questions} from './question.js';
let text;
let textvalue;
const UL = document.querySelector('ul');
const CHATBOX = document.getElementById('chat-contents');
const SIDEBAR = document.querySelector('.sidebar-toggle ');
const SIDE = document.querySelector('.sidebar');
const reset = document.querySelector('.reset');

reset.addEventListener('click', function(){
  window.location.reload();
})
SIDEBAR.addEventListener('click', function(){

  SIDEBAR.classList.toggle('rotate');
  SIDE.classList.toggle('active_side')

})

displayQuestion(questions)

function displayQuestion(questions){

  for(let i = 0; i < questions.length; i++){

    let li = document.createElement('li');
    let input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.classList.add('input_questions')
    input.value = questions[i];
    li.appendChild(input);
    UL.appendChild(li);
    
  }
};

let inputQuestions = document.querySelectorAll('.input_questions');
inputQuestions.forEach(question => {
  question.addEventListener('click', function(){
    question.classList.add('active');
  })
})

UL.querySelectorAll('li').forEach(li => {
  
  
  let input= li.querySelector('input').value;

  li.addEventListener('click',function (){
      textvalue = input;
      if(textvalue){
        let input =  document.getElementById("chat-message-value");
        input.value = textvalue;
      }
  })
});


function displayMessage(){

  var copieDiv = document.createElement('div');
  copieDiv.className = 'button_copie';
  copieDiv.innerHTML = 'copier'
   var newDiv = document.createElement("div");
   newDiv.className = "chat-bubble";
   var newImg = document.createElement("img");
   newImg.className = "bot image";
   var newP = document.createElement("p");

   if(text in textMsgs){
      newP.innerHTML = textMsgs[text];
   }else{
      newP.innerHTML = `j'ai pas d'informations sur cela `
   }
   if(!text){
      newP.innerHTML = 'Demande moi ce que tu veux  '
   }
   
   newDiv.appendChild(newImg)
   newDiv.appendChild(newP)
   newDiv.appendChild(copieDiv)
   
   
   var messages = document.getElementById("chat-contents");
   messages.appendChild(newDiv);

     
   let button = document.querySelectorAll('.button_copie');
   button.forEach(el => el.addEventListener('click', function() {
    
        let copie = newP.innerHTML
        navigator.clipboard.writeText(copie);
        copieDiv.style.background = "#1e3d3d";
        copieDiv.style.color = "#fff";
        copieDiv.innerHTML = "copié"
    }))

    CHATBOX.scrollTo(0,9999)
    console.log(CHATBOX.scrollTo(0,9999))
 }
 
 function arrowSubmit(){

   console.log("here")
   text = document.getElementById("chat-message-value");
   button = document.getElementById("submit-chat");

   if( text.value != ""){
     button.classList = "active";
   }else{
     button.classList.remove("active");
   }
 }
 
 function submitMessage(){

   text = document.getElementById("chat-message-value").value;
   if(text == ""){
     return;
   }

   document.getElementById("chat-message-value").value = ""

  var copieDiv = document.createElement('div');
  copieDiv.className = 'button_copie';
  copieDiv.innerHTML = 'copier'
   var newDiv = document.createElement("div");
   newDiv.className = "chat-bubble";
   var newImg = document.createElement("img");
   newImg.className = "user image";
   var newP = document.createElement("p");
   newP.innerHTML = text;
   newDiv.appendChild(newImg);
   newDiv.appendChild(newP);
   newDiv.appendChild(copieDiv);
   
   var messages = document.getElementById("chat-contents");
   messages.appendChild(newDiv);
   document.getElementById("submit-chat").classList.remove("active");
   setTimeout(function(){displayMessage("response")}, 1000);
   CHATBOX.scrollTo(0,9999)
   console.log(CHATBOX.scrollTo(0,9999))

 }
 
 function addHandlers(){

   document.getElementById("submit-chat").addEventListener("click", submitMessage);

   document.addEventListener('keydown',function (e){
      if( e.code == 'Enter' ){1
        document.getElementById("submit-chat").click();
      }
    });

   setTimeout(function(){displayMessage()}, 1000);
   document.getElementById("chat-message-value").addEventListener("input", arrowSubmit);
 }

window.addEventListener("load", function(){
  addHandlers();

});

