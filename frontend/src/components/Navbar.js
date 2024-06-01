const Navbar = ({
  onSolicitarTarjeta,
  onEstadoCuenta,
  onMovimientosTarjeta,
  onCrearTransaccion,
  onLogout  // Prop adicional para manejar el cierre de sesión
}) => {
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
      <button onClick={onCrearTransaccion} style={{ margin: '10px', padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}>
        Crear Transacción
      </button>
      <button onClick={onLogout} style={{ margin: '10px', padding: '8px 16px', fontSize: '16px', backgroundColor: '#f44336', color: 'white', cursor: 'pointer' }}>
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default Navbar;
