import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  /* ── HEADER PAGINA ── */
  .imp-header {
    background: #1c1a13;
    padding: 80px 60px 64px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: end;
    border-bottom: 1px solid #333;
  }

  .imp-header-left .page-tag {
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--rust-light);
    margin-bottom: 20px;
  }

  .imp-header-left h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 4.5vw, 60px);
    color: #f5f2eb;
    line-height: 1.05;
    margin-bottom: 20px;
  }

  .imp-header-left h1 em {
    font-style: italic;
    color: var(--rust-light);
  }

  .imp-header-left p {
    font-size: 15px;
    color: #888;
    line-height: 1.85;
    max-width: 400px;
  }

  .imp-header-right {
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: #333;
    border: 1px solid #333;
  }

  .kpi-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1px;
    background: #333;
  }

  .kpi-cell {
    background: #1c1a13;
    padding: 24px 20px;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.45s ease, transform 0.45s ease;
  }

  .kpi-cell.vis { opacity: 1; transform: translateY(0); }

  .kpi-val {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    color: var(--rust-light);
    font-weight: 700;
    line-height: 1;
    margin-bottom: 6px;
  }

  .kpi-lbl {
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #555;
    line-height: 1.5;
  }

  /* ── SEZIONI IMPATTO ── */
  .imp-body {
    background: var(--paper);
  }

  .imp-section {
    display: grid;
    grid-template-columns: 200px 1fr;
    border-bottom: 1px solid var(--mist);
    min-height: 340px;
  }

  .imp-section-aside {
    border-right: 1px solid var(--mist);
    padding: 56px 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .aside-icon {
    font-size: 32px;
    line-height: 1;
    margin-bottom: 16px;
  }

  .aside-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--ink);
    line-height: 1.2;
    margin-bottom: 8px;
  }

  .aside-sub {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--rust);
  }

  .aside-num {
    font-family: 'Playfair Display', serif;
    font-size: 56px;
    color: var(--mist);
    font-weight: 700;
    line-height: 1;
    align-self: flex-end;
  }

  .imp-section-content {
    padding: 56px;
  }

  .imp-section-content p {
    font-size: 15px;
    line-height: 1.9;
    color: var(--text-muted);
    margin-bottom: 28px;
  }

  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 8px;
  }

  .detail-card {
    border: 1px solid var(--mist);
    padding: 20px;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  .detail-card.vis { opacity: 1; transform: translateY(0); }

  .detail-card-title {
    font-size: 12px;
    font-weight: 500;
    color: var(--rust);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .detail-card-text {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.7;
  }

  /* ── BARRA DATI ── */
  .data-bar-section {
    background: #1c1a13;
    padding: 72px 60px;
  }

  .data-bar-title {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    color: #f5f2eb;
    margin-bottom: 8px;
  }

  .data-bar-sub {
    font-size: 12px;
    color: #666;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 40px;
  }

  .bar-item {
    margin-bottom: 28px;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .bar-item.vis { opacity: 1; }

  .bar-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .bar-label {
    font-size: 12px;
    color: #aaa;
    letter-spacing: 0.06em;
  }

  .bar-value {
    font-size: 12px;
    color: var(--rust-light);
    font-weight: 500;
  }

  .bar-track {
    height: 4px;
    background: #333;
    width: 100%;
  }

  .bar-fill {
    height: 4px;
    background: var(--rust-light);
    width: 0%;
    transition: width 0.8s ease;
  }

  .bar-fill.vis { width: var(--w); }

  /* ── CTA FINALE ── */
  .imp-footer {
    background: var(--ink);
    padding: 64px 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
  }

  .imp-footer-text {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-style: italic;
    color: #f5f2eb;
    max-width: 520px;
    line-height: 1.5;
  }

  .imp-footer-text strong {
    font-style: normal;
    color: var(--rust-light);
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
  .btn-rust    { background: var(--rust); color: #f5f2eb; }
  .btn-outline { background: transparent; border: 1px solid rgba(255,255,255,0.25); color: #f5f2eb; }

  /* ── RESPONSIVE ── */
  @media (max-width: 960px) {
    .imp-header { grid-template-columns: 1fr; padding: 48px 28px; }
    .kpi-row    { grid-template-columns: 1fr 1fr; }
    .imp-section { grid-template-columns: 1fr; }
    .imp-section-aside { border-right: none; border-bottom: 1px solid var(--mist); padding: 40px 28px; flex-direction: row; align-items: center; flex-wrap: wrap; gap: 16px; }
    .aside-num { display: none; }
    .imp-section-content { padding: 40px 28px; }
    .detail-grid { grid-template-columns: 1fr; }
    .data-bar-section { padding: 48px 28px; }
    .imp-footer { flex-direction: column; padding: 48px 28px; text-align: center; }
    .footer-btns { justify-content: center; }
  }
`;

const KPI = [
  { val: "3°",    lbl: "Peggiore qualità aria in Umbria" },
  { val: "42%",   lbl: "Giorni/anno con PM10 fuori limite" },
  { val: "18 t",  lbl: "NOₓ emesse per anno (stima)" },
  { val: "Cr⁶⁺",  lbl: "Cromo esavalente nel Nera" },
  { val: "12 M³", lbl: "Prelievo idrico annuo (milioni)" },
  { val: "800 t", lbl: "Rifiuti spec. pericolosi/anno" },
];

const BARS = [
  { label: "PM10 – superamenti limite annuo (40 µg/m³)",    value: "78%", w: 78 },
  { label: "PM2.5 – concentrazione vs media EU",             value: "61%", w: 61 },
  { label: "NO₂ – eccedenza rispetto alla soglia OMS",       value: "54%", w: 54 },
  { label: "Stress idrico bacino del Nera",                  value: "70%", w: 70 },
  { label: "Suoli contaminati (aree perimetrate ARPA)",      value: "45%", w: 45 },
];

export default function Impatto() {
  const kpiRef  = useRef(null);
  const cardsRef = useRef(null);
  const barsRef  = useRef(null);
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
    [kpiRef, cardsRef, barsRef].forEach(r => r.current && io.observe(r.current));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* HEADER */}
      <header className="imp-header">
        <div className="imp-header-left">
          <p className="page-tag">Pagina 2 — Impatto ambientale</p>
          <h1>L'<em>impatto</em><br />ecologico</h1>
          <p>
            Aria, acqua, suolo: tre fronti su cui il Polo Chimico di Terni ha lasciato
            — e continua a lasciare — un'impronta misurabile. I dati ARPA Umbria e le
            analisi dell'ISS restituiscono un quadro che non lascia spazio all'ottimismo
            acritico.
          </p>
        </div>

        <div className="imp-header-right" ref={kpiRef}>
          <div className="kpi-row">
            {KPI.map((k, i) => (
              <div className="kpi-cell" data-a key={i}>
                <div className="kpi-val">{k.val}</div>
                <div className="kpi-lbl">{k.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* BODY SEZIONI */}
      <div className="imp-body">

        {/* 01 — ARIA */}
        <div className="imp-section">
          <div className="imp-section-aside">
            <div>
              <div className="aside-icon">💨</div>
              <div className="aside-title">Qualità dell'aria</div>
              <div className="aside-sub">Emissioni atmosferiche</div>
            </div>
            <div className="aside-num">01</div>
          </div>
          <div className="imp-section-content">
            <p>
              La conca ternana è morfologicamente chiusa: le colline che la circondano
              intrappolano gli inquinanti, rendendo la dispersione naturale quasi
              impossibile nelle stagioni più fredde. I dati ARPA indicano che la
              centralina di Via Carrara supera il limite giornaliero di PM10
              (50 µg/m³) oltre 40 volte l'anno — il doppio del tetto massimo previsto
              dalla normativa europea.
            </p>
            <p>
              Le emissioni di ossidi di azoto provenienti dagli impianti del polo
              contribuiscono in modo significativo alla formazione di ozono troposferico
              e smog fotochimico, con effetti documentati sulla salute respiratoria
              dei residenti.
            </p>
            <div className="detail-grid" ref={cardsRef}>
              {[
                { t: "PM10",  d: "Superamenti annui del limite giornaliero fino a 42 giorni. Valori medi di 34 µg/m³ contro i 20 µg/m³ raccomandati dall'OMS." },
                { t: "PM2.5", d: "Particolato fine con penetrazione alveolare profonda. Correlato a patologie cardiovascolari e polmonari croniche." },
                { t: "NOₓ",   d: "Ossidi di azoto da combustione industriale. Precursori dell'ozono troposferico nei mesi estivi." },
                { t: "COV",   d: "Composti organici volatili dai processi polimerici. Alcuni classificati come cancerogeni (classe IARC 1 e 2A)." },
              ].map((c, i) => (
                <div className="detail-card" data-a key={i}>
                  <div className="detail-card-title">{c.t}</div>
                  <div className="detail-card-text">{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 02 — ACQUA */}
        <div className="imp-section">
          <div className="imp-section-aside">
            <div>
              <div className="aside-icon">💧</div>
              <div className="aside-title">Risorse idriche</div>
              <div className="aside-sub">Fiume Nera e falda</div>
            </div>
            <div className="aside-num">02</div>
          </div>
          <div className="imp-section-content">
            <p>
              Il fiume Nera è il principale corpo idrico che attraversa il polo.
              Analisi condotte dall'ARPA Umbria tra il 2018 e il 2023 hanno rilevato
              concentrazioni di cromo esavalente (Cr⁶⁺) superiori ai limiti di legge
              in alcuni punti di monitoraggio a valle del sito industriale. Il cromo
              esavalente è classificato come cancerogeno di classe 1 dall'IARC.
            </p>
            <p>
              Il prelievo idrico annuo stimato per usi industriali nel polo supera
              i 12 milioni di m³, in un bacino che già sperimenta periodi di magra
              sempre più severi a causa dei cambiamenti climatici.
            </p>
            <div className="detail-grid">
              {[
                { t: "Cromo esavalente", d: "Rilevato a valle dello scarico in concentrazioni fino a 3,2 µg/L contro il limite di 2,5 µg/L." },
                { t: "Solventi clorurati", d: "Tracce di tricloroetilene e tetracloroetilene rinvenute nella falda superficiale in area perimetrata." },
                { t: "Temperatura scarichi", d: "Acque di raffreddamento restituite a temperatura elevata: impatto termico sull'ecosistema fluviale." },
                { t: "Stress idrico", d: "Il Nera registra portate minime estive in calo del 22% nell'ultimo decennio (dati ISPRA 2023)." },
              ].map((c, i) => (
                <div className="detail-card" key={i} style={{ opacity: 1, transform: "none" }}>
                  <div className="detail-card-title">{c.t}</div>
                  <div className="detail-card-text">{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 03 — SUOLO */}
        <div className="imp-section" style={{ borderBottom: "none" }}>
          <div className="imp-section-aside">
            <div>
              <div className="aside-icon">🌱</div>
              <div className="aside-title">Suolo e rifiuti</div>
              <div className="aside-sub">Contaminazione e discariche</div>
            </div>
            <div className="aside-num">03</div>
          </div>
          <div className="imp-section-content">
            <p>
              L'area del polo è classificata come Sito di Interesse Nazionale (SIN)
              dalla normativa italiana — una designazione che implica un livello di
              contaminazione tale da richiedere interventi di bonifica coordinati a
              livello statale. Le indagini preliminari hanno identificato metalli pesanti,
              idrocarburi policiclici aromatici (IPA) e composti organoalogenati
              nel sottosuolo di diverse aree dismesse.
            </p>
            <p>
              La produzione di rifiuti speciali pericolosi è stimata in circa 800
              tonnellate annue. La gestione di questi flussi — smaltimento, recupero,
              tracciabilità — rimane uno dei nodi irrisolti del polo.
            </p>
            <div className="detail-grid">
              {[
                { t: "SIN (Sito Interesse Nazionale)", d: "Perimetrazione ministeriale: obbligo di caratterizzazione e bonifica delle aree contaminate." },
                { t: "IPA nel sottosuolo", d: "Idrocarburi policiclici aromatici rilevati in carotaggi a -2 m di profondità in ex aree produttive." },
                { t: "Rifiuti pericolosi", d: "~800 t/anno di rifiuti speciali pericolosi. Solo il 38% avviato a recupero; il resto in discarica autorizzata." },
                { t: "Amianto residuale", d: "Presenza di materiali contenenti amianto in strutture produttive risalenti agli anni '60-'80." },
              ].map((c, i) => (
                <div className="detail-card" key={i} style={{ opacity: 1, transform: "none" }}>
                  <div className="detail-card-title">{c.t}</div>
                  <div className="detail-card-text">{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BARRE DATI */}
      <div className="data-bar-section" ref={barsRef}>
        <h2 className="data-bar-title">Indicatori di pressione ambientale</h2>
        <p className="data-bar-sub">Polo Chimico di Terni — elaborazione dati ARPA Umbria / ISPRA</p>
        {BARS.map((b, i) => (
          <div className="bar-item" data-a key={i}>
            <div className="bar-header">
              <span className="bar-label">{b.label}</span>
              <span className="bar-value">{b.value}</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill vis" style={{ "--w": `${b.w}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER CTA */}
      <div className="imp-footer">
        <p className="imp-footer-text">
          Il quadro è complesso ma non senza uscita.
          Scopri le <strong>strategie di riconversione</strong> già in atto
          e quelle ancora da realizzare.
        </p>
        <div className="footer-btns">
          <button className="cta-btn btn-rust" onClick={() => navigate("/soluzione")}>
            Vedi le soluzioni →
          </button>
          <button className="cta-btn btn-outline" onClick={() => navigate("/")}>
            ← Torna alla home
          </button>
        </div>
      </div>
    </>
  );
}
