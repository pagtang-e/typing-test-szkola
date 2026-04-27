import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';


function EndGame(props) {
    const saved = useRef(false);
    const [quote,setQuote] = useState();
    const apiKey = import.meta.env.VITE_API_KEY;

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

        getPlayerQuote(props.score)
        
    }, []);


    

    async function getPlayerQuote(score) {
    const apiKey = import.meta.env.VITE_API_NINJAS_KEY;
  
    // Logic to determine category
    let category = 'inspirational';
    if (score > 1700) category = 'success';

    try {
        const response = await fetch(`https://api.api-ninjas.com/v2/randomquotes?categories=${category}`, {
            method: 'GET',
            headers: {
                        'X-Api-Key': apiKey,
                        'Content-Type': 'application/json'
             }
    });

    const data = await response.json();
    
    setQuote(data)
   
    }
     catch (error) {
        console.error("Failed to fetch quote:", error);
        return { quote: "Keep going!", author: "System" };
    }
    }
    console.log(quote)
    return (
        
        <div className="menu statsMenu">
            <h2>Score</h2>
            <div className='stats'>
            <p> {props.correctChars}</p>
            <p> {props.incorrectChars}</p>
            </div>
            <p className="score"> {props.score}</p>
               {quote ? <div className='quote'><p>{quote[0].quote}</p><p>{quote[0].author}</p></div>: <div className='quote'><p style={{textAlign:"center"}}>Loading quote...</p></div>} 

            <div className="buttons">
               <button className="start endGame" onClick={()=>window.location.reload()}>Play Again</button>
                <button className="start endGame"><Link to="/" >Exit to menu</Link> </button> 
            </div>
           
        </div>
    );
}

export default EndGame;