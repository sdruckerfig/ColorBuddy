var express = require('express');
var alexa = require('alexa-app');
var PORT = process.env.port || 8080;

var app = express();
var alexaApp = new alexa.app("colorbuddy");

alexaApp.express({
	expressApp: app,
	checkCert: false,
	debug: true
})

app.set("view engine", "jade");

alexaApp.launch(function(request, response) {
  response.say(''.concat(
  	"Welcome to Color Buddy.",
  	"Ask me for a hex value by saying, What is Blue or What is Hex for Blue?"
  ));
  response.card("Color Buddy", "Ask me about a color. For example: What is Blue or What is Hex for Blue?");
});

alexaApp.intent("ColorToHex", {
    "slots": { "Color": "AMAZON.COLOR" },
    "utterances": [
     "about {Color}",
     "the Hex for {Color}"
    ]
  },
  function(request, response) {
    var statedColor = request.slot("Color");
    response.say("You asked for the color " + statedColor);
    response.reprompt("I didn't hear a valid color. Please ask something like 'What is Blue?'");
    response.card({
    	type: 'Simple',
    	title: 'My Color Buddy',
    	content: "You asked for the color " + statedColor
    });
  }
);

alexaApp.intent("AMAZON.HelpIntent");


app.listen(PORT);
console.log("Listening on port " + PORT + ", try http://localhost:" + PORT + "/colorbuddy");

