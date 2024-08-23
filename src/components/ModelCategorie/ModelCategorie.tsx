import { Box, Grid, Modal, TextField } from "@mui/material";
import axios from "axios";
import { CloseCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
};
interface FormDataupdate {
  id: number;
  nom: string;

}
type PropsType = {
  Open: boolean;
  close: () => void;
  Titre: String;
  inddex: number;
  idc: number;
  md: boolean;
  data:any;
}
interface FormData {
  nom: string;

}

const ModelCategorie = (props: PropsType) => {
  const [nom, setnomCategorie] = useState<string>("");
  const [id, setIdCategorie] = useState<number>(0);

  const data: FormData = {
    nom
  };
  const dataupdate: FormDataupdate = {
    id,
    nom

  }

  useEffect(() => {
    setIdCategorie(props.idc)
    console.log(props.md)    

  }, [nom]);
   
  
  const addCategorie = async () => {
    try {
      if (props.inddex == 1) {
        const res = await axios.post('http://127.0.0.1:6969/DepensesCategorie/addDepensesCategorie', data);
        if (res?.status === 200) {
          toast.success("Votre categorie ajoute avec success", { autoClose: 1000 });
        }
      } else {
        const res = await axios.post('http://127.0.0.1:6969/RevenusCategorie/addRevenusCategorie', data);
        if (res?.status === 200) {
          toast.success("Votre categorie ajoute avec success", { autoClose: 1000 });
        }
      }

      props.close()
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la categorie");
    }
  };

  const updateCategorie = async () => {
    if (props.inddex == 1) {
      const res = await axios.put('http://127.0.0.1:6969/DepensesCategorie/updateDepensesCategorie', dataupdate);
      if (res?.status === 200) {
        toast.success("Votre categorie modifier avec success", { autoClose: 1000 });
      }

    } else {
      const res = await axios.put('http://127.0.0.1:6969/RevenusCategorie/updateRevenusCategorie', dataupdate);
      if (res?.status === 200) {
        toast.success("Votre categorie modifier  avec success", { autoClose: 1000 });
      }
    }
    props.close()
  }
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
            justifyContent="space-between"
            alignItems="center"
            className='headerModel'
          >
            <h1> {props.Titre} </h1>
            <CloseCircle size="20" color="#7E7E7E" variant="Bold" style={{ cursor: "pointer" }} onClick={props.close} />
          </Grid>

          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <TextField onChange={(e) => setnomCategorie(e.target.value)} id="outlined-basic" label="Categorie " variant="outlined" sx={{ width: 460, marginTop: 3 }} defaultValue={props.md?props.data?.nom:""} />
            <div className='btn-group'>
              <button className='btn-A' onClick={props.close}> Annuler</button>
              <button className='btn-E' onClick={props.md ? updateCategorie : addCategorie}>Envoyer</button>
            </div>

          </Grid>


        </Box>
      </Modal>

    </div>
  );
}

export default ModelCategorie;
