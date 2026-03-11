import React from 'react';

interface Playbook {
    id: string;
    title: string;
    subtitle: string;
}

interface Props {
    playbooks: Playbook[];
}

const PlaybookList: React.FC<Props> = ({ playbooks }) => {

    // Helper to get playbook by id
    const getPlaybook = (id: string) => playbooks.find(p => p.id === id);

    const MatrixCell = ({ id }: { id: string }) => {
        const pb = getPlaybook(id);
        if (!pb) return <td className="matrix-cell"></td>;
        return (
            <td className="matrix-cell">
                <a href={`#/playbook/${pb.id}`} className="matrix-card">
                    <h4>{pb.title}</h4>
                    <p>{pb.subtitle}</p>
                    <span className="read-more">
                        Read <span className="arrow">→</span>
                    </span>
                </a>
            </td>
        )
    };

    return (
        <div className="animate-fade-in stagger-1">
            <section className="playbook-hero" style={{ paddingBottom: '2rem' }}>
                <div className="container">
                    <h1 className="text-gradient">The L2M Engine Playbooks</h1>
                    <p>Research-based guides to bridge the gap between academic innovation and industry-grade solutions under the Applied AI R&D program.</p>
                </div>
            </section>

            <section className="container matrix-section animate-fade-in stagger-2">
                <div className="matrix-container">
                    <table className="playbook-matrix">
                        <thead>
                            <tr>
                                <th>Program Stage</th>
                                <th>The Culture<br /><span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>(Intern Happiness)</span></th>
                                <th>The Bridge<br /><span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>(Research Translation)</span></th>
                                <th>The Craft<br /><span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>(Engineering Rigor)</span></th>
                                <th>The Visibility<br /><span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>(Governance)</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="matrix-stage" style={{ padding: '1.25rem' }}>Stage 1: Discovery</td>
                                <MatrixCell id="talent--scouting" />
                                <MatrixCell id="the--research--audit" />
                                <MatrixCell id="tech--stack--design" />
                                <MatrixCell id="the--triad--charter" />
                            </tr>
                            <tr>
                                <td className="matrix-stage" style={{ padding: '1.25rem' }}>Stage 2: Development</td>
                                <MatrixCell id="the--60-20-20--rhythm" />
                                <MatrixCell id="spec--translation" />
                                <MatrixCell id="the--60%--sprint" />
                                <MatrixCell id="the--weekly--pulse" />
                            </tr>
                            <tr>
                                <td className="matrix-stage" style={{ padding: '1.25rem' }}>Stage 3: Validation</td>
                                <MatrixCell id="peer--mentorship" />
                                <MatrixCell id="algorithmic--integrity" />
                                <MatrixCell id="ux-ui--for--ai" />
                                <MatrixCell id="client--alignment" />
                            </tr>
                            <tr>
                                <td className="matrix-stage" style={{ padding: '1.25rem' }}>Stage 4: Impact</td>
                                <MatrixCell id="the--horizon--track" />
                                <MatrixCell id="ip--&--knowledge--base" />
                                <MatrixCell id="scale--&--deployment" />
                                <MatrixCell id="the--executive--view" />
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default PlaybookList;
