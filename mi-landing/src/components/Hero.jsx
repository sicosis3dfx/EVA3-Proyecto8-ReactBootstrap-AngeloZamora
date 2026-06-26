export default function Hero() {
  return (
    <section id='hero' className='hero'>
      <div className='hero-content'>
        <p className='hero-eyebrow'>Bienvenido a PizzaItalia</p>
        <h1 className='hero-title'>
          Auténtica Pizza <br />
          <span>Artesanal a la Piedra 🍕 </span>
        </h1>
        <p className='hero-subtitle'>
          Disfruta de la verdadera tradición napolitana con ingredientes 100% seleccionados y masa madre madurada por 48 horas.
        </p>
        <div className='hero-actions'>
          <a 
            href='https://youtu.be/HUll5SnavOw' 
            target='_blank' 
            rel='noopener noreferrer'
            style={{ background: '#f59e0b', color: '#111116', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', fontSize: '0.9rem', transition: 'background 0.2s, transform 0.15s', border: 'none', display: 'inline-block' }}
            onMouseOver={(e) => e.currentTarget.style.background = '#d97706'}
            onMouseOut={(e) => e.currentTarget.style.background = '#f59e0b'}
          >
            🐢 Colaboración Especial ¡HAZ CLICK!
          </a>
          
          <a 
            href='#features' 
            className='btn-primary'
          >
            Ver Menú 🍕
          </a>
          
          <a 
            href='#footer' 
            style={{ background: 'var(--accent)', color: '#111116', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', fontSize: '0.95rem', transition: 'background 0.2s, transform 0.15s', border: 'none', display: 'inline-block' }}
            onMouseOver={(e) => e.currentTarget.style.background = '#4ade80'}
            onMouseOut={(e) => e.currentTarget.style.background = 'var(--accent)'}
          >
            📅 Reserva tu Mesa
          </a>
        </div>
      </div>
    </section>
  )
}