import { Grid, MenuItem, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CloseCircle } from 'iconsax-react';
import './Model.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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

type PropsType = {
  Open: boolean;
  close: () => void;
  Titre: string;
  update: boolean;
  idp: any;
};

interface FormData {
  solde: number;
  date: string;
  commentaire: string;
  user: {
    id: number;
  };
  depensesCategorie: {
    id: number;
  };
}

interface FormDataUpdate {
  id: number;
  solde: number;
  date: string;
  commentaire: string;
  user: {
    id: number;
  };
  depensesCategorie: {
    id: number;
  };
}
interface DepenseCategorie {
  id: number;
  nom:string;
}
const Model = (props: PropsType) => {
  const [solde, setSolde] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [commentaire, setCommentaire] = useState<string>('');
  const [idcategorie, setidcategorie] = useState<number>(0);
  const [id, setid] = useState<any>(props.idp);
  const [depensesCategorie, setdepensesCategorie] = useState<DepenseCategorie[]>([]);
  useEffect(() => {
    setid(props.idp);
  }, [props.idp]);
  useEffect( () => {
      axios.get('http://127.0.0.1:6969/DepensesCategorie/findAllgetDepensesCategorie').then((res:any)=>{
          setdepensesCategorie(res.data)
      })
  }, []);
  const data: FormData = {
    solde,
    date,
    commentaire,
    user: {
      id: 1,
    },
    depensesCategorie: {
      id: idcategorie,
    },
  };

  const addDepenses = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:6969/Depenses/addDepenses', data);
      if (res?.status === 200) {
        toast.success("Votre dépense a été bien ajoutée", { autoClose: 1000 });
      }
      props.close();
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la dépense");
    }
  };

  const updateDepenses = async () => {
    const dataupdate: FormDataUpdate = {
      id,
      solde,
      date,
      commentaire,
      user: {
        id: 1,
      },
      depensesCategorie: {
        id: idcategorie,
      },
    };
    console.log(dataupdate)
    try {
      const res = await axios.put('http://127.0.0.1:6969/Depenses/update', dataupdate);
      if (res?.status === 200) {
        toast.success("Votre dépense a bien été modifiée", { autoClose: 1000 });
      }
      props.close();
    } catch (error) {
      toast.error("Erreur lors de la modification de la dépense");
    }
  };

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
            className="headerModel"
          >
            <h1>{props.Titre}</h1>
            <CloseCircle size="20" color="#7E7E7E" variant="Bold" style={{ cursor: 'pointer' }} onClick={props.close} />
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid container direction="row" justifyContent="space-around" alignItems="center">
              <TextField id="outlined-basic" label="Solde" variant="outlined" onChange={(e: any) => setSolde(parseFloat(e.target.value))} />

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={53}
                sx={{ width: 200 }}
                onChange={(e: any) => setidcategorie(e.target.value)}
              >
                {depensesCategorie.map((e)=>(<MenuItem value={e.id}>{e.nom}</MenuItem>))}
              </Select>
            </Grid>
            <TextField
              id="outlined-basic"
              label="Commentaire "
              variant="outlined"
              sx={{ width: 460, marginTop: 3 }}
              onChange={(e: any) => setCommentaire(e.target.value)}
            />
            <input
              type="date"
              style={{
                width: '455px',
                marginTop: '10px',
                height: '50px',
                borderRadius: '5px',
                border: ' solid 1px #7E7E7E ',
              }}
              onChange={(e: any) => setDate(e.target.value)}
            />
            <div className="btn-group">
              <button className="btn-A" onClick={props.close}>
                Annuler
              </button>
              <button className="btn-E" onClick={props.update ? updateDepenses : addDepenses}>
                Envoyer
              </button>
            </div>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default Model;
