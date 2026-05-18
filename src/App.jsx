import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --card-white:rgba(252,252,248,0.97);
          --card-cream:rgba(248,246,234,0.97);
          --card-sage:rgba(185,218,185,0.72);
          --teal:#156030;
          --teal-label:#156030;
          --teal-accent:#156030;
          --text-dark:#0a7a30;
          --text-body:#0a7a30;
          --text-mid:#0a7a30;
          --text-light:#0a7a30;
          --serif:'Cormorant Garamond',Georgia,serif;

          /* ── TYPOGRAPHY SCALE ── */
          --fs-hero:    clamp(1.6rem, 4vw, 3.5rem);      /* Hero H1 — page title */
          --fs-section: clamp(1.15rem, 2.3vw, 1.84rem);  /* Section H2 — +15% */
          --fs-card:    clamp(0.98rem, 1.15vw, 1.09rem); /* Card H3 — +15% */
          --fs-body:    clamp(0.95rem, 1.2vw, 1.05rem);  /* Body paragraphs */
          --fs-small:   0.88rem;                          /* Small / supporting text */
          --fs-label:   0.68rem;                          /* Eyebrow labels */
        }
        html{scroll-behavior:smooth;}
        body{
          font-family:var(--serif);
          color:var(--text-dark);
          overflow-x:hidden;
          position:relative;
          background:#3a6e28;
        }

        /* ── BACKGROUND ── */
        .bg-bokeh{
          position:fixed;inset:0;z-index:0;
          background-image:url('/unicorn-assets/background.png');
          background-size:cover;
          background-position:center;
          background-attachment:fixed;
          filter:brightness(1.1) saturate(0.95);
        }
        .bg-bokeh::before{content:none;}
        @media(max-width:768px){
          .bg-bokeh{
            background-attachment:scroll;
            filter:none;
          }
        }

        .page{position:relative;z-index:1;padding:0;}

        /* ── NAV — hidden ── */
        nav{display:none !important;}

        /* ── CARD BASE ── */
        .card{
          background:var(--card-white);
          border-radius:18px;
          margin:0 auto 20px;
          max-width:900px;
          padding:52px 60px;
          box-shadow:0 4px 40px rgba(30,60,10,0.18);
        }
        .card-cream{background:var(--card-cream);}
        .card-sage{background:var(--card-sage);}

        /* ── SCROLL REVEAL ── */
        .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.75s ease,transform 0.75s ease;}
        .reveal.visible{opacity:1;transform:translateY(0);}
        .d1{transition-delay:0.08s;}.d2{transition-delay:0.16s;}
        .d3{transition-delay:0.24s;}.d4{transition-delay:0.32s;}
        .d5{transition-delay:0.40s;}.d6{transition-delay:0.48s;}

        /* ── SHARED ── */
        .label{
          font-size:var(--fs-label);
          letter-spacing:0.28em;text-transform:uppercase;
          color:var(--teal-label);display:block;
          margin-bottom:14px;font-family:var(--serif);
        }
        .divider{width:60px;height:1px;background:var(--teal-accent);margin:24px 0;}

        /* ══════════════════════════════════════
           1. HERO
        ══════════════════════════════════════ */
        .hero-card{
          border-radius:18px;max-width:900px;margin:0 auto 20px;
          overflow:hidden;
          display:flex;flex-direction:column;
          gap:0;
          box-shadow:0 4px 40px rgba(30,60,10,0.25);
          background:var(--card-cream);
        }
        .hero-text-block{
          padding:32px 60px 28px;
          background:var(--card-cream);
          flex-shrink:0;
          margin:0;
          display:flex;
          flex-direction:column;
          align-items:center;
        }
        .hero-text-block h1{
          font-size:clamp(2rem, 4vw, 2.8rem);
          font-weight:700;
          letter-spacing:0.08em;
          line-height:1.0;
          color:var(--text-dark);
          text-transform:uppercase;
          margin-bottom:18px;
          font-family:var(--serif);
          white-space:nowrap;
          text-align:center;
        }
        .hero-text-block .hero-sub{
          font-size:var(--fs-body);
          font-weight:400;
          color:var(--text-body);
          line-height:1.5;
          font-family:var(--serif);
          display:block;
          width:620px;
          max-width:100%;
          text-align:left;
        }
        .hero-img-block{
          width:100%;
          flex:1;
          min-height:520px;
          overflow:hidden;
          display:block;
          font-size:0;
          line-height:0;
        }
        .hero-img-block img{
          width:100%;height:100%;object-fit:cover;display:block;vertical-align:bottom;
        }

        /* ══════════════════════════════════════
           2. WHO WE ARE
        ══════════════════════════════════════ */
        .who-inner{
          display:flex;flex-direction:column;
          align-items:center;text-align:center;gap:0;
        }
        .who-section-title{
          font-size:var(--fs-section);
          letter-spacing:0.06em;
          text-transform:uppercase;
          color:var(--text-dark);
          font-family:var(--serif);
          font-weight:700;
          margin-top:12px;
          margin-bottom:32px;
          line-height:1.0;
        }
        .who-logo{
          width:499px;height:499px;
          display:block;
          margin-bottom:32px;
        }
        .who-tagline{
          font-size:clamp(0.75rem,1.2vw,0.95rem);
          font-weight:700;
          letter-spacing:0.28em;
          text-transform:uppercase;
          color:var(--text-mid);
          font-family:var(--serif);
          margin-bottom:24px;
          line-height:1.4;
        }
        .who-divider{width:60px;height:1px;background:var(--teal-accent);margin:0 auto 24px;}
        .who-text p{
          font-size:var(--fs-body);
          font-weight:400;
          line-height:1.9;
          color:var(--text-body);
          max-width:620px;
          margin:0 auto;
          font-family:var(--serif);
          text-align:left;
        }

        /* ══════════════════════════════════════
           3. MAKERS
        ══════════════════════════════════════ */
        .makers-stack{display:flex;flex-direction:column;gap:0;margin:0;padding:0;}
        .makers-img-top{
          width:100%;overflow:hidden;
          border-radius:18px 18px 0 0;
          flex-shrink:0;
          margin:0;padding:0;
          font-size:0;line-height:0;
        }
        .makers-img-top img{width:100%;height:auto;display:block;object-fit:cover;vertical-align:bottom;margin:0;padding:0;}
        .makers-text-bottom{padding:44px 52px;background:var(--card-white);}
        .makers-text-bottom h2{
          font-size:var(--fs-section);
          font-weight:700;
          color:var(--text-dark);
          margin-bottom:16px;
          font-family:var(--serif);
          text-align:center;
        }
        .makers-intro{
          font-size:var(--fs-body);
          font-weight:400;
          color:var(--text-mid);
          line-height:1.7;
          margin-bottom:20px;
          font-family:var(--serif);
          text-align:left;
        }
        .makers-bullets{list-style:none;margin:0;padding:0;}
        .makers-bullets li{
          font-size:var(--fs-body);
          font-weight:400;
          color:var(--text-body);
          line-height:1.75;
          font-family:var(--serif);
          padding:6px 0;
          padding-left:1.4em;
          position:relative;
          text-align:left;
        }
        .makers-bullets li::before{
          content:'✤';
          position:absolute;left:0;
          color:var(--teal);
          font-size:0.85rem;
        }

        /* ══════════════════════════════════════
           4. SETTING 1
        ══════════════════════════════════════ */
        .setting1-card{
          border-radius:18px;max-width:900px;margin:0 auto 20px;
          overflow:hidden;
          display:flex;flex-direction:column;
          box-shadow:0 4px 40px rgba(30,60,10,0.22);
          background:var(--card-white);
        }
        .setting1-img{width:100%;height:520px;overflow:hidden;}
        .setting1-img img{width:100%;height:100%;object-fit:cover;display:block;}
        .setting1-text{
          padding:40px 60px;
          text-align:center;
        }
        .setting1-text h2{
          font-size:var(--fs-section);
          font-weight:700;
          color:var(--text-dark);
          letter-spacing:0.04em;
          margin-bottom:16px;
          font-family:var(--serif);
        }
        .setting-byline-mobile{display:none;}
        .setting-byline-desktop{display:block;}
        .setting1-text p{
          font-size:var(--fs-body);
          font-weight:400;
          color:var(--text-body);
          line-height:1.8;
          max-width:680px;
          margin:0 auto;
          font-family:var(--serif);
          text-align:left;
          white-space:normal;
        }

        /* ══════════════════════════════════════
           5. SETTING 2
        ══════════════════════════════════════ */
        .setting2-split{display:grid;grid-template-columns:1fr 1fr;align-items:stretch;}
        .setting2-img-col{border-radius:18px 0 0 18px;overflow:hidden;min-height:520px;}
        .setting2-img-col img{width:100%;height:100%;object-fit:cover;display:block;}
        .setting2-content{padding:52px 48px;display:flex;flex-direction:column;justify-content:center;}
        .setting-features{display:flex;flex-direction:column;gap:22px;}
        .sf h3{
          font-size:var(--fs-card);
          letter-spacing:0.12em;
          text-transform:uppercase;
          color:var(--teal);
          font-weight:700;
          margin-bottom:5px;
          font-family:var(--serif);
        }
        .sf p{
          font-size:var(--fs-small);
          font-weight:400;
          line-height:1.6;
          color:var(--text-body);
          font-family:var(--serif);
          text-align:left;
        }

        /* ══════════════════════════════════════
           6. LABORATORY
        ══════════════════════════════════════ */
        .lab-header{text-align:center;margin-bottom:40px;}
        .lab-header h2{
          font-size:var(--fs-section);
          font-weight:700;
          color:var(--text-dark);
          margin-bottom:14px;
          font-family:var(--serif);
        }
        .lab-header p{
          font-size:var(--fs-body);
          font-weight:400;
          color:var(--text-mid);
          line-height:1.8;
          max-width:680px;
          margin:0 auto;
          font-family:var(--serif);
          text-align:left;
        }
        .lab-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px;}
        .lab-item{
          background:rgba(255,255,255,0.55);
          border:1px solid rgba(80,130,60,0.25);
          border-radius:12px;
          padding:28px 24px;
          transition:transform 0.25s,background 0.25s;
        }
        .lab-item:hover{transform:translateY(-3px);background:rgba(255,255,255,0.8);}
        .lab-item h3{
          font-size:var(--fs-card);
          font-weight:700;
          color:var(--teal);
          margin-bottom:8px;
          font-family:var(--serif);
          text-align:left;
        }
        .lab-item p{
          font-size:var(--fs-small);
          font-weight:400;
          line-height:1.65;
          color:var(--text-mid);
          font-family:var(--serif);
          text-align:left;
        }
        .no-place{
          background:rgba(255,255,255,0.5);
          border:1px solid rgba(80,130,60,0.2);
          border-radius:12px;
          padding:40px 44px;
        }
        .no-place .np-label{
          font-size:var(--fs-section);
          letter-spacing:0.04em;
          color:var(--text-dark);
          display:block;
          margin-bottom:10px;
          font-family:var(--serif);
          font-weight:700;
          line-height:1.15;
        }
        .no-place h3{
          font-size:var(--fs-card);
          font-weight:400;
          color:var(--text-mid);
          margin-bottom:20px;
          font-family:var(--serif);
          line-height:1.6;
        }
        .no-place p{
          font-size:var(--fs-small);
          font-weight:400;
          line-height:1.9;
          color:var(--text-mid);
          font-family:var(--serif);
          text-align:left;
        }

        /* ══════════════════════════════════════
           7. QUOTE CARD
        ══════════════════════════════════════ */
        .quote-card{
          border-radius:18px;max-width:900px;margin:0 auto 20px;
          overflow:hidden;display:flex;flex-direction:column;
          box-shadow:0 4px 40px rgba(30,60,10,0.22);background:var(--card-white);
        }
        .quote-img{width:100%;overflow:hidden;}
        .quote-img img{width:100%;height:auto;display:block;object-fit:contain;}
        .quote-text{padding:36px 60px 40px;text-align:center;}
        .quote-title{
          font-size:var(--fs-section);
          font-weight:700;
          color:var(--text-dark);
          font-family:var(--serif);
          margin-bottom:14px;
          letter-spacing:0.04em;
          line-height:1.2;
          display:block;
        }
        .quote-sub{
          font-size:var(--fs-body);
          font-weight:600;
          color:var(--text-mid);
          font-family:var(--serif);
          letter-spacing:0.04em;
          display:block;
        }

        /* ══════════════════════════════════════
           8. PHASE I
        ══════════════════════════════════════ */
        .phase-header{text-align:center;margin-bottom:44px;}
        .phase-header .phase-num{
          font-size:var(--fs-label);
          font-weight:600;
          letter-spacing:0.28em;
          text-transform:uppercase;
          color:var(--text-mid);
          font-family:var(--serif);
          display:block;
          margin-bottom:6px;
        }
        .phase-header h2{
          font-size:var(--fs-section);
          font-weight:700;
          color:var(--text-dark);
          margin-bottom:14px;
          font-family:var(--serif);
        }
        .phase-header p{
          font-size:var(--fs-body);
          font-weight:400;
          color:var(--text-mid);
          line-height:1.8;
          max-width:640px;
          margin:0 auto;
          font-family:var(--serif);
          text-align:left;
        }
        .ritual-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        .ritual-item{
          background:rgba(255,255,255,0.5);
          border:1px solid rgba(80,130,60,0.2);
          border-radius:12px;
          padding:26px 22px;
          transition:transform 0.25s,background 0.25s;
        }
        .ritual-item:hover{transform:translateY(-3px);background:rgba(255,255,255,0.78);}
        .ritual-item h3{
          font-size:var(--fs-card);
          font-weight:700;
          color:var(--teal);
          margin-bottom:7px;
          font-family:var(--serif);
          text-align:left;
        }
        .ritual-item p{
          font-size:var(--fs-small);
          font-weight:400;
          line-height:1.6;
          color:var(--text-mid);
          font-family:var(--serif);
          text-align:left;
        }

        /* ══════════════════════════════════════
           9. PHASE II
        ══════════════════════════════════════ */
        .phase2-vertical{display:flex;flex-direction:column;}
        .phase2-img-top{width:100%;overflow:hidden;font-size:0;line-height:0;}
        .phase2-img-top img{width:100%;height:auto;display:block;object-fit:contain;vertical-align:bottom;}
        .phase2-eyebrow{
          font-size:var(--fs-label);
          letter-spacing:0.28em;
          text-transform:uppercase;
          color:var(--teal-label);
          font-family:var(--serif);
          font-weight:600;
          display:block;
          margin-bottom:10px;
        }
        .phase2-inner{display:grid;grid-template-columns:1fr 1fr;gap:0;align-items:stretch;}
        .phase2-img{overflow:hidden;min-height:480px;}
        .phase2-img img{width:100%;height:100%;object-fit:cover;display:block;}
        .phase2-text{padding:44px 44px;display:flex;flex-direction:column;justify-content:center;}
        .phase2-text h2{
          font-size:var(--fs-section);
          font-weight:700;
          color:var(--text-dark);
          margin-bottom:18px;
          font-family:var(--serif);
          text-align:center;
        }
        .phase2-text p{
          font-size:var(--fs-body);
          font-weight:400;
          line-height:1.85;
          color:var(--text-body);
          margin-bottom:16px;
          font-family:var(--serif);
          text-align:left;
        }
        .phase2-highlight{background:rgba(200,230,180,0.4);border-radius:8px;padding:18px 22px;margin-top:8px;}
        .phase2-highlight h3{
          font-size:var(--fs-card);
          font-weight:700;
          color:var(--teal);
          margin-bottom:6px;
          font-family:var(--serif);
          text-align:left;
        }
        .phase2-highlight p{
          font-size:var(--fs-small);
          font-weight:400;
          color:var(--text-mid);
          line-height:1.65;
          font-family:var(--serif);
          text-align:left;
        }

        /* ══════════════════════════════════════
           10. REVENUE
        ══════════════════════════════════════ */
        .revenue-split{display:grid;grid-template-columns:1fr 1fr;align-items:stretch;}
        .revenue-img-col{border-radius:18px 0 0 18px;overflow:hidden;min-height:480px;}
        .revenue-img-col img{width:100%;height:100%;object-fit:cover;display:block;}
        .revenue-content{padding:52px 48px;}
        .revenue-content h2{
          font-size:var(--fs-section);
          font-weight:700;
          color:var(--text-dark);
          margin-bottom:32px;
          font-family:var(--serif);
          text-align:center;
        }
        .rev-list{display:flex;flex-direction:column;gap:12px;}
        .rev-item{
          background:rgba(255,255,255,0.55);
          border:1px solid rgba(80,130,60,0.2);
          border-radius:10px;
          padding:20px 22px;
          transition:transform 0.25s,background 0.25s;
        }
        .rev-item:hover{transform:translateX(4px);background:rgba(255,255,255,0.8);}
        .rev-item h3{
          font-size:var(--fs-card);
          font-weight:700;
          color:var(--text-dark);
          margin-bottom:5px;
          font-family:var(--serif);
          text-align:left;
        }
        .rev-item p{
          font-size:var(--fs-small);
          font-weight:400;
          line-height:1.6;
          color:var(--text-mid);
          font-family:var(--serif);
          text-align:left;
        }

        /* ══════════════════════════════════════
           11. FOUNDER
        ══════════════════════════════════════ */
        .founder-section-title{
          font-size:var(--fs-section);
          font-weight:700;
          color:var(--text-dark);
          letter-spacing:0.06em;
          text-transform:uppercase;
          font-family:var(--serif);
          text-align:center;
          margin-bottom:36px;
        }
        .founder-img{border-radius:12px;overflow:hidden;width:100%;height:560px;margin-bottom:28px;}
        .founder-img img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;}
        .ft-name{
          font-size:var(--fs-section);
          font-weight:700;
          color:var(--text-dark);
          margin-bottom:10px;
          font-family:var(--serif);
          display:block;
          line-height:1.1;
        }
        .ft-sub{
          font-size:var(--fs-label);
          font-weight:700;
          letter-spacing:0.3em;
          text-transform:uppercase;
          color:var(--text-light);
          display:block;
          margin-top:4px;
          margin-bottom:24px;
          font-family:var(--serif);
          line-height:1.6;
        }
        .founder-divider{display:none;}
        .founder-bullets{list-style:none;margin-top:8px;}
        .founder-bullets li{
          display:flex;gap:14px;
          padding:12px 0;
          border-bottom:1px solid rgba(80,130,60,0.15);
          font-size:var(--fs-body);
          font-weight:400;
          line-height:1.65;
          color:var(--text-body);
          font-family:var(--serif);
          text-align:left;
        }
        .founder-bullets li:last-child{border-bottom:none;}
        .founder-bullets li::before{
          content:'◆';
          color:var(--teal-accent);
          font-size:0.55rem;
          flex-shrink:0;
          margin-top:6px;
        }

        /* ══════════════════════════════════════
           12. QUOTE SLIDE
        ══════════════════════════════════════ */
        .art-quote-card{
          position:relative;
          border-radius:18px;max-width:900px;margin:0 auto 20px;
          overflow:hidden;
          box-shadow:0 4px 40px rgba(30,60,10,0.18);
          display:block;
          font-size:0;
          line-height:0;
        }
        .art-quote-card img{
          width:100%;height:auto;display:block;
          vertical-align:bottom;margin:0;padding:0;
        }
        .art-quote-grey-bar{
          background:var(--card-cream);
          padding:28px 52px 30px;
          text-align:center;
          font-size:1rem;
          line-height:1;
        }
        .art-quote-text{
          font-size:clamp(0.9rem,1.6vw,1.25rem);
          font-style:normal;
          font-weight:700;
          color:var(--text-dark);
          line-height:1.3;
          font-family:var(--serif);
          display:block;
          white-space:nowrap;
          text-transform:uppercase;
          letter-spacing:0.06em;
        }
        .art-quote-text-overlay{display:none;}

        /* ══════════════════════════════════════
           13. MEGHAN'S ART
        ══════════════════════════════════════ */
        .art-split{display:grid;grid-template-columns:1fr 1fr;align-items:stretch;}
        .art-img-col{overflow:hidden;border-radius:18px 0 0 18px;min-height:460px;}
        .art-img-col img{width:100%;height:100%;object-fit:cover;display:block;}
        .art-text-col{padding:48px 44px;display:flex;flex-direction:column;justify-content:center;}
        .art-text-col h2{
          font-size:var(--fs-section);
          font-weight:700;
          color:var(--text-dark);
          margin-bottom:18px;
          font-family:var(--serif);
          text-align:center;
        }
        .art-text-col p{
          font-size:var(--fs-body);
          font-weight:400;
          line-height:1.85;
          color:var(--text-body);
          margin-bottom:16px;
          font-family:var(--serif);
          text-align:left;
        }
        .art-press{
          font-size:var(--fs-small);
          font-weight:400;
          color:var(--text-light);
          font-family:var(--serif);
          text-align:left;
        }

        /* ══════════════════════════════════════
           14. CTA
        ══════════════════════════════════════ */
        .cta-card{
          border-radius:18px;max-width:900px;margin:0 auto;
          overflow:hidden;
          display:flex;flex-direction:column;
          box-shadow:0 4px 40px rgba(30,60,10,0.25);
          position:relative;
        }
        .cta-img{width:100%;height:720px;overflow:hidden;display:block;}
        .cta-img img{width:100%;height:100%;object-fit:cover;display:block;}
        .cta-banner{
          background:#2a4e2a;
          padding:28px 60px;
          text-align:center;
        }
        .cta-banner h2{
          font-size:var(--fs-section);
          font-weight:300;
          color:#fff;
          letter-spacing:0.1em;
          text-transform:uppercase;
          margin-bottom:8px;
          font-family:var(--serif);
        }
        .cta-banner p{
          font-size:var(--fs-body);
          font-weight:300;
          color:rgba(255,255,255,0.78);
          margin-bottom:20px;
          line-height:1.5;
          font-family:var(--serif);
        }
        .cta-btn{
          display:inline-block;padding:10px 36px;
          border:1px solid rgba(255,255,255,0.6);
          color:#fff;font-family:var(--serif);
          font-size:var(--fs-label);
          letter-spacing:0.22em;
          text-transform:uppercase;text-decoration:none;
          transition:all 0.3s;background:transparent;
          cursor:pointer;border-radius:2px;
        }
        .cta-btn:hover{background:rgba(255,255,255,0.15);transform:translateY(-2px);}

        /* Footer — hidden on desktop */
        .site-footer{display:none;}
        @media(max-width:768px){
          .site-footer{display:block;}
        }

        /* ══════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════ */
        @media(max-width:768px){
          :root{
            --fs-hero:    clamp(1.4rem, 7vw, 2rem);
            --fs-section: clamp(0.9rem, 4vw, 1.2rem);
            --fs-card:    0.85rem;
            --fs-body:    0.95rem;
            --fs-small:   0.85rem;
          }

          nav{padding:14px 20px;}
          .nav-links{display:none;}
          .card{padding:32px 24px;}

          .hero-text-block{padding:24px 24px 24px;}
          .hero-text-block h1{font-size:clamp(1.4rem, 7vw, 2rem);white-space:normal;letter-spacing:0.06em;text-align:center;}
          .hero-card{background:var(--card-cream);gap:0;}
          .page{padding-top:12px !important;}
          .hero-text-block .hero-sub{font-size:0.72rem;white-space:nowrap;overflow:hidden;}
          .hero-img-block{min-height:0;height:320px;}

          .who-logo{width:304px;height:304px;}

          .makers-img-top{height:auto;min-height:0;}
          .makers-img-top img{object-fit:cover;height:auto;}
          .makers-text-bottom{padding:28px 24px;margin-top:0;}

          .setting1-img{height:280px;}
          .setting1-text{padding:20px 16px;}
          .setting-byline-mobile{display:block;font-size:0.82rem;white-space:normal;}
          .setting-byline-desktop{display:none;}

          .setting2-split{grid-template-columns:1fr;}
          .setting2-img-col{border-radius:18px 18px 0 0;min-height:240px;}
          .setting2-content{padding:28px 20px;}
          .sf h3{text-align:center;letter-spacing:0.08em;white-space:normal;}
          .sf p{text-align:left;white-space:normal;font-size:0.82rem;}

          .lab-grid{grid-template-columns:1fr;}
          .no-place{padding:28px 24px;}

          .quote-sub{font-size:var(--fs-body);letter-spacing:0;font-weight:600;}
          .quote-text{padding:20px 16px 24px;}
          .quote-title{text-transform:uppercase;white-space:normal;}
          .quote-title:not(.quote-title-mobile){display:none;}
          .quote-title-mobile{display:block !important;font-size:clamp(0.8rem,3.8vw,0.95rem);letter-spacing:0.03em;line-height:1.3;}

          .ritual-grid{grid-template-columns:1fr;}

          .phase2-vertical{flex-direction:column;}
          .phase2-img-top{border-radius:0;}
          .phase2-text{padding:28px 24px !important;}

          .revenue-split{grid-template-columns:1fr;}
          .revenue-img-col{border-radius:18px 18px 0 0;min-height:240px;}
          .revenue-content{padding:28px 24px;}

          .founder-img{height:380px;}

          .art-split{grid-template-columns:1fr;}
          .art-img-col{border-radius:18px 18px 0 0;min-height:260px;}
          .art-text-col{padding:28px 24px;}
          .artwork-lozenge-desktop{display:none !important;}
          .artwork-lozenge-mobile{display:block !important;}

          .art-quote-card{border-radius:18px !important;margin:0 auto 20px !important;box-shadow:0 4px 40px rgba(30,60,10,0.18) !important;}
          .art-quote-section{padding-left:16px !important;padding-right:16px !important;}
          .art-quote-text{white-space:normal;letter-spacing:0.03em;}

          .cta-img{height:520px;}
          .cta-banner{padding:20px 24px;}
          .cta-btn{padding:8px 24px;}

          section{padding-left:16px !important;padding-right:16px !important;}
        }
      `}</style>

      <div className="bg-bokeh" />

      <nav>
        <span className="nav-brand">Unicorn Alliance</span>
        <div className="nav-links">
          <a href="#who">About</a>
          <a href="#setting">The Château</a>
          <a href="#phase1">The Life</a>
          <a href="#phase2">Healing</a>
          <a href="#founder">Founder</a>
        </div>
      </nav>

      <div className="page" style={{paddingTop:'20px'}}>

        {/* ══ 1. HERO ══ */}
        <section style={{padding:'0 40px 20px'}}>
          <div className="hero-card reveal">
            <div className="hero-text-block">
              <h1>Unicorn Alliance</h1>
              <p className="hero-sub">Unicorns are rare. They are magical. Their horn purifies water.<br/>When they show up — expect miracles.</p>
            </div>
            <div className="hero-img-block">
              <img src="/unicorn-assets/hero.jpg" alt="Unicorn Alliance" />
            </div>
          </div>
        </section>

        {/* ══ 2. WHO WE ARE ══ */}
        <section id="who" style={{padding:'0 40px'}}>
          <div className="card card-white reveal">
            <div className="who-inner">
              <p className="who-section-title reveal d1">Who We Are</p>
              <img className="who-logo reveal d2" src="/unicorn-assets/logo1.svg" alt="Unicorn Alliance" />
              <p className="who-tagline reveal d3">Makers Make Miracles</p>
              <div className="who-divider reveal d4" />
              <div className="who-text reveal d5">
                <p>Unicorn Alliance is a creative collective of makers who live their dreams and make magic together. The kind of magic that changes lives and empowers — healing ourselves and the planet.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 3. THE MAKERS ══ */}
        <section id="makers" style={{padding:'0 40px'}}>
          <div className="card card-cream reveal" style={{padding:'0',overflow:'hidden'}}>
            <div className="makers-stack">
              <div className="makers-img-top">
                <img src="/unicorn-assets/makers.jpg" alt="The Makers" />
              </div>
              <div className="makers-text-bottom">
                <h2 className="reveal d1">CALLING ALL MAKERS</h2>
                <p className="reveal d2" style={{marginBottom:'20px',fontSize:'var(--fs-body)',fontWeight:400,color:'var(--text-mid)',fontFamily:'var(--serif)',textAlign:'center',lineHeight:'1.7'}}><em>Your genius flowers when it is offered in service to the whole.</em> — Richard Rudd, The Gene Keys</p>
                <p className="makers-intro reveal d3">The planet needs the full power of our creative genius to survive. Worry, obstacles, excuses, BEGONE! It's time to really rock it and CREATE. Joy is our rocket fuel. It gets even better when we do it together.</p>
                <p className="makers-intro reveal d3" style={{marginBottom:'16px'}}>Unicorn sounds the clarion call for <strong>poets, painters, healers, chefs, landscapers, builders, composers, scientists, entrepreneurs, systems rethinkers, philanthropists, animal whisperers, nature worshipers, light language lovers, benevolent gurus, joy activators, fun fanatics, iconoclasts and international men and women of mystery</strong> — anyone passionate about:</p>
                <ul className="makers-bullets reveal d4">
                  <li>life inside a chateau in the french countryside</li>
                  <li>a diet of daily collaboration with talented peers</li>
                  <li>crafting culture and environments that shift consciousness</li>
                  <li>carving new pathways between art and healing</li>
                  <li>celebrating healing modalities outside the medical model</li>
                  <li>cuddling with horses, goats, chickens and a herd of dogs every single day</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 4. SETTING 1 ══ */}
        <section id="setting" style={{padding:'0 40px'}}>
          <div className="setting1-card reveal">
            <div className="setting1-img">
              <img src="/unicorn-assets/setting1.jpg" alt="The Château" />
            </div>
            <div className="setting1-text">
              <h2>THE SETTING</h2>
              <p className="setting-byline-desktop" style={{textAlign:'left'}}>A 17th-century chateau on 108 acres of pasture, farmland, and woods in the heart of Loire Valley.</p>
              <p className="setting-byline-mobile" style={{textAlign:'left'}}>A 17th-century chateau on 108 acres of pasture, farmland, and woods in the heart of Loire Valley.</p>
            </div>
          </div>
        </section>

        {/* ══ 5. SETTING 2 ══ */}
        <section style={{padding:'0 40px'}}>
          <div className="card card-white reveal" style={{padding:'0',overflow:'hidden'}}>
            <div className="setting2-split">
              <div className="setting2-img-col">
                <img src="/unicorn-assets/setting2.jpg" alt="Château details" />
              </div>
              <div className="setting2-content">
                <div className="setting-features">
                  {[
                    {h:'Marquetry & Fireplaces',p:'Original craftsmanship preserved across nine generations of family stewardship.'},
                    {h:'Orangerie',p:'A grand orangerie — an invitation for a restaurant, exhibition space, or performance hall.'},
                    {h:'Hidden Stairways',p:"Secret passages and architectural mysteries woven into the château's bones."},
                    {h:'Original 19th Century Darkroom',p:'Explore an untouched archive of glass slides and daguerreotypes.',nowrap:true},
                    {h:'Stables, Atelier & Glacier',p:'A medieval icehouse and historic outbuildings ripe for transformation into studios, sanctuaries, and living spaces.'},
                    {h:'Pigeonnier & 17th-Century Stove',p:'A giant pigeonnier and a remarkable 17th-century stove.',nowrap:true},
                  ].map((f,i)=>(
                    <div key={i} className={`sf reveal d${i+1}`}>
                      <h3>{f.h}</h3><p style={f.nowrap ? {whiteSpace:'nowrap'} : {}}>{f.p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 6. LABORATORY ══ */}
        <section id="laboratory" style={{padding:'0 40px'}}>
          <div className="card card-sage reveal">
            <div className="lab-header">
              <h2 style={{textTransform:'none'}}>Phase I: Château as Living Laboratory</h2>
              <p style={{marginTop:'12px'}}>The Unicorn château is more than a historic estate — it is a living laboratory for building environments <strong>in community</strong> that foster creativity, leadership, and healing. Every element of this landscape becomes a teacher, a tool, a sanctuary.</p>
            </div>
            <div className="lab-grid">
              <div className="lab-item reveal d2"><h3>Beauty as Mood Enhancer</h3><p>Environments that actively shift consciousness.</p></div>
              <div className="lab-item reveal d3"><h3>Interior Design as Therapeutic Container</h3><p>Art installation and spatial design as instruments of healing and transformation.</p></div>
              <div className="lab-item reveal d4"><h3>Green Building Practices</h3><p>Historic monument preservation as experimental field for green building practices.</p></div>
              <div className="lab-item reveal d5"><h3>Immersive Rooms</h3><p>Rooms designed with therapeutic goals ie. inner calm, inspiration, alignment with ancestors, journey to the underground.</p></div>
            </div>
            <div className="no-place reveal d3" style={{marginTop:'20px'}}>
              <span className="np-label">No Place Like Home</span>
              <h3>The Château as guild, sanctuary and home</h3>
              <p>The château functions as a multidisciplinary guild. Makers live and build in immersive environments in the château in collaboration with each other and a team of French artisans and experts trained in historic monuments. Makers have the opportunity to lease living and studio space from the many bedrooms and outbuildings in a flexible timeshare structure.</p>
            </div>
          </div>
        </section>

        {/* ══ 7. MONUMENT ══ */}
        <section style={{padding:'0 40px'}} className="reveal">
          <div className="quote-card">
            <div className="quote-img">
              <img src="/unicorn-assets/quote.jpg" alt="Château monument" />
            </div>
            <div className="quote-text">
              <p className="quote-title" style={{whiteSpace:'normal',fontSize:'clamp(1rem,1.8vw,1.4rem)',letterSpacing:'0.06em'}}>LET THE BEAUTY OF A 17TH-CENTURY<br/>MONUMENT INFORM YOUR LIFE.</p>
              <p className="quote-title quote-title-mobile" style={{display:'none',fontSize:'clamp(0.85rem,3.5vw,1rem)',letterSpacing:'0.04em',textTransform:'uppercase'}}>LET THE BEAUTY OF A 17TH-CENTURY<br/>MONUMENT INFORM YOUR LIFE.</p>
            </div>
          </div>
        </section>

        {/* ══ 8. PHASE I ══ */}
        <section id="phase1" style={{padding:'0 40px'}}>
          <div className="card card-sage reveal">
            <div className="phase-header">
              <h2>CREATING CULTURE</h2>
              <p style={{marginTop:'12px'}}>Daily rituals entrain and uplift frequency throughout the day, weaving a living culture of presence, creativity and collective care.</p>
            </div>
            <div className="ritual-grid">
              {[
                {h:'Sunrise & sunset meditations',p:'Bookending each day with stillness and intention, anchoring the community in rhythm and light.',d:'d2'},
                {h:'Communal silence',p:'Shared silence announced by a tolling bell four times a day.',d:'d3'},
                {h:'Grounding in the garden',p:'Sing and tone while caring for plants — embodied presence through earth and voice.',d:'d2'},
                {h:'Movement in nature',p:'Daily swims in the spring-fed moat and yoga in the courtyard.',d:'d3'},
                {h:'Rewilding through animal care',p:'Tending to animals as a practice of presence, empathy, and reconnection with the natural world.',d:'d2'},
                {h:'Shared farm-to-table meals',p:"Farm to table and organic, prepared by Unicorn's private chef — nourishment as ceremony and community.",d:'d3'},
              ].map((r,i)=>(
                <div key={i} className={`ritual-item reveal ${r.d}`}>
                  <h3>{r.h}</h3><p>{r.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 9. PHASE II ══ */}
        <section id="phase2" style={{padding:'0 40px'}}>
          <div className="card card-white reveal" style={{padding:'0',overflow:'hidden'}}>
            <div className="phase2-vertical">
              <div className="phase2-img-top">
                <img src="/unicorn-assets/invitingthevulnerable.jpeg" alt="Inviting the Vulnerable" />
              </div>
              <div className="phase2-text" style={{padding:'44px 52px'}}>
                <p className="phase2-eyebrow">Phase II</p>
                <h2 style={{textAlign:'left',marginBottom:'18px'}}>Inviting in the Vulnerable</h2>
                <p>Once the culture of makers is established, Unicorn offers <strong>creative mentorship</strong> to post-treatment teenagers and young adults with addiction and mental health challenges.</p>
                <p>Unicorn's team of makers provides highly personalized support in awakening the creative voice of the individual through projects. Whether a symphony, art exhibit, performance, or book — <strong>the creative process and the awakening of purpose heals.</strong></p>
                <div className="phase2-highlight">
                  <h3 style={{textAlign:'center',marginBottom:'8px'}}>Family Reunification</h3>
                  <p>Family members are invited to Unicorn for month-long visits to support the creative process of their loved one. This provides what other treatment models do not: a meeting ground for families to reunite, live together, and repair broken relationships.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 10. REVENUE STREAMS ══ */}
        <section id="revenue" style={{padding:'0 40px'}}>
          <div className="card card-sage reveal" style={{padding:'0',overflow:'hidden'}}>
            <div className="revenue-split">
              <div className="revenue-img-col">
                <img src="/unicorn-assets/revenue.jpeg" alt="Revenue" />
              </div>
              <div className="revenue-content">
                <h2>SUSTAINABLE OPPORTUNITIES</h2>
                <div className="rev-list">
                  {[
                    {h:'Product sales',p:'Artisan goods, publications, and creative works produced by the maker community.'},
                    {h:'Experiential programs',p:'Immersive retreats, workshops, and healing programs hosted at the château.'},
                    {h:'Strategic partnerships',p:'Collaborations with aligned organizations in art, wellness, and education.'},
                    {h:'Land leases to farmers',p:"Agricultural partnerships that activate the château's land and support local food systems."},
                    {h:'Co-living Residences',p:'Flexible leasing of rooms and outbuildings to makers and visiting creatives.'},
                  ].map((r,i)=>(
                    <div key={i} className={`rev-item reveal d${i+2}`}>
                      <h3>{r.h}</h3><p>{r.p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 11. THE FOUNDER ══ */}
        <section id="founder" style={{padding:'0 40px'}}>
          <div className="card card-cream reveal">
            <p className="founder-section-title reveal d1">The Founder</p>
            <div className="founder-img reveal d2">
              <img src="/unicorn-assets/founder.jpeg" alt="Meghan Boody" />
            </div>
            <span className="ft-name reveal d3">Meghan Boody</span>
            <span className="ft-sub reveal d4">Multimedia Artist · Pioneer · Visionary</span>
            <div className="founder-divider" />
            <ul className="founder-bullets">
              <li className="reveal d3">Apprenticed with renowned photographer Hans Namuth</li>
              <li className="reveal d4">Pioneer of Photoshop in fine art photography since the early '90s</li>
              <li className="reveal d5">Work held in The Whitney Museum of American Art, Herbert F. Johnson Museum at Cornell, and MONA in Tasmania</li>
              <li className="reveal d6">Monograph published by Kerber Verlag, 2016</li>
              <li className="reveal d6">Founder and co-leader of Gang of Girls, a transformative think tank for women in creative fields, for 15 years</li>
            </ul>
          </div>
        </section>

        {/* ══ 12. QUOTE SLIDE ══ */}
        <section className="art-quote-section" style={{padding:'0 40px'}}>
          <div className="art-quote-card reveal">
            <img src="/unicorn-assets/quote2.jpeg" alt="Quote" />
            <div className="art-quote-grey-bar">
              <p className="art-quote-text">The beauty of the past informs innovation of the present.</p>
            </div>
          </div>
        </section>

        {/* ══ 13. MEGHAN'S ART ══ */}
        <section id="art" style={{padding:'0 40px'}}>
          <div className="card card-white reveal" style={{padding:'0',overflow:'hidden'}}>
            <div className="art-split">
              <div className="art-img-col">
                <img src="/unicorn-assets/meghansart.jpg" alt="Meghan Boody artwork" />
              </div>
              <div className="art-text-col">
                <h2 className="reveal d1">MEGHAN BOODY'S ART</h2>
                <p className="reveal d2">Meghan's fantastical photographs, interactive sculpture and pop-up performances tell stories about the hero's journey, unfolding in her unique brew of fairy tale, myth, and personal memory. Her interest in quantum physics, Jungian psychology, and energy-based healing modalities inform her trippy artwork that explores our relationship with the beyond.</p>
                <p className="reveal d3">Her work will be displayed throughout the château, providing psychological tools, touchpoints, and portals for the community. Artwork by Unicorn's team of makers will follow.</p>
                <p className="art-press reveal d4">Meghan has been celebrated for her magical homes in Dutch Vogue, New York Magazine, Telegraph Magazine, H&amp;G, Cottages and Gardens, Messy Nessy Chic, and Timeout.</p>
                <p className="reveal d5" style={{fontSize:'var(--fs-body)',fontWeight:'600',lineHeight:'1.85',color:'var(--text-body)',marginBottom:'16px',fontFamily:'var(--serif)',textAlign:'left'}}>She is currently writing a fantasy/memoir hybrid about a months long radical shift in consciousness she experienced three years ago.</p>
                <div className="reveal d6" style={{marginTop:'16px',background:'rgba(185,218,185,0.72)',border:'1px solid rgba(42,92,56,0.3)',borderRadius:'8px',padding:'14px 20px',display:'block'}}>
                  <p className="artwork-lozenge-desktop" style={{fontSize:'var(--fs-body)',fontWeight:'700',color:'var(--teal)',fontFamily:'var(--serif)',margin:0,textAlign:'center'}}>All artwork and interiors in this deck by Meghan Boody.<br/>See more of her work<br/><a href="https://lookinglasslabs.com" target="_blank" rel="noopener noreferrer" style={{color:'var(--teal)',textDecoration:'underline',fontWeight:'700'}}>HERE</a></p>
                  <p className="artwork-lozenge-mobile" style={{display:'none',fontSize:'var(--fs-body)',fontWeight:'700',color:'var(--teal)',fontFamily:'var(--serif)',margin:0,textAlign:'center'}}>All artwork and interiors in this deck by Meghan Boody. See more of her work <a href="https://lookinglasslabs.com" target="_blank" rel="noopener noreferrer" style={{color:'var(--teal)',textDecoration:'underline',fontWeight:'700'}}>HERE</a>.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 14. ARE YOU A UNICORN? ══ */}
        <section id="cta" style={{padding:'0 40px 60px'}}>
          <div className="cta-card reveal">
            <div className="cta-img">
              <img src="/unicorn-assets/cta.jpg" alt="Are you a unicorn?" />
            </div>
            <div className="cta-banner">
              <h2>Are You a Unicorn?</h2>
              <p>Discover our unique onboarding process</p>
              <a className="cta-btn" href="mailto:mboody@lookingglasslabs.com">Make Magic Now</a>
            </div>
          </div>
        </section>

        {/* ══ FOOTER — mobile only ══ */}
        <footer className="site-footer" style={{
          background:'rgba(185,218,185,0.72)',
          textAlign:'center',
          padding:'32px 40px',
        }}>
          <p style={{
            fontFamily:'var(--serif)',
            fontSize:'0.72rem',
            letterSpacing:'0.22em',
            textTransform:'uppercase',
            color:'var(--teal)',
            fontWeight:400,
          }}>Unicorn Alliance © 2026</p>
        </footer>

      </div>
    </>
  );
}
