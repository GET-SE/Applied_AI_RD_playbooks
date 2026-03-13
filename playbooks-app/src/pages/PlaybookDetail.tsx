import React, { useEffect } from 'react';
import playbooksData from '../data/playbooks.json';
import MathText from '../components/MathText';

interface TipItem {
  type: 'try_this' | 'keep_in_mind' | 'note';
  text: string;
}

interface SopDoc {
  id: string;
  name: string;
  purpose: string;
}

interface SopStep {
  num: number;
  title: string;
  stage: string;
  items: string[];
}

interface Sop {
  docs: SopDoc[];
  steps: SopStep[];
  success_criteria: string[];
  safeguards: string[];
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
  sop?: Sop;
}

interface Props {
  playbook: Playbook;
}

const PILLAR_CLASS: Record<string, string> = {
  'The Talent & Culture': 'pillar-culture',
  'The Tech Handover':    'pillar-handover',
  'The Visibility':       'pillar-visibility',
};

function parseStep(raw: string): { num: string; title: string; body: string } {
  const match = raw.match(/^(\d+)\.\s+([\s\S]+)$/);
  if (!match) return { num: '', title: raw, body: '' };

  const num = match[1];
  const rest = match[2];

  // Strategy 1: stage-labelled steps → "Title (Stage Label) body…"
  const stageMatch = rest.match(/^(.+?\((?:Discovery|Development|Validation|Impact|Setup|Build|Ship|Scouting|Onboarding)\))\s+([\s\S]+)$/);
  if (stageMatch) {
    return { num, title: stageMatch[1].trim(), body: stageMatch[2].trim() };
  }

  // Strategy 2: non-labelled steps — walk word-by-word until title phrase ends
  const words = rest.split(' ');
  const titleWords: string[] = [];
  let bodyStart = words.length;

  for (let i = 0; i < words.length - 1; i++) {
    titleWords.push(words[i]);
    if (titleWords.length < 3) continue;

    const prev = titleWords[titleWords.length - 1];
    const curr = words[i + 1];
    const next = words[i + 2] ?? '';

    if (/^[A-Z"']/.test(prev) && /^[A-Z"']/.test(curr) && /^[a-z]/.test(next)) {
      bodyStart = i + 1;
      break;
    }
  }

  return {
    num,
    title: words.slice(0, bodyStart).join(' ').trim(),
    body: words.slice(bodyStart).join(' ').trim(),
  };
}

// Render a bullet — bold the "Label:" prefix, apply MathText to content
function BulletItem({ text }: { text: string }) {
  const colonIdx = text.indexOf(':');
  if (colonIdx > 0 && colonIdx < 40) {
    const label = text.slice(0, colonIdx);
    const rest = text.slice(colonIdx + 1).trim();
    return (
      <li>
        <strong>{label}:</strong>{rest ? <> <MathText text={rest} /></> : null}
      </li>
    );
  }
  return <li><MathText text={text} /></li>;
}

// Split body on ● markers → lead paragraph + sub-bullet list; apply MathText throughout
function renderStepBody(body: string) {
  const parts = body.split(/●\s*/);
  const lead = parts[0].trim();
  const bullets = parts.slice(1).map(b => b.trim()).filter(Boolean);

  return (
    <>
      {lead && <p className="step-text"><MathText text={lead} /></p>}
      {bullets.length > 0 && (
        <ul className="step-bullets">
          {bullets.map((b, i) => <BulletItem key={i} text={b} />)}
        </ul>
      )}
    </>
  );
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
              <p><MathText text={playbook.the_big_idea} /></p>
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
              <p>{playbook.key_insight}</p>
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
                  <p className="col-body"><MathText text={playbook.why_it_matters} /></p>

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
                          <li key={i}><MathText text={q} /></li>
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
                            <div className="step-title"><MathText text={title} /></div>
                            {body && renderStepBody(body)}
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
                  <p><MathText text={tip.text} /></p>
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
                <p><MathText text={playbook.evidence_of_impact} /></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Implementation Plan (SOP) ─────────────────────────── */}
      {playbook.sop && (
        <div className="sop-band reveal-section">
          <div className="container">
            <div className="sop-header">
              <div className="section-label">Standard Operating Procedure</div>
              <h2 className="band-heading">Implementation Plan</h2>
            </div>

            {/* Required Docs table */}
            {playbook.sop.docs.length > 0 && (
              <div className="sop-docs">
                <h3 className="sop-sub-heading">Required Documentation Stack</h3>
                <table className="sop-table">
                  <thead>
                    <tr><th>Document</th><th>Purpose</th></tr>
                  </thead>
                  <tbody>
                    {playbook.sop.docs.map((doc) => (
                      <tr key={doc.id}>
                        <td><strong>{doc.id}:</strong> {doc.name}</td>
                        <td>{doc.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Steps */}
            {playbook.sop.steps.length > 0 && (
              <div className="sop-steps">
                <h3 className="sop-sub-heading">Step-by-Step Implementation Workflow</h3>
                <div className="sop-steps-grid">
                  {playbook.sop.steps.map((step) => (
                    <div key={step.num} className="sop-step-card">
                      <div className="sop-step-num">{step.num}</div>
                      <div className="sop-step-content">
                        <div className="sop-step-title">
                          {step.title}
                          {step.stage && <span className="sop-step-stage">{step.stage}</span>}
                        </div>
                        {step.items.length > 0 && (
                          <ul className="sop-step-items">
                            {step.items.map((item, i) => {
                              const colonIdx = item.indexOf(':');
                              if (colonIdx > 0 && colonIdx < 30) {
                                const label = item.slice(0, colonIdx);
                                const rest = item.slice(colonIdx + 1).trim();
                                return (
                                  <li key={i}>
                                    <strong>{label}:</strong>{rest ? <> <MathText text={rest} /></> : null}
                                  </li>
                                );
                              }
                              return <li key={i}><MathText text={item} /></li>;
                            })}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Success Criteria & Safeguards side by side */}
            {(playbook.sop.success_criteria.length > 0 || playbook.sop.safeguards.length > 0) && (
              <div className="sop-bottom-grid">
                {playbook.sop.success_criteria.length > 0 && (
                  <div className="sop-criteria">
                    <h3 className="sop-sub-heading">Success Criteria & Monitoring</h3>
                    <ul>
                      {playbook.sop.success_criteria.map((c, i) => {
                        const colonIdx = c.indexOf(':');
                        if (colonIdx > 0 && colonIdx < 40) {
                          const label = c.slice(0, colonIdx);
                          const rest = c.slice(colonIdx + 1).trim();
                          return <li key={i}><strong>{label}:</strong>{rest ? <> <MathText text={rest} /></> : null}</li>;
                        }
                        return <li key={i}><MathText text={c} /></li>;
                      })}
                    </ul>
                  </div>
                )}
                {playbook.sop.safeguards.length > 0 && (
                  <div className="sop-safeguards">
                    <h3 className="sop-sub-heading">Key Implementation Safeguards</h3>
                    <ul>
                      {playbook.sop.safeguards.map((s, i) => {
                        const colonIdx = s.indexOf(':');
                        if (colonIdx > 0 && colonIdx < 40) {
                          const label = s.slice(0, colonIdx);
                          const rest = s.slice(colonIdx + 1).trim();
                          return <li key={i}><strong>{label}:</strong>{rest ? <> <MathText text={rest} /></> : null}</li>;
                        }
                        return <li key={i}><MathText text={s} /></li>;
                      })}
                    </ul>
                  </div>
                )}
              </div>
            )}

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
