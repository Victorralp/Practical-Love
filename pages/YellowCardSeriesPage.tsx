import { Heart, Download, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function YellowCardSeriesPage() {
    const characteristics = [
        { num: 1, text: "LOVE endures long and is patient and kind" },
        { num: 2, text: "LOVE is never envious or boils over with jealousy" },
        { num: 3, text: "LOVE is not boastful or vainglorious" },
        { num: 4, text: "LOVE does not display itself haughtily" },
        { num: 5, text: "LOVE is not conceited (arrogant and inflated with pride)" },
        { num: 6, text: "LOVE is not rude or unmannerly" },
        { num: 7, text: "LOVE does not act unbecomingly" },
        { num: 8, text: "LOVE (GOD'S LOVE IN US) does not insist on his own way or his own right" },
        { num: 9, text: "LOVE is not self-seeking" },
        { num: 10, text: "LOVE is not fretful, touchy or resentful" },
        { num: 11, text: "LOVE takes no account of evil done to it" },
        { num: 12, text: "LOVE pays no attention to a suffered wrong" },
        { num: 13, text: "LOVE does not rejoice at injustice and unrighteousness but rejoices when right and truth prevail" },
        { num: 14, text: "LOVE bears up under anything that comes" },
        { num: 15, text: "LOVE is ever ready to believe the best of every person" },
        { num: 16, text: "LOVE's hope is fadeless under all circumstances, and it endures everything" },
        { num: 17, text: "LOVE never fails, never fades out, or becomes obsolete, or comes to an end" }
    ];

    const passages = [
        "1. Matthew 5:43-45", "2. Matthew 19:19", "3. Matthew 22:37-39", "4. Mark 12:31-33", "5. Luke 6:27",
        "6. Luke 6:32-35", "7. John 3:16", "8. John 13:34-35", "9. John 14:15", "10. John 14:21-31",
        "11. John 15:9-19", "12. Romans 8:28", "13. Romans 8:35-39", "14. Romans 12:9-10", "15. Romans 13:8",
        "16. Romans 13:9", "17. Romans 13:10", "18. 1 Corinthians 2:9", "19. 1 Corinthians 13", "20. Galatians 5:6",
        "21. Galatians 5:13-22", "22. Ephesians 4:2", "23. Ephesians 4:15", "24. Ephesians 5:2", "25. Ephesians 5:25",
        "26. Ephesians 5:28", "27. Ephesians 5:33", "28. Colossians 3:14", "29. 1 Thessalonians 4:9", "30. 1 Timothy 6:10-11",
        "31. 2 Timothy 1:7", "32. Titus 2:4", "33. Hebrew 6:10", "34. Hebrew 10:24", "35. Hebrew 13:1",
        "36. James 2:8", "37. 1 Peter 3:8", "38. 1 Peter 3:10", "39. 1 John 5:2-15", "40. 1 John 3:14",
        "41. 1 John 3:16-23", "42. 1 John 4:7-19", "43. 1 John 4:20-21", "44. 1 John 5:2-3", "45. 2 John 1:1-6",
        "46. 3 John 1:1", "47. Jude 1:2", "48. Jude 1:21", "49. Revelation 2:4", "50. Revelation 3:19"
    ];

    const summaryPoints = [
        "1. We do not Love ourselves in Nigeria.",
        "2. To make this worst as stated in (1) above WE ARE STUBBORN IN WICKEDNESS.",
        "3. All families in Nigeria are guilty including my own and your own families.",
        "4. Why? Because Money and Materialism is the language of Love in our homes and families.",
        "5. Love of money is the root of all evils, name any evil you find it in Nigeria.",
        "6. There is a thin line between LOVE of God and LOVE of money; you need to work hard DAILY to be on the side of God, because LOVE of God is the root of all blessings while LOVE of money is the root of all evils.",
        "7. For God so loved the world.",
        "............................................(John 3:16). But take note this includes every human being on this planet NO EXCEPTION",
        "8. The idea of HUSBAND AND WIFE AND FAMILY is from God and God alone.",
        "9. God's love language is in the yellow card in your hand.",
        "0. Any Nigerian who memorize and practicalized the characteristics of Love in his or her family IT IS MANDATORY OR COMPULSORY FOR GOD TO BLESS THAT FAMILY",
    ];

    const familyPoints = [
        "FAMILY (i) Mrs. Ngozi Okonjo-Iweala and her background (ii) Mr. Adesina Akinwunmi (the present president of (AFDB) African Development Bank) trace this to their roots, you will confirm this.",
        "11. If you love your wife and/or wife Love your husband, parents Love their children and children Love your parents based on THIS LANGUAGE OF LOVE IN THE YELLOW CARD IN YOUR HAND, you are honouring God and God says those who honour me I will honour them.",
        "12. Any Nigerian deep or stubborn in corruption and wickedness, trace their roots; they usually don't come from a LOVING AND GODLY/GOD FEARING AND LOVING HOMES/ FAMILIES",
        "13. There is no way something good will come out of Loving and Godly family, that will not impact the family, community, church, mosque and society at large, E.g. Mrs. Ngozi Okonjo-Iweala and Mr. Adesina Akinwunmi of (AFDB)"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-24 px-6 md:px-8">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <Link to="/" className="inline-flex items-center text-red-600 hover:text-red-700 font-bold mb-8 transition-colors bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md">
                        ← Back to Home
                    </Link>
                    <div className="relative block mb-6">
                        <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 rounded-full animate-pulse"></div>
                        <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-serif text-red-800 tracking-wide font-bold">
                            The Yellow Card Series
                        </h1>
                    </div>
                    <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed italic font-serif">
                        "God's Love Language"
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Card 1: Characteristics */}
                    <div className="bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-3xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-500 border border-yellow-400/50">
                        <div className="bg-gradient-to-r from-red-700 to-red-600 p-6 text-center text-white border-b-4 border-yellow-500 shadow-md">
                            <h2 className="text-2xl font-bold font-serif uppercase tracking-wider mb-2">Characteristics of Love</h2>
                            <div className="inline-block bg-white/10 px-4 py-1 rounded-full border border-white/20">
                                <p className="text-xs font-bold uppercase tracking-widest text-yellow-100">Insert Your Name</p>
                            </div>
                        </div>
                        <div className="p-6 bg-yellow-50/80 backdrop-blur-sm min-h-[600px]">
                            <div className="space-y-3">
                                {characteristics.map((item) => (
                                    <div key={item.num} className="flex items-start p-3 bg-white/80 rounded-xl border border-yellow-200/60 shadow-sm hover:shadow-md transition-all hover:bg-white">
                                        <span className="flex-shrink-0 w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 shadow-sm">{item.num}</span>
                                        <p className="text-sm text-gray-800 font-medium leading-relaxed">{item.text}</p>
                                    </div>
                                ))}
                                <div className="mt-8 pt-6 border-t-2 border-yellow-400/30 text-center">
                                    <p className="text-red-800 font-bold text-sm mb-1 uppercase tracking-wider bg-yellow-200/50 inline-block px-4 py-2 rounded-lg">1 Corinthians 13 (Amplified)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Passages */}
                    <div className="bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-3xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-500 border border-yellow-400/50">
                        <div className="bg-gradient-to-r from-red-700 to-red-600 p-6 text-center text-white border-b-4 border-yellow-500 shadow-md">
                            <div className="flex justify-center items-center gap-3">
                                <Heart className="w-6 h-6 text-yellow-300 fill-current animate-pulse" />
                                <h2 className="text-xl font-bold font-serif uppercase tracking-wider">Love Passages</h2>
                                <Heart className="w-6 h-6 text-yellow-300 fill-current animate-pulse" />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest text-yellow-100 mt-2">New Testament</p>
                        </div>
                        <div className="p-6 bg-yellow-50/80 backdrop-blur-sm min-h-[600px]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                                {passages.map((text, i) => (
                                    <div key={i} className="py-2 px-3 border border-yellow-200/50 bg-white/60 rounded-lg text-gray-900 font-medium hover:bg-white hover:shadow-sm transition-all text-xs">
                                        {text}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 bg-white p-5 rounded-xl border-l-4 border-red-500 shadow-md">
                                <p className="mb-3 text-sm font-medium text-gray-700">Study each verse above (1-50) using LIFE Application Bible Commentary</p>
                                <p className="text-red-700 font-bold text-sm uppercase">We are to reproduce and give to every NIGERIAN</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Summary */}
                    <div className="bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-3xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-500 border border-yellow-400/50">
                        <div className="bg-gradient-to-r from-red-700 to-red-600 p-6 text-center text-white border-b-4 border-yellow-500 shadow-md">
                            <h2 className="text-xl font-bold font-serif uppercase tracking-wider mb-2">Summary of Message</h2>
                            <div className="inline-block bg-white/10 px-4 py-1 rounded-full border border-white/20">
                                <p className="text-xs font-bold uppercase tracking-widest text-yellow-100">Love Ministry for Nigeria</p>
                            </div>
                        </div>
                        <div className="p-6 bg-yellow-50/80 backdrop-blur-sm min-h-[600px] text-sm md:text-base">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    {summaryPoints.map((point, i) => (
                                        <div key={i} className="flex gap-3">
                                            <div className="w-1 bg-red-400 rounded-full h-auto flex-shrink-0"></div>
                                            <p className="text-gray-900 leading-relaxed font-medium">
                                                {point}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="my-6 border-t-2 border-dashed border-yellow-400/50"></div>

                                <div className="space-y-4">
                                    {familyPoints.map((point, i) => (
                                        <div key={i} className="flex gap-3">
                                            <div className="w-1 bg-orange-400 rounded-full h-auto flex-shrink-0"></div>
                                            <p className="text-gray-900 leading-relaxed font-medium">
                                                {point}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 text-center bg-red-50 p-3 rounded-lg border border-red-100">
                                    <p className="font-bold text-red-800 uppercase text-xs tracking-widest">Please Turn Over</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16 mb-8 print:hidden">
                    <button
                        onClick={() => window.print()}
                        className="bg-white text-red-600 px-10 py-4 rounded-xl font-bold hover:bg-red-50 hover:scale-105 transition-all flex items-center justify-center shadow-lg border-2 border-red-100"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Download PDF
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-4 rounded-xl font-bold hover:from-red-700 hover:to-red-800 hover:scale-105 transition-all flex items-center justify-center shadow-lg shadow-red-200"
                    >
                        <Printer className="w-5 h-5 mr-2" />
                        Print Version
                    </button>
                </div>
            </div>
        </div>
    );
}
