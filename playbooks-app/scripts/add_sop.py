import json
import re

SOP_TEXT = """
Process: Scouting & Onboarding
1. Required Documentation Stack
Doc 1: The Hybrid JD\tA job description that emphasizes theory-to-code translation.
Doc 2: The Bridge Interview Rubric\tA standardized evaluation form for the paper-to-code task.
Doc 3: The 60/20/20 Cultural Contract\tA 1-page agreement signed by the intern during onboarding.
Doc 4: The Horizon Goal Sheet\tA document capturing the intern's long-term career ambition.
2. Step-by-Step Implementation Workflow
Step 1: Targeted Sourcing (Discovery)
The Action: Scan repositories and portfolios for "Bridge Signals" (e.g., custom implementations of research papers, complex data visualizations, or math-heavy hobby projects).
Filter Criterion: Reject candidates who only show "standard" web-dev portfolios. Prioritize those with high grades in linear algebra, probability, or calculus.
Step 2: The "Bridge" Interview (Evaluation)
The Preparation: Select a 1-page excerpt from a relevant research paper.
The Task: Give the candidate 15 minutes to read the excerpt. Ask them to: Explain the core mathematical logic in plain English. Draft a Python function signature (parameters and return types) for that logic. Identify three edge cases that would crash the implementation.
Evaluation: Score based on "Clarity of Translation" rather than "Coding Speed."
Step 3: The 60/20/20 Alignment (Onboarding)
The Action: In the first 60 minutes of Day 1, review Doc 3 (Cultural Contract).
The Narrative: "We are paying you for 60% delivery. We are investing in you for 40% growth. If you fail to use your 20% Learning time, you are violating the contract."
Logistics: Set up their calendar with recurring blocks: Mon-Wed (Core), Thu (Learning), Fri (Community).
Step 4: Horizon Pathing (Integration)
The Action: Conduct the "Future-Self" interview using Doc 4 (Horizon Goal Sheet).
The Question: "In two years, do you want to be defending a PhD thesis or leading an engineering team at a startup?"
Result: The answer determines which 20% Learning tracks the PM team approves for the first month.
3. Success Criteria & Monitoring
Weekly Check: Does the intern have a Thursday learning goal posted by 9:00 AM?
Monthly Check: Can the intern explain the "why" behind their code to a research owner?
The "Red Flag": If an intern asks for help with basic environment setup (Docker, Python paths) more than twice in the first week, the "Scouting" filter failed to detect a lack of self-sufficiency.
4. Key Implementation Safeguards
The Hybrid JD: The job description must explicitly state the 60/20/20 split to self-select for candidates who value growth.
Doc 3 (60/20/20 Contract): The contract must be signed on Day 1 before any project work begins.
Doc 1 (Hybrid JD) Highlight: "We are looking for a Researcher-Engineer hybrid. You will spend 60% of your time building production APIs and 20% of your time reproducing academic papers. You must be comfortable with both LaTeX and Docker."

Process: The Technical Audit
1. Required Documentation Stack
Doc 1: Artifact Inventory\tA checklist of all papers, repositories, datasets, and weights.
Doc 2: Reproducibility Report\tDocumentation of the environment setup and execution results.
Doc 3: Gap Analysis Memo\tComparison of research claims vs. practical performance.
Doc 4: Frozen Baseline Spec\tThe "clean" starting point documentation for the engineering team.
2. Step-by-Step Implementation Workflow
Step 1: Artifact Gathering (Discovery)
The Action: Collect every piece of the puzzle. This includes the PDF paper, the primary GitHub repository, the raw datasets, and any pre-trained model weights.
The "Shadow" Check: The PM must interview the research owner specifically to find "unofficial" scripts or local paths that were used for the paper's final figures but aren't in the main repo.
Output: Complete Doc 1 (Artifact Inventory).
Step 2: Reproducibility Stress Test (Development)
The Action: The Engineering Intern attempts to run the research code in a strictly isolated environment (e.g., a fresh Docker container).
The Goal: Match the primary result stated in the paper using the provided data.
Constraints: If the code requires specific hardware (e.g., "Only runs on A100 GPUs") or proprietary libraries, these must be logged as "High-Priority Constraints."
Output: Complete Doc 2 (Reproducibility Report).
Step 3: Scientific Gap Analysis (Validation)
The Action: Compare the "Ideal" results from the paper with the "Actual" results on noisy or real-world data samples.
The Question: "Does the model fail gracefully on bad data, or does it crash?"
Result: Identify the "Delta" (the gap in accuracy, latency, or stability).
Output: Complete Doc 3 (Gap Analysis Memo).
Step 4: Freezing the Baseline (Impact)
The Action: Strip away the experimental "scaffolding" (unused scripts, temporary data folders).
The Packaging: Organize the core logic into a modular format. Write a clear "How-to-Run" guide that assumes the reader has zero knowledge of the original research.
The Sign-Off: The Research Owner and PM review this version. Once approved, this code is "Frozen"—no more research experiments are allowed in this specific codebase.
Output: Complete Doc 4 (Frozen Baseline Spec).
3. Success Criteria & Monitoring
The "One-Click" Rule: A new engineer should be able to run the Frozen Baseline using a single command (e.g., docker-compose up).
Baseline Consistency: The outputs of the Frozen Baseline must match the original research outputs within a $10^{-6}$ tolerance.
The "Red Flag": If the reproducibility test fails after three attempts, the project returns to the Research Owner for "Refactoring" before the PM team commits any further resources.
4. Key Implementation Safeguards
The Audit Gate: Under no circumstances should "Stage 2: Build" begin until Doc 4 is signed.
Template Rigor: If Doc 2 (Reproducibility) shows that setup took more than 4 hours, the PM must prioritize "Environment Documentation" as the first task of the next sprint.
Truth-Seeking Mindset: The auditor's job is not to fix the research code, but to expose its limitations so they can be managed during engineering.

Process: The Project Charter
1. Required Documentation Stack
Doc 1: The One-Page Charter\tThe master agreement summarizing the project goals and participants.
Doc 2: The Role Boundary Matrix\tA RACI-style table defining who is Lead, Support, or "Not Responsible."
Doc 3: The KPI Scorecard\tA definition of Product (Technical) and Team (Cultural) success metrics.
Doc 4: The Heartbeat Agenda\tA standardized template for the 15-minute weekly alignment sync.
2. Step-by-Step Implementation Workflow
Step 1: The Triad Kickoff (Discovery)
The Action: PM hosts a 45-minute meeting with the Research Owner and the Engineering Interns.
The Goal: Align on the "Value Metric." Ask: "If this project is a massive success in one month, what is the single number that changed?"
Output: Draft the high-level goals in Doc 1 (The One-Page Charter).
Step 2: Boundary Definition (Development)
The Action: Explicitly define the "Lanes" for each member to prevent role creep.
The Exercise: Fill out Doc 2 (Role Boundary Matrix). Ensure it is clear that: Researchers do not fix UI bugs or write API boilerplate. Engineers do not alter core mathematical logic without consultation. PMs do not write code; they manage the environment and the client.
Output: Finalized Doc 2 (Role Boundary Matrix).
Step 3: Metric Selection (Validation)
The Action: Define how success will be measured, balancing the build with the culture.
The Selection: Choose 2 Product KPIs (e.g., Latency < 200ms) and 2 Team KPIs (e.g., 100% Learning Log completion).
Validation: The Research Owner must confirm that the Product KPIs do not compromise scientific accuracy.
Output: Complete Doc 3 (The KPI Scorecard).
Step 4: Heartbeat Setup & Signature (Impact)
The Action: Schedule the recurring 15-minute weekly "Triad Heartbeat" on the calendar (ideally Friday mornings).
The Commitment: All parties sign the one-page charter. This is a symbolic act of commitment to the 60/20/20 rhythm and the project goals.
Output: Signed Doc 1 and a calendar invite containing Doc 4 (Heartbeat Agenda).
3. Success Criteria & Monitoring
The "One-Page" Rule: If the Charter or Matrix exceeds one page, it is too complex. Re-draft until it is glanceable.
Role Adherence: During the Weekly Pulse, the PM should flag if any member is working "outside their lane" (e.g., an Intern attempting to rewrite a paper's proof).
The "Red Flag": If a project reaches Week 2 without a signed Charter, the PM must pause all engineering sprints until alignment is reached.
4. Key Implementation Safeguards
The "Not Responsible" List: The most critical part of the Charter is the "Not Responsible" section. It protects the Research Owner from being treated as a developer and the Intern from being treated as a pure researcher.
Living Document: If the client changes the scope, the KPI Scorecard must be updated immediately to reflect the new reality.
Accountability: The Charter is used during the "Impact & Evaluation" stage to determine if the intern is ready for the "Horizon Track."

Process: The 60/20/20 Rhythm
1. Required Documentation Stack
Doc 1: The Master Calendar\tA standardized weekly template shared across the lab.
Doc 2: The Thursday Learning Goal\tA brief morning commitment (Slack/Email) for the 20% growth day.
Doc 3: The Weekly Learning Log\tA documented summary of progress made during protected time.
Doc 4: The Monthly "Show & Tell" Agenda\tA template for showcasing how learning impacted project delivery.
2. Step-by-Step Implementation Workflow
Step 1: Strict Calendar Blocking (Setup)
The Action: During onboarding, the PM sets the "Golden Calendar" for the Intern.
The Blocks: Monday-Wednesday (60%): Production Sprints. Total "No-Meeting" zones for deep engineering work. Thursday (20%): Protected Learning. Zero client or sprint meetings allowed. Friday (20%): Lab Culture. Seminar attendance, PM syncs, and "Fun Friday" bonding.
Output: Shared Doc 1 (The Master Calendar) synced to the PM dashboard.
Step 2: Goal Contracting (Weekly Planning)
The Action: Every Thursday at 09:30 AM, the intern submits Doc 2 (Learning Goal) to a shared channel.
The Standard: The goal must be specific (e.g., "Implement a WebSocket server" instead of "Learn backend").
PM Role: Briefly review the goal to ensure it aligns with either the current project's needs or the intern's "Horizon Path."
Output: Timestamped commitment in the communication log.
Step 3: Protecting the Boundary (Audit)
The Action: During the Wednesday evening "Pre-Learning Sync," the PM asks: "Are you on track to close your sprint tickets by 6:00 PM today?"
The Correction: If the answer is "No," the PM evaluates if the scope was too large. Under no circumstances is the intern permitted to "borrow" Thursday hours to finish Wednesday tasks without a formal emergency declaration.
Output: Mid-week health check recorded in the Weekly Pulse.
Step 4: Knowledge Monetization (Impact)
The Action: Every Friday afternoon, interns update their Doc 3 (Learning Log).
The Demo: Once a month, the PM hosts the "Show & Tell" using Doc 4. Interns must demonstrate one small tool or optimization they learned that is now active in the production codebase.
Output: Updated IP & Knowledge Base entries.
3. Success Criteria & Monitoring
The "Burnout Check": Is the intern working after 7:00 PM on "Core Days"? If yes, the 60% workload is too heavy.
Learning Application: Within 3 weeks of a "Learning Goal," can we see the impact of that skill in a GitHub Pull Request?
The "Red Flag": If a client demands a meeting on a Thursday and the PM accepts it, the system has failed. The PM is the "Shield" for the 20% time.
4. Key Implementation Safeguards
Non-Negotiable Growth: Treat Thursday Learning as a "Client Deliverable." If an intern doesn't learn, they are considered "behind" on the project.
The One-Page Rule: Learning Logs (Doc 3) should be bulleted and limited to one page. We value "Skills Gained" over "Hours Spent."
Leadership Alignment: Prof. Jawahar must be aware that Thursdays are "Blackout Days." This prevents top-down interruptions.

Process: The Production Sprint
1. Required Documentation Stack
Doc 1: The Sprint Backlog\tA prioritized list of technical tickets (e.g., in Jira, Linear, or GitHub).
Doc 2: The Sprint Goal\tA one-sentence definition of what the team is shipping this cycle.
Doc 3: The Definition of Done (DoD)\tA checklist of quality standards every ticket must meet before closing.
Doc 4: The Build Changelog\tA summary of features and fixes added to the current deployable build.
2. Step-by-Step Implementation Workflow
Step 1: Sprint Scoping (Discovery)
The Action: Every Monday at 09:00 AM, the PM and Lead Engineer review the "Bridge Document" and the "Technical Audit."
The Task: Select a cluster of features that can be fully completed within the 3-day core window.
The Guardrail: If a task is too large, it must be broken down into sub-tickets that can be completed in <4 hours.
Output: Finalized Doc 2 (Sprint Goal) and a prioritized Doc 1 (Backlog).
Step 2: High-Velocity Execution (Development)
The Action: From Monday 10:00 AM to Wednesday 4:00 PM, the team enters a "Deep Work" state.
The Rules: No-Meeting Blocks: All non-essential syncs are cancelled. Daily Standup: A 10-minute "Sync at the Board" at 10:00 AM to flag blockers. Focus: Only tickets in the current sprint are worked on. No "side-quest" optimizations.
Output: Frequent code commits to the development branch.
Step 3: Integration & Validation (Validation)
The Action: On Wednesday afternoon, all features are merged into the staging branch.
The Check: Run the "Truth Dataset" (from the Technical Audit) against the new build. If the scientific accuracy has drifted, the ticket is rejected even if the code "works."
Standard: Apply Doc 3 (Definition of Done). A ticket is not done unless it is documented, tested, and containerized.
Output: A stable "Internal Release" of the software.
Step 4: Sprint Review & Demo (Impact)
The Action: On Friday during Community Day, the team demonstrates the build to the Research Owner.
The Goal: Prove that the theoretical logic is now functional software.
Impact: Update Doc 4 (Build Changelog) to show the progress made during the week.
Output: A deployable artifact ready for the next cycle or client review.
3. Success Criteria & Monitoring
Velocity Accuracy: Did the team complete >80% of the committed tickets? If no, the PM must reduce the scope for the next sprint.
DoD Compliance: Does the code contain meaningful variable names (mapping to the Bridge Doc) and error handling for edge cases?
The "Red Flag": If a sprint ends with "nearly finished" tickets for three weeks in a row, it indicates a breakdown in scoping or a failure to protect the 60% time.
4. Key Implementation Safeguards
Strict No-Meeting Zones: The PM is the "Enforcer." Any internal or external meeting request for Monday-Wednesday must be diverted to Thursday or Friday.
The "Frozen" Rule: Engineers cannot change core research logic without a formal "Bridge Update." If they find a better way to implement the math, it must be reviewed by the Researcher first.
Documentation is Delivery: A feature is only considered "shipped" once the IP & Knowledge Base has been updated with its translation logic.

Process: The Low-Touch Pulse
1. Required Documentation Stack
Doc 1: Automated Pulse Dashboard\tA real-time view of ticket velocity, code commits, and learning logs.
Doc 2: The Tactical Sync Agenda\tA strict 15-minute template focused on blockers and growth.
Doc 3: The Exception Log\tA list of "Red/Yellow" flags that require immediate PM intervention.
Doc 4: The Weekly Status Update\tA glanceable "Traffic Light" report for stakeholders.
2. Step-by-Step Implementation Workflow
Step 1: Data Stream Integration (Setup)
The Action: Link all operational tools to a central visibility platform (e.g., syncing GitHub, Jira/Linear, and Slack).
The Automation: Engineering: Automatically pull commit frequency and ticket completion status. Culture: Automatically flag if a "Thursday Learning Log" is missing by Friday morning.
Output: A live, data-driven Doc 1 (Automated Pulse Dashboard).
Step 2: The 15-Minute Tactical Sync (Execution)
The Action: PM leads a high-impact, 15-minute sync (typically Wednesday or Friday).
The Rule: Do not discuss "completed tasks"—the dashboard already shows them.
The Agenda (Doc 2): 0-5 mins: Review the "Pulse" data. 5-12 mins: Blocker Deep-Dive: "What is stopping the 60% Sprint?" 12-15 mins: Growth Check: "Are the 20% Learning goals on track?"
Output: Updated Doc 3 (Exception Log) with clear action items.
Step 3: Qualitative Validation (Verification)
The Action: PM cross-references the dashboard data with team sentiment.
The Question: "Does high velocity match the team's stress level?"
Validation: If the data looks "Green" but the team feels "Red," the PM must pause to investigate hidden technical debt or burnout risks that the automated tools missed.
Output: Refined status based on human and data feedback.
Step 4: The Traffic Light Broadcast (Visibility)
The Action: Every Friday by 5:00 PM, the PM sends a high-level summary.
The Format (Doc 4): Green: On track. No intervention needed. Yellow: At risk. Specific blocker identified. Red: Stalled. Leadership intervention or resource shift required.
Output: The Doc 4 (Weekly Status Update) shared with the Research Owner and leadership.
3. Success Criteria & Monitoring
Data Integrity: Is the dashboard data accurate? If interns are not updating tickets, the "Pulse" is useless.
Sync Efficiency: Does the Tactical Sync consistently finish in 15 minutes or less?
The "Red Flag": If a blocker remains on the Exception Log for more than two consecutive Pulse cycles, the PM must escalate the issue to the Research Owner.
4. Key Implementation Safeguards
Exception-Based Management: Only talk about what is broken or stuck. If everything is on track, the meeting can be cancelled.
Automation First: If a piece of data can be pulled automatically from GitHub or Jira, never ask a human to report it manually.
PM as the "Sweeper": The PM's role during the Pulse is to "sweep" obstacles out of the engineers' way so they can return to deep work.

Process: Validation & Deployment
1. Required Documentation Stack
Doc 1: The Scientific Delta Report\tA comparison of production outputs vs. the Frozen Baseline.
Doc 2: Deployment Configuration (IAC)\tHardened Docker/Kubernetes files and environment variable specs.
Doc 3: System Performance Log\tResults of stress tests, latency benchmarks, and resource usage.
Doc 4: The Client Handover Kit\tA "Service Manual" for the client including credentials and recovery steps.
2. Step-by-Step Implementation Workflow
Step 1: Scientific Integrity Check (Validation)
The Action: Run the "Truth Dataset" (established in the Technical Audit) through the final production API.
The Check: Compare the outputs against the original "Frozen Baseline."
The Threshold: If accuracy or numerical values deviate beyond the variance allowed in the Project Charter, the deployment is blocked.
Output: Signed Doc 1 (The Scientific Delta Report) by the Research Owner.
Step 2: Environmental Hardening (Development)
The Action: Transition code from a "Development" state to a "Production" state.
The Tasks: Remove all debug logs and experimental endpoints. Implement API rate-limiting and authentication. Containerize using production-grade images (e.g., Slim/Alpine) to reduce security vulnerabilities.
Output: Finalized Doc 2 (Deployment Configuration) stored in the version control system.
Step 3: Stress & Latency Trial (Validation)
The Action: Subject the hardened system to a "Trial by Fire" using load-testing tools.
The Metrics: Simulate the peak concurrent users defined in the Project Charter. Monitor for memory leaks or GPU bottlenecks during sustained inference. Verify that P95 latency stays within acceptable limits.
Output: Doc 3 (System Performance Log).
Step 4: Final Handover & Knowledge Transfer (Impact)
The Action: Bundle all technical artifacts and documentation for the client or the lab's permanent archive.
The Handover: Walk the client or recipient team through the "Service Manual." Ensure they can successfully spin up the environment from scratch without PM assistance.
Output: Delivered Doc 4 (Client Handover Kit) and updated IP & Knowledge Base.
3. Success Criteria & Monitoring
Accuracy Stability: Does the production build match the scientific baseline with $>99.9\\%$ consistency?
Zero-Downtime Deployment: Can the system be deployed or updated without significant service interruption?
The "Red Flag": If a system passes technical tests but fails scientific validation (i.e., the math is "wrong"), the PM must halt the handover regardless of technical performance.
4. Key Implementation Safeguards
No Manual Deployments: Every deployment must be driven by the Doc 2 configuration files. If a fix requires manual server intervention, it is a failure of "The Craft."
Researcher Veto Power: The Research Owner has final veto power during the Step 1 Delta Check. Their signature is mandatory for deployment.
The 1-Hour Recovery Rule: The system must be designed such that it can be fully recovered from a total failure in under one hour using the Doc 4 Handover Kit.

Process: The Executive View
1. Required Documentation Stack
Doc 1: The Strategic Dashboard\tA master view showing the "Traffic Light" status and KPIs of all active projects.
Doc 2: The Monthly Executive Summary\tA one-page narrative highlighting major wins, critical risks, and resource needs.
Doc 3: Impact & ROI Report\tA summary of validated outcomes (e.g., cost savings, talent transitions, IP generated).
Doc 4: Strategic Review Agenda\tA template for the 30-minute monthly leadership sync.
2. Step-by-Step Implementation Workflow
Step 1: Strategic Data Aggregation (Discovery)
The Action: PM pulls the "rolled up" data from the Low-Touch Pulses of the past four weeks.
The Goal: Look for trends across the entire program. Are multiple projects facing the same technical blocker? Is the "Learning 20%" being consistently protected?
Output: Updated Doc 1 (Strategic Dashboard) with current month metrics.
Step 2: Synthesis & Traffic Lighting (Development)
The Action: Assign a final status (Green, Yellow, Red) to each project for the month.
The Requirement: Every "Yellow" or "Red" status must be accompanied by a "Required Action" for leadership (e.g., "Need access to specific compute resources" or "Need client contract extension").
Output: Drafted Doc 2 (Monthly Executive Summary).
Step 3: The Strategic Review Meeting (Validation)
The Action: PM hosts a strictly-timed, 30-minute meeting with leadership.
The Agenda (Doc 4): 0-5 mins: Review the "Program Health" heatmap. 5-20 mins: Deep-dive into "Red/Yellow" projects and resource bottlenecks. 20-30 mins: Strategic Pathing (Reviewing the Horizon Track for top performers).
Output: Meeting minutes with approved resource shifts or strategic decisions.
Step 4: Program Horizon Adjustment (Impact)
The Action: Implement the decisions made during the review.
The Result: This might involve moving an intern to a new project, terminating a stagnant partnership, or green-lighting a "Transition to PhD" for a top performer.
Output: Updated Impact & ROI Report (Doc 3) and updated Project Charters where necessary.
3. Success Criteria & Monitoring
The "2-Minute" Rule: Can leadership understand the health of the entire program within two minutes of opening the dashboard?
Decision Velocity: Does the Monthly Review result in at least one strategic decision or blocker removal?
The "Red Flag": If a project remains "Red" for two consecutive monthly reviews without a resource shift or scope change, the governance layer is failing to act.
4. Key Implementation Safeguards
No Tactical Drifting: If leadership begins discussing specific code bugs or UI colors, the PM must redirect the conversation back to strategic blockers and ROI.
Honesty over Optics: The PM is responsible for reporting "Red" projects early. A dashboard that is always "Green" despite missed client deadlines is a failure of transparency.
Exception-Based Reporting: If a project is Green and hitting its KPIs, do not spend time discussing it. Focus the leadership's limited time exclusively on where they can add the most value.
"""

PROCESS_TO_ID = {
    "Scouting & Onboarding": "scouting--onboarding",
    "The Technical Audit": "the-technical-audit",
    "The Project Charter": "the-project-charter",
    "The 60/20/20 Rhythm": "the-60-20-20-rhythm",
    "The Production Sprint": "the-production-sprint",
    "The Low-Touch Pulse": "the-low-touch-pulse",
    "Validation & Deployment": "validation--deployment",
    "The Executive View": "the-executive-view",
}

def parse_sops(text):
    sops = {}
    # Split on "Process: " at start of line
    process_blocks = re.split(r'(?:^|\n)Process:\s+', text.strip())
    for block in process_blocks:
        if not block.strip():
            continue
        lines = block.strip().split('\n')
        process_name = lines[0].strip()

        sop = {
            "docs": [],
            "steps": [],
            "success_criteria": [],
            "safeguards": []
        }

        current_section = None
        current_step = None

        for line in lines[1:]:
            line = line.strip()
            if not line:
                continue

            if re.match(r'^1\. Required Documentation Stack', line):
                current_section = 'docs'
                current_step = None
                continue
            elif re.match(r'^2\. Step-by-Step Implementation Workflow', line):
                current_section = 'steps'
                current_step = None
                continue
            elif re.match(r'^3\. Success Criteria', line):
                current_section = 'success'
                current_step = None
                continue
            elif re.match(r'^4\. Key Implementation Safeguards', line):
                current_section = 'safeguards'
                current_step = None
                continue

            if current_section == 'docs':
                if re.match(r'^Doc \d+:', line):
                    parts = line.split('\t', 1)
                    doc_name = parts[0].strip()
                    doc_purpose = parts[1].strip() if len(parts) > 1 else ''
                    # Extract doc number and name
                    m = re.match(r'^(Doc \d+):\s+(.+)', doc_name)
                    if m:
                        sop['docs'].append({
                            "id": m.group(1),
                            "name": m.group(2).strip(),
                            "purpose": doc_purpose
                        })

            elif current_section == 'steps':
                step_match = re.match(r'^Step (\d+):\s+(.+)', line)
                if step_match:
                    step_num = int(step_match.group(1))
                    step_title_raw = step_match.group(2).strip()
                    # Extract stage label from parentheses if present
                    stage_match = re.match(r'^(.+?)\s+\((.+?)\)$', step_title_raw)
                    if stage_match:
                        step_title = stage_match.group(1).strip()
                        step_stage = stage_match.group(2).strip()
                    else:
                        step_title = step_title_raw
                        step_stage = ''
                    current_step = {
                        "num": step_num,
                        "title": step_title,
                        "stage": step_stage,
                        "items": []
                    }
                    sop['steps'].append(current_step)
                elif current_step is not None:
                    # Sub-item of current step
                    current_step['items'].append(line)

            elif current_section == 'success':
                sop['success_criteria'].append(line)

            elif current_section == 'safeguards':
                sop['safeguards'].append(line)

        pb_id = PROCESS_TO_ID.get(process_name)
        if pb_id:
            sops[pb_id] = sop
        else:
            print(f"WARNING: No ID mapping for process '{process_name}'")

    return sops


def main():
    json_path = 'src/data/playbooks.json'
    with open(json_path, 'r', encoding='utf-8') as f:
        playbooks = json.load(f)

    sops = parse_sops(SOP_TEXT)
    print(f"Parsed {len(sops)} SOPs: {list(sops.keys())}")

    for pb in playbooks:
        pb_id = pb.get('id')
        if pb_id in sops:
            pb['sop'] = sops[pb_id]
            print(f"  Added SOP to: {pb_id}")
        else:
            print(f"  No SOP found for: {pb_id}")

    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(playbooks, f, indent=2)

    print("Done. Updated playbooks.json with SOP data.")

if __name__ == '__main__':
    main()
