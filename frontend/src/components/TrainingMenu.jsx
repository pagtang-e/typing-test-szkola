import click from '../assets/1026.MP3';
import { Link } from 'react-router';

function TrainingMenu() {
    function handleClick() {
            new Audio(click).play();
            
        }
    return (
         <div className="training-menu">
            
            <div className="menu">
                <h2>Hardcore</h2>
                <p>The hardcore mode is for those who want to test their limit it includes all characters and doesn't allow you to make any mistakes.
                </p>

                <p> 1 MINUTE <br/> ALL CHARACTERS</p>
                 <Link to="/Game" state={{mode: 3, charset: [true,true,true,true],  timeLimit: [1,0]}}><button className="start" onClick={handleClick}>Start</button></Link>
            </div>
            
        </div>
    );
}

export default TrainingMenu;