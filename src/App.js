import {useState} from 'react';
import Card from './components/Card';
import Status from './components/Status';
import './App.css';

const imagePath = 'Cards/';

const fillImages = () => {
  let images = Array(20).fill(null);
  let values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
  let suits = ['h', 's'];
  let index = 0;
  for (let value = 0; value < values.length; value++){
      for (let suit = 0; suit < suits.length; suit ++) {
          images[index] = "card" + values[value] + suits[suit] + ".jpg";
          index++;
      }
  }
  return images;
}

const shuffleImages = (images) => {
  for (let i = 0; i < images.length; i++) {
    let rnd = Math.floor(Math.random() * images.length);
    [images[i], images[rnd]] = [images[rnd], images[i]];
  }
}

const fillAndShuffle = () => {
  let localImages = fillImages();
  shuffleImages(localImages);
  return localImages;
}

const isMatch = (firstPick, secondPick, images) => {
  if (images[firstPick].substr(4, 1) === images[secondPick].substr(4, 1))
          return true;
      else
          return false;
}

function App() { 

  const [images, setImages] = useState(fillAndShuffle);
  const [picks, setPicks] = useState({firstPick: -1, secondPick: -1});
  const [matches, setMatches] = useState(0);
  const [tries, setTries] = useState(0);

  const renderCard = (i) => {    
    const image = (images[i] == null) ? 'none' : 
      ( picks.firstPick === i || picks.secondPick === i) ? 
      'url(' + imagePath + images[i] + ')' : 
      'url(' + imagePath + 'black_back.jpg)';
    const enabled = (images[i] != null && 
      (i !== picks.firstPick && i !== picks.secondPick) &&
      (picks.firstPick === -1 || picks.secondPick === -1) &&
      (matches < 10)) ? true : false;

    const eventHandler = (enabled) ? handleClick : () => {};
    const cursor = (enabled) ? "pointer" : "none";

    const style = {
      backgroundImage: image,
      cursor: cursor
    };

    return (
        <Card
            index={i}
            style={style}
            eventHandler={eventHandler}
        />
    );
  };

  const handleClick = (event) => {
    const index = parseInt(event.target.id);
    let localPicks = {...picks};
    if (picks.firstPick === -1) {
        localPicks.firstPick = index;
        setPicks(localPicks);
    } else {
        localPicks.secondPick = index;
        setPicks(localPicks);
        setTimeout(checkCards, 2000, localPicks.firstPick, localPicks.secondPick, images, tries, matches);
    }
  }

  const checkCards = (fP, sP, i, t, m) => {
    setTries(t + 1);
    if (isMatch(fP, sP, i)) {
        setMatches(m + 1);
        i[fP] = null;
        i[sP] = null;
        setImages(i);
    }
    setPicks({firstPick: -1, secondPick: -1});
  }

  let status = (matches < 10) ?
  'Matches: ' + matches + " Tries: " + tries :
  "Congratulations!  You found all 10 matches in " + tries + " tries!";

  return ( 
    <div className="container" id="board">
        <Status status={status} />
        <div className="row">
            <div className="col-sm-1"></div>
            {renderCard(0)}
            {renderCard(1)}
            {renderCard(2)}
            {renderCard(3)}
            {renderCard(4)}
            <div className="col-1"></div>
        </div>
        <div className="row">
            <div className="col-sm-1"></div>
            {renderCard(5)}
            {renderCard(6)}
            {renderCard(7)}
            {renderCard(8)}
            {renderCard(9)}
            <div className="col-1"></div>
        </div>
        <div className="row">
            <div className="col-sm-1"></div>
            {renderCard(10)}
            {renderCard(11)}
            {renderCard(12)}
            {renderCard(13)}
            {renderCard(14)}
            <div className="col-1"></div>
        </div>
        <div className="row">
            <div className="col-sm-1"></div>
            {renderCard(15)}
            {renderCard(16)}
            {renderCard(17)}
            {renderCard(18)}
            {renderCard(19)}
            <div className="col-1"></div>
        </div>
    </div>
  );
}

export default App;
