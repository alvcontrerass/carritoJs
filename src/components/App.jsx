import { useState, useEffect } from "react";
import db from "../data/db";
import Guitarra from "./Guitarra";
import Header from "./Header";



function App() {
	const [data, setData] = useState([]);
    const [carrito, setCarrito] = useState([]);
	
	const ELEMENTO_MAXIMO = 10
	const ELEMENTO_MINIMO = 1

    //useEffect para cargar las guitarras desde db
	useEffect(() => {
		setData(db);
	}, []);

    function agregarCarrito(elemento) {
        const existeElemento = carrito.findIndex(elementos => elementos.id === elemento.id)
        if (existeElemento >= 0) {
			if(carrito[existeElemento].cantidad >= ELEMENTO_MAXIMO) return
            const carritoActualizado = [...carrito]
            carritoActualizado[existeElemento].cantidad++
            setCarrito(carritoActualizado)
        } else {
            elemento.cantidad = 1
            setCarrito([...carrito, elemento])
        }
        
    }

	function eliminarElemento(id) {
		setCarrito(preCarrito => preCarrito.filter(elementos => elementos.id !== id))
	}

	function agregarCantidad(id) {
		const carritoActualizado = carrito.map( elemento => {
			if(elemento.id === id && elemento.cantidad < ELEMENTO_MAXIMO) {
				return {
					...elemento, cantidad: elemento.cantidad + 1
				}
			}
			return elemento;
		})
		setCarrito(carritoActualizado)
	}

	function restarCantidad(id) {
		const carritoActualizado = carrito.map( elemento => {
			if(elemento.id === id && elemento.cantidad > ELEMENTO_MINIMO) {
				return {
					...elemento, cantidad: elemento.cantidad - 1
				}
			}
			return elemento
		})
		setCarrito(carritoActualizado)
	}

	function limpiarCarrito() {
		setCarrito([])
	}

	return (
		<>
			<Header
				carrito={carrito}
				eliminarElemento={eliminarElemento}
				agregarCantidad={agregarCantidad}
				restarCantidad={restarCantidad}
				limpiarCarrito={limpiarCarrito}
			/>
			<main className="container-xl mt-5">
				1<h2 className="text-center">Nuestra Colección</h2>
				<div className="row mt-5">
					{data.map((guitarra) => (
                        <Guitarra 
                            key={guitarra.id}
                            guitarra={guitarra}
                            setCarrito={setCarrito}
                            agregarCarrito={agregarCarrito}
                        />
                    )
                )}
				</div>
			</main>

			<footer className="bg-dark mt-5 py-5">
				<div className="container-xl">
					<p className="text-white text-center fs-4 mt-4 m-md-0">
						GuitarLA - Todos los derechos Reservados
					</p>
				</div>
			</footer>
		</>
	);
}

export default App;
