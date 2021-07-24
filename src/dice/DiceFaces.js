import {Button, ButtonGroup, Col} from "react-bootstrap";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/all";
import {DiceFace} from "./DiceFace";

function DiceFaces({facesValues, handleAddFace, handleRemoveFace, handleFaceChangeValue}) {
    return (
        <>
            <Col xs={12}>
                <ButtonGroup className="my-1">
                    <Button variant="secondary"
                            onClick={handleAddFace}><AiOutlinePlus/></Button>
                    <Button variant="secondary"
                            onClick={handleRemoveFace}><AiOutlineMinus/></Button>
                </ButtonGroup>
            </Col>
            <Col xs={12}>
                {facesValues
                    .map((value, index) =>
                        <DiceFace key={index}
                                  onChangeValue={handleFaceChangeValue(index)}
                                  value={value}/>)}
            </Col>
        </>
    )
}

export default DiceFaces;
