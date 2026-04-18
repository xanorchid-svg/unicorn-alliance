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
          --card-white:rgba(252,252,248,0.96);
          --card-cream:rgba(248,246,234,0.97);
          --card-sage:rgba(225,238,210,0.97);
          --teal:#3d6644;
          --teal-label:#4a7a5a;
          --text-dark:#1e2e1a;
          --text-body:#3a4e34;
          --text-mid:#5a6e54;
          --text-light:#8a9e84;
          --gold:#c8a85a;
          --serif:'Cormorant Garamond',Georgia,serif;
        }
        html{scroll-behavior:smooth;}
        body{
          font-family:var(--serif);
          color:var(--text-dark);
          overflow-x:hidden;
          position:relative;
          background:#5a8c3a;
        }

        /* ── BACKGROUND ── */
        .bg-bokeh{
          position:fixed;inset:0;z-index:0;
          background-image:url('/unicorn-assets/background_greenbokeh.jpg');
          background-size:cover;
          background-position:center;
          background-attachment:fixed;
        }
        .bg-bokeh::before{
          content:'';position:absolute;inset:0;
          background:rgba(60,100,30,0.18);
        }

        .page{position:relative;z-index:1;padding:0 0 80px;}

        /* ── NAV ── */
        nav{
          position:fixed;top:0;left:0;right:0;z-index:100;
          display:flex;align-items:center;justify-content:space-between;
          padding:18px 40px;
          background:rgba(200,220,170,0.2);
          backdrop-filter:blur(16px);
          -webkit-backdrop-filter:blur(16px);
          border-bottom:1px solid rgba(255,255,255,0.12);
        }
        .nav-brand{font-size:0.72rem;letter-spacing:0.28em;text-transform:uppercase;color:rgba(255,255,255,0.92);font-weight:400;font-family:var(--serif);}
        .nav-links{display:flex;gap:36px;}
        .nav-links a{font-size:0.68rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.78);text-decoration:none;transition:color 0.2s;font-family:var(--serif);}
        .nav-links a:hover{color:#fff;}

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
        .divider{width:60px;height:1px;background:var(--gold);margin:24px 0;}

        /* ── 1. HERO ── */
        .hero-card{
          position:relative;overflow:hidden;
          border-radius:18px;max-width:900px;margin:0 auto 20px;
          min-height:92vh;
          display:flex;align-items:center;justify-content:flex-start;
          box-shadow:0 4px 40px rgba(30,60,10,0.25);
        }
        .hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
        .hero-overlay{
          position:absolute;inset:0;
          background:linear-gradient(120deg,rgba(10,30,5,0.62) 0%,rgba(20,50,10,0.35) 60%,rgba(10,30,5,0.18) 100%);
        }
        .hero-content{
          position:relative;z-index:2;
          padding:70px;
          max-width:580px;
        }
        .hero-content h1{
          font-size:clamp(3.5rem,6vw,6rem);font-weight:300;
          letter-spacing:0.1em;line-height:1.0;
          color:#fff;text-transform:uppercase;
          text-shadow:0 2px 20px rgba(10,30,5,0.4);
          margin-bottom:28px;
          font-family:var(--serif);
        }
        .hero-content .hero-sub{
          font-size:1.2rem;font-weight:300;
          color:rgba(255,255,255,0.88);line-height:1.75;
          border-left:2px solid rgba(255,255,255,0.5);
          padding-left:18px;
          font-family:var(--serif);
        }

        /* ── 2. WHO WE ARE ── */
        .who-inner{
          display:flex;flex-direction:column;
          align-items:center;
          text-align:center;
          gap:0;
        }
        .who-section-title{
          font-size:clamp(2.8rem,5vw,4.5rem);
          letter-spacing:0.18em;
          text-transform:uppercase;
          color:var(--text-dark);
          font-family:var(--serif);
          font-weight:300;
          margin-bottom:32px;
          line-height:1.0;
        }
        .who-logo{
          width:260px;height:260px;
          display:block;margin:0 auto;
          filter:grayscale(100%) contrast(1.15) brightness(0.78);
          margin-bottom:36px;
        }
        .who-tagline{
          font-size:clamp(1rem,1.8vw,1.3rem);
          font-weight:300;
          letter-spacing:0.28em;
          text-transform:uppercase;
          color:var(--text-mid);
          font-family:var(--serif);
          margin-bottom:28px;
          line-height:1.4;
        }
        .who-divider{width:60px;height:1px;background:var(--gold);margin:0 auto 28px;}
        .who-text p{
          font-size:1.1rem;font-weight:300;line-height:1.9;
          color:var(--text-body);max-width:620px;
          margin:0 auto;font-family:var(--serif);
        }

        /* ── 3. MAKERS ── */
        .makers-split{display:grid;grid-template-columns:1fr 1fr;align-items:stretch;}
        .makers-img-col{border-radius:18px 0 0 18px;overflow:hidden;min-height:480px;}
        .makers-img-col img{width:100%;height:100%;object-fit:cover;display:block;}
        .makers-text-col{padding:48px 44px;}
        .makers-text-col h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:300;color:var(--text-dark);margin-bottom:10px;font-family:var(--serif);}
        .makers-intro{font-size:0.98rem;font-weight:300;color:var(--text-mid);line-height:1.7;margin-bottom:28px;font-family:var(--serif);}
        .makers-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .maker-card{background:rgba(240,248,230,0.7);border:1px solid rgba(120,170,80,0.2);border-radius:10px;padding:20px 18px;transition:transform 0.25s,background 0.25s;}
        .maker-card:hover{transform:translateY(-3px);background:rgba(240,248,230,0.95);}
        .maker-card h3{font-size:0.98rem;font-weight:600;color:var(--teal);margin-bottom:6px;font-family:var(--serif);}
        .maker-card p{font-size:0.88rem;font-weight:300;line-height:1.6;color:var(--text-mid);font-family:var(--serif);}

        /* ── 4. SETTING 1 — full bleed, text centered ── */
        .setting1-card{
          position:relative;overflow:hidden;
          border-radius:18px;max-width:900px;margin:0 auto 20px;
          min-height:520px;
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 4px 40px rgba(30,60,10,0.22);
        }
        .setting1-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
        .setting1-overlay{
          position:absolute;inset:0;
          background:linear-gradient(to bottom,rgba(10,30,5,0.35) 0%,rgba(10,30,5,0.55) 100%);
        }
        .setting1-content{
          position:relative;z-index:2;
          padding:60px;
          width:100%;
          text-align:center;
          display:flex;flex-direction:column;align-items:center;
        }
        .setting1-content .s1-label{
          font-size:0.68rem;letter-spacing:0.28em;text-transform:uppercase;
          color:rgba(210,238,160,0.9);display:block;margin-bottom:16px;
          font-family:var(--serif);
        }
        .setting1-content h2{
          font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:300;
          color:#fff;letter-spacing:0.08em;margin-bottom:20px;
          text-shadow:0 2px 16px rgba(10,30,5,0.5);
          font-family:var(--serif);
        }
        .setting1-divider{width:50px;height:1px;background:rgba(200,168,90,0.8);margin:0 auto 20px;}
        .setting1-content p{
          font-size:1.05rem;font-weight:300;
          color:rgba(255,255,255,0.88);line-height:1.8;
          max-width:560px;margin:0 auto;
          font-family:var(--serif);
        }

        /* ── 5. SETTING 2 — features ── */
        .setting2-split{display:grid;grid-template-columns:1fr 1fr;align-items:stretch;}
        .setting2-img-col{border-radius:18px 0 0 18px;overflow:hidden;min-height:520px;}
        .setting2-img-col img{width:100%;height:100%;object-fit:cover;display:block;}
        .setting2-content{padding:52px 48px;display:flex;flex-direction:column;justify-content:center;}
        .setting-features{display:flex;flex-direction:column;gap:22px;}
        .sf h3{font-size:0.68rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--teal);font-weight:600;margin-bottom:5px;font-family:var(--serif);}
        .sf p{font-size:0.93rem;font-weight:300;line-height:1.6;color:var(--text-body);font-family:var(--serif);}

        /* ── 6. LABORATORY ── */
        .lab-header{text-align:center;margin-bottom:40px;}
        .lab-header h2{font-size:clamp(2rem,3.5vw,3rem);font-weight:300;color:var(--text-dark);margin-bottom:14px;font-family:var(--serif);}
        .lab-header p{font-size:1rem;font-weight:300;color:var(--text-mid);line-height:1.8;max-width:680px;margin:0 auto;font-family:var(--serif);}
        .lab-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px;}
        .lab-item{background:rgba(255,255,255,0.55);border:1px solid rgba(140,180,100,0.3);border-radius:12px;padding:28px 24px;transition:transform 0.25s,background 0.25s;}
        .lab-item:hover{transform:translateY(-3px);background:rgba(255,255,255,0.8);}
        .lab-item h3{font-size:1rem;font-weight:600;color:var(--teal);margin-bottom:8px;font-family:var(--serif);}
        .lab-item p{font-size:0.9rem;font-weight:300;line-height:1.65;color:var(--text-mid);font-family:var(--serif);}

        /* No Place Like Home — heading large, body smaller */
        .no-place{background:rgba(255,255,255,0.5);border:1px solid rgba(140,180,100,0.25);border-radius:12px;padding:40px 44px;}
        .no-place .np-label{font-size:0.68rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--teal-label);display:block;margin-bottom:16px;font-family:var(--serif);}
        .no-place h3{
          font-size:clamp(2.6rem,4.2vw,3.8rem);
          font-weight:300;color:var(--text-dark);
          margin-bottom:20px;letter-spacing:0.02em;
          font-family:var(--serif);
          line-height:1.15;
        }
        .no-place p{font-size:0.85rem;font-weight:300;line-height:1.9;color:var(--text-mid);font-family:var(--serif);}

        /* ── PHOTO CARDS ── */
        .photo-card{max-width:900px;margin:0 auto 20px;border-radius:18px;overflow:hidden;box-shadow:0 4px 40px rgba(30,60,10,0.22);position:relative;min-height:380px;display:flex;align-items:center;}
        .photo-card img.ph-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
        .photo-card .ph-overlay{position:relative;z-index:2;padding:60px 70px;}
        .photo-card .ph-overlay-bg{position:absolute;inset:0;background:rgba(20,40,10,0.38);z-index:1;}
        .monument-text{font-size:clamp(1.8rem,3.5vw,3rem);font-weight:300;line-height:1.4;color:rgba(255,255,255,0.93);text-shadow:0 2px 20px rgba(10,30,5,0.45);font-family:var(--serif);}
        .monument-text em{display:block;font-style:italic;color:rgba(210,238,160,0.96);}

        /* ── 8. PHASE I ── */
        .phase-header{text-align:center;margin-bottom:44px;}
        .phase-header h2{font-size:clamp(2.2rem,3.8vw,3.4rem);font-weight:300;color:var(--text-dark);margin-bottom:14px;font-family:var(--serif);}
        .phase-header p{font-size:1rem;font-weight:300;color:var(--text-mid);line-height:1.8;max-width:640px;margin:0 auto;font-family:var(--serif);}
        .ritual-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        .ritual-item{background:rgba(255,255,255,0.5);border:1px solid rgba(140,180,100,0.25);border-radius:12px;padding:26px 22px;transition:transform 0.25s,background 0.25s;}
        .ritual-item:hover{transform:translateY(-3px);background:rgba(255,255,255,0.78);}
        .ritual-item h3{font-size:1rem;font-weight:600;color:var(--teal);margin-bottom:7px;font-family:var(--serif);}
        .ritual-item p{font-size:0.9rem;font-weight:300;line-height:1.6;color:var(--text-mid);font-family:var(--serif);}

        /* ── 9. PHASE II ── */
        .phase2-inner{display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:start;}
        .phase2-img{border-radius:12px;overflow:hidden;min-height:400px;}
        .phase2-img img{width:100%;height:100%;object-fit:cover;display:block;}
        .phase2-text h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:300;color:var(--text-dark);margin-bottom:18px;font-family:var(--serif);}
        .phase2-text p{font-size:0.98rem;font-weight:300;line-height:1.85;color:var(--text-body);margin-bottom:16px;font-family:var(--serif);}
        .phase2-highlight{background:rgba(200,230,180,0.4);border-left:3px solid var(--gold);border-radius:0 8px 8px 0;padding:18px 22px;margin-top:8px;}
        .phase2-highlight h3{font-size:0.98rem;font-weight:600;color:var(--teal);margin-bottom:6px;font-family:var(--serif);}
        .phase2-highlight p{font-size:0.9rem;font-weight:300;color:var(--text-mid);line-height:1.65;font-family:var(--serif);}

        /* ── 10. REVENUE ── */
        .revenue-split{display:grid;grid-template-columns:1fr 1fr;align-items:stretch;}
        .revenue-img-col{border-radius:18px 0 0 18px;overflow:hidden;min-height:480px;}
        .revenue-img-col img{width:100%;height:100%;object-fit:cover;display:block;}
        .revenue-content{padding:52px 48px;}
        .revenue-content h2{font-size:clamp(2rem,3.5vw,3rem);font-weight:300;color:var(--text-dark);margin-bottom:32px;font-family:var(--serif);}
        .rev-list{display:flex;flex-direction:column;gap:12px;}
        .rev-item{background:rgba(255,255,255,0.55);border:1px solid rgba(140,180,100,0.25);border-radius:10px;padding:20px 22px;transition:transform 0.25s,background 0.25s;}
        .rev-item:hover{transform:translateX(4px);background:rgba(255,255,255,0.8);}
        .rev-item h3{font-size:1rem;font-weight:600;color:var(--text-dark);margin-bottom:5px;font-family:var(--serif);}
        .rev-item p{font-size:0.88rem;font-weight:300;line-height:1.6;color:var(--text-mid);font-family:var(--serif);}

        /* ── 11. FOUNDER ── */
        .founder-inner{
          display:grid;
          grid-template-columns:1.2fr 1fr;
          gap:52px;
          align-items:start;
        }
        .founder-img{
          border-radius:12px;overflow:hidden;
          min-height:780px;
        }
        .founder-img img{width:100%;height:100%;object-fit:cover;object-position:top;display:block;}
        .founder-text-block{padding-top:8px;}
        .ft-name{
          font-size:clamp(2.4rem,3.8vw,3.4rem);
          font-weight:300;color:var(--text-dark);
          margin-bottom:12px;
          font-family:var(--serif);
          line-height:1.1;
          display:block;
        }
        .ft-sub{
          font-size:0.7rem;
          font-weight:400;
          letter-spacing:0.3em;
          text-transform:uppercase;
          color:var(--text-light);
          display:block;
          margin-bottom:0;
          font-family:var(--serif);
          line-height:1.6;
        }
        .founder-bullets{list-style:none;margin-top:8px;}
        .founder-bullets li{
          display:flex;gap:14px;padding:12px 0;
          border-bottom:1px solid rgba(140,180,100,0.2);
          font-size:0.98rem;font-weight:300;line-height:1.65;
          color:var(--text-body);font-family:var(--serif);
        }
        .founder-bullets li:last-child{border-bottom:none;}
        .founder-bullets li::before{content:'✦';color:var(--gold);font-size:0.6rem;flex-shrink:0;margin-top:6px;}

        /* ── 12. ART ── */
        .art-text h2{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:300;color:var(--text-dark);margin-bottom:18px;font-family:var(--serif);}
        .art-text p{font-size:0.97rem;font-weight:300;line-height:1.85;color:var(--text-body);margin-bottom:16px;font-family:var(--serif);}
        .art-quote{font-size:1.3rem;font-style:italic;font-weight:400;color:var(--teal);border-left:3px solid var(--gold);padding-left:18px;margin:22px 0;line-height:1.6;font-family:var(--serif);}
        .art-press{font-size:0.85rem;font-weight:300;color:var(--text-light);font-family:var(--serif);}

        /* ── 13. CTA ── */
        .cta-card{background:var(--card-cream);border-radius:18px;max-width:900px;margin:0 auto;padding:80px 60px;text-align:center;box-shadow:0 4px 40px rgba(30,60,10,0.18);position:relative;overflow:hidden;}
        .cta-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.13;}
        .cta-inner{position:relative;z-index:1;}
        .cta-logo{width:160px;height:160px;object-fit:contain;filter:grayscale(100%) contrast(1.1) brightness(0.8);margin:0 auto 32px;display:block;}
        .cta-card h2{font-size:clamp(2.5rem,5vw,4rem);font-weight:300;color:var(--text-dark);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:18px;font-family:var(--serif);}
        .cta-card p{font-size:1.1rem;font-weight:300;color:var(--text-mid);margin-bottom:44px;line-height:1.7;font-family:var(--serif);}
        .cta-btn{display:inline-block;padding:16px 48px;border:1.5px solid var(--teal);color:var(--teal);font-family:var(--serif);font-size:0.85rem;letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;transition:all 0.3s;background:transparent;cursor:pointer;border-radius:2px;}
        .cta-btn:hover{background:var(--teal);color:#fff;transform:translateY(-2px);box-shadow:0 6px 24px rgba(40,80,30,0.25);}

        /* ── RESPONSIVE ── */
        @media(max-width:768px){
          /* Nav */
          nav{padding:14px 20px;}
          .nav-links{display:none;}

          /* Cards */
          .card{padding:32px 24px;}

          /* Hero */
          .hero-card{min-height:80vh;}
          .hero-content{padding:40px 28px;}
          .hero-content h1{font-size:3rem;}

          /* Who We Are */
          .who-logo{width:200px;height:200px;}
          .who-tagline{font-size:1.7rem;letter-spacing:0.12em;}

          /* Makers */
          .makers-split{grid-template-columns:1fr;}
          .makers-img-col{border-radius:18px 18px 0 0;min-height:260px;}
          .makers-text-col{padding:32px 24px;}
          .makers-grid{grid-template-columns:1fr;}

          /* Setting 1 */
          .setting1-card{min-height:420px;}
          .setting1-content{padding:36px 28px;}
          .setting1-content h2{font-size:2rem;}

          /* Setting 2 */
          .setting2-split{grid-template-columns:1fr;}
          .setting2-img-col{border-radius:18px 18px 0 0;min-height:260px;}
          .setting2-content{padding:32px 24px;}

          /* Lab */
          .lab-grid{grid-template-columns:1fr;}
          .no-place{padding:28px 24px;}
          .no-place h3{font-size:1.6rem;}

          /* Photo cards */
          .photo-card .ph-overlay{padding:36px 28px;}
          .monument-text{font-size:1.5rem;}

          /* Phase I */
          .ritual-grid{grid-template-columns:1fr;}

          /* Phase II */
          .phase2-inner{grid-template-columns:1fr;}
          .phase2-img{min-height:280px;}

          /* Revenue */
          .revenue-split{grid-template-columns:1fr;}
          .revenue-img-col{border-radius:18px 18px 0 0;min-height:260px;}
          .revenue-content{padding:32px 24px;}

          /* Founder */
          .founder-inner{grid-template-columns:1fr;}
          .founder-img{min-height:420px;}
          .ft-name{font-size:2.2rem;}

          /* CTA */
          .cta-card{padding:52px 28px;}
          .cta-logo{width:120px;height:120px;}

          /* Page padding */
          section[style]{padding-left:16px !important;padding-right:16px !important;}
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

      <div className="page" style={{paddingTop:'80px'}}>

        {/* ══ 1. HERO ══ */}
        <section style={{padding:'0 40px 20px'}}>
          <div className="hero-card reveal">
            <img className="hero-bg" src="/unicorn-assets/hero.jpg" alt="" aria-hidden="true" />
            <div className="hero-overlay" />
            <div className="hero-content">
              <h1>Unicorn<br/>Alliance</h1>
              <p className="hero-sub">Unicorns are rare. They are magical. Their horn purifies water. When they show up — expect miracles.</p>
            </div>
          </div>
        </section>

        {/* ══ 2. WHO WE ARE ══ */}
        <section id="who" style={{padding:'0 40px'}}>
          <div className="card card-white reveal">
            <div className="who-inner">
              <p className="who-section-title reveal d1">Who We Are</p>
              <img className="who-logo reveal d2" src="/unicorn-assets/logo.svg" alt="Unicorn Alliance" />
              <p className="who-tagline reveal d3">Makers Make Miracles</p>
              <div className="who-divider reveal d4" />
              <div className="who-text reveal d5">
                <p>Unicorn Alliance is a creative collective of makers who live their dreams and make magic together. The kind of magic that changes lives, that empowers and heals — not only each other but post treatment young adults with challenges.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 3. THE MAKERS ══ */}
        <section id="makers" style={{padding:'0 40px'}}>
          <div className="card card-cream reveal" style={{padding:'0',overflow:'hidden'}}>
            <div className="makers-split">
              <div className="makers-img-col">
                <img src="/unicorn-assets/makers.jpg" alt="The Makers" />
              </div>
              <div className="makers-text-col">
                <span className="label">The Collective</span>
                <h2 className="reveal d1">The Makers</h2>
                <p className="makers-intro reveal d2">Unicorn welcomes poets, painters, landscapers, builders, composers, scientists and entrepreneurs — anyone passionate about:</p>
                <div className="makers-grid">
                  {[
                    {h:'Life Inside a Château',p:'Immersed in the French countryside, living and creating within a historic monument of extraordinary beauty.'},
                    {h:'Daily Collaboration',p:'A diet of creative exchange with talented, passionate peers who push each other toward their highest potential.'},
                    {h:'Crafting Culture',p:'Building environments and shared rituals that shift consciousness and elevate the human experience.'},
                    {h:'Art Meets Healing',p:'Carving new pathways between creative expression and healing, celebrating modalities outside the medical model.'},
                  ].map((c,i)=>(
                    <div key={i} className={`maker-card reveal d${i+2}`}>
                      <h3>{c.h}</h3><p>{c.p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 4. SETTING 1 — full bleed, centered text ══ */}
        <section id="setting" style={{padding:'0 40px'}}>
          <div className="setting1-card reveal">
            <img className="setting1-bg" src="/unicorn-assets/setting1.jpg" alt="The Château" />
            <div className="setting1-overlay" />
            <div className="setting1-content">
              <span className="s1-label">The Setting</span>
              <h2>The Setting</h2>
              <div className="setting1-divider" />
              <p>A 16th-century château in the heart of the Loire Valley. Unicorn Alliance lives in this historic monument, held by the same family for 9 generations, retaining many of its original components.</p>
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
                    {h:'Orangerie',p:'A grand orangerie — perfect for a restaurant or performance piece.'},
                    {h:'Hidden Stairways',p:"Secret passages and architectural mysteries woven into the château's bones."},
                    {h:'Stables, Atelier & Glacier',p:'A medieval icehouse and historic outbuildings ripe for transformation into studios, sanctuaries, and living spaces.'},
                    {h:'Pigeonnier & 17th-Century Stove',p:'A giant pigeonnier and a remarkable 17th-century stove — extraordinary relics of another age.'},
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
              <span className="label">The Château</span>
              <h2>Château as Living Laboratory</h2>
              <p style={{marginTop:'12px'}}>The Unicorn château is more than a historic estate — it is a living laboratory for building environments that foster creativity, leadership, and healing. Every element of this landscape becomes a teacher, a tool, and a sanctuary.</p>
            </div>
            <div className="lab-grid">
              <div className="lab-item reveal d2"><h3>Beauty as mood enhancer</h3><p>Aesthetic environments that actively shift emotional and psychological states.</p></div>
              <div className="lab-item reveal d3"><h3>Interior design as therapeutic container</h3><p>Art installation and spatial design as instruments of healing and transformation.</p></div>
              <div className="lab-item reveal d4"><h3>Green building practices</h3><p>Historic monument preservation as experimental field for green building practices.</p></div>
              <div className="lab-item reveal d5"><h3>Immersive room environments</h3><p>Rooms designed with therapeutic goals — inner calm, inspiration, alignment with ancestors, journey to the underground.</p></div>
            </div>
            <div className="no-place reveal d3" style={{marginTop:'20px'}}>
              <span className="np-label">No Place Like Home</span>
              <h3>The château as guild, sanctuary, and home.</h3>
              <p>The château functions as a multidisciplinary guild. Makers build and live in immersive environments in the château in collaboration with each other and a team of French artisans and experts trained in historic monuments. Makers have the opportunity to lease living and studio space from the many bedrooms and outbuildings in a flexible timeshare structure.</p>
            </div>
          </div>
        </section>

        {/* ══ 7. QUOTE PHOTO CARD ══ */}
        <section style={{padding:'0 40px'}} className="reveal">
          <div className="photo-card" style={{minHeight:'380px'}}>
            <img className="ph-img" src="/unicorn-assets/quote.jpg" alt="Château" />
            <div className="ph-overlay-bg" />
            <div className="ph-overlay">
              <div className="monument-text">A 16th-century monument.<br/><em>Nine generations. One family.</em></div>
            </div>
          </div>
        </section>

        {/* ══ 8. PHASE I ══ */}
        <section id="phase1" style={{padding:'0 40px'}}>
          <div className="card card-cream reveal">
            <div className="phase-header">
              <span className="label">Creating Culture</span>
              <h2>Phase I — Creating Culture</h2>
              <p style={{marginTop:'12px'}}>Daily rituals entrain and uplift frequency throughout the day, weaving a living culture of presence, creativity, and collective care.</p>
            </div>
            <div className="ritual-grid">
              {[
                {h:'Sunrise & sunset meditations',p:'Bookending each day with stillness and intention, anchoring the community in rhythm and light.',d:'d2'},
                {h:'Communal silence',p:'Moments of shared silence announced by a tolling bell — a pause that reconnects the collective.',d:'d3'},
                {h:'Grounding in the garden',p:'Sing and tone while caring for plants — embodied presence through earth and voice.',d:'d2'},
                {h:'Morning swims in the moat',p:"A daily ritual of immersion, awakening the body and spirit in the château's ancient waters.",d:'d3'},
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
          <div className="card card-white reveal">
            <span className="label">Inviting in the Vulnerable</span>
            <div className="phase2-inner">
              <div className="phase2-img">
                <img src="/unicorn-assets/phase2.jpg" alt="Phase II — Creative Mentorship" />
              </div>
              <div className="phase2-text">
                <h2 className="reveal d1">Phase II — Inviting in the Vulnerable</h2>
                <p className="reveal d2">Once the culture of makers is established, Unicorn offers <strong>creative mentorship</strong> to post-treatment teenagers and young adults with addiction and mental health challenges.</p>
                <p className="reveal d3">Unicorn's team of makers provides highly personalized support in awakening the creative voice of the individual through projects. Whether a symphony, art exhibit, performance, or book — <strong>the creative process and the awakening of purpose heals.</strong></p>
                <div className="phase2-highlight reveal d4">
                  <h3>Family Reunification</h3>
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
                <span className="label">Sustainability</span>
                <h2>Revenue Streams</h2>
                <div className="rev-list">
                  {[
                    {h:'Product sales',p:'Artisan goods, publications, and creative works produced by the maker community.'},
                    {h:'Experiential programs',p:'Immersive retreats, workshops, and healing programs hosted at the château.'},
                    {h:'Strategic partnerships',p:'Collaborations with aligned organizations in art, wellness, and education.'},
                    {h:'Leasing land to farmers',p:"Agricultural partnerships that activate the château's land and support local food systems."},
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
            <span className="label">The Founder</span>
            <div className="founder-inner">
              <div className="founder-img">
                <img src="/unicorn-assets/founder.jpeg" alt="Meghan Boody" />
              </div>
              <div className="founder-text-block">
                <span className="ft-name reveal d1">Meghan Boody</span>
                <span className="ft-sub reveal d2">Multimedia Artist · Pioneer · Visionary</span>
                <div className="divider" />
                <ul className="founder-bullets">
                  <li className="reveal d2">Apprenticed with renowned photographer Hans Namuth</li>
                  <li className="reveal d3">Pioneer of Photoshop in fine art photography since the early '90s</li>
                  <li className="reveal d4">Work held in The Whitney Museum of American Art, Herbert F. Johnson Museum at Cornell, and MONA in Tasmania</li>
                  <li className="reveal d5">Monograph published by Kerber Verlag, 2016</li>
                  <li className="reveal d6">Founder and co-leader of Gang of Girls — a transformative think tank for women in creative fields — for 15 years</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 12. MEGHAN'S ART — text only ══ */}
        <section id="art" style={{padding:'0 40px'}}>
          <div className="card card-white reveal">
            <span className="label">The Work</span>
            <div className="art-text">
              <h2 className="reveal d1">Meghan's Art</h2>
              <p className="reveal d2">Boody's fantastical photographs and interactive sculpture tell stories about the hero's journey, unfolding in her unique brew of fairy tale, myth, and personal memory. Her interest in quantum physics, Jungian psychology, and energy-based healing modalities inform her trippy artwork that questions our relationship with the beyond.</p>
              <p className="reveal d3">Her work will be displayed throughout the château, providing psychological tools, touchpoints, and portals for the community. Artwork by Unicorn's team of makers will follow.</p>
              <blockquote className="art-quote reveal d4">"The beauty of the past informs innovation of the present."</blockquote>
              <p className="art-press reveal d5">Boody has been celebrated for her magical homes in Dutch Vogue, New York magazine, Telegraph Magazine, H&amp;G, Cottages and Gardens, Messy Nessy Chic, and Timeout.</p>
            </div>
          </div>
        </section>

        {/* ══ 13. ARE YOU A UNICORN? ══ */}
        <section id="cta" style={{padding:'0 40px 60px'}}>
          <div className="cta-card reveal">
            <img className="cta-bg" src="/unicorn-assets/cta.jpg" alt="" aria-hidden="true" />
            <div className="cta-inner">
              <img className="cta-logo" src="/unicorn-assets/logo.svg" alt="Unicorn Alliance" />
              <h2>Are You a Unicorn?</h2>
              <p>Discover our unique onboarding process</p>
              <a className="cta-btn" href="mailto:mboody@lookingglasslabs.com">Discover Now</a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
