# SMART-BASED FUNCTION CLOUD PLATFORM ⚡☁️

> **Next-Generation Serverless Function-as-a-Service (FaaS) Orchestration, Real-Time Pipeline Simulation, Resource Monitoring & FinOps Cost Estimation Platform.**

Built as a Computer Science & Engineering (CSE) Capstone Project in Cloud Computing and Distributed Systems.

---

## 🌟 Key Highlights & Capabilities

1. **Intelligent Workload Selector**: Rule-based and AI heuristic matching engine analyzing task domains (AI/NLP, Media, IoT, Security, PDF Rendering), latency bounds, and memory tiers to score and rank optimal serverless functions.
2. **6-Stage Real-Time Execution Pipeline**: Interactive execution studio showing:
   - *Stage 1: Trigger Ingress & IAM Validation*
   - *Stage 2: MicroVM Scheduler & Cold/Warm Container Provisioning*
   - *Stage 3: Cgroups Resource & Ephemeral NVMe Binding*
   - *Stage 4: Polyglot Handler Execution & Live Telemetry Streaming*
   - *Stage 5: Result Serialization & HTTP Packaging*
   - *Stage 6: FinOps Metrics Emission & Audit Trace Recording*
3. **Dynamic Horizontal Auto-Scaling Visualizer**: Real-time simulation of Firecracker microVM instance lifecycle (scale-to-zero, warm pool keep-alive, burst concurrency under surge).
4. **Multi-Cloud FinOps Cost Estimator**: Comprehensive cost modeling comparing AWS Lambda (x86/Graviton), Google Cloud Functions (2nd Gen), and Azure Functions against traditional 24/7 dedicated Virtual Machines.
5. **Interactive Architecture Studio**: 4-tier blueprint of event meshes, microVM hypervisors (Firecracker/gVisor), distributed placement routers, and OpenTelemetry trace spans.
6. **Concept Lab & Knowledge Studio**:
   - Cold Start vs. Warm Start benchmark visualizer
   - Distributed Idempotency and Webhook deduplication simulator
   - Serverless Knowledge Assessment Quiz with interactive scoring and Certificate of Completion generator.

---

## 🚀 Technology Stack

- **Frontend Framework**: React 18 (Hooks, Context API, Modular Components)
- **Bundler & Build Tool**: Vite 5
- **Styling & Theme**: Tailwind CSS (Futuristic Cyberpunk / Cloud Theme with Glassmorphism, Multi-Color Accents, and Ambient Radials)
- **Icons**: Lucide React
- **Deployment**: GitHub Pages via Automated GitHub Actions CI/CD (`.github/workflows/deploy.yml`)

---

## 📂 Project Structure

```
smart-based-function-cloud-platform/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── favicon.svg                 # Futuristic cloud SVG logo
│   └── 404.html                    # SPA refresh redirect handler for GitHub Pages
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Sticky glassmorphic navigation bar
│   │   │   └── Footer.jsx          # CSE academic footer with credits & tech tags
│   │   ├── common/
│   │   │   ├── GlassCard.jsx       # Glassmorphism container with glowing borders
│   │   │   ├── Badge.jsx           # Color-coded cyber tags
│   │   │   ├── MetricCard.jsx      # Telemetry metric cards
│   │   │   ├── Button.jsx          # Reusable gradient & outline buttons
│   │   │   └── Modal.jsx           # Accessible dialog modals
│   │   ├── dashboard/
│   │   │   ├── MetricsOverview.jsx # 6 core cloud telemetry KPIs
│   │   │   ├── InvocationsChart.jsx# Live time-series traffic chart with surge simulator
│   │   │   ├── ActiveFunctionsList.jsx # Deployed microservices catalog
│   │   │   └── RegionalTrafficMap.jsx  # Multi-region edge node status
│   │   ├── execute/
│   │   │   ├── PipelineVisualizer.jsx  # 6-stage animated visual execution pipeline
│   │   │   ├── PayloadEditor.jsx       # JSON event ingress payload editor
│   │   │   └── LogTerminal.jsx         # Live cyber stdout stream & output inspect
│   │   ├── monitor/
│   │   │   ├── ResourceGauges.jsx      # Circular CPU/RAM/Warm Pool utilization gauges
│   │   │   └── AutoScaleVisualizer.jsx # Horizontal MicroVM pod auto-scaler
│   │   ├── architecture/
│   │   │   └── InteractiveArchitecture.jsx # Clickable 4-tier cloud architecture
│   │   └── concepts/
│   │       ├── ColdStartSimulator.jsx  # Language runtime boot waterfall benchmark
│   │       ├── IdempotencyDemo.jsx     # Webhook deduplication simulation
│   │       └── ServerlessQuiz.jsx      # CSE assessment quiz & certificate generator
│   ├── views/
│   │   ├── LandingView.jsx         # Hero showcase and platform overview
│   │   ├── DashboardView.jsx       # Operational metrics dashboard
│   │   ├── SmartSelectorView.jsx   # Intelligent function recommendation engine
│   │   ├── ExecutionView.jsx       # Interactive sandbox execution studio
│   │   ├── MonitorView.jsx         # Resource monitoring and auto-scaling
│   │   ├── HistoryView.jsx         # Audit logs, trace inspector, replay engine
│   │   ├── CostEstimatorView.jsx   # Multi-cloud FinOps calculator
│   │   ├── ArchitectureView.jsx    # MicroVM architecture and isolation specs
│   │   └── ConceptLabView.jsx      # Interactive academic lab modules
│   ├── context/
│   │   └── CloudContext.jsx        # Global state, persistence, and execution dispatch
│   ├── data/
│   │   ├── functionsData.js        # Function catalog, runtimes, and sample payloads
│   │   ├── architectureData.js     # Architecture layers and pipeline definitions
│   │   └── conceptsData.js         # Educational handbook and quiz questions
│   ├── utils/
│   │   ├── costCalculator.js       # AWS / GCP / Azure pricing engine
│   │   ├── smartSelector.js        # Heuristic workload matching engine
│   │   └── executionSimulator.js   # Realistic async pipeline simulation & telemetry
│   ├── App.jsx                     # Top-level view router & background effects
│   ├── main.jsx                    # React DOM entrypoint
│   └── index.css                   # Tailwind directives and custom cyber glowing styles
├── index.html                      # HTML entrypoint
├── package.json                    # Dependencies and scripts
├── postcss.config.js               # PostCSS plugins
├── tailwind.config.js              # Tailwind custom colors & animations
└── vite.config.js                  # Vite configuration with GitHub Pages base path
```

---

## 🛠️ Local Development & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the platform.

### 3. Build for Production
```bash
npm run build
```
Generates a zero-error, optimized production build in the `dist/` folder.

---

## 🌐 GitHub Pages Deployment

The repository is configured with:
- **Vite Base Path**: `base: '/smart-based-function-cloud-platform/'` in `vite.config.js`
- **GitHub Actions Workflow**: `.github/workflows/deploy.yml` triggers on `push` to `main`/`master` and automatically builds and deploys to GitHub Pages.
- **SPA 404 Routing Support**: `public/404.html` ensures client-side routing and page refreshes work smoothly without 404 errors.

---

## 🎓 Academic Relevance

- **Course**: Cloud Computing & Distributed Systems (CSE-702)
- **Topic**: Smart Serverless Function-as-a-Service (FaaS) Architecture
- **Focus Areas**:
  - Virtualization & MicroVM Sandboxing (Firecracker KVM / gVisor)
  - Elastic Horizontal Concurrency & Little's Law
  - Cold Start vs Warm Pool Provisioning Trade-offs
  - Event-Driven vs Polling Distributed Ingestion
  - FinOps Cost Optimization (GB-seconds vs 24/7 VM TCO)
