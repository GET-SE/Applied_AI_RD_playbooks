import json, os

# Map doc name → exact filename in public/docs/
DOC_FILE_MAP = {
    # Scouting & Onboarding
    "The Hybrid JD":                     "The Hybrid JD.docx",
    "The Bridge Interview Rubric":       "The Bridge Interview Rubric.docx",
    "The 60/20/20 Cultural Contract":    "The 60-20-20 Cultural Contract.docx",
    "The Horizon Goal Sheet":            "The Horizon Goal Sheet.docx",
    # The Technical Audit
    "Artifact Inventory":                "Artifact Inventory.docx",
    "Reproducibility Report":            "Reproducibility Report.docx",
    "Gap Analysis Memo":                 "Gap Analysis Memo.docx",
    "Frozen Baseline Spec":              "Frozen Baseline Spec.docx",
    # Client Intake & The Project Charter
    "Intake Discovery Form":             "Intake Discovery Form.docx",
    "The Value Metric":                  "The Value Metric.docx",
    "The Project Charter":               "The Project Charter.docx",
    "Role Boundary Matrix":              "Role Boundary Matrix.docx",
    "The KPI Scorecard":                 "The KPI Scorecard.docx",
    # The 60/20/20 Rhythm
    "The Master Calendar":               "The Master Calendar.docx",
    "The Thursday Learning Goal":        "The Thursday Learning Goal.docx",
    "The Weekly Learning Log":           "The Weekly Learning Log.docx",
    "The Monthly \"Show & Tell\" Agenda": "The Monthly \"Show & Tell\" Agenda.docx",
    # The Production Sprint
    "The Sprint Backlog":                "The Sprint Backlog.docx",
    "The Sprint Goal":                   "The Sprint Goal.docx",
    "The Definition of Done (DoD)":      "The Definition of Done (DoD).docx",
    "The Build Changelog":               "The Build Changelog.docx",
    # The Low-Touch Pulse
    "Automated Pulse Dashboard":         "Automated Pulse Dashboard.docx",
    "The Tactical Sync Agenda":          "The Tactical Sync Agenda.docx",
    "The Exception Log":                 "The Exception Log.docx",
    "The Weekly Status Update":          "The Weekly Status Update.docx",
    # Validation & Deployment
    "The Scientific Delta Report":       "The Scientific Delta Report.docx",
    "Deployment Configuration (IAC)":    "Deployment Configuration (IAC).docx",
    "System Performance Log":            "System Performance Log.docx",
    "The Client Handover Kit":           "The Client Handover Kit.docx",
    # The Executive View
    "The Strategic Dashboard":           "The Strategic Dashboard.docx",
    "The Monthly Executive Summary":     "The Monthly Executive Summary.docx",
    "Impact & ROI Report":               "Impact & ROI Report.docx",
    "Strategic Review Agenda":           "Strategic Review Agenda.docx",
}

docs_dir = "public/docs"
json_path = "src/data/playbooks.json"

with open(json_path, "r", encoding="utf-8") as f:
    playbooks = json.load(f)

matched, missing, no_file = 0, 0, 0

for pb in playbooks:
    sop = pb.get("sop")
    if not sop:
        continue
    for doc in sop.get("docs", []):
        name = doc["name"]
        filename = DOC_FILE_MAP.get(name)
        if filename:
            filepath = os.path.join(docs_dir, filename)
            if os.path.exists(filepath):
                doc["file"] = filename
                matched += 1
            else:
                print(f"  FILE NOT FOUND: {filepath}")
                no_file += 1
        else:
            print(f"  NO MAPPING: '{name}'")
            missing += 1

with open(json_path, "w", encoding="utf-8") as f:
    json.dump(playbooks, f, indent=2)

print(f"\nDone. Matched: {matched} | No mapping: {missing} | File not found: {no_file}")
