/* Chatty.js Library usage examples */
"use strict";

// Generate a chatbox on the webpage
const cb = new Chatbox("#E07A5F", "light")

function examples() {
    cb.makeChatbox()

    cb.addChatBubble("Hi there! Here's a few questions I'll ask to get to know more about you.")
    
    // Add multiple choice questions. A multiple choice question is a message with
    // listed out options for users to respond with in order to take them somewhere.
    // These are useful for linking users to a helpful page, asking more questions,
    // and more. 
    const q0 = cb.addQuestion("Are you a student?", ["Yes", "No"])
    const q1 = cb.addQuestion("Did you take CSC309?", ["Yes", "No"])
    const q2 = cb.addQuestion("Are you a TA or instructor?", ["Yes", "No"])
    
    // Call the opening question
    cb.callQuestion(q0.questionID)
    
    // Create actions to follow q0 and link actions to question
    // Note: leave the first parameter blank to followup the action immediately with another question
    const a0 = new Action("", q1.questionID, false, null)
    const a1 = new Action("", q2.questionID, false, null)
    q0.getActions([a0, a1])
    
    // Create actions to follow q1 and link actions to question
    const a2 = new Action("Cool!", null, false, null)
    const a3 = new Action("I recommend taking it :)", null, false, null)
    q1.getActions([a2, a3])
    
    // Create actions to follow q2 and link actions to question
    const a4 = new Action("Welcome!", null, false, null)
    q2.getActions([a4, a4])
}

examples();