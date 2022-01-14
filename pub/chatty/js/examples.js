/* Chatty.js Library usage examples */
"use strict";

// Generate a chatbox on the webpage
const cb = new ChatboxGenerator("pink", "light")

function examples() {
    cb.makeChatbox()

    // Testing ---


    // Add simple messages. A simple message is a message to the user with no 
    // expectation of a response (ie. good for descriptions, explanations, 
    // introductions).
    cb.addChatBubble("Hi there! Welcome to the Chatty.js example page.")
    cb.addChatBubble("We just want to ask you a couple questions to help you get started on our page.")
    
    // Add multiple choice questions. A multiple choice question is a message with
    // listed out options for users to respond with in order to take them somewhere.
    // These are useful for linking users to a helpful page, asking more questions,
    // and more. 
    const q0 = cb.addQuestion("Are you a student?", ["Yes", "No"])
    const q1 = cb.addQuestion("Are you a staff member, alumni or a donor?", ["Staff", "Alumni", "Donor"])
    const q2 = cb.addQuestion("Are you currently enrolled here?", ["Yes", "No"])
    
    // Call the opening question
    cb.callQuestion(0)
    
    // Create actions to follow q0 and link actions to question
    const a0 = new Action("You've come to the right place!", 2, false, null)
    const a1 = new Action("", 1, false, null)
    q0.getActions([a0, a1])
    
    // Create actions to follow q1 and link actions to question
    const a2 = new Action("Welcome!", null, false, null)
    q1.getActions([a2, a2, a2])
    
    // Create actions to follow q2 and link actions to question
    const a3 = new Action("Click here to check out our page for current students.", null, true, "#currentStudents")
    const a4 = new Action("Click here to check out our page for future students.", null, true, "#futureStudents")
    q2.getActions([a3, a4])
}

examples();