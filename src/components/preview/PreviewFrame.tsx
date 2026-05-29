import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { serializeWishData } from '../../utils/serialization';
import { Laptop, Tablet, RotateCcw } from 'lucide-react';

export const PreviewFrame: React.FC = () => {
  const { currentWish } = useStore();
  const [device, setDevice] = useState<'desktop' | 'mobile'>('mobile');
  const [reloadKey, setReloadKey] = useState(0);

  // Generate serialized data token
  const dataToken = serializeWishData(currentWish);
  const previewUrl = `${window.location.origin}/wish/${dataToken}?preview=true`;

  const handleReload = () => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <div className="flex h-full flex-col bg-[#f9f9f9] border-l border-[#e5dfd3] select-none">
      {/* Device Toolbar */}
      <div className="flex items-center justify-between bg-white px-6 py-3 border-b border-[#e5dfd3]">
        <span className="font-display text-xs font-bold uppercase tracking-wider text-[#5e5a52]">
          Live Interactive Canvas
        </span>

        <div className="flex items-center gap-2">
          {/* Mobile Toggle */}
          <button
            onClick={() => setDevice('mobile')}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer ${
              device === 'mobile'
                ? 'bg-[#111111] text-white'
                : 'text-[#5e5a52] hover:bg-neutral-100 hover:text-[#111111]'
            }`}
            title="Mobile Portrait (100dvh)"
          >
            <Tablet className="h-4 w-4" />
          </button>

          {/* Desktop Toggle */}
          <button
            onClick={() => setDevice('desktop')}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer ${
              device === 'desktop'
                ? 'bg-[#111111] text-white'
                : 'text-[#5e5a52] hover:bg-neutral-100 hover:text-[#111111]'
            }`}
            title="Desktop Viewport"
          >
            <Laptop className="h-4 w-4" />
          </button>

          <div className="h-4 w-[1px] bg-[#e5dfd3] mx-1"></div>

          {/* Refresh Frame */}
          <button
            onClick={handleReload}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#5e5a52] hover:bg-neutral-100 hover:text-[#111111] transition-colors cursor-pointer"
            title="Restart Scene Animation"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Frame Sandbox */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden relative">
        <div
          className="relative transition-all duration-500 ease-out shadow-medium border border-[#e5dfd3] bg-white"
          style={{
            width: device === 'mobile' ? '360px' : '100%',
            height: device === 'mobile' ? '640px' : '100%',
            maxHeight: '100%',
            borderRadius: device === 'mobile' ? '32px' : '0px',
            overflow: 'hidden',
          }}
        >
          {device === 'mobile' && (
            /* Mock Speaker & Camera bar for premium phone mock feeling */
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-32 bg-black rounded-b-2xl z-50 flex items-center justify-center">
              <div className="h-1 w-10 bg-white/20 rounded-full"></div>
            </div>
          )}

          <iframe
            key={`${reloadKey}-${dataToken}`} // Key force reloads iframe when data token changes, keeping sync perfect
            src={previewUrl}
            className="w-full h-full border-none"
            title="Wisher Template Preview Container"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>
      </div>
    </div>
  );
};
export default PreviewFrame;
