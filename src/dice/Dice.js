import {useEffect, useState} from "react";
import {getItem} from "../utils/repository";
import {useQueryParams} from "../App";
import {Button, Card, Col, Collapse, Row} from "react-bootstrap";
import {BsPencil} from "react-icons/bs";
import {MdDone} from "react-icons/all";
import DiceFaces from "./DiceFaces";
import {Conditional} from "./Conditional";
import {DiceHeader} from "./DiceHeader";

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
                            <div>
                                <DiceFaces facesValues={facesValues} handleAddFace={handleAddFace}
                                           handleRemoveFace={handleRemoveFace}
                                           handleFaceChangeValue={handleFaceChangeValue}/>
                            </div>
                        </Collapse>
                        <Card.Footer>
                            <Row>
                                <Col xs={5} className="mt-2">
                                    <Button variant={open ? "success" : "dark"} onClick={() => setOpen(!open)}>
                                        <Conditional condition={open}
                                                     ifFalse={<><BsPencil/> Editar</>}
                                                     ifTrue={<><MdDone/> Listo</>}
                                        />
                                    </Button>
                                </Col>
                                <Col xs={7} className="mt-2">
                                    <Button className="w-100" variant="primary" aria-label="Tirar dado"
                                            onClick={handleThrow}>Tirar</Button>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Row>
                </section>
            </Card>
        </Col>
    );
}

export const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
