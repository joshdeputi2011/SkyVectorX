import { Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-cyan-500/10 bg-[#0a0a0f]/80 backdrop-blur-sm py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h4 className="mb-3">SkyVectorX</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Flight route visualization and aircraft performance simulation platform for 
              educational and research purposes.
            </p>
          </div>

          {/* Data Sources */}
          <div>
            <h4 className="mb-3">Data Sources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>OpenStreetMap Contributors</li>
              <li>Aviation Performance Databases</li>
              <li>Geographic Information Systems</li>
              <li>Public Aircraft Specifications</li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="mb-3">Disclaimer</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              For educational and demonstration purposes only. Not for actual flight planning.
              Always consult official aviation resources.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-cyan-500/10 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            © 2026 SkyVectorX. Built for aviation enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
}