import * as React from 'react';
import { CssBaseline, Box, Container, Button, ButtonGroup, TextField, Typography } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';

export default function Ciente() {
    return (
        <React.Fragment>
            <CssBaseline>
                <Container sx={{width: "100%"}}> 
                    <Box sx={{ width: "50%", bgcolor: "#ffffffff", height: '67vh', padding: '1rem', marginTop: '1rem'}} >
                        <Typography variant="h5" component={"div"} sx={{textAlign: "center", marginBottom: "1rem"} }>
                            Cadastro de Clientes
                        </Typography>                    
                        <ButtonGroup sx={{width: "100%", justifyContent: "center"}}>
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
                        <TextField id="standard-basic" label="Codigo Cliente" variant="standard" size="small" sx={{width: "30%", marginRight: "40%"}}/>
                        <TextField id="outlined-basic" label="Nome Cliente" variant="outlined" size="small" sx={{width: "100%", marginTop: "1rem"}}/>
                        <TextField id="outlined-basic" label="Endereço" variant="outlined" size="small" sx={{width: "100%", marginTop: "1rem"}} />
                        <TextField id="outlined-basic" label="Código Cidade" variant="outlined" size="small" sx={{width: "30%", marginRight: "20%", marginTop: "1rem"}} />
                        <TextField id="standard-basic" label="Nome Cidade" variant="standard" size="small" sx={{width: "50%", marginTop: "1rem"}}/>
                        <TextField id="outlined-basic" label="Observação" variant="outlined" size="small" sx={{width: "100%", marginTop: "1rem"}} />
                    </Box>
                </Container>
            </CssBaseline>
        </React.Fragment>
    );
}