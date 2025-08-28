import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CssBaseline, Box, Container, Button, ButtonGroup, TextField, Typography, Stack } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';
import { DataGrid } from "@mui/x-data-grid";
import AddItemDialog from './addItem';

export default function Pedido() {
    const [pedidos, setPedidos] = useState([]);
    console.log("ETAPA 1: Valor inicial de 'pedidos':", pedidos);
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [modo, setModo] = useState('visualizacao');
    const [notificacao, setNotificacao] = useState({ open: false, message: '', severity: 'success' });

    const [formCodPedido, setFormCodPedido] = useState('');
    const [formDatPedido, setFormDatPedido] = useState('');
    const [formObservacao, setFormObservacao] = useState('');
    const [formCodCliente, setFormCodCliente] = useState('');
    const [formCodCidade, setFormCodCidade] = useState('');
    
    const [nomeClienteExibicao, setNomeClienteExibicao] = useState('');
    const [enderecoClienteExibicao, setEnderecoClienteExibicao] = useState('');
    const [cidadeClienteExibicao, setCidadeClienteExibicao] = useState('');
    const [erroCliente, setErroCliente] = useState('');

    const [itens, setItens] = useState([]);
    const [dialogAberto, setDialogAberto] = useState(false);
    const pedidoAtual = pedidos[indiceAtual];

    const columns = [
        { field: "CodItem", headerName: "Item", width: 90 },
        { field: "CodProduto", headerName: "Cód. Prod.", width: 120 },
        { 
            field: "NomProduto", 
            headerName: "Produto", 
            width: 250, 
            valueGetter: (params) => params.row.Produto?.NomProduto || '' 
        },
        { field: "NumQuantidade", headerName: "Quantidade", width: 120, type: "number" },
        { 
            field: "ValTotal", 
            headerName: "Total", 
            width: 120, 
            type: "number", 
            valueFormatter: (params) => `R$ ${Number(params.value || 0).toFixed(2)}` 
        },
    ];

    const buscarPedidos = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3001/api/pedidos');
             console.log("ETAPA 2: Resposta recebida da API:", response.data);
            setPedidos(response.data);
        } catch (error) {
            console.error("Erro ao buscr Pedidos", error);
            setNotificacao({ open: true, message: 'Erro ao buscar Pedidos', severity: 'error'});
        }
    };

    useEffect(() => {
    buscarPedidos();
    }, []);

    useEffect(() => {
        if (pedidoAtual && modo === 'visualizacao') {
            setFormCodPedido(pedidoAtual.CodPedido);
            setFormDatPedido(new Date(pedidoAtual.DatPedido).toLocaleDateString('pt-BR'));
            setFormObservacao(pedidoAtual.Observacao);
            setFormCodCliente(pedidoAtual.CodCliente);

            if (pedidoAtual.Cliente) {
                setNomeClienteExibicao(pedidoAtual.Cliente.NomCliente);
                setEnderecoClienteExibicao(pedidoAtual.Cliente.CodEndereco);
                setFormCodCidade(pedidoAtual.Cliente.CodCidade);
                setCidadeClienteExibicao(pedidoAtual.Cliente.Cidade?.NomCidade || '');
            }
        }
    }, [pedidoAtual, modo]);

    useEffect(() => {
        const buscarClientePorCodigo = async () => {
            if(formCodCliente) {
                try {
                    const response = await axios.get(`http://127.0.0.1:3001/api/clientes/${formCodCliente}`);
                    const cliente = response.data;

                    setNomeClienteExibicao(cliente.NomCliente);
                    setEnderecoClienteExibicao(cliente.CodEndereco);

                    setFormCodCidade(cliente.CodCidade);
                    setCidadeClienteExibicao(cliente.Cidade?.NomCidade || '');
                    setErroCliente('');
                } catch (error) {
                    setNomeClienteExibicao('');
                    setEnderecoClienteExibicao('');
                    setFormCodCidade('');
                    setCidadeClienteExibicao('');
                    setErroCliente('Cliente não encontrado.');
                }
            } else {
                setNomeClienteExibicao('');
                setEnderecoClienteExibicao('');
                setFormCodCidade('');
                setCidadeClienteExibicao('');
                setErroCliente('');
            }
        };

        const timerId = setTimeout(() => { buscarClientePorCodigo(); }, 500);
        return () => { clearTimeout(timerId); };
    }, [formCodCliente]);


    console.log("ETAPA 3: Valor de 'pedidos' antes de renderizar o JSX:", pedidos);
    

    const handlePrimeiro = () => {
        setIndiceAtual(0);
    };

    const handleAnterior = () => {
        if(indiceAtual > 0){
            setIndiceAtual(indiceAtual -1);
        }
    };

    const handleProximo = () => {
        if(indiceAtual < pedidos.length -1) {
            setIndiceAtual(indiceAtual +1);
        }
    };

    const handleUltimo = () => {
        setIndiceAtual(pedidos.length -1);
    };

    const handleAdicionar = () => {
        setFormCodPedido('(Novo)');
        setFormDatPedido(new Date().toLocaleDateString('pt-BR'));
        setFormObservacao('');
        setFormCodCliente('');
        
        setNomeClienteExibicao('');
        setEnderecoClienteExibicao('');
        setCidadeClienteExibicao('');
        setErroCliente('');

        setItens([]);
        setModo('adicao');
    };

    const handleModificar = () => {
        setModo('edicao');
    };

    const handleCancelar = () => {
        setModo('visualizacao');
        setErroCliente('');
    };

    const handleSalvar = async () => {
        if(!formCodCliente || erroCliente) {
            setNotificacao({ open: true, message: 'É necessário um cliente válido para criar um pedido.', severity: 'error' });
            return;
        }

        const dadosPedido = {
            CodCliente: formCodCliente,
            DatPedido: new Date().toISOString().slice(0, 10),
            Observacao: formObservacao,
            ValPedido: itens.reduce((acc, item) => acc + item.ValTotal, 0),
            Itens: itens.map(item => ({
                CodProduto: item.CodProduto,
                NumQuantidade: item.NumQuantidade,
                ValTotal: item.ValTotal
            }))    
        };

        try {
            if(modo === 'adicao') {
                await axios.post('http://127.0.0.1:3001/api/pedidos', dadosPedido);
                setNotificacao({ open: true, message: 'Pedido criado com sucesso!', severity: 'success' });
            } else if (modo === 'edicao') {
                await axios.put(`http://127.0.0.1:3001/api/pedidos/${formCodPedido}`, dadosPedido);
                setNotificacao({ open:true, message: 'Pedido atualizado com sucesso!', severity: 'success' });
            }

            await buscarPedidos();
            setModo('visualizacao');
        } catch (error) {
            console.error("Erro ao salvar pedido:", error);
            setNotificacao({ open:true, message: error.response?.data?.error || 'Ocorreu um erro ao salvar o pedido.', severity: 'error' });
        }
    };

const handleAddItem = (novoItem) => {
    const itemComDadosCompletos = {
        ...novoItem,
        id_item: itens.length + 1,
        id: `${formCodPedido || 'novo'}-${itens.length + 1}`
    };
    
    setItens([...itens, itemComDadosCompletos]);
};



    const handleAbrirDialog = () => {
        setDialogAberto(true);
    };

    const handleFecharDialog = () => {
        setDialogAberto(false);
    };
    
    return (
        <React.Fragment>
            <CssBaseline> 
                <Container sx={{maxwidth: "lg"}}> 
                    <Stack spacing={2}>
                        <Box sx={{width: '50%', bgcolor: "#ffffffff", padding: '1rem', marginTop: '1rem'}} > 
                            <Typography variant="h5" component={"div"} sx={{textAlign: "center", marginBottom: "1rem"} }>
                                Cadastro de Pedidos
                            </Typography>                   
                            <ButtonGroup disabled={modo !== 'visualizacao'} sx={{width: "100%", justifyContent:'center'}}>
                                <Button onClick={handlePrimeiro} disabled={indiceAtual === 0}><FirstPageIcon/></Button>
                                <Button onClick={handleAnterior} disabled={indiceAtual === 0}><NavigateBeforeIcon/></Button>
                                <Button onClick={handleProximo} disabled={indiceAtual >= pedidos.length -1}><NavigateNextIcon/></Button>
                                <Button onClick={handleUltimo} disabled={ indiceAtual >= pedidos.length -1}><LastPageIcon/></Button>
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
                                label="Codigo Pedido" 
                                variant="standard" 
                                size="small" 
                                value={formCodPedido}
                                disabled
                                sx={{width: "20%", marginRight: "40%"}}/>
                            <TextField 
                                id="outlined-basic" 
                                label="Data" 
                                variant= "outlined" 
                                size="small"
                                value={formDatPedido}
                                disabled 
                                sx={{width: "40%"}}/>
                            <TextField 
                                id="outlined-basic" 
                                label="Codigo Cliente" 
                                variant="outlined" 
                                size="small"
                                value={formCodCliente}
                                onChange={(e) => setFormCodCliente(e.target.value)}
                                disabled={modo === 'visualizacao'}
                                error={!!erroCliente}
                                helperText={erroCliente}
                                sx={{width: "20%", marginTop: "1rem", marginRight: "10%"}}/>
                            <TextField 
                                id="standard-basic" 
                                label="Nome Cliente" 
                                variant="standard" 
                                size="small" 
                                value={nomeClienteExibicao}
                                disabled
                                sx={{width: "70%", marginTop: "1rem"}}/>
                            <TextField 
                                id="standard-basic" 
                                label="Endereço" 
                                variant="standard" 
                                size="small"
                                value={enderecoClienteExibicao}
                                disabled
                                sx={{width: "100%", marginTop: "1rem"}} />
                            <TextField 
                                id="standard-basic" 
                                label="Código Cidade" 
                                variant="standard" 
                                size="small" 
                                value={formCodCidade}
                                disabled
                                sx={{width: "20%", marginRight: "20%", marginTop: "1rem"}} />
                            <TextField 
                                id="standard-basic" 
                                label="Nome Cidade" 
                                variant="standard" 
                                size="small" 
                                value={cidadeClienteExibicao}
                                disabled
                                sx={{width: "60%", marginTop: "1rem"}}/>
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
                        <Box sx={{ height: 350, width: "100%", marginTop: "1rem"}}>
                            <DataGrid 
                                rows={itens}
                                columns={columns}
                                pageSize={5}
                                disableRowSelectionOnClick
                                />
                            <ButtonGroup sx={{marginTop: "1rem", marginBottom: "3rem"}} disabled={!pedidoAtual}>
                                <Button onClick={handleAbrirDialog} >Adicionar Item</Button>
                                <Button>Modificar Item</Button>
                                <Button>Remover Item</Button>
                                <AddItemDialog
                                    open={dialogAberto}
                                    onClose={handleFecharDialog}
                                    onSave={handleAddItem}
                                />
                            </ButtonGroup>
                        </Box>
                    </Stack>
                </Container>
            </CssBaseline>
        </React.Fragment>
    );
}
