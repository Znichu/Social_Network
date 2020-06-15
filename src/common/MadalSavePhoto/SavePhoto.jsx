import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";


const SavePhoto = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };
    const onSavePhoto = (e) => {
        props.savePhoto(e.target.files[0]);
        setShow(false);
    };

    return (
        <>
                <Button size="sm" variant="primary" onClick={handleShow}>
                    Изменить фото
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Загрузка новой фотографии</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input onChange={onSavePhoto} type="file"/>
                    </Modal.Body>
                </Modal>
            </>
    )
};

export default SavePhoto;