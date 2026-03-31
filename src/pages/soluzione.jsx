import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  /* ── HEADER ── */
  .sol-header {
    background: var(--green-dark);
    padding: 80px 60px 64px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: end;
  }

  .sol-header-left .page-tag {
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #7dd3a8;
    margin-bottom: 20px;
  }

  .sol-header-left h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 4.5vw, 60px);
    color: #f5f2eb;
    line-height: 1.05;
    margin-bottom: 20px;
  }

  .sol-header-left h1 em {
    font-style: italic;
    color: #7dd3a8;
  }

  .sol-header-left p {
    font-size: 15px;
    color: #aaa;
    line-height: 1.85;
    max-width: 400px;
  }

  .sol-header-right {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .sol-kpi-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.1);
  }

  .sol-kpi-cell {
    background: var(--green-dark);
    padding: 22px 20px;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.45s ease, transform 0.45s ease;
  }

  .sol-kpi-cell.vis { opacity: 1; transform: translateY(0); }

  .sol-kpi-val {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    color: #7dd3a8;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 6px;
  }

  .sol-kpi-lbl {
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    line-height: 1.5;
  }

  /* ── ROADMAP ── */
  .sol-roadmap {
    background: var(--paper);
    padding: 80px 60px;
    border-bottom: 1px solid var(--mist);
  }

  .roadmap-header {
    display: flex;
    align-items: baseline;
    gap: 24px;
    margin-bottom: 48px;
  }

  .roadmap-num {
    font-family: 'Playfair Display', serif;
    font-size: 64px;
    color: var(--mist);
    font-weight: 700;
    line-height: 1;
    flex-shrink: 0;
  }

  .roadmap-header-text h2 {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 8px;
  }

  .roadmap-header-text p {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.7;
  }

  .roadmap-steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--mist);
    border: 1px solid var(--mist);
  }

  .roadmap-step {
    background: var(--paper);
    padding: 28px 24px;
    position: relative;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  .roadmap-step.vis { opacity: 1; transform: translateY(0); }

  .step-status {
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 12px;
    font-weight: 500;
  }

  .status-fatto    { color: #2e7d52; }
  .status-corso    { color: #b45309; }
  .status-previsto { color: #666; }

  .step-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--ink);
    margin-bottom: 10px;
    line-height: 1.3;
  }

  .step-desc {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.7;
  }

  .step-year {
    font-family: 'Playfair Display', serif;
    font-size: 11px;
    color: var(--mist);
    font-weight: 700;
    margin-top: 16px;
    letter-spacing: 0.05em;
  }

  /* ── CASI STUDIO ── */
  .sol-cases {
    background: var(--paper);
  }

  .sol-case {
    display: grid;
    grid-template-columns: 200px 1fr;
    border-bottom: 1px solid var(--mist);
    min-height: 300px;
  }

  .sol-case:last-child { border-bottom: none; }

  .case-aside {
    border-right: 1px solid var(--mist);
    padding: 48px 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .case-logo {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 6px;
  }

  .case-sector {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--green-dark);
  }

  .case-aside-num {
    font-family: 'Playfair Display', serif;
    font-size: 48px;
    color: var(--mist);
    font-weight: 700;
    line-height: 1;
  }

  .case-content {
    padding: 48px 52px;
  }

  .case-content h3 {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 16px;
    line-height: 1.25;
  }

  .case-content p {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.85;
    margin-bottom: 20px;
  }

  .case-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .case-tag {
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 5px 12px;
    border: 1px solid var(--green-dark);
    color: var(--green-dark);
  }

  /* ── OBIETTIVI ── */
  .sol-goals {
    background: #1a1a18;
    padding: 72px 60px;
  }

  .goals-title {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    color: #f5f2eb;
    margin-bottom: 8px;
  }

  .goals-sub {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 40px;
  }

  .goals-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: #2e2c26;
    border: 1px solid #2e2c26;
  }

  .goal-cell {
    background: #1a1a18;
    padding: 28px 24px;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  .goal-cell.vis { opacity: 1; transform: translateY(0); }

  .goal-target {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    color: #7dd3a8;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 10px;
  }

  .goal-desc {
    font-size: 13px;
    color: #777;
    line-height: 1.7;
  }

  .goal-year {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #444;
    margin-top: 10px;
  }

  /* ── FOOTER CTA ── */
  .sol-footer {
    background: var(--green-dark);
    padding: 64px 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
  }

  .sol-footer-text {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-style: italic;
    color: #f5f2eb;
    max-width: 520px;
    line-height: 1.5;
  }

  .sol-footer-text strong {
    font-style: normal;
    color: #7dd3a8;
  }

  .footer-btns { display: flex; gap: 12px; flex-shrink: 0; }

  .cta-btn {
    display: inline-block;
    padding: 11px 26px;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 400;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s;
    font-family: 'IBM Plex Sans', sans-serif;
  }

  .cta-btn:hover { opacity: 0.72; }
  .btn-green   { background: #7dd3a8; color: var(--green-dark); }
  .btn-outline { background: transparent; border: 1px solid rgba(255,255,255,0.25); color: #f5f2eb; }

  /* ── RESPONSIVE ── */
  @media (max-width: 960px) {
    .sol-header    { grid-template-columns: 1fr; padding: 48px 28px; }
    .sol-kpi-grid  { grid-template-columns: 1fr 1fr; }
    .roadmap-steps { grid-template-columns: 1fr 1fr; }
    .sol-case      { grid-template-columns: 1fr; }
    .case-aside    { border-right: none; border-bottom: 1px solid var(--mist); flex-direction: row; align-items: center; gap: 16px; padding: 28px; }
    .case-aside-num { display: none; }
    .case-content  { padding: 28px; }
    .goals-grid    { grid-template-columns: 1fr 1fr; }
    .sol-roadmap   { padding: 48px 28px; }
    .sol-goals     { padding: 48px 28px; }
    .sol-footer    { flex-direction: column; padding: 48px 28px; text-align: center; }
    .footer-btns   { justify-content: center; }
  }
`;

const SOL_KPI = [
  { val: "100%",  lbl: "Mater-Bi® da fonti rinnovabili" },
  { val: "-35%",  lbl: "Emissioni CO₂ target 2030" },
  { val: "ISO",   lbl: "14001 certificati nel polo" },
  { val: "2050",  lbl: "Obiettivo neutralità carbonica" },
];

const ROADMAP = [
  { status: "Fatto",     sc: "status-fatto",    year: "2004–oggi", title: "Bioplastiche Mater-Bi®",        desc: "Novamont produce bioplastiche compostabili da amido di mais e oli vegetali, sostituendo polimeri fossili." },
  { status: "In corso",  sc: "status-corso",    year: "2021–2026", title: "Simbiosi industriale",           desc: "Scambio di calore di scarto tra stabilimenti: riduzione del consumo energetico stimata al 18%." },
  { status: "In corso",  sc: "status-corso",    year: "2023–2027", title: "Monitoraggio aria continuo",     desc: "Rete di sensori IoT in tempo reale per PM10, NO₂ e COV. Dati pubblici su portale ARPA." },
  { status: "Previsto",  sc: "status-previsto", year: "2026–2030", title: "Bonifica SIN",                   desc: "Piano di caratterizzazione e bonifica delle aree perimetrate: investimento stimato 45 M€." },
];

export default function Soluzione() {
  const kpiRef   = useRef(null);
  const rmRef    = useRef(null);
  const goalsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.querySelectorAll("[data-a]").forEach((el, i) => {
            setTimeout(() => el.classList.add("vis"), i * 100);
          });
        });
      },
      { threshold: 0.15 }
    );
    [kpiRef, rmRef, goalsRef].forEach(r => r.current && io.observe(r.current));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* HEADER */}
      <header className="sol-header">
        <div className="sol-header-left">
          <p className="page-tag">Pagina 3 — Soluzioni e prospettive</p>
          <h1>Verso una<br />chimica <em>sostenibile</em></h1>
          <p>
            Non esiste una soluzione unica. La transizione del Polo Chimico di Terni
            passa da tecnologie già operative, politiche di lungo periodo e dalla
            capacità di fare sistema tra aziende, istituzioni e comunità locali.
          </p>
        </div>

        <div className="sol-header-right">
          <div className="sol-kpi-grid" ref={kpiRef}>
            {SOL_KPI.map((k, i) => (
              <div className="sol-kpi-cell" data-a key={i}>
                <div className="sol-kpi-val">{k.val}</div>
                <div className="sol-kpi-lbl">{k.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ROADMAP */}
      <section className="sol-roadmap">
        <div className="roadmap-header">
          <div className="roadmap-num">01</div>
          <div className="roadmap-header-text">
            <h2>La roadmap della transizione</h2>
            <p>
              Quattro interventi chiave, in fasi diverse di avanzamento, che tracciano
              il percorso verso un polo più sostenibile entro il 2030.
            </p>
          </div>
        </div>

        <div className="roadmap-steps" ref={rmRef}>
          {ROADMAP.map((s, i) => (
            <div className="roadmap-step" data-a key={i}>
              <div className={`step-status ${s.sc}`}>{s.status}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
              <div className="step-year">{s.year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CASI STUDIO */}
      <section className="sol-cases">

        <div className="sol-case">
          <div className="case-aside">
            <div>
              <div className="case-logo">Novamont</div>
              <div className="case-sector">Bioeconomia</div>
            </div>
            <div className="case-aside-num">A</div>
          </div>
          <div className="case-content">
            <h3>Mater-Bi®: dalla chimica fossile alla chimica verde</h3>
            <p>
              Novamont ha trasformato parte del polo da sito petrolchimico a centro
              di produzione di bioplastiche. Le resine Mater-Bi® sono ottenute da
              amido di mais, cellulosa e oli vegetali: sono certificati compostabili
              secondo EN 13432 e biodegradabili in ambiente marino.
            </p>
            <p>
              Lo stabilimento di Terni produce oltre 100.000 tonnellate/anno
              di materiali biobased, esportati in 40 paesi. Il ciclo produttivo
              utilizza il 60% di materia prima rinnovabile e punta al 100% entro il 2027.
            </p>
            <div className="case-tags">
              {["Bioplastiche", "Compostabile EN 13432", "100k t/anno", "40 paesi", "Carbonio biogenico"].map((t, i) => (
                <span className="case-tag" key={i}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="sol-case">
          <div className="case-aside">
            <div>
              <div className="case-logo">Distretto</div>
              <div className="case-sector">Simbiosi industriale</div>
            </div>
            <div className="case-aside-num">B</div>
          </div>
          <div className="case-content">
            <h3>Economia circolare di polo: lo scambio di sottoprodotti</h3>
            <p>
              Il progetto di simbiosi industriale in corso coinvolge tre operatori
              del polo: il calore di scarto di un impianto di polimerizzazione viene
              ceduto a un secondo stabilimento per preriscaldamento, riducendo il
              consumo di gas naturale stimato in 4.200 MWh/anno.
            </p>
            <p>
              Parallelamente, i catalizzatori esausti di un processo vengono recuperati
              come materia prima da un secondo operatore, azzerando un flusso di
              rifiuto pericoloso e riducendo i costi di smaltimento del 30%.
            </p>
            <div className="case-tags">
              {["Calore di scarto", "4.200 MWh/anno", "Recupero catalizzatori", "-30% rifiuti pericolosi"].map((t, i) => (
                <span className="case-tag" key={i}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="sol-case">
          <div className="case-aside">
            <div>
              <div className="case-logo">ARPA + Polo</div>
              <div className="case-sector">Monitoraggio</div>
            </div>
            <div className="case-aside-num">C</div>
          </div>
          <div className="case-content">
            <h3>Trasparenza ambientale: sensori in tempo reale</h3>
            <p>
              Dal 2023 è operativa una rete di 12 sensori IoT distribuiti nel perimetro
              del polo e nelle aree residenziali circostanti. I dati di PM10, PM2.5,
              NO₂, SO₂ e COV sono disponibili in tempo reale sul portale ARPA Umbria
              e accessibili anche tramite app mobile.
            </p>
            <p>
              La trasparenza dei dati ha permesso di individuare picchi emissivi
              collegabili a specifici cicli produttivi, aprendo la strada a
              protocolli di riduzione volontaria nelle ore di picco.
            </p>
            <div className="case-tags">
              {["12 sensori IoT", "Dati open", "PM10 · PM2.5 · NO₂", "App ARPA Umbria"].map((t, i) => (
                <span className="case-tag" key={i}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OBIETTIVI 2030 */}
      <section className="sol-goals">
        <h2 className="goals-title">Obiettivi al 2030</h2>
        <p className="goals-sub">Piano di transizione ambientale — Polo Chimico di Terni</p>

        <div className="goals-grid" ref={goalsRef}>
          {[
            { target: "-35%",   desc: "Riduzione emissioni di CO₂ rispetto alla baseline 2020",   year: "Entro 2030" },
            { target: "100%",   desc: "Energia elettrica da fonti rinnovabili per gli impianti",   year: "Entro 2028" },
            { target: "Bonifica", desc: "Completamento caratterizzazione SIN e avvio interventi",  year: "Entro 2027" },
            { target: "Zero",   desc: "Rifiuti pericolosi in discarica — tutto avviato a recupero", year: "Entro 2030" },
            { target: "+40%",   desc: "Quota di materie prime biobased nella produzione totale",    year: "Entro 2029" },
            { target: "ISO 50001", desc: "Certificazione energetica per tutti gli operatori del polo", year: "Entro 2026" },
          ].map((g, i) => (
            <div className="goal-cell" data-a key={i}>
              <div className="goal-target">{g.target}</div>
              <div className="goal-desc">{g.desc}</div>
              <div className="goal-year">{g.year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <div className="sol-footer">
        <p className="sol-footer-text">
          La transizione è <strong>già in corso</strong>, ma richiede
          continuità politica, investimenti privati e una comunità
          che sappia chiedere conto dei risultati.
        </p>
        <div className="footer-btns">
          <button className="cta-btn btn-outline" onClick={() => navigate("/impatto")}>
            ← I problemi
          </button>
          <button className="cta-btn btn-green" onClick={() => navigate("/")}>
            Torna alla home
          </button>
        </div>
      </div>
    </>
  );
}
