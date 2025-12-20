import { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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
        setCurrentPageIndex(prev => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPageIndex(prev => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in duration-300 relative bg-gradient-to-br from-[#0a0a2a] via-[#1a1a4a] to-[#0a0a2a]">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

            {/* Close/Back Button */}
            <button
                onClick={() => navigate('/publications')}
                className="fixed top-6 right-6 text-white/80 hover:text-white transition-colors z-50 p-2 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full hover:shadow-lg border border-white/20"
                title="Exit Reader"
            >
                <X className="w-8 h-8" />
            </button>

            {/* Main Content Container */}
            <div className="relative w-full max-w-6xl flex-grow flex flex-col items-center justify-center py-8">
                {/* Header */}
                <div className="w-full max-w-3xl flex justify-between items-center text-sm tracking-widest font-bold uppercase text-amber-300 border-b border-amber-200/20 mb-4 pb-2">
                    <span className="truncate max-w-[250px] text-amber-200">{book.title}</span>
                    <span className="text-amber-400">{currentPageIndex + 1} / {totalPages}</span>
                </div>

                {/* Content Area */}
                {hasTextContent ? (
                    <div className="bg-[#1a1a3a] rounded-lg shadow-xl overflow-hidden min-h-[800px] flex flex-col relative w-full max-w-3xl border-l-8 border-amber-500/30 transform-gpu transition-all">
                        {/* Paper Texture */}
                        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-noise" />
                        {/* Spine Shadow */}
                        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-10" />
                        {/* Page Content */}
                        <div className="flex-grow px-8 py-12 overflow-y-auto font-serif text-gray-200 leading-relaxed text-lg scrollbar-thin scrollbar-thumb-amber-500/30 scrollbar-track-transparent z-20 relative selection:bg-amber-700/30 selection:text-amber-100">
                            <div className="max-w-xl mx-auto">
                                {book.pages![currentPageIndex].content}
                                {currentPageIndex < totalPages - 1 && (
                                    <div className="mt-12 pt-6 border-t border-amber-200/10 flex justify-center">
                                        <button
                                            onClick={nextPage}
                                            className="group flex flex-col items-center text-sm font-bold text-amber-300 hover:text-amber-100 transition-colors tracking-widest uppercase"
                                        >
                                            <span>Continue Reading</span>
                                            <ChevronRight className="w-6 h-6 mt-2 group-hover:translate-y-1 transition-transform rotate-90" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-grow flex items-center justify-center w-full max-w-3xl">
                        <img
                            src={book.images![currentPageIndex]}
                            alt={`Page ${currentPageIndex + 1}`}
                            className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
                        />
                    </div>
                )}

                {/* Desktop Navigation */}
                <button
                    onClick={prevPage}
                    className="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center text-amber-300 hover:text-amber-100 border border-amber-300/20 hover:border-amber-300 rounded-full transition-all hover:scale-110 hover:bg-amber-800/30 backdrop-blur-sm"
                    title="Previous Page"
                    disabled={currentPageIndex === 0}
                    style={{ opacity: currentPageIndex === 0 ? 0 : 1, pointerEvents: currentPageIndex === 0 ? 'none' : 'auto' }}
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                    onClick={nextPage}
                    className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center text-amber-300 hover:text-amber-100 border border-amber-300/20 hover:border-amber-300 rounded-full transition-all hover:scale-110 hover:bg-amber-800/30 backdrop-blur-sm"
                    title="Next Page"
                    disabled={currentPageIndex === totalPages - 1}
                    style={{ opacity: currentPageIndex === totalPages - 1 ? 0 : 1, pointerEvents: currentPageIndex === totalPages - 1 ? 'none' : 'auto' }}
                >
                    <ChevronRight className="w-8 h-8" />
                </button>

                {/* Mobile Footer Navigation */}
                <div className="py-6 border-t border-amber-200/10 mx-4 md:mx-8 flex justify-between items-center md:hidden text-amber-300">
                    <button
                        onClick={prevPage}
                        className="p-3 hover:text-amber-100 transition-colors"
                        disabled={currentPageIndex === 0}
                        style={{ opacity: currentPageIndex === 0 ? 0 : 1 }}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <span className="text-xs font-medium">PAGE {currentPageIndex + 1}</span>
                    <button
                        onClick={nextPage}
                        className="p-3 hover:text-amber-100 transition-colors"
                        disabled={currentPageIndex === totalPages - 1}
                        style={{ opacity: currentPageIndex === totalPages - 1 ? 0 : 1 }}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}
