import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Info,
  Battery,
  Wifi,
  Thermometer,
  AlertTriangle,
  Zap,
} from "lucide-react";

export function StatusLegend() {
  const statusItems = [
    {
      color: "bg-green-600",
      label: "Active",
      description: "Cabinet with battery, online",
    },
    {
      color: "bg-slate-600",
      label: "Empty",
      description: "No battery present",
    },
    {
      color: "bg-yellow-600",
      label: "Offline",
      description: "Communication lost",
    },
    {
      color: "bg-orange-600",
      label: "Urgent",
      description: "Requires attention",
    },
    {
      color: "bg-red-600",
      label: "Fire Alert",
      description: "Critical safety alert",
    },
  ];

  const iconLegend = [
    {
      icon: Battery,
      label: "Battery Info",
      description: "Battery level and status",
    },
    {
      icon: Wifi,
      label: "Communication",
      description: "Online/offline status",
    },
    { icon: Zap, label: "Charger", description: "Charging system status" },
    {
      icon: Thermometer,
      label: "Temperature",
      description: "Cell temperature monitoring",
    },
    {
      icon: AlertTriangle,
      label: "Anomalies",
      description: "Detected issues and alerts",
    },
  ];

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl text-slate-200 flex items-center gap-2">
          <Info className="w-5 h-5" />
          Status Legend
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Colors */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-300">
            Cabinet Status Colors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {statusItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <Badge
                  className={`${item.color} text-white min-w-[4rem] justify-center`}
                >
                  {item.label}
                </Badge>
                <div className="text-xs text-slate-400">{item.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Icon Legend */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-300">
            Information Icons
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {iconLegend.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <item.icon className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-sm text-slate-200">{item.label}</div>
                  <div className="text-xs text-slate-400">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Thresholds */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-300">
            Alert Thresholds
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-400">
            <div>• High Temperature: {">"} 40°C</div>
            <div>• Low Battery: {"<"} 30%</div>
            <div>• Voltage Variance: {">"} 0.5V</div>
            <div>• Connection Health: {"<"} 70%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
