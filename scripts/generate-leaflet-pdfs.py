"""Generate PDFs for letters and flyers transcribed from photographed print leaflets.

The teaching leaflets now live as study editions in data/study-editions/*.json
(see generate-study-editions.py). Run from the repo root:
    python scripts/generate-leaflet-pdfs.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from reportlab.platypus import PageBreak  # noqa: E402

from publication_pdf import build, item, p, section  # noqa: E402

# --- A Vision for Churches and Clinics (2010 letter) ---------------------------

build(
    "public/publications/vision-for-churches-and-clinics.pdf",
    "A Vision for Churches and Clinics",
    "Moses A. Owoeye, MD, MATh",
    "Letter of support for the realization of a vision the Lord has been preparing me for "
    "since 1st July 1970.",
    "Planting churches and clinics, from Nigeria to West Africa and the rest of Africa.",
    [
        p("Letter of Support for the Realization of a Vision", "SectionTitle"),
        p("January 2010", "Signature"),
        p("Dear brethren,"),
        p("Peace and love to you as I ask for your time to share a vision which the Lord has put in "
          "my heart. The vision may be summarized as a direction to dedicate the rest of my life to "
          "the ministry of planting churches and medical clinics attached to and run by the church "
          "with practical spiritual foundation of love and humility; also training both the church "
          "and the clinic to multiply, using local material and personnel as safe and as much as "
          "possible. I hereby seek your prayers, advice and support to realize the vision in the "
          "ways I explain below."),
        section("The Vision and Plan for Its Realization", [
            p("The vision is to plant churches and/or clinics starting from Nigeria, expanding to the "
              "West Africa sub-region and then to the rest of Africa. The plan is to mobilize medical "
              "clinic equipment and personnel (for training) locally and/or in the United States from "
              "willing donors and volunteers to support the church and the clinics."),
        ]),
        section("The Legal Vehicle for Work", [
            p("A nonprofit 501(c)(3) has been incorporated both in Nigeria and the United States of "
              "America, named <b>LOGOS-RHEMA HUMAN SERVICES Inc.</b> This will serve as a vehicle to "
              "accelerate and mobilize professionals, personnel and volunteers to actualize the vision "
              "of planting churches and clinics run by the church, and subsequently train the church "
              "members and staff of the clinics to multiply."),
            p("The legal vehicle will be used to channel cooperation between stakeholders in the USA "
              "and Nigeria. The non-profit organization is being structured to generate jobs for "
              "Americans and Nigerians in the service of the Lord. An attorney in California is in "
              "charge of the non-profit organization. (Details about the mission and goals of the "
              "non-profit corporation are available on request.)"),
        ]),
        section("My Professional Training and Calling to Work for the Lord", [
            p("I am a professional in various fields and have valuable skills in the areas of "
              "medicine (30 years' experience in general medical practice in Nigeria), ultrasound, "
              "theology and developmental management of disabled individuals."),
            p("I was trained as a medical doctor at the College of Medicine, University of Lagos, "
              "Nigeria, and acquired research skills at the University of Southern California, Los "
              "Angeles. I was licensed to practise family medicine in Nigeria for 30 years."),
            item("&bull;", "In addition, I was trained in ultrasound at Thomas Jefferson University "
                           "Institute of Ultrasound in Philadelphia."),
            item("&bull;", "I also trained in caring for developmentally disabled individuals at the "
                           "Department of Health of the State of California."),
            item("&bull;", "By the grace of the Lord I am an ordained minister and licensed to preach. "
                           "I was trained in theology at Fuller Theological Seminary in Pasadena, "
                           "California, where I obtained a Master of Arts in Theology."),
        ]),
        section("The Needs for the Realization of the Vision", [
            item("&bull;", "Your fervent prayer to the Lord to open ways for the realization of the "
                           "vision for His glory;"),
            item("&bull;", "Introduction to professionals in the health industry and others for "
                           "support by way of materials, equipment and personnel training;"),
            item("&bull;", "Financial support to meet immediate legal and running costs of the "
                           "nonprofit corporation and personal expenses."),
        ]),
        section("My Immediate Needs", [
            p("I am currently in the stage of preparation for field work in Nigeria. While I am in the "
              "United States, it is necessary to take steps to be affiliated to a religious "
              "organization to facilitate building a network of support and provide an anchor for the "
              "work. Consequently, I am seeking a religious organization that will facilitate my free "
              "movement in and out of the USA and provide a home base for the realization of the "
              "vision."),
            p("In addition to the above, I need support to provide for my immediate needs to meet my "
              "minimum sustenance while in the USA. These include:"),
            item("&bull;", "Counsel and accountability from church members or church network groups."),
            item("&bull;", "Support to cover my <i>minimum monthly budget, which includes unexpected "
                           "expenses,</i> of $780 (details and breakdown are available on request)."),
        ]),
        p("Again, I ask for your prayers, and if the Lord so leads you to assist me in any of the areas "
          "of the fulfilment of this vision, please get in touch through the Practical Love contact "
          "page."),
        p("Shalom.", "Signature"),
        p("Moses A. Owoeye, MD, MATh", "Signature"),
    ],
)

# --- Eradicating Poverty in Ijesha Land (2025 proposal) ------------------------

build(
    "public/publications/eradicating-poverty-in-ijesha-land.pdf",
    "Eradicating Poverty in Ijesha Land",
    "Rev. Dr. Moses Aderemi Akanbi Owoeye",
    "A lifetime project by LOVE Ministry using LoveCards. A proposal to His Imperial Majesty, "
    "the Owa Obokun Adimula of Ijesha Land.",
    "Laying the foundation for revival and progress, one family at a time.",
    [
        p("A Lifetime Project by LOVE Ministry Using LoveCards", "SectionTitle"),
        p("26th May, 2025", "Signature"),
        p("<b>To:</b> His Imperial Majesty Owa Clement Adesuyi Haastrup Ajimoko III, Owa Obokun "
          "Adimula and the Paramount Ruler of Ijesha Land"),
        p("His Imperial Majesty,"),
        p("Warm greetings to you in the name of love, unity, and progress. It is with great joy that I "
          "extend my heartfelt congratulations to you on the auspicious occasion of your coronation, "
          "recently concluded on the 25th of May, 2025, a momentous event marking the dawn of a new "
          "era of leadership, peace, and prosperity in every home and family in Ijesha land."),
        p("As a ministry deeply committed to the message of LOVE, we humbly submit this proposal to "
          "request the honour of beginning a lifetime poverty eradication project targeting the homes "
          "and families of Ijeshas in Ijesha Land. Our mission is to reignite the flame of LOVE in the "
          "hearts of Ijesha people; to burn out the weeds of greed and materialism that have taken "
          "root and to restore the foundation of godly love that once defined this land. This project "
          "is in alignment with the spiritual heritage of Ijesha Land, as exemplified by the great "
          "missionary Pa Elton and perpetuated by the godly men he raised here."),
        section("Why This Project Matters for Ijesha Land", [
            p("The foundation of a prosperous community lies in families grounded in love: love that "
              "begins in the home and flows outward to transform society. Our lifetime project to "
              "eradicate poverty in homes and families using LoveCards is rooted in this timeless "
              "truth. The legacy of Pa Elton remains a testimony to the power of love and faith in "
              "shaping destinies, and this initiative offers a divine opportunity to rekindle that "
              "same spirit in our time."),
            p("At the heart of the societal challenges facing our country today (greed, division, and "
              "moral decay) lies a deficit of LOVE. This erosion of love within homes has led to both "
              "moral and financial bankruptcy, as materialism and the love of money take the helm."),
            p("For decades, our ministry has combated this decline through the simple, yet powerful "
              "act of giving out LoveCards. LoveCards are tools that convey God's message of love and "
              "redirect individuals and families back to His principles as found in the Bible. We "
              "have witnessed profound transformations in homes and communities where these LoveCards "
              "were received: families restored, youth redirected, and entrepreneurial spirits "
              "awakened, resulting in tangible economic upliftment."),
        ]),
        section("How This Aligns with the Vision of the New King", [
            p("As His Royal Majesty assumes the revered throne, his commitment to fostering unity, "
              "peace, and progress in Ijesha Land is clear. This lifetime project to eradicate poverty "
              "in homes and families using LoveCards aligns seamlessly with that vision."),
            p("By launching this initiative under your reign, we will not only honour the values and "
              "traditions of Ijesha Land but also create a spiritual and economic blueprint for the "
              "future. Families and youth across communities will be empowered through love-centered "
              "education and training that will shift mindsets, eliminate ignorance, and foster "
              "wealth generation using the abundant natural and human resources of Ijesha."),
            p("This project will serve as a unifying force that will encourage collaboration, respect, "
              "and shared progress. It will also spark the creativity of the youth, steering them away "
              "from vices and redirecting them into channels of productivity that will boost Ijesha's "
              "economy and reputation globally."),
        ]),
        p("[One page of the original letter is not available.]", "Callout"),
        p("... lifetime project focused on eradicating poverty in homes and families using LoveCards, "
          "together we can build a legacy that reflects the heart of God and the strength of our "
          "people."),
        p("We humbly seek the opportunity to contribute to this reign by laying the foundation for "
          "revival and progress, one family at a time."),
        p("We await your kind consideration and remain available for further discussions at your "
          "convenience. May your reign be remembered as the golden age of love, light, and lasting "
          "prosperity in Ijesha Land."),
        p("Yours in service to love and revival,<br/>Rev. Dr. Moses Aderemi Akanbi Owoeye<br/>"
          "MB;BS (Lagos), MATh. (Cal. USA)<br/>LOVE Ministry using LoveCards", "Signature"),
    ],
)

# --- Prescription For Life (book recommendation) --------------------------------

build(
    "public/publications/prescription-for-life.pdf",
    "Prescription For Life",
    "Practical Love Publications",
    "A book recommendation: Prescription For Life by Dr. Richard Furman, MD, FACS.",
    "A must read for every Nigerian in order to increase our average life-span.",
    [
        p("Prescription For Life", "SectionTitle"),
        p("By Dr. Richard Furman, MD, FACS", "Signature"),
        item("1.", "Based on documented medical research."),
        item("2.", "Three simple strategies to live younger and longer."),
        item("3.", "Six (6) foods you should NEVER eat again."),
        item("4.", "Why lack of exercise is killing you."),
        item("5.", "Decrease the risk of heart attack, stroke, and dementia."),
        section("P.S.", [
            p("This book is a must read for every Nigerian in order to increase our average "
              "life-span."),
            p("This book is as powerful as <i>The Purpose Driven Life</i> by Rick Warren, with over "
              "sixty million copies sold worldwide. I have prayerfully read PDL over ten times, each "
              "time gaining a new perspective."),
        ]),
    ],
)

# --- Love Nigerians Or Live On Curses -------------------------------------------

characteristics = [
    ("Love endures long and is patient and kind.", "Ajao endures long and is patient and kind."),
    ("Love is never envious or boils over with jealousy.",
     "Abubakar is never envious or boils over with jealousy."),
    ("Love is not boastful or vainglorious.", "Ikechukwu is not boastful or vainglorious."),
    ("Love does not display itself haughtily.", "Jang does not display itself haughtily."),
    ("Love is not conceited (arrogant and inflated with pride).",
     "Rachael is not conceited (arrogant and inflated with pride)."),
    ("Love is not rude or unmannerly.", "Bassey is not rude or unmannerly."),
    ("Love does not act unbecomingly.", "Oseni does not act unbecomingly."),
    ("Love (God's love in us) does not insist on its own way or its own right.",
     "Obape does not insist on his own way or his own right."),
    ("Love is not self-seeking.", "Taofik is not self-seeking."),
    ("Love is not fretful, touchy or resentful.", "Jega is not fretful, touchy or resentful."),
    ("Love takes no account of evil done to it.", "Sangobiyi takes no account of evil done to it."),
    ("Love pays no attention to a suffered wrong.", "Adamu pays no attention to a suffered wrong."),
    ("Love does not rejoice at injustice and unrighteousness but rejoices when right and truth "
     "prevail.",
     "Yinka does not rejoice at injustice and unrighteousness but rejoices when right and truth "
     "prevail."),
    ("Love bears up under anything that comes.", "Emeka bears up under anything that comes."),
    ("Love is ever ready to believe the best of every person.",
     "Ema is ever ready to believe the best of every person."),
    ("Love's hope is fadeless under all circumstances, and it endures everything without "
     "weakening.",
     "Adaji's hope is fadeless under all circumstances, and it endures everything without "
     "weakening."),
    ("Love never fails, never fades out, or becomes obsolete, or comes to an end.",
     "Bello never fails, never fades out, or becomes obsolete, or comes to an end. "
     "(1 Corinthians 13, Amplified Version)"),
]

build(
    "public/publications/love-nigerians-or-live-on-curses.pdf",
    "Love Nigerians Or Live On Curses",
    "Moses Aderemi Owoeye, MB;BS (Lagos), M.A.Th. (California, USA)",
    "The solution to corruption. Make love Nigerian culture: how?",
    "LOVE brings BLESSINGS. Corruption brings CURSES.",
    [
        p("The Solution to Corruption", "SectionTitle"),
        p("<b>Love Nigerians or live with curses: how? Make love Nigerian culture: how?</b>"),
        item("1.", "You cannot do anything to your past."),
        item("2.", "What happened to you an hour ago is gone and gone forever."),
        item("3.", "You cannot control how human beings should behave or respond to you."),
        item("4.", "But do you know you can control how you respond to your past as well as to the "
                   "behaviour of human beings?"),
        item("5.", "You can respond in a way that will be pleasing to God, to fellow Nigerians and "
                   "also to yourself. How? You might ask."),
        item("6.", "It is simply by responding in LOVE or making LOVE your aim in everything you do."),
        item("7.", "When you think, act and walk in LOVE it is pleasing to GOD and fellow Nigerians."),
        item("8.", "Since responding in love is an intentional action, it is voluntary; an active, not "
                   "a passive attitude. You have to choose to respond in LOVE; when it is an act of "
                   "your will then it is pleasing to you."),
        p("Remember whatever you do in LOVE can never fail. LOVE NEVER FAILS. GOD IS LOVE. "
          "(1 Corinthians 13:8, 1 John 4:8)", "Callout"),
        p("How Do I Love Nigerians?", "SectionTitle"),
        item("1.", "You love Nigerians by <b>loving your husband, your wife, your children</b>, your "
                   "parents, your brothers and sisters, in short your family and <b>all that "
                   "concerns them</b>."),
        item("2.", "Jesus said, \"A new commandment I am giving you: love one another... Your love for "
                   "one another will prove to the world you are my disciples... If you love me you "
                   "will obey my commandment of loving your neighbours as yourself.\" (John 13:34, "
                   "Luke 10:37)"),
        item("3.", "OWE NO MAN ANYTHING EXCEPT LOVE. (Romans 13:8)"),
        item("4.", "Make love your aim. (1 Corinthians 14:1)"),
        item("5.", "If a man says, I love God, and hates his brother, he is a liar; for he who does not "
                   "love his brother whom he has seen, how can he love God whom he has not seen? And "
                   "this is the commandment we have from Him, that he who loves God loves his brother "
                   "also. (1 John 4:20-21)"),
        item("6.", "There is no fear in love; perfect love casts out fear, because fear has torment. He "
                   "that fears is not perfect in love. (1 John 4:18)"),
        item("7.", "FEAR: <b>False Expectations Appearing Real</b>"),
        item("8.", "FAITH: <b>Forsaking All I Trust Him</b>"),
        PageBreak(),
        p("How Then Do I Practise Love to God and Fellow Nigerians?", "SectionTitle"),
        p("It is by memorizing, meditating always, verbalizing, walking and acting intentionally in one "
          "or more of the 17 ways itemized below. Wherever you see Love from 1 to 17, insert your "
          "name."),
        p("Characteristics of Love", "Heading"),
        *[item(f"{n}.", f"{text} <i>e.g. {example}</i>")
          for n, (text, example) in enumerate(characteristics, start=1)],
    ],
)
