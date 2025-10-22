
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/style.css';
import './styles/editPerfil.css';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Catalogo from './pages/Catalogo' ;
import Login from './pages/Login';
import Registro from './pages/Registro';
import Header from "./components/header";
import Footer from './components/footer';
import Procesos from './pages/Procesos';
import NuestraHistoria from './pages/NuestraHistoria';
import Equipo from './pages/Equipo';
import Comunidad from './pages/Comunidad';
import EditPerfil from './pages/editPerfil';
import Perfil from './pages/Perfil'

function App() {
  return (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/catalogo/:categoria" element={<Catalogo />} />
            <Route path="/procesos" element={<Procesos />} />
            <Route path="/nuestrahistoria" element={<NuestraHistoria />} />
            <Route path="/equipo" element={<Equipo />} />
            <Route path='/comunidad' element={<Comunidad />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Registro" element={<Registro />} />
            <Route path='/EditarPerfil' element={<EditPerfil/>}/>
            <Route path='/Perfil' element={<Perfil/>}/>
          </Routes>
          <Footer />
          </>
  );
}

export default App;
