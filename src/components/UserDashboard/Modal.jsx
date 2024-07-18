import { Button } from '@mui/material';
import {Typography} from '@mui/material';
import {Modal} from '@mui/material';
import { Box } from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {

    const{open, handleClose, deleteAccount} = props;


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete your account? 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You will automatically be logged out and will have to sign up again and fill out all the information.
          </Typography>
          
        <div style={{display:"flex", justifyContent: "space-between"}} className="buttons">
            <Button variant="contained" onClick={deleteAccount}>Yes</Button>
            <Button variant="contained" onClick={handleClose}>No</Button>
        </div>

        </Box>
      </Modal>
    </div>
  );
}
