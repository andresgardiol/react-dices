import './App.css';
import {useEffect, useState} from "react";


function useWindowSize() {
    let [windowWidth, setWindowWidth] = useState([window.innerWidth, window.innerHeight]);

    function updateWindowWidth() {
        return setWindowWidth([window.innerWidth, window.innerHeight]);
    }

    useEffect(() => {
        window.addEventListener('resize', updateWindowWidth);
        return () => window.removeEventListener('resize', updateWindowWidth);
    }, []);
    return windowWidth;
}

function App() {

    let [width, height] = useWindowSize();

    return (
        <div className="App">
            <h1>Window width is: {width}px</h1>
            <h1>Window height is: {height}px</h1>
        </div>
    );
}

export default App;
