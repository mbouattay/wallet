import { Grid } from "@mui/material";
import { Activity, Bank, Category, Logout, ShoppingCart, User } from "iconsax-react";
import './SidBar.css'
import { Link } from "react-router-dom";

const SidBar = () => {
    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            width={250}
            height={728}
            className="SidBarContainer"
        >
            <h1> My wallet</h1>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Link  to={"/"} className="item_container">
                    <Activity size="32" color="#7E7E7E" />
                    <label > Dashbord</label>
                </Link>
                <Link to={"/depenses"} className="item_container">
                    <ShoppingCart size="32" color="#7E7E7E" />
                    <label> Depenses</label>
                </Link >
                <Link to={"/revenus"} className="item_container">
                    <Bank size="32" color="#7E7E7E" />
                    <label>Revenus</label>
                </Link>
                <Link to={"/categorie"} className="item_container">
                    <Category size="32" color="#7E7E7E" />
                    <label> Categorie</label>
                </Link>
                <Link to={"/profile"} className="item_container">
                    <User size="32" color="#7E7E7E" variant="Bold" />
                    <label >Profile</label>
                </Link>
            </Grid>

            <button className="btn_logout">
            <Logout size="32" color="#7E7E7E" variant="Bold"/>
            <label>Logout</label>
            </button>

        </Grid>
    );
}

export default SidBar;
