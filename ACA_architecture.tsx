import React, { useState } from 'react';
import { Server, Globe, Lock, Database, Zap, GitBranch, Activity, Box, Network, Shield } from 'lucide-react';

const ACAArchitecture = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const components = {
    environment: {
      title: "Container Apps Environment",
      description: "The foundational boundary that hosts multiple container apps. Provides shared networking, logging, and configuration.",
      icon: Box,
      color: "bg-blue-100 border-blue-400",
      details: [
        "Acts as a secure boundary for related apps",
        "Shared VNet integration and Log Analytics workspace",
        "Common Dapr configuration and components",
        "All apps in the environment can communicate privately"
      ]
    },
    apps: {
      title: "Container Apps",
      description: "Individual microservices or applications deployed within the environment. Each app can have multiple revisions.",
      icon: Server,
      color: "bg-green-100 border-green-400",
      details: [
        "Each app has its own ingress, scaling rules, and secrets",
        "Support for multiple concurrent revisions",
        "Independent scaling from 0 to N replicas",
        "Can be internal (environment-only) or external (internet)"
      ]
    },
    ingress: {
      title: "Ingress Controller",
      description: "Built-in HTTP/HTTPS load balancing with automatic SSL certificates and custom domain support.",
      icon: Globe,
      color: "bg-purple-100 border-purple-400",
      details: [
        "Automatic HTTPS with managed certificates",
        "Traffic splitting between revisions",
        "Custom domains and CORS configuration",
        "Internal or external exposure options"
      ]
    },
    revisions: {
      title: "Revisions",
      description: "Immutable snapshots of your container app configuration. Enable traffic splitting and rollbacks.",
      icon: GitBranch,
      color: "bg-orange-100 border-orange-400",
      details: [
        "Each deployment creates a new revision",
        "Traffic can be split between multiple revisions",
        "Supports blue-green and canary deployments",
        "Instant rollback to previous revisions"
      ]
    },
    scaling: {
      title: "Auto-scaling (KEDA)",
      description: "Kubernetes-based event-driven autoscaling with scale-to-zero capability.",
      icon: Activity,
      color: "bg-yellow-100 border-yellow-400",
      details: [
        "HTTP-based scaling on request count",
        "CPU and memory-based scaling",
        "Custom scalers: Azure Queue, Kafka, Redis, etc.",
        "Scale to zero when idle to save costs"
      ]
    },
    dapr: {
      title: "Dapr Integration",
      description: "Distributed Application Runtime for building resilient, microservice-based applications.",
      icon: Zap,
      color: "bg-pink-100 border-pink-400",
      details: [
        "Service-to-service invocation with mTLS",
        "State management across providers",
        "Pub/sub messaging patterns",
        "Secret management and bindings"
      ]
    },
    vnet: {
      title: "VNet Integration",
      description: "Deploy container apps into an Azure Virtual Network for network isolation and private connectivity.",
      icon: Network,
      color: "bg-indigo-100 border-indigo-400",
      details: [
        "Deploy into custom VNet subnet",
        "Private communication between apps",
        "Access to VNet-connected resources",
        "NSG and UDR support for traffic control"
      ]
    },
    monitoring: {
      title: "Monitoring & Logging",
      description: "Integrated Azure Monitor, Application Insights, and Log Analytics for observability.",
      icon: Database,
      color: "bg-teal-100 border-teal-400",
      details: [
        "Container logs in Log Analytics",
        "Application Insights for distributed tracing",
        "Metrics for scaling decisions and monitoring",
        "Health probes for liveness and readiness"
      ]
    },
    security: {
      title: "Security Features",
      description: "Built-in security with managed identities, secrets, and network policies.",
      icon: Shield,
      color: "bg-red-100 border-red-400",
      details: [
        "Managed identities for Azure resource access",
        "Secret management for sensitive configuration",
        "IP restrictions and authentication",
        "Private container registries support"
      ]
    }
  };

  const examples = [
    {
      title: "E-commerce Microservices",
      apps: [
        { name: "API Gateway", type: "External ingress", scale: "HTTP requests" },
        { name: "Product Service", type: "Internal", scale: "CPU/Memory" },
        { name: "Order Service", type: "Internal", scale: "Queue depth" },
        { name: "Payment Service", type: "Internal", scale: "HTTP requests" },
        { name: "Inventory Worker", type: "Background job", scale: "Queue messages" }
      ],
      features: ["Dapr for service communication", "Shared Redis state store", "Azure Service Bus for events", "VNet for database access"]
    },
    {
      title: "Event-Driven Processing",
      apps: [
        { name: "Upload API", type: "External ingress", scale: "HTTP requests" },
        { name: "File Processor", type: "Background", scale: "Azure Queue" },
        { name: "Notification Service", type: "Internal", scale: "Event Hub" },
        { name: "Admin Dashboard", type: "External ingress", scale: "HTTP requests" }
      ],
      features: ["Scale to zero when idle", "Event Grid triggers", "Cosmos DB state", "Application Insights tracing"]
    },
    {
      title: "Multi-tenant SaaS",
      apps: [
        { name: "Frontend App", type: "External ingress", scale: "HTTP requests" },
        { name: "API Service v1", type: "Internal", scale: "HTTP requests" },
        { name: "API Service v2", type: "Internal", scale: "HTTP requests" },
        { name: "Background Jobs", type: "Internal", scale: "CRON schedule" }
      ],
      features: ["Traffic splitting for v1/v2", "Canary deployments", "Tenant isolation via headers", "Shared PostgreSQL via VNet"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Azure Container Apps Architecture</h1>
          <p className="text-gray-600">Interactive guide to understanding Container Apps environment and components</p>
        </div>

        {/* Architecture Components Grid */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Core Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(components).map(([key, component]) => {
              const Icon = component.icon;
              const isSelected = selectedComponent === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedComponent(isSelected ? null : key)}
                  className={`${component.color} border-2 rounded-lg p-4 text-left transition-all hover:shadow-md ${
                    isSelected ? 'ring-4 ring-blue-300 shadow-lg' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-6 h-6" />
                    <h3 className="font-bold text-gray-800">{component.title}</h3>
                  </div>
                  <p className="text-sm text-gray-700">{component.description}</p>
                </button>
              );
            })}
          </div>

          {/* Selected Component Details */}
          {selectedComponent && (
            <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {components[selectedComponent].title} - Details
              </h3>
              <ul className="space-y-2">
                {components[selectedComponent].details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Architecture Diagram */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Environment Architecture</h2>
          <div className="border-4 border-blue-300 rounded-lg p-6 bg-blue-50">
            <div className="text-center mb-4">
              <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">
                Container Apps Environment
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4 border-2 border-green-400 shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Server className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-gray-800">Container App 1</span>
                </div>
                <div className="text-sm space-y-1">
                  <div className="bg-green-100 px-2 py-1 rounded">Revision A (80%)</div>
                  <div className="bg-green-100 px-2 py-1 rounded">Revision B (20%)</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border-2 border-green-400 shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Server className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-gray-800">Container App 2</span>
                </div>
                <div className="text-sm space-y-1">
                  <div className="bg-green-100 px-2 py-1 rounded">Latest Revision</div>
                  <div className="text-gray-500 text-xs">Scale: 0-10 replicas</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border-2 border-green-400 shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Server className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-gray-800">Container App 3</span>
                </div>
                <div className="text-sm space-y-1">
                  <div className="bg-green-100 px-2 py-1 rounded">Worker Service</div>
                  <div className="text-gray-500 text-xs">Internal only</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              <div className="bg-purple-100 rounded p-3 text-center border border-purple-300">
                <Globe className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                <div className="text-xs font-semibold">Ingress</div>
              </div>
              <div className="bg-pink-100 rounded p-3 text-center border border-pink-300">
                <Zap className="w-5 h-5 mx-auto mb-1 text-pink-600" />
                <div className="text-xs font-semibold">Dapr</div>
              </div>
              <div className="bg-indigo-100 rounded p-3 text-center border border-indigo-300">
                <Network className="w-5 h-5 mx-auto mb-1 text-indigo-600" />
                <div className="text-xs font-semibold">VNet</div>
              </div>
              <div className="bg-teal-100 rounded p-3 text-center border border-teal-300">
                <Database className="w-5 h-5 mx-auto mb-1 text-teal-600" />
                <div className="text-xs font-semibold">Monitoring</div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-world Examples */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Real-World Architecture Examples</h2>
          <div className="space-y-6">
            {examples.map((example, idx) => (
              <div key={idx} className="border-2 border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{example.title}</h3>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Container Apps:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {example.apps.map((app, appIdx) => (
                      <div key={appIdx} className="bg-gray-50 rounded p-3 border border-gray-200">
                        <div className="font-semibold text-gray-800">{app.name}</div>
                        <div className="text-sm text-gray-600">Type: {app.type}</div>
                        <div className="text-sm text-gray-600">Scaling: {app.scale}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Key Features Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {example.features.map((feature, featureIdx) => (
                      <span key={featureIdx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Summary */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why This Architecture Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-gray-800">Simplified Management</div>
                  <div className="text-sm text-gray-600">No Kubernetes cluster to manage, but you get orchestration benefits</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-gray-800">Cost Optimization</div>
                  <div className="text-sm text-gray-600">Scale to zero and pay only for active processing time</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-gray-800">Developer Productivity</div>
                  <div className="text-sm text-gray-600">Focus on code, not infrastructure configuration</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-gray-800">Built-in Best Practices</div>
                  <div className="text-sm text-gray-600">Automatic HTTPS, health checks, and service discovery</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-gray-800">Flexible Deployment</div>
                  <div className="text-sm text-gray-600">Blue-green, canary, and progressive rollouts out-of-the-box</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-gray-800">Microservices Ready</div>
                  <div className="text-sm text-gray-600">Dapr integration for distributed app patterns</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ACAArchitecture;
