import { Box, Grid, Modal,  } from "@mui/material";
import { CloseCircle, CloseSquare } from "iconsax-react";
import './SupprimerModel.css' ;
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  type PropsType = {
    Open: boolean;
    close: () => void;
    btnFn :()=>void;
   
  }
       /* confirmation de suppression
        Êtes-vous sûr de suppression*/
const SupprimerModel = (props: PropsType) => {

    return (
        <div>
            <Modal
        open={props.Open}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            className='headerModel'
          >
            <CloseCircle size="20" color="#7E7E7E" variant="Bold"  style={{cursor:"pointer"}} onClick={props.close}/>
          </Grid>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className='headerModel'
          >
             <CloseSquare size="80" color="#FF0000" variant="Bulk"/>
             <h1> Êtes-vous sûr de suppression</h1>
             <div className='btn-group1'>
                <button className='btn-A' onClick={props.close}> Annuler</button>
                <button className='btn-S' onClick={props.btnFn} >Supprimer</button>
            </div>
          </Grid>
         


        </Box>
      </Modal>
        </div>
    );
}

export default SupprimerModel;
