const API_URL = import.meta.env.VITE_API_URL;

function getAllPuestos() {
    return fetch(`${API_URL}/puesto`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data.puesto;
        })
        .catch(error => {
            console.error('Error fetching Puestos:', error);
            throw error;
        });
}
function getPuesto(id) {
    return fetch(`${API_URL}/puesto/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log('Puesto fetched:', data);
            return data.puesto;
        })
        .catch(error => {
            console.error('Error fetching puesto:', error);
            throw error;
        });
}
function PostPuesto(params) {
    return fetch(`${API_URL}/puesto`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Puesto creado:', data);
            return data;
        })
        .catch(error => {
            console.error('Error creando puesto:', error);
            throw error;
        });
}
function PutPuesto(id, params) {
    return fetch(`${API_URL}/puesto/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Puesto actualizado:', data);
            return data;
        })
        .catch(error => {
            console.error('Error actualizando puesto:', error);
            throw error;
        });
}
function DeletePuesto(id) {
    return fetch(`${API_URL}/puesto/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log('Puesto eliminado:', data);
            return data;
        })
        .catch(error => {
            console.error('Error eliminando puesto:', error);
            throw error;
        });
} 
export { getAllPuestos, getPuesto, PostPuesto, PutPuesto, DeletePuesto };