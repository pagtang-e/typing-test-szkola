import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function EndGame(props) {
    const saved = useRef(false);

    useEffect(() => {
        if (saved.current) return;
        saved.current = true;

        const timeElapsed = props.timeElapsed === 0 ? 1 : props.timeElapsed;
        const totalChars = props.correctChars + props.incorrectChars;
        const lpm = Math.floor((props.correctChars * 60) / timeElapsed);
        const acc = totalChars === 0 ? 100 : Math.floor((props.correctChars / totalChars) * 100);
        const currentDate = new Date().toISOString().split('T')[0];

        const newResult = {
            score: props.score,
            lpm: lpm,
            acc: acc + '%',
            date: currentDate,
            mode: props.mode || 1
        };

        const existingResults = JSON.parse(localStorage.getItem('typingResults') || '[]');
        existingResults.push(newResult);
        localStorage.setItem('typingResults', JSON.stringify(existingResults));
    }, []);

    return (
        
        <div className="menu statsMenu">
            <h2>Score</h2>
            <div className='stats'>
            <p> {props.correctChars}</p>
            <p> {props.incorrectChars}</p>
            </div>
            <p className="score"> {props.score}</p>
            <div className="buttons">
               <button className="start endGame" onClick={()=>window.location.reload()}>Play Again</button>
                <button className="start endGame"><Link to="/" >Exit to menu</Link> </button> 
            </div>
           
        </div>
    );
}

export default EndGame;