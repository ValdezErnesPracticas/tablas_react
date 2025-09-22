const API_URL = import.meta.env.VITE_API_URL;

function getAllDepartamentos() {
  return fetch(`${API_URL}/departamento`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching departamentos:", error);
      throw error;
    });
}
function getDepartamento(id) {
  return fetch(`${API_URL}/departamento/${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data) return data;
      else return [];
    })
    .catch((error) => {
      console.error("Error fetching departamentos:", error);
      throw error;
    });
}
function PostDepartamento(params) {
  return fetch(`${API_URL}/departamento`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error creando departamento:", error);
      throw error;
    });
}
function PutDepartamento(id, params) {
  return fetch(`${API_URL}/departamento/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error actualizando departamento:", error);
      throw error;
    });
}
function deleteDepartamento(id) {
  return fetch(`${API_URL}/departamento/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error eliminando departamento:", error);
      throw error;
    });
}
export {
  getAllDepartamentos,
  getDepartamento,
  PostDepartamento,
  PutDepartamento,
  deleteDepartamento,
};
