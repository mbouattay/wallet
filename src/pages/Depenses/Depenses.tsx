import {
    FormControl, Grid, InputAdornment, InputLabel, OutlinedInput,
    Paper, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow
} from "@mui/material";
import { AddCircle, SearchNormal } from "iconsax-react";
import "./Depenses.css";
import Menus from "../../components/Menu/Menus";
import Model from "../../components/Model/Model";
import React, { useEffect, useState } from "react";
import SupprimerModel from "../../components/SupprimerModel/SupprimerModel";
import axios from 'axios';
import { toast } from "react-toastify";

interface Depense {
    id: number;
    depensesCategorie: { nom: string };
    date: string;
    solde: number;
    commentaire: string;
}

const Depenses = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [openS, setOpenS] = useState<boolean>(false);
    const [modifier, setModifier] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const [depenses, setDepenses] = useState<Depense[]>([]);
    const [idDepenses, setIdDepenses] = useState<number>(0);


    const getFormattedDate = (): string => {
        const currentDate = new Date();
    
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const year = currentDate.getFullYear();
    
        return `${day}/${month}/${year}`;
    };
    
    const formattedDate :string = getFormattedDate();
   
    const handleClick = (event: React.MouseEvent<HTMLElement>, depensesId: number) => {
        setAnchorEl(event.currentTarget);
        setIdDepenses(depensesId);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleOpen = () => {
        setModifier(false);
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

    useEffect(() => {
        axios.get('http://127.0.0.1:6969/Depenses/getAllDepenses')
            .then((res) => {
                setDepenses(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [open,openS]);
    const supprimeDepense=()=>{
        axios.delete('http://127.0.0.1:6969/Depenses/deleteDepenses?id='+idDepenses).then((res:any)=>{
            if (res?.status === 200) {
                toast.success("Votre dépense a ete supprimer", { autoClose: 1000 });
              }
        })   
        setOpenS(false)
    }
    return (
        <div className="Depenses">
            <Model Open={open} close={handleClose} Titre={modifier ? "Modifier Depenses" : "Ajouter Depenses"} update={modifier} idp={idDepenses} />
            <SupprimerModel Open={openS} close={handleCloseS} btnFn={supprimeDepense} />
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={1250}
                height={70}
                className="header_container"
            >
                <h1>Depenses Liste</h1>
                <button className="btn_add_Depenses" onClick={handleOpen}>
                    <AddCircle size="22" color="#7E7E7E" variant="Bold" />
                    <label> Ajouter</label>
                </button>
            </Grid>
            <div className="table_Container">
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
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
                    <input type="date" className="date"  defaultValue={formattedDate}/>
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
                            {depenses.map((e) => (
                                <TableRow key={e.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {e.id}
                                    </TableCell>
                                    <TableCell align="center">{e.depensesCategorie.nom}</TableCell>
                                    <TableCell align="center">{e.date}</TableCell>
                                    <TableCell align="center">{e.solde}</TableCell>
                                    <TableCell align="center">{e.commentaire}</TableCell>
                                    <TableCell align="center">
                                        <Menus 
                                            openM={handleModifier} 
                                            openmenu={openMenu} 
                                            openMenu={(event) => handleClick(event, e.id)} 
                                            closeMenu={handleCloseMenu} 
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
}

export default Depenses;
