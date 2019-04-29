const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');
const express = require('express');
const router = express.Router();
const Person = require('../models/person');
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

// GET /user/:id/persons
router.get('/user/:id/persons', (req, res) => {
  User.findById(req.params.id).populate('persons').exec( (err, user) => {
    if (err) res.status(500).json({err})
    else res.status(200).json(user.persons)
  })
})

// GET one person
router.get('user/:id/persons/:pid', (req, res) => {
  console.log('did we make it here?')
  Person.findById(req.params.pid).populate().exec((err, person) => {
    if (!err) {
      console.log(person)
      res.status(200).json({ type: 'success', message: 'we found them', data: person }) 
    } else {
      res.status(500).json( {type: 'error', message: 'error getting person'} )
    }
  })
})
// GET one person's quote



// GET /persons - Get all persons
// router.get('/persons', (req, res) => {
//   Person.find({}, (err, persons ) => {
//     if (!err) {
//       res.status(200).json(persons);
//     } else {
//       res.status(500).json(persons);
//     }
//   })
// })

// GET /persons/:id - Get one person
router.get('/persons/:pid', (req, res) => {
  Person.findById(req.params.pid).populate('quotes').exec( (err, person ) => {
    if (!err) {
        res.status(200).json(person);
    } else {
        res.status(500).json(person);
    }
  })
})

// POST /persons - Create one person
router.post('/user/:id/persons', (req, res) => {
  let person = new Person({
    name: req.body.name
  })
  person.save((err, person) => {
    User.findById(req.params.id, (err, user) => {
      user.persons.push(person)
      user.save( (err, user) => {
        err ? res.status(500).json({err}): res.status(201).json(user)
        
      })
    })
  })
})


// GET /persons/:pid/quotes/:qid - Get one quote associated wtih one person
router.get('/user/:id/persons/:pid/quotes/:qid', (req, res) => {
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
// GET /persons/:pid/quotes - all person quotes
// router.get('/persons/:pid/quotes', (req, res) => {
//   Person.findById(req.params.pid).populate('quotes').exec((err, person) => {
//     if (!err) {
//       res.json(person);
//     }
//   })
// })

// DEL /persons/:id - deletes a person
router.delete('/persons/:id', (req, res) => {
  Person.findOneAndDelete({_id: req.params.pid}, (err, person) => {
    if(!err) {
      res.status(200).json(person);
    } else {
      res.status(500).json(person);
    }
  })
})

// DEL /persons/:id/quotes/:id - a quote from a person
router.delete('/persons/:pid/quotes/:id', (req, res) => {
  Quote.findOneAndDelete({_id: req.params.id}, (err, quote) => {
    Person.findById(req.params.pid, (err, person) => {
      if (err) res.json({err})
      person.quotes.pull(req.params.id)
      person.save( (err, doc) => {
        res.json(person)
      })
    })
  })
})

// POST /persons/:id/quotes - create and associate a quote to a person
router.post('/user/:id/persons/:pid/quotes', (req, res) => {
  Person.findById(req.params.pid, (err, person) => {
    console.log("this is the err:", err)
    console.log("this is the person:", person)
    // console.log("This should be req.body.quote", req.body.quote)
    let quote = new Quote( {
      quote: req.body.quote
    })
    quote.save((err, doc) => {
      person.quotes.push(doc)
      person.save((err,doc) => {
        let catQuote = ''
        if (person.quotes === quote.quote._id) {
        }
        // let catQuote = quote.quote
        console.log(person.quotes)
        //watson logic
        if(person.quotes.length > 0 ) {
          let profileParams = {
            content: catQuote,
            content_type:  'plain/text',
            raw_scores: true
          }
          personalityInsights.profile(profileParams, (err, profile)=>{
            // console.log(profile)
          })
        };
        res.status(201).json({quotes:person.quotes}); 
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