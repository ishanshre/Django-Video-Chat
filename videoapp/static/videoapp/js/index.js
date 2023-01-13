console.log("hellow orld");
var labelUsername = document.querySelector("#label-username");
var inputUsername = document.querySelector("#username");
var btnJoin = document.querySelector("#btn-join");
var username;

var websocketOnMessage = (event) =>{
    var parsedData = JSON.parse(event.data)
    var message = parsedData['message']
    console.log("received data:  ", message)
}


btnJoin.addEventListener("click", (event) => {
    username = inputUsername.value;
    if (username =="") {
        return;
    }
    console.log(username)
    inputUsername.value = "";
    inputUsername.disabled = true;// username input disabled after joining the room
    inputUsername.style.visibility = 'hidden'; // input filed is hidden

    btnJoin.disabled = true;
    btnJoin.style.visibility = 'hidden';
    labelUsername.innerHTML = username
    var loc = window.location
    var ws = "ws://"

    if (loc.protocol === 'https://'){
        ws = "wss://";
    }
    var websocketEndpoint = ws + loc.host + loc.pathname + "ws/chat/"
    console.log(websocketEndpoint)

    //initiating connection to websocket using websocket api in javascript
    websocket = new WebSocket(websocketEndpoint)
    websocket.addEventListener("open", (event) => {
        console.log("web socket initiated: ", event)
        var testMsg = JSON.stringify({
            'message':'This is a message freom client'
        })
        websocket.send(testMsg)
    })
    websocket.addEventListener("message", websocketOnMessage)

    websocket.addEventListener("error", (event) => {
        console.log("an error occured: ", event)
    })

    websocket.addEventListener("close", (event) => {
        console.log("web socket closed: ", event)
    })

})



