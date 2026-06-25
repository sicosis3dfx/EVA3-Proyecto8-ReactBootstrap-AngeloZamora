import { useState } from 'react'

export default function Navbar({ carritoCount, onCartClick }) {
  const [isopen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <a href='#' className='navbar-logo'>Pizza<span>Italia</span></a>
        
        <ul className='navbar-links'>
          <li><a href='#hero'>Inicio</a></li>
          <li><a href='#features'>Nuestro Menú</a></li>
          <li><a href='#footer'>Reservas</a></li>
          <li>
            {/* Reemplazamos el href por la función onClick de React */}
            <button className='navbar-cta' onClick={onCartClick} style={{ border: 'none', cursor: 'pointer' }}>
              <i className="bi bi-cart3"></i> Pedido ({carritoCount})
            </button>
          </li>
        </ul>

        <button 
          className={`hamburger ${isopen ? 'open' : ''}`} 
          onClick={() => setIsOpen(!isopen)}
          aria-label='Toggle menu'
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`mobile-menu ${isopen ? 'open' : ''}`}>
        <a href='#hero' onClick={closeMenu}>Inicio</a>
        <a href='#features' onClick={closeMenu}>Nuestro Menú</a>
        <a href='#footer' onClick={closeMenu}>Reservas</a>
        {/* En mobile también abre el visor del carrito[cite: 2] */}
        <button className='navbar-cta' onClick={() => { onCartClick(); closeMenu(); }} style={{ border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
          <i className="bi bi-cart3"></i> Pedido ({carritoCount})
        </button>
      </div>
    </nav>
  )
}