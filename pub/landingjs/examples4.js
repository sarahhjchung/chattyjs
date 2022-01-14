/* Chatty.js Library usage examples */
"use strict";

// Generate a chatbox on the webpage
const cb = new Chatbox("#E07A5F", "light")

function examples() {
    cb.makeChatbox()

    const q0 = cb.addQuestion("Do you know how to add a simple text message using Chatty.js?", ["Yes", "No"])
    
    // Call the opening question
    cb.callQuestion(q0.questionID)
    
    // Create actions to follow q0 and link actions to question
    // Note: Set the fifth parameter to true to signify that there is now an image in the message
    const a0 = new Action("Awesome!", null, false, null, true, "assets/sample1.png")
    const a1 = new Action("Visit this page to learn how", null, true, "messages.html", true, "assets/sample.png")
    q0.getActions([a0, a1])
}

examples();