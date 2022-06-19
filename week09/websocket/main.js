// wss is the secure protocol used by websockets instead of HTTP.
// const URL = "wss://echo.websocket.org:443/"; // This does not work
const URL = "wss://javascript.info/article/websocket/demo/hello";

// The variable is outputDiv and it’s used to store a reference to the <div> element where we will be displaying the messages.

const outputDiv = document.getElementById("output");

// The form variable is also used to store a reference to the form element.
const form = document.forms[0];


const connection = new WebSocket(URL);


// To deal with this an event handler is added.
connection.addEventListener(
  "open",
  () => {
    output("CONNECTED"); // CONNECTED is a default message
  },
  false
);

// Sends messages to screen
function output(message) {
  const para = document.createElement("p");
  para.innerHTML = message;
  outputDiv.appendChild(para);
}

// This event listener invokes the message() function
form.addEventListener("submit", message, false);

function message(event) {
  event.preventDefault(); // Stop the default behavior, so the form doesn’t actually get submitted.
  const text = form.message.value; // Grabs the value of the text input and store it in a local variable.
  output(`SENT: ${text}`); // Adds the message to the “output” <div>, with the phrase “SENT:” at the start.
  connection.send(text); // This sends the message to the URL that the websocket is connected to.
}


// This event handler deals with the response
connection.addEventListener(
  "message",
  (event) => {
    output(`RESPONSE: ${event.data}`);
  },
  false
);
