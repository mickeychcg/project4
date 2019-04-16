const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const Personality = require('../models/personality');
const Quote = require('../models/quote');
const User = require('../models/user');

// GET /persons - Get all persons
router.get('/persons', (req, res) => {
  Person.find({}, (err, rawScore ) => {
    if (!err) {
        res.status(200).json(rawScore);
    } else {
        res.status(500).json(rawScore);
    }
  });
});

// GET /persons/:id - Get one person
router.get('/persons/:pid', (req, res) => {
  Person.findOne({}, (err, rawScore ) => {
    if (!err) {
        res.status(200).json(rawScore);
    } else {
        res.status(500).json(rawScore);
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
router.findOne('/persons/:pid/quotes/:qid', (req, res) => {
  Person.findById(req.params.pid).populate('quote').exec((err, person) => {
    let quote = person.quotes.find(quote => {
      return req.params.qid === person._id
    });
    res.send(quote)
  });
});

// GET /persons/:pid/quotes - all person quotes
router.findAll('/persons/:pid/quotes', (req, res) => {
  Person.findById(req.params.pid).populate('quotes').exec((err, person) => {
    let quotes = person.quotes.findAll(quotes => {
      return req.params.qid === person._id
    }):
    res.send(quotes)
  });
});

// DEL /persons/:id - deletes a person
router.delete('/persons/:id', (req, res) => {
  Person.findOneAndDelete({_id: req.params.pid}, (err, person) => {
    if(!err) {
      res.status(200).json(rawScore);
    } else {
      res.status(500).json(rawScore);
    }
  });
});

// DEL /persons/:id/quotes/:id - a quote from a person
router.delete('/persons/:id/quotes/:id', (req, res) => {
  Person.findById(req.params.pid)populate('quote').exec((err, person) => {
    Quote.findOneAndDelete({_id: req.params.qid}, (err, person) => {
      if(!err) {
        res.status(200).json(rawScore);
      } else {
        res.status(500).json(rawScore);
      }
    });
  });
});

// POST /persons/:id/quotes - create and associate a quote to a person
router.get('/persons/:id/quotes', (req, res) => {
  Person.post(req.params.pid)populate('quote').exec((err, person) => {
    let quote = new Quote( {
    quote: quote
    });
    quote.save((err, doc) => {
      res.status(201).json(rawScore);
    });
  });
});

module.exports = router;