export const ARCHITECTURE_LAYERS = [
  {
    id: 'layer-triggers',
    title: '1. Event & Ingestion Layer',
    subtitle: 'Event Sources & Trigger Mesh',
    badge: 'Ingress Mesh',
    color: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/30',
    description: 'Captures and authenticates incoming client traffic from diverse asynchronous event sources and synchronous HTTP invocations.',
    components: [
      {
        name: 'API Gateway & Edge Router',
        type: 'Reverse Proxy / Envoy',
        latency: '2 - 5 ms',
        details: 'Handles TLS termination, SSL offloading, rate-limiting (token bucket algorithm), request validation, and CORS preflight routing.'
      },
      {
        name: 'Event Bridge & Cloud Storage Bus',
        type: 'Pub/Sub Broker',
        latency: '10 - 25 ms',
        details: 'Subscribes to object lifecycle events (S3 PUT/DELETE), IoT MQTT message queues, Kafka topics, and cron schedule triggers.'
      },
      {
        name: 'Authentication & IAM Authorizer',
        type: 'Zero-Trust Gatekeeper',
        latency: '1 - 3 ms',
        details: 'Validates JWT tokens, API keys, IAM STS role credentials, and tenant isolation policies prior to function dispatch.'
      }
    ]
  },
  {
    id: 'layer-control',
    title: '2. Smart Control Plane & Scheduler',
    subtitle: 'Intelligent Workload Orchestrator',
    badge: 'Control Plane',
    color: 'border-purple-500/40 text-purple-400 bg-purple-950/30',
    description: 'The brain of the platform. Evaluates resource telemetry, function concurrency limits, and warm instance availability to make instant routing decisions.',
    components: [
      {
        name: 'Smart Function Matcher & Dispatcher',
        type: 'Placement Engine',
        latency: '0.8 - 2 ms',
        details: 'Matches incoming invocations to the closest warm sandbox container across active worker nodes. If none exists, dispatches a cold-start provision request.'
      },
      {
        name: 'Auto-Scaler & Concurrency Manager',
        type: 'Predictive Scaler',
        latency: 'Continuous',
        details: 'Monitors queue backpressure and request arrival velocity. Dynamically scales microVM worker pools from 0 to thousands of instances.'
      },
      {
        name: 'Warm Pool Keep-Alive Manager',
        type: 'Lifecycle Controller',
        latency: 'Async',
        details: 'Manages container idle timeouts (typically 5 to 15 minutes) and proactive provisioned concurrency to eliminate cold start penalties.'
      }
    ]
  },
  {
    id: 'layer-execution',
    title: '3. Data Plane & Execution Engine',
    subtitle: 'MicroVM Sandbox Isolation (Firecracker / gVisor)',
    badge: 'Execution Sandbox',
    color: 'border-pink-500/40 text-pink-400 bg-pink-950/30',
    description: 'Secure, multi-tenant execution environment running lightweight virtual machines with sub-5ms hypervisor spin-up times.',
    components: [
      {
        name: 'Firecracker MicroVM / gVisor Sandbox',
        type: 'KVM-based Virtual Machine',
        latency: '5 - 50 ms (Boot)',
        details: 'Hardware-isolated sandbox with minimal kernel footprint (5MB memory overhead). Prevents cross-tenant memory snooping and kernel privilege escalation.'
      },
      {
        name: 'Polyglot Runtime Executors',
        type: 'Node / Python / Go / Rust WASM',
        latency: '1 - 500 ms (Run)',
        details: 'Pre-warmed runtime bootstraps executing customer handlers, capturing stdout/stderr streams, memory peaks, and context cancellations.'
      },
      {
        name: 'Ephemeral Ephemeral NVMe Cache',
        type: '/tmp Scratch Space (512MB - 10GB)',
        latency: '< 0.5 ms',
        details: 'High-speed scratch storage mounted strictly for the duration of the execution lifecycle, securely wiped upon container destruction.'
      }
    ]
  },
  {
    id: 'layer-observability',
    title: '4. Observability, Telemetry & Billing',
    subtitle: 'Real-time Metrics & Distributed Tracing',
    badge: 'Telemetry & FinOps',
    color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30',
    description: 'High-speed ingestion pipeline for distributed trace spans, real-time memory profiling, and sub-millisecond cost metering.',
    components: [
      {
        name: 'OpenTelemetry Span Collector',
        type: 'Distributed Tracing',
        latency: 'Non-blocking Async',
        details: 'Generates unique TraceIDs for every invocation, tracking duration across API Gateway, Scheduler, MicroVM Boot, and User Code execution.'
      },
      {
        name: 'Sub-Millisecond Billing Meter',
        type: 'FinOps Engine',
        latency: '< 1 ms',
        details: 'Calculates exact billing units in GB-seconds (Allocated Memory × Billed Duration rounded to 1ms increments) with multi-cloud cost modeling.'
      },
      {
        name: 'Structured Log Streamer',
        type: 'Log Forwarder / WebSocket',
        latency: 'Real-time Push',
        details: 'Pushes JSON-formatted runtime stdout, unhandled exceptions, and memory utilization watermarks directly to the developer console.'
      }
    ]
  }
];

export const PIPELINE_STAGES = [
  { id: 1, name: 'Trigger Arrival & Auth', icon: 'ShieldCheck', color: 'from-cyan-500 to-blue-600', description: 'API Gateway / Event Mesh receives request, validates signature and rate limits.' },
  { id: 2, name: 'Scheduler & Cold/Warm Check', icon: 'Cpu', color: 'from-blue-600 to-purple-600', description: 'Checks instance pool; detects Warm Instance or triggers Cold MicroVM Provisioning.' },
  { id: 3, name: 'Sandbox Resource Binding', icon: 'Box', color: 'from-purple-600 to-pink-600', description: 'Attaches vCPU, memory limits, environment variables, and /tmp storage volume.' },
  { id: 4, name: 'Handler Execution & Streaming', icon: 'Play', color: 'from-pink-600 to-rose-500', description: 'Runs user handler, processes payload, streams stdout/stderr telemetry logs.' },
  { id: 5, name: 'Result Serialization', icon: 'FileCheck', color: 'from-rose-500 to-amber-500', description: 'Encodes JSON response, measures execution duration, captures exit status.' },
  { id: 6, name: 'Telemetry & Billing Emission', icon: 'Receipt', color: 'from-amber-500 to-emerald-500', description: 'Records trace metrics, computes exact GB-seconds, syncs execution history.' },
];
