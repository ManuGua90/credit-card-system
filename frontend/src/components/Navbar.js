// En Navbar.js o al inicio de PaginaPrincipal.js
const Navbar = ({ onSolicitarTarjeta }) => {
    return (
      <nav style={{ backgroundColor: '#f0f0f0', padding: '10px', textAlign: 'center' }}>
        <button onClick={onSolicitarTarjeta} style={{ margin: '10px', padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}>
          Solicitar Tarjeta
        </button>
      </nav>
    );
  };
  
  export default Navbar;