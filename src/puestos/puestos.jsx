import PantallaCarga from "../assets/pantalla_carga";
import {
  getAllPuestos,
  getPuesto,
  deletePuesto,
  postPuesto,
  putPuesto,
} from "../services/puestos";
import ".././App.css";
import { Modal, Button, Form } from "react-bootstrap";
import { use, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllDepartamentos } from "../services/departamentos";

function Puestos() {
  const [componente, setComponente] = useState("Tabla");

  const queryClient = useQueryClient();

  const {
    data: puestos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["puestos"],
    queryFn: getAllPuestos,
    staleTime: 60 * 1000,
    cacheTime: 60 * 1000,
  });
  const {
    data: departamentos
  }=useQuery({
        queryKey: ["departamentos"],
        queryFn: getAllDepartamentos,
        staleTime: 60 * 1000,
        cacheTime: 60 * 1000
  })
  //Modales
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    departamento_id: "",
    departamento: null,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const Cerrar = () => {
    setComponente("Tabla");
  };
  //Modal crear
  const onSaveCrear = async () => {
    await postPuesto(formData);
    queryClient.invalidateQueries({ queryKey: ["puestos"] });
    Cerrar();
  };
  //Modal Editar
  const onSaveEditar = async () => {
    await putPuesto(formData.id, formData);
    queryClient.invalidateQueries({ queryKey: ["puestos"] });
    Cerrar();
  };

  if (isLoading) return <PantallaCarga />;
  if (isError) return <p>Error al cargar Puestos</p>;

  switch (componente) {
    case "Tabla":
      return (
        <>
          <button
            onClick={() => {
              setComponente("Nuevo");
            }}
          >
            Nuevo Puesto
          </button>
          <br />
          <br />
          <table className="table">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Departamento</th>
                <th width="200px">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {puestos.length > 0 ? (
                puestos.map((puest) => (
                  <tr key={puest.id}>
                    <td>{puest.id}</td>
                    <td>{puest.nombre}</td>
                    <td>
                      {puest.departamento ? puest.departamento.nombre : "N/A"}
                    </td>
                    <td>
                      <a>
                        <button
                          onClick={() => {
                            formData.id = puest.id;
                            formData.nombre = puest.nombre;
                            formData.departamento_id = puest.departamento
                              ? puest.departamento.id
                              : "";
                            setComponente("Editar");
                          }}
                        >
                          Editar
                        </button>
                      </a>
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          if (
                            confirm("¿Seguro que deseas eliminar este Puesto?")
                          ) {
                            await deletePuesto(puest.id);
                            queryClient.invalidateQueries({
                              queryKey: ["puestos"],
                            });
                          }
                        }}
                      >
                        <button type="submit">Eliminar</button>
                      </form>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No hay Puestos registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      );
      break;
    case "Nuevo":
      return (
        <>
          <Modal.Title>Crear Registro</Modal.Title>
          <Form>
            <Form.Group>
              <Form.Label>Nombre </Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                onChange={handleChange}
                value={formData.nombre}
                placeholder="Nombre de Puesto"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Departamento</Form.Label>
              <Form.Select
                name="departamento_id"
                onChange={handleChange}
                value={formData.departamento_id || ""}
              >
                <option value="">Selecciona un departamento</option>
                {departamentos.map((dep) => (
                  <option key={dep.id} value={dep.id}>
                    {dep.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <br />
          </Form>
          <br />
          <Button variant="secondary" onClick={Cerrar}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onSaveCrear}>
            Guardar
          </Button>
        </>
      );
      break;
    case "Editar":
      return (
        <>
          <Modal.Title>Editar Registro</Modal.Title>
          <Form>
            <Form.Group>
              <Form.Label>Nombre </Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                onChange={handleChange}
                value={formData.nombre}
                placeholder="Nombre de Puesto"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Departamento</Form.Label>
              <Form.Select
                name="departamento_id"
                onChange={handleChange}
                value={formData.departamento_id || ""}
              >
                <option value="">Selecciona un departamento</option>
                {departamentos.map((dep) => (
                  <option key={dep.id} value={dep.id}>
                    {dep.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <br />
          </Form>
          <br />
          <Button variant="secondary" onClick={Cerrar}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onSaveEditar}>
            Guardar
          </Button>{" "}
        </>
      );
    default:
      <h1>Holaaaaaaa</h1>;
      break;
  }
}

export default Puestos;
