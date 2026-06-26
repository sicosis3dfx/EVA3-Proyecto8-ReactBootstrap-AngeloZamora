import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import PizzaModal from './components/PizzaModal'
import './App.css'

export default function App() {
  const [carrito, setCarrito] = useState([])
  const [pizzaSeleccionada, setPizzaSeleccionada] = useState(null)
  const [verCarrito, setVerCarrito] = useState(false)
  const [notificacionReserva, setNotificacionReserva] = useState(null)

  const agregarAlCarrito = (nuevaPizzaConfigurada) => {
    const existe = carrito.find(
      item => item.id === nuevaPizzaConfigurada.id && item.tamano === nuevaPizzaConfigurada.tamano
    )

    if (existe) {
      setCarrito(carrito.map(item => 
        item.id === nuevaPizzaConfigurada.id && item.tamano === nuevaPizzaConfigurada.tamano
          ? { ...item, cantidad: item.cantidad + nuevaPizzaConfigurada.cantidad }
          : item
      ))
    } else {
      setCarrito([...carrito, nuevaPizzaConfigurada])
    }
  }

  const eliminarDelCarrito = (indiceAEliminar) => {
    setCarrito(carrito.filter((_, index) => index !== indiceAEliminar))
  }

  const calcularTotal = () => {
    const suma = carrito.reduce((acumulado, item) => {
      const precioBase = parseInt(item.precio.replace('$', '').replaceAll('.', ''), 10)
      const precioFinalUnidad = item.tamano === 'Familiar' ? precioBase + 3000 : precioBase
      return acumulado + (precioFinalUnidad * item.cantidad)
    }, 0)
    return '$' + suma.toLocaleString('es-CL')
  }

  const pagarPedido = () => {
    alert(`¡Tu pedido por un total de ${calcularTotal()} ha sido recibido! Pronto estará en el horno. 🍕`)
    setCarrito([])
    setVerCarrito(false)
  }

  useEffect(() => {
    if (notificacionReserva) {
      const timer = setTimeout(() => setNotificacionReserva(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [notificacionReserva])

  return (
    <>
      <Navbar carritoCount={carrito.reduce((acc, item) => acc + item.cantidad, 0)} onCartClick={() => setVerCarrito(true)} />
      <main>
        <Hero />
        <Features 
          agregarAlCarrito={agregarAlCarrito} 
          setPizzaSeleccionada={setPizzaSeleccionada} 
          setNotificacionReserva={setNotificacionReserva}
        />
      </main>
      
      <Footer />

      <PizzaModal 
        pizza={pizzaSeleccionada} 
        onClose={() => setPizzaSeleccionada(null)} 
        agregarAlCarrito={agregarAlCarrito}
      />

      {verCarrito && (
        <div className="modal-overlay" onClick={() => setVerCarrito(false)}>
          <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setVerCarrito(false)}>&times;</button>
            <div className="modal-body-custom" style={{ textAlign: 'left' }}>
              <h2>🛒 Tu Pedido Actual</h2>
              {carrito.length === 0 ? (
                <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>Tu carrito está vacío. ¡Añade una pizza! 🍕</p>
              ) : (
                <>
                  <div className="carrito-scroll-container">
                    {carrito.map((item, index) => {
                      const base = parseInt(item.precio.replace('$', '').replaceAll('.', ''), 10)
                      const precioFinalUnidad = item.tamano === 'Familiar' ? base + 3000 : base
                      const subtotalItem = precioFinalUnidad * item.cantidad

                      return (
                        <div key={index} className="carrito-item-row" style={{ fontSize: '0.9rem' }}>
                          <div>
                            <span>{item.icon} <strong>{item.nombre}</strong></span>
                            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--muted)' }}>
                              Tamaño: {item.tamano} | Cantidad: {item.cantidad}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ color: 'var(--accent2)', fontWeight: '700' }}>
                              {'$' + subtotalItem.toLocaleString('es-CL')}
                            </span>
                            <button onClick={() => eliminarDelCarrito(index)} className="btn-delete-item">
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="carrito-total-box">
                    <span>Total a Pagar:</span>
                    <span className="total-amount">{calcularTotal()}</span>
                  </div>
                  <div className="modal-footer-custom">
                    <button className="btn-pizza-secondary" onClick={() => setVerCarrito(false)}>Seguir Mirando</button>
                    <button className="btn-primary" onClick={pagarPedido}>Enviar Orden 🚀</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}