from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
)


OUTPUT = "public/publications/how-to-avoid-evil-system.pdf"


class NumberedCanvas:
    def __init__(self, canvas, doc):
        self.canvas = canvas
        self.doc = doc

    def draw_header_footer(self):
        canvas = self.canvas
        doc = self.doc
        canvas.saveState()
        canvas.setStrokeColor(colors.HexColor("#d9b36f"))
        canvas.setLineWidth(0.5)
        canvas.line(doc.leftMargin, 0.72 * inch, LETTER[0] - doc.rightMargin, 0.72 * inch)
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(colors.HexColor("#7a2f22"))
        canvas.drawString(doc.leftMargin, 0.5 * inch, "How to Avoid Evil System")
        canvas.drawRightString(
            LETTER[0] - doc.rightMargin,
            0.5 * inch,
            f"Page {doc.page}",
        )
        canvas.restoreState()


def cover_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(colors.HexColor("#fff8ec"))
    canvas.rect(0, 0, LETTER[0], LETTER[1], fill=1, stroke=0)
    canvas.setFillColor(colors.HexColor("#7a1e17"))
    canvas.rect(0, LETTER[1] - 1.15 * inch, LETTER[0], 1.15 * inch, fill=1, stroke=0)
    canvas.setFillColor(colors.HexColor("#d9b36f"))
    canvas.rect(0, 0, LETTER[0], 0.28 * inch, fill=1, stroke=0)
    canvas.restoreState()


def body_page(canvas, doc):
    NumberedCanvas(canvas, doc).draw_header_footer()


styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="CoverEyebrow",
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=15,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#d9b36f"),
        uppercase=True,
        spaceAfter=18,
    )
)
styles.add(
    ParagraphStyle(
        name="CoverTitle",
        fontName="Times-Bold",
        fontSize=38,
        leading=44,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#7a1e17"),
        spaceAfter=18,
    )
)
styles.add(
    ParagraphStyle(
        name="CoverSubtitle",
        fontName="Helvetica",
        fontSize=14,
        leading=21,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#4f3324"),
        spaceAfter=28,
    )
)
styles.add(
    ParagraphStyle(
        name="SectionTitle",
        fontName="Times-Bold",
        fontSize=25,
        leading=31,
        alignment=TA_LEFT,
        textColor=colors.HexColor("#7a1e17"),
        spaceBefore=6,
        spaceAfter=14,
    )
)
styles.add(
    ParagraphStyle(
        name="Heading",
        fontName="Helvetica-Bold",
        fontSize=14,
        leading=18,
        textColor=colors.HexColor("#7a1e17"),
        spaceBefore=18,
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        name="Body",
        fontName="Times-Roman",
        fontSize=11.2,
        leading=16.4,
        alignment=TA_JUSTIFY,
        textColor=colors.HexColor("#2f2a26"),
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        name="Lead",
        fontName="Times-Italic",
        fontSize=12.3,
        leading=18,
        alignment=TA_JUSTIFY,
        textColor=colors.HexColor("#503629"),
        spaceAfter=12,
    )
)
styles.add(
    ParagraphStyle(
        name="Callout",
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=16,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#7a1e17"),
        backColor=colors.HexColor("#fff1d6"),
        borderColor=colors.HexColor("#d9b36f"),
        borderWidth=0.8,
        borderPadding=10,
        spaceBefore=10,
        spaceAfter=12,
    )
)
styles.add(
    ParagraphStyle(
        name="CustomBullet",
        fontName="Times-Roman",
        fontSize=11,
        leading=16,
        leftIndent=16,
        firstLineIndent=-8,
        textColor=colors.HexColor("#2f2a26"),
        spaceAfter=5,
    )
)


def p(text, style="Body"):
    return Paragraph(text, styles[style])


def section(title, paragraphs):
    flow = [p(title, "Heading")]
    flow.extend(p(item) for item in paragraphs)
    return KeepTogether(flow)


def bullet(text):
    return p(f"- {text}", "CustomBullet")


story = [
    p("A Practical Love Publication", "CoverEyebrow"),
    Spacer(1, 1.25 * inch),
    p("How to Avoid Evil System", "CoverTitle"),
    p(
        "A practical Christian guide for choosing love, truth, humility, and righteous service "
        "above pride, profit, compromise, and destructive worldly desire.",
        "CoverSubtitle",
    ),
    p("People above products. People above money. God's will above compromise.", "Callout"),
    Spacer(1, 1.3 * inch),
    p("Expanded from the handwritten message: \"How to Avoid Evil System\" and \"5 Keys to Love.\"", "CoverSubtitle"),
    NextPageTemplate("Body"),
    PageBreak(),
]

story.extend(
    [
        p("Preface", "SectionTitle"),
        p(
            "This publication preserves and expands a simple but urgent message: every person must "
            "choose the system that governs their heart. There are systems built on pride, greed, "
            "appearance, manipulation, and compromise. There is also the way of God: love, truth, "
            "humility, obedience, and service. The first system may look powerful for a season, but "
            "it destroys people. The second may look costly for a season, but it produces life.",
            "Lead",
        ),
        p(
            "The original notes speak directly and without decoration. They call the reader to place "
            "people above products, people above money, righteousness above convenience, and God's "
            "will above every plan. This expanded edition keeps that message intact while giving it "
            "the shape of a practical booklet for reading, teaching, meditation, and personal "
            "application.",
        ),
        p(
            "The phrase \"evil system\" should not be understood only as something outside us. It is "
            "also any pattern of thought, business, ministry, family life, or leadership that treats "
            "people as tools instead of souls. It is any habit that makes profit greater than mercy, "
            "success greater than obedience, and reputation greater than truth.",
        ),
        p("The Core Message", "SectionTitle"),
        p(
            "An evil system is avoided first by the condition of the heart, then by the decisions of "
            "daily life. It is not enough to condemn corruption, greed, pride, or deception in the "
            "world. A person must refuse those seeds in personal conduct, private thinking, speech, "
            "work, business, service, and worship.",
        ),
        p(
            "The way out is not complicated, but it must be practiced. Memorise it. Meditate on it. "
            "Verbalise it. Practicalise it. A truth that is only admired may still leave a life "
            "unchanged. A truth that is practiced becomes a path.",
            "Callout",
        ),
    ]
)

principles = [
    (
        "1. People Must Always Be More Important Than Products",
        [
            "Products are useful, but people are sacred. A product can be replaced, redesigned, "
            "repaired, or discarded. A human being carries the image of God and must never be "
            "reduced to an object in another person's ambition.",
            "A business becomes dangerous when the thing it sells matters more than the person it "
            "serves. A ministry becomes dangerous when programmes matter more than souls. A family "
            "becomes wounded when achievement matters more than affection. A nation becomes corrupt "
            "when citizens are treated as numbers, votes, labour, or markets rather than people.",
            "To avoid an evil system, ask this question before every plan: who may be helped, and "
            "who may be harmed? If the answer reveals that people are being sacrificed for the "
            "product, the plan must be corrected.",
        ],
    ),
    (
        "2. People Must Be Considered Above Making Money",
        [
            "Money has a place. It can feed families, build schools, support ministry, pay workers, "
            "and extend useful services. But money becomes a cruel master when it outranks human "
            "dignity.",
            "When profit becomes supreme, truth is negotiated, workers are exploited, customers are "
            "deceived, and compassion is treated as weakness. The evil system always teaches that "
            "money justifies the method. The way of love teaches that method matters because people "
            "matter.",
            "A righteous person does not ask only, \"Will this make money?\" A righteous person asks, "
            "\"Will this serve people honestly? Will it honour God? Will it leave my conscience clean?\"",
        ],
    ),
    (
        "3. Do What Is Right No Matter the Cost",
        [
            "Right action often has a price. Truth may cost approval. Integrity may cost opportunity. "
            "Love may cost comfort. Obedience may cost popularity. Yet a life built on compromise "
            "pays a greater price later: loss of peace, loss of trust, loss of spiritual strength, "
            "and sometimes the destruction of others.",
            "Doing what is right is not stubbornness; it is alignment with God. It means refusing to "
            "sell conscience for temporary gain. It means choosing righteousness when nobody is "
            "watching and continuing in righteousness when everybody is watching.",
            "The question is not whether righteousness is costly. The question is whether unrighteous "
            "success is worth the damage it leaves behind.",
        ],
    ),
    (
        "4. Keep Away From Pride in Your Plans, Programmes, and Successes",
        [
            "Pride is one of the hidden engines of an evil system. Pride can dress itself as vision, "
            "excellence, leadership, or confidence, yet still place self at the centre. It says, "
            "\"My plan must stand. My name must rise. My success must be noticed.\"",
            "Humility does not mean laziness or small thinking. Humility means that every plan remains "
            "submitted to God. It means success is received with gratitude, not worshipped as an idol. "
            "It means correction is welcomed when the path is wrong.",
            "The more visible a person's work becomes, the more carefully the heart must be guarded. "
            "Pride can make a person defend what God is asking them to change.",
        ],
    ),
    (
        "5. God's Will, Word, and Commandments Must Never Be Compromised",
        [
            "Compromise often begins with a small excuse. A person says, \"Just this once,\" or \"This "
            "is how things are done,\" or \"Everyone understands.\" But when God's Word is treated as "
            "flexible under pressure, the heart is already being trained to obey another master.",
            "God's will is not an ornament added to a life after ambition has made its decisions. "
            "God's Word must govern the decisions themselves. His commandments are not obstacles to "
            "progress; they are protection from destruction.",
            "A person who wants to avoid an evil system must decide in advance that obedience is not "
            "for sale. Without that decision, pressure will negotiate what conviction should have "
            "settled.",
        ],
    ),
    (
        "6. Choose Work That Provides Worthwhile Service",
        [
            "Not every profitable activity is worthwhile. Some businesses and professions only feed "
            "the world's desires: vanity, addiction, greed, lust, deception, violence, and empty "
            "consumption. A person may earn from such systems and still lose spiritual clarity.",
            "The original message calls the reader to be involved in businesses, services, and "
            "professions that provide worthwhile services. This is a call to examine purpose, not "
            "only income. What does the work add to human life? Does it heal, teach, feed, protect, "
            "build, encourage, restore, or guide? Does it strengthen families, communities, and "
            "conscience?",
            "Useful work is not limited to religious work. Farming, medicine, teaching, technology, "
            "transport, building, administration, trade, care work, and many other fields can become "
            "holy service when they are governed by love, truth, excellence, and justice.",
        ],
    ),
    (
        "7. A Life Centered on Love, Truth, and Humility Cannot Be Defeated",
        [
            "The devil and his cohorts, both spiritual and physical, have no true answer to a life "
            "centred on love, truth, and humility. Deception can attack it. Pride can mock it. Greed "
            "can tempt it. But the life itself remains anchored in a kingdom that cannot be shaken.",
            "Love is not weakness. Truth is not harshness. Humility is not inferiority. Together they "
            "form a life that evil cannot easily use. A person who loves refuses cruelty. A person "
            "who walks in truth refuses deception. A person who stays humble refuses the throne that "
            "belongs to God.",
            "Always remember: anything you do in love can never fail. It may not always produce the "
            "result you expected at the time you expected it, but love never fails before God. Love "
            "plants eternal seed.",
        ],
    ),
]

for title, paragraphs in principles:
    story.append(section(title, paragraphs))

story.extend(
    [
        p("From Belief to Practice", "SectionTitle"),
        p(
            "The final warning in the original note is important: unless you memorise, meditate, "
            "verbalise, and practicalise these truths, the blessings that accompany them may elude "
            "you. This means the message is not meant to remain in a notebook, sermon, poster, or "
            "publication. It is meant to govern life.",
        ),
        bullet("Memorise: keep the principles close enough that they can correct you quickly."),
        bullet("Meditate: think about them until they expose motives, fears, excuses, and habits."),
        bullet("Verbalise: speak them over your plans, family, work, ministry, and decisions."),
        bullet("Practicalise: convert them into concrete choices when pressure comes."),
        p(
            "Many people agree with truth generally, but disobey it specifically. The blessing is in "
            "the specific obedience: the honest transaction, the humble apology, the refused bribe, "
            "the fair wage, the truthful report, the merciful decision, the corrected plan, the "
            "forgiven offence, the service that values people more than gain.",
        ),
        p("Five Keys to Love", "SectionTitle"),
        p(
            "The companion note, \"5 Keys to Love,\" explains the heart that makes these principles "
            "possible. Without love, a person may obey rules outwardly and still remain proud within. "
            "Love is the spirit of the whole message.",
        ),
        section(
            "1. Love Is a Command From God",
            [
                "Love is not merely a feeling or preference. It is a command from God, so man has no "
                "right to treat it as optional. Where God commands love, excuses must bow. The choice "
                "to love is the choice to agree with God's nature.",
            ],
        ),
        section(
            "2. Believe You Have the Power to Love",
            [
                "Exercise faith to love. Muster your will to love. Without faith it is impossible to "
                "please God, and God is love. A person who says, \"I cannot love,\" should begin by "
                "believing that God's grace can produce in them what their natural strength cannot.",
            ],
        ),
        section(
            "3. Love Is the Most Normal Universal Thing to Do on Earth",
            [
                "Hatred is learned. Suspicion is cultivated. Selfishness is defended. But love agrees "
                "with the deepest design of human life. Every person needs it; every family depends "
                "on it; every nation is healed by it.",
            ],
        ),
        section(
            "4. Love Is the Best Fruit and Work of the Holy Spirit",
            [
                "The Holy Spirit does not only give power for religious expression. He forms the "
                "character of Christ in the believer. Love is the evidence that spiritual life is "
                "becoming practical life.",
            ],
        ),
        section(
            "5. Practice Love in Thinking, Speech, and Action",
            [
                "Love must begin in thought, because thought shapes interpretation. It must continue "
                "in speech, because words can heal or wound. It must be completed in action, because "
                "love that never acts remains unfinished.",
            ],
        ),
        p("A Daily Examination", "SectionTitle"),
        p(
            "Use these questions regularly. They are not for condemnation, but for correction and "
            "growth.",
        ),
        bullet("Did I value people above products, money, reputation, and personal convenience today?"),
        bullet("Did I do what was right even where it cost me comfort, advantage, or approval?"),
        bullet("Did pride influence any plan, programme, success, argument, or decision?"),
        bullet("Did I compromise God's will, Word, or commandment in any area?"),
        bullet("Did my work or service provide worthwhile help, or did it feed destructive desire?"),
        bullet("Did I practice love first in thought, then in speech, then in action?"),
        p("Conclusion", "SectionTitle"),
        p(
            "To avoid an evil system, a person must refuse to be governed by the spirit of that "
            "system. The world may reward pride, but the servant of God must choose humility. The "
            "world may excuse greed, but the servant of God must choose people. The world may "
            "celebrate compromise, but the servant of God must choose obedience. The world may "
            "confuse desire with freedom, but the servant of God must choose love.",
        ),
        p(
            "This is not only a message for public leaders, business owners, ministers, or nations. "
            "It is a message for every heart. Every day presents a system to join. Choose the way of "
            "love. Choose truth. Choose humility. Choose worthwhile service. Choose God's will. "
            "Anything done in love can never fail.",
            "Lead",
        ),
        p(
            "Memorise. Meditate. Verbalise. Practicalise.",
            "Callout",
        ),
    ]
)


doc = BaseDocTemplate(
    OUTPUT,
    pagesize=LETTER,
    rightMargin=0.72 * inch,
    leftMargin=0.72 * inch,
    topMargin=0.72 * inch,
    bottomMargin=0.85 * inch,
    title="How to Avoid Evil System",
    author="Practical Love Publications",
)

frame = Frame(
    doc.leftMargin,
    doc.bottomMargin,
    doc.width,
    doc.height,
    id="normal",
)
doc.addPageTemplates(
    [
        PageTemplate(id="Cover", frames=frame, onPage=cover_page),
        PageTemplate(id="Body", frames=frame, onPage=body_page),
    ]
)

doc.build(story)
print(OUTPUT)
