'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Cpu,
  Terminal,
  Radio,
  ShieldCheck,
  Zap,
  Play,
  FileCode,
  HelpCircle
} from 'lucide-react';

export default function MatrixIoTTutorialPage() {
  const [activeModule, setActiveModule] = useState(1);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const micropythonCode = `# matrix_iot_firmware.py - ESP32 MicroPython Client
import network
import ujson
import time
from umqtt.simple import MQTTClient

# 1. Configuration
WIFI_SSID = "College_Lab_WiFi"
WIFI_PASS = "LabSecurePass2026"
MQTT_BROKER = "mqtt.matrix-iot.com"
CLIENT_ID = "esp32_lab_station_01"
COLLEGE_TENANT_ID = "meridian_college"

def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print("Connecting to Wi-Fi...")
        wlan.connect(WIFI_SSID, WIFI_PASS)
        while not wlan.isconnected():
            time.sleep(0.5)
    print("Wi-Fi Connected! IP:", wlan.ifconfig()[0])

def publish_attendance(rfid_uid):
    client = MQTTClient(CLIENT_ID, MQTT_BROKER, port=8883, ssl=True)
    client.connect()
    
    payload = ujson.dumps({
        "tenant_id": COLLEGE_TENANT_ID,
        "station_id": CLIENT_ID,
        "rfid_card_uid": rfid_uid,
        "timestamp": time.time(),
        "action": "LAB_CHECK_IN"
    })
    
    topic = f"matrix-iot/{COLLEGE_TENANT_ID}/attendance"
    client.publish(topic, payload)
    print(f"Published RFID UID [{rfid_uid}] to Matrix Cloud LMS!")
    client.disconnect()

connect_wifi()
publish_attendance("9A-4F-88-C2")`;

  const apiCurlCode = `curl -X POST https://api.matrix-iot.com/v1/telemetry/sync \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer mtx_live_99812a4f781c" \\
  -d '{
    "tenant_id": "meridian_college",
    "course_id": "CS302-IOT",
    "student_rfid": "9A-4F-88-C2",
    "lab_bench_id": "BENCH_04",
    "hardware_status": "PASSED"
  }'`;

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <Link href="/matrix-iot">
          <Button variant="ghost" size="sm" className="text-xs text-slate-600">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Matrix-IoT Hub
          </Button>
        </Link>
        <div className="flex items-center space-x-3">
          <a href="/downloads/matrix-iot-tutorial-guide.html" download="Matrix-IoT-Tutorial-Guide.html">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white text-xs">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Download Offline Handbook
            </Button>
          </a>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-3">
        <div className="flex items-center space-x-2">
          <Badge className="bg-purple-500 text-white text-xs">Step-by-Step Hands-On Guide</Badge>
          <span className="text-xs text-purple-300 font-mono">matrix-iot.com/tutorial</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Matrix-IoT Hardware & Software Integration Tutorial
        </h1>
        <p className="text-sm text-purple-200 max-w-2xl">
          Learn how to assemble your ESP32 microcontroller, write MicroPython firmware, stream MQTT telemetry, and sync automated student lab grades directly to Matrix LMS Cloud.
        </p>
      </div>

      {/* Module Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { id: 1, title: 'Mod 1: Hardware Assembly', icon: Cpu },
          { id: 2, title: 'Mod 2: MicroPython Setup', icon: FileCode },
          { id: 3, title: 'Mod 3: Cloud REST API', icon: Terminal },
          { id: 4, title: 'Mod 4: LMS Grading', icon: Zap },
          { id: 5, title: 'Mod 5: Diagnostics', icon: HelpCircle }
        ].map((mod) => {
          const Icon = mod.icon;
          const isActive = activeModule === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className={`p-3 rounded-xl text-left border transition-all space-y-1 ${
                isActive
                  ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-600'}`} />
              <p className="text-xs font-bold truncate">{mod.title}</p>
            </button>
          );
        })}
      </div>

      {/* Module Content Display */}
      <div className="space-y-6">
        {/* Module 1: Hardware Assembly */}
        {activeModule === 1 && (
          <Card className="border border-slate-200">
            <CardHeader>
              <div className="flex items-center space-x-2 text-xs font-bold text-purple-600 uppercase tracking-wider">
                <span>Module 1</span>
              </div>
              <CardTitle className="text-xl">Hardware Assembly & ESP32 Pin Wiring</CardTitle>
              <CardDescription>
                Connect your ESP32 NodeMCU development board to the PN532 RFID reader via SPI protocol.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs text-left text-slate-700">
                  <thead className="bg-slate-100 uppercase font-bold text-slate-900">
                    <tr>
                      <th className="p-3">ESP32 Pin</th>
                      <th className="p-3">PN532 RFID Pin</th>
                      <th className="p-3">Function / Signal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr><td className="p-3 font-mono font-bold text-purple-700">3V3</td><td className="p-3">VCC</td><td className="p-3">3.3V Power Line</td></tr>
                    <tr><td className="p-3 font-mono font-bold text-purple-700">GND</td><td className="p-3">GND</td><td className="p-3">Ground Reference</td></tr>
                    <tr><td className="p-3 font-mono font-bold text-purple-700">GPIO 18</td><td className="p-3">SCK</td><td className="p-3">SPI Clock Line</td></tr>
                    <tr><td className="p-3 font-mono font-bold text-purple-700">GPIO 19</td><td className="p-3">MISO</td><td className="p-3">Master In Slave Out</td></tr>
                    <tr><td className="p-3 font-mono font-bold text-purple-700">GPIO 23</td><td className="p-3">MOSI</td><td className="p-3">Master Out Slave In</td></tr>
                    <tr><td className="p-3 font-mono font-bold text-purple-700">GPIO 5</td><td className="p-3">SS / CS</td><td className="p-3">Chip Select Line</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-1">
                <p className="text-xs font-bold text-purple-900">💡 Hardware Tip:</p>
                <p className="text-xs text-purple-800">
                  Ensure the DIP switches on the PN532 module are toggled to <span className="font-mono font-bold">SPI Mode</span> (Switch 1: OFF, Switch 2: ON) before powering the board.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Module 2: MicroPython Code */}
        {activeModule === 2 && (
          <Card className="border border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold text-purple-600 uppercase tracking-wider">
                  <span>Module 2</span>
                </div>
                <CardTitle className="text-xl">ESP32 MicroPython Firmware Script</CardTitle>
                <CardDescription>
                  Upload this firmware to automatically read student RFID cards and publish MQTT telemetry.
                </CardDescription>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(micropythonCode, 'micropython')}
                className="text-xs border-slate-300"
              >
                {copiedSnippet === 'micropython' ? (
                  <><Check className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Copied!</>
                ) : (
                  <><Copy className="w-3.5 h-3.5 mr-1" /> Copy Code</>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-950 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800">
                <code>{micropythonCode}</code>
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Module 3: Cloud REST API */}
        {activeModule === 3 && (
          <Card className="border border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold text-purple-600 uppercase tracking-wider">
                  <span>Module 3</span>
                </div>
                <CardTitle className="text-xl">Matrix-IoT Cloud REST Sync API</CardTitle>
                <CardDescription>
                  Verify edge sync authentication using cURL or HTTP POST requests.
                </CardDescription>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(apiCurlCode, 'curl')}
                className="text-xs border-slate-300"
              >
                {copiedSnippet === 'curl' ? (
                  <><Check className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Copied!</>
                ) : (
                  <><Copy className="w-3.5 h-3.5 mr-1" /> Copy cURL</>
                )}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className="bg-slate-950 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800">
                <code>{apiCurlCode}</code>
              </pre>
              <p className="text-xs text-slate-600">
                API Key tokens can be generated inside the Matrix LMS Admin portal at <span className="font-mono text-purple-700">/settings/api</span>.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Module 4: LMS Grading */}
        {activeModule === 4 && (
          <Card className="border border-slate-200">
            <CardHeader>
              <div className="flex items-center space-x-2 text-xs font-bold text-purple-600 uppercase tracking-wider">
                <span>Module 4</span>
              </div>
              <CardTitle className="text-xl">Automated Grade & Attendance Sync</CardTitle>
              <CardDescription>
                How student hardware swipes update Matrix Cloud LMS in real time.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Attendance Log Verification</span>
                  </div>
                  <p className="text-slate-600">
                    Student RFID UID match triggers immediate status update in <span className="font-semibold text-slate-900">Attendance Module</span> with exact check-in timestamp.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-purple-800 font-bold">
                    <Zap className="w-4 h-4 text-purple-600" />
                    <span>Hardware Lab Gradebook Sync</span>
                  </div>
                  <p className="text-slate-600">
                    If lab bench logic analyzer returns <span className="font-mono text-emerald-700">PASSED</span>, student receives 100% on lab assessment automatically.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Module 5: Diagnostics */}
        {activeModule === 5 && (
          <Card className="border border-slate-200">
            <CardHeader>
              <div className="flex items-center space-x-2 text-xs font-bold text-purple-600 uppercase tracking-wider">
                <span>Module 5</span>
              </div>
              <CardTitle className="text-xl">Diagnostic & Troubleshooting Checklist</CardTitle>
              <CardDescription>
                Common issues and resolution steps during campus IoT deployment.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <p className="font-bold text-slate-900">Q: ESP32 fails to connect to MQTT broker?</p>
                <p className="text-slate-600">A: Verify port 8883 is open on your college campus firewall and TLS 1.3 is enabled in your MicroPython build.</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <p className="font-bold text-slate-900">Q: RFID card swipe does not log attendance?</p>
                <p className="text-slate-600">A: Ensure the student card UID has been registered under <span className="font-semibold text-purple-700">User Management</span> in Matrix LMS.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Download CTA */}
      <div className="p-6 bg-slate-100 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Need the Full Offline Tutorial Handbook?</h3>
          <p className="text-xs text-slate-500">Download the complete HTML file to view or print offline anywhere.</p>
        </div>
        <a href="/downloads/matrix-iot-tutorial-guide.html" download="Matrix-IoT-Tutorial-Guide.html">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white text-xs">
            <Download className="w-3.5 h-3.5 mr-1.5" /> Download Tutorial Guide (.html)
          </Button>
        </a>
      </div>
    </div>
  );
}
