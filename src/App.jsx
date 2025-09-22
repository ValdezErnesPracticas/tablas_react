import "./App.css";
import { useState } from "react";
import Departamentos from "./departamentos/departamentos.jsx";
import Puestos from "./puestos/puestos.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient();

function App() {
  const [tablaActual, setTablaActual] = useState();

  const switchTable = (tabla) => {
    setTablaActual(tabla);
  };

  const renderTabla = () => {
    switch (tablaActual) {
      case "departamentos":
        return (
          <>
            <h2>Departamentos</h2>
            <Departamentos />
          </>
        );
      case "puestos":
        return (
          <>
            <h2>Puestos</h2>
            <Puestos />
          </>
        );
      default:
        return null;
    }
  };
  return (
    <QueryClientProvider client={queryClient}>
      {
        <div>
          <h1>Tablas:</h1>
          <div>
            <button
              onClick={() => switchTable("departamentos")}
              style={{ marginRight: "30px" }}
            >
              Departamentos
            </button>
            <button onClick={() => switchTable("puestos")}>Puestos</button>
          </div>
          <br />
          <div>{renderTabla()}</div>
        </div>
      }
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
