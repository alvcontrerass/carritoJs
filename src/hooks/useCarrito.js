import { useState, useEffect } from "react";
import db from "../data/db";
import { useMemo } from 'react';

export function useCarrito() {
    const carritoInicial = () => {
		const carritoLocalStorage = localStorage.getItem("carrito");
		return carritoLocalStorage ? JSON.parse(carritoLocalStorage) : [];
	}

	const [data, setData] = useState([]);
    const [carrito, setCarrito] = useState(carritoInicial);
	
	const ELEMENTO_MAXIMO = 10
	const ELEMENTO_MINIMO = 1

    //useEffect para cargar las guitarras desde db
	useEffect(() => {
		setData(db);
	}, []);

	useEffect(() => {
		localStorage.setItem("carrito", JSON.stringify(carrito))
	}, [carrito])

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

	    //state derivado
    const verificacionCarritoVacio = useMemo(() => carrito.length === 0, [carrito])
    const carritoTotal = useMemo(() => carrito.reduce((total, elemento) => total + (elemento.cantidad * elemento.price), 0), [carrito])
    

    return {
        data,
        carrito,
        agregarCarrito,
        eliminarElemento,
        agregarCantidad,
        restarCantidad,
        limpiarCarrito,
		verificacionCarritoVacio,
		carritoTotal
    }
}

