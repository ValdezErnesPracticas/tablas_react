import PantallaCarga from "../assets/pantalla_carga";
import { getAllPuestos, getPuesto , deletePuesto, postPuesto, putPuesto} from "../services/puestos";
import { useEffect, useState } from "react";
import '.././App.css';
import { Modal, Button, Form } from "react-bootstrap";

function Puestos() {
    const [Puestos, setPuestos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState('');
    const [idBuscado, setIdBuscado] = useState(null);

    const [componente, setComponente] = useState('Tabla');

    //Modales
    const [formData, setFormData] = useState({
        id: "",
        nombre: "",
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const Cerrar = () => {
        setComponente('Tabla');
    }
    //Modal crear
    const onSaveCrear = async() => {
        await postPuesto(formData); 
        fetchData()
        Cerrar();
    };
    //Modal Editar
    const onSaveEditar = async() => {
        await putPuesto(formData.id, formData);
        fetchData();
        Cerrar();
    }

    useEffect(() => {
        if (!idBuscado) return;
        const fetchById = async () => {
            setLoading(true);
            try {
                const data = await getPuesto(idBuscado);
                setPuestos(data); 
            } catch (error) {
                setPuestos([]); 
            }
            setIdBuscado(null);
            setLoading(false);
        };
        fetchById();
    }, [idBuscado]);

        const fetchData = async () => {
            setLoading(true);
            const data = await getAllPuestos();
            setPuestos(data);
            setLoading(false);
        };
    useEffect(() => {
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
    switch (componente) {
        case 'Tabla':
            return(
            <>
                <button onClick={()=>{setComponente('Nuevo')}}>Nuevo Puesto</button>
                <button onClick={()=>{fetchData()}}>Ver Todos</button>
                <br />
                <br />
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
                            Puestos.map((puest) => (
                                <tr key={puest.id}>
                                    <td>{puest.id}</td>
                                    <td>{puest.nombre}</td>
                                    <td>
                                        <a >
                                            <button onClick={() => {
                                                formData.id= puest.id;
                                                formData.nombre=puest.nombre;
                                                setComponente('Editar');
                                                }}
                                            >                          
                                                Editar
                                            </button>
                                        </a>
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                if (confirm('¿Seguro que deseas eliminar este Puesto?')) {
                                                    deletePuesto(puest.id);
                                                    setPuestos(Puestos.filter(p => p.id !== puest.id));
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
                                    No hay Puestos registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
            )
            break;
        case 'Nuevo':
            return(
                <>
                    <Modal.Title>Crear Registro</Modal.Title>
                    <Form>
                    <Form.Group>
                        <Form.Label>Nombre  </Form.Label>
                        <Form.Control
                        type="text"
                        name="nombre"
                        onChange={handleChange}
                        value={formData.nombre}
                        placeholder="Nombre de Puesto"
                        />
                    </Form.Group>
                    <br/>
                    </Form>
                    <br />
                    <Button variant="secondary" onClick={Cerrar}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={onSaveCrear}>
                        Guardar
                    </Button>
                </>
            )
            break;
        case 'Editar':
            return(
            <>
                    <Modal.Title>Editar Registro</Modal.Title>
                    <Form>
                    <Form.Group>
                        <Form.Label>Nombre  </Form.Label>
                        <Form.Control
                        type="text"
                        name="nombre"
                        onChange={handleChange}
                        value={formData.nombre}
                        placeholder="Nombre de Puesto"
                        />
                    </Form.Group>
                    </Form>
                    <br />
                    <Button variant="secondary" onClick={Cerrar}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={onSaveEditar}>
                        Guardar
                    </Button>            </>
            )
        default:
            <h1>Holaaaaaaa</h1>
            break;
    }
}

export default Puestos;
