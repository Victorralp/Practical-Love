import { ArrowRight, BookOpen, Download, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { publications } from '../data/publications'

export default function PublicationsPage() {
    return (
        <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-red-50 py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-6">
                        <BookOpen className="w-14 h-14 text-red-600 mr-4" />
                        <Heart className="w-14 h-14 text-orange-600 animate-pulse" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif text-red-800 mb-6">
                        Free <span className="text-orange-600">Publications</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Download our free books and discover the transformative power of love in your nation.
                        <br />
                        <span className="text-sm font-semibold text-orange-600 mt-2 block">
                            Feel free to reproduce and distribute these materials freely.
                        </span>
                    </p>
                </div>

                {/* Publications Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {publications.map((book) => (
                        <div 
                            key={book.id} 
                            className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-orange-100 hover:shadow-2xl hover:border-orange-300 transition-all duration-300 transform hover:-translate-y-2"
                        >
                            {/* Book Cover */}
                            <div className="relative h-80 bg-gradient-to-br from-red-900 to-orange-800 overflow-hidden">
                                {book.coverImage ? (
                                    <img 
                                        src={book.coverImage} 
                                        alt={book.title} 
                                        className="w-full h-full object-cover opacity-40"
                                    />
                                ) : null}
                                <div className="absolute inset-0 flex items-center justify-center p-8">
                                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white text-center leading-tight">
                                        {book.title}
                                    </h2>
                                </div>
                                {/* Free Badge */}
                                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                                    FREE
                                </div>
                            </div>

                            {/* Book Details */}
                            <div className="p-8">
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Author</p>
                                    <p className="text-lg font-semibold text-gray-800">{book.author}</p>
                                </div>

                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {book.description}
                                </p>

                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                                        {book.type}
                                    </span>
                                    {book.pages && (
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                                            {book.pages.length} Pages
                                        </span>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link
                                        to={`/read/${book.id}`}
                                        className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold px-6 py-3 rounded-xl hover:from-red-700 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"
                                    >
                                        <BookOpen className="w-5 h-5" />
                                        Read Online
                                    </Link>
                                    <button
                                        className="flex-1 inline-flex items-center justify-center gap-2 bg-white border-2 border-orange-600 text-orange-600 font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-all"
                                    >
                                        <Download className="w-5 h-5" />
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-10 md:p-16 text-center shadow-2xl">
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
                        Share the Message of Love
                    </h2>
                    <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                        These publications are free to reproduce and distribute. Help spread the message of love and transformation to every corner of your nation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/bible-passages"
                            className="inline-flex items-center justify-center gap-2 bg-white text-red-600 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-all shadow-lg"
                        >
                            Explore Bible Passages
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/characteristics"
                            className="inline-flex items-center justify-center gap-2 bg-orange-800 text-white font-bold px-8 py-4 rounded-xl hover:bg-orange-900 transition-all shadow-lg"
                        >
                            Learn About Love
                            <Heart className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-white rounded-2xl shadow-md border border-orange-100">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Free to Read</h3>
                        <p className="text-gray-600 text-sm">
                            All publications are completely free to read online or download.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-md border border-orange-100">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Download className="w-8 h-8 text-orange-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Free to Share</h3>
                        <p className="text-gray-600 text-sm">
                            Reproduce and distribute these materials to anyone, anywhere.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl shadow-md border border-orange-100">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Transform Lives</h3>
                        <p className="text-gray-600 text-sm">
                            Help spread the message of love and bring blessings to nations.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
