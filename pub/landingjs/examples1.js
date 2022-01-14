/* Chatty.js Library usage examples */
"use strict";

// Generate a chatbox on the webpage
const cb = new Chatbox("#E07A5F", "dark")

function examples() {
    cb.makeChatbox()

    // Add simple messages. A simple message is a message to the user with no 
    // expectation of a response (ie. good for descriptions, explanations, 
    // introductions).
    cb.addChatBubble("Welcome!")
    cb.addChatBubble("This is an example of a simple text message.")
}

examples();