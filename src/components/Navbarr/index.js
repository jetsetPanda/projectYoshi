import React from 'react';
import './style.css';

function Navbarr(props) {
    return (
        <div id="navbarRainbow">
            <span className="navElement floatLeft">
                <h1 className="audiowide wite textLeft shadowed">jetsetCards</h1>                {/*| flip card memory endurance test <h4 className="textLeft" style={{color: "gray"}}>powered by <a href="https://www.jetsetengine.com" target="_blank" rel="noopener noreferrer" style={{textDecoration: "none", color: "black"}}>jetsetEngine zwei</a></h4>*/}
            </span>
            <span className="navElement floatmiddle">
                <p className=" vgfont wite">{props.message}</p></span>
            <span className="navElement floatRight">
                <p className="vgfont wite">>Score: {props.score}  >Streak: {props.streak}</p>
            </span>
        </div>
    );
}

export default Navbarr;