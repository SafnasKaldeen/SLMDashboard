import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  Zap,
  Thermometer,
  Battery,
} from "lucide-react";

export function LooseConnectionAnalyzer({
  currentData,
  historicalData,
  anomalyDetector,
}) {
  // Calculate overall connection health
  const calculateOverallHealth = () => {
    if (currentData.length === 0) return 0;

    const healthScores = currentData.map((cabinet) => {
      if (!cabinet.timestamp) return 0;

      const voltageValues = cabinet.single_vol
        ? cabinet.single_vol
            .split(",")
            .map((v) => Number.parseFloat(v.trim()))
            .filter((v) => !isNaN(v))
        : [];
      const voltageVariance =
        voltageValues.length > 1
          ? Math.max(...voltageValues) - Math.min(...voltageValues)
          : 0;

      return Math.max(10, Math.round(100 - voltageVariance * 50));
    });

    return Math.round(
      healthScores.reduce((sum, score) => sum + score, 0) / healthScores.length
    );
  };

  // Count unstable connections
  const countUnstableConnections = () => {
    return currentData.filter((cabinet) => {
      if (!cabinet.timestamp) return false;

      const voltageValues = cabinet.single_vol
        ? cabinet.single_vol
            .split(",")
            .map((v) => Number.parseFloat(v.trim()))
            .filter((v) => !isNaN(v))
        : [];
      const voltageVariance =
        voltageValues.length > 1
          ? Math.max(...voltageValues) - Math.min(...voltageValues)
          : 0;

      return voltageVariance > 0.5;
    }).length;
  };

  // Count active anomalies
  const countAnomalies = () => {
    return currentData.filter((cabinet) => {
      if (!cabinet.timestamp) return false;
      return cabinet.urgency > 0 || cabinet.out_fire === 1;
    }).length;
  };

  // Calculate additional metrics
  const getMetrics = () => {
    const activeCabinets = currentData.filter((c) => c.timestamp);
    const chargingCabinets = activeCabinets.filter(
      (c) => c.charger_online === 1
    );
    const highTempCabinets = activeCabinets.filter((c) => c.cell_temp > 40);
    const lowBatteryCabinets = activeCabinets.filter((c) => c.battery < 30);

    return {
      active: activeCabinets.length,
      charging: chargingCabinets.length,
      highTemp: highTempCabinets.length,
      lowBattery: lowBatteryCabinets.length,
    };
  };

  const overallHealth = calculateOverallHealth();
  const unstableConnections = countUnstableConnections();
  const activeAnomalies = countAnomalies();
  const metrics = getMetrics();

  return (
    <Card className="border-slate-700">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-slate-200 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          System Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Health Score */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-300">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Overall Health Score</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-slate-600 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  overallHealth >= 90
                    ? "bg-green-500"
                    : overallHealth >= 70
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${overallHealth}%` }}
              />
            </div>
            <span className="text-xl font-bold text-slate-100 min-w-[3rem]">
              {overallHealth}%
            </span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-500/40">
            <div className="flex items-center gap-2 text-blue-200 mb-1">
              <Activity className="w-3 h-3" />
              <span className="text-xs font-medium">Active</span>
            </div>
            <div className="text-slate-100 font-mono text-lg">
              {metrics.active}/12
            </div>
          </div>

          <div className="p-3 bg-green-900/30 rounded-lg border border-green-500/40">
            <div className="flex items-center gap-2 text-green-200 mb-1">
              <Zap className="w-3 h-3" />
              <span className="text-xs font-medium">Charging</span>
            </div>
            <div className="text-slate-100 font-mono text-lg">
              {metrics.charging}
            </div>
          </div>

          <div className="p-3 bg-orange-900/30 rounded-lg border border-orange-500/40">
            <div className="flex items-center gap-2 text-orange-200 mb-1">
              <Thermometer className="w-3 h-3" />
              <span className="text-xs font-medium">High Temp</span>
            </div>
            <div className="text-slate-100 font-mono text-lg">
              {metrics.highTemp}
            </div>
          </div>

          <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-500/40">
            <div className="flex items-center gap-2 text-yellow-200 mb-1">
              <Battery className="w-3 h-3" />
              <span className="text-xs font-medium">Low Battery</span>
            </div>
            <div className="text-slate-100 font-mono text-lg">
              {metrics.lowBattery}
            </div>
          </div>
        </div>

        {/* Connection Issues */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-slate-300">
            Connection Issues
          </div>

          <div className="p-3 bg-orange-900/30 rounded-lg border border-orange-500/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-orange-200">
                <Activity className="w-4 h-4" />
                <span className="text-sm">Unstable Connections</span>
              </div>
              <span className="text-slate-100 font-mono text-lg">
                {unstableConnections}
              </span>
            </div>
          </div>

          <div className="p-3 bg-red-900/30 rounded-lg border border-red-500/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-200">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">Active Anomalies</span>
              </div>
              <span className="text-slate-100 font-mono text-lg">
                {activeAnomalies}
              </span>
            </div>
          </div>
        </div>

        {/* Alert Thresholds */}
        <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
          <div className="text-xs font-medium text-slate-300 mb-2">
            Alert Thresholds
          </div>
          <div className="text-xs text-slate-400 space-y-1">
            <div>• Voltage Variance {">"} 0.5V</div>
            <div>• Temperature {">"} 40°C</div>
            <div>• Battery Level {"<"} 30%</div>
            <div>• Connection Health {"<"} 70%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
