import click from '../assets/1026.mp3';
import Classic from '../assets/classic.svg?react'
import Hardcore from "../assets/hardcoreIcon.svg?react";
import Custom from "../assets/custom.svg?react";


function Card({name}) {

    function handleClick() {
        new Audio(click).play();
        
    }

  return (
    <div className="card" onClick={handleClick}>
        {name == 'Classic' && <Classic/>}
        {name == 'Hardcore' && <Hardcore/>}
        {name == 'Custom' && <Custom/>}
        <h2>{name}</h2>
    </div>
  );
}

export default Card;
