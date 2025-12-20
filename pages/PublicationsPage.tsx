import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { publications } from '../data/publications'
import { useState, useEffect } from 'react'

// Animated Floating Particles Component
function FloatingParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-orange-400/30 animate-pulse"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${3 + Math.random() * 4}s`
                    }}
                />
            ))}
        </div>
    )
}

// Premium 3D Book Component
function Book3D({ coverImage, title }: { coverImage?: string; title: string }) {
    return (
        <div className="w-64 h-96 rounded-lg overflow-hidden shadow-lg">
            {coverImage ? (
                <img src={coverImage} alt={title} className="w-full h-full object-cover" />
            ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-800 text-white">
                    {title}
                </div>
            )}
        </div>
    );
}


export default function PublicationsPage() {
    const [scrollY, setScrollY] = useState(0);


    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="min-h-screen bg-black relative overflow-hidden">

            {/* Animated Gradient Background */}
            <div className="fixed inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/30 to-black" />
                <div
                    className="absolute inset-0 bg-[url('/backgrounds/publications-bg-dark.png')] bg-cover bg-center opacity-60"
                    style={{ transform: `translateY(${scrollY * 0.3}px)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
            </div>

            {/* Floating Particles */}
            <FloatingParticles />



            {/* ======================= BOOKS GRID ======================= */}
            <div className="relative z-10 py-24 max-w-6xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-serif text-white text-center mb-12">Featured Publications</h2>
                <div className="grid md:grid-cols-2 gap-12">
                    {publications.slice(0, 2).map((book) => (
                        <div key={book.id} className="flex flex-col items-center">
                            <Book3D coverImage={book.coverImage} title={book.title || ''} />
                            <Link
                                to={`/read/${book.id}`}
                                className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold px-6 py-3 rounded-full hover:shadow-lg transition-shadow"
                            >
                                Read {book.title}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
