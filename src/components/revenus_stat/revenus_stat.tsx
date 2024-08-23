import { MenuItem, Select } from "@mui/material";
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement, Tooltip, Legend, Title
);
import './revenus_stat.css' ;
import axios from "axios";
import { useEffect, useState } from "react";
type TypeProps={
    titre : string; 
}
const RevenusStat = (props:TypeProps) =>{
    const [DepensesData, setDepensesData] = useState<any>([]);
    const [DepensesPercentage, setDepensesPercentage] = useState<any>([]);
    const handelDepensesStat=async()=>{
        const res = await axios.get('http://127.0.0.1:6969/Depenses/current-week');
        setDepensesData(res.data)
    }
    const handelDepensesPercentage=async()=>{
        const res = await axios.get('http://127.0.0.1:6969/Depenses/percentage');
        setDepensesPercentage(res.data)
    }
    function storeKeysInArray<T extends object>(obj: T): (keyof T)[] {
        return Object.keys(obj) as (keyof T)[];
    }
    function storeValuesInArray<T extends object>(obj: T): T[keyof T][] {
        return Object.values(obj);
    }
    useEffect(() => {
        handelDepensesStat()
        handelDepensesPercentage()
       
    }, []);
    const keysArray = storeKeysInArray(DepensesPercentage);
    const valuesArray = storeValuesInArray(DepensesPercentage);
  
    
   
    let  label1 : string = props.titre ; 
    const data = {
        labels: ["lu", "ma", "me", "je", "ve", "sa", "di"],
        datasets: [{
            label:label1,
            data: DepensesData,
            backgroundColor: [
                'rgba(234, 189, 77, 0.66)',
              ],
        }]
    }
    const data1 = {
        labels: keysArray,
        datasets: [{
          data:valuesArray,
          backgroundColor: [
            'rgb(0, 197, 0)',
            'rgb(204, 223, 243)'
          ],
          borderWidth: 1,
          radius: '40%'  , 
        }]
      };
    return (
        <div className="revenus-statistique">
                <div className="header-revenus-statistique">
                    <h1>{props.titre} Statistiques</h1>
                    <Select
                        labelId="timeframe-select-label"
                        id="timeframe-select"
                        defaultValue={10}
                        sx={{
                            width: 170,
                            height: 50,
                            marginRight: 5,
                            marginTop: 1,
                            marginBottom: 1
                        }}
                    >
                        <MenuItem value={10}>7 derniers jours</MenuItem>
                        <MenuItem value={20}>Semaine</MenuItem>
                        <MenuItem value={30}>Mois</MenuItem>
                    </Select>
                </div>
                <div className="chart-container">
                    <div className="bar">
                    <Bar data={data} height={150}/>
                    </div>
                    <div className="Doughnut">
                    <Doughnut data={data1} />
                    </div>
                </div>
                
            </div>
    );
}

export default RevenusStat;
