import React from 'react';
import { CloudProvider, useCloud } from './context/CloudContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingView } from './views/LandingView';
import { DashboardView } from './views/DashboardView';
import { SmartSelectorView } from './views/SmartSelectorView';
import { ExecutionView } from './views/ExecutionView';
import { MonitorView } from './views/MonitorView';
import { HistoryView } from './views/HistoryView';
import { CostEstimatorView } from './views/CostEstimatorView';
import { ArchitectureView } from './views/ArchitectureView';
import { ConceptLabView } from './views/ConceptLabView';

function AppContent() {
  const { activeTab } = useCloud();

  return (
    <div className="min-h-screen bg-[#070B14] bg-cyber-grid text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Background Top Glow Effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-radial-glow pointer-events-none -z-10" />

      {/* Top Sticky Glass Navigation */}
      <Navbar />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {activeTab === 'landing' && <LandingView />}
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'selector' && <SmartSelectorView />}
        {activeTab === 'execute' && <ExecutionView />}
        {activeTab === 'monitor' && <MonitorView />}
        {activeTab === 'history' && <HistoryView />}
        {activeTab === 'pricing' && <CostEstimatorView />}
        {activeTab === 'architecture' && <ArchitectureView />}
        {activeTab === 'concept-lab' && <ConceptLabView />}
      </main>

      {/* College Capstone Project Academic Footer */}
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <CloudProvider>
      <AppContent />
    </CloudProvider>
  );
}

export default App;
