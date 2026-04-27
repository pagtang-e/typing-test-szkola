import Card from "../components/card";
import customImg from "../assets/custom.png";
import RankedImg from "../assets/hardcoreIcon.svg?react";
import trainingImg from "../assets/training.png";
import { useState } from "react";
import CustomMenu from "../components/customMenu";
import RankedMenu from "../components/rankedMenu";
import TrainingMenu from "../components/trainingMenu";
import closingSound from '../assets/close.mp3';
import Close from '../assets/xIcon.svg?react';
import Info from '../assets/IIcon.svg?react';
import Ranking from '../assets/ranking.svg?react';
import Classic from '../assets/classic.svg?react'
import RankingComponent from '../components/RankingComponent';

import click from '../assets/1026.mp3';

export default function Landing(){

    let [custom,setCustom]=useState(false);
    let [ranked,setRanked]=useState(false);
    let [training,setTraining]=useState(false);
    const [rankingOpen,setRankingOpen]=useState(false);

    function CustomClick(){
        setCustom(true);
    }
    function RankedClick(){
        setRanked(true);
    }
    function TrainingClick(){
        setTraining(true);
    }
    function menuClose(){
        new Audio(closingSound).play();
        if(custom){
            setCustom(false);
        }
        if(ranked){
            setRanked(false);
        }
        if(training){
            setTraining(false);
        }
        if(rankingOpen){
            new Audio(click).play();
            setRankingOpen(false);
        }
    }
   
    return(
        <>
        <div className="cards" >
        <div onClick={CustomClick}>
         <Card name="Custom"  />   
        </div>
        <div onClick={RankedClick}className="second"><Card name="Classic" /></div>
        <div onClick={TrainingClick}><Card name="Hardcore" /></div>
        
        </div>
        <Ranking alt="ranking" className="info close" onClick={()=>{setRankingOpen(true); window.scrollTo({ top:0 })}}/>
        { (custom || ranked ||training||rankingOpen)&&<div className="backdrop" onClick={menuClose}> <Close alt="close" className="close" /></div>}
        {custom && <CustomMenu/>}
        {ranked && <RankedMenu/>}
        {training && <TrainingMenu />}
        {rankingOpen && <RankingComponent />}

        </>
    )
}
