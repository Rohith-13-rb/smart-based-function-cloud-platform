export const SERVERLESS_CONCEPTS = [
  {
    id: 'cold-vs-warm',
    title: 'Cold Starts vs Warm Starts',
    category: 'Runtime Performance',
    tag: 'Latency Optimization',
    color: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/20',
    summary: 'A cold start occurs when an invocation arrives but no idle execution container exists. The cloud provider must spin up a new microVM, download user code, initialize the runtime, and execute top-level imports.',
    keyPoints: [
      'Cold Start Latency = MicroVM Boot (~50-200ms) + Language Runtime Init (~50-500ms) + User Init Code.',
      'Compiled languages (Go, Rust WASM) exhibit 5x - 10x faster cold starts than managed JVM / heavy Python environments.',
      'Warm Start skips provisioning entirely, taking under 2-10ms to invoke pre-initialized in-memory instances.',
      'Mitigation techniques: Provisioned Concurrency, keep-warm cron pingers, bundle size minification, lazy loading libraries.'
    ],
    benchmarkComparison: {
      rust: { cold: '25 ms', warm: '2 ms', memory: '32 MB' },
      go: { cold: '65 ms', warm: '4 ms', memory: '64 MB' },
      nodejs: { cold: '180 ms', warm: '6 ms', memory: '128 MB' },
      python: { cold: '240 ms', warm: '8 ms', memory: '128 MB' },
      java: { cold: '950 ms', warm: '15 ms', memory: '512 MB' }
    }
  },
  {
    id: 'auto-scaling-concurrency',
    title: 'Scale-to-Zero & Horizontal Auto-Scaling',
    category: 'Elasticity & Cost',
    tag: 'Elastic Cloud',
    color: 'border-purple-500/30 text-purple-400 bg-purple-950/20',
    summary: 'Unlike traditional VM clusters or Kubernetes nodes with fixed baseline costs, serverless scales horizontally per incoming request and scales all the way to 0 when idle.',
    keyPoints: [
      'True Pay-per-Use: $0 cost when 0 traffic arrives, zero idle server wastage.',
      'Scale velocity: Can spin up from 0 to 3,000 concurrent instances in under 60 seconds.',
      'Concurrency formula: Concurrent Executions = (Invocations per second) × (Average Execution Duration in seconds).',
      'Throttling: Guardrails prevent runaway billing loops (e.g. infinite recursion, DDOS).'
    ]
  },
  {
    id: 'statelessness-idempotency',
    title: 'Statelessness & Idempotency',
    category: 'Architecture Patterns',
    tag: 'Fault Tolerance',
    color: 'border-pink-500/30 text-pink-400 bg-pink-950/20',
    summary: 'Serverless functions must remain purely stateless. Any local memory or /tmp storage is ephemeral and may be destroyed at any moment by the cloud hypervisor.',
    keyPoints: [
      'External State: Store user sessions, locks, and cache in Redis, DynamoDB, or S3.',
      'Idempotency Keys: Because distributed cloud event buses promise at-least-once delivery, webhooks must be deduplicated using unique IDs.',
      'Side Effects: Never assume container re-use for persistent state or database connection pools without proper pooling (e.g. AWS RDS Proxy).'
    ]
  },
  {
    id: 'event-driven-architecture',
    title: 'Event-Driven vs Traditional Polling',
    category: 'Distributed Systems',
    tag: 'Cloud Native',
    color: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20',
    summary: 'Traditional systems continuously poll databases or message queues, burning CPU cycles 24/7. Event-driven architectures invoke functions reactively upon event dispatch.',
    keyPoints: [
      'Decoupled Producers & Consumers: Services communicate via events without knowing downstream listeners.',
      'Push over Pull: Cloud providers push messages into function sandboxes directly, minimizing idle overhead.',
      'Dead Letter Queues (DLQ): Failed event retries are captured automatically for replay and audit.'
    ]
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is a 'Cold Start' in a serverless cloud computing environment?",
    options: [
      "When a server room drops below normal operating temperatures.",
      "The latency delay incurred when provisioning a new microVM container and initializing the runtime for a function that has no warm instances.",
      "A failed function execution caused by invalid JSON payloads.",
      "The scheduled shutdown of unused database connection pools."
    ],
    correctAnswer: 1,
    explanation: "A cold start occurs when an invocation arrives and no pre-warmed container is idle. The platform must provision a microVM (like Firecracker), download code, start the runtime environment, and execute initialization code."
  },
  {
    id: 2,
    question: "How is serverless function execution billed across major cloud providers (AWS/GCP/Azure)?",
    options: [
      "Fixed monthly fee per deployed function regardless of usage.",
      "Based strictly on number of lines of source code.",
      "Based on total invocation count + GB-seconds (allocated memory in GB multiplied by execution duration in milliseconds).",
      "Hourly virtual CPU rental price fixed for 24-hour intervals."
    ],
    correctAnswer: 2,
    explanation: "Serverless pricing uses a pay-as-you-go model combining the number of invocations and GB-seconds (Allocated Memory × Execution Duration rounded to nearest millisecond)."
  },
  {
    id: 3,
    question: "If a cloud function receives 500 requests per second and each execution takes an average of 200 ms (0.2s), how many concurrent instances are running?",
    options: [
      "50 concurrent instances",
      "100 concurrent instances",
      "500 concurrent instances",
      "2,500 concurrent instances"
    ],
    correctAnswer: 1,
    explanation: "Using Little's Law for serverless concurrency: Concurrency = (Requests per Second) × (Average Duration in Seconds) = 500 × 0.2s = 100 concurrent instances."
  },
  {
    id: 4,
    question: "Which programming language generally exhibits the lowest cold-start latency in serverless runtimes?",
    options: [
      "Java / JVM (with heavy Spring Boot frameworks)",
      "Rust (compiled native binary or WebAssembly)",
      "Python with large machine learning wheels (PyTorch, TensorFlow)",
      "Ruby on Rails"
    ],
    correctAnswer: 1,
    explanation: "Compiled native binaries like Rust or Go without heavy runtime interpreters bootstrap in 5-30ms, whereas JVM or large Python packages can take several hundred milliseconds to seconds."
  },
  {
    id: 5,
    question: "Why is 'Idempotency' critical in serverless event-driven systems?",
    options: [
      "Because cloud functions can never be scaled beyond 1 instance.",
      "Because event buses operate on 'at-least-once' delivery guarantees, meaning identical events might be delivered multiple times during network retries.",
      "To prevent functions from consuming any RAM.",
      "Because functions can only run synchronous HTTP GET requests."
    ],
    correctAnswer: 1,
    explanation: "Cloud message brokers (SQS, EventBridge, PubSub) guarantee at-least-once delivery. Idempotency guarantees that processing duplicate event messages produces the exact same state without double charges or duplicate records."
  },
  {
    id: 6,
    question: "What is 'Provisioned Concurrency' used for in modern serverless platforms?",
    options: [
      "To keep a designated number of initialized execution sandboxes warm 24/7 to eliminate cold starts for latency-sensitive workloads.",
      "To convert a serverless function into a permanent monolithic Kubernetes cluster.",
      "To restrict a function so it can only run on weekends.",
      "To encrypt network traffic passing between users and the API Gateway."
    ],
    correctAnswer: 0,
    explanation: "Provisioned Concurrency pre-allocates execution containers and keeps runtimes initialized, guaranteeing double-digit sub-millisecond response times with zero cold start spikes."
  }
];
