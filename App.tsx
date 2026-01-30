
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { INITIAL_FILES } from './constants';
import { ProjectFiles, FileType, ViewType } from './types';
import { StaticPage } from './staticPages';

// Icons using FontAwesome classes
const SidebarItem = ({ icon, label, active = false, onClick }: { icon: string, label: string, active?: boolean, onClick?: () => void }) => (
  <li 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group ${
      active 
        ? 'bg-blue-600/20 text-blue-400 border-l-4 border-blue-500' 
        : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'
    }`}
  >
    <i className={`fas ${icon} w-5 text-center`}></i>
    <span className="font-medium">{label}</span>
  </li>
);

const EditorView = ({ 
  files, 
  setFiles, 
  activeTab, 
  setActiveTab, 
  generatePreview, 
  handleSave, 
  handleDownload, 
  handleShare, 
  handleCopy, 
  setIsPreviewModalOpen, 
  isAutoRun, 
  setIsAutoRun,
  previewContent,
  previewRef,
  zoom,
  setZoom
}: any) => {
  const handleZoomIn = () => setZoom((prev: number) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev: number) => Math.max(prev - 0.1, 0.25));
  const resetZoom = () => setZoom(1);

  return (
    <>
      {/* Sidebar */}
      <aside className="w-64 bg-[#161925] border-r border-gray-800 p-4 hidden lg:block overflow-y-auto">
        <div className="mb-8">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">Explorer</h3>
          <ul className="space-y-1">
            <SidebarItem icon="fa-html5" label="index.html" active={activeTab === 'html'} onClick={() => setActiveTab('html')} />
            <SidebarItem icon="fa-css3-alt" label="style.css" active={activeTab === 'css'} onClick={() => setActiveTab('css')} />
            <SidebarItem icon="fa-js" label="script.js" active={activeTab === 'javascript'} onClick={() => setActiveTab('javascript')} />
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">Actions</h3>
          <ul className="space-y-1">
            <SidebarItem icon="fa-play" label="Run Code" onClick={() => generatePreview(files)} />
            <SidebarItem icon="fa-desktop" label="Full Preview" onClick={() => setIsPreviewModalOpen(true)} />
            <SidebarItem icon="fa-share-alt" label="Share Project" onClick={handleShare} />
            <SidebarItem icon="fa-file-download" label="Download Code" onClick={handleDownload} />
          </ul>
        </div>

        <div className="mt-auto p-4 bg-blue-600/5 rounded-xl border border-blue-500/10">
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <i className="fas fa-rocket"></i>
            <span className="text-xs font-bold uppercase tracking-wider">Status</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Live Preview is active. Edit code to see changes.
          </p>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#0f111a]">
        
        {/* Editor Column */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-gray-800/50">
          {/* Editor Tabs */}
          <div className="flex items-center justify-between px-4 bg-[#1c1f2e] border-b border-gray-800">
            <div className="flex">
              {(['html', 'css', 'javascript'] as FileType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-semibold transition-all border-b-2 ${
                    activeTab === tab 
                      ? 'text-blue-400 border-blue-500 bg-blue-500/5' 
                      : 'text-gray-500 border-transparent hover:text-gray-300'
                  }`}
                >
                  {tab === 'javascript' ? 'script.js' : `index.${tab}`}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 px-2">
              <button onClick={handleCopy} title="Copy Code" className="p-2 text-gray-500 hover:text-white transition-colors">
                <i className="fas fa-copy"></i>
              </button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 relative overflow-hidden group">
            <textarea
              value={files[activeTab]}
              onChange={(e) => setFiles((prev: any) => ({ ...prev, [activeTab]: e.target.value }))}
              spellCheck={false}
              className="w-full h-full bg-[#11131f] text-gray-300 p-6 code-font outline-none resize-none leading-relaxed text-sm lg:text-base selection:bg-blue-500/30"
              placeholder={`Write your ${activeTab.toUpperCase()} code here...`}
            />
            
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <div className="flex items-center gap-2 bg-[#1c1f2e] border border-gray-700 rounded-lg px-3 py-1.5 shadow-xl">
                <span className="text-[10px] font-bold text-gray-500 uppercase">{activeTab}</span>
              </div>
            </div>
          </div>

          {/* Mobile/Bottom Actions Bar */}
          <div className="p-4 bg-[#161925] border-t border-gray-800 flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start overflow-x-auto">
            <button onClick={() => generatePreview(files)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/10">
              <i className="fas fa-play"></i> RUN CODE
            </button>
            <button onClick={() => setIsPreviewModalOpen(true)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/10">
              <i className="fas fa-desktop"></i> PREVIEW
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 hover:bg-blue-50 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/10">
              <i className="fas fa-save"></i> SAVE
            </button>
            <button onClick={handleShare} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-purple-600/10">
              <i className="fas fa-share-alt"></i> SHARE
            </button>
            <button onClick={handleDownload} className="px-4 py-2 bg-[#2a2e3f] hover:bg-[#363b4f] text-gray-200 rounded-lg text-xs font-bold transition-all flex items-center gap-2">
              <i className="fas fa-download"></i> DOWNLOAD
            </button>
            <div className="flex items-center gap-4 ml-auto px-2">
               <label className="flex items-center gap-2 cursor-pointer group whitespace-nowrap">
                  <input type="checkbox" checked={isAutoRun} onChange={(e) => setIsAutoRun(e.target.checked)} className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900" />
                  <span className="text-[10px] text-gray-500 uppercase font-bold group-hover:text-gray-400">Auto-Run</span>
               </label>
            </div>
          </div>
        </div>

        {/* Preview Column */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-200">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="flex gap-1.5 shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="ml-4 px-3 py-1 bg-white border border-gray-300 rounded text-[11px] font-medium text-gray-400 flex items-center gap-2 truncate max-w-[200px]">
                <i className="fas fa-lock text-[10px]"></i>
                preview.localhost
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex items-center bg-gray-200 rounded-lg p-0.5 mr-2">
                <button onClick={handleZoomOut} title="Zoom Out" className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-white rounded transition-all">
                  <i className="fas fa-search-minus text-xs"></i>
                </button>
                <span onClick={resetZoom} title="Reset Zoom" className="px-2 text-[10px] font-bold text-gray-500 cursor-pointer hover:text-blue-600">
                  {Math.round(zoom * 100)}%
                </span>
                <button onClick={handleZoomIn} title="Zoom In" className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-white rounded transition-all">
                  <i className="fas fa-search-plus text-xs"></i>
                </button>
              </div>
              <button onClick={() => setIsPreviewModalOpen(true)} title="Expand Preview" className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-all">
                <i className="fas fa-expand-alt"></i>
              </button>
              <button onClick={() => generatePreview(files)} title="Refresh" className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-all">
                <i className="fas fa-redo"></i>
              </button>
            </div>
          </div>
          
          <div className="flex-1 bg-white relative overflow-hidden">
            <iframe
              ref={previewRef}
              srcDoc={previewContent}
              title="Preview"
              style={{
                width: `${100 / zoom}%`,
                height: `${100 / zoom}%`,
                transform: `scale(${zoom})`,
                transformOrigin: 'top left',
                border: 'none',
                position: 'absolute',
                top: 0,
                left: 0
              }}
              sandbox="allow-scripts allow-modals allow-forms"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [files, setFiles] = useState<ProjectFiles>(() => {
    const saved = localStorage.getItem('webdev-studio-project');
    return saved ? JSON.parse(saved) : INITIAL_FILES;
  });
  
  const [activeTab, setActiveTab] = useState<FileType>('html');
  const [previewContent, setPreviewContent] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoRun, setIsAutoRun] = useState(true);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const previewRef = useRef<HTMLIFrameElement>(null);

  const generatePreview = useCallback((currentFiles: ProjectFiles) => {
    const combined = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>${currentFiles.css}</style>
        </head>
        <body>
          ${currentFiles.html}
          <script>
            (function() {
              try {
                ${currentFiles.javascript}
              } catch (err) {
                console.error('JS Error:', err);
              }
            })();
          <\/script>
        </body>
      </html>
    `;
    setPreviewContent(combined);
  }, []);

  useEffect(() => {
    if (isAutoRun) {
      const timer = setTimeout(() => generatePreview(files), 500);
      return () => clearTimeout(timer);
    }
  }, [files, isAutoRun, generatePreview]);

  useEffect(() => {
    generatePreview(files);
  }, []);

  const handleSave = () => {
    localStorage.setItem('webdev-studio-project', JSON.stringify(files));
    alert('✨ Project saved successfully!');
  };

  const handleDownload = () => {
    const blob = new Blob([previewContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'html-viewer-project.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    try {
      const state = btoa(JSON.stringify(files));
      const shareUrl = `${window.location.origin}${window.location.pathname}?project=${state}`;
      await navigator.clipboard.writeText(shareUrl);
      alert('🔗 Shareable project link copied to clipboard!');
    } catch (err) {
      alert('Failed to copy share link.');
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(files[activeTab]);
    alert(`${activeTab.toUpperCase()} copied to clipboard!`);
  };

  const NavLink = ({ to, icon, label }: { to: string, icon: string, label: string }) => (
    <Link 
      to={to} 
      className={`whitespace-nowrap transition-colors text-sm font-medium flex items-center gap-2 ${location.pathname === to ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
    >
      <i className={`fas ${icon}`}></i> {label}
    </Link>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#0f111a] overflow-hidden">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between px-6 py-4 bg-[#161925] border-b border-gray-800 shadow-lg z-20">
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <i className="fas fa-code text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
              HTML VIEWR ONLINE
            </h1>
            <p className="text-xs text-gray-500 font-medium">Professional Workspace</p>
          </div>
        </Link>
        
        <nav className="flex items-center gap-4 lg:gap-6 mt-4 md:mt-0 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <NavLink to="/contact" icon="fa-envelope" label="Contact Us" />
          <NavLink to="/privacy" icon="fa-user-shield" label="Privacy Policy" />
          <NavLink to="/disclaimer" icon="fa-exclamation-triangle" label="Disclaimer" />
          <NavLink to="/terms" icon="fa-file-contract" label="Terms" />
          <div className="w-px h-6 bg-gray-800 mx-1 hidden lg:block"></div>
          <button onClick={handleSave} className="whitespace-nowrap px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
            <i className="fas fa-save"></i> Save Project
          </button>
        </nav>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={
            <EditorView 
              files={files} 
              setFiles={setFiles} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              generatePreview={generatePreview}
              handleSave={handleSave}
              handleDownload={handleDownload}
              handleShare={handleShare}
              handleCopy={handleCopy}
              setIsPreviewModalOpen={setIsPreviewModalOpen}
              isAutoRun={isAutoRun}
              setIsAutoRun={setIsAutoRun}
              previewContent={previewContent}
              previewRef={previewRef}
              zoom={zoom}
              setZoom={setZoom}
            />
          } />
          <Route path="/privacy" element={<StaticPage view="privacy" onBack={() => navigate('/')} />} />
          <Route path="/terms" element={<StaticPage view="terms" onBack={() => navigate('/')} />} />
          <Route path="/disclaimer" element={<StaticPage view="disclaimer" onBack={() => navigate('/')} />} />
          <Route path="/contact" element={<StaticPage view="contact" onBack={() => navigate('/')} />} />
        </Routes>
      </main>

      {/* Preview Modal */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsPreviewModalOpen(false)}></div>
          <div className="relative w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <i className="fas fa-desktop text-gray-400"></i>
                <h3 className="font-bold text-gray-700">Large Preview Mode</h3>
              </div>
              <div className="flex items-center gap-3">
                 <button onClick={() => generatePreview(files)} className="text-gray-500 hover:text-blue-600 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium flex items-center gap-2 transition-all">
                   <i className="fas fa-sync-alt"></i> Reload
                 </button>
                 <button onClick={() => setIsPreviewModalOpen(false)} className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all">
                   <i className="fas fa-times"></i>
                 </button>
              </div>
            </div>
            <div className="flex-1">
               <iframe
                srcDoc={previewContent}
                title="Large Preview"
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-modals allow-forms"
              />
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-center">
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">HTML VIEWR ONLINE Sandbox Preview</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Bar */}
      <footer className="px-6 py-4 bg-[#0a0c14] border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 uppercase tracking-tighter gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5">
            <i className="fas fa-circle text-emerald-500 text-[6px]"></i> Ready
          </span>
          <span className="flex items-center gap-1.5">UTF-8</span>
          <div className="w-px h-3 bg-gray-800 mx-2 hidden md:block"></div>
          <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          <Link to="/disclaimer" className="hover:text-gray-300 transition-colors">Disclaimer</Link>
          <Link to="/contact" className="hover:text-gray-300 transition-colors">Contact Us</Link>
        </div>
        <div className="text-center md:text-right">
          HTML VIEWR ONLINE &copy; 2024 • Professional Workspace • All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
