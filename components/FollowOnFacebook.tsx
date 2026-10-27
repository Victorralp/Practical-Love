import { Share2 } from 'lucide-react';
import { FACEBOOK_URL } from '../src/seo/routeSeo';

/** Card that invites readers to follow the ministry's Facebook Page. */
export default function FollowOnFacebook({ description }: { description: string }) {
  return (
    <div className="surface text-center p-10 space-y-5 print:hidden">
      <h2 className="text-3xl md:text-4xl font-serif text-red-800 leading-[1.1] tracking-[-0.015em]">
        Walk with us on Facebook
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
      <div className="flex justify-center">
        <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="btn-brand px-10 py-4">
          <Share2 className="w-5 h-5 mr-2" />
          Follow Practical Love Ministry
        </a>
      </div>
    </div>
  );
}
