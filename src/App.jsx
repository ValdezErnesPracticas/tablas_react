import './App.css';
import { useState } from 'react';
import Departamentos from './departamentos/departamentos.jsx';
import Puestos from './puestos/puestos.jsx';
// import Puestos from './puestos/puestos.jsx'; // Suponiendo que también tienes este componente

function App() {
  const [tablaActual, setTablaActual] = useState();

  const switchTable = (tabla) => {
    setTablaActual(tabla);
  };

  const renderTabla = () => {
    switch (tablaActual) {
      case 'departamentos':
        return <Departamentos />;
      case 'puestos':
        return <Puestos />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Tablas:</h1>
      <div>
        <button onClick={() => switchTable('departamentos')}>Departamentos</button>
        <button onClick={() => switchTable('puestos')}>Puestos</button>
      </div>
      <div>
        {renderTabla()}
      </div>
    </div>
  );
}

export default App;
