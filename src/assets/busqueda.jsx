function busqueda() {
    return (
        <form action="" method="GET" onsubmit="return redirigirPorId(event)">
        <div class="input-group mb-3">
            <input type="number" id="idInput" class="form-control" placeholder="Ingrese el ID" required>
            <button type="submit" class="btn btn-primary">Buscar por ID</button>
        </div>
        </form>
    )
}
export default busqueda;