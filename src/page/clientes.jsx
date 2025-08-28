import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CssBaseline, Box, Container, Button, ButtonGroup, TextField, Typography, Snackbar, Alert } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';

export default function Clientes() {

    const [clientes, setClientes] = useState([]);
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [modo, setModo] = useState('visualizacao');
    const [notificacao, setNotificacao] = useState({ open: false, message: '', severity: 'success'});
    const [formCodCliente, setFormCodCliente] = useState('');
    const [formNomCliente, setFormNomCliente] = useState('');
    const [formCodEndereco, setFormCodEndereco] = useState('');
    const [formObservacao, setFormObservacao] = useState('');

    const [formCodCidade, setFormCodCidade] = useState('');
    const [nomeCidadeExibicao, setNomeCidadeExibicao] = useState('');
    const [erroCidade, setErroCidade] = useState('');

    const clienteAtual = clientes[indiceAtual];

    const buscarClientes = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3001/api/clientes')
            setClientes(response.data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            setNotificacao({ open: true, message: 'Erro ao buscar cliente.', severity: 'error'});
        }
    };

    useEffect(() => {
        buscarClientes();
    }, []);

    useEffect(() => {
        const buscarCidadePorCodigo = async () => {
            if (formCodCidade) {
                try {
                    const response = await axios.get(`http://127.0.0.1:3001/api/cidades/${formCodCidade}`);
                    setNomeCidadeExibicao(response.data.NomCidade);
                    setErroCidade('');
                } catch (error) {
                    setNomeCidadeExibicao('');
                    setErroCidade('Código de cidade inválido.');
                }
            } else {
                setNomeCidadeExibicao('');
                setErroCidade('');
            }
        };

        const timerId = setTimeout(() => {
            buscarCidadePorCodigo();
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [formCodCidade]);

    useEffect(() => {
        if(clienteAtual && modo === 'visualizacao'){
            setFormCodCliente(clienteAtual.CodCliente);
            setFormNomCliente(clienteAtual.NomCliente);
            setFormCodEndereco(clienteAtual.CodEndereco);
            setFormCodCidade(clienteAtual.CodCidade);
            setFormObservacao(clienteAtual.Observacao);
        }
    }, [clienteAtual, modo]);

    const handlePrimeiro = () => {
        setIndiceAtual(0);
    };

    const handleAnterior = () => {
        if(indiceAtual > 0){
            setIndiceAtual(indiceAtual -1);
        }
    };

    const handleProximo = () => {
        if(indiceAtual < clientes.length -1) {
            setIndiceAtual(indiceAtual +1);
        }
    };

    const handleUltimo = () => {
        setIndiceAtual(clientes.length -1);
    };

    const handleAdicionar = () => {
        setFormCodCliente('Novo');
        setFormNomCliente('');
        setFormCodEndereco('');
        setFormCodCidade('');
        setFormObservacao('');
        setNomeCidadeExibicao('');
        setErroCidade('');

        setModo('adicao');
    };

    const handleModificar = () => {
        setModo('edicao');
    };

    const handleCancelar = () => {
        setModo('visualizacao');
    };

    const handleSalvar = async () => {

        if(!formNomCliente.trim() || !formCodCidade || erroCidade){
            setNotificacao({
                open: true,
                message: 'Nome do cliente e cidade válida são obrigatórios.',
                severity: 'error'
            });
            return;
        }

        const dadosCliente = {
            NomCliente: formNomCliente,
            CodEndereco: formCodEndereco,
            CodCidade: formCodCidade,
            Observacao: formObservacao
        };

        try {
            if(modo === 'adicao') {
                await axios.post('http://127.0.0.1:3001/api/clientes', dadosCliente);
                setNotificacao({ open: true, message: 'Cliente criado com sucesso', severity: 'success' });
            } else if(modo === 'edicao') {
                await axios.put(`http://127.0.0.1:3001/api/clientes/${formCodCliente}`, dadosCliente);
                setNotificacao({ open: true, message: 'Cliente atualizado com sucesso', severity: 'success' });
            }

            await buscarClientes();
            setModo('visualizacao');
        } catch (error) {
            console.error("Erro ao salvar cliente:", error);
            setNotificacao({ open: true, message: error.response?.data?.error || 'Ocorreu um erro ao salvar.', severity: 'error' });
        }
    };

    



    return (
        <React.Fragment>
            <CssBaseline>
                <Container sx={{width: "100%"}}> 
                    <Box sx={{ width: "50%", bgcolor: "#ffffffff", height: '67vh', padding: '1rem', marginTop: '1rem'}} >
                        <Typography variant="h5" component={"div"} sx={{textAlign: "center", marginBottom: "1rem"} }>
                            Cadastro de Clientes
                        </Typography>                    
                        <ButtonGroup disabled={modo !== 'visualizacao'} sx={{width: "100%", justifyContent: "center"}}>
                            <Button onClick={handlePrimeiro} disabled={indiceAtual === 0}><FirstPageIcon/></Button>
                            <Button onClick={handleAnterior} disabled={indiceAtual === 0}><NavigateBeforeIcon/></Button>
                            <Button onClick={handleProximo} disabled={indiceAtual >= clientes.length -1}><NavigateNextIcon/></Button>
                            <Button onClick={handleUltimo} disabled={indiceAtual >= clientes.length -1}><LastPageIcon/></Button>
                        </ButtonGroup> 
                        <ButtonGroup disabled={modo !== 'visualizacao'} sx={{width: "100%", justifyContent: "center", marginTop: '1rem', marginBottom: '1rem'}}>
                            <Button onClick={handleAdicionar}>Adicionar</Button>
                            <Button onClick={handleModificar}>Modificar</Button>
                            <Button>Remover</Button>
                            <Button>Exportar</Button>
                        </ButtonGroup>
                        <ButtonGroup disabled={modo === 'visualizacao'} sx={{width: "100%", justifyContent: "center", marginTop: '0.5rem', marginBottom: '1rem'}}>
                            <Button onClick={handleSalvar}>Salvar</Button>
                            <Button onClick={handleCancelar}>Cancelar</Button>
                        </ButtonGroup>
                        <TextField 
                            id="standard-basic" 
                            label="Codigo Cliente" 
                            variant="standard" 
                            size="small" 
                            value={formCodCliente}
                            disabled
                            sx={{width: "30%", marginRight: "40%"}}/>
                        <TextField 
                            id="outlined-basic" 
                            label="Nome Cliente" 
                            variant="outlined" 
                            size="small" 
                            value={formNomCliente}
                            onChange={(e) => setFormNomCliente(e.target.value)}
                            disabled={modo === 'visualizacao'}
                            sx={{width: "100%", marginTop: "1rem"}}/>
                        <TextField 
                            id="outlined-basic" 
                            label="Endereço" 
                            variant="outlined" 
                            size="small"
                            value={formCodEndereco}
                            onChange={(e) => setFormCodEndereco(e.target.value)}
                            disabled={modo === 'visualizacao'} 
                            sx={{width: "100%", marginTop: "1rem"}} />
                        <TextField 
                            id="outlined-basic" 
                            label="Código Cidade" 
                            variant="outlined" 
                            size="small" 
                            value={formCodCidade}
                            onChange={(e) => setFormCodCidade(e.target.value)}
                            disabled={ modo === 'visualizacao'}
                            error={!!erroCidade}
                            helperText={erroCidade}
                            sx={{width: "30%", marginRight: "20%", marginTop: "1rem"}} />
                        <TextField 
                            id="standard-basic" 
                            label="Nome Cidade" 
                            variant="standard" 
                            size="small" 
                            value={nomeCidadeExibicao}
                            disabled
                            sx={{width: "50%", marginTop: "1rem"}}/>
                        <TextField 
                            id="outlined-basic" 
                            label="Observação" 
                            variant="outlined" 
                            size="small" 
                            value={formObservacao}
                            onChange={(e) => setFormObservacao(e.target.value)}
                            disabled={modo === 'visualizacao'}
                            sx={{width: "100%", marginTop: "1rem"}} />
                    </Box>
                </Container>
            </CssBaseline>
            <Snackbar open={notificacao.open} autoHideDuration={6000} onClose={() => setNotificacao({ ...notificacao, open: false})}>
                <Alert onClose={() => setNotificacao({ ...notificacao, open: false})} severity={notificacao.severity} sx={{ width: '100%' }}>
                    {notificacao.message}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}