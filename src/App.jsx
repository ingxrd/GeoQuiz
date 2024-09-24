//outros 
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
//estilização
import './App.css'
//páginas
import Home from './pages/Home'
import Quiz from './pages/Quiz'



function App() {

  return (
    <>
    <Router>
    <Toaster />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
      </Routes>
    </Router>
    </>

  )
}

export default App
