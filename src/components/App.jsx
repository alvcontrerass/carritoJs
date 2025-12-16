import { useState, useEffect } from "react";
import db from "../data/db";
import Guitarra from "./Guitarra";
import Header from "./Header";



function App() {
	const [data, setData] = useState([]);
    const [carrito, setCarrito] = useState([]);

    //useEffect para cargar las guitarras desde db
	useEffect(() => {
		setData(db);
	}, []);

    function agregarCarrito(elemento) {
        const existeElemento = carrito.findIndex(elementos => elementos.id === elemento.id)
        if (existeElemento >= 0) {
            const carritoActualizado = [...carrito]
            carritoActualizado[existeElemento].cantidad++
            setCarrito(carritoActualizado)
        } else {
            elemento.cantidad = 1
            setCarrito([...carrito, elemento])
        }
        
    }

	return (
		<>
			<Header />
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
