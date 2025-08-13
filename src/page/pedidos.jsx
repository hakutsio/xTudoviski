import * as React from 'react';
import { useState } from "react";
import { CssBaseline, Box, Container, Button, ButtonGroup, TextField, Typography } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';
import { DataGrid } from "@mui/x-data-grid";
import AddItemDialog from './addItem';

export default function Pedido() {
    const [rows, setRows] = useState([
        {id: 1, cod_prod: 1, nm_prod: "produto 1", qtd_prod: 2, valor: 20, total: 40 },
        {id: 2, cod_prod: 4, nm_prod: "produto 4", qtd_prod: 3, valor: 20, total: 60 },
        {id: 3, cod_prod: 9, nm_prod: "produto 9", qtd_prod: 1, valor: 20, total: 20 }
    ]);

    const columns = [
        { field: "id_item", headerName: "Cod Item", width: 120},
        { field: "cod_prod", headerName: "Cod Produto", width: 120 },
        { field: "nm_prod", headerName: "Produto", width: 600, flex: 1 },
        { field: "qtd_prod", headerName: "Quantidade", width: 120, type: "number" },
        { field: "valor", headerName: "Valor", width: 120, type: "number", valueFormatter: (params) => {const value = Number(params.value); return isNaN(value) ? '' : value.toFixed(2);} },
        { field: "total", headerName: "Total", width: 120, type: "number", valueFormatter: (params) => {const value = Number(params.value); return isNaN(value) ? '' : value.toFixed(2);} },
    ];

    const [dialogAberto, setDialogAberto] = useState(false);

    const handleAbrirDialog = () => {
        setDialogAberto(true);
    };

    const handleFecharDialog = () => {
        setDialogAberto(false);
    };
    
    return (
        <React.Fragment>
            <CssBaseline>
                <Container sx={{width: "100%"}}> 
                    <Box sx={{width: '50%', bgcolor: "#ffffffff", height: '68vh', padding: '1rem', marginTop: '1rem'}} > 
                        <Typography variant="h5" component={"div"} sx={{textAlign: "center", marginBottom: "1rem"} }>
                            Cadastro de Pedidos
                        </Typography>                   
                        <ButtonGroup sx={{width: "100%", justifyContent:'center'}}>
                            <Button><FirstPageIcon/></Button>
                            <Button><NavigateBeforeIcon/></Button>
                            <Button><NavigateNextIcon/></Button>
                            <Button><LastPageIcon/></Button>
                        </ButtonGroup> 
                        <ButtonGroup sx={{width: "100%", justifyContent: "center", marginTop: '1rem', marginBottom: '1rem'}}>
                            <Button>Adicionar</Button>
                            <Button>Modificar</Button>
                            <Button>Remover</Button>
                            <Button>Exportar</Button>
                            <Button>Cancelar</Button>
                        </ButtonGroup>
                        <TextField id="standard-basic" label="Codigo Pedido" autoComplete='###' variant="standard" size="small" sx={{width: "20%", marginRight: "40%"}}/>
                        <TextField id="outlined-basic" label="Data" variant= "outlined" size="small" sx={{width: "40%"}}/>
                        <TextField id="outlined-basic" label="Codigo Cliente" variant="outlined" size="small" sx={{width: "20%", marginTop: "1rem", marginRight: "10%"}}/>
                        <TextField id="standard-basic" label="Nome Cliente" autoComplete='###' variant="standard" size="small" sx={{width: "70%", marginTop: "1rem"}}/>
                        <TextField id="standard-basic" label="Endereço" autoComplete='###' variant="standard" size="small" sx={{width: "100%", marginTop: "1rem"}} />
                        <TextField id="standard-basic" label="Código Cidade" autoComplete='###' variant="standard" size="small" sx={{width: "20%", marginRight: "20%", marginTop: "1rem"}} />
                        <TextField id="standard-basic" label="Nome Cidade" autoComplete='###' variant="standard" size="small" sx={{width: "60%", marginTop: "1rem"}}/>
                        <TextField id="outlined-basic" label="Observação" variant="outlined" size="small" sx={{width: "100%", marginTop: "1rem"}} />
                    </Box>
                    <Box sx={{ height: 350, width: "100%", marginTop: "1rem"}}>
                        <DataGrid 
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            disableRowSelectionOnClick
                            />
                        <ButtonGroup sx={{marginTop: "1rem", marginBottom: "3rem"}}>
                            <Button>Adicionar Item</Button>
                            <Button>Modificar Item</Button>
                            <Button>Remover Item</Button>
                            <Button variant="contained" onClick={() => handleAbrirDialog(true)}>aqui teste</Button>
                            <AddItemDialog
                                open={dialogAberto}
                                onClose={handleFecharDialog}
                            />
                        </ButtonGroup>
                    </Box>
                </Container>
            </CssBaseline>
        </React.Fragment>
    );
}