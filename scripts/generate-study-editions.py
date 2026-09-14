"""Generate PDFs for the study editions in data/study-editions/*.json.

The same JSON files feed the website reader, so edit the text there and re-run:
    python scripts/generate-study-editions.py

The script records each section's PDF page number back into its JSON file (`pdfPage`).
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from publication_pdf import build_study_edition  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent

for source in sorted((ROOT / "data" / "study-editions").glob("*.json")):
    output = ROOT / "public" / "publications" / f"{source.stem}.pdf"
    sections, pages = build_study_edition(source, str(output))
    print(f"{output.relative_to(ROOT)}: {sections} sections, {pages} pages")
