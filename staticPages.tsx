
import React from 'react';
import { ViewType } from './types';

interface StaticPageProps {
  view: ViewType;
  onBack: () => void;
}

export const StaticPage: React.FC<StaticPageProps> = ({ view, onBack }) => {
  const pageData = {
    privacy: {
      title: "Privacy Policy",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-2">1. Information Collection</h3>
            <p>We respect your privacy. HTML VIEWR ONLINE is a client-side application. Your code projects are stored exclusively in your browser's local storage.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-2">2. Usage Data</h3>
            <p>We do not collect or transmit your personal data to external servers. Any interactions with APIs are handled securely via environment variables or local processing.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-2">3. Cookies</h3>
            <p>We use local storage strictly for functional purposes: saving your current workspace so you don't lose progress.</p>
          </section>
        </div>
      )
    },
    terms: {
      title: "Terms and Conditions",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-2">1. Use of Service</h3>
            <p>By using HTML VIEWR ONLINE, you agree to use the tool for lawful purposes only. You are responsible for the code you write and execute.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-2">2. Intellectual Property</h3>
            <p>The code you create using this editor remains your property. We claim no ownership over the HTML, CSS, or JS you write here.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-2">3. Termination</h3>
            <p>We reserve the right to modify or discontinue the service at any time without notice.</p>
          </section>
        </div>
      )
    },
    disclaimer: {
      title: "Disclaimer",
      content: (
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-bold text-blue-400 mb-2">Notice</h3>
            <p>HTML VIEWR ONLINE is provided "as is" without any warranties. We are not liable for any data loss, security breaches in your code, or damages resulting from the use of this tool.</p>
          </section>
          <section>
            <p>The preview window executes code in a sandboxed environment, but caution is always advised when running scripts from unknown sources.</p>
          </section>
        </div>
      )
    },
    contact: {
      title: "Contact Us",
      content: (
        <div className="space-y-8">
          <p className="text-lg">Need help or have feedback? Reach out to our team.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1c1f2e] p-6 rounded-xl border border-gray-800">
              <i className="fas fa-envelope text-blue-500 text-3xl mb-4"></i>
              <h4 className="font-bold text-white text-lg">Email Support</h4>
              <p className="text-gray-400">support@htmlvieweronline.com</p>
            </div>
            <div className="bg-[#1c1f2e] p-6 rounded-xl border border-gray-800">
              <i className="fab fa-github text-white text-3xl mb-4"></i>
              <h4 className="font-bold text-white text-lg">GitHub</h4>
              <p className="text-gray-400">github.com/htmlvieweronline</p>
            </div>
          </div>
          <form className="space-y-4 max-w-lg" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Your Name</label>
              <input type="text" className="w-full bg-[#11131f] border border-gray-800 rounded-lg p-3 text-white focus:border-blue-500 outline-none" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
              <input type="email" className="w-full bg-[#11131f] border border-gray-800 rounded-lg p-3 text-white focus:border-blue-500 outline-none" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Message</label>
              <textarea className="w-full bg-[#11131f] border border-gray-800 rounded-lg p-3 text-white focus:border-blue-500 outline-none h-32" placeholder="How can we help?"></textarea>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-blue-600/20">
              Send Message
            </button>
          </form>
        </div>
      )
    },
    editor: { title: "", content: null }
  };

  const current = pageData[view];

  return (
    <div className="flex-1 overflow-y-auto bg-[#0f111a] p-6 md:p-12 lg:p-20">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-10 transition-colors font-semibold group"
        >
          <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          Back to Editor
        </button>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8">
          {current.title}
        </h1>
        
        <div className="text-gray-400 text-lg leading-relaxed">
          {current.content}
        </div>
      </div>
    </div>
  );
};
