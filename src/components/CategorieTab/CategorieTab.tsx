import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import "./CategorieTab.css";
import { AddCircle } from "iconsax-react";
import React, { useEffect, useState } from "react";
import Menus from "../Menu/Menus";
import SupprimerModel from "../SupprimerModel/SupprimerModel";
import ModelCategorie from "../ModelCategorie/ModelCategorie";
import axios from "axios";
import { toast } from "react-toastify";
interface propsType{
    indexcategorie:number;
}
interface categorie {
    id: number,
    nom: string
}
interface FormDataupdate {
    id: number;
    nom: string;
  
  }

const CategorieTab = (props:propsType) => {
    const [open, setOpen] = useState<boolean>(false);
    const [openS, setOpenS] = useState<boolean>(false);
    const [modifier, setmodifier] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const [depenses, setDepenses] = useState<categorie[]>([]);
    const [Revenus, setRevenus] = useState<categorie[]>([]);
    const [id, setidCategorie] = useState<number>(0);
    const [dataCategorie, setdataCategorie] = useState<FormDataupdate[]>([]);
    const handleClick = (event: React.MouseEvent<HTMLElement>, categorieId: number) => {
        setAnchorEl(event.currentTarget);
        setidCategorie(categorieId);
        handelCategorieData(categorieId)
        console.log(dataCategorie)
    };
   
    const handleClosemenu = () => {
        setAnchorEl(null);


    };
    const handleOpen = () => {
        setOpen(true);
    }
    const handleOpenS = () => {
        setOpenS(true);
        setAnchorEl(null); 
    }
    const handleCloseS = () => {
        setOpenS(false);


    }
    const handleClose = () => {
        setOpen(false);
        setmodifier(false);
    }
    const hadleModifier = () => {
        setmodifier(true);
        setOpen(true);
        setAnchorEl(null); 
        
    }
    const handelCategorieData=async(id:number)=>{
        if (props.indexcategorie == 1) {
          const res = await axios.get('http://127.0.0.1:6969/DepensesCategorie/getDepensesCategorie?id='+id);
          if (res?.status === 200) {
            setdataCategorie(res.data) ;
          }
    
        } else {
          const res = await axios.get('http://127.0.0.1:6969/RevenusCategorie/findById?id='+id);
          if (res?.status === 200) {
            setdataCategorie(res.data) ;
          }
        }
      }
      console.log(dataCategorie)
    const supprimeCategorie=()=>{
        try {
            if(props.indexcategorie==0){

                axios.delete('http://127.0.0.1:6969/RevenusCategorie/deleteRevenusCategorie?id='+id).then((res)=>{
                    if (res?.status === 200) {
                        toast.success("Votre categorie a ete supprimer avec success", { autoClose: 1000 });
                      }
                      handleCloseS();
                })
            }else{
                axios.delete('http://127.0.0.1:6969/DepensesCategorie/deleteDepensesCategorie?Id='+id).then((res)=>{
                    if (res?.status === 200) {
                        toast.success("Votre categorie a ete supprimer avec success", { autoClose: 1000 });
                      }
                      handleCloseS();
                })
            }
            
            
      
          } catch (error) {
            toast.error("Erreur");
          } 
    }
    useEffect(() => {
        axios.get('http://127.0.0.1:6969/RevenusCategorie/findAllRevenusCategorie')
        .then((res) => {
            setDepenses(res.data)
        })
        .catch((err) => {
            console.error(err);
        });
        axios.get('http://127.0.0.1:6969/DepensesCategorie/findAllgetDepensesCategorie')
        .then((res) => {
            setRevenus(res.data)
        })
        .catch((err) => {
            console.error(err);
        });
    }, [open,openS]);
  
    return (
        <div className="CategorieTab">
            <SupprimerModel Open={openS} close={handleCloseS} btnFn={supprimeCategorie} />
            <ModelCategorie Open={open} close={handleClose} Titre={modifier ? "Modifier Categorie " : "Ajoute Categorie"} inddex={props.indexcategorie} idc={id} md={modifier} data={dataCategorie}/>
            <div className="header-tab">
                <button className="add-categorie-btn" onClick={handleOpen}>  <AddCircle size="22" color="#7E7E7E" variant="Bold" />
                    <label> Ajouter</label></button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center"></TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                    { props.indexcategorie==0?depenses.map((e,key)=>(
                         <TableRow
                            key={key}
                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                         
                         <TableCell component="th" scope="row">
                             {e.id}
                         </TableCell>
                         <TableCell align="center">{e.nom}</TableCell>
                         <TableCell align="center"><Menus openM={hadleModifier} openmenu={openMenu} openMenu={(event)=>handleClick(event,e.id)} closeMenu={handleClosemenu} anchorEl={anchorEl} openS={handleOpenS} /></TableCell>
                     </TableRow>
                    )):Revenus.map((e,key)=>(
                        <TableRow
                            key={key}
                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                         
                         <TableCell component="th" scope="row">
                             {e.id}
                         </TableCell>
                         <TableCell align="center">{e.nom}</TableCell>
                         <TableCell align="center" ><Menus openM={hadleModifier} openmenu={openMenu} openMenu={(event)=>handleClick(event,e.id)} closeMenu={handleClosemenu} anchorEl={anchorEl} openS={()=>handleOpenS} /></TableCell>
                     </TableRow>
                    ))}    
                       


                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default CategorieTab;
