import json

json_path = 'src/data/playbooks.json'
with open(json_path, 'r', encoding='utf-8') as f:
    playbooks = json.load(f)

updated = {
    "title": "Client Intake & The Project Charter",
    "id": "the-project-charter",
    "subtitle": "Defining client needs and the Triad success contract.",
    "pillar": "The Visibility",
    "stage": "Stage 1: Setup",
    "the_big_idea": "In an environment where research meets product, friction usually arises from two gaps: the Alignment Gap (building what the client didn't ask for) and the Role Gap (confusing who builds vs. who researches). This playbook bridges both. It transforms a business problem into a scientific goal and then into an engineering roadmap with clear accountability.",
    "why_it_matters": "Without a combined intake and charter process, projects often suffer from \"Value Drift.\" Engineers may optimize for technical elegance while missing the client's primary pain point. Simultaneously, researchers might get pulled into support tasks. By explicitly defining the client's \"Value Metric\" and the team's \"Lanes\" in one document, we protect the project's utility, the researcher's focus, and the lab's reputation for delivery.",
    "how_to_do_it": "",
    "how_to_do_it_list": [
        "1. Identify the \"Value Metric\" (Discovery) Before the internal kickoff, meet with the client to define a single, measurable outcome. The Question: \"If this project succeeds, what is the one number that changes for your business?\" The Goal: Move beyond a \"feature list\" to a \"Value Metric\" (e.g., \"Reduce manual labeling time by 40%\" or \"Increase inference accuracy to 95% on noisy data\").",
        "2. Formalize the \"Boundary\" (Setup) Host a \"Role Definition\" session with the Triad. Document the primary responsibility of each pillar: ● The Research Owner: Responsible for theoretical integrity and algorithmic logic (not the UI/API). ● The Project Manager: Responsible for client communication and the \"Value Metric\" (not the coding). ● The Engineering Team: Responsible for the technical build and scalability (not the core science).",
        "3. Set the \"Dual\" Success Metrics (Development) The Charter must track two distinct types of success: ● Product KPIs: Technical metrics tied directly to the client's Value Metric (e.g., system latency, accuracy). ● Team KPIs: Cultural metrics such as the completion of \"20% learning\" tracks and protected research hours.",
        "4. Establish the Communication \"Heartbeat\" (Validation) Decide on a standardized sync schedule. A 15-minute weekly \"Triad Heartbeat\" ensures the \"Bridge\" between theory and craft is holding firm under client pressure. Use this time to verify that the build is still trending toward the agreed-upon Value Metric.",
        "5. Perform the Reflection (Impact) At the conclusion of the project, review the Charter with both the Triad and the Client. Did the engineering implementation hit the Value Metric without compromising the research's scientific integrity? This reflection is archived to improve the L2M engine for future cohorts."
    ],
    "tips_list": [
        {
            "type": "try_this",
            "text": "Keep the Charter to exactly one page. Use a \"Lead/Support/Not Responsible\" table to clarify roles. If the document is too long, the client and team will stop referencing it as their source of truth."
        },
        {
            "type": "keep_in_mind",
            "text": "The \"Not Responsible\" list is your most powerful tool. Explicitly stating that \"The team will not build a mobile app\" or \"The researcher will not debug CSS\" prevents scope creep and burnout."
        }
    ],
    "key_insight": "\"The Charter is the Rosetta Stone of the project\u2014translating the client's business need into the researcher's math and the engineer's code.\"",
    "evidence_of_impact": "Projects initiated with a signed Client Intake & Charter report 30% less internal conflict and a 50% higher rate of client satisfaction, as the \"Value Metric\" ensures the team never loses sight of why they are building the product.",
    "pulse_check": [
        "Does every member of the Triad know exactly what they are \u2014 and are not \u2014 responsible for?",
        "Is the Charter short enough that everyone will actually re-read it when scope changes?",
        "Are we tracking both Product KPIs and Team KPIs equally?",
        "Has the Triad Heartbeat been scheduled and protected from ad-hoc meeting creep?",
        "Would a new team member reading the Charter understand the project's goals in under five minutes?"
    ],
    "sop": {
        "docs": [
            {"id": "Doc 1", "name": "Intake Discovery Form", "purpose": "Capturing the client's business pain point and data availability."},
            {"id": "Doc 2", "name": "The Value Metric", "purpose": "A 1-sentence \"North Star\" agreed upon by the Client and Researcher."},
            {"id": "Doc 3", "name": "The Project Charter", "purpose": "The master agreement summarizing goals, participants, and timelines."},
            {"id": "Doc 4", "name": "Role Boundary Matrix", "purpose": "A RACI-style table defining Lead, Support, or \"Not Responsible.\""},
            {"id": "Doc 5", "name": "The KPI Scorecard", "purpose": "A definition of Product (Technical) and Team (Cultural) success metrics."}
        ],
        "steps": [
            {
                "num": 1,
                "title": "External Discovery",
                "stage": "Client Side",
                "items": [
                    "The Action: PM meets with the client to identify the \"Value Metric.\"",
                    "The Goal: Move beyond a features list. Ask: \"If this works perfectly in one month, what is the single business number that improved?\"",
                    "Verification: Confirm that the client has the necessary data available today to support the research model.",
                    "Output: Completed Doc 1 (Intake Form) and Doc 2 (Value Metric)."
                ]
            },
            {
                "num": 2,
                "title": "Research-Market Mapping",
                "stage": "Validation",
                "items": [
                    "The Action: PM presents the Value Metric to the Research Owner.",
                    "The Question: \"Does the existing research artifact (paper/script) solve this? Is the data compatible?\"",
                    "Output: Technical \"Green Light\" to move to recruitment/onboarding."
                ]
            },
            {
                "num": 3,
                "title": "Internal Alignment",
                "stage": "Team Side",
                "items": [
                    "The Action: PM hosts the \"Triad Kickoff\" (PM + Researcher + Engineering Interns).",
                    "The Goal: Define the \"Lanes.\" Use Doc 4 (Boundary Matrix) to explicitly state what each member is NOT responsible for (e.g., \"Researcher is not responsible for UI/API boilerplate\").",
                    "Output: Drafted Doc 3 (The Charter)."
                ]
            },
            {
                "num": 4,
                "title": "Finalizing the Success Contract",
                "stage": "Impact",
                "items": [
                    "The Action: Combine the Client's Value Metric and the Team's internal KPIs into the final Charter.",
                    "The Commitment: All parties sign the one-page charter. Schedule the recurring 15-minute \"Triad Heartbeat\" sync.",
                    "Output: Signed Doc 3 (The Project Charter) and Doc 5 (KPI Scorecard)."
                ]
            }
        ],
        "success_criteria": [
            "The \"Alignment Test\": If you ask the Intern and the Client what success looks like, they should give the exact same Value Metric.",
            "One-Page Rule: If any document exceeds one page, it is too complex. Re-draft until it is glanceable.",
            "The \"Red Flag\": If a project moves to a Production Sprint without a signed Charter, the PM team has failed the Stage 1 Setup gate."
        ],
        "safeguards": [
            "Manage Scope Early: The \"Not Responsible\" list is the most powerful section of the Charter. Use it to prevent researchers from being treated as developers.",
            "Data Privacy: Ensure any client data shared for the \"Audit\" is handled according to lab security protocols.",
            "Living Document: If the client changes the scope, the KPI Scorecard must be updated immediately to reflect the new reality."
        ]
    }
}

for i, pb in enumerate(playbooks):
    if pb['id'] == 'the-project-charter':
        playbooks[i] = updated
        print(f"Updated playbook at index {i}: {updated['title']}")
        break

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(playbooks, f, indent=2)

print("Done.")
