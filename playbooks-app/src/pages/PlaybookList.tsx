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
  'Stage 1: Discovery',
  'Stage 2: Development',
  'Stage 3: Validation',
  'Stage 4: Impact',
];

const PILLARS = [
  {
    key: 'The Culture',
    subtitle: 'Interpersonal',
    goal: 'Motivation & Career Growth',
    cssClass: 'pillar-culture',
  },
  {
    key: 'The Bridge',
    subtitle: 'Intellectual',
    goal: 'Translation & Knowledge Transfer',
    cssClass: 'pillar-bridge',
  },
  {
    key: 'The Craft',
    subtitle: 'Operational',
    goal: 'Engineering Excellence',
    cssClass: 'pillar-craft',
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
          <h1>The L2M Engine Playbooks</h1>
          <p>
            Research-based guides to bridge the gap between academic innovation and
            industry-grade solutions under the Applied AI R&amp;D program.
          </p>
        </div>
      </section>

      {/* Matrix: 4 pillar columns × 4 stage rows */}
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
                      ) : null}
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
