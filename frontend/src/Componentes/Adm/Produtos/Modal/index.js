import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import api from '../../../../services/api.js';

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [foto, setFoto] = useState('');
    const {pecas, setPecas, open, setOpen} = props;
    let {pecasData} = props;
    console.log(pecasData);

    const handleClose = () => {
        setOpen(false);
        setCodigo('');
        setNome('');
        setCategoria('');
        setPreco('');
        setQuantidade('');
        setDescricao('');
        setFoto('');
    };

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            codigo,
            nome,
            categoria,
            preco,
            quantidade,
            descricao,
            foto
        };

        try {
            await api.post('pecas', data);
            handleClose();
            addPecas(data);
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    function addPecas(data) {
        const itensCopy = Array.from(pecas);
        itensCopy.push(data);
        setPecas(itensCopy);
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <form onSubmit={handleRegister}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Cadastrar peça
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="Código"
                                fullWidth
                                autoComplete="fname"
                                color="secondary"
                                value={codigo}
                                onChange={e => setCodigo(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Nome"
                                fullWidth
                                autoComplete="lname"
                                color="secondary"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="address2"
                                name="address2"
                                label="Categoria"
                                fullWidth
                                autoComplete="billing address-line2"
                                color="secondary"
                                value={categoria}
                                onChange={e => setCategoria(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="city"
                                name="city"
                                label="Preço"
                                fullWidth
                                autoComplete="billing address-level2"
                                color="secondary"
                                value={preco}
                                onChange={e => setPreco(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="zip"
                                name="zip"
                                label="Quantidade"
                                fullWidth
                                autoComplete="billing postal-code"
                                color="secondary"
                                value={quantidade}
                                onChange={e => setQuantidade(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="standard-multiline-static"
                                label="Descrição"
                                multiline
                                fullWidth
                                color="secondary"
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button variant="contained" color="secondary">
                                Adicionar Foto
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus color="secondary" type="submit">
                        Salvar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
