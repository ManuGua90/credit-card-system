
// En Navbar.js o al inicio de PaginaPrincipal.js
const Navbar = ({ onSolicitarTarjeta, onEstadoCuenta, onMovimientosTarjeta }) => {
    return (
      <nav style={{ backgroundColor: '#f0f0f0', padding: '10px', textAlign: 'center' }}>
        <button onClick={onSolicitarTarjeta} style={{ margin: '10px', padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}>
          Solicitar Tarjeta
        </button>
        <button onClick={onEstadoCuenta} style={{ margin: '10px', padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}>
          Estado Cuenta
        </button>
        <button onClick={onMovimientosTarjeta} style={{ margin: '10px', padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}>
          Ver Movimientos de Tarjeta
        </button>

      </nav>
    );
  };
  
  export default Navbar;