import React  from 'react';
// import Speakers from './Speakers';
import QuoteForm from '../Components/QuoteForm';

const ShowSpeakerQuotes = (props) => {
  if(props.selectedSpeaker) {
    var name = props.selectedSpeaker.name
    var quoteLinks = props.speaker.quotes.map((quote, i) => {
      return ( <p key={i}> {props.speaker.name} {quote.quote} </p> )
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
      <h2>Add a new quote...</h2>
      <QuoteForm addQuote = {props.addQuote}/>
    </div>
  )
}

export default ShowSpeakerQuotes;

