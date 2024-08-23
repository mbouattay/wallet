import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Edit, Forbidden2 } from 'iconsax-react';
import { Grid } from '@mui/material';
const ITEM_HEIGHT = 48;
type typeProps={
  openM : ()=> void ; 
  openmenu :any ; 
  openMenu:(event: React.MouseEvent<HTMLElement>)=>void;
  closeMenu:()=>void ;
  anchorEl:any;
  openS:()=>void ;
}
const Menus = (props:typeProps) => {
 
  
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={props.openmenu ? 'long-menu' : undefined}
        aria-expanded={props.openmenu ? 'true' : undefined}
        aria-haspopup="true"
        onClick={props.openMenu}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={props.anchorEl}
        open={props.openmenu}
        onClose={props.closeMenu}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={props.openS}>

          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <label style={{ marginRight: "10px" }}>Supprimer</label>
            <Forbidden2 size="22" color="#7E7E7E" variant="Outline" />
          </Grid>


        </MenuItem>
        <MenuItem onClick={props.openM}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <label style={{ marginRight: "15px" }}>Modifier</label>
            <Edit size="22" color="#7E7E7E" variant="Outline" />
          </Grid>

        </MenuItem>
      </Menu>
    </div>
  );
}

export default Menus;
