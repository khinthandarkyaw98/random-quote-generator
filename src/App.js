import { useEffect, useState } from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from
 
'@fortawesome/react-fontawesome';
import { faTwitter, faTumblr } from
 
'@fortawesome/free-brands-svg-icons';

//import randomColor from 'randomcolor';

function App() {
  const [quote, setQuote] = useState({});
  const [color, setColor] = useState('#fff');

  useEffect(() => {
    handleQuote();
  }, [])

  const handleQuote = () => {
    getQuote();
    getColor();
  }

  const getColor = () => {
    let color = '#' + Math.floor(Math.random() * 888899).toString();
    //let color = randomColor();
    setColor(color);
    document.getElementById('App').style.backgroundColor = color;
    document.getElementById('text').style.color = color;
    document.getElementById('author').style.color = color;
    document.getElementById('new-quote').style.backgroundColor = color;
    document.getElementById('new-quote').style.borderColor = color;
  }

  const getQuote = () => {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then((response) => {return response.json()})
        .then((data) => {
          let dataQuotes = data.quotes;
          let randomNum = Math.floor(Math.random() * dataQuotes.length);
          
          setQuote({
            text: dataQuotes[randomNum].quote,
            author: dataQuotes[randomNum].author
          })
        });
  };


  return (
    <div className="App" id="App">
      <div id="quote-box">
        <p id="text">{quote.text}</p>
        <p id="author">{quote.author}</p>
        <div className="buttons">
          {/*<FontAwesomeIcon id="tweet-quote" icon={faTwitter} onClick={() => window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + quote.text, '_blank')} />*/}
          <a  id="tweet-quote" href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + quote.text} target="_blank">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <Button className="text-nowrap" id="new-quote" variant="success" onClick={handleQuote}>New quote</Button>
        </div>
      </div>
      <p id="coder">by coral</p>
    </div>
  );
}

export default App;

