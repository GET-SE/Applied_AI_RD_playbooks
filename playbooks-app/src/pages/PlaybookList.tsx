import React from 'react';

interface Playbook {
  id: string;
  title: string;
  subtitle: string;
  pillar: string;
  stage: string;
}

interface Props {
  playbooks: Playbook[];
}

const PILLARS = [
  {
    key: 'The Culture',
    cssClass: 'pillar-culture',
    iconClass: 'pillar-icon-culture',
    description: 'Intern happiness & team wellbeing',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    key: 'The Bridge',
    cssClass: 'pillar-bridge',
    iconClass: 'pillar-icon-bridge',
    description: 'Research translation & scientific integrity',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v11"/>
        <path d="M2 19h20"/>
        <path d="M8 19v-5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v5"/>
      </svg>
    ),
  },
  {
    key: 'The Craft',
    cssClass: 'pillar-craft',
    iconClass: 'pillar-icon-craft',
    description: 'Engineering rigor & technical excellence',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    key: 'The Visibility',
    cssClass: 'pillar-visibility',
    iconClass: 'pillar-icon-visibility',
    description: 'Governance & stakeholder alignment',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
];

const PlaybookList: React.FC<Props> = ({ playbooks }) => {
  return (
    <div>
      {/* Hero */}
      <section className="playbook-hero animate-fade-in stagger-1">
        <div className="container">
          <h1>The L2M Engine Playbooks</h1>
          <p>
            Research-based guides to bridge the gap between academic innovation and
            industry-grade solutions under the Applied AI R&amp;D program.
          </p>
        </div>
      </section>

      {/* Pillar groups */}
      <section className="pillars-section animate-fade-in stagger-2">
        <div className="container">
          {PILLARS.map((pillar) => {
            const cards = playbooks.filter((p) => p.pillar === pillar.key);
            if (cards.length === 0) return null;

            return (
              <div key={pillar.key} className={`pillar-group ${pillar.cssClass}`}>
                {/* Pillar header */}
                <div className="pillar-header">
                  <div className={`pillar-icon ${pillar.iconClass}`}>
                    {pillar.icon}
                  </div>
                  <div className="pillar-header-text">
                    <h2>{pillar.key}</h2>
                    <p>{pillar.description}</p>
                  </div>
                </div>

                {/* Cards grid */}
                <div className="playbook-grid">
                  {cards.map((pb) => (
                    <a key={pb.id} href={`#/playbook/${pb.id}`} className="playbook-card">
                      <div className="card-top-bar" />
                      <div className="card-body">
                        <span className="card-stage-badge">{pb.stage}</span>
                        <h3>{pb.title}</h3>
                        <p>{pb.subtitle}</p>
                        <span className="card-read-more">
                          Read playbook <span className="arrow">→</span>
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default PlaybookList;
