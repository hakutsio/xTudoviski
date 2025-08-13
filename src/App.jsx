import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './page/home'
import Cidades from './page/cidades'
import Produtos from './page/produtos'
import Clientes from './page/clientes'
import Pedidos from './page/pedidos'

import { AppBar, Toolbar, Button, Box, Stack } from "@mui/material";
import logo from './assets/logo/imgLogo.png';

export default function App(){
  return(
    <Router>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} alt="logo do xTudoviski" style={{ height: '70px', marginRight: '2rem'}}/>
          <Stack direction={"row"} spacing={2}>
            <Button variant="contained" component={Link} to="/" sx={{color: 'white', backgroundColor: '#1E90FF' }}>Home</Button>
            <Button variant="contained" component={Link} to="/cidades" sx={{color: 'white', backgroundColor: "#1E90FF" }}>Cidades</Button>
            <Button variant="contained" component={Link} to="/produtos" sx={{color: 'white', backgroundColor: "#1E90FF" }}>Produtos</Button>
            <Button variant="contained" component={Link} to="/clientes" sx={{color: 'white', backgroundColor: "#1E90FF" }}>Clientes</Button>
            <Button variant="contained" component={Link} to="/pedidos" sx={{color: 'white', backgroundColor: "#1E90FF" }}>Pedidos</Button>
          </Stack>
        </Toolbar>
      </AppBar>    
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cidades" element={<Cidades />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/pedidos" element={<Pedidos />} />
        </Routes>
      </Box>
    </Router>
  )
}
