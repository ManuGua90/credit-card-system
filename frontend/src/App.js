import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InicioSesion from './components/InicioSesion';
import RegistroUsuario from './components/RegistroUsuario';
import ListadoTarjetas from './components/ListadoTarjetas';
import CreacionTarjeta from './components/CreacionTarjeta';
import ListadoTransacciones from './components/ListadoTransacciones';
import RegistroTransaccion from './components/RegistroTransaccion';
import PaginaPrincipal from './components/PaginaPrincipal.js';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<InicioSesion />} />
          <Route path="/registro" element={<RegistroUsuario />} />
          <Route path="/pagina-principal" element={<PaginaPrincipal />} />
          <Route path="/tarjetas" element={<ListadoTarjetas />} />
          <Route path="/tarjetas/crear" element={<CreacionTarjeta />} />
          <Route path="/transacciones" element={<ListadoTransacciones />} />
          <Route path="/transacciones/registrar" element={<RegistroTransaccion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;