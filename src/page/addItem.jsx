import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack} from '@mui/material';

export default function AddItemDialog({ open, onClose }){

    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Item</DialogTitle>
            <DialogContent sx={{maxWidth: "400px"}}>
                <TextField sx={{width: "30%", marginTop: "1rem", marginRight: "10%"}} id="outlined-basic" size="small" label="Cod_Prod" variant= "outlined"/>
                <TextField sx={{width: "50%", marginTop: "1rem"}} id="standard-basic" size="small" label="Produto" autoComplete="###" variant= "standard"/>
                <TextField sx={{width: "30%", marginTop: "1rem", marginRight: "10%"}} id="outlined-basic" size="small" label="Quantidade" variant= "outlined"/>
                <TextField sx={{width: "50%", marginTop: "1rem"}} id="standard-basic" size="small" label="Valor_unitário" autoComplete="###" variant= "standard"/>
                <TextField sx={{marginTop: "1rem"}} id="outlined-basic" size="small" label="Valor_Total" variant= "outlined"/>
            </DialogContent>
            <DialogActions>
                <Button>Salvar</Button>
                <Button onClick={onClose}>Fechar</Button>
            </DialogActions>
        </Dialog>
    );
}