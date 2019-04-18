const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');
// const watson = require('ibm-watson');
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
  url: "https://gateway.watsonplatform.net/personality-insights/api"
});


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
      person.save((err,doc) => {
        let catQuote = {
          content: "Thank you, Melania, America loves our First Lady, thank you. I am thrilled to be back in the great state of Ohio right here with the incredible men and women of Youngstown. What an amazing few days it’s been. On Saturday i was in Virginia with thousands of brave men and women of the United States Military. Do we love the united states military? We commissioned the newest, largest, and most advanced aircraft carrier in the history of our nation, the USS Gerald R. Ford into the great American fleet. (Cheers). Then yesterday i was in West Virginia with almost 50,000 of our most impressive young Americans. They are young men who learned to cherish words like duty, honor, god, and country, the Boy Scouts. Then only a few hours ago the senate approved a vote to begin debating the repealing and replacing the Obamacare disaster. [ cheers and applause ] Finally. You think that’s easy? That’s not easy. We’re now one step closer to liberating our citizens from this Obamacare nightmare, and delivering great health care for the American people. We’re gonna do that too. And now tonight i’m back in the center of the American heartland, far away from the Washington swamp to spend time with thousands of true American patriots. [Chants of drain the swamp] We have spent the entire week celebrating with the hard working men and women who are helping us make America great again. I’m here this evening to cut through the fake news filter and to speak straight to the American people. fake news. fake, fake, fake news. [Chants of “drain the swamp” from arena]. Boy oh boy, people. Is there anyplace that’s more fun, more exciting and safer than a Trump rally? Where the hell did he come from? this has been a difficult week for the media because I forced them to travel with us all around the country and spend time with tens of thousands of proud Americans who believe in defending our values, our culture, our borders, our civilization, and our great American way of life. [cheers from crowd], Everyone in this arena is united by their love, and you know that. Do we know that. Everyone. United by their love for this country and their loyalty to one another, their loyalty to its people. [Cheers] And we want people to come into our country who can love us and cherish us and be proud of America and the American flag. [cheers] We believe that schools should teach our children to have pride in our history and respect for that great American flag. We all believe in the rule of law, and we support the incredible men and women of law enforcement. Thank you. Thank you for being here. [cheers. We celebrate our military and believe the American armed forces are the greatest force for peace and justice in the history of the world, and by the way, they’re getting a lot greater fast. A lot greater. You saw our budget. we’re ordering billions and billions of dollars of new ships and new planes and equipment for our great soldiers.we are building it up. There’s rarely been a time where we needed the protection of our incredible military more than right now, right here, and that’s what we’re going to do. We believe in freedom, self-government, and individual rights. We cherish and defend — thank you, it looks like it’s in very good shape — our Second Amendment. congratulations. [cheers from crowd] Yes, our Second Amendment is very, very sound again. that would have been gonzo. It would have been gone, but i never had a doubt. We support the constitution of the United States and believe that judges should interpret the constitution as written and not make up new meaning for what they read. And finally, we believe that family and faith, not government and bureaucracy, are the foundation of our society. You’ve heard me say it before on the campaign trail and I’ll say it again tonight. In America we don’t worship government. We worship God. [cheers from crowd]. Tonight we’re going to set aside the cynics and the critics because we know exactly why they are so angry and so bitter. Day by day, week by week we are restoring our government’s allegiance to its people, to its citizens, to the people that we all love. We are keeping our promises to the people, and yes, we are putting finally, finally, finally we are putting America first. [Chants of USA from crowd]. After years and years of sending our jobs and our wealth to other countries, we are finally standing up for our workers and for our companies. [cheers from crowd] After spending billions of dollars defending other nations’ borders, we are finally defending our borders. [Cheers and chants of “build that wall” from the crowd]. Don’t even think about it, we will build the wall. Don’t even think about it. I watched the media as they say, well, he just had some fun during the campaign on the wall. That wasn’t fun, folks. We’re building that wall, and walls do work and we’re going to have great people come into our country, but we’re not gonna to put ourselves through the problems that we’ve had for so many years. [Cheers]. After decades of rebuilding foreign nations, we are finally going to rebuild our nation. [Crowd boos at something]. They’re pointing to a protester. Honestly, if you don’t point, nobody’s even going to know he’s here. Weak voice, weak voice, don’t worry. [Chants of “USA” from crowd. Boy,he’s a young one. he’s going back home to mommy. Oh is he in trouble. He’s in trouble. He’s in trouble. And i’ll bet his mommy voted for us, right? [Cheers] By the way, so this morning i’m watching Fox News [crowd cheers] And they had some people on, and these were democrats that voted for trump. And they had this on. And so far if anything, they’ve gotten even more committed. But they had a man on this morning — they had a man on this morning who was a Democrat his whole life. He voted as a democrat, but he voted for — I say us, I don’t say me. He voted for us in the last election 2016. [cheers] And they said to him, so if the election were held now again, what would you do? And he effectively said, man, would I vote for Trump again, even faster. So his name is Gino Defabio. where is Gino? Gino, get over here, Gino. Whoa. Gino Defabio! [Defabio comes onstage as crowd cheers]. Thank you, Melania, America loves our First Lady, thank you. I am thrilled to be back in the great state of Ohio right here with the incredible men and women of Youngstown. What an amazing few days it’s been. On Saturday i was in Virginia with thousands of brave men and women of the United States Military. Do we love the united states military? We commissioned the newest, largest, and most advanced aircraft carrier in the history of our nation, the USS Gerald R. Ford into the great American fleet. (Cheers). Then yesterday i was in West Virginia with almost 50,000 of our most impressive young Americans. They are young men who learned to cherish words like duty, honor, god, and country, the Boy Scouts. Then only a few hours ago the senate approved a vote to begin debating the repealing and replacing the Obamacare disaster. [ cheers and applause ] Finally. You think that’s easy? That’s not easy. We’re now one step closer to liberating our citizens from this Obamacare nightmare, and delivering great health care for the American people. We’re gonna do that too. And now tonight i’m back in the center of the American heartland, far away from the Washington swamp to spend time with thousands of true American patriots. [Chants of drain the swamp] We have spent the entire week celebrating with the hard working men and women who are helping us make America great again. I’m here this evening to cut through the fake news filter and to speak straight to the American people. fake news. fake, fake, fake news. [Chants of “drain the swamp” from arena]. Boy oh boy, people. Is there anyplace that’s more fun, more exciting and safer than a Trump rally? Where the hell did he come from? this has been a difficult week for the media because I forced them to travel with us all around the country and spend time with tens of thousands of proud Americans who believe in defending our values, our culture, our borders, our civilization, and our great American way of life. [cheers from crowd], Everyone in this arena is united by their love, and you know that. Do we know that. Everyone. United by their love for this country and their loyalty to one another, their loyalty to its people. [Cheers] And we want people to come into our country who can love us and cherish us and be proud of America and the American flag. [cheers] We believe that schools should teach our children to have pride in our history and respect for that great American flag. We all believe in the rule of law, and we support the incredible men and women of law enforcement. Thank you. Thank you for being here. [cheers. We celebrate our military and believe the American armed forces are the greatest force for peace and justice in the history of the world, and by the way, they’re getting a lot greater fast. A lot greater. You saw our budget. we’re ordering billions and billions of dollars of new ships and new planes and equipment for our great soldiers.we are building it up. There’s rarely been a time where we needed the protection of our incredible military more than right now, right here, and that’s what we’re going to do. We believe in freedom, self-government, and individual rights. We cherish and defend — thank you, it looks like it’s in very good shape — our Second Amendment. congratulations. [cheers from crowd] Yes, our Second Amendment is very, very sound again. that would have been gonzo. It would have been gone, but i never had a doubt. We support the constitution of the United States and believe that judges should interpret the constitution as written and not make up new meaning for what they read. And finally, we believe that family and faith, not government and bureaucracy, are the foundation of our society. You’ve heard me say it before on the campaign trail and I’ll say it again tonight. In America we don’t worship government. We worship God. [cheers from crowd]. Tonight we’re going to set aside the cynics and the critics because we know exactly why they are so angry and so bitter. Day by day, week by week we are restoring our government’s allegiance to its people, to its citizens, to the people that we all love. We are keeping our promises to the people, and yes, we are putting finally, finally, finally we are putting America first. [Chants of USA from crowd]. After years and years of sending our jobs and our wealth to other countries, we are finally standing up for our workers and for our companies. [cheers from crowd] After spending billions of dollars defending other nations’ borders, we are finally defending our borders. [Cheers and chants of “build that wall” from the crowd]. Don’t even think about it, we will build the wall. Don’t even think about it. I watched the media as they say, well, he just had some fun during the campaign on the wall. That wasn’t fun, folks. We’re building that wall, and walls do work and we’re going to have great people come into our country, but we’re not gonna to put ourselves through the problems that we’ve had for so many years. [Cheers]. After decades of rebuilding foreign nations, we are finally going to rebuild our nation. [Crowd boos at something]. They’re pointing to a protester. Honestly, if you don’t point, nobody’s even going to know he’s here. Weak voice, weak voice, don’t worry. [Chants of “USA” from crowd. Boy,he’s a young one. he’s going back home to mommy. Oh is he in trouble. He’s in trouble. He’s in trouble. And i’ll bet his mommy voted for us, right? [Cheers] By the way, so this morning i’m watching Fox News [crowd cheers] And they had some people on, and these were democrats that voted for trump. And they had this on. And so far if anything, they’ve gotten even more committed. But they had a man on this morning — they had a man on this morning who was a Democrat his whole life. He voted as a democrat, but he voted for — I say us, I don’t say me. He voted for us in the last election 2016. [cheers] And they said to him, so if the election were held now again, what would you do? And he effectively said, man, would I vote for Trump again, even faster. So his name is Gino Defabio. where is Gino? Gino, get over here, Gino. Whoa. Gino Defabio! [Defabio comes onstage as crowd cheers]"
        }
      
        //watson logic
        if(person.quotes.length > 0 ) {
          let profileParams = {
            content: (catQuote),
            content_type:  'application/json',
            raw_scores: true
          }
          personalityInsights.profile(profileParams, (err, profile)=>{
            console.log(profile)
          })
        //   .then(profile => {
        //     // console.log(JSON.stringify(profile, null, 2));
        //     console.log(profile)
        //     res.json(profile)
        //   })
        //   .catch(function(error) {
        //     console.log('Error getting the posts');
        //   console.log(profileParams)
        // });
        };
        
        
        res.status(201).json({quotes: catQuote}); // send back watson stuff instead of catquote
      });
    });
    Quote.find({}, (err, quotes) => {
      let personalityInsights = new PersonalityInsightsV3 ({
        version: '2017-10-13',
        iam_apikey: process.env.IAM_APIKEY,
        url: "https://gateway.watsonplatform.net/personality-insights/api"
      })
    // console.log();
      // let catQuote = '';
      // for(i = 0; i >= 1; i++) {
      //   catQuote += Quote + i + ", ";
      // }
      // console.log("This is a quote", catQuote);



    });
  });
});

  module.exports = router;