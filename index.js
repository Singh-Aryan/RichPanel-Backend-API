'use strict';
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server
  
  const firebase = require('firebase');

  const firebaseConfig = {
    apiKey: "AIzaSyAhQiEuCA8SMOeJzJWS_T05UqBbn3mIzqc",
    authDomain: "richpanel-fb.firebaseapp.com",
    databaseURL: "https://richpanel-fb-default-rtdb.firebaseio.com",
    projectId: "richpanel-fb",
    storageBucket: "richpanel-fb.appspot.com",
    messagingSenderId: "946133449102",
    appId: "1:946133449102:web:42073e58c0ac4e07d08cdf"
  };
    
  firebase.initializeApp(firebaseConfig);
  var db = firebase.database().ref('messages');

  var page_access_token = "EAANK1zVBtcoBAIV5SJmlAxGiAEt8vZA5xZASqHwHdkfvMMsJFf0EvsAshWGRrF1nuLZAdZA9L2N010Q4AGNWRRDQ7Q13UsvFr7GCrlp1HfqfDlprWV3BIEgcBL67EfeZBtHNluWg7g96R5ZCDLcZBZB2zFaOzu6FFHq6qxZC2KVtdj7NX4TRu4J4G";

// Sets server port and logs message on success
app.listen(process.env.PORT || 3000, () => console.log(`webhook is listening`));

// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
 
    let body = req.body;
  
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
  
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function(entry) {
  
        // Gets the message. entry.messaging is an array, but 
        // will only ever contain one message, so we get index 0
        let webhook_event = entry.messaging[0];

        let id = webhook_event.sender.id;
        let message = webhook_event.message.text;
        let timestamp = webhook_event.timestamp;
    
        var date = new Date(timestamp);
        let datestr = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        let timestr = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

        let fname, lname, profilepic;

        fetch(`https://graph.facebook.com/${id}?fields=first_name,last_name,profile_pic,email&access_token=${page_access_token}`)
        .then((response) => response.json())
        .then((data) => function(data)
        {
          fname = data.first_name;
          lname = data.last_name;
          profilepic = data.profile_pic
        });

        console.log(id,message,timestamp,datestr,timestr);

        if(id)
        {        
          db.push({
          senderid : id,
          message : message,
          timestamp : timestamp,
          date : datestr,
          time : timestr,
          first_name : fname,
          last_name : lname,
          profile_pic : profilepic
          })
        }
      });

      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  
  });

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = "Test"
      
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
      
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
    
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);      
      }
    }
  });
