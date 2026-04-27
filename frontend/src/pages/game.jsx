import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Close from '../assets/xIcon.svg?react';
import '../styles/game.css'
import EndGame from '../components/endGame';
import { Link } from 'react-router';
import incorrect from '../assets/incorrect.svg'
import correct from '../assets/correct.svg'


function Game() {
    const location = useLocation()
    const { mode, charset, timeLimit } = location.state || {}
    const [time, setTime] = useState(timeLimit[0]*60 + timeLimit[1]);
    const [height, setHeight] = useState(((time)/(timeLimit[0]*60 + timeLimit[1]))*100 + '%');
    const [correctChars, setCorrectChars] = useState(0);
    const[incorrectChars, setIncorrectChars] = useState(0);
    const[pastChar, setPastChar] = useState('');
    const [char, setChar] = useState('');
    let characters ="";
    const [End, setEnd] = useState(false);
   const [score, setScore] = useState(0);
   const[countDown, setCountDown] = useState(3);
   const [pause, setPause] = useState(false);
    const unlimited = timeLimit[0]==0 && timeLimit[1]==0;

   setTimeout(() => {
    if(countDown>0){
        setCountDown(countDown - 1);
    }
   }, 1000);

   

   


    if(charset[0]){
        characters += 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';
    }
    if(charset[1]){
        characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if(charset[2]){
        characters += '01234567890123456789';
    }
    if(charset[3]){
        characters += '!@#$%^&*()_+-=[]{}|;:\'",.<>?/`~';
    }

    useEffect(() => {
        generateChar();
        setPastChar(char);
        window.addEventListener('keydown', (event)=> {
            const typed = event.key;
         
        if(typed === 'Escape'){
            setPause(true);
        }

        });
    }, []);

    useEffect(() => {
         window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
    }, [char]);


    useEffect(() => {
        setTimeout  (() => {
            
            if(unlimited && countDown==0 && !pause){
                setTime(time + 1)
                return;
            }
            if(time>0 && countDown==0 && !pause){
                setTime(time - 1)
            }
            else if(time==0 && !unlimited){
                setEnd(true) 
                if(correctChars + incorrectChars === 0){
                    setScore(0);
                    
                }
                else{
                    if(mode != 3){
                setScore(Math.floor(1000*correctChars/(correctChars + incorrectChars)*correctChars/(timeLimit[0]*60 + timeLimit[1])-15*incorrectChars));
                    }
                    else{
                        setScore(Math.floor(1000*correctChars/(timeLimit[0]*60 + timeLimit[1])))
                    }
            }
            }
            if(!unlimited){
              setHeight(((time-1)/(timeLimit[0]*60 + timeLimit[1]))*100 + '%');
            }
        }, 1000);
    }, [time,countDown,pause]);

    const handleKeyPress = (event) => {
    const typed = event.key;
    if (typed === char) {
      setCorrectChars(correctChars + 1);
        generateChar();
    } 
    else{
        if(mode == 3){
             setScore(Math.floor(1000*correctChars/(timeLimit[0]*60 + timeLimit[1])))
            setEnd(true);
            return;
        }
      setIncorrectChars(incorrectChars + 1);
      generateChar();
    }
  };
    
    function generateChar(){ 
        if(time || unlimited){
        const randomIndex = Math.floor(Math.random() * characters.length);
        if(pastChar != characters[randomIndex]){
             setChar(characters[randomIndex]);
             setPastChar(characters[randomIndex]);
        }
        else{
            generateChar();
        }
    }
       
    }   

    

  return (
    <>
    {countDown>0 && <><div className='backdrop pause'><h1>{countDown}</h1></div></>}
   {(!End && !pause) && <Close alt="close" className="close game" onClick={()=>setPause(true)}/>}
   
    <div className='timer'>
        
      <p>{time<600 && "0"}{Math.floor(time/60)} : {time%60<10&&"0"}{time%60}</p>
        <div className='gutter'>
            <div className='rain' style={{height: height}}></div>
        </div>
        </div>
    <div className='gameArea'>
        <div className='stats'>
            <div className='stats cor'>
                <p> {correctChars<10 && "0"}{correctChars}</p>
            <img src={correct} alt="" className='statsSvg'/>
            </div>
            {mode != 3 && <div className='stats inco'>
                 <img src={incorrect} alt="" className='statsSvg' />
            <p> {incorrectChars<10 && "0"}{incorrectChars}</p>
            </div>}
           
        </div>
        <div className='character'>
            <h1>{char}</h1>
           
        </div>
        
    </div>
    {End && <><div className="backdrop"></div><EndGame score={score} correctChars={correctChars} incorrectChars={incorrectChars} timeElapsed={unlimited ? time : (timeLimit[0]*60 + timeLimit[1] - time)} mode={mode}/></>}
     {pause && <> <div className='backdrop pause'><div className='menu pauseMenu'>
            <button className="start endGame" onClick={()=> {setPause(false); setCountDown(3)}}>resume</button>
               <button className="start endGame" onClick={()=>window.location.reload()}>restart</button>
            <Link to="/" className="start endGame">Exit to Menu</Link> 
        </div></div></>}
         {!End&&<input type="text" id='bait' />}
    </>
  );
}

export default Game;