import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import "./Register.css";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <div className="Register-container">
            <h1> Register</h1>
            <div className="form">
                <TextField id="outlined-basic" placeholder="Nom" variant="outlined" sx={{ width: 460, marginTop: 3 }} />
                <TextField id="outlined-basic" placeholder="prenom" variant="outlined" sx={{ width: 460, marginTop: 3 }} />
                <TextField id="outlined-basic" placeholder="Email" variant="outlined" sx={{ width: 460, marginTop: 3 }} />
                <TextField id="outlined-basic" placeholder="Confirmation Email" variant="outlined" sx={{ width: 460, marginTop: 3 }} />
                <FormControl sx={{ m: 1, width: 460 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <button className="btn-Register">Register</button>

            </div>
        </div>
    );
}

export default Register;
