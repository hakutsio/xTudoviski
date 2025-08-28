import { useState, useEffect } from "react";
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack} from '@mui/material';

export default function AddItemDialog({ open, onClose, onSave }){

    const [formCodProduto, setFormCodProduto] = useState('');
    const [produtoEncontrado, setProdutoEncontrado] = useState(null);
    const [quantidade, setQuantidade] = useState(1);
    const [valorTotal, setValorTotal] = useState(0);
    const [erroProduto, setErroProduto] = useState('');

    const [notificacao, setNotificacao] = useState({ open: true, message: '', severity: 'success'});

    useEffect(() => {
        const buscarProdutoPorCodigo = async () => {
            if (formCodProduto) {
                try {
                    const response = await axios.get(`http://127.0.0.1:3001/api/produtos/${formCodProduto}`);
                    setProdutoEncontrado(response.data); 
                    setErroProduto('');
                } catch (error) {
                    setProdutoEncontrado(null); 
                    setErroProduto('Produto não encontrado.');
                }
            } else {
                setProdutoEncontrado(null);
                setErroProduto('');
            }
        };

        const timerId = setTimeout(() => { buscarProdutoPorCodigo(); }, 500);
        return () => { clearTimeout(timerId); };
    }, [formCodProduto]);

    useEffect(() => {
        if (produtoEncontrado && quantidade > 0) {
            setValorTotal(produtoEncontrado.ValProduto * quantidade);
        } else {
            setValorTotal(0);
        }
    }, [produtoEncontrado, quantidade]);

    const handleClose = () => {
        setFormCodProduto('');
        setProdutoEncontrado(null);
        setQuantidade(1);
        setValorTotal(0);
        setErroProduto('');
        onClose();
    };

    const handleSaveClick = () => {
        if(!produtoEncontrado) return;

        const novoItem = {
            CodProduto: produtoEncontrado.CodProduto,
            NumQuantidade: quantidade,
            ValTotal: valorTotal,
            Produto: { NomProduto: produtoEncontrado.NomProduto }
        };
        onSave(novoItem);
        handleClose();
    };





    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Item</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ width: "100%", paddingTop: 1 }}>
                    <TextField 
                        id="outlined-basic" 
                        size="small" 
                        label="Código do Produto"
                        value={formCodProduto}
                        onChange={(e) => setFormCodProduto(e.target.value)}
                        error={!!erroProduto}
                        helperText={erroProduto}
                        autoFocus 
                        fullWidth
                        variant= "outlined"/>
                    <TextField
                        id="standard-basic" 
                        size="small" 
                        label="Produto" 
                        value={produtoEncontrado ? produtoEncontrado.NomProduto : ''}
                        disabled
                        fullWidth
                        variant= "standard"/>
                    <TextField
                        id="outlined-basic" 
                        size="small" 
                        label="Quantidade"
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(Number(e.target.value))}
                        disabled={!produtoEncontrado}
                        fullWidth
                        variant= "outlined"/>
                    <TextField
                        id="standard-basic" 
                        size="small" 
                        label="Valor Unitário" 
                        value={produtoEncontrado ? `R$ ${Number(produtoEncontrado.ValProduto).toFixed(2)}` : 'R$ 0.00'}
                        disabled
                        fullWidth
                        variant= "standard"/>
                    <TextField
                        id="standard-basic" 
                        size="small" 
                        label="Valor Total" 
                        value={`R$ ${valorTotal.toFixed(2)}`}
                        disabled
                        fullWidth
                        variant= "standard"/>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSaveClick} disabled={!produtoEncontrado}>Salvar</Button>
                <Button onClick={handleClose}>Fechar</Button>
            </DialogActions>
        </Dialog>
    );
}