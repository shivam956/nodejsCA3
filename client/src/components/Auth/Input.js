import React from 'react';
import { Visibility, VisibilityOff} from '@material-ui/icons';
import { InputAdornment, IconButton} from '@material-ui/core';
import { TextField, Grid } from '@material-ui/core';

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => {
  return(
      <Grid item xs={12} sm={ half ? 6 : 12}>
        <TextField 
            name = {name}
            onChange = {handleChange}
            variant="outlined"
            required
            fullWidth
            label = {label}
            autoFocus = {autoFocus}
            type = {type}
            InputProps = { name === 'password' ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            } : null}
        />
      </Grid>
   )

 }

export default Input;