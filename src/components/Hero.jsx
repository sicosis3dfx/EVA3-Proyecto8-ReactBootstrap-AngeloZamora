export default function Hero() {
    return (
        <section id='hero' className='hero'>
            <div className='hero-content'>
                <p className='hero-eyebrow'>Bienvenido a PizzaItalia</p>
                <h1 className='hero-title'>
                    Auténtica Pizza <br />
                    <span>Artesanal a la Piedra</span>
                </h1>
                <p className='hero-subtitle'>
                    Disfruta de la verdadera tradición napolitana con ingredientes 100% seleccionados y masa madre madurada por 48 horas.
                </p>
                <div className='hero-actions'>
                    {/* Estructura exacta del botón de video que mandó el profesor[cite: 4] */}
                    <a href='https://youtu.be/A51XH7C8Xv0?si=4_nSOHdfl4H1Gg3j' className='btn-secondary' target='_blank' rel='noopener noreferrer'>Ver video</a>
                    <a href='#features' className='btn-primary'>Ver Menú</a>
                    <a href='#footer' className='btn-secondary'>Reserva tu Mesa</a>
                </div>
            </div>
        </section>
    )
}