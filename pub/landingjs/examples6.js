/* Chatty.js Library usage examples */
"use strict";

// Generate a chatbox on the webpage
const cb = new Chatbox("#E07A5F", "light")

function examples() {
    cb.makeChatbox()

    const q0 = cb.addDataQuestion("What is your favourite fruit?", "data.json")
    
    // Call the opening question
    cb.callQuestion(q0.questionID)
    
    // Create actions to follow q0 and link action to question
    // Note: data questions only require one action
    const a0 = new Action("Thanks for your response!", null, false)
    q0.getAction(a0)
}

examples();