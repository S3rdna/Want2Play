import './App.css'
import Landing from './components/Landing/Landing.jsx'
import List from './components/Landing/List.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

    const lname = 'andres'
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/lists" element={<List name={lname} />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
