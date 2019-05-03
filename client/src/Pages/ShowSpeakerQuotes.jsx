import React  from 'react';

const ShowSpeakerQuote = (props) => {
  if(props.speaker) {
    var name = props.speaker.name
    var quoteLinks = props.speaker.quotes.map((quote, index) => {
        return ( <p key={index}> {quote.quote} </p> )
    })   
  } else {
    var name = <p>See below...</p>
    var quoteLinks = <p>No speaker selected</p>
  }
  return (
    <div>
      <h1>{name}</h1>
      <h1>Their Quotes:</h1>
      {quoteLinks}
    </div>
  )
}

export default ShowSpeakerQuote;
