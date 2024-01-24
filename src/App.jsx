import './App.css'
import Landing from './components/Landing/Landing.jsx'
import LandingGenerate from './components/Landing/LandingGenerate.jsx'
import List from './components/Landing/List.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import OthersList from './components/Landing/OthersList.jsx'

function App() {

    const lname = 'andres'
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingGenerate />} />
                    <Route path="/:genId" element={<Landing />} />
                    <Route path="/:genId/:name" element={<List name={lname} />} />
                    <Route path="/testall" element={<OthersList />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
