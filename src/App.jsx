import { useState, useEffect, useRef } from 'react'
import './index.css'

const base = import.meta.env.BASE_URL

const photos = [
  { src: `${base}fotos/IMG_20260202_192515.jpg`, caption: 'A gente em Teresina curtindo uma academia porque a Ana não foi' },
  { src: `${base}fotos/IMG_20260329_172948.jpg`, caption: 'Pós natação - assinamos nossa promessa!!' },
  { src: `${base}fotos/IMG_20260401_133822.jpg`, caption: 'Nossa casa nova e onde somos muito felizes' },
  { src: `${base}fotos/IMG_20260502_123517.jpg`, caption: 'Nóis em Porto Alegre' },
  { src: `${base}fotos/IMG_20260502_140302.jpg`, caption: 'Pedalando na agua' },
  { src: `${base}fotos/IMG_20260503_171618.jpg`, caption: 'Lindos no guíba' },
  { src: `${base}fotos/IMG_20260523_121157.jpg`, caption: 'A nossa princezinha' },
  { src: `${base}fotos/IMG_20260523_193402.jpg`, caption: 'Meu lugar favorito: do seu lado' },
  { src: `${base}fotos/IMG_20260523_193415.jpg`, caption: 'SHUAAAA' },
]

const funnyCards = [
  {
    emoji: '🍕',
    title: 'Acordo de Casal #1',
    text: 'Eu finjo que nao vi voce comendo o ultimo pedaco de pizza, voce finge que nao me ouviu roncar.',
  },
  {
    emoji: '📱',
    title: 'Nosso Wifi',
    text: 'Se nosso amor fosse wifi, o sinal seria: "Conectado, velocidade excelente, sem previsao de queda".',
  },
  {
    emoji: '🛋️',
    title: 'Plano Perfeito',
    text: 'Meu plano pro fim de semana: eu, voce, um sofa e a desculpa de "ta muito frio pra sair".',
  },
  {
    emoji: '🤡',
    title: 'Verdade Inconveniente',
    text: 'Eu antes de te conhecer: "nunca vou ser dessa bobeira de paixonite". Eu agora: mando 47 figurinhas de coracao por dia.',
  },
]

const reasons = [
  'Porque voce ri das minhas piadas (mesmo as ruins)',
  'Porque voce me faz querer ser uma pessoa melhor',
  'Porque a gente junto vira uma dupla imbativel',
  'Porque seu sorriso eh a melhor coisa do meu dia',
  'Porque voce aguenta meus dramas (e eu os seus)',
  'Porque cada dia com voce eh uma nova aventura',
  'Porque voce eh minha melhor amiga e meu amor',
  'Porque simplesmente... eh voce. E isso basta.',
]

const heartEmojis = ['💕', '💖', '💗', '💝', '💘', '🥰', '😍', '❤️', '💜', '🌸']

function FloatingHearts() {
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: heartEmojis[i % heartEmojis.length],
    left: `${Math.random() * 100}%`,
    animationDuration: `${8 + Math.random() * 12}s`,
    animationDelay: `${Math.random() * 10}s`,
    fontSize: `${14 + Math.random() * 20}px`,
  }))

  return (
    <div className="floating-hearts">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: h.left,
            animationDuration: h.animationDuration,
            animationDelay: h.animationDelay,
            fontSize: h.fontSize,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  )
}

function useScrollReveal(deps = []) {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    const timer = setTimeout(() => {
      const elements = ref.current?.querySelectorAll('.section-animate')
      elements?.forEach((el) => observer.observe(el))
    }, 100)
    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, deps)
  return ref
}

function Confetti() {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    const colors = ['#ff6b9d', '#a55eea', '#ffd32a', '#ff4757', '#ff9ec2', '#7bed9f']
    const newPieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: `${2 + Math.random() * 3}s`,
      delay: `${Math.random() * 2}s`,
      size: `${8 + Math.random() * 12}px`,
      rotation: `${Math.random() * 360}deg`,
    }))
    setPieces(newPieces)
    const timer = setTimeout(() => setPieces([]), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDuration: p.duration,
            animationDelay: p.delay,
            transform: `rotate(${p.rotation})`,
          }}
        />
      ))}
    </>
  )
}

function App() {
  const [opened, setOpened] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [lightboxImg, setLightboxImg] = useState(null)
  const [counter, setCounter] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const containerRef = useScrollReveal([opened])

  const startDate = new Date('2024-03-15T00:00:00')

  useEffect(() => {
    const updateCounter = () => {
      const now = new Date()
      const diff = now - startDate
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setCounter({ days, hours, minutes, seconds })
    }
    updateCounter()
    const interval = setInterval(updateCounter, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleOpen = () => {
    if (!opened) {
      setOpened(true)
      setShowConfetti(true)
    }
  }

  return (
    <div ref={containerRef}>
      <FloatingHearts />
      {showConfetti && <Confetti />}

      {/* Hero */}
      <section className="hero">
        <div className="hero-envelope" onClick={handleOpen} role="button" tabIndex={0}>
          {opened ? '💌' : '✉️'}
        </div>
        <h1>{opened ? 'Feliz Dia dos Namorados!' : 'Voce tem uma carta de amor...'}</h1>
        <p className="subtitle">
          {opened
            ? 'Lu & Isa - Uma historia de amor (e muita zueira)'
            : 'Clica no envelope pra descobrir!'}
        </p>
        {opened && (
          <div className="scroll-hint">
            <span>Desce pra ver mais</span>
            <br />
            👇
          </div>
        )}
      </section>

      {opened && (
        <>
          {/* Love Counter */}
          <section className="counter-section section-animate">
            <h2>Nosso Amor em Numeros</h2>
            <p style={{ marginBottom: '1.5rem', fontFamily: "'Caveat', cursive", fontSize: '1.3rem' }}>
              Desde 15/03/2024 juntos e cada segundo vale a pena!
            </p>
            <div className="counter-boxes">
              <div className="counter-box">
                <span className="number">{counter.days}</span>
                <span className="label">Dias</span>
              </div>
              <div className="counter-box">
                <span className="number">{counter.hours}</span>
                <span className="label">Horas</span>
              </div>
              <div className="counter-box">
                <span className="number">{counter.minutes}</span>
                <span className="label">Min</span>
              </div>
              <div className="counter-box">
                <span className="number">{counter.seconds}</span>
                <span className="label">Seg</span>
              </div>
            </div>
          </section>

          {/* Funny Cards */}
          <section className="funny-section section-animate">
            <h2>Manual de Sobrevivencia do Namoro</h2>
            <div className="funny-cards">
              {funnyCards.map((card, i) => (
                <div className="funny-card" key={i}>
                  <div className="emoji">{card.emoji}</div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Photo Gallery */}
          <section className="gallery-section section-animate">
            <h2>Nossa Galeria do Amor</h2>
            <p style={{ marginBottom: '2rem', fontFamily: "'Caveat', cursive", fontSize: '1.3rem' }}>
              Cada foto conta um pedacinho da nossa historia
            </p>
            <div className="gallery-grid">
              {photos.map((photo, i) => (
                <div
                  className="gallery-item"
                  key={i}
                  onClick={() => setLightboxImg(photo.src)}
                >
                  <img src={photo.src} alt={photo.caption} loading="lazy" />
                  <div className="photo-caption">{photo.caption}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Love Letter */}
          <section className="letter-section section-animate">
            <div className="letter-container">
              <h2>Uma Cartinha pra Voce</h2>
              <div className="letter-text">
                <p>Isa,</p>
                <br />
                <p>
                  Amor, eu sei que a gente se conhece a pouco tempo (só 2 aninhos), 
                  mas parece que te conheco ha uma vida inteira.
                </p>
                <br />
                <p>
                  Voce eh a pessoa que faz meus dias mais leves, que transforma um dia qualquer 
                  em algo especial. Com voce eu rio mais, sonho mais e ate como mais (porque 
                  comer junto é realmente muito melhor).
                </p>
                <br />
                <p>
                  Obrigado por aguentar minhas manias, por rir comigo (e de mim), e por fazer 
                  parte da minha vida de um jeito que ninguem mais consegue.
                </p>
                <br />
                <p>
                  Esse site eh so uma pequena forma de dizer: eu te amo demais, meu amor!
                </p>
                <br />
                <p>
                  Feliz Dia dos Namorados! Que venham muitos mais.
                </p>
              </div>
              <div className="letter-signature">
                Com todo meu amor (e um pouco de IA),
                <br />
                Seu Lu 💕
              </div>
            </div>
          </section>

          {/* Reasons */}
          <section className="reasons-section section-animate">
            <h2>8 Motivos Pra Te Amar</h2>
            <p style={{ marginBottom: '2rem', fontFamily: "'Caveat', cursive", fontSize: '1.3rem' }}>
              (na real sao infinitos, mas o site nao ia aguentar)
            </p>
            <ul className="reasons-list">
              {reasons.map((reason, i) => (
                <li key={i}>
                  <span className="reason-num">#{i + 1}</span>
                  {reason}
                </li>
              ))}
            </ul>
          </section>

          {/* Music */}
          <section className="music-section section-animate">
            <h2>Nossa Musica</h2>
            <p className="music-subtitle">
              Dá um play e veja se recorda dessa musica que tem tudo a ver com a gente (e que eu acho que voce gosta, hein? 😏)
            </p>
            <div className="spotify-embed">
              <iframe
                src="https://open.spotify.com/embed/track/1RJJN0Q4lAwh13t2keNEFK?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ borderRadius: '12px' }}
                title="Spotify Player"
              />
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <h2>Lu & Isa</h2>
            <p>Desde 2024 causando juntos e que nunca pare!</p>
            <div className="big-heart">❤️</div>
            <p style={{ marginTop: '1rem', fontSize: '1rem', opacity: 0.5 }}>
              Feito com muito amor (e codigo -- brincadeira, é IA! hahaha) pra você!
            </p>
          </footer>
        </>
      )}

      {/* Lightbox */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <img src={lightboxImg} alt="Foto ampliada" />
        </div>
      )}
    </div>
  )
}

export default App
