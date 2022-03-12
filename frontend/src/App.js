import React from 'react'

// import Add from './pages/Add'
import NavBar from './components/NavBar/NavBar.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Add from './pages/Add';
import Display from './pages/Display';

// export default function App() {
//     return <div>
//         <>
//             <Router>
//                 <NavBar />
//                 <Routes>
//                     <Route path='/' exact component={Home} />
//                 </Routes>
//             </Router>
//         </>

//     </div>
// }


function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/add' exact element={<Add />} />
                <Route path='/display' exact element={<Display />} />
            </Routes>
        </Router>
    )
}

export default App;