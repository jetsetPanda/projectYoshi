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
  winStreak: 0,
  message: "DON'T CLICK ON THE SAME CARD TWICE!"
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
      guessed,
      message,
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
          this.message = "OOPS! GAME OVER!"
          break;                  // stop the loop
        
        // update score and select
        } else {
        
          score++;                // woohoo! score up
          message = "YAAY! KEEP IT UP!"

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
      message: "DON'T CLICK ON THE SAME CARD TWICE!"
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
        <Navbarr score={this.state.score} message={this.state.message} streak={this.state.winStreak}>
         
        </Navbarr>
        <Cardgroup>
            <div 
            className={this.state.guessed !== null ? 
              (this.state.guessed ? 
                "wrapper-content" :           // true
                "errorbump wrapper-content" ) :   // false
                "wrapper-content"}            // false
            >  
            {charCards}
            </div>
        </Cardgroup>
      </main>
      
    );
  }
}

export default App;
