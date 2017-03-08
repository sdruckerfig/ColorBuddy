var express = require('express');
var alexa = require('alexa-app');
var PORT = process.env.PORT || 3000;

var app = express();
var alexaApp = new alexa.app("colorbuddy");

var colors = {
    "blue": "#0000ff",
    "red": "#ff0000",
    "green": "#00ff00"
};

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
        "slots": {
            "Color": "AMAZON.COLOR"
        },
        "utterances": [
            "about {Color}",
            "the Hex for {Color}"
        ]
    },
    function(request, response) {
        var statedColor = request.slot("Color");
        
        if (colors[statedColor]) {
            response.say("The color " + statedColor + " is " + colors[statedColor]);
            response.card({
                type: 'Simple',
                title: 'HexColor Buddy',
                content: "The color " + statedColor + " is " + colors[statedColor]
            });
        } else {
            response.say("Sorry, I don't know the hex color for " + statedColor);
            response.card({
                type: 'Simple',
                title: 'HexColor Buddy',
                content: "Sorry, I don't know the hex color for " + statedColor
            });
        }

        response.reprompt("I didn't hear a valid color. Please ask something like 'What is Blue?'");

    }
);

alexaApp.intent("AMAZON.HelpIntent", {}, function(request, response) {
    response.say("Here's some help. Try saying 'Ask HexColor Buddy about Blue'");
    response.card({
        type: "Simple",
        title: "HexColor Buddy",
        content: "Valid syntax:\nAsk HexColor Buddy about blue\nAsk HexColor Buddy about green."
    });
});


app.listen(PORT);
console.log("Listening on port " + PORT + ", try http://localhost:" + PORT + "/colorbuddy");