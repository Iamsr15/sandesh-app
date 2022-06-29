const socket = io();

let name1;
let textArea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area");

//To display prompt asking name of the user

do{
    name1 = prompt("Please Enter your name: ");
}while(!name1)

//To send message when enter is pressed after writing message in textarea

textArea.addEventListener('keyup', (e) => {
    
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }

});

//The sendMessage() function to send the meassage

function sendMessage(msg){
    let msg1 = {
        user : name1,
        message : msg.trim()
    }

    //Appending the message to the DOM
    if(msg1.message != '')   //If message is not an empty string then only it will be sent
    appendMessage(msg1, 'outgoing');
    // else
    // return;
    
    //To make the text area empty after a message has been sent

    textArea.value = '';

    //To automatically scroll down when messages cover the height of messageArea

    scrollBottom();

    //Sending message to the server
    
   socket.emit('message', msg1);

}

//The appendMessage() function for appending the message

function appendMessage(msg, type){

    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className,'message');

    //To dynamically show name and message

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);

}

//Receving message from server (sending logic in server.js)(It will run only on browser and not on server)

socket.on('message', (msg) => {

    //Appending the message to the DOM
    
    if(msg.message != '')  //If message is not an empty string then only it will be recieved
    appendMessage(msg, 'incoming');

    //To automatically scroll down when messages cover the height of messageArea

    scrollBottom();

    
})

//Function to scroll to bottom automatically

function scrollBottom()
{
    messageArea.scrollTop = messageArea.scrollHeight;
}