import PantallaCarga from "../assets/pantalla_carga";
import { getAllDepartamentos, getDepartamento } from "../services/departamentos";
import { useEffect, useState } from "react";

function Departamentos() {
    const [departamentos, setDepartamentos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllDepartamentos();
            setDepartamentos(data);
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
                        <th>Subcuenta</th>
                        <th>Descripción</th>
                        <th width="200px">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {departamentos.length > 0 ? (
                        departamentos.map((dep) => (
                            <tr key={dep.id}>
                                <td>{dep.id}</td>
                                <td>{dep.nombre}</td>
                                <td>{dep.subcuenta}</td>
                                <td>{dep.descripcion}</td>
                                <td>
                                    <a href={`/departamento/${dep.id}/edit`} className="btn btn-warning btn-sm">
                                        Editar
                                    </a>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            if (confirm('¿Seguro que deseas eliminar este departamento?')) {
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
                                No hay departamentos registrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default Departamentos;
