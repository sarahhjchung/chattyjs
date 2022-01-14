/* Chatty.js Library usage examples */
"use strict";

// Generate a chatbox on the webpage
const cb = new Chatbox("#E07A5F", "light", "60%")

function examples() {
    cb.makeChatbox()

    const q0 = cb.addQuestion("Do you know how to add a simple text message using Chatty.js?", ["Yes", "No"])
    
    // Call the opening question
    cb.callQuestion(q0.questionID)
    
    // Create actions to follow q0 and link actions to question
    // Note: Set the third parameter to true to signify that the fourth string parameter should be an interactive link
    const a0 = new Action("Awesome! Click here to get started and create your first chatbox", null, true, "gettingStarted.html")
    const a1 = new Action("Visit this page to learn how", null, true, "messages.html")
    q0.getActions([a0, a1])
}

examples();