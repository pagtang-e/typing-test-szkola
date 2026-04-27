import Landing from './pages/Landing'
import Game from './pages/game'

import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import './styles/Card.css'
import './styles/CustomMenu.css'
import './styles/Menu.css'

function App() {
  

  return (
    <>
    <BrowserRouter>

      <Routes>
            <Route index element={<Landing/>} />
            <Route path="game" element={<Game/>}/>
            </Routes>

    </BrowserRouter>
    
     

    
    </>
  )
}

export default App
