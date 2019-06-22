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
  message: "RULES: DON'T CLICK ON THE SAME CARD!"
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
    } = this.state;

    let stateWillUpdate = true; // run setState or nah

    // shuffle order of character cards
    characters = this.shuffleCards();

    for (var i in characters) {
      
      // find the clicked item in the array
      if (characters[i].id === id) {
        
        // oops... player already selected this card! Run GameOvar sequence:
        if(characters[i].selected){
          
          score = 0;              // reset score
          guessed = false;        // trigger to errorbump animation (css class)
          this.resetGame();       // reset all selected cards as unselected
          stateWillUpdate = false; // don't update the state here since reset will set
          this.setState({ message : ">> GAME OVER! >> SCORE RESET TO ZERO..."});
          setTimeout(() => {
            this.setState({ message: "NEW GAME: Dont click on the same card!"});
          }, 1500)
          break;                  // stop the loop
        
        // update score and select
        } else {
        
          score++;                // woohoo! score up
          this.setState({ message : "YAAY! KEEP IT UP! "});

          if(score > winStreak){  // check high score
            winStreak = score;    // update winning streak
          }

          guessed = true;         
          characters[i].selected = true;

        }
        break; //Stop this loop, we found it!
      }
    }
    
    if(stateWillUpdate){
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
      characters[i].selected = false; // resets cards as unselected
    }

    this.setState({ 
      characters,
      guessed: false
    });

    setTimeout(() => {
      this.setState({ 
        guessed: null,
        score: 0  
      });
    }, 1500)
    
  }

  render(){

    const { characters } = this.state;

    const charCards = characters.map(cardCharz => (
      <Card {...cardCharz} clickCardz={this.handleCard} key={cardCharz.id} />
    ));

    return (
      <main>
        <Navbarr score={this.state.score} message={this.state.message} streak={this.state.winStreak}/>
        <Cardgroup>
            <div 
            className={this.state.guessed !== null ? 
              (this.state.guessed ? 
                "wrapper-content" :           // true - class remains
                "errorbump wrapper-content" ) :   // false
                "wrapper-content"}            // false - null status (no events)
            >  
            {charCards}
            </div>
        </Cardgroup>
      </main>
      
    );
  }
}

export default App;
