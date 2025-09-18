import './pantalla_carga.css';

function PantallaCarga() {
    return (
        <div className="loader-container">
            <div>
            <div className="loader"></div>
            <div className="loading-text">Cargando, por favor espera...</div>
            </div>
        </div>
    )
}
export default PantallaCarga;