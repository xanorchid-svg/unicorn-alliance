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
          --card-sage:#c8f0c8;
          --teal:#1a7a30;
          --teal-label:#1a7a30;
          --teal-accent:#1a7a30;
          --text-dark:#1a6828;
          --text-body:#1e7230;
          --text-mid:#227838;
          --text-light:#2a8840;
          --serif:'Cormorant Garamond',Georgia,serif;
        }
        html{scroll-behavior:smooth;font-size:115%;}
        body{
          font-family:var(--serif);
          color:var(--text-dark);
          overflow-x:hidden;
          position:relative;
          background:#3a6e28;
        }
        p,li,span,h1,h2,h3,h4,blockquote{color:inherit;}

        /* 15% larger titles globally */
        h1{font-size:calc(1em * 1.15) !important;}
        h2{font-size:calc(1em * 1.15) !important;}
        h3{font-size:calc(1em * 1.15) !important;}

        @media(max-width:768px){
          html{font-size:100%;}
          h1,h2,h3{font-size:inherit !important;}
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

        /* ── NAV — hidden on all screens ── */
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
        .label{font-size:0.68rem;letter-spacing:0.28em;text-transform:uppercase;color:var(--teal-label);display:block;margin-bottom:14px;font-family:var(--serif);}
        .divider{width:60px;height:1px;background:var(--teal-accent);margin:24px 0;}

        /* ══════════════════════════════════════
           1. HERO — text top 1/3, image bottom 2/3
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
          text-align:right;
        }
        .hero-text-block h1{
          font-size:clamp(3.5rem,10vw,9rem);font-weight:700;
          letter-spacing:0.06em;line-height:0.95;
          color:var(--text-dark);text-transform:uppercase;
          margin-bottom:18px;font-family:var(--serif);white-space:nowrap;
        }
        .hero-text-block .hero-sub{
          font-size:1.05rem;font-weight:600;
          color:var(--text-body);line-height:1.4;font-family:var(--serif);
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
          font-size:clamp(1.8rem,3vw,2.8rem);
          letter-spacing:0.18em;text-transform:uppercase;
          color:var(--text-dark);font-family:var(--serif);
          font-weight:700;margin-top:12px;margin-bottom:32px;line-height:1.0;
        }
        .who-logo{
          width:454px;height:454px;
          display:block;
          margin-bottom:32px;
        }
        .who-tagline{
          font-size:clamp(0.75rem,1.2vw,0.95rem);font-weight:700;
          letter-spacing:0.28em;text-transform:uppercase;
          color:var(--text-mid);font-family:var(--serif);
          margin-bottom:24px;line-height:1.4;
        }
        .who-divider{width:60px;height:1px;background:var(--teal-accent);margin:0 auto 24px;}
        .who-text p{
          font-size:1.05rem;font-weight:600;line-height:1.9;
          color:var(--text-body);max-width:620px;
          margin:0 auto;font-family:var(--serif);text-align:left;
        }

        /* ══════════════════════════════════════
           3. MAKERS — stacked (image top, text bottom)
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
          font-size:clamp(1.8rem,3vw,2.8rem);font-weight:700;
          color:var(--text-dark);margin-bottom:16px;
          font-family:var(--serif);text-align:center;
        }
        .makers-intro{
          font-size:0.98rem;font-weight:600;color:var(--text-mid);
          line-height:1.7;margin-bottom:20px;
          font-family:var(--serif);text-align:left;
        }
        .makers-bullets{list-style:none;margin:0;padding:0;}
        .makers-bullets li{
          font-size:0.95rem;font-weight:600;
          color:var(--text-body);line-height:1.75;
          font-family:var(--serif);
          padding:6px 0;padding-left:1.4em;
          position:relative;text-align:left;
        }
        .makers-bullets li::before{
          content:'✤';
          position:absolute;left:0;
          color:var(--teal);
          font-size:0.85rem;
        }

        /* ══════════════════════════════════════
           4. SETTING 1 — image top 3/4, text bottom 1/4
        ══════════════════════════════════════ */
        .setting1-card{
          border-radius:18px;max-width:900px;margin:0 auto 20px;
          overflow:hidden;
          display:flex;flex-direction:column;
          box-shadow:0 4px 40px rgba(30,60,10,0.22);
          background:var(--card-white);
        }
        .setting1-img{
          width:100%;height:520px;overflow:hidden;
        }
        .setting1-img img{width:100%;height:100%;object-fit:cover;display:block;}
        .setting1-text{
          padding:40px 60px;
          text-align:center;
        }
        .setting1-text h2{
          font-size:clamp(1.8rem,3vw,2.8rem);font-weight:700;
          color:var(--text-dark);letter-spacing:0.08em;
          margin-bottom:16px;font-family:var(--serif);
          text-align:center;
        }
        .setting1-text p{
          font-size:1rem;font-weight:600;color:var(--text-body);
          line-height:1.8;max-width:580px;margin:0 auto;
          font-family:var(--serif);text-align:center;
        }

        /* ══════════════════════════════════════
           5. SETTING 2 — features side by side
        ══════════════════════════════════════ */
        .setting2-split{display:grid;grid-template-columns:1fr 1fr;align-items:stretch;}
        .setting2-img-col{border-radius:18px 0 0 18px;overflow:hidden;min-height:520px;}
        .setting2-img-col img{width:100%;height:100%;object-fit:cover;display:block;}
        .setting2-content{padding:52px 48px;display:flex;flex-direction:column;justify-content:center;}
        .setting-features{display:flex;flex-direction:column;gap:22px;}
        .sf h3{font-size:0.68rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--teal);font-weight:700;margin-bottom:5px;font-family:var(--serif);}
        .sf p{font-size:0.93rem;font-weight:600;line-height:1.6;color:var(--text-body);font-family:var(--serif);text-align:left;}

        /* ══════════════════════════════════════
           6. LABORATORY
        ══════════════════════════════════════ */
        .lab-header{text-align:center;margin-bottom:40px;}
        .lab-header h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:700;color:var(--text-dark);margin-bottom:14px;font-family:var(--serif);}
        .lab-header p{font-size:1rem;font-weight:600;color:var(--text-mid);line-height:1.8;max-width:680px;margin:0 auto;font-family:var(--serif);text-align:left;}
        .lab-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px;}
        .lab-item{background:rgba(255,255,255,0.55);border:1px solid rgba(80,130,60,0.25);border-radius:12px;padding:28px 24px;transition:transform 0.25s,background 0.25s;}
        .lab-item:hover{transform:translateY(-3px);background:rgba(255,255,255,0.8);}
        .lab-item h3{font-size:1rem;font-weight:600;color:var(--teal);margin-bottom:8px;font-family:var(--serif);text-align:center;}
        .lab-item p{font-size:0.9rem;font-weight:600;line-height:1.65;color:var(--text-mid);font-family:var(--serif);text-align:left;}
        .no-place{background:rgba(255,255,255,0.5);border:1px solid rgba(80,130,60,0.2);border-radius:12px;padding:40px 44px;}
        .no-place .np-label{
          font-size:clamp(1.8rem,3vw,2.8rem);letter-spacing:0.04em;
          color:var(--text-dark);display:block;margin-bottom:10px;
          font-family:var(--serif);font-weight:700;line-height:1.15;
        }
        .no-place h3{font-size:1rem;font-weight:600;color:var(--text-mid);margin-bottom:20px;font-family:var(--serif);line-height:1.6;}
        .no-place p{font-size:0.85rem;font-weight:600;line-height:1.9;color:var(--text-mid);font-family:var(--serif);text-align:left;}

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
          font-size:clamp(1.8rem,3vw,2.8rem);font-weight:700;color:var(--text-dark);
          font-family:var(--serif);margin-bottom:14px;
          letter-spacing:0.04em;line-height:1.3;display:block;
        }
        .quote-sub{
          font-size:0.88rem;font-weight:600;
          color:var(--text-mid);font-family:var(--serif);
          letter-spacing:0.08em;display:block;
        }

        /* ══════════════════════════════════════
           8. PHASE I
        ══════════════════════════════════════ */
        .phase-header{text-align:center;margin-bottom:44px;}
        .phase-header .phase-num{
          font-size:clamp(0.9rem,1.5vw,1.1rem);font-weight:600;letter-spacing:0.18em;
          color:var(--text-mid);font-family:var(--serif);display:block;margin-bottom:6px;
        }
        .phase-header h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:700;color:var(--text-dark);margin-bottom:14px;font-family:var(--serif);}
        .phase-header p{font-size:1rem;font-weight:600;color:var(--text-mid);line-height:1.8;max-width:640px;margin:0 auto;font-family:var(--serif);text-align:left;}
        .ritual-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        .ritual-item{background:rgba(255,255,255,0.5);border:1px solid rgba(80,130,60,0.2);border-radius:12px;padding:26px 22px;transition:transform 0.25s,background 0.25s;}
        .ritual-item:hover{transform:translateY(-3px);background:rgba(255,255,255,0.78);}
        .ritual-item h3{font-size:1rem;font-weight:600;color:var(--teal);margin-bottom:7px;font-family:var(--serif);text-align:center;}
        .ritual-item p{font-size:0.9rem;font-weight:600;line-height:1.6;color:var(--text-mid);font-family:var(--serif);text-align:left;}

        /* ══════════════════════════════════════
           9. PHASE II
        ══════════════════════════════════════ */
        .phase2-inner{display:grid;grid-template-columns:1fr 1fr;gap:0;align-items:stretch;}
        .phase2-img{overflow:hidden;min-height:480px;}
        .phase2-img img{width:100%;height:100%;object-fit:cover;display:block;}
        .phase2-text{padding:44px 44px;display:flex;flex-direction:column;justify-content:center;}
        .phase2-text h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:700;color:var(--text-dark);margin-bottom:18px;font-family:var(--serif);text-align:center;}
        .phase2-text p{font-size:0.98rem;font-weight:600;line-height:1.85;color:var(--text-body);margin-bottom:16px;font-family:var(--serif);text-align:left;}
        .phase2-highlight{background:rgba(200,230,180,0.4);border-radius:8px;padding:18px 22px;margin-top:8px;}
        .phase2-highlight h3{font-size:0.98rem;font-weight:600;color:var(--teal);margin-bottom:6px;font-family:var(--serif);text-align:center;}
        .phase2-highlight p{font-size:0.9rem;font-weight:600;color:var(--text-mid);line-height:1.65;font-family:var(--serif);text-align:left;}

        /* ══════════════════════════════════════
           10. REVENUE
        ══════════════════════════════════════ */
        .revenue-split{display:grid;grid-template-columns:1fr 1fr;align-items:stretch;}
        .revenue-img-col{border-radius:18px 0 0 18px;overflow:hidden;min-height:480px;}
        .revenue-img-col img{width:100%;height:100%;object-fit:cover;display:block;}
        .revenue-content{padding:52px 48px;}
        .revenue-content h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:700;color:var(--text-dark);margin-bottom:32px;font-family:var(--serif);text-align:center;}
        .rev-list{display:flex;flex-direction:column;gap:12px;}
        .rev-item{background:rgba(255,255,255,0.55);border:1px solid rgba(80,130,60,0.2);border-radius:10px;padding:20px 22px;transition:transform 0.25s,background 0.25s;}
        .rev-item:hover{transform:translateX(4px);background:rgba(255,255,255,0.8);}
        .rev-item h3{font-size:1rem;font-weight:600;color:var(--text-dark);margin-bottom:5px;font-family:var(--serif);text-align:center;}
        .rev-item p{font-size:0.88rem;font-weight:600;line-height:1.6;color:var(--text-mid);font-family:var(--serif);text-align:left;}

        /* ══════════════════════════════════════
           11. FOUNDER
        ══════════════════════════════════════ */
        .founder-section-title{
          font-size:clamp(1.8rem,3vw,2.8rem);font-weight:700;color:var(--text-dark);
          letter-spacing:0.1em;text-transform:uppercase;
          font-family:var(--serif);text-align:center;margin-bottom:36px;
        }
        .founder-img{border-radius:12px;overflow:hidden;width:100%;height:560px;margin-bottom:28px;}
        .founder-img img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;}
        .ft-name{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:700;color:var(--text-dark);margin-bottom:10px;font-family:var(--serif);display:block;line-height:1.1;}
        .ft-sub{font-size:0.7rem;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:var(--text-light);display:block;margin-top:4px;margin-bottom:24px;font-family:var(--serif);line-height:1.6;}
        .founder-divider{display:none;}
        .founder-bullets{list-style:none;margin-top:8px;}
        .founder-bullets li{display:flex;gap:14px;padding:12px 0;border-bottom:1px solid rgba(80,130,60,0.15);font-size:0.98rem;font-weight:600;line-height:1.65;color:var(--text-body);font-family:var(--serif);text-align:left;}
        .founder-bullets li:last-child{border-bottom:none;}
        .founder-bullets li::before{content:'◆';color:var(--teal-accent);font-size:0.55rem;flex-shrink:0;margin-top:6px;}

        /* ══════════════════════════════════════
           12. MEGHAN'S ART
        ══════════════════════════════════════ */
        .art-text h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:700;color:var(--text-dark);margin-bottom:18px;font-family:var(--serif);text-align:center;}
        .art-text p{font-size:0.97rem;font-weight:600;line-height:1.85;color:var(--text-body);margin-bottom:16px;font-family:var(--serif);text-align:left;}
        .art-press{font-size:0.85rem;font-weight:600;color:var(--text-light);font-family:var(--serif);text-align:left;}

        /* Art split layout */
        .art-split{display:grid;grid-template-columns:1fr 1fr;align-items:stretch;}
        .art-img-col{overflow:hidden;border-radius:18px 0 0 18px;min-height:460px;}
        .art-img-col img{width:100%;height:100%;object-fit:cover;display:block;}
        .art-text-col{padding:48px 44px;display:flex;flex-direction:column;justify-content:center;}
        .art-text-col h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:700;color:var(--text-dark);margin-bottom:18px;font-family:var(--serif);text-align:center;}
        .art-text-col p{font-size:0.97rem;font-weight:600;line-height:1.85;color:var(--text-body);margin-bottom:16px;font-family:var(--serif);text-align:left;}

        /* Footer — hidden on desktop */
        .site-footer{display:none;}
        @media(max-width:768px){
          .site-footer{display:block;}
        }

        /* ══════════════════════════════════════
           12. QUOTE SLIDE — full bleed image, text on top
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
          background:#dcdcdc;
          padding:18px 52px 20px;
          text-align:center;
          font-size:1rem;
          line-height:1;
        }
        .art-quote-text{
          font-size:clamp(1rem,1.8vw,1.4rem);
          font-style:italic;font-weight:600;
          color:#2a2a22;line-height:1.4;
          font-family:var(--serif);
          display:block;
          white-space:nowrap;
        }
        .art-quote-text-overlay{display:none;}

        /* ══════════════════════════════════════
           14. CTA — full image, dark green banner at bottom
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
          font-size:clamp(1.1rem,1.8vw,1.6rem);
          font-weight:300;color:#fff;
          letter-spacing:0.1em;text-transform:uppercase;
          margin-bottom:8px;font-family:var(--serif);
        }
        .cta-banner p{
          font-size:clamp(0.85rem,1.3vw,1rem);
          font-weight:300;color:rgba(255,255,255,0.78);
          margin-bottom:20px;line-height:1.5;
          font-family:var(--serif);
        }
        .cta-btn{
          display:inline-block;padding:10px 36px;
          border:1px solid rgba(255,255,255,0.6);
          color:#fff;font-family:var(--serif);
          font-size:0.78rem;letter-spacing:0.22em;
          text-transform:uppercase;text-decoration:none;
          transition:all 0.3s;background:transparent;
          cursor:pointer;border-radius:2px;
        }
        .cta-btn:hover{background:rgba(255,255,255,0.15);transform:translateY(-2px);}

        /* ══════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════ */
        @media(max-width:768px){
          nav{display:none !important;}
          .card{padding:28px 20px;}

          /* Page */
          .page{padding-top:12px !important;}

          /* Hero */
          .hero-text-block{padding:22px 22px 20px;text-align:right;}
          .hero-text-block h1{font-size:clamp(2.2rem,12vw,3.8rem);white-space:nowrap;}
          .hero-text-block .hero-sub{font-size:0.85rem;line-height:1.5;}
          .hero-img-block{min-height:0;height:280px;}
          .hero-card{background:var(--card-cream);gap:0;}

          /* Who We Are */
          .who-logo{width:200px;height:200px;}
          .who-section-title{font-size:1.6rem;}
          .who-text p{font-size:0.95rem;}

          /* Makers */
          .makers-img-top{height:auto;min-height:0;}
          .makers-img-top img{object-fit:cover;height:auto;}
          .makers-text-bottom{padding:24px 20px;margin-top:0;}
          .makers-text-bottom h2{font-size:1.6rem;}
          .makers-intro{font-size:0.88rem;}
          .makers-bullets li{font-size:0.88rem;}

          /* Setting 1 */
          .setting1-img{height:260px;}
          .setting1-text{padding:24px 20px;}
          .setting1-text h2{font-size:1.6rem;}
          .setting1-text p{font-size:0.88rem;}

          /* Setting 2 */
          .setting2-split{grid-template-columns:1fr;}
          .setting2-img-col{border-radius:18px 18px 0 0;min-height:220px;}
          .setting2-content{padding:24px 20px;}
          .sf h3{font-size:0.62rem;}
          .sf p{font-size:0.85rem;}

          /* Lab */
          .lab-grid{grid-template-columns:1fr;}
          .lab-header h2{font-size:1.6rem;}
          .lab-item{padding:20px 18px;}
          .no-place{padding:24px 20px;}
          .no-place .np-label{font-size:1.6rem;}

          /* Quote card */
          .quote-text{padding:20px 20px;}
          .quote-title{font-size:1.4rem;}
          .quote-sub{font-size:0.8rem;}

          /* Phase I */
          .ritual-grid{grid-template-columns:1fr;}
          .phase-header h2{font-size:1.6rem;}
          .ritual-item{padding:18px 16px;}

          /* Revenue */
          .revenue-split{grid-template-columns:1fr;}
          .revenue-img-col{border-radius:18px 18px 0 0;min-height:220px;}
          .revenue-content{padding:24px 20px;}
          .revenue-content h2{font-size:1.6rem;}

          /* Founder */
          .founder-img{height:340px;}
          .founder-section-title{font-size:1.6rem;}
          .ft-name{font-size:1.4rem;}

          /* Art split */
          .art-split{grid-template-columns:1fr;}
          .art-img-col{border-radius:18px 18px 0 0;min-height:240px;}
          .art-text-col{padding:24px 20px;}
          .art-text-col h2{font-size:1.6rem;}

          /* Art quote */
          .art-quote-card{border-radius:18px !important;margin:0 auto 20px !important;box-shadow:0 4px 40px rgba(30,60,10,0.18) !important;}
          .art-quote-section{padding-left:16px !important;padding-right:16px !important;}
          .art-quote-text{font-size:0.9rem;white-space:normal;}
          .art-quote-grey-bar{padding:16px 24px;}

          /* CTA */
          .cta-img{height:420px;}
          .cta-banner{padding:18px 20px;}
          .cta-banner h2{font-size:0.95rem;}
          .cta-banner p{font-size:0.78rem;margin-bottom:12px;}
          .cta-btn{padding:8px 22px;font-size:0.7rem;}

          /* Global section padding */
          section{padding-left:14px !important;padding-right:14px !important;}
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

        {/* ══ 1. HERO — text top, image bottom ══ */}
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
                <p>Unicorn Alliance is a creative collective of makers who live their dreams and make magic together. The kind of magic that changes lives and empowers, healing ourselves and Planet Earth.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 3. THE MAKERS — stacked ══ */}
        <section id="makers" style={{padding:'0 40px'}}>
          <div className="card card-cream reveal" style={{padding:'0',overflow:'hidden'}}>
            <div className="makers-stack">
              <div className="makers-img-top">
                <img src="/unicorn-assets/makers.jpg" alt="The Makers" />
              </div>
              <div className="makers-text-bottom">
                <h2 className="reveal d1">CALLING ALL MAKERS</h2>
                <p className="reveal d2" style={{marginBottom:'20px',fontSize:'0.95rem',fontWeight:600,color:'var(--text-mid)',fontFamily:'var(--serif)',textAlign:'center',lineHeight:'1.7'}}><em>Your genius flowers when it is offered in service to the whole.</em> — Richard Rudd, founder of The Gene Keys</p>
                <p className="makers-intro reveal d3">The planet needs the full power of <strong>YOUR</strong> creative genius to survive. Worry, obstacles, excuses, BEGONE! It's time to really rock it and CREATE. Joy is our rocket fuel. It gets even better when we do it together.</p>
                <p className="makers-intro reveal d3" style={{marginBottom:'16px'}}>Unicorn sounds the clarion call for <strong>POETS, PAINTERS, HEALERS, CHEFS, LANDSCAPERS, BUILDERS, COMPOSERS, SCIENTISTS, ENTREPRENEURS, SYSTEMS RETHINKERS, PHILANTHROPISTS, ANIMAL WHISPERERS, NATURE WORSHIPERS, LIGHT LANGUAGE LOVERS, BENEVOLENT GURUS, JOY ACTIVATORS, FUN FANATICS, ICONOCLASTS AND INTERNATIONAL MEN AND WOMEN OF MYSTERY</strong> — anyone passionate about:</p>
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

        {/* ══ 4. SETTING 1 — image top, text bottom ══ */}
        <section id="setting" style={{padding:'0 40px'}}>
          <div className="setting1-card reveal">
            <div className="setting1-img">
              <img src="/unicorn-assets/setting1.jpg" alt="The Château" />
            </div>
            <div className="setting1-text">
              <h2>The Setting</h2>
              <p>A 17th-century château in the Loire Valley — in the same family for 9 generations.</p>
            </div>
          </div>
        </section>

        {/* ══ 5. SETTING 2 — features ══ */}
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
                    {h:'Original 19th Century Darkroom',p:'Explore an untouched archive of glass slides and daguerreotypes.'},
                    {h:'Stables, Atelier & Glacier',p:'A medieval icehouse and historic outbuildings ripe for transformation into studios, sanctuaries, and living spaces.'},
                    {h:'Pigeonnier & 17th-Century Stove',p:'A giant pigeonnier and a remarkable 17th-century stove.'},
                  ].map((f,i)=>(
                    <div key={i} className={`sf reveal d${i+1}`}>
                      <h3>{f.h}</h3><p>{f.p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 6. CHÂTEAU AS LIVING LABORATORY ══ */}
        <section id="laboratory" style={{padding:'0 40px'}}>
          <div className="card card-sage reveal">
            <div className="lab-header">
              <h2>Château as Living Laboratory</h2>
              <p style={{marginTop:'12px'}}>The Unicorn château is more than a historic estate — it is a living laboratory for building environments that foster creativity, leadership, and healing. Every element of this landscape becomes a teacher, a tool, and a sanctuary.</p>
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

        {/* ══ 7. MONUMENT — image top 3/4, text bottom 1/4 ══ */}
        <section style={{padding:'0 40px'}} className="reveal">
          <div className="quote-card">
            <div className="quote-img">
              <img src="/unicorn-assets/quote.jpg" alt="Château monument" />
            </div>
            <div className="quote-text">
              <p className="quote-title">Living in a 17th-Century Monument</p>
              <p className="quote-sub">Let the beauty of a 17th Century monument inform your life.</p>
            </div>
          </div>
        </section>

        {/* ══ 8. PHASE I ══ */}
        <section id="phase1" style={{padding:'0 40px'}}>
          <div className="card card-sage reveal">
            <div className="phase-header">
              <h2>Creating Culture</h2>
              <p style={{marginTop:'12px'}}>Daily rituals entrain and uplift frequency throughout the day, weaving a living culture of presence, creativity and collective care.</p>
            </div>
            <div className="ritual-grid">
              {[
                {h:'Sunrise & sunset meditations',p:'Bookending each day with stillness and intention, anchoring the community in rhythm and light.',d:'d2'},
                {h:'Communal silence',p:'Shared silence announced by a tolling bell four times a day.',d:'d3'},
                {h:'Grounding in the garden',p:'Sing and tone while caring for plants — embodied presence through earth and voice.',d:'d2'},
                {h:'Morning swims in the moat',p:"Daily swims in the spring-fed moat.",d:'d3'},
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

        {/* ══ 10. REVENUE STREAMS ══ */}
        <section id="revenue" style={{padding:'0 40px'}}>
          <div className="card card-sage reveal" style={{padding:'0',overflow:'hidden'}}>
            <div className="revenue-split">
              <div className="revenue-img-col">
                <img src="/unicorn-assets/revenue.jpeg" alt="Revenue" />
              </div>
              <div className="revenue-content">
                <h2>Sustainable Opportunities</h2>
                <div className="rev-list">
                  {[
                    {h:'Product sales',p:'Artisan goods, publications, and creative works produced by the maker community.'},
                    {h:'Experiential programs',p:'Immersive retreats, workshops, and healing programs hosted at the château.'},
                    {h:'Strategic partnerships',p:'Collaborations with aligned organizations in art, wellness, and education.'},
                    {h:'Land leases to farmers',p:"Agricultural partnerships that activate the château's land and support local food systems."},
                    {h:'Short & long-term rentals',p:'Flexible timeshare leasing of rooms and outbuildings to makers and visiting creatives.'},
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

        {/* ══ 12. QUOTE SLIDE — above Meghan's Art ══ */}
        <section className="art-quote-section" style={{padding:'0 40px'}}>
          <div className="art-quote-card reveal">
            <img src="/unicorn-assets/quote2.jxl" alt="Quote" />
            <div className="art-quote-grey-bar">
              <p className="art-quote-text">The beauty of the past informs innovation of the present.</p>
            </div>
          </div>
        </section>

        {/* ══ 13. MEGHAN'S ART — image left, text right ══ */}
        <section id="art" style={{padding:'0 40px'}}>
          <div className="card card-white reveal" style={{padding:'0',overflow:'hidden'}}>
            <div className="art-split">
              <div className="art-img-col">
                <img src="/unicorn-assets/meghansart.jpg" alt="Meghan Boody artwork" />
              </div>
              <div className="art-text-col">
                <h2 className="reveal d1">Meghan Boody's Art</h2>
                <p className="reveal d2">Meghan's fantastical photographs, interactive sculpture and pop-up performances tell stories about the hero's journey, unfolding in her unique brew of fairy tale, myth, and personal memory. Her interest in quantum physics, Jungian psychology, and energy-based healing modalities inform her trippy artwork that explores our relationship with the beyond.</p>
                <p className="reveal d3">Her work will be displayed throughout the château, providing psychological tools, touchpoints, and portals for the community. Artwork by Unicorn's team of makers will follow.</p>
                <p className="art-press reveal d4">Meghan has been celebrated for her magical homes in Dutch Vogue, New York Magazine, Telegraph Magazine, H&amp;G, Cottages and Gardens, Messy Nessy Chic, and Timeout.</p>
                <p className="reveal d5" style={{fontSize:'0.97rem',fontWeight:'600',lineHeight:'1.85',color:'var(--text-body)',marginBottom:'16px',fontFamily:'var(--serif)',textAlign:'left'}}>She is currently writing a fantasy/memoir hybrid about a months long radical shift in consciousness she experienced three years ago.</p>
                <div className="reveal d6" style={{marginTop:'16px',background:'#c8f0c8',border:'1px solid rgba(42,92,56,0.3)',borderRadius:'8px',padding:'14px 20px',display:'inline-block'}}>
                  <p style={{fontSize:'0.95rem',fontWeight:'700',color:'var(--teal)',fontFamily:'var(--serif)',margin:0}}>All artwork and interiors in this deck by Meghan Boody. See more of her work <a href="https://lookinglasslabs.com" target="_blank" rel="noopener noreferrer" style={{color:'var(--teal)',textDecoration:'underline',fontWeight:'700'}}>HERE</a>.</p>
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
          background:'#c8f0c8',
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
