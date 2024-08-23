import { Backward5Seconds, DollarCircle, Shop } from "iconsax-react";
import './Dashboard.css';
import Box from "../../components/Box/Box";
import RevenusStat from "../../components/revenus_stat/revenus_stat";
import { useEffect, useState } from "react";
import axios from "axios";
const Dashboard = () => {
    const [totalDepenses, settotalDepenses] = useState<number>(0);
    const [totalRevenus, setTotalRevenus] = useState<number>(0);
    useEffect(() => {
        
        axios.get('http://127.0.0.1:6969/Depenses/total/1').then((res:any)=>{
            if (res?.status === 200) {

                settotalDepenses(res.data)
              }
        })
        axios.get('http://127.0.0.1:6969/Revenus/total/1').then((res:any)=>{
            if (res?.status === 200) {

                setTotalRevenus(res.data)
              }
        })

        
    
    }, []);
    return (
        <div className="Dashboard">
            <h1 className="title1">Dashboard</h1>
            <div className="box_container">
              
                <Box titre={"Total Revenus"} solde={totalRevenus}>  <DollarCircle size="32" color="#ADFF2F" /> </Box>
                <Box titre={"Total Dépenses"} solde={totalDepenses}> <Shop size="32" color="#F08080" /> </Box>
                <Box titre={"Total Solde"} solde={totalRevenus-totalDepenses}> <Backward5Seconds size="32" color="#90EE90" /></Box>
            </div>
            <RevenusStat titre={'Depenses'}/>
            <RevenusStat titre={'Revenus'}/>
        </div>
    );
}

export default Dashboard;
