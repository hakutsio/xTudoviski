import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CssBaseline, Box, Container, Button, ButtonGroup, TextField, Typography, Snackbar, Alert } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';

export default function Produto() {

    const [produtos, setProdutos] = useState([]);
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [modo, setModo] = useState('visualizacao');
    const [notificacao, setNotificacao] = useState({ open: false, message: '', severity: 'sucess'});
    const [formCodProduto, setFormCodProduto] = useState('');
    const [formNomProduto, setFormNomProduto] = useState('');
    const [formValProduto, setFormValProduto] = useState('');

    const produtoAtual = produtos[indiceAtual];

    const buscarProdutos = async () => {
    try {
            const response = await axios.get('http://127.0.0.1:3001/api/produtos');
            setProdutos(response.data);
        } catch (error) {
            console.error("Erro ao buscar Produtos", error);
            setNotificacao({ open: true, message: 'Erro ao buscar Produtos.', severity: 'error'});
        }   
    };
  
    useEffect(() => {
        buscarProdutos();
    }, [])

    useEffect(() => {
        if(produtoAtual && modo === 'visualizacao'){
            setFormCodProduto(produtoAtual.CodProduto);
            setFormNomProduto(produtoAtual.NomProduto);
            setFormValProduto(produtoAtual.ValProduto);
        }
    }, [produtoAtual, modo]);

    const handlePrimeiro = () => {
        setIndiceAtual(0);
    };

    const handleAnterior = () => {
        if(indiceAtual > 0) {
            setIndiceAtual(indiceAtual -1);
        }
    };

    const handleProximo = () => {
        if(indiceAtual < produtos.length -1) {
            setIndiceAtual(indiceAtual +1);
        }
    };

    const handleUltimo = () => {
        setIndiceAtual(produtos.length -1);
    };




    const handleAdicionar = () => {
        setFormCodProduto('Novo');
        setFormNomProduto('');
        setFormValProduto('');
        setModo('adicao');
    };

    const handleModificar = () => {
        setModo('edicao');
    };

    const handleCancelar = () => {
        setModo('visualizacao');
    };

    const handleSalvar =  async () => {
        if(!formNomProduto.trim() || !formValProduto || formValProduto <= 0){
            setNotificacao({
                open: true,
                message: 'Por favor, preencha todos os campos obrigatórios.',
                severity: 'error'
            });
            return;
        }

        const dadosProduto = {
            NomProduto: formNomProduto,
            ValProduto: formValProduto
        };

        try {
            if(modo ==='adicao') {
                await axios.post('http://127.0.0.1:3001/api/produtos', dadosProduto);
                setNotificacao({ open: true, message: 'Produto criado com sucesso!', severity: 'sucess' });
            } else if (modo === 'edicao'){
                await axios.put(`http://127.0.0.1:3001/api/produtos/${formCodProduto}`, dadosProduto);
                setNotificacao({ open: true, message: 'Produto Atualizado com sucesso!', sevetity: 'sucess' });
            }


        } catch (error) {
            console.error("erro ao salvar o Produto", error);
        }

        await buscarProdutos();
        setModo('visualizacao');
    };

    return (
        <React.Fragment>
            <CssBaseline>
                <Container sx={{width: "100%"}}> 
                    <Box sx={{ width: "50%", bgcolor: "#ffffffff", height: '40vh', padding: '1rem', marginTop: '1rem'}} >   
                        <Typography variant="h5" component={"div"} sx={{textAlign: "center", marginBottom: "1rem"} }>
                            Cadastro de Produtos
                        </Typography>                 
                        <ButtonGroup disabled={modo !== 'visualizacao'} sx={{width: "100%", justifyContent: "center"}}>
                            <Button onClick={handlePrimeiro} disabled={indiceAtual === 0}><FirstPageIcon/></Button>
                            <Button onClick={handleAnterior} disabled={indiceAtual === 0}><NavigateBeforeIcon/></Button>
                            <Button onClick={handleProximo} disabled={indiceAtual >= produtos.length -1}><NavigateNextIcon/></Button>
                            <Button onClick={handleUltimo} disabled={indiceAtual >= produtos.length -1}><LastPageIcon/></Button>
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
                            label="Codigo Produto" 
                            variant="standard" 
                            size="small" 
                            value={formCodProduto}
                            disabled
                            sx={{width: "20%", marginRight: "50%"}}/>
                        <TextField 
                            id="outlined-basic" 
                            label="Valor" 
                            variant="outlined" 
                            size="small"
                            type="number"
                            value={formValProduto} 
                            onChange={(e) => setFormValProduto(e.target.value)}
                            disabled={modo === 'visualizacao'}
                            sx={{width: "30%"}}/>
                        <TextField 
                            id="outlined-basic" 
                            label="Produto" 
                            variant="outlined" 
                            size="small" 
                            value={formNomProduto}
                            onChange={(e) => setFormNomProduto(e.target.value)}
                            disabled={modo === 'visualizacao'}
                            sx={{width: "100%", marginTop: "1rem"}}/>
                    </Box>
                </Container>
            </CssBaseline>
            <Snackbar 
                open={notificacao.open} 
                autoHideDuration={6000} 
                onClose={() => setNotificacao({ ...notificacao, open: false })} 
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}>
                <Alert 
                    onClose={() => setNotificacao({ ...notificacao, open: false})} 
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                {notificacao.message}    
                </Alert>       
            </Snackbar>
        </React.Fragment>
    );
}