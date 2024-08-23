import { Box, Grid, MenuItem, Modal, Select, TextField } from "@mui/material";
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
type PropsType = {
    Open: boolean;
    close: () => void;
    Titre: String;
    idRevenus:number;
    update:boolean;
}
interface revenusCategorie {
  id: number;
  nom:string;
}
interface FormData {
  solde: number;
  date: string;
  commentaire: string;
  user: {
    id: number;
  };
  revenusCategorie: {

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
  revenusCategorie:{
    id: number;
  };
}

const RevenusModel = (props: PropsType) => {
  const [revenusCategorie, setrevenusCategorie] = useState<revenusCategorie[]>([]);
  const [solde, setSolde] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [commentaire, setCommentaire] = useState<string>('');
  const [idRevenusCategorie, setidRevenusCategorie] = useState<number>(0);
  const [id, setidRevenus] = useState<number>(0);
  useEffect( () => {
    axios.get('http://127.0.0.1:6969/RevenusCategorie/findAllRevenusCategorie').then((res:any)=>{
      setrevenusCategorie(res.data)
    })
}, []);
useEffect(()=>{
  setidRevenus(props.idRevenus) ;
})
const addRevenus = async () => {
  try {
    const data: FormData = {
      solde,
      date,
      commentaire,
      user: {
        id: 1,
      },
      revenusCategorie: {
        id: idRevenusCategorie,
      },
    };
    console.log(data)
    const res = await axios.post('http://127.0.0.1:6969/Revenus/', data);
    if (res?.status === 200) {
      toast.success("Votre revenus a été bien ajoutée", { autoClose: 1000 });
    }
    props.close();
  } catch (error) {
    toast.error("Erreur lors de l'ajout de la Revenus");
  }
  
  
};
const updateRevenus = async () => {
  const dataupdate: FormDataUpdate = {
    id,
    solde,
    date,
    commentaire,
    user: {
      id: 1,
    },
    revenusCategorie: {
      id: idRevenusCategorie,
    },
  };
  console.log(dataupdate)
  try {
    const res = await axios.put('http://127.0.0.1:6969/Revenus/', dataupdate);
    if (res?.status === 200) {
      toast.success("Votre revenus a bien été modifiée", { autoClose: 1000 });
    }
    props.close();
  } catch (error) {
    toast.error("Erreur lors de la modification de la revenus");
  }
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

            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >

              <TextField id="outlined-basic" label="Solde" variant="outlined" onChange={(e:any)=>setSolde(e.target.value)} />
              
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={10}
                sx={{ width: 200 }}
                onChange={(e:any)=>setidRevenusCategorie(e.target.value)}
              >

                <MenuItem value={10} >Categorie</MenuItem>
                {revenusCategorie.map((e)=>(
                  <MenuItem value={e.id}>{e.nom}</MenuItem>
                ))}
              </Select>
            </Grid>
            <TextField onChange={(e)=>setCommentaire(e.target.value)} id="outlined-basic" label="Commentaire " variant="outlined" sx={{ width: 460, marginTop: 3 }} />
            <input type="date"
              style={{
                width: '455px', marginTop: "10px",
                height: "50px", borderRadius: "5px",
                border: " solid 1px #7E7E7E "
              }}
              onChange={(e)=>setDate(e.target.value)}
            />
            <div className='btn-group'>
                <button className='btn-A' onClick={props.close}> Annuler</button>
                <button className='btn-E'onClick={props.update?updateRevenus:addRevenus}>Envoyer</button>
            </div>

          </Grid>



                </Box>
            </Modal>
        </div>
    );
}

export default RevenusModel;
