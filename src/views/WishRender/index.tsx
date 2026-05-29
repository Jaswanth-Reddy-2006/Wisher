import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { wishService } from '../../services/wishService';
import type { WishData } from '../../templates/types';
import { getTemplateById } from '../../templates';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { deserializeWishData } from '../../utils/serialization';

export const WishRender: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wishData, setWishData] = useState<WishData | null>(null);

  const isPreview = searchParams.get('preview') === 'true';

  useEffect(() => {
    const loadWish = async () => {
      const token = searchParams.get('q');
      if (token) {
        const deserialized = deserializeWishData(token);
        if (deserialized) {
          setWishData(deserialized);
          setLoading(false);
          return;
        }
      }

      if (!id) {
        setError("Invalid URL invitation path.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const data = await wishService.getWish(id);
        
        if (data) {
          setWishData(data);
        } else {
          setError("This invitation or wish website does not exist or has expired.");
        }
      } catch (err) {
        console.error("Failed to load wish details:", err);
        setError("A network error occurred while loading this experience.");
      } finally {
        setLoading(false);
      }
    };

    loadWish();
  }, [id, searchParams]);

  // Loading Screen
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-[#111111] font-sans">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d30f0f]/10 text-[#d30f0f] mb-4 animate-spin">
          <RefreshCw className="h-6 w-6" />
        </div>
        <h3 className="font-display text-base font-extrabold tracking-tight mb-1">
          Loading Experience
        </h3>
        <p className="text-[10px] text-[#5e5a52] uppercase font-bold tracking-wider animate-pulse">
          Retrieving 3D layout configurations...
        </p>
      </div>
    );
  }

  // Error Screen
  if (error || !wishData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white px-6 text-center font-sans">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg border border-[#e5dfd3]">
          <div className="h-12 w-12 rounded-full bg-red-100 text-[#d30f0f] flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-black text-[#111111] mb-2">Invitation Not Found</h2>
          <p className="text-xs text-[#5e5a52] leading-relaxed mb-6">
            {error || "We could not find the custom wish page matching this link."}
          </p>
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center rounded-xl bg-[#d30f0f] py-3 text-xs font-bold text-white shadow-md hover:bg-red-700 cursor-pointer"
          >
            Create Your Own Wish
          </Link>
        </div>
      </div>
    );
  }

  // Resolve template component and render dynamically
  const templateConfig = getTemplateById(wishData.templateType);
  const TemplateComponent = templateConfig.component;

  return (
    <div className="w-screen h-[100dvh] overflow-hidden relative">
      <TemplateComponent data={wishData} isPreview={isPreview} />

      {/* Floating brand watermark (discreet, premium look) */}
      {!isPreview && (
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-4 left-4 z-40 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#e5dfd3] shadow-md flex items-center gap-1.5 hover:scale-105 duration-200 select-none cursor-pointer"
        >
          <span className="text-[9px] font-bold text-[#5e5a52] uppercase tracking-wider">
            Powered by
          </span>
          <span className="font-display text-[10px] font-black text-[#111111] flex items-center gap-1">
            wisher<span className="text-[#d30f0f]">.</span>
          </span>
        </a>
      )}
    </div>
  );
};
export default WishRender;
