# Chatty.js
**Landing page URL:** https://chattyjs.herokuapp.com/index.html

# Getting Started
Follow this quick tutorial to get started with Chatty.js!

## Installation
To install Chatty.js, download this <a href="pub/assets/chatty.zip" download>zip folder</a>. Extract all files and insert the extracted folder into the same level as all your html files.

## Integration
Chatty.js can be integrated with plain JavaScript. The following code shows what scripts you must add to your html files that use Chatty.js:
                    
    <script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script defer type="text/javascript" src='chatty/js/Chatty.js'></script>
    <link rel="stylesheet" type="text/css" href="chatty/chatty.css">
                
You must also include a script tag where the src is the path to the JavaScript file that calls the Chatty.js function calls. It should look something similar to:
                    
    <script defer type="text/javascript" src='fileName.js'></script>
                
## Usage
Chatty.js is a JS library to let you quickly set up a simple chatbox for your web app. Here is a short code snippet that your JS file should look similar to when you set up your chatbox for the first time:
                
    // These commands will generate a chatbox onto your webpage.
    const cb = new Chatbox("#E07A5F", "light")
    cb.makeChatbox()
                     
Go to <a href="https://chattyjs.herokuapp.com/examples.html">Examples</a> to learn about all the different functionalities you can add to your chatbox!

# Documentation
Visit https://chattyjs.herokuapp.com/api.html 