/* chatty js */
'use strict'
const log = console.log;
log('Chatty');
log('--------------------------------');

(function(global, document, $) {
	// Chatbox Generator
	function Chatbox(colour, theme, right, left) {
		this.colour = colour !== undefined ? colour : "grey";
		this.theme = theme !== undefined && theme === "dark" ? theme : "light";
		this.right = right !== undefined ? right : "20px";
		this.left = left !== undefined ? left : "auto";
	}

	// Private properties and functions -----------------------------------------------------------
	let _numQuestions = 0;  		// total number of questions
	let _currentQuestionID = 0; 	// the current question 
	let _questions = [];			// list of questions
	let _isOpen = false;			// boolean for whether the chatbox is open or not

	function _incrementNumQuestions() {			// increments _numQuestions
		_numQuestions++;
	}
	function _updateCurrentQuestionID(id) {		// update _currentQuestionID with id
		_currentQuestionID = id;
	}
	function _addQuestion(q) {					// add new question to _questions
		_questions.push(q);
	}
	function _getQuestion(id) {					// get question by id
		return _questions[id];
	}
	function _updateIsOpen(isOpen) {			// update _isOpen
		_isOpen = isOpen
	}

	// inline button's onclick function to open/minimize chatbox
	function _inlineButtonAction() {
		if (_isOpen) {
			const chatboxHeader = document.getElementById("chatboxHeader")
			chatboxHeader.click()
		} else {
			const minimizedChatbox = document.getElementById("minimizedChatbox")
			minimizedChatbox.click()
		}
	}

	// add a new chat bubble to the chatbox UI
	function _addChatBubble(text, isUser, hasLink, href=null, hasImage=false, src=null) {
		const chatboxContent = document.querySelector('#chatboxContent')
		if (hasImage) {
			const chatBubble = document.createElement('div')
			const image = document.createElement('img')
			image.src = src
			image.alt = "Message Image"
			image.className = "messageImg"
			chatBubble.className = "chatboxBubble"
			if (hasLink) {
				const link = document.createElement('a')
				link.href = href
				link.append(image)
				chatBubble.append(link)
			} else {
				chatBubble.append(image)
			}
			chatBubble.appendChild(document.createTextNode(text))
			chatboxContent.append(chatBubble)
			return;
		} 
		const chatBubble = hasLink ? document.createElement('a') : document.createElement('span')
		chatBubble.className = isUser ? "chatboxBubbleAnswer" : "chatboxBubble"
		if (hasLink) {
			chatBubble.href = href
		}
		
		chatBubble.appendChild(document.createTextNode(text))
		chatboxContent.append(chatBubble)
	}

	// calls specific question to show up
	function _callQuestion(questionID) {
		log("Calling question " + JSON.stringify(questionID))
	
		if (questionID >= _numQuestions) {
			log("WARNING: You are trying to call a nonexistent question.")
			return null
		} else {
			const question = _getQuestion(questionID)
			log("Sent question " + JSON.stringify(questionID))
	
			// create new chat bubble for the question 
			_addChatBubble(question.formattedQuestion, false, false)
			// currentQuestionID = questionID
		}
	}

	// allow users to send messages
	function _sendResponse() {
		const response = document.querySelector('#chatInput').value
		if (response) {
			// create answer bubble
			_addChatBubble(response, true, false)
	
			// validate answer
			let validAnswer = false
			if (_currentQuestionID === null) {
				_addChatBubble("This is the end of this conversation. Thanks for chatting!", false, false)
				return
			}
			const currentQuestion = _getQuestion(_currentQuestionID)
			if (currentQuestion.type === "data") {
				currentQuestion.onAnswer(response)
			} else {
				currentQuestion.answers.forEach(a => {
					if (response === a || response === a.toLowerCase() || response === a.toUpperCase()) {
						validAnswer = true
					}
				})
		
				if (validAnswer) {
					currentQuestion.onAnswer(response)
				} else {
					_addChatBubble(currentQuestion.formattedAnswers, false, false)
					log("Invalid answer")
				}
			}
		}
	}

	Chatbox.prototype = {
		makeChatbox: function() {
			const chatbox = document.createElement('div')
			chatbox.id = "chatbox"
			chatbox.style = "background-color: " + this.colour + "; right: " + this.right + "; left: " + this.left
			
			// create chatbox header
			const chatboxHeader = document.createElement('img')
			chatboxHeader.id = "chatboxHeader"
			chatboxHeader.src = this.theme === "light" ? "chatty/assets/close.svg" : "chatty/assets/closeDark.svg"
			chatboxHeader.alt = "closeButton"
			chatboxHeader.onclick = this.minimizeChatbox
			chatbox.append(chatboxHeader)
	
			// create space for the chatbox content
			const chatboxContent = document.createElement('div')
			chatboxContent.id = "chatboxContent"
			chatboxContent.style = this.theme === "light" ? "background-color: white" : "background-color: #3D405B"
			chatbox.append(chatboxContent)
	
			// create the chatbox input section at the bottom
			const chatInputContainer = document.createElement('div')
			chatInputContainer.id = "chatInputContainer"
			const chatInput = document.createElement('input')
			chatInput.id = "chatInput"
			chatInput.style = this.theme === "dark" && "background-color: #3D405B; color: lightgrey;"
			chatInput.placeholder = "Type your message ..."
			chatInput.name = "response"
			chatInput.tabIndex = 0;

			const sendButton = document.createElement('img')
			sendButton.id = "send"
			sendButton.src = this.theme === "light" ? "chatty/assets/send.svg" : "chatty/assets/sendDark.svg"
			sendButton.alt = "sendButton"
			sendButton.onclick = _sendResponse
			sendButton.tabIndex = 0;
			chatInputContainer.append(chatInput)
			chatInputContainer.append(sendButton)
			chatbox.append(chatInputContainer)
			chatbox.className = "hide"

			// add event listener to send message when pressing enter
			sendButton.addEventListener("click", function(e) {
				chatInput.value = null;
			})

			// add event listener to send message when pressing enter
			chatInput.addEventListener("keyup", function(e) {
				if (e.keyCode === 13) {
					e.preventDefault();
					sendButton.click();
					chatInput.value = null;
				}
			})

			// add event listener to send message when pressing enter on send button
			sendButton.addEventListener("keyup", function(e) {
				if (e.keyCode === 13) {
					e.preventDefault();
					sendButton.click();
					chatInput.value = null;
				}
			})
	
			// add hidden minimized chatbox button
			const minimizedChatbox = document.createElement('img')
			minimizedChatbox.id = "minimizedChatbox"
			minimizedChatbox.src = this.theme === "light" ? "chatty/assets/help.svg" : "chatty/assets/helpDark.svg"
			minimizedChatbox.alt = "minimizedChatboxButton"
			minimizedChatbox.onclick = this.openChatbox
			minimizedChatbox.style = "background-color: " + this.colour + "; right: " + this.right + "; left: " + this.left
			minimizedChatbox.tabIndex = 0;

			// add event listener to open chatbox when pressing enter on icon
			minimizedChatbox.addEventListener("keyup", function(e) {
				if (e.keyCode === 13) {
					e.preventDefault();
					minimizedChatbox.click();
				}
			})

			const body = $('body')
			body.append(chatbox)
			body.append(minimizedChatbox)
		},

		createInlineButton: function(nodeElement, width="40px") {
			const inlineButton = document.createElement('img')
			inlineButton.className = "inlineButton"
			inlineButton.src = this.theme === "light" ? "chatty/assets/help.svg" : "chatty/assets/helpDark.svg"
			inlineButton.alt = "inlineChatboxButton"
			inlineButton.style = "background-color: " + this.colour + "; width: " + width + ";"
			inlineButton.tabIndex = 0;
			inlineButton.onclick = _inlineButtonAction;

			nodeElement.append(inlineButton)
		},

		minimizeChatbox: function() {
			log("Minimize Chatbox")
			const chatbox = document.querySelector('#chatbox')
			chatbox.className = "hide"
		
			const minimizedChatbox = document.querySelector('#minimizedChatbox')
			minimizedChatbox.className = ""
			_updateIsOpen(false)
		}, 

		openChatbox: function() {
			log("Open Chatbox")
			const minimizedChatbox = document.querySelector('#minimizedChatbox')
			minimizedChatbox.className = "hide"
		
			// bring back chatbox
			const chatbox = document.querySelector('#chatbox')
			chatbox.className = ""	

			// autofocus on text input
			const chatInput = document.getElementById("chatInput")
			chatInput.focus()
			_updateIsOpen(true)
		},

		addChatBubble: function(text, isUser, hasLink, href = null, hasImage=false, src=null) {
			_addChatBubble(text, isUser, hasLink, href, hasImage, src);
		}, 

		addQuestion: function(question, answers) {
			const newQuestion = new Question(question, answers)
			_addQuestion(newQuestion);
			log("Added a new question")
			return newQuestion
		}, 

		// addDataQuestion: function(question) {
		// 	const newQuestion = new DataChatBubble(question)
		// 	_addQuestion(newQuestion);
		// 	log("Added a new data question")
		// 	return newQuestion
		// },

		callQuestion: function(questionID) {
			_callQuestion(questionID)
		}
	}
	
	// Q&A Chat Bubble 
	class Question {
		constructor(question, answers) {
			// this.type = "question";
			this.question = question;
			this.answers = answers;
			this.actions = []; 
	
			this.questionID = _numQuestions;
			_incrementNumQuestions();
	
			// formatted question to send in chat bubble
			let formattedQuestion = question + " ("
			this.answers.forEach((a, i) => {
				if (i === this.answers.length - 1) {
					formattedQuestion += (a + ")")
				} else {
					formattedQuestion += (a + "/")
				}
			})
			this.formattedQuestion = formattedQuestion
	
			// formatted prompt when a user types an invalid response
			let formattedAnswers = "Please enter one of the following: "
			this.answers.forEach((a, i) => {
				if (i === this.answers.length - 1) {
					formattedAnswers += a
				} else {
					formattedAnswers += (a + ", ")
				}
			})
			this.formattedAnswers = formattedAnswers
		}
	
		// acquire actions for this question
		getActions(actions) {
			log("Get actions for question " + JSON.stringify(this.questionID))
			this.actions = actions;
		}
	
		// evoke corresponding action to the given answer
		onAnswer(answer) {
			if (this.actions === []) {
				log("WARNING: You have not yet set any actions for this question.")
			} else {
				this.answers.forEach((a, i) => {
					if (a === answer || a.toLowerCase() === answer || a.toUpperCase() === answer) {
						this.actions[i].evokeAction()
					}
				});
			}
		}
	}
	
	// // Data Collection Chat Bubble
	// class DataChatBubble {
	// 	constructor(question, filename) {
	// 		this.type = "data";
	// 		this.question = question;
	// 		this.formattedQuestion = question;
	// 		this.filename = filename;
	// 		this.answer = null;
	// 		this.questionID = _numQuestions;
	// 		this.action = null;
	// 		_incrementNumQuestions();
	// 	}

	// 	// acquire action for this question
	// 	getAction(action) {
	// 		log("Get actions for question " + JSON.stringify(this.questionID))
	// 		this.action = action;
	// 	}

	// 	// store data and result
	// 	onAnswer(answer) {
	// 		this.answer = answer;
			
	// 		const response = {
	// 			"question": this.question,
	// 			"answer": this.answer
	// 		}

	// 		const data = JSON.stringify(response, null, 4)

	// 		const fs = require('fs');
	// 		fs.writeFileSync(this.filename, data);
	// 		console.log(data)

	// 		this.action.evokeAction()
	// 	}
	// }
	
	// Action
	class Action {
		constructor(message, nextQuestionID, hasLink, href=null, hasImage=false, src=null) {
			this.message = message
			this.nextQuestionID = nextQuestionID
			this.hasLink = hasLink
			this.href = href
			this.hasImage = hasImage
			this.src = src
		}
	
		evokeAction() {
			_updateCurrentQuestionID(this.nextQuestionID);
			if (this.message !== "") {
				_addChatBubble(this.message, false, this.hasLink, this.href, this.hasImage, this.src)
			} 
			if (this.nextQuestionID !== null && this.nextQuestionID < _numQuestions) {
				_callQuestion(this.nextQuestionID)
			}
		}
	}
	
	global.Chatbox = global.Chatbox || Chatbox
	global.Question = global.Question || Question
	global.Action = global.Action || Action

})(window, window.document, $);
