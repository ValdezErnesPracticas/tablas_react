import PantallaCarga from "../assets/pantalla_carga";
import { getAllDepartamentos, getDepartamento , deleteDepartamento} from "../services/departamentos";
import { useEffect, useState } from "react";
import '.././App.css';

function Departamentos() {
    const [departamentos, setDepartamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState('');
    const [idBuscado, setIdBuscado] = useState(null);

    useEffect(() => {
        if (!idBuscado) return;
        const fetchById = async () => {
            setLoading(true);
            try {
                const data = await getDepartamento(idBuscado);
                setDepartamentos(data); 
            } catch (error) {
                setDepartamentos([]); 
            }
            setLoading(false);
        };
        fetchById();
    }, [idBuscado]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllDepartamentos();
            setDepartamentos(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    const redirigirPorId = (e) => {
        e.preventDefault();
        if (id.trim() === '') return;
        setIdBuscado(id);
    };

    if (loading) {
        return <PantallaCarga />;
    }
    return (
        <>
            <form onSubmit={redirigirPorId}>
                <div >
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Ingrese el ID"
                        required
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <button type="submit">Buscar por ID</button>
                </div>
            </form>
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
                                    <a >
                                        Editar
                                    </a>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            if (confirm('¿Seguro que deseas eliminar este departamento?')) {
                                                deleteDepartamento(dep.id);
                                                setDepartamentos(departamentos.filter(d => d.id !== dep.id));
                                            }
                                        }}
                                    >
                                        <button type="submit">
                                            Eliminar
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>
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
