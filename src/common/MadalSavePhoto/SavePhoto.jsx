import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";


const SavePhoto = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = (e) => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };
    const onSavePhoto = (e) => {
        console.log(e.target.files[0]);
        props.savePhoto(e.target.files[0]);
    };

    return (
        <>
                <Button size="sm" variant="primary" onClick={handleShow}>
                    Изменить фото
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input onChange={onSavePhoto} type="file"/>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>
    )
};
export default SavePhoto;