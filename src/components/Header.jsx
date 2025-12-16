import { useMemo } from 'react';
export default function Header({carrito, eliminarElemento, agregarCantidad, restarCantidad, limpiarCarrito}) {
    //state derivado
    const isEmpty = useMemo(() => carrito.length === 0, [carrito])
    const carritoTotal = useMemo(() => carrito.reduce((total, elemento) => total + (elemento.cantidad * elemento.price), 0), [carrito])
    
    return(
        <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        className="carrito"
                    >
                        <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                            
                            {isEmpty ? (
                                <p className="text-center">El carrito esta vacio</p>
                            ) : (
                                <>
                                    <table className="w-100 table">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {carrito.map( elemento => (
                                                <tr key={elemento.id}>
                                                    <td>
                                                        <img className="img-fluid" src={`/img/${elemento.image}.jpg`} alt="imagen guitarra" />
                                                    </td>
                                                    <td>{elemento.name}</td>
                                                    <td className="fw-bold">
                                                            {elemento.price}
                                                    </td>
                                                    <td className="flex align-items-start gap-4">
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick={() => restarCantidad(elemento.id)}
                                                        >
                                                            -
                                                        </button>
                                                            {elemento.cantidad}
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick={() => agregarCantidad(elemento.id)}
                                                        >
                                                            +
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger"
                                                            type="button"
                                                            onClick={() => eliminarElemento(elemento.id)}
                                                        >
                                                            X
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <p className="text-end">Total pagar: <span className="fw-bold">${carritoTotal}</span></p>
                                </>
                            )}
                            <button onClick={limpiarCarrito} type="button" className="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    )
}

//export default Header