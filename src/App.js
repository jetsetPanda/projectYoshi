import React from "react";
import Card from "./components/Card";
import Cardgroup from "./components/Cardgroup";
import characters from "./characters.json";
import "./App.css";
import Navbarr from "./components/Navbarr";

const initstateobj = {
  characters,
  guessed: null,
  score: 0,
  winStreak: 0 
}

class App extends React.Component {

  state = { ...initstateobj };

  shuffleCards = () => {
    return this.state.characters.sort(() => Math.random() - 0.5);
  }

    // onClick event that will check whether the card
    // was clicked already

  handleCard = (e,id) => {
    
    e.preventDefault();

    let {
      characters,
      score,
      winStreak,
      guessed
    } = this.state;

    let runStateUpdate = true; // run setState or nah

    // shuffle order of character cards
    characters = this.shuffleCards();

    for (var i in characters) {
      
      // find the clicked item in the array
      if (characters[i].id === id) {
        
        // oops... player already selected this card. Run GameOvar sequence:
        if(characters[i].selected){
          
          score = 0;              // reset score
          guessed = false;        // initiate shake animations
          this.resetGame();       // reset all selected cards
          runStateUpdate = false; // don't update the state here since reset will set
          break;                  // stop the loop
        
        // update score and select
        } else {
        
          score++;                // woohoo! score up

          if(score > winStreak){  // check high score
            winStreak = score;    // update winning streak
          }

          guessed = true;         
          characters[i].selected = true;

        }
        break; //Stop this loop, we found it!
      }
    }
    
    if(runStateUpdate){
      console.log("state updated");
      this.setState({ characters, score, winStreak, guessed });
      setTimeout(() => {
        this.setState({guessed: null});
      }, 3500)
    }
   
  }

  resetGame = () => {

    console.log("state resets");
    
    for (var i in characters) {
      characters[i].selected = false;
    }

    this.setState({ 
      characters,
      score: 0,
      guessed: false,
    });

    setTimeout(() => {
      this.setState({ guessed: null });
    }, 3500)
    
  }

  render(){

    const { characters } = this.state;

    const charCards = characters.map(cardCharz => (
      <Card {...cardCharz} clickCardz={this.handleCard} key={cardCharz.id} />
    ));

    return (
      <main>
        <Navbarr score={this.state.score} length={this.state.characters.length} streak={this.state.winStreak}/>
        <Cardgroup>
            <div 
            className={this.state.guessed !== null ? 
              (this.state.guessed ? 
                "wrapper-content" :           // true
                "shake wrapper-content" ) :   // false
                "wrapper-content"}            // false
            >  
            {charCards}
            </div>
            {this.state.score === this.state.characters.length ? (
              <div className="win-message">
                <h3>You won!!!</h3>
                <button 
                  className="restartGame" 
                  onClick={this.resetGame}>
                    Restart the Game
                </button>  
              </div>) : ""} 
            <p>
              <span 
                className={this.state.guessed !== null ?
                (this.state.guessed ? 
                  "guesses correct show" :  // true
                  "guesses hide" ) :        // false
                  "guesses hide"}           // false
              >  
                    You guessed correctly!
              </span>
              <span 
                className={this.state.guessed !== null ? 
                  (this.state.guessed ?
                    "guesses hide" :              // true
                    "guesses incorrect show" ) :  // false
                    "guesses hide"}               // false
              >
                You guessed incorrectly!
              </span>
            </p>

        </Cardgroup>
      </main>
      
    );
  }
}

export default App;
