import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CssBaseline, Box, Container, Button, ButtonGroup, TextField, Typography, Snackbar, Alert } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';


export default function Cidades() {
    const [cidades, setCidades]= useState([]);
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [modo, setModo] = useState('visualizacao');
    const [notificacao, setNotificacao] = useState({ opens: false, message: '', severity: 'sucess' });
    const [formCodCidade, setFormCodCidade] = useState('');
    const [formNomCidade, setFormNomCidade] = useState('');
    const [formCodUF, setFormCodUF] = useState('');

    const cidadeAtual = cidades[indiceAtual];

    const buscarCidades = async () => {
        try{
            const response = await axios.get('http://127.0.0.1:3001/api/cidades');
            setCidades(response.data);
        } catch (error) {
            console.error("erro ao buscar cidades:", error);
            setNotificacao({ open: true, message: 'Erro ao buscar Cidades.', severity: 'error'});
        }
    };
    
    useEffect(() => {
        buscarCidades();
    }, []);

    useEffect(() => {
        if(cidadeAtual && modo === 'visualizacao'){
            setFormCodCidade(cidadeAtual.CodCidade);
            setFormNomCidade(cidadeAtual.NomCidade);
            setFormCodUF(cidadeAtual.CodUF);
        }
    }, [cidadeAtual, modo]);

    const handlePrimeiro = () => {
        setIndiceAtual(0);
    }

    const handleAnterior = () => {
        if(indiceAtual > 0){
            setIndiceAtual(indiceAtual - 1);
        }
    };

    const handleProximo = () => {
        if(indiceAtual < cidades.length -1) {
            setIndiceAtual(indiceAtual + 1);
        }
    };

    const handleUltimo = () => {
        setIndiceAtual(cidades.length - 1);
    };




    const handleAdicionar = () => {
        setFormCodCidade('Novo');
        setFormCodUF('');
        setFormNomCidade('');

        setModo('adicao');
    };

    const handleModificar = () => {
        setModo('edicao');
    };

    const handleCancelar = () => {
        setModo('visualizacao');
    };

    const handleSalvar = async () => {
        if(!formNomCidade.trim() || !formCodUF.trim()) {
            setNotificacao({
                open: true,
                message: 'Por favor, preencha todos os campos obrigatórios.',
                severity: 'error'
            });
            return;
        }

        const dadosCidade = {
            NomCidade: formNomCidade,
            CodUF: formCodUF
        };

        try{
            if(modo === 'adicao') {
                await axios.post('http://127.0.0.1:3001/api/cidades', dadosCidade);
                setNotificacao({ open: true, message: 'Cidade criada com sucesso!', severity: 'sucess' });
            } else if (modo === 'edicao') {
                await axios.put(`http://127.0.0.1:3001/api/cidades/${formCodCidade}`, dadosCidade)
                setNotificacao({ open: true, message: 'Cidade Atualizada com sucesso!', sevetity: 'sucess' });
            }

            await buscarCidades();
            setModo('visualizacao');
        } catch (error) {
            setNotificacao({
                open: true,
                message: error.response?.data?.error || 'Ocorreu um erro ao salvar.',
                severity: 'error'
            });
        }
    };

    return (
        <React.Fragment>
            <CssBaseline>
                <Container sx={{width: "100%"}}> 
                    <Box sx={{ width: "50%", bgcolor: "#ffffffff", height: '40vh', padding: '1rem', marginTop: '1rem'}} > 
                        <Typography variant="h5" component={"div"} sx={{textAlign: "center", marginBottom: "1rem"} }>
                            Cadastro de Cidades
                        </Typography>
                        <ButtonGroup disabled={modo !== 'visualizacao'} sx={{width: "100%", justifyContent: "center"}}>
                            <Button onClick={handlePrimeiro} disabled={indiceAtual === 0}><FirstPageIcon/></Button>
                            <Button onClick={handleAnterior} disabled={indiceAtual === 0}><NavigateBeforeIcon/></Button>
                            <Button onClick={handleProximo} disabled={indiceAtual === cidades.length - 1} ><NavigateNextIcon/></Button>
                            <Button onClick={handleUltimo} disabled={indiceAtual === cidades.length - 1}><LastPageIcon/></Button>
                        </ButtonGroup> 
                        <ButtonGroup disabled={modo !== 'visualizacao'} sx={{width: "100%", justifyContent: "center", marginTop: '1rem', marginBottom: '1rem'}}>
                            <Button onClick={handleAdicionar}>Adicionar</Button>
                            <Button onClick={handleModificar}>Modificar</Button>
                            <Button>Remover</Button>
                            <Button>Exportar</Button>
                        </ButtonGroup>
                        <ButtonGroup disabled={modo === 'visualizacao'} sx={{width: "100%", justifyContent: "center", marginTop: '0.5rem', marginBottom: '1rem'}} >
                            <Button onClick={handleSalvar}>Salvar</Button>
                            <Button onClick={handleCancelar}>Cancelar</Button>
                        </ButtonGroup>
                        <TextField
                            id="standard-basic" 
                            label="Codigo Cidade" 
                            variant="standard" 
                            size="small" 
                            value={formCodCidade}
                            disabled 
                            sx={{width: "20%", marginRight: "50%"}}/>
                        <TextField 
                            id="outlined-basic" 
                            label="UF" 
                            variant="outlined" 
                            size="small" 
                            value={formCodUF} 
                            onChange={(e) => setFormCodUF(e.target.value)}
                            disabled={modo === 'visualizacao'}
                            sx={{width: "30%"}}/>
                        <TextField 
                            id="outlined-basic" 
                            label="Nome da Cidade" 
                            variant="outlined" 
                            size="small" 
                            value={formNomCidade} 
                            onChange={(e) => setFormNomCidade(e.target.value)}
                            disabled={modo === 'visualizacao'}
                            sx={{width: "100%", marginTop: "1rem"}} />
                    </Box>
                </Container>
            </CssBaseline>
            <Snackbar
                open={notificacao.open}
                autoHideDuration={6000}
                onClose={() => setNotificacao({ ...notificacao, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert 
                    onClose={() => setNotificacao({ ...notificacao, open: false })} 
                    severity={notificacao.severity}
                    sx={{ width: '100%' }}>
                    {notificacao.message}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}