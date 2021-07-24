import {useEffect, useState} from "react";
import {Outline} from "../utils/Outline";
import {Dice} from "./Dice";
import {getItem} from "../utils/repository";
import {setQueryParam, useQueryParams} from "../App";
import {Badge, Button, ButtonGroup, Col, Row} from "react-bootstrap";
import {AiOutlineAppstoreAdd} from "react-icons/all";

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
                <Row className="my-3">
                    <Col xs={12}><h1 className="text-white">Elige cuántos dados tirar</h1></Col>
                    <Col xs={12}>
                        <ButtonGroup className="mx-1">
                            <Button variant="secondary" aria-label="Agregar dado" onClick={handleAdd}>+ Agregar</Button>
                            <Button variant="secondary" aria-label="Remover dado" onClick={handleRemove}>-
                                Remover</Button>
                        </ButtonGroup>
                        <Button className="my-2" variant="primary" aria-label="Tirar todos los dados" onClick={handleThrowAll}>
                            Tirar todos <Badge bg="info">{dices.length}</Badge>
                        </Button>
                    </Col>
                </Row>
            </header>
            <main>
                <Row>
                    {dices.map((value) => {
                        return (
                            <Dice id={value.toString()} key={value.toString()} throws={throwTrigger}/>
                        )
                    })}
                </Row>
            </main>
        </>
    );
}
