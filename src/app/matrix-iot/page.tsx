'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Cpu,
  Wifi,
  Download,
  BookOpen,
  FileText,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Terminal,
  Radio,
  Server,
  Play,
  Share2,
  Printer
} from 'lucide-react';

export default function MatrixIoTPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'how-it-works' | 'download'>('overview');
  const [simulatingTelemetry, setSimulatingTelemetry] = useState(false);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([
    '[SYSTEM] Matrix-IoT Edge Gateway v3.4 online',
    '[MQTT] Connected to broker.matrix-iot.com:8883 (TLS 1.3)',
    '[STATUS] Listening for student RFID swipes & lab telemetry...'
  ]);

  const triggerSimulatedScan = () => {
    setSimulatingTelemetry(true);
    const uids = ['9A-4F-88-C2', '3B-11-D9-05', 'F8-E2-55-AA'];
    const randomUid = uids[Math.floor(Math.random() * uids.length)];
    const time = new Date().toLocaleTimeString();

    setTimeout(() => {
      setSimulatedLogs((prev) => [
        `[${time}] RFID SWIPE DETECTED -> UID: ${randomUid}`,
        `[${time}] HTTP POST https://api.matrix-iot.com/v1/telemetry/sync (200 OK)`,
        `[${time}] SUCCESS: Attendance logged & Lab Bench #03 unlocked for student!`,
        ...prev.slice(0, 8)
      ]);
      setSimulatingTelemetry(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-4">
      {/* Top Banner & Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 md:p-12 shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-3 py-1.5 rounded-full text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>Official Hub • matrix-iot.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/matrix-iot/brochure">
                <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs">
                  <FileText className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> Digital Brochure
                </Button>
              </Link>
              <Link href="/matrix-iot/tutorial">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white text-xs">
                  <BookOpen className="w-3.5 h-3.5 mr-1.5" /> Hands-On Tutorial
                </Button>
              </Link>
            </div>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Matrix-IoT Platform Ecosystem
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              The next-generation IoT edge gateway and cloud synchronization engine powering smart campuses, automated lab attendance, micro-controller assessments, and real-time telemetry analytics.
            </p>
          </div>

          {/* Key Metrics Pill Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
            <div>
              <p className="text-xs text-slate-400 font-medium">Sync Latency</p>
              <p className="text-xl font-bold text-emerald-400">&lt; 120ms</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Hardware Support</p>
              <p className="text-xl font-bold text-blue-400">ESP32, RPi, STM32</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Cloud Security</p>
              <p className="text-xl font-bold text-purple-400">AWS Cloud Isolation</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Protocol Standard</p>
              <p className="text-xl font-bold text-amber-400">MQTT / TLS 1.3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-8">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center space-x-2 ${
            activeTab === 'overview'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>System Overview</span>
        </button>
        <button
          onClick={() => setActiveTab('how-it-works')}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center space-x-2 ${
            activeTab === 'how-it-works'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>How It Works & Architecture</span>
        </button>
        <button
          onClick={() => setActiveTab('download')}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors flex items-center space-x-2 ${
            activeTab === 'download'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Download Brochure & Tutorial Package</span>
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-10">
          {/* Quick Access Cards to Brochure & Tutorial */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:border-blue-500 transition-all border-2 border-slate-200 bg-gradient-to-br from-white to-blue-50/40">
              <CardHeader>
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-2 shadow-md">
                  <FileText className="w-5 h-5" />
                </div>
                <CardTitle className="text-xl">Official System Brochure</CardTitle>
                <CardDescription>
                  Comprehensive overview of hardware specifications, multi-tenant cloud security, campus deployment topologies, and enterprise pricing.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-xs space-y-2 text-slate-600">
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Complete Hardware & Microcontroller Compatibility Matrix</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> High-Resolution System Topology & Visual Diagrams</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Printable PDF layout ready for university boards</li>
                </ul>
                <div className="flex space-x-3 pt-2">
                  <Link href="/matrix-iot/brochure" className="flex-1">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs">
                      View Online Brochure <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                  <a href="/downloads/matrix-iot-brochure.html" download="Matrix-IoT-Brochure.html" className="flex-1">
                    <Button variant="outline" className="w-full text-xs border-slate-300">
                      <Download className="w-3.5 h-3.5 mr-1" /> Offline HTML
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:border-purple-500 transition-all border-2 border-slate-200 bg-gradient-to-br from-white to-purple-50/40">
              <CardHeader>
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-2 shadow-md">
                  <BookOpen className="w-5 h-5" />
                </div>
                <CardTitle className="text-xl">Hands-On Integration Tutorial</CardTitle>
                <CardDescription>
                  Step-by-step developer and student guide for setting up hardware, writing MicroPython firmware, and connecting to Matrix Cloud LMS.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-xs space-y-2 text-slate-600">
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Module 1: Hardware Wiring & Pinout (ESP32 + PN532 RFID)</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Module 2: Copy-Paste MicroPython & C++ Firmware Code</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Module 3: MQTT / TLS Broker & Cloud REST Integration</li>
                </ul>
                <div className="flex space-x-3 pt-2">
                  <Link href="/matrix-iot/tutorial" className="flex-1">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs">
                      Start Interactive Tutorial <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                  <a href="/downloads/matrix-iot-tutorial-guide.html" download="Matrix-IoT-Tutorial-Guide.html" className="flex-1">
                    <Button variant="outline" className="w-full text-xs border-slate-300">
                      <Download className="w-3.5 h-3.5 mr-1" /> Offline Handbook
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Telemetry Simulator Box */}
          <Card className="border-slate-800 bg-slate-950 text-slate-100 overflow-hidden shadow-2xl">
            <CardHeader className="border-b border-slate-800 bg-slate-900/80 flex flex-row items-center justify-between py-4">
              <div className="flex items-center space-x-3">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <div>
                  <CardTitle className="text-base font-mono text-emerald-400">Live Hardware Telemetry & Cloud Console</CardTitle>
                  <CardDescription className="text-xs text-slate-400">Interactive live simulation of Matrix-IoT Edge Gateway sync</CardDescription>
                </div>
              </div>
              <Button
                onClick={triggerSimulatedScan}
                disabled={simulatingTelemetry}
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono"
              >
                <Play className="w-3.5 h-3.5 mr-1.5" />
                {simulatingTelemetry ? 'Processing Scan...' : 'Simulate RFID Card Swipe'}
              </Button>
            </CardHeader>
            <CardContent className="p-6 font-mono text-xs space-y-2 max-h-64 overflow-y-auto">
              {simulatedLogs.map((log, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <span className="text-slate-500 select-none">&gt;</span>
                  <span className={log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('RFID') ? 'text-blue-300' : 'text-slate-300'}>
                    {log}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 2: How It Works & Architecture */}
      {activeTab === 'how-it-works' && (
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">How Matrix-IoT Operates</h2>
            <p className="text-sm text-slate-600">A seamlessly integrated 4-layer stack connecting physical edge nodes to multi-college cloud analytics.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="relative overflow-hidden border-2 border-slate-200">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
              <CardHeader className="pt-6">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-extrabold text-sm flex items-center justify-center mb-3">1</div>
                <CardTitle className="text-base">Edge Hardware Layer</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-600 space-y-2">
                <p>Microcontrollers (ESP32, RPi, STM32) connected to RFID badge readers, environmental sensors, and automated test benches.</p>
                <div className="bg-slate-100 p-2 rounded text-[11px] font-mono text-slate-800">Pinout: SPI / I2C / UART</div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-slate-200">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-purple-600" />
              <CardHeader className="pt-6">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-extrabold text-sm flex items-center justify-center mb-3">2</div>
                <CardTitle className="text-base">Edge Gateway & Broker</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-600 space-y-2">
                <p>Local MQTT / WebSockets broker running TLS 1.3 encryption with offline failover buffer for zero data loss during network outages.</p>
                <div className="bg-slate-100 p-2 rounded text-[11px] font-mono text-slate-800">Broker: mqtt.matrix-iot.com</div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-slate-200">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-500" />
              <CardHeader className="pt-6">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 font-extrabold text-sm flex items-center justify-center mb-3">3</div>
                <CardTitle className="text-base">Matrix Cloud Sync Engine</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-600 space-y-2">
                <p>AWS Multi-Tenant Security validates college tenant IDs, student credentials, and updates PostgreSQL database tables instantly.</p>
                <div className="bg-slate-100 p-2 rounded text-[11px] font-mono text-slate-800">Auth: Bearer JWT Token</div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-slate-200">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-600" />
              <CardHeader className="pt-6">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-extrabold text-sm flex items-center justify-center mb-3">4</div>
                <CardTitle className="text-base">LMS Grade & Attendance</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-600 space-y-2">
                <p>Real-time student attendance records, auto-graded lab assignment scores, and live lab bench occupancy dashboards in Matrix LMS.</p>
                <div className="bg-slate-100 p-2 rounded text-[11px] font-mono text-slate-800">Status: Auto-Graded (100%)</div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Tab 3: Downloads */}
      {activeTab === 'download' && (
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Matrix-IoT Download & Resource Hub</h2>
            <p className="text-sm text-slate-600">Download offline documentation, printable brochures, firmware templates, and setup handbooks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Printable System Brochure</h3>
                  <p className="text-xs text-slate-500">Standalone HTML / PDF Format • 1.2 MB</p>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                Includes executive system summary, multi-tenant cloud architecture, hardware specs table, and college deployment topologies.
              </p>
              <div className="flex space-x-2 pt-1">
                <a href="/downloads/matrix-iot-brochure.pdf" download="Matrix-IoT-Brochure.pdf" className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs">
                    <Download className="w-3.5 h-3.5 mr-1" /> PDF Brochure
                  </Button>
                </a>
                <a href="/downloads/matrix-iot-brochure.html" download="Matrix-IoT-Brochure.html" className="flex-1">
                  <Button variant="outline" className="w-full text-xs border-slate-300">
                    <Download className="w-3.5 h-3.5 mr-1" /> HTML File
                  </Button>
                </a>
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Hands-On Integration Handbook</h3>
                  <p className="text-xs text-slate-500">Developer & Student Guide • PDF / HTML Format</p>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                Full technical guide containing ESP32 MicroPython firmware scripts, pin wiring schematics, MQTT payload schemas, and API curl requests.
              </p>
              <div className="flex space-x-2 pt-1">
                <a href="/downloads/matrix-iot-tutorial-guide.pdf" download="Matrix-IoT-Tutorial-Guide.pdf" className="flex-1">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs">
                    <Download className="w-3.5 h-3.5 mr-1" /> PDF Handbook
                  </Button>
                </a>
                <a href="/downloads/matrix-iot-tutorial-guide.html" download="Matrix-IoT-Tutorial-Guide.html" className="flex-1">
                  <Button variant="outline" className="w-full text-xs border-slate-300">
                    <Download className="w-3.5 h-3.5 mr-1" /> HTML File
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
