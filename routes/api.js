const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');
const express = require('express');
const router = express.Router();
const Speaker = require('../models/speaker');
const Personality = require('../models/personality');
const Quote = require('../models/quote');
const User = require('../models/user');
require ('dotenv').config();

const personalityInsights = new PersonalityInsightsV3({
  version: '2016-10-19',
  iam_apikey:process.env.IAM_APIKEY,
  url: process.env.URL
})

// GET /user/ - get all users
router.get('/user', (req, res) => {
  User.find({}, (err, user) => {
    if (err) res.status(500).json({err})
    else res.status(200).json(user)
  })
})

// GET /user/:id/speakers
router.get('/user/:id/speakers', (req, res) => {
  User.findById(req.params.id).populate('speakers').exec( (err, user) => {
    if (err) res.status(500).json({err})
    else res.status(200).json(user.speakers)
  })
})

// GET one speaker
router.get('user/:id/speakers/:pid', (req, res) => {
  console.log('did we make it here?')
  Speaker.findById(req.params.pid).populate().exec((err, speaker) => {
    if (!err) {
      console.log(speaker)
      res.status(200).json({ type: 'success', message: 'we found them', data: speaker }) 
    } else {
      res.status(500).json( {type: 'error', message: 'error getting speaker'} )
    }
  })
})

// GET /speakers/:id - Get one speaker
router.get('/speakers/:pid', (req, res) => {
  Speaker.findById(req.params.pid).populate('quotes').exec( (err, speaker ) => {
    if (!err) {
        res.status(200).json(speaker);
    } else {
        res.status(500).json(speaker);
    }
  })
})

// POST /speakers - Create one speaker
router.post('/user/:id/speakers', (req, res) => {
  let speaker = new Speaker({
    name: req.body.name
  })
  speaker.save((err, speaker) => {
    User.findById(req.params.id, (err, user) => {
      user.speakers.push(speaker)
      user.save( (err, user) => {
        err ? res.status(500).json({err}): res.status(201).json(user)
        
      })
    })
  })
})


// GET /speakers/:pid/quotes/:qid - Get one quote associated wtih one speaker
router.get('/user/:id/speakers/:pid/quotes/:qid', (req, res) => {
  Quote.findById(req.params.qid).populate('quote').exec((err, quote) => {
    if (err) {
      console.log("we got an error")
      res.json(err);
    } else {
      console.log("we didn't got an error")
      res.json(quote);
    }
  })
})

// DEL /speakers/:id - deletes a speaker
router.delete('/speakers/:id', (req, res) => {
  Speaker.findOneAndDelete({_id: req.params.pid}, (err, speaker) => {
    if(!err) {
      res.status(200).json(speaker);
    } else {
      res.status(500).json(speaker);
    }
  })
})

// DEL /speakers/:id/quotes/:id - a quote from a speaker
router.delete('/speakers/:pid/quotes/:id', (req, res) => {
  Quote.findOneAndDelete({_id: req.params.id}, (err, quote) => {
    Speaker.findById(req.params.pid, (err, speaker) => {
      if (err) res.json({err})
      speaker.quotes.pull(req.params.id)
      speaker.save( (err, doc) => {
        res.json(speaker)
      })
    })
  })
})

// POST /speakers/:id/quotes - create and associate a quote to a speaker
router.post('/user/:id/speakers/:pid/quotes', (req, res) => {
  Speaker.findById(req.params.pid, (err, speaker) => {
    console.log("this is the err:", err)
    console.log("this is the speaker:", speaker)
    // console.log("This should be req.body.quote", req.body.quote)
    let quote = new Quote( {
      quote: req.body.quote
    })
    quote.save((err, doc) => {
      speaker.quotes.push(doc)
      speaker.save((err,doc) => {
        let catQuote = ''
        if (speaker.quotes === quote.quote._id) {
        }
        // let catQuote = quote.quote
        console.log(speaker.quotes)
        //watson logic
        if(speaker.quotes.length > 0 ) {
          let profileParams = {
            content: catQuote,
            content_type:  'plain/text',
            raw_scores: true
          }
          personalityInsights.profile(profileParams, (err, profile)=>{
            // console.log(profile)
          })
        };
        res.status(201).json({quotes:speaker.quotes}); 
      })
      Quote.find({}, (err, quotes) => {
        let personalityInsights = new PersonalityInsightsV3 ({
          version: '2017-10-13',
          iam_apikey: process.env.IAM_APIKEY,
          url: "https://gateway.watsonplatform.net/personality-insights/api"
        })
      })
    })
  })
})

module.exports = router;