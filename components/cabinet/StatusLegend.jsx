"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Battery,
  BatteryIcon as BatteryX,
  Zap,
  AlertTriangle,
  Wifi,
  WifiOff,
  Thermometer,
  Activity,
  Info,
} from "lucide-react";

export function StatusLegend() {
  return (
    <Card className="border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-slate-200 flex items-center gap-2">
          <Info className="w-5 h-5" />
          Status Legend
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Battery Status */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-300">
              Battery Status
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-600 text-white text-xs">
                  <Battery className="w-3 h-3 mr-1" />
                  Active
                </Badge>
                <span className="text-xs text-slate-400">
                  Battery installed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-slate-600 text-slate-300 text-xs">
                  <BatteryX className="w-3 h-3 mr-1" />
                  Empty
                </Badge>
                <span className="text-xs text-slate-400">No battery</span>
              </div>
            </div>
          </div>

          {/* Charging Status */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-300">
              Charging Status
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600 text-white text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  Charging
                </Badge>
                <span className="text-xs text-slate-400">
                  Actively charging
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-slate-600 text-white text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  Not Charging
                </Badge>
                <span className="text-xs text-slate-400">Not charging</span>
              </div>
            </div>
          </div>

          {/* Connection Status */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-300">Connection</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-green-400" />
                <span className="text-xs text-slate-400">Online</span>
              </div>
              <div className="flex items-center gap-2">
                <WifiOff className="w-4 h-4 text-red-400" />
                <span className="text-xs text-slate-400">Offline</span>
              </div>
            </div>
          </div>

          {/* Temperature Indicators */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-300">
              Temperature
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-slate-400">{"<40°C Normal"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-green-400" />
                <span className="text-xs text-slate-400">40-50°C Warm</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-red-400" />
                <span className="text-xs text-slate-400">{">50°C Hot"}</span>
              </div>
            </div>
          </div>

          {/* Connection Score */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-300">
              Connection Score
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-slate-400">90-100% Healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-2 bg-yellow-500 rounded-full" />
                <span className="text-xs text-slate-400">70-89% Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-2 bg-red-500 rounded-full" />
                <span className="text-xs text-slate-400">
                  {"<70% Critical"}
                </span>
              </div>
            </div>
          </div>

          {/* Anomalies */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-300">Anomalies</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="text-xs text-slate-400">Detected issues</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-slate-400">Voltage variance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="pt-3 border-t border-slate-700">
          <div className="text-xs text-slate-500">
            <strong>Note:</strong> Connection scores are calculated based on
            voltage variance. Higher variance indicates potential loose
            connections or electrical issues.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
