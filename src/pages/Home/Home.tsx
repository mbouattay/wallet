import { Outlet } from "react-router-dom";
import SidBar from "../../components/SidBar/SidBar";
import './Home.css' ; 
const Home = () => {
    return (
        <div className="Home">
            <SidBar/>
            <Outlet />
        </div>
    );
}

export default Home;
