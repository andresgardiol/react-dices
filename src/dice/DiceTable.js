import {useEffect, useState} from "react";
import {Outline} from "../utils/Outline";
import {Dice} from "./Dice";
import {getItem} from "../utils/repository";
import {setQueryParam, useQueryParams} from "../App";

export function DiceTable() {
    let [dices, setDiceNumber] = useState([1]);
    let [throwTrigger, throwAll] = useState(false);
    let queryParams = useQueryParams();

    useEffect(() => {
        let item = queryParams['dices'] ? queryParams['dices'] : getItem('dices', [1]);
        setDiceNumber(item);
        setQueryParam('dices', JSON.stringify(dices));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('dices', JSON.stringify(dices));
        setQueryParam('dices', JSON.stringify(dices));
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
        <>
            <header>
                <h1>Elige cuántos dados tirar</h1>
                <button aria-label="Agregar dado" onClick={handleAdd}>+ Agregar</button>
                <button aria-label="Remover dado" onClick={handleRemove}>- Remover</button>
                <button aria-label="Tirar todos los dados" onClick={handleThrowAll}>Tirar todos</button>
                <h2>{`${dices.length} dado${dices.length > 1 ? 's' : ''} para tirar` }</h2>
            </header>
            <main>
                {dices.map((value) => {
                    return (
                        <Dice id={value.toString()} key={value.toString()} throws={throwTrigger}/>
                    )
                })}
            </main>
        </>
    );
}
