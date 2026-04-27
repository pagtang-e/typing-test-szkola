import click from '../assets/1026.MP3';
import { Link } from 'react-router';

function RankedMenu() {
    function handleClick() {
            new Audio(click).play();
            
        }
    return (
         <div className="Ranked-menu">
            
            <div className="menu">
                <h2>classic</h2>
                <p>The clasic mode saves your score in the leaderboard and compares you to other users so check your skills if you dare. the rules are simple</p>

                <p> 1 MINUTE <br/> ALL NUMBERS AND LETTERS </p>
                <Link to="/Game" state={{mode: 2, charset: [true,true,true,false],  timeLimit: [1,0]}}><button className="start" onClick={handleClick}>Start</button></Link>
            </div>
            
        </div>
    );
}

export default RankedMenu;