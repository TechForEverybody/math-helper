import './App.css';
import './Styles/index.scss';
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import ErrorPage from './Components/Templates/ErrorPage';
import { AnimatePresence } from "framer-motion"

function App() {
    return (
        <AnimatePresence>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="*" element={<ErrorPage />}>
                    </Route>
                </Routes>
        </AnimatePresence>
    );
}

export default App;
