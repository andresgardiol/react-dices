import {useEffect, useState} from "react";
import {Outline} from "../utils/Outline";
import {Dice} from "./Dice";
import {getItem} from "../utils/repository";

export function DiceTable() {
    let [dices, setDiceNumber] = useState([1]);
    let [throwTrigger, throwAll] = useState(false);

    useEffect(() => {
        let item = getItem('dices', [1]);
        setDiceNumber(item);
    }, []);

    useEffect(() => {
        window.localStorage.setItem('dices', JSON.stringify(dices));
    }, [dices]);

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
                    <Dice id={value.toString()} key={value.toString()} throws={throwTrigger}/>
                )
            })}
        </div>
    );
}
