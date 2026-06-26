export default function Footer() {
  return (
    <footer id='footer' className='footer'>
      <div className='footer-container'>
        <div className='footer-brand'>
          <span className='footer-logo' style={{ fontStyle: 'normal' }}>
          <span style={{ color: 'var(--accent)' }}>Pizza</span>
          <span style={{ color: '#fff' }}>Ita</span>
          <span style={{ color: 'var(--accent2)' }}>lia</span>
        </span>
          <p>Auténtica tradición napolitana horneada a la piedra con pasión artesanal.</p>
        </div>

        <div className='footer-links'>
          <h4>📍 Ubicación</h4>
          <p>Av. Condell 1234, Renca</p>
          <p>Santiago, Chile</p>
          <p>Contacto: contacto@pizzaitalia.cl</p>
        </div>

        <div className='footer-links'>
          <h4>🕒 Horarios</h4>
          <p>Martes a Jueves: 12:30 a 22:00 hrs</p>
          <p>Viernes y Sábado: 12:30 a 23:30 hrs</p>
          <p>Domingo: 12:30 a 21:00 hrs</p>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>© 2026 PizzaItalia. Todos los derechos reservados.</p>
        <p>Desarrollado por Angelo Zamora.</p>
        <p>Inacap Renca</p>
      </div>
    </footer>
  )
}