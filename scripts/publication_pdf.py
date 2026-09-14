"""Shared reportlab layout for Practical Love publication PDFs.

Used by generate-leaflet-pdfs.py and generate-study-editions.py.
"""

import html
import json
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    CondPageBreak,
    Flowable,
    Frame,
    KeepTogether,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

MAROON = colors.HexColor("#7a1e17")
GOLD = colors.HexColor("#d9b36f")
BROWN = colors.HexColor("#9a6b1f")
INK = colors.HexColor("#2f2a26")

styles = getSampleStyleSheet()
for style in [
    ParagraphStyle(name="CoverEyebrow", fontName="Helvetica-Bold", fontSize=11, leading=15,
                   alignment=TA_CENTER, textColor=GOLD, spaceAfter=18),
    ParagraphStyle(name="CoverTitle", fontName="Times-Bold", fontSize=34, leading=40,
                   alignment=TA_CENTER, textColor=MAROON, spaceAfter=18),
    ParagraphStyle(name="CoverSubtitle", fontName="Helvetica", fontSize=13, leading=20,
                   alignment=TA_CENTER, textColor=colors.HexColor("#4f3324"), spaceAfter=24),
    ParagraphStyle(name="SectionTitle", fontName="Times-Bold", fontSize=22, leading=27,
                   alignment=TA_LEFT, textColor=MAROON, spaceBefore=6, spaceAfter=12),
    ParagraphStyle(name="Heading", fontName="Helvetica-Bold", fontSize=12.5, leading=17,
                   textColor=MAROON, spaceBefore=14, spaceAfter=6),
    ParagraphStyle(name="Body", fontName="Times-Roman", fontSize=11.5, leading=17,
                   alignment=TA_JUSTIFY, textColor=INK, spaceAfter=7),
    ParagraphStyle(name="Scripture", fontName="Times-Italic", fontSize=11.5, leading=17,
                   alignment=TA_JUSTIFY, textColor=colors.HexColor("#503629"),
                   leftIndent=14, spaceAfter=2),
    ParagraphStyle(name="ScriptureRef", fontName="Helvetica-Bold", fontSize=9, leading=13,
                   alignment=TA_RIGHT, textColor=MAROON, spaceAfter=10),
    ParagraphStyle(name="Original", fontName="Times-Roman", fontSize=11.5, leading=17,
                   textColor=INK, backColor=colors.HexColor("#fff6e2"), borderColor=GOLD,
                   borderWidth=0.6, borderPadding=10, spaceBefore=12, spaceAfter=18),
    ParagraphStyle(name="Callout", fontName="Helvetica-Bold", fontSize=11, leading=16,
                   alignment=TA_CENTER, textColor=MAROON, backColor=colors.HexColor("#fff1d6"),
                   borderColor=GOLD, borderWidth=0.8, borderPadding=10, spaceBefore=10,
                   spaceAfter=14),
    ParagraphStyle(name="Item", fontName="Times-Roman", fontSize=11.5, leading=17,
                   leftIndent=22, firstLineIndent=-14, textColor=INK, spaceAfter=5),
    ParagraphStyle(name="Signature", fontName="Times-Italic", fontSize=11.5, leading=17,
                   alignment=TA_LEFT, textColor=colors.HexColor("#503629"), spaceBefore=12),
    ParagraphStyle(name="Contents", fontName="Times-Roman", fontSize=12, leading=18, textColor=INK),
]:
    styles.add(style)


def p(text, style="Body"):
    """Paragraph from reportlab markup (not escaped)."""
    return Paragraph(text, styles[style])


def item(marker, text):
    return p(f"{marker}&nbsp;&nbsp;{text}", "Item")


def section(title, flowables):
    return KeepTogether([p(title, "Heading"), *flowables])


def markup(text):
    """Escape plain text and convert **bold**, *italic* and newlines to reportlab markup."""
    text = html.escape(text, quote=False)
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"\*(.+?)\*", r"<i>\1</i>", text)
    return text.replace("\n", "<br/>")


def build(output, title, author, subtitle, callout, body):
    def cover_page(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(colors.HexColor("#fff8ec"))
        canvas.rect(0, 0, LETTER[0], LETTER[1], fill=1, stroke=0)
        canvas.setFillColor(MAROON)
        canvas.rect(0, LETTER[1] - 1.15 * inch, LETTER[0], 1.15 * inch, fill=1, stroke=0)
        canvas.setFillColor(GOLD)
        canvas.rect(0, 0, LETTER[0], 0.28 * inch, fill=1, stroke=0)
        canvas.restoreState()

    def body_page(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(GOLD)
        canvas.setLineWidth(0.5)
        canvas.line(doc.leftMargin, 0.72 * inch, LETTER[0] - doc.rightMargin, 0.72 * inch)
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(MAROON)
        canvas.drawString(doc.leftMargin, 0.5 * inch, title)
        canvas.drawRightString(LETTER[0] - doc.rightMargin, 0.5 * inch, f"Page {doc.page}")
        canvas.restoreState()

    story = [
        p("A Practical Love Publication", "CoverEyebrow"),
        Spacer(1, 1.25 * inch),
        p(title, "CoverTitle"),
        p(subtitle, "CoverSubtitle"),
        p(callout, "Callout"),
        Spacer(1, 1.1 * inch),
        p(author, "CoverSubtitle"),
        p("Free to reproduce and distribute.", "CoverSubtitle"),
        NextPageTemplate("Body"),
        PageBreak(),
        *body,
    ]

    doc = BaseDocTemplate(
        output,
        pagesize=LETTER,
        rightMargin=0.8 * inch,
        leftMargin=0.8 * inch,
        topMargin=0.8 * inch,
        bottomMargin=0.9 * inch,
        title=title,
        author=author,
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
    doc.addPageTemplates(
        [
            PageTemplate(id="Cover", frames=frame, onPage=cover_page),
            PageTemplate(id="Body", frames=frame, onPage=body_page),
        ]
    )
    doc.build(story)


# --- Study editions (JSON source shared with the website reader) ---------------


class PageMarker(Flowable):
    """Zero-size flowable that records the page it lands on."""

    def __init__(self, key, pages):
        super().__init__()
        self.key = key
        self.pages = pages

    def wrap(self, *_):
        return 0, 0

    def draw(self):
        self.pages[self.key] = self.canv.getPageNumber()


def block_flowables(block):
    kind = block["type"]
    if kind == "h":
        return [p(markup(block["text"]), "Heading")]
    if kind == "p":
        return [p(markup(block["text"]))]
    if kind == "scripture":
        return [p(markup(block["text"]), "Scripture"), p(markup(block["ref"]), "ScriptureRef")]
    if kind == "original":
        label = '<font name="Helvetica-Bold" size="8" color="#9a6b1f">FROM THE ORIGINAL LEAFLET</font>'
        return [p(f"{label}<br/>{markup(block['text'])}", "Original")]
    if kind == "callout":
        return [p(markup(block["text"]), "Callout")]
    if kind == "list":
        return [
            item(f"{n}." if block.get("ordered") else "&bull;", markup(text))
            for n, text in enumerate(block["items"], start=1)
        ]
    raise ValueError(f"Unknown block type: {kind}")


def build_study_edition(json_path, output):
    json_path = Path(json_path)
    data = json.loads(json_path.read_text(encoding="utf-8"))
    sections = data["sections"]
    pages = {}

    def body(numbers):
        rows = [[p(markup(s["title"]), "Contents"), p(str(numbers.get(i, "")), "Contents")]
                for i, s in enumerate(sections)]
        contents = Table(rows, colWidths=["88%", "12%"])
        contents.setStyle(TableStyle([
            ("ALIGN", (1, 0), (1, -1), "RIGHT"),
            ("LINEBELOW", (0, 0), (-1, -1), 0.25, GOLD),
            ("TOPPADDING", (0, 0), (-1, -1), 3),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ]))
        flow = [p("Contents", "SectionTitle"), contents, PageBreak()]
        for i, s in enumerate(sections):
            flow += [CondPageBreak(2.4 * inch), PageMarker(i, pages), p(markup(s["title"]), "SectionTitle")]
            for block in s["blocks"]:
                flow += block_flowables(block)
            flow.append(Spacer(1, 0.2 * inch))
        return flow

    args = (output, data["title"], data["author"], data["subtitle"], data["callout"])
    build(*args, body({}))
    build(*args, body(dict(pages)))  # second pass fills in contents page numbers

    changed = False
    for i, s in enumerate(sections):
        if s.get("pdfPage") != pages[i]:
            s["pdfPage"] = pages[i]
            changed = True
    if changed:
        json_path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return len(sections), max(pages.values())
