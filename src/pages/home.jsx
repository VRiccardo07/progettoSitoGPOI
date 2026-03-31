import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  /* ── HERO ── */
  .hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: calc(100vh - 60px);
  }

  .hero-left {
    background: var(--ink);
    padding: 80px 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }

  .hero-left::after {
    content: '';
    position: absolute;
    right: 0; top: 0; bottom: 0;
    width: 1px;
    background: var(--rust);
  }

  .hero-eyebrow {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--rust-light);
    margin-bottom: 32px;
    font-weight: 400;
  }

  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(42px, 5vw, 68px);
    font-weight: 700;
    color: #f5f2eb;
    line-height: 1.05;
    margin-bottom: 16px;
  }

  .hero-title em {
    font-style: italic;
    color: var(--rust-light);
  }

  .hero-subtitle {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--mist);
    margin-bottom: 40px;
    font-weight: 400;
  }

  .hero-desc {
    font-size: 15px;
    line-height: 1.85;
    color: #9a9690;
    max-width: 420px;
    font-weight: 300;
  }

  .hero-right {
    background: #232019;
    padding: 80px 60px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 48px;
  }

  /* stat grid */
  .stat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: #3a3630;
    border: 1px solid #3a3630;
  }

  .stat-cell {
    background: #232019;
    padding: 28px 24px;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .stat-cell.vis { opacity: 1; transform: translateY(0); }

  .stat-number {
    font-family: 'Playfair Display', serif;
    font-size: 34px;
    color: var(--rust-light);
    font-weight: 700;
    line-height: 1;
    margin-bottom: 8px;
  }

  .stat-label {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #666;
    line-height: 1.5;
  }

  .hero-quote {
    border-left: 2px solid var(--rust);
    padding-left: 20px;
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 15px;
    color: #888;
    line-height: 1.7;
  }

  .hero-quote cite {
    display: block;
    font-style: normal;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #555;
    margin-top: 10px;
  }

  /* ── STORIA ── */
  .section-storia {
    display: grid;
    grid-template-columns: 120px 1fr 1fr;
    min-height: 55vh;
  }

  .section-label-bar {
    background: var(--rust);
    display: flex;
    align-items: center;
    justify-content: center;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #f5f2eb;
  }

  .storia-text {
    padding: 72px 56px;
    background: var(--paper);
    border-right: 1px solid var(--mist);
  }

  .section-num {
    font-family: 'Playfair Display', serif;
    font-size: 72px;
    color: var(--mist);
    font-weight: 700;
    line-height: 1;
    margin-bottom: 20px;
  }

  .section-heading {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 20px;
    line-height: 1.25;
  }

  .body-text {
    font-size: 15px;
    line-height: 1.9;
    color: var(--text-muted);
    font-weight: 300;
  }

  .storia-timeline {
    padding: 72px 56px;
    background: var(--paper);
  }

  .tl-item {
    display: flex;
    gap: 18px;
    margin-bottom: 28px;
    opacity: 0;
    transform: translateX(16px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  .tl-item.vis { opacity: 1; transform: translateX(0); }

  .tl-year {
    font-family: 'Playfair Display', serif;
    font-size: 12px;
    color: var(--rust);
    font-weight: 700;
    min-width: 44px;
    padding-top: 2px;
  }

  .tl-content {
    border-top: 1px solid var(--mist);
    padding-top: 8px;
    flex: 1;
  }

  .tl-title {
    font-size: 13px;
    font-weight: 500;
    color: var(--ink);
    margin-bottom: 4px;
  }

  .tl-desc {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.65;
  }

  /* ── DUALITÀ ── */
  .section-dualita {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .dual-col {
    padding: 72px 56px;
    position: relative;
  }

  .dual-col::before {
    position: absolute;
    top: 32px; left: 56px;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 400;
  }

  .dual-problema {
    background: #1c1a13;
  }

  .dual-problema::before {
    content: 'Problema';
    color: var(--rust-light);
  }

  .dual-soluzione {
    background: var(--green-dark);
  }

  .dual-soluzione::before {
    content: 'Soluzione';
    color: #7dd3a8;
  }

  .dual-heading {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 700;
    color: #f5f2eb;
    margin: 36px 0 20px;
    line-height: 1.3;
  }

  .dual-intro {
    font-size: 14px;
    color: #9a9690;
    line-height: 1.8;
    margin-bottom: 24px;
  }

  .impact-list li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 11px 0;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    font-size: 13px;
    color: #aaa;
    line-height: 1.55;
  }

  .impact-list li:last-child { border-bottom: none; }

  .dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    margin-top: 5px;
    flex-shrink: 0;
  }

  .dot-rust  { background: var(--rust-light); }
  .dot-green { background: #7dd3a8; }

  .cta-btn {
    display: inline-block;
    margin-top: 32px;
    padding: 11px 26px;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 400;
    border: none;
    transition: opacity 0.2s;
  }

  .cta-btn:hover { opacity: 0.72; }
  .btn-rust  { background: var(--rust); color: #f5f2eb; }
  .btn-green { background: #7dd3a8; color: var(--green-dark); }

  /* ── BOTTOM BANNER ── */
  .bottom-banner {
    background: var(--ink);
    padding: 56px 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
  }

  .banner-text {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-style: italic;
    color: #f5f2eb;
    max-width: 580px;
    line-height: 1.5;
  }

  .banner-text strong {
    font-style: normal;
    color: var(--rust-light);
  }

  .banner-btns {
    display: flex;
    gap: 12px;
    flex-shrink: 0;
  }

  .btn-outline {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.25);
    color: #f5f2eb;
    padding: 11px 26px;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    transition: opacity 0.2s;
  }

  .btn-outline:hover { opacity: 0.7; }

  /* ── RESPONSIVE ── */
  @media (max-width: 960px) {
    .hero,
    .section-dualita { grid-template-columns: 1fr; }

    .section-storia { grid-template-columns: 1fr; }
    .section-label-bar {
      writing-mode: horizontal-tb;
      transform: none;
      height: 44px;
      width: 100%;
    }

    .hero-left, .hero-right,
    .storia-text, .storia-timeline,
    .dual-col { padding: 48px 28px; }

    .bottom-banner {
      flex-direction: column;
      padding: 40px 28px;
      text-align: center;
    }

    .banner-btns { justify-content: center; }
    .dual-col::before { left: 28px; }
  }
`;

const STATS = [
  { num: "3.500+", label: "Addetti diretti e indiretti" },
  { num: "~40%",   label: "PIL industriale di Terni" },
  { num: "120+",   label: "Anni di storia produttiva" },
  { num: "4",      label: "Multinazionali nel sito" },
];

const TIMELINE = [
  { year: "1885",  title: "Fondazione",        desc: "Nasce lo stabilimento per la produzione di carburo di calcio sfruttando l'energia idroelettrica del Nera." },
  { year: "1930s", title: "Espansione chimica", desc: "Il sito si trasforma in polo petrolchimico con produzione di fertilizzanti e prodotti azotati." },
  { year: "1970s", title: "Crisi e riconversione", desc: "La crisi energetica impone una profonda ristrutturazione degli impianti e dei cicli produttivi." },
  { year: "2000s", title: "Chimica verde",      desc: "Novamont introduce le bioplastiche Mater-Bi®: una svolta verso la bioeconomia circolare." },
  { year: "Oggi",  title: "Polo misto",         desc: "Convivenza tra produzioni tradizionali ad alto impatto e tecnologie di nuova generazione." },
];

const PROBLEMI = [
  "Emissioni di PM10, PM2.5 e ossidi di azoto costantemente sopra la media europea",
  "Contaminazione da cromo esavalente nelle acque del fiume Nera",
  "Rifiuti speciali pericolosi: tracciabilità e smaltimento ancora insufficienti",
  "Consumo idrico elevato in un bacino già sotto stress stagionale",
];

const SOLUZIONI = [
  "Bioplastiche Mater-Bi® di Novamont: produzione a base rinnovabile e compostabile",
  "Progetti di simbiosi industriale per riutilizzo di calore e sottoprodotti",
  "Certificazioni ambientali ISO 14001 adottate dai principali operatori",
  "Piano regionale per il monitoraggio continuo della qualità dell'aria",
];

export default function Home() {
  const statsRef    = useRef(null);
  const timelineRef = useRef(null);
  const navigate    = useNavigate();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll("[data-a]")
              .forEach((el, i) => setTimeout(() => el.classList.add("vis"), i * 110));
          }
        });
      },
      { threshold: 0.15 }
    );
    if (statsRef.current)    io.observe(statsRef.current);
    if (timelineRef.current) io.observe(timelineRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow">Terni · Valle del Nera · Dal 1885</p>
          <h1 className="hero-title">
            Polo<br />Chimico<br />di <em>Terni</em>
          </h1>
          <p className="hero-subtitle">Industria, territorio e ambiente</p>
          <p className="hero-desc">
            Un'analisi del più grande sito industriale dell'Umbria: la sua storia,
            il suo peso economico e il costo ambientale che la conca ternana paga
            da oltre un secolo.
          </p>
        </div>

        <div className="hero-right">
          <div className="stat-grid" ref={statsRef}>
            {STATS.map((s, i) => (
              <div className="stat-cell" data-a key={i}>
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <blockquote className="hero-quote">
            "Il problema non è la presenza dell'industria,
            ma la sua coesistenza con chi respira."
            <cite>— Comitato Aria Pulita Terni, 2021</cite>
          </blockquote>
        </div>
      </section>

      {/* STORIA */}
      <section className="section-storia">
        <div className="section-label-bar">Storia</div>

        <div className="storia-text">
          <div className="section-num">01</div>
          <h2 className="section-heading">Un polo che ha plasmato una città</h2>
          <p className="body-text">
            Il Polo Chimico di Terni è inseparabile dalla storia della città.
            Nato alla fine dell'Ottocento per sfruttare la forza del Nera,
            si è evoluto attraverso petrochimica, chimica fine e oggi bioeconomia.
            Ospita realtà come <strong>Novamont</strong> — leader mondiale nelle
            bioplastiche Mater-Bi® — e <strong>Beaulieu</strong>, specializzata
            in film polipropilenici. La sua duplice natura è al centro del dibattito
            ambientale locale: motore economico imprescindibile, ma anche fonte
            di pressioni su aria, acqua e suolo.
          </p>
        </div>

        <div className="storia-timeline" ref={timelineRef}>
          {TIMELINE.map((item, i) => (
            <div className="tl-item" data-a key={i}>
              <div className="tl-year">{item.year}</div>
              <div className="tl-content">
                <div className="tl-title">{item.title}</div>
                <div className="tl-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DUALITÀ */}
      <section className="section-dualita">
        <div className="dual-col dual-problema">
          <h2 className="dual-heading">Le criticità ambientali</h2>
          <p className="dual-intro">
            Decenni di produzione intensiva hanno lasciato un'impronta pesante
            sull'ecosistema della conca ternana, una delle aree con la qualità
            dell'aria più critica del Centro Italia.
          </p>
          <ul className="impact-list">
            {PROBLEMI.map((t, i) => (
              <li key={i}>
                <span className="dot dot-rust" />
                {t}
              </li>
            ))}
          </ul>
          <button className="cta-btn btn-rust" onClick={() => navigate("/impatto")}>
            Approfondisci i problemi →
          </button>
        </div>

        <div className="dual-col dual-soluzione">
          <h2 className="dual-heading">Le strade verso la riconversione</h2>
          <p className="dual-intro">
            Non mancano segnali positivi: alcune realtà del polo stanno investendo
            in tecnologie pulite e modelli di economia circolare che potrebbero
            diventare un modello per l'Italia.
          </p>
          <ul className="impact-list">
            {SOLUZIONI.map((t, i) => (
              <li key={i}>
                <span className="dot dot-green" />
                {t}
              </li>
            ))}
          </ul>
          <button className="cta-btn btn-green" onClick={() => navigate("/soluzione")}>
            Scopri le soluzioni →
          </button>
        </div>
      </section>

      {/* BOTTOM BANNER */}
      <div className="bottom-banner">
        <p className="banner-text">
          Una realtà produttiva da <strong>1,2 miliardi di fatturato</strong> e
          una delle qualità dell'aria <strong>più critiche d'Italia</strong>:
          è possibile tenere insieme entrambe le cose?
        </p>
        <div className="banner-btns">
          <button className="cta-btn btn-rust"  onClick={() => navigate("/impatto")}>I problemi</button>
          <button className="btn-outline"        onClick={() => navigate("/soluzione")}>Le soluzioni</button>
        </div>
      </div>
    </>
  );
}
