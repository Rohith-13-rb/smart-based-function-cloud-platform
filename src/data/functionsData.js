export const CLOUD_FUNCTIONS = [
  {
    id: 'fn-sentiment-ai',
    name: 'NLP Sentiment Analyzer',
    category: 'AI & Machine Learning',
    domain: 'ai_ml',
    runtime: 'Python 3.11',
    description: 'Processes unstructured textual streams and extracts emotional polarity, confidence scores, and entity keywords using lightweight DistilBERT embeddings.',
    memoryMb: 512,
    timeoutSec: 10,
    coldStartMs: 380,
    warmExecutionMs: 65,
    cpuShares: '0.5 vCPU',
    triggerType: 'HTTP / API Gateway',
    complexity: 'Medium',
    defaultPayload: {
      text: "Our team deployed the new microservices architecture today and latency dropped by 45%! The automated scaling is fantastic.",
      detect_entities: true,
      language: "en-US",
      output_format: "detailed"
    },
    codeSnippet: `import json
import time

def lambda_handler(event, context):
    body = event.get('text', '')
    # Simulated NLP DistilBERT inference
    tokens = len(body.split())
    sentiment = "POSITIVE" if "fantastic" in body.lower() or "great" in body.lower() else "NEUTRAL"
    confidence = 0.942
    
    return {
        'statusCode': 200,
        'body': {
            'sentiment': sentiment,
            'confidence': confidence,
            'tokens_analyzed': tokens,
            'processing_time_ms': 64.2
        }
    }`,
    mockResult: {
      sentiment: "POSITIVE",
      polarity_score: 0.89,
      confidence: 0.942,
      tokens_analyzed: 17,
      entities: ["microservices architecture", "latency", "automated scaling"],
      model_version: "v2.4-distilbert-quantized"
    },
    tags: ['NLP', 'AI', 'Python', 'Fast Inference']
  },
  {
    id: 'fn-image-thumbnailer',
    name: 'Smart Image Resizer & Optimizer',
    category: 'Media Processing',
    domain: 'image_video',
    runtime: 'Node.js 20.x',
    description: 'Dynamic edge media transformation. Scales high-res images, strips EXIF metadata, converts to WebP/AVIF format with smart bilinear quantization.',
    memoryMb: 1024,
    timeoutSec: 15,
    coldStartMs: 240,
    warmExecutionMs: 110,
    cpuShares: '1.0 vCPU',
    triggerType: 'S3 / Cloud Storage Event',
    complexity: 'High',
    defaultPayload: {
      source_bucket: "prod-media-assets",
      object_key: "hero-showcase-4k.png",
      target_dimensions: { width: 800, height: 600 },
      target_format: "webp",
      quality: 85,
      strip_metadata: true
    },
    codeSnippet: `import sharp from 'sharp';

export const handler = async (event) => {
    const { object_key, target_dimensions, target_format } = event;
    // Simulated image stream transform
    const originalBytes = 3450000; // ~3.45 MB
    const compressedBytes = 184200; // ~184 KB
    
    return {
        status: 'SUCCESS',
        transformedKey: \`thumbnails/\${object_key}.\${target_format}\`,
        dimensions: target_dimensions,
        compressionRatio: '94.6%',
        bandwidthSaved: '3.26MB'
    };
};`,
    mockResult: {
      status: "SUCCESS",
      transformed_url: "https://cdn.cloudplatform.internal/thumbnails/hero-showcase-4k.webp",
      original_size_kb: 3450,
      optimized_size_kb: 184.2,
      compression_ratio: "94.66%",
      color_profile: "sRGB",
      dimensions: "800x600 px"
    },
    tags: ['Media', 'NodeJS', 'Sharp', 'Edge CDN']
  },
  {
    id: 'fn-iot-telemetry',
    name: 'IoT Telemetry Stream Anomaly Detector',
    category: 'Data & Stream Processing',
    domain: 'iot_stream',
    runtime: 'Go 1.22',
    description: 'High-throughput stream parser. Validates real-time sensor metrics (temperature, vibration, pressure) and triggers threshold alerts using sliding window Z-score.',
    memoryMb: 256,
    timeoutSec: 5,
    coldStartMs: 95,
    warmExecutionMs: 18,
    cpuShares: '0.25 vCPU',
    triggerType: 'Kafka / Kinesis Event Stream',
    complexity: 'Medium',
    defaultPayload: {
      device_id: "TURBINE-SENSOR-X9",
      timestamp: Date.now(),
      metrics: {
        rpm: 3450,
        temperature_c: 84.5,
        vibration_hz: 42.1,
        pressure_psi: 120.4
      },
      sliding_window_records: 64
    },
    codeSnippet: `package main

import (
    "context"
    "math"
)

type TelemetryPayload struct {
    DeviceID string \`json:"device_id"\`
    Metrics  map[string]float64 \`json:"metrics"\`
}

func HandleRequest(ctx context.Context, payload TelemetryPayload) (map[string]interface{}, error) {
    // Ultra-low latency anomaly detection in Go
    isAnomaly := payload.Metrics["temperature_c"] > 80.0
    return map[string]interface{}{
        "device_id": payload.DeviceID,
        "anomaly_flag": isAnomaly,
        "severity": "HIGH",
        "action": "TRIGGER_COOLING_CYCLE",
    }, nil
}`,
    mockResult: {
      status: "ALERT_GENERATED",
      device_id: "TURBINE-SENSOR-X9",
      anomaly_detected: true,
      anomaly_feature: "temperature_c (84.5°C > threshold 80.0°C)",
      z_score: 3.42,
      recommended_action: "AUTO_THROTTLE_ROTOR_AND_DISPATCH_ALERT"
    },
    tags: ['IoT', 'Go', 'Stream', 'Low Latency']
  },
  {
    id: 'fn-pdf-generator',
    name: 'PDF Invoice & Report Generator',
    category: 'Document Automation',
    domain: 'document_gen',
    runtime: 'Node.js 20.x',
    description: 'Serverless document rendering engine using headless Chromium canvas. Compiles dynamic HTML/CSS templates into cryptographic signed PDF invoices.',
    memoryMb: 1536,
    timeoutSec: 30,
    coldStartMs: 520,
    warmExecutionMs: 180,
    cpuShares: '1.5 vCPU',
    triggerType: 'SQS Queue / Async Event',
    complexity: 'High',
    defaultPayload: {
      invoice_number: "INV-2026-0982",
      customer_id: "CUST-GLOBAL-77",
      billing_period: "September 2026",
      items: [
        { desc: "Cloud Function Invocations (Tier 1)", qty: 2500000, price: 0.50 },
        { desc: "Dedicated Egress Network Transfer", qty: 120, price: 9.60 },
        { desc: "Cold-Start Provisioned Warm Instances", qty: 5, price: 15.00 }
      ],
      tax_rate: 0.18,
      currency: "USD"
    },
    codeSnippet: `import puppeteer from 'puppeteer-core';

export async function generateInvoice(event) {
    const { invoice_number, items, tax_rate } = event;
    const subtotal = items.reduce((acc, it) => acc + it.price, 0);
    const total = subtotal * (1 + tax_rate);
    
    return {
        status: 'RENDERED',
        file_name: \`invoice_\${invoice_number}.pdf\`,
        pages: 2,
        render_engine: 'Chromium-Blink-Serverless',
        checksum: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    };
}`,
    mockResult: {
      status: "RENDERED",
      file_name: "invoice_INV-2026-0982.pdf",
      file_size_kb: 412.8,
      total_amount: "$25.10",
      pdf_version: "PDF/A-3b Archival",
      crypto_signature: "ECDSA-SHA384:Valid",
      download_token: "tok_sec_99a81f3d"
    },
    tags: ['PDF', 'Document', 'Chromium', 'Async Worker']
  },
  {
    id: 'fn-auth-token',
    name: 'Zero-Trust JWT Token Validator',
    category: 'Security & Auth',
    domain: 'security_auth',
    runtime: 'Rust / WASM',
    description: 'Ultra-fast edge authorizer. Validates RS256/Ed25519 JWT signatures, evaluates RBAC permissions against cached JWKS, and injects user context headers.',
    memoryMb: 128,
    timeoutSec: 3,
    coldStartMs: 40,
    warmExecutionMs: 8,
    cpuShares: '0.125 vCPU',
    triggerType: 'API Gateway Authorizer',
    complexity: 'Low',
    defaultPayload: {
      auth_header: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.payload.sig",
      required_scope: ["cloud:functions:write", "telemetry:read"],
      ip_address: "192.0.2.145",
      user_agent: "Mozilla/5.0 CloudClient/4.1"
    },
    codeSnippet: `// Rust compiled to WebAssembly (WasmCloud)
use jsonwebtoken::{decode, DecodingKey, Validation, Algorithm};

pub fn authorize_request(token: &str, required_role: &str) -> bool {
    // Sub-millisecond crypto verification
    let validation = Validation::new(Algorithm::RS256);
    // Instant verification via microVM
    true
}`,
    mockResult: {
      is_authorized: true,
      principal_id: "usr_cloud_architect_01",
      tenant_id: "tenant-enterprise-cyber",
      policy_decision: "ALLOW",
      ttl_seconds: 3540,
      latency_overhead_ms: 1.8
    },
    tags: ['Security', 'Rust', 'WASM', 'Zero Trust']
  },
  {
    id: 'fn-data-encryptor',
    name: 'Envelope Encryption & PII Masker',
    category: 'Security & Auth',
    domain: 'security_auth',
    runtime: 'Python 3.11',
    description: 'Sanitizes compliance-critical user payloads using AES-256-GCM envelope encryption. Redacts credit card numbers, SSNs, and email addresses automatically.',
    memoryMb: 512,
    timeoutSec: 5,
    coldStartMs: 190,
    warmExecutionMs: 45,
    cpuShares: '0.5 vCPU',
    triggerType: 'EventBridge / PubSub',
    complexity: 'Medium',
    defaultPayload: {
      customer_record: {
        name: "Alice Johnson",
        ssn: "123-45-6789",
        card: "4532-7590-1234-5678",
        email: "alice.j@enterprise-cloud.io",
        notes: "Requested automatic failover tier."
      },
      masking_mode: "STRICT_GDPR"
    },
    codeSnippet: `from cryptography.fernet import Fernet
import re

def mask_pii_and_encrypt(record):
    sanitized = record.copy()
    sanitized['card'] = '****-****-****-' + record['card'][-4:]
    sanitized['ssn'] = '***-**-' + record['ssn'][-4:]
    return sanitized`,
    mockResult: {
      status: "SANITIZED_AND_ENCRYPTED",
      redacted_fields: ["ssn", "card"],
      cipher_key_id: "arn:aws:kms:us-east-1:1122334455:key/sec-master-01",
      ciphertext_blob: "U2FsdGVkX19q4r5p9L+mQ8a8...",
      compliance_badges: ["GDPR", "HIPAA", "PCI-DSS-L1"]
    },
    tags: ['Security', 'Python', 'KMS', 'Compliance']
  },
  {
    id: 'fn-webhook-relay',
    name: 'Reliable Webhook Relay & Deduplicator',
    category: 'Webhooks & Integrations',
    domain: 'webhook_api',
    runtime: 'Node.js 20.x',
    description: 'High-reliability gateway webhook dispatcher. Guarantees exactly-once semantics via Redis idempotency keys and exponential backoff retry policies.',
    memoryMb: 256,
    timeoutSec: 10,
    coldStartMs: 140,
    warmExecutionMs: 35,
    cpuShares: '0.25 vCPU',
    triggerType: 'HTTP POST Webhook',
    complexity: 'Low',
    defaultPayload: {
      event_type: "order.payment_captured",
      idempotency_key: "idem_9f83a21b",
      destination_url: "https://erp.enterprise.internal/webhooks/orders",
      retry_limit: 5,
      payload_data: {
        order_id: "ORD-99120",
        amount_cents: 14900,
        currency: "USD"
      }
    },
    codeSnippet: `export const handleWebhook = async (req) => {
    const { idempotency_key, destination_url, payload_data } = req;
    // Check key in Redis cache
    // Dispatch with exponential backoff jitter
    return {
        delivery_status: 'DELIVERED',
        http_code: 200,
        attempts: 1
    };
};`,
    mockResult: {
      delivery_status: "DELIVERED",
      http_response_code: 200,
      dispatch_latency_ms: 32.4,
      idempotency_cached: true,
      acknowledgement_id: "ack_881f3d99"
    },
    tags: ['Webhook', 'NodeJS', 'Idempotency', 'Resilience']
  },
  {
    id: 'fn-video-transcode',
    name: 'HLS Video Chunk Transcoder',
    category: 'Media Processing',
    domain: 'image_video',
    runtime: 'Python / FFmpeg',
    description: 'Slices and encodes 10-second video segments into multi-bitrate HLS (1080p, 720p, 480p) streams with VP9/H.264 hardware acceleration.',
    memoryMb: 3072,
    timeoutSec: 60,
    coldStartMs: 820,
    warmExecutionMs: 420,
    cpuShares: '2.0 vCPU',
    triggerType: 'Cloud Storage Multipart Event',
    complexity: 'High',
    defaultPayload: {
      source_video_chunk: "s3://raw-streams/gameplay_segment_042.ts",
      target_codecs: ["H.264", "AV1"],
      ladder: [
        { label: "1080p60", bitrate_kbps: 4500 },
        { label: "720p30", bitrate_kbps: 2200 },
        { label: "480p30", bitrate_kbps: 900 }
      ],
      generate_vtt_thumbnails: true
    },
    codeSnippet: `import subprocess

def process_video_chunk(event):
    chunk_uri = event['source_video_chunk']
    # FFmpeg multi-stream pipeline
    return {
        'status': 'TRANSCODED',
        'variants': 3,
        'manifest': 'stream_master.m3u8'
    }`,
    mockResult: {
      status: "TRANSCODED",
      master_playlist: "https://media.cloud.internal/hls/segment_042/master.m3u8",
      renditions_generated: 3,
      transcode_speed_ratio: "4.2x realtime",
      total_frames: 600,
      vtt_spritesheet: "sprites_042.webp"
    },
    tags: ['Video', 'FFmpeg', 'HLS', 'Compute Heavy']
  }
];

export const WORKLOAD_DOMAINS = [
  { id: 'all', name: 'All Domains', icon: 'Sparkles', color: 'text-cyan-400' },
  { id: 'ai_ml', name: 'AI & Machine Learning', icon: 'BrainCircuit', color: 'text-purple-400' },
  { id: 'image_video', name: 'Media & Video Processing', icon: 'Video', color: 'text-pink-400' },
  { id: 'iot_stream', name: 'IoT & Telemetry Streams', icon: 'Activity', color: 'text-emerald-400' },
  { id: 'document_gen', name: 'Document Automation', icon: 'FileText', color: 'text-amber-400' },
  { id: 'security_auth', name: 'Security & Zero-Trust', icon: 'ShieldCheck', color: 'text-indigo-400' },
  { id: 'webhook_api', name: 'Webhooks & Integrations', icon: 'Webhook', color: 'text-blue-400' },
];

export const RUNTIME_COLORS = {
  'Python 3.11': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Node.js 20.x': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'Go 1.22': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'Rust / WASM': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'Python / FFmpeg': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
};
