import { Link } from 'react-router-dom';
import { Eye, Book } from 'lucide-react';
import { PublicationProps } from '../data/publications';

interface CardProps {
  book: PublicationProps;
}

export function PublicationCard({ book }: CardProps) {
  return (
    <Link to={`/read/${book.id}`} className="group relative block w-full perspective-1000">
      <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:bg-white/10 overflow-hidden h-full flex flex-col">
        {/* Glow Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        {/* Cover Image Container */}
        <div className="relative w-full aspect-[2/3] mb-6 rounded-lg shadow-2xl overflow-hidden flex items-center justify-center bg-black/20 group-hover:scale-[1.02] transition-transform duration-500">
          {book.coverImage ? (
            <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-900 to-red-950 p-4 text-center">
              <Book className="w-12 h-12 text-white/50 mb-4" />
              <span className="text-white font-serif font-bold text-lg">{book.title}</span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
            <span className="inline-flex items-center px-6 py-3 bg-white text-black rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <Eye className="w-4 h-4 mr-2" />
              Read Now
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-auto relative z-10">
          <span className="text-orange-300 text-xs font-bold uppercase tracking-widest mb-2 block">
            {book.type}
          </span>
          <h3 className="text-xl font-serif font-bold text-white mb-2 leading-tight group-hover:text-orange-100 transition-colors">
            {book.title}
          </h3>
          <p className="text-white/60 text-sm mb-4 line-clamp-2">{book.description}</p>
          <div className="text-white/40 text-xs font-medium border-t border-white/10 pt-4">
            By {book.author}
          </div>
        </div>
      </div>
    </Link>
  );
}

