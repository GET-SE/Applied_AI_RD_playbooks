import React, { useEffect } from 'react';
import playbooksData from '../data/playbooks.json';

interface TipItem {
  type: 'try_this' | 'keep_in_mind' | 'note';
  text: string;
}

interface Playbook {
  id: string;
  title: string;
  subtitle: string;
  pillar: string;
  stage: string;
  the_big_idea: string;
  why_it_matters: string;
  how_to_do_it_list?: string[];
  tips_list?: TipItem[];
  key_insight: string;
  evidence_of_impact: string;
  pulse_check?: string[];
}

interface Props {
  playbook: Playbook;
}

const PILLAR_CLASS: Record<string, string> = {
  'The Culture':    'pillar-culture',
  'The Bridge':     'pillar-bridge',
  'The Craft':      'pillar-craft',
  'The Visibility': 'pillar-visibility',
};

function parseStep(raw: string): { num: string; title: string; body: string } {
  const match = raw.match(/^(\d+)\.\s+(.+)$/s);
  if (!match) return { num: '', title: raw, body: '' };
  const rest = match[2];
  const splitAt = rest.search(/(?<=[.!?])\s+(?=[A-Z])/);
  if (splitAt === -1) {
    const words = rest.split(' ');
    return { num: match[1], title: words.slice(0, 6).join(' '), body: words.slice(6).join(' ') };
  }
  return { num: match[1], title: rest.slice(0, splitAt).trim(), body: rest.slice(splitAt).trim() };
}

const TipTypeLabel: Record<string, string> = {
  try_this:     '✦ Try This',
  keep_in_mind: '◉ Keep in Mind',
  note:         '◆ Note',
};

const PlaybookDetail: React.FC<Props> = ({ playbook }) => {
  const pillarClass = PILLAR_CLASS[playbook.pillar] || 'pillar-culture';

  const related = (playbooksData as Playbook[])
    .filter((p) => p.pillar === playbook.pillar && p.id !== playbook.id)
    .slice(0, 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal-section').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [playbook]);

  return (
    <div className={pillarClass}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="playbook-detail-hero">
        <div className="container">
          <a href="#/" className="back-link">← Back to Playbooks</a>
          <div className="hero-meta">
            <span className="hero-pillar-badge">
              <span className="hero-pillar-dot" />
              {playbook.pillar}
            </span>
            <span className="hero-stage-label">{playbook.stage}</span>
          </div>
          <h1>{playbook.title}</h1>
          <p className="hero-subtitle">{playbook.subtitle}</p>
        </div>
      </section>

      {/* ── The Big Idea — full width ──────────────────────────── */}
      {playbook.the_big_idea && (
        <div className="big-idea-band reveal-section">
          <div className="container">
            <div className="big-idea-block">
              <div className="section-label">The Big Idea</div>
              <p>{playbook.the_big_idea}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Key Insight quote — full width ────────────────────── */}
      {playbook.key_insight && (
        <div className="quote-band reveal-section">
          <div className="container">
            <hr className="quote-rule" />
            <blockquote className="full-quote">
              <p>"{playbook.key_insight}"</p>
            </blockquote>
            <hr className="quote-rule" />
          </div>
        </div>
      )}

      {/* ── Two-column section ────────────────────────────────── */}
      {(playbook.why_it_matters || (playbook.how_to_do_it_list && playbook.how_to_do_it_list.length > 0)) && (
        <div className="two-col-band reveal-section">
          <div className="container">
            <div className="two-col-grid">

              {/* Left: Why It Matters + Pulse Check */}
              {playbook.why_it_matters && (
                <div className="col-left">
                  <h2 className="col-heading">Why does this matter?</h2>
                  <p className="col-body">{playbook.why_it_matters}</p>

                  {playbook.pulse_check && playbook.pulse_check.length > 0 && (
                    <div className="pulse-check">
                      <div className="pulse-check-label">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                        </svg>
                        Pulse Check
                      </div>
                      <p className="pulse-intro">Think about how this applies to your work. How many of these are true?</p>
                      <ul>
                        {playbook.pulse_check.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Right: How to Do It */}
              {playbook.how_to_do_it_list && playbook.how_to_do_it_list.length > 0 && (
                <div className="col-right">
                  <h2 className="col-heading">How do I put this into practice?</h2>
                  <div className="steps-container">
                    {playbook.how_to_do_it_list.map((raw, idx) => {
                      const { num, title, body } = parseStep(raw);
                      return (
                        <div key={idx} className="step-card">
                          <div className="step-number-bar">{num || idx + 1}</div>
                          <div className="step-body">
                            <div className="step-title">{title}</div>
                            {body && <p className="step-text">{body}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ── Tips for Success — full width ─────────────────────── */}
      {playbook.tips_list && playbook.tips_list.length > 0 && (
        <div className="tips-band reveal-section">
          <div className="container">
            <div className="section-label">Tips for Success</div>
            <h2 className="band-heading">Practical Tips</h2>
            <div className="tips-grid">
              {playbook.tips_list.map((tip, i) => (
                <div key={i} className="tip-card">
                  <div className={`tip-card-type ${tip.type}`}>
                    {TipTypeLabel[tip.type] ?? tip.type}
                  </div>
                  <p>{tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Evidence of Impact — full width ───────────────────── */}
      {playbook.evidence_of_impact && (
        <div className="impact-band reveal-section">
          <div className="container">
            <div className="impact-card">
              <div className="impact-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
              </div>
              <div className="impact-body">
                <h3>Evidence of Impact</h3>
                <p>{playbook.evidence_of_impact}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Related Playbooks ──────────────────────────────────── */}
      {related.length > 0 && (
        <section className="related-section reveal-section">
          <div className="container">
            <h2>More from {playbook.pillar}</h2>
            <div className="related-grid">
              {related.map((r) => (
                <a key={r.id} href={`#/playbook/${r.id}`} className="related-card">
                  <div className="related-card-stage">{r.stage}</div>
                  <h4>{r.title}</h4>
                  <p>{r.subtitle}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default PlaybookDetail;
