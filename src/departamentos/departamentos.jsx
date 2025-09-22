import PantallaCarga from "../assets/pantalla_carga";
import {
  getAllDepartamentos,
  getDepartamento,
  deleteDepartamento,
  PostDepartamento,
  PutDepartamento,
} from "../services/departamentos";
import { useEffect, useState } from "react";
import ".././App.css";
import { Modal, Button, Form } from "react-bootstrap";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function Departamentos() {
  const [componente, setComponente] = useState("Tabla");

  //tanstack
  const queryClient = useQueryClient();

  const {
    data: departamentos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["departamentos"],
    queryFn:  getAllDepartamentos,
    staleTime: 60 * 1000,
    cacheTime: 60 * 1000,
  });

  //Modales
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    subcuenta: "",
    descripcion: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const Cerrar = () => {
    setComponente("Tabla");
  };
  //Modal crear
  const onSaveCrear = async () => {
    await PostDepartamento(formData);
    queryClient.invalidateQueries({ queryKey: ["departamentos"] }); // refresca caché
    Cerrar();
  };
  //Modal editar
  const onSaveEditar = async () => {
    await PutDepartamento(formData.id, formData);
    queryClient.invalidateQueries({ queryKey: ["departamentos"] }); // refresca caché
    Cerrar();
  };

  if (isLoading) return <PantallaCarga />;
  if (isError) return <p>Error al cargar departamentos</p>;

  switch (componente) {
    case "Tabla":
      return (
        <>
          <button
            onClick={() => {
              setComponente("Nuevo");
            }}
          >
            Nuevo Departamento
          </button>
          <br />
          <br />
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
                      <a>
                        <button
                          onClick={() => {
                            formData.id = dep.id;
                            formData.nombre = dep.nombre;
                            formData.subcuenta = dep.subcuenta;
                            formData.descripcion = dep.descripcion;
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
                            confirm(
                              "¿Seguro que deseas eliminar este departamento?"
                            )
                          ) {
                            await deleteDepartamento(dep.id);
                            queryClient.invalidateQueries({
                              queryKey: ["departamentos"],
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
                  <td>No hay departamentos registrados.</td>
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
                placeholder="Nombre de departamento"
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3">
              <Form.Label>Subcuenta </Form.Label>
              <Form.Control
                type="text"
                name="subcuenta"
                maxLength={3}
                onChange={handleChange}
                value={formData.subcuenta}
                placeholder="Ingrese subcuenta"
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3">
              <Form.Label>Descripción </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Ingrese descripción"
              />
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
                placeholder="Nombre de departamento"
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3">
              <Form.Label>Subcuenta </Form.Label>
              <Form.Control
                type="text"
                name="subcuenta"
                maxLength={3}
                onChange={handleChange}
                value={formData.subcuenta}
                placeholder="Ingrese subcuenta"
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3">
              <Form.Label>Descripción </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Ingrese descripción"
              />
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

export default Departamentos;
