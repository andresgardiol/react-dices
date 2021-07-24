import {useEffect, useState} from "react";
import {Col, FormControl, InputGroup, Row} from "react-bootstrap";
import {
    GiDiceSixFacesOne,
    GiInvertedDice1,
    GiInvertedDice2,
    GiInvertedDice3,
    GiInvertedDice4,
    GiInvertedDice5, GiInvertedDice6
} from "react-icons/all";
import {getRandomValue} from "./Dice";

export function DiceHeader({id}) {
    let [diceName, setDiceName] = useState("Nombre");
    const diceIcons = [
        <GiInvertedDice1/>,
        <GiInvertedDice2/>,
        <GiInvertedDice3/>,
        <GiInvertedDice4/>,
        <GiInvertedDice5/>,
        <GiInvertedDice6/>
    ]
    let diceIcon = diceIcons[getRandomValue(0,5)];

    useEffect(() => {
        diceIcon = diceIcons[getRandomValue(0,5)];
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
                    <InputGroup>
                    <InputGroup.Text id="dice-name">{diceIcon}</InputGroup.Text>
                        <FormControl value={diceName} onChange={(e) => setDiceName(e.target.value)} aria-describedby="dice-name"/>
                    </InputGroup>
                </Col>
            </Row>
        </header>
    );
}
