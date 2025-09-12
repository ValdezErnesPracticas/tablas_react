import { getAllPuestos } from "../services/Puestos";
import { useEffect, useState } from "react";

function Puestos() {
    const [Puestos, setPuestos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllPuestos();
            setPuestos(data);
            setLoading(false);
        };
        fetchData();
    }, []);
    if (loading) {
            return <PantallaCarga />;
    }    
    return (
        <>
            <table className="table">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th width="200px">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Puestos.length > 0 ? (
                        Puestos.map((P) => (
                            <tr key={P.id}>
                                <td>{P.id}</td>
                                <td>{P.nombre}</td>
                                <td>
                                    <a href={`/Puesto/${P.id}/edit`} className="btn btn-warning btn-sm">
                                        Editar
                                    </a>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            if (confirm('¿Seguro que deseas eliminar este Puesto?')) {
                                            }
                                        }}
                                        className="d-inline"
                                    >
                                        <button type="submit" className="btn btn-danger btn-sm">
                                            Eliminar
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No hay Puestos registrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default Puestos;
