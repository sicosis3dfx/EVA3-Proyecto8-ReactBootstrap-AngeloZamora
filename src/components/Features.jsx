import { useState, useEffect } from 'react'

const MENU_PIZZAS = [
  {
    categoria: "Tradicionales",
    pizzas: [
      { id: 1, nombre: "Margherita", precio: "$8.990", desc: "Salsa de tomates artesanales, mozzarella fresca, albahaca y aceite de oliva virgen.", icon: "🍕" },
      { id: 2, nombre: "Pepperoni", precio: "$9.990", desc: "Doble porción de pepperoni premium americano combinado con queso mozzarella fundido.", icon: "🥓" }
    ]
  },
  {
    categoria: "Especialidades",
    pizzas: [
      { id: 3, nombre: "PizzaItalia Suprema", precio: "$11.990", desc: "Jamón serrano, rúcula fresca, lascas de parmesano madurado y reducción de balsámico.", icon: "🇮🇹" },
      { id: 4, nombre: "Cuatro Quesos", precio: "$10.990", desc: "Mezcla perfecta de Mozzarella, Gorgonzola, Parmesano y Ricotta cremosa.", icon: "🧀" }
    ]
  }
]

const IMAGENES_CARRUSEL = [
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=600&auto=format&fit=crop"
]

export default function Features({ agregarAlCarrito, setPizzaSeleccionada }) {
  const [categoriaActiva, setCategoriaActiva] = useState(0)
  const [fotoActiva, setFotoActiva] = useState(0)
  const [fadeState, setFadeState] = useState('fade-in') // Controla el estado visual de la opacidad
  
  const [formData, setFormData] = useState({ nombre: '', personas: '2', fecha: '' })
  const [error, setError] = useState('')
  const [exito, setExito] = useState(false)

  // Función unificada que maneja el parpadeo de difuminado
  const cambiarImagenConEfecto = (nuevoIndice) => {
    setFadeState('fade-out')
    setTimeout(() => {
      setFotoActiva(nuevoIndice)
      setFadeState('fade-in')
    }, 200) // Tiempo exacto que dura la salida de opacidad
  }

  const siguienteFoto = () => {
    const siguiente = (fotoActiva + 1) % IMAGENES_CARRUSEL.length
    cambiarImagenConEfecto(siguiente)
  }

  const anteriorFoto = () => {
    const anterior = (fotoActiva - 1 + IMAGENES_CARRUSEL.length) % IMAGENES_CARRUSEL.length
    cambiarImagenConEfecto(anterior)
  }

  // ===== AUTOMATIZACIÓN: Avanzar solito cada 4 segundos =====
  useEffect(() => {
    const intervalo = setInterval(() => {
      siguienteFoto()
    }, 4000)

    // Limpieza obligatoria del ciclo de vida para evitar fugas de memoria
    return () => clearInterval(intervalo)
  }, [fotoActiva])

  const handleReserva = (e) => {
    e.preventDefault()
    if (!formData.nombre.trim() || !formData.fecha) {
      setError('Por favor, completa todos los campos obligatorios (*).')
      setExito(false)
      return
    }

    const reglaSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
    if (!reglaSoloLetras.test(formData.nombre)) {
      setError('El nombre no puede contener números ni caracteres especiales.')
      setExito(false)
      return
    }
    
    try {
      const reservasExistentes = JSON.parse(localStorage.getItem('reservas_pizzeria')) || []
      const nuevaReserva = {
        nombre: formData.nombre.trim(),
        fecha: formData.fecha,
        personas: formData.personas,
        id: Date.now()
      }
      
      const listaActualizada = [...reservasExistentes, nuevaReserva]
      localStorage.setItem('reservas_pizzeria', JSON.stringify(listaActualizada))
      
      setError('')
      setExito(true)
      setFormData({ nombre: '', personas: '2', fecha: '' })
    } catch (err) {
      setError('Ocurrió un error al intentar guardar tu reserva.')
      setExito(false)
    }
  }

  return (
    <section id='features' className='features'>
      <div className='features-container'>
        
        {/* ===== CARRUSEL INTERACTIVO AUTOMATIZADO ===== */}
        <p className='section-eyebrow'>Galería Artesanal</p>
        <h2 className='section-title' style={{ marginBottom: '2rem' }}>Nuestras Especialidades en el Horno</h2>
        
        <div className="carrusel-wrapper">
          {/* Botones de navegación integrados y estilizados a los lados */}
          <button className="carrusel-btn btn-izq" onClick={anteriorFoto} aria-label="Anterior">
            <i className="bi bi-chevron-left"></i>
          </button>
          
          <div className="carrusel-slide">
            <img 
              src={IMAGENES_CARRUSEL[fotoActiva]} 
              alt="Pizza Especialidad" 
              className={`carrusel-img ${fadeState}`} 
            />
          </div>
          
          <button className="carrusel-btn btn-der" onClick={siguienteFoto} aria-label="Siguiente">
            <i className="bi bi-chevron-right"></i>
          </button>
          
          {/* Puntitos de selección inferiores */}
          <div className="carrusel-indicadores">
            {IMAGENES_CARRUSEL.map((_, idx) => (
              <span 
                key={idx} 
                className={`indicador-dot ${fotoActiva === idx ? 'active' : ''}`}
                onClick={() => cambiarImagenConEfecto(idx)}
              />
            ))}
          </div>
        </div>

        <div style={{ marginTop: '5rem' }}>
          <p className='section-eyebrow'>Nuestro Menú Artesanal</p>
          <h2 className='section-title'>Elige tu Pizza Favorita</h2>
        </div>

        {/* ===== ACORDEÓN DE CATEGORÍAS ===== */}
        <div className="accordion-wrapper">
          {MENU_PIZZAS.map((item, index) => {
            const estaAbierto = categoriaActiva === index
            return (
              <div className="accordion-item-custom" key={item.categoria}>
                <button 
                  className={`accordion-trigger ${estaAbierto ? 'active' : ''}`}
                  onClick={() => setCategoriaActiva(estaAbierto ? null : index)}
                >
                  {item.categoria}
                  <span className="accordion-arrow">{estaAbierto ? '▲' : '▼'}</span>
                </button>

                {estaAbierto && (
                  <div className="accordion-content-custom">
                    <div className='features-grid'>
                      {item.pizzas.map((pizza) => (
                        <div className='feature-card' key={pizza.id}>
                          <div className='feature-icon'>{pizza.icon}</div>
                          <h3>{pizza.nombre}</h3>
                          <p>{pizza.desc}</p>
                          <span className="pizza-price">{pizza.precio} <span style={{fontSize:'0.75rem', color:'var(--muted)', fontWeight:'normal'}}>(Mediana)</span></span>
                          
                          <div className="pizza-card-actions">
                            <button className="btn-pizza-primary" style={{width: '100%'}} onClick={() => setPizzaSeleccionada(pizza)}>
                              Configurar y Añadir 🛒
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* ===== FORMULARIO DE RESERVAS ===== */}
        <div style={{ marginTop: '5rem', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', padding: '2rem', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px' }}>
          <p className='section-eyebrow'>Planifica tu Visita</p>
          <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '800' }}>📅 Reserva tu Mesa en Vivo</h3>
          
          <form onSubmit={handleReserva} className="reserva-form">
            <input 
              type="text" 
              placeholder="Tu Nombre *" 
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="form-input"
            />
            <input 
              type="datetime-local" 
              value={formData.fecha}
              onChange={(e) => setFormData({...formData, fecha: e.target.value})}
              className="form-input"
            />
            <select 
              value={formData.personas}
              onChange={(e) => setFormData({...formData, personas: e.target.value})}
              className="form-input"
            >
              <option value="1">1 Persona</option>
              <option value="2">2 Personas</option>
              <option value="4">4 Personas</option>
              <option value="6">6 Personas</option>
            </select>

            {error && <p className="msg-error" style={{ marginTop: '0.5rem' }}>{error}</p>}
            {exito && <p className="msg-success" style={{ marginTop: '0.5rem', fontSize: '1rem', fontWeight: '700' }}>¡Mesa reservada con éxito! 🎉 Su cupo quedó guardado en el sistema.</p>}

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.75rem' }}>
              Confirmar Reserva
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}