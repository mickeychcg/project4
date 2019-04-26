import React from 'react';

const QuoteForm = (props) => {
  // console.log("Who's the user?", this.props.user)
  return (
    <form onSubmit={props.addQuote}>
    <textarea name="quote" id="" cols="200" rows="20" placeholder="Paste a New Quote"></textarea>
      <input type="submit" value="Add New Quote" />
  </form>
  )

}

export default QuoteForm;