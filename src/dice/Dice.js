import {useEffect, useState} from "react";
import {DiceFace} from "./DiceFace";
import {getItem} from "../utils/repository";
import {setQueryParam, useQueryParams} from "../App";
import {Badge, Button, ButtonGroup, Card, Col, Collapse, FormControl, Row} from "react-bootstrap";

// TODO: Poder cargar un dado desde la url
// ?dices=1&dice_1=Besar,1,2,3,4,5,6&dice_1_header=Accion

export function Dice({id, throws}) {
    let [value, setValue] = useState(null);
    let [open, setOpen] = useState(false);
    let [facesValues, updateFacesValues] = useState(getItem(`dice_${id}`, [1, 2, 3, 4, 5, 6]));
    let queryParams = useQueryParams();

    useEffect(() => {
        handleThrow();
    }, [throws]);

    useEffect(() => {
        let key = `dice_${id}`;
        let item = queryParams[key] ? queryParams[key] : getItem(key, [1, 2, 3, 4, 5, 6]);
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
        <Col xs={12} sm={6} md={4}>
            <Card className="p-2 p-md-3 my-1" bg="dark" text="light">
                <section className="Dice">
                    <Row>
                        <Col xs={12}>
                            <Card.Header>
                                <DiceHeader id={id} onClickAddFace={handleAddFace}
                                            onClickRemoveFace={handleRemoveFace}/>
                            </Card.Header>
                        </Col>
                        <Col xs={12}>
                            <Card.Title><h1><strong>{value}</strong></h1></Card.Title>
                        </Col>
                        <Collapse in={open}>
                            <Col xs={12}>
                                {facesValues
                                    .map((value, index) =>
                                        <DiceFace key={index}
                                                  onChangeValue={handleFaceChangeValue(index)}
                                                  value={value}/>)}
                            </Col>
                        </Collapse>

                        <Col xs={6} className="mt-2">
                            <Button variant="light" onClick={() => setOpen(!open)}>Editar</Button>
                        </Col>
                        <Col xs={6} className="mt-2">
                            <Button variant="primary" aria-label="Tirar dado" onClick={handleThrow}>Tirar</Button>
                        </Col>
                    </Row>
                </section>
            </Card>
        </Col>
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
        <header>
            <Row>
                <Col xs={12} className="mb-2">
                    <FormControl value={diceName} onChange={(e) => setDiceName(e.target.value)}/>
                </Col>

                <Col xs={12}>
                    <ButtonGroup>
                        <Button variant="secondary" onClick={onClickAddFace}>+ Lado</Button>
                        <Button variant="secondary" onClick={onClickRemoveFace}>- Lado</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </header>
    );
}
