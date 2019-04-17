const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const Personality = require('../models/personality');
const Quote = require('../models/quote');
const User = require('../models/user');

// GET /persons - Get all persons
router.get('/persons', (req, res) => {
  Person.find({}, (err, persons ) => {
    if (!err) {
        res.status(200).json(persons);
    } else {
        res.status(500).json(persons);
    }
  });
});

// GET /persons/:id - Get one person
router.get('/persons/:pid', (req, res) => {
  Person.findById(req.params.pid).populate('quotes').exec( (err, person ) => {
    if (!err) {
        res.status(200).json(person);
    } else {
        res.status(500).json(person);
    }
  });
});

// POST /persons - Create one person
router.post('/persons', (req, res) => {
  let person = new Person({
    name: req.body.name
  });
  person.save((err, doc) => {
    res.status(201).json(doc);
  });
});

// GET /persons/:pid/quotes/:qid - Get one quote associated wtih one person
router.get('/persons/:pid/quotes/:qid', (req, res) => {
  Quote.findById(req.params.qid, function(err, quote) {
    if (err) {
      console.log("we got an error")
      res.json(err);
    } else {
      console.log("we didn't got an error")
      res.json(quote);
    }
  });
});

// GET /persons/:pid/quotes - all person quotes
router.get('/persons/:pid/quotes', (req, res) => {
  Person.findById(req.params.pid).populate('quotes').exec((err, person) => {
    if (!err) {
      res.json(person);
    }
  });
});

// DEL /persons/:id - deletes a person
router.delete('/persons/:id', (req, res) => {
  Person.findOneAndDelete({_id: req.params.pid}, (err, person) => {
    if(!err) {
      res.status(200).json(person);
    } else {
      res.status(500).json(person);
    }
  });
});

// DEL /persons/:id/quotes/:id - a quote from a person
router.delete('/persons/:pid/quotes/:id', (req, res) => {
  Quote.findOneAndDelete({_id: req.params.id}, (err, quote) => {
    Person.findById(req.params.pid, (err, person) => {
      if (err) res.json({err})
      person.quotes.pull(req.params.id)
      person.save( (err, doc) => {
        res.json(person)
      }); 
    });
  });
});

// POST /persons/:id/quotes - create and associate a quote to a person
router.post('/persons/:pid/quotes', (req, res) => {
  Person.findById(req.params.pid, (err, person) => {
    let quote = new Quote( {
      quote: req.body.quote
    });
    quote.save((err, doc) => {
      person.quotes.push(quote)
      person.save((err,doc) => res.json(doc))
    });
  });
});   

module.exports = router;