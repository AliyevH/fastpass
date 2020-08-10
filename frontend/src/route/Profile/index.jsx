import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import './style.css'

function Index() {
    const [openPass, setOpenPass] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const handleOpenPass = () => {
        setOpenPass(true);
    };
    const handleClosePass = () => {
        setOpenPass(false);
    };
    const handleOpenEdit = () => {
        setOpenEdit(true);
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };
    return (
        <Paper elevation={2} className="profile_page">
            <h2 className="title">User profile</h2>
            <div className="row_info">
                <p>Full name</p>
                <p>Kamil Vahabov</p>
            </div>
            <div className="row_info">
                <p>Email</p>
                <p>example@example.com</p>
            </div>
            <div className="buttons">
                <Button variant="contained" onClick={handleOpenEdit}>Edit</Button>
                <Button variant="contained" onClick={handleOpenPass}>Change password</Button>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openEdit}
                className="modal"
                onClose={handleCloseEdit}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openEdit}>
                    <div className='modal_inner'>
                        <h2 className="title_modal">Edit profile</h2>
                        <TextField className="input" id="standard-basic0" label="Name" name="name" value="Kamil"/>
                        <TextField className="input" id="standard-basic1" label="Surname" name="surname" value="Vahabov"/>
                        <TextField className="input" id="standard-basic2" label="E-mail" name="email" value="example@example.com"/>
                        <div className="footer_modal">
                            <Button variant="contained">Save</Button>
                            <Button variant="contained" onClick={handleCloseEdit}>Cancell</Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openPass}
                className="modal"
                onClose={handleClosePass}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openPass}>
                    <div className='modal_inner'>
                        <h2 className="title_modal">Change password</h2>
                        <TextField className="input" id="standard-basic3" label="Current password" />
                        <TextField className="input" id="standard-basic4" label="New password" />
                        <TextField className="input" id="standard-basic5" label="Verify new password" />
                        <div className="footer_modal">
                            <Button variant="contained">Save</Button>
                            <Button variant="contained" onClick={handleClosePass}>Cancell</Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </Paper>
    );
}

export default Index;
