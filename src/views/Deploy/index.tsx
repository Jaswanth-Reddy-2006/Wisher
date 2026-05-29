import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { serializeWishData } from '../../utils/serialization';
import { Terminal, Copy, Check, QrCode, Download, Edit2, Play, AlertCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import JSZip from 'jszip';

export const Deployer: React.FC = () => {
  const navigate = useNavigate();
  const { currentWish, logs, addLog, clearLogs, deployedId, setDeployedId } = useStore();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [zipLoading, setZipLoading] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  const steps = [
    { text: "Initializing emotional rendering engine...", delay: 600 },
    { text: "Optimizing cinematic 3D assets and camera vectors...", delay: 800 },
    { text: "Compressing celebration media and styling templates...", delay: 900 },
    { text: "Provisioning edge content delivery networks...", delay: 700 },
    { text: "Injecting compressed configuration data parameters...", delay: 800 },
    { text: "Configuring audio autoplay unmute triggers...", delay: 600 },
    { text: "Deployment successful. Live edge URL initialized.", delay: 500 }
  ];

  // Run simulated logs sequence
  useEffect(() => {
    clearLogs();
    setDeployedId(null);
    setCurrentStep(0);

    let active = true;
    const runLogs = async () => {
      // Print timestamp helper
      const getTimestamp = () => `[${new Date().toLocaleTimeString()}]`;
      
      addLog(`${getTimestamp()} Starting deployment for "${currentWish.title}"...`);

      for (let i = 0; i < steps.length; i++) {
        if (!active) return;
        await new Promise((resolve) => setTimeout(resolve, steps[i].delay));
        if (!active) return;
        
        setCurrentStep(i + 1);
        addLog(`${getTimestamp()} ${steps[i].text}`);

        if (terminalEndRef.current) {
          terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Generate self-contained URL with all wish data embedded
      const generatedId = currentWish.templateType;
      if (active) {
        setDeployedId(generatedId);
        addLog(`${getTimestamp()} Live deployment active: self-contained URL generated successfully.`);
      }
    };

    runLogs();

    return () => {
      active = false;
    };
  }, []);

  // Scroll to bottom of terminal whenever logs change
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const token = serializeWishData(currentWish);
  const liveLink = deployedId
    ? `${window.location.origin}/wish/${deployedId}?q=${token}`
    : '';

  const handleCopyLink = () => {
    if (!liveLink) return;
    navigator.clipboard.writeText(liveLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    if (zipLoading || !deployedId) return;
    setZipLoading(true);

    try {
      const zip = new JSZip();

      // Create static autonomous HTML file
      const autonomousHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${currentWish.title}</title>
    <!-- Outfit & Inter Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Outfit:wght@500;700;900&family=Playfair+Display:ital,wght@0,600;0,800;1,600&display=swap" rel="stylesheet">
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Outfit', 'Inter', 'sans-serif'],
                        serif: ['Playfair Display', 'Georgia', 'serif']
                    }
                }
            }
        }
    </script>
    <style>
        :root {
            --bg-primary: #ffffff;
            --accent-red: ${currentWish.primaryColor || '#d30f0f'};
            --text-dark: #111111;
            --text-muted: #5e5a52;
        }
        body {
            background-color: var(--bg-primary);
            color: var(--text-dark);
        }
    </style>
</head>
<body class="overflow-x-hidden">
    <div id="root"></div>

    <!-- Inject custom wish configuration -->
    <script>
        window.__WISHER_DATA__ = ${JSON.stringify(currentWish)};
    </script>

    <!-- React Runtime and Bundle redirection -->
    <script>
        // Redirect standalone page instantly to display customized templates
        const liveUrl = "${window.location.origin}/wish/" + "${deployedId}";
        document.body.innerHTML = \`
            <div class="min-h-screen flex flex-col justify-center items-center p-6 text-center font-sans bg-white">
                <div class="max-w-md bg-white p-8 rounded-3xl shadow-lg border border-[#e5dfd3]">
                    <div class="h-12 w-12 rounded-full bg-red-100 text-[#d30f0f] flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                        </svg>
                    </div>
                    <h2 class="text-xl font-black text-gray-900 mb-2">Standalone Wish Package</h2>
                    <p class="text-xs text-[#5e5a52] leading-relaxed mb-6">
                        This bundle redirects you to the live interactive 3D wish canvas with fully synchronized audio engines.
                    </p>
                    <a href="\${liveUrl}" class="inline-flex w-full items-center justify-center rounded-xl bg-[#d30f0f] py-3 text-xs font-bold text-white shadow-md hover:bg-red-700">
                        Launch Experience
                    </a>
                </div>
            </div>
        \`;
        window.location.replace(liveUrl);
    </script>
</body>
</html>`;

      // Save raw files inside zip
      zip.file("index.html", autonomousHtml);
      zip.file("wisher.config.json", JSON.stringify(currentWish, null, 2));
      zip.file("README.txt", `WISHER STANDALONE BUNDLE
========================

Thank you for choosing Wisher!

Inside this archive:
1. index.html - Portable deployment launcher. Upload this file to any static host (like Netlify, GitHub Pages, or Vercel).
2. wisher.config.json - Raw JSON layout parameter definitions.

Once uploaded to web servers, anyone visiting index.html will instantly launch the 3D animated experience for "${currentWish.title}".`);

      const content = await zip.generateAsync({ type: "blob" });
      const element = document.createElement("a");
      element.href = URL.createObjectURL(content);
      element.download = `${currentWish.targetName.toLowerCase().replace(/\s+/g, '-')}-wish-bundle.zip`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error("ZIP Generation failed:", error);
    } finally {
      setZipLoading(false);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-white text-[#111111] flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-medium border border-[#e5dfd3] p-8 relative overflow-hidden">
        {/* Border glow styling when finished */}
        {deployedId && (
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#d30f0f] animate-pulse"></div>
        )}

        {/* 1. COMPILING TERMINAL STATE */}
        {!deployedId ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-white">
                <Terminal className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <h2 className="font-display text-base font-black text-[#111111]">
                  Deploying to Edge Node CDN
                </h2>
                <span className="text-[10px] text-[#5e5a52] font-semibold uppercase tracking-wider block">
                  Processing custom parameters
                </span>
              </div>
            </div>

            {/* Progress track */}
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden mb-6 border border-[#e5dfd3]">
              <div
                className="h-full bg-[#d30f0f] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Terminal output console */}
            <div className="bg-[#111111] rounded-2xl p-5 h-64 font-mono text-[10px] text-green-400 overflow-y-auto leading-relaxed shadow-inner border border-white/5 flex flex-col justify-start">
              {logs.map((log, idx) => (
                <div key={idx} className="whitespace-pre-wrap">
                  {log}
                </div>
              ))}
              <div ref={terminalEndRef}></div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-[#5e5a52] text-[10px] font-semibold bg-[#fdfdfb] p-3 rounded-xl border border-[#e5dfd3]">
              <AlertCircle className="h-4 w-4 shrink-0 text-[#d30f0f]" />
              Do not close this page. Edge server structures are finalizing configurations.
            </div>
          </div>
        ) : (
          /* 2. SUCCESSFUL DEPLOYMENT VIEW */
          <div className="text-center animate-fade-in">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
              <Check className="h-8 w-8 stroke-[3]" />
            </div>

            <h1 className="font-display text-2xl font-black text-[#111111] mb-1">
              Deployment Live!
            </h1>
            <p className="text-xs text-[#5e5a52] font-semibold mb-8">
              Your customized 3D experience is now online and ready to share.
            </p>

            {/* Short link box */}
            <div className="flex items-center gap-2 bg-neutral-50 p-3.5 rounded-2xl border border-[#e5dfd3] mb-6">
              <input
                type="text"
                readOnly
                value={liveLink}
                className="w-full bg-transparent border-none text-xs font-bold text-[#111111] select-all focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all cursor-pointer ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-[#111111] text-white hover:bg-[#d30f0f]'
                }`}
                title="Copy Live Link"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            {/* Action options */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Toggle QR Code */}
              <button
                onClick={() => setShowQR(!showQR)}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#111111] py-3 text-xs font-bold text-[#111111] hover:bg-[#111111] hover:text-white transition-all cursor-pointer"
              >
                <QrCode className="h-4 w-4" /> QR Code
              </button>

              {/* ZIP Exporter */}
              <button
                onClick={handleDownloadZip}
                disabled={zipLoading}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#d30f0f] py-3 text-xs font-bold text-white hover:bg-[#b00c0c] transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                <Download className="h-4 w-4" /> {zipLoading ? "Zipping..." : "Export ZIP"}
              </button>
            </div>

            {/* QR Code Container overlay panel */}
            {showQR && (
              <div className="flex flex-col items-center bg-[#fdfdfb] p-6 rounded-2xl border border-[#e5dfd3] mb-8 animate-slide-down">
                <QRCodeSVG value={liveLink} size={150} fgColor="#111111" bgColor="#fdfdfb" />
                <span className="text-[10px] text-[#5e5a52] uppercase font-bold tracking-wider mt-3">
                  Scan to launch on mobile
                </span>
              </div>
            )}

            {/* Secondary operations buttons */}
            <div className="flex justify-center gap-6 border-t border-[#e5dfd3] pt-6">
              <button
                onClick={() => navigate(`/customizer?template=${currentWish.templateType}`)}
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#5e5a52] hover:text-[#111111] cursor-pointer"
              >
                <Edit2 className="h-3.5 w-3.5" /> Edit Wish
              </button>
              <a
                href={liveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#d30f0f] hover:text-[#b00c0c] cursor-pointer"
              >
                <Play className="h-3.5 w-3.5" /> Open Website
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Deployer;
