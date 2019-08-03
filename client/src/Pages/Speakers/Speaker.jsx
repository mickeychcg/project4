import React, {useContext, useEffect, useState} from 'react';

import UserContext from '../../Contexts/UserContext';
import SpeakersContext from '../../Contexts/SpeakersContext';

function QuoteForm(props) {
  const userContext = useContext(UserContext);
  const [content, setContent] = useState('');
  const onSubmit = async () => {
    if (content.length > 0) {
      await fetch(`/api/user/${userContext.user._id}/speakers/${props.speaker._id}/quotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({quote: content})
      });
      setContent('');
    }
  };

  function DeleteQuote(props) {
    const userContext = useContext(UserContext);
    // const speakersContext = useContext(SpeakersContext);
    const quote = props.speaker.quote_id;
    const onSubmit = async () => {
      if (content.length > 0 ) {
        return fetch(`/api/user/${userContext.user._id}/speakers/${props.speaker._id}/quotes/${props.quote._id}`, {
          method: 'DELETE',
        }).then (response =>
          response.json().then(json => {
            return json;
          })
          )}
        }
      }
      
      return (
        <div>
      <div>
        <textarea
          name="quote"
          cols="200"
          rows="20"
          value={content}
          placeholder="Paste a New Quote"
          onChange={event => setContent(event.target.value)} />
      </div>
      <div>
        <button onClick={onSubmit}>Add</button>
      </div>
    </div>
  );
}

function Speaker(props) {
  const userContext = useContext(UserContext);
  const speakersContext = useContext(SpeakersContext);
  const speaker = speakersContext.list.find(candidate => candidate._id === props.match.params.id);

  const [quotes, setQuotes] = useState([]);
  const fetchQuotes = async () => {
    const response = await fetch(`/api/user/${userContext.user._id}/speakers/${speaker._id}/quotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json = await response.json();
    setQuotes(json);
  };
  
  useEffect(() => {
    if (speaker) {
      fetchQuotes();
    }
  }, [speaker]);
  
  return (
    <div>
      <h2>{speaker.name}</h2>
      <ul className='Speakers.ul'>
        {quotes.map(quote => {
          return (
            <li key={quote.id}>
            {quote.content.slice(0, 100)}...</li>
            );
          })}
      </ul>
      <QuoteForm speaker={speaker} />
    </div>
  );
}

export {Speaker as default};