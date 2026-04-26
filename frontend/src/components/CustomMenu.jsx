import hardClick from '../assets/1026.mp3';
import click from '../assets/click.m4a';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Link } from 'react-router';
import { useState } from 'react';
import dayjs from 'dayjs';

import toArray from 'dayjs/plugin/toArray'
dayjs.extend(toArray);

function CustomMenu() {
    
    let [time, setTime] =  useState(dayjs().hour(0).minute(1).second(0));
    let [charseta, setCharseta] = useState(false);
    let [charsetA, setCharsetA] = useState(false);
    let [charset1, setCharset1] = useState(false);
    let [charsetHash, setCharsetHash] = useState(false);
    let [charsetError, setCharsetError] = useState(false);

    function handleClick() {
            new Audio(hardClick).play();
            
        }

    function handleClickError() {
        new Audio(hardClick).play();
       
        if(!charseta && !charsetA && !charset1 && !charsetHash){
            setCharsetError(true);
        }
        else{
            setCharsetError(false);
        }
    }

    function handleTimeChange(newTime) {
        setTime(newTime);
        new Audio(click).play();
        
    }

    return (
        <div className="custom-menu">
            
            <div className="menu">
<h2>Custom</h2>

<div className='timeContainer'>
<p>select the test time <br/> or 00:00 for unlimited time</p>

<p>min sec</p>
    
 <LocalizationProvider dateAdapter={AdapterDayjs}>
     <MultiSectionDigitalClock  value={time}
              onChange={(newTime) => handleTimeChange(newTime)} timeSteps={{minutes: 1, }} views={['minutes', 'seconds']} className='time'/>
 </LocalizationProvider></div>
 {charsetError &&<p className="error">select at least one character type!</p>}
 <fieldset>
    <legend>character set</legend>
    <FormControlLabel control={<Checkbox checked={charseta} onChange={()=>{new Audio(click).play(); setCharseta(!charseta)}} />} label="a" labelPlacement="start" className='check' sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}/>
    <FormControlLabel control={<Checkbox checked={charsetA} onChange={()=> {new Audio(click).play(); setCharsetA(!charsetA)}}/>}label="A" labelPlacement="start" className='check' sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}/>
    <FormControlLabel control={<Checkbox checked={charset1} onChange={()=> {new Audio(click).play(); setCharset1(!charset1)}}/>} label="1" labelPlacement="start" className='check' sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}/>
    <FormControlLabel control={<Checkbox checked={charsetHash} onChange={()=> { new Audio(click).play();  setCharsetHash(!charsetHash)}}/>} label="#" labelPlacement="start" className='check' sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}/>

 </fieldset>
 { (charseta || charsetA || charset1 || charsetHash)?
 <Link to="/Game" className="start" onClick={handleClick} state={{mode: 1, charset: [charseta,charsetA,charset1,charsetHash],  timeLimit: [time.minute(),time.second()]}}>Start</Link> : <button className="start" onClick={handleClickError}>Start</button>}

 
            </div>
           
        </div>
    );
}

export default CustomMenu;