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

const STAGES = [
  'Stage 1: Setup',
  'Stage 2: Build',
  'Stage 3: Ship',
];

const PILLARS = [
  {
    key: 'The Talent & Culture',
    subtitle: 'People',
    goal: 'Team Formation & Momentum',
    cssClass: 'pillar-culture',
  },
  {
    key: 'The Tech Handover',
    subtitle: 'Technical',
    goal: 'Integration & Delivery',
    cssClass: 'pillar-handover',
  },
  {
    key: 'The Visibility',
    subtitle: 'Governance',
    goal: 'Oversight & Transparency',
    cssClass: 'pillar-visibility',
  },
];

const PlaybookList: React.FC<Props> = ({ playbooks }) => {
  return (
    <div>
      {/* Hero */}
      <section className="playbook-hero animate-fade-in stagger-1">
        <div className="container">
          <h1>Applied AI R&amp;D Framework</h1>
          <p>
            The Accelerator Model — practical playbooks for standing up an AI R&amp;D team,
            delivering production-ready solutions, and proving impact fast.
          </p>
        </div>
      </section>

      {/* Matrix: 3 pillar columns × 3 stage rows */}
      <section className="matrix-section animate-fade-in stagger-2">
        <div className="container">

          {/* Column headers — one per pillar */}
          <div className="matrix-grid">
            {/* Stage label column header (empty top-left cell) */}
            <div className="matrix-stage-col-header">
              <span>Program Stage</span>
            </div>

            {PILLARS.map((pillar) => (
              <div key={pillar.key} className={`matrix-col-header ${pillar.cssClass}`}>
                <div className="matrix-col-title">
                  {pillar.key}
                  <span className="matrix-col-subtitle"> ({pillar.subtitle})</span>
                </div>
                <div className="matrix-col-goal">Goal: {pillar.goal}</div>
              </div>
            ))}

            {/* For each stage row, render the stage label + 4 pillar cells */}
            {STAGES.map((stage) => (
              <React.Fragment key={stage}>
                {/* Stage label */}
                <div className="matrix-row-label">
                  <span>{stage}</span>
                </div>

                {/* One card per pillar for this stage */}
                {PILLARS.map((pillar) => {
                  const pb = playbooks.find(
                    (p) => p.pillar === pillar.key && p.stage === stage
                  );
                  return (
                    <div key={pillar.key} className={`matrix-cell ${pillar.cssClass}`}>
                      {pb ? (
                        <a href={`#/playbook/${pb.id}`} className="matrix-card">
                          <div className="matrix-card-bar" />
                          <div className="matrix-card-body">
                            <h4>{pb.title}</h4>
                            <p>{pb.subtitle}</p>
                            <span className="matrix-read-more">
                              Read <span className="arrow">→</span>
                            </span>
                          </div>
                        </a>
                      ) : (
                        <div className="matrix-cell-empty">
                          <span>Integrated in Build</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default PlaybookList;
