/* Chatty.js Library usage examples */
"use strict";

// Generate a chatbox on the webpage
const cb = new Chatbox("#E07A5F", "light")

function examples() {
    cb.makeChatbox()

    const q0 = cb.addQuestion("Do you like this new feature?", ["Yes", "No"])
    
    // Call the opening question
    cb.callQuestion(q0.questionID)
    
    // Create actions to follow q0 and link actions to question
    const a0 = new Action("Thanks!", null, false)
    const a1 = new Action("Aw that's alright", null, false)
    q0.getActions([a0, a1])

    // Get the element in your document you'd like to add the inline button next to
    const element = document.getElementById("exampleButton")
    cb.createInlineButton(element, "20px")
}

examples();