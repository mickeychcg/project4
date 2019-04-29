import React  from 'react';

const ShowPersonQuote = (props) => {
  if(props.person) {
    var name = props.person.name
    var quoteLinks = props.person.quotes.map((quote, index) => {
        return ( <p key={index}> {quote.quote} </p> )
    })   
  } else {
    var name = <p>See below...</p>
    var quoteLinks = <p>No person selected</p>
  }
  return (
    <div>
      <h1>{name}</h1>
      <h1>Their Quotes:</h1>
      {quoteLinks}
    </div>
  )
}

export default ShowPersonQuote;
