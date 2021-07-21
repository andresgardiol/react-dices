import {useEffect, useState} from "react";
import {DiceFace} from "./DiceFace";
import {getItem} from "../utils/repository";


export function Dice({id, throws}) {
    let [value, setValue] = useState(null);
    let [facesValues, updateFacesValues] = useState(getItem(`dice_${id}`,[1, 2, 3, 4, 5, 6]));

    useEffect(() => {
        handleThrow();
    }, [throws]);

    useEffect(() => {
        let item = getItem(`dice_${id}`,[1, 2, 3, 4, 5, 6]);
        updateFacesValues(item);
    }, []);

    useEffect(() => {
        window.localStorage.setItem(`dice_${id}`, JSON.stringify(facesValues));
    }, [facesValues]);


    const handleThrow = () => {
        function getRandomValue(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

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
        if (facesValues.length > 2) {
            updateFacesValues(old => [...old.filter(value => [...old].pop() !== value)]);
        }
    }

    return (
        <div className="Dice">
            <DiceHeader id={id} onClickAddFace={handleAddFace} onClickRemoveFace={handleRemoveFace}/>
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

function DiceHeader({id, onClickAddFace, onClickRemoveFace}) {
    let [diceName, setDiceName] = useState("Nombre");

    useEffect(() => {
        let item = window.localStorage.getItem(`dice_${id}_header`);
        if (!item) {
            item = 'Nombre';
        }
        setDiceName(item);
    }, []);

    useEffect(() => {
        window.localStorage.setItem(`dice_${id}_header`, diceName);
    }, [diceName]);


    return (
        <div>
            <input value={diceName} onChange={(e) => setDiceName(e.target.value)}/>
            <button onClick={onClickAddFace}>+ Agregar cara</button>
            <button onClick={onClickRemoveFace}>- Remover cara</button>
        </div>
    );
}
