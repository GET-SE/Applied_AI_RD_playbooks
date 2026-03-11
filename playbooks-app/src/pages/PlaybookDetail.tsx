import React, { useEffect } from 'react';

interface Playbook {
    id: string;
    title: string;
    subtitle: string;
    the_big_idea: string;
    why_it_matters: string;
    how_to_do_it: string;
    how_to_do_it_list?: string[];
    tips_for_success: string;
    key_insight: string;
    evidence_of_impact: string;
}

interface Props {
    playbook: Playbook;
}

const PlaybookDetail: React.FC<Props> = ({ playbook }) => {
    useEffect(() => {
        // Reveal animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.content-section').forEach((section) => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, [playbook]);

    return (
        <div className="animate-fade-in">
            <section className="playbook-detail-hero">
                <div className="container">
                    <a href="#/" className="back-link">
                        ← Back to Playbooks
                    </a>
                    <h1 className="text-gradient-accent">{playbook.title}</h1>
                    <p className="subtitle">{playbook.subtitle}</p>
                </div>
            </section>

            <section className="playbook-content">
                <div className="container">
                    {playbook.the_big_idea && (
                        <div className="content-section">
                            <h2>The Big Idea</h2>
                            <p>{playbook.the_big_idea}</p>
                        </div>
                    )}

                    {playbook.why_it_matters && (
                        <div className="content-section">
                            <h2>Why It Matters</h2>
                            <p>{playbook.why_it_matters}</p>
                        </div>
                    )}

                    {playbook.how_to_do_it && (
                        <div className="content-section">
                            <h2>How to Do It</h2>
                            {playbook.how_to_do_it_list ? (
                                <ul className="content-list">
                                    {playbook.how_to_do_it_list.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>{playbook.how_to_do_it}</p>
                            )}
                        </div>
                    )}

                    {playbook.tips_for_success && (
                        <div className="content-section">
                            <h2>Tips for Success</h2>
                            <p>{playbook.tips_for_success}</p>
                        </div>
                    )}

                    {playbook.key_insight && (
                        <div className="content-section">
                            <div className="insight-box">
                                <h3>Key Insight</h3>
                                <p>"{playbook.key_insight}"</p>
                            </div>
                        </div>
                    )}

                    {playbook.evidence_of_impact && (
                        <div className="content-section">
                            <h2>Evidence of Impact</h2>
                            <p>{playbook.evidence_of_impact}</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default PlaybookDetail;
