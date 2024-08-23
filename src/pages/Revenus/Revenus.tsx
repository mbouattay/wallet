import { AddCircle, SearchNormal } from "iconsax-react";
import "./Revenus.css";
import { FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Menus from "../../components/Menu/Menus";
import { useEffect, useState } from "react";
import SupprimerModel from "../../components/SupprimerModel/SupprimerModel";
import RevenusModel from "../../components/RevenusModel/RevenusModel";
import axios from "axios";
import { toast } from "react-toastify";

interface Revenus {
    id: number;
    revenusCategorie: { nom: string };
    date: string;
    solde: number;
    commentaire: string;
}

const Revenus = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [openS, setOpenS] = useState<boolean>(false);
    const [modifier, setModifier] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [revenus, setRevenus] = useState<Revenus[]>([]);
    const [id, setIdRevenus] = useState<number>(0);

    const openMenu = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>, revenueId: number) => {
        setAnchorEl(event.currentTarget);
        setIdRevenus(revenueId);
    };

    const handleClosemenu = () => {
        setAnchorEl(null);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleOpenS = () => {
        setOpenS(true);
        setAnchorEl(null);
    };

    const handleCloseS = () => {
        setOpenS(false);
    };

    const handleClose = () => {
        setOpen(false);
        setModifier(false);
    };

    const handleModifier = () => {
        setModifier(true);
        setOpen(true);
        setAnchorEl(null);
    };

    const supprimerRevenus = async () => {
        axios.delete('http://127.0.0.1:6969/Revenus?id='+id).then((res:any)=>{
            if (res?.status === 200) {
                toast.success("Votre dépense a ete supprimer", { autoClose: 1000 });
              }
        })   
        setOpenS(false)
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:6969/Revenus/findAllRevenus')
            .then((res) => {
                setRevenus(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [open,openS]);

    return (
        <div className="Revenus">
            <RevenusModel Open={open} close={handleClose} Titre={modifier ? "Modifier Revenus" : "Ajoute Revenus"} idRevenus={id} update={modifier} />
            <SupprimerModel Open={openS} close={handleCloseS} btnFn={supprimerRevenus} />
            <div className="header-Revenus-page">
                <h1>Revenus Liste</h1>
                <button className="btn-add-revenus" onClick={handleOpen}>
                    <AddCircle size="22" color="#7E7E7E" variant="Bold" />
                    <label>Ajouter</label>
                </button>
            </div>
            <div className="table1_Container">
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <FormControl sx={{ m: 3, width: '50ch' }} variant="outlined">
                        <InputLabel>Recherche</InputLabel>
                        <OutlinedInput
                            type={'text'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <SearchNormal size="25" color="#7E7E7E" variant="Outline" />
                                </InputAdornment>
                            }
                            label="Recherche"
                        />
                    </FormControl>
                    <input type="date" className="date" />
                </Grid>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="center">Categorie</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Prix</TableCell>
                                <TableCell align="center">Note</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {revenus.map((e) => (
                                <TableRow key={e.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">#{e.id}</TableCell>
                                    <TableCell align="center">{e.revenusCategorie.nom}</TableCell>
                                    <TableCell align="center">{e.date}</TableCell>
                                    <TableCell align="center">{e.solde}</TableCell>
                                    <TableCell align="center">{e.commentaire}</TableCell>
                                    <TableCell align="center">
                                        <Menus
                                            openM={handleModifier}
                                            openmenu={openMenu}
                                            openMenu={(event) => handleClick(event, e.id)}
                                            closeMenu={handleClosemenu}
                                            anchorEl={anchorEl}
                                            openS={handleOpenS}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default Revenus;
