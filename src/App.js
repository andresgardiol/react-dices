import './App.css';
import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import {Col, Row} from "react-bootstrap";


function ButtonWrapper(props) {
    return (
        <Button variant={props.variant} onClick={props.onClickEvent}>
            {props.children}
        </Button>
    )
}

function CounterDisplay(props) {
    return (
        <div>
            {props.counter}
        </div>
    )
}

function Counter() {
    const [counter, setCounter] = useState(0);
    const handleAddEvent = () => {
        setCounter(counter + 1);
    }
    const handleResetEvent = () => {
        setCounter(0);
    }
    return (
        <Row className="justify-content-md-center">
            <Col xs="auto">
                <Row>
                    <Col xs="auto">Times clicked</Col>
                    <Col xs="auto"><CounterDisplay counter={counter}/></Col>
                </Row>
                <Row>
                    <Col xs={8}><ButtonWrapper variant="primary" onClickEvent={handleAddEvent}>Click me</ButtonWrapper></Col>
                    <Col xs={4}><ButtonWrapper variant="warning"
                                               onClickEvent={handleResetEvent}>Reset</ButtonWrapper></Col>
                </Row>
            </Col>
        </Row>
    )
}

function App() {
    return (
        <Counter></Counter>
    );
}

export default App;
