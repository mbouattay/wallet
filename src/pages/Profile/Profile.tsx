import { Grid, TextField } from "@mui/material";
import { ProfileCircle } from "iconsax-react";
import './Profile.css';

const Profile = () => {
    return (
        <div className="profile">
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{marginTop:"30px"}}
            >
                <ProfileCircle size="80" color="#7E7E7E" />
                <div className="form">
                <TextField id="outlined-basic" value={'bouattay'}placeholder="Nom " variant="outlined" sx={{ width: 460, marginTop: 3 }} disabled />
                <TextField id="outlined-basic"  value={'mahmoud'}placeholder="Prenom " variant="outlined" sx={{ width: 460, marginTop: 3 } } disabled/>
                <TextField id="outlined-basic" value={'18/04/2000'} placeholder="date de naissance" variant="outlined" sx={{ width: 460, marginTop: 3 }}disabled />
                </div>
            </Grid>

        </div>
    );
}

export default Profile;
