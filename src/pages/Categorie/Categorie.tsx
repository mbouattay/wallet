import { useState} from "react";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CategorieTab from "../../components/CategorieTab/CategorieTab";
import './Categorie.css';



interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Categorie = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        console.log(event);
    };
    return (
        <div className="Categorie">
            <h1> Categories</h1>
            <div className="categorie-container">
                <Box sx={{ width: '1200px', backgroundColor: "#ffff", borderRadius: "20px", marginLeft: "30px" }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{
                            "& .MuiTab-root.Mui-selected": { color: " rgba(234, 189, 77, 0.66)" },
                            "& .MuiTabs-indicator": { bgcolor: " rgba(234, 189, 77, 0.66)" }
                        }}>
                            <Tab label="Revenus categorie" {...a11yProps(0)} />
                            <Tab label="Depenses categorie" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <CategorieTab indexcategorie={0} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <CategorieTab indexcategorie={1}/>
                    </CustomTabPanel>
                </Box>

            </div>
        </div>
    );
}

export default Categorie;
