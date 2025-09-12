import { getAllPuestos,getPuesto,DeletePuesto } from "../services/Puestos";
import { useEffect, useState } from "react";
import '.././App.css';
import PantallaCarga from "../assets/pantalla_carga";

function Puestos() {
    const [Puestos, setPuestos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState('');
    const [idBuscado, setIdBuscado] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllPuestos();
            setPuestos(data);
            setLoading(false);
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (!idBuscado) return;
        const fetchById = async () => {
            setLoading(true);
            try {
                const data = await getPuesto(idBuscado);
                setPuestos(data);
            } catch (error) {
                setDepartamentos([]); 
            }
            setLoading(false);
        };
        fetchById();
    }, [idBuscado]);

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
                                                DeletePuesto(P.id);
                                                setPuestos(Puestos.filter(p => p.id !== P.id));
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
