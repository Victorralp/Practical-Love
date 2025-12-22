import { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, BookOpen, Home } from 'lucide-react';
import { publications } from '../data/publications';

export default function BookReaderPage() {
    const { id } = useParams();
    const book = publications.find(p => p.id === id);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const navigate = useNavigate();

    if (!book) {
        return <Navigate to="/publications" replace />;
    }

    const hasTextContent = book.pages && book.pages.length > 0;
    const totalPages = hasTextContent ? book.pages!.length : (book.images?.length || 0);

    const nextPage = () => {
        if (currentPageIndex < totalPages - 1) {
            setCurrentPageIndex(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevPage = () => {
        if (currentPageIndex > 0) {
            setCurrentPageIndex(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goToPage = (index: number) => {
        setCurrentPageIndex(index);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-red-50">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* Left: Book Info */}
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-6 h-6 text-red-600" />
                            <div>
                                <h1 className="text-lg font-bold text-gray-800 line-clamp-1">
                                    {book.title}
                                </h1>
                                <p className="text-sm text-gray-500">{book.author}</p>
                            </div>
                        </div>

                        {/* Right: Navigation */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => navigate('/')}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Home"
                            >
                                <Home className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => navigate('/publications')}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Close Reader"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Counter */}
                <div className="flex items-center justify-between mb-6">
                    <div className="text-sm text-gray-500">
                        Page <span className="font-bold text-red-600">{currentPageIndex + 1}</span> of {totalPages}
                    </div>
                    
                    {/* Page Dots Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {Array.from({ length: Math.min(totalPages, 10) }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToPage(i)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    i === currentPageIndex 
                                        ? 'bg-red-600 w-8' 
                                        : 'bg-gray-300 hover:bg-red-400'
                                }`}
                                title={`Go to page ${i + 1}`}
                            />
                        ))}
                        {totalPages > 10 && (
                            <span className="text-xs text-gray-400 ml-1">+{totalPages - 10}</span>
                        )}
                    </div>
                </div>

                {/* Book Content */}
                {hasTextContent ? (
                    <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-100 overflow-hidden">
                        {/* Page Content */}
                        <div className="p-8 md:p-12 lg:p-16 min-h-[600px]">
                            <div className="prose prose-lg max-w-none">
                                {book.pages![currentPageIndex].content}
                            </div>
                        </div>

                        {/* Page Navigation Footer */}
                        <div className="border-t border-orange-100 bg-orange-50/50 px-8 py-6">
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPageIndex === 0}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                                        currentPageIndex === 0
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-red-600 hover:bg-red-100 hover:shadow-md'
                                    }`}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    <span className="hidden sm:inline">Previous</span>
                                </button>

                                <div className="text-sm font-medium text-gray-600">
                                    {currentPageIndex + 1} / {totalPages}
                                </div>

                                <button
                                    onClick={nextPage}
                                    disabled={currentPageIndex === totalPages - 1}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                                        currentPageIndex === totalPages - 1
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-red-600 hover:bg-red-100 hover:shadow-md'
                                    }`}
                                >
                                    <span className="hidden sm:inline">Next</span>
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-8 flex items-center justify-center min-h-[600px]">
                        <img
                            src={book.images![currentPageIndex]}
                            alt={`Page ${currentPageIndex + 1}`}
                            className="max-w-full max-h-[80vh] object-contain"
                        />
                    </div>
                )}

                {/* Completion Message */}
                {currentPageIndex === totalPages - 1 && (
                    <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 text-center border-2 border-green-200">
                        <h3 className="text-2xl font-bold text-green-800 mb-4">
                            🎉 You've completed this book!
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Thank you for reading. Feel free to share this message of love with others.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => setCurrentPageIndex(0)}
                                className="px-6 py-3 bg-white border-2 border-green-600 text-green-600 font-bold rounded-xl hover:bg-green-50 transition-all"
                            >
                                Read Again
                            </button>
                            <button
                                onClick={() => navigate('/publications')}
                                className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-md"
                            >
                                Browse More Books
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Floating Navigation Buttons (Desktop) */}
            {currentPageIndex > 0 && (
                <button
                    onClick={prevPage}
                    className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center bg-white text-red-600 border-2 border-red-200 rounded-full shadow-lg hover:shadow-xl hover:bg-red-50 transition-all hover:scale-110"
                    title="Previous Page"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
            )}
            
            {currentPageIndex < totalPages - 1 && (
                <button
                    onClick={nextPage}
                    className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 w-14 h-14 items-center justify-center bg-white text-red-600 border-2 border-red-200 rounded-full shadow-lg hover:shadow-xl hover:bg-red-50 transition-all hover:scale-110"
                    title="Next Page"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            )}
        </div>
    );
}
