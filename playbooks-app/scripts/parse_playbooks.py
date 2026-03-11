import json
import re

def parse_playbooks(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by "Playbook: "
    parts = content.split("Playbook: ")
    playbooks = []

    for i, part in enumerate(parts[1:]): # skip first part as it's the intro
        lines = part.strip().split('\n')
        if not lines:
            continue
            
        title = lines[0].strip()
        
        # Subtitle usually the second line
        subtitle = lines[1].strip() if len(lines) > 1 else ""
        
        # We need to extract sections: 
        # "The Big Idea", "Why It Matters", "How to Do It", "Tips for Success", "Key Insight", "Evidence of Impact"
        
        sections = {
            "title": title,
            "id": title.lower().replace(" ", "-").replace("/", "-"),
            "subtitle": subtitle,
            "the_big_idea": "",
            "why_it_matters": "",
            "how_to_do_it": "",
            "tips_for_success": "",
            "key_insight": "",
            "evidence_of_impact": ""
        }
        
        current_section = None
        
        for line in lines[2:]:
            line_stripped = line.strip()
            if not line_stripped:
                continue
                
            line_normalized = re.sub(' +', ' ', line_stripped)
                
            if "The Big Idea" in line_normalized:
                current_section = "the_big_idea"
                continue
            elif "Why It Matters" in line_normalized:
                current_section = "why_it_matters"
                continue
            elif "How to Do It" in line_normalized:
                current_section = "how_to_do_it"
                # Sometimes "How to Do It" has the first point on the same line
                remainder = line_normalized.replace("How to Do It", "").strip()
                if remainder:
                    sections[current_section] += remainder + " "
                continue
            elif "Tips for Success" in line_normalized:
                current_section = "tips_for_success"
                continue
            elif "Key Insight" in line_normalized:
                current_section = "key_insight"
                continue
            elif "Evidence of Impact" in line_normalized:
                current_section = "evidence_of_impact"
                continue
                
            if current_section:
                sections[current_section] += line_stripped + " "
                
        # Clean up whitespace
        for k in sections:
            sections[k] = sections[k].strip()
            sections[k] = re.sub(' +', ' ', sections[k])
            
        # Optional: formatting "How to Do It" into list if enumerated (1. x 2. y)
        if sections["how_to_do_it"]:
            # naive splitting points mapping "1. " format
            points = re.split(r'(?=\b\d+\.\s)', sections["how_to_do_it"])
            sections["how_to_do_it_list"] = [p.strip() for p in points if p.strip()]
            
        playbooks.append(sections)
        
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(playbooks, f, indent=2)

if __name__ == "__main__":
    parse_playbooks('/tmp/extracted_pdf.txt', 'src/data/playbooks.json')
    print("Successfully parsed playbooks.")
