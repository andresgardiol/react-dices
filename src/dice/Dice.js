import {useEffect, useState} from "react";
import {DiceFace} from "./DiceFace";

export function Dice({throws}) {
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
        let random = getRandomValue(0, facesValues.length - 1);
        setValue(facesValues[random]);
    }

    function handleFaceChangeValue(index) {
        return (newValue) => {
            let updatedFaces = [...facesValues];
            updatedFaces[index] = newValue;
            updateFacesValues(updatedFaces);
        }
    }

    function handleAddFace() {
        updateFacesValues(prev => [...prev, prev.length + 1]);
    }

    function handleRemoveFace() {
        if (facesValues.length > 1) {
            updateFacesValues(old => [...old.filter(value => [...old].pop() !== value)]);
        }
    }

    return (
        <div className="Dice">
            <input value={diceName} onChange={(e) => setDiceName(e.target.value)}/>
            <button onClick={handleAddFace}>+ Agregar cara</button>
            <button onClick={handleRemoveFace}>- Remover cara</button>

            <h1>
                {value}
            </h1>
            Lados:
            {facesValues
                .map((value, index) =>
                    <DiceFace key={index}
                              onChangeValue={handleFaceChangeValue(index)}
                              value={value}/>)}

            <button onClick={handleThrow}>Tirar</button>
        </div>
    );
}
