import './App.css';
import {useEffect, useState} from "react";

function Outline({children}) {
    return (
        <div className="outline">
            {children}
        </div>
    )
}

function DiceFace({value, onChangeValue}) {

    return (
        <input className="face" value={value} onChange={e => onChangeValue(e.target.value)}/>
    );
}

function Dice({throws}) {
    let [value, setValue] = useState(null);
    let [diceName, setDiceName] = useState("Name");
    let [facesValues, updateFacesValues] = useState([1, 2, 3, 4, 5, 6]);

    useEffect(() => {
        handleThrow();
    }, [throws]);

    function getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const handleThrow = () => {
        let random = getRandomValue(0, 5);
        setValue(facesValues[random]);
    }

    function handleFaceChangeValue(index) {
        return (newValue) => {
            let updatedFaces = [...facesValues];
            updatedFaces[index] = newValue;
            updateFacesValues(updatedFaces);
        }
    }

    return (
        <div className="Dice">
            <input value={diceName} onChange={(e) => setDiceName(e.target.value)}/>
            <h1>
                {value}
            </h1>
            Valores:
            {facesValues
                .map((value, index) =>
                    <DiceFace key={index}
                              onChangeValue={handleFaceChangeValue(index)}
                              value={value}/>)}

            <button onClick={handleThrow}>Tirar</button>
        </div>
    );
}

function DiceTable() {
    let [dices, setDiceNumber] = useState([1]);
    let [throwTrigger, throwAll] = useState(false);

    const handleAdd = () => {
        setDiceNumber(old => [...old, old.length + 1]);
    }

    const handleRemove = () => {
        if (dices.length > 1) {
            setDiceNumber(old => [...old.filter(value => [...old].pop() !== value)]);
        }
    }

    const handleThrowAll = () => {
        throwAll(prev => !prev);
    }
    return (
        <div>
            <h2>Elige cuántos dados tirar</h2>
            <button onClick={handleAdd}>+ Agregar</button>
            <button onClick={handleRemove}>- Remover</button>
            <button onClick={handleThrowAll}>Tirar todos</button>
            <h2>{dices.length} dado{dices.length > 1 ? 's' : null} para tirar</h2>
            {dices.map((value) => {
                return (
                    <Outline key={value.toString()}>
                        <Dice throws={throwTrigger}/>
                    </Outline>
                )
            })}
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <DiceTable/>
        </div>
    );
}

export default App;
