export class AnomalyDetector {
  detectAnomalies(current, previous) {
    if (!current || !previous || !current.timestamp) return []

    const anomalies = []

    // Communication loss
    if (current.communication === 0) {
      anomalies.push({
        type: "communication_loss",
        severity: "high",
        reason: "Communication lost with cabinet",
      })
    }

    // Charger offline
    if (current.charger_online === 0) {
      anomalies.push({
        type: "charger_offline",
        severity: "medium",
        reason: "Charger went offline",
      })
    }

    // Temperature spike
    if (Math.abs(current.cell_temp - previous.cell_temp) > 30) {
      anomalies.push({
        type: "temp_spike",
        severity: "high",
        reason: `Temperature spike: ${Math.abs(current.cell_temp - previous.cell_temp)}°C change`,
      })
    }

    // Battery level drop
    if (current.battery - previous.battery < -20) {
      anomalies.push({
        type: "battery_drop",
        severity: "medium",
        reason: `Battery level dropped by ${Math.abs(current.battery - previous.battery)}%`,
      })
    }

    // Voltage variance (loose connection indicator)
    const voltageValues = current.single_vol
      ? current.single_vol
          .split(",")
          .map((v) => Number.parseFloat(v.trim()))
          .filter((v) => !isNaN(v))
      : []
    const voltageVariance = voltageValues.length > 1 ? Math.max(...voltageValues) - Math.min(...voltageValues) : 0

    if (voltageVariance > 0.8) {
      anomalies.push({
        type: "loose_connection",
        severity: "critical",
        reason: `Possible loose connection: ${voltageVariance.toFixed(2)}V variance`,
      })
    } else if (voltageVariance > 0.5) {
      anomalies.push({
        type: "voltage_instability",
        severity: "high",
        reason: `Voltage instability: ${voltageVariance.toFixed(2)}V variance`,
      })
    }

    // Fire detection
    if (current.out_fire === 1) {
      anomalies.push({
        type: "fire_detected",
        severity: "critical",
        reason: "Fire detection system activated",
      })
    }

    // High urgency
    if (current.urgency > 0) {
      anomalies.push({
        type: "high_urgency",
        severity: "high",
        reason: `Urgent attention required (Level ${current.urgency})`,
      })
    }

    return anomalies
  }

  getCabinetStatus(current, previous) {
    if (!current || !current.timestamp) {
      return {
        bgClass: "bg-slate-800/50",
        borderClass: "border-slate-600",
        status: "offline",
      }
    }

    const anomalies = this.detectAnomalies(current, previous)

    if (anomalies.some((a) => a.severity === "critical")) {
      return {
        bgClass: "bg-red-900/20",
        borderClass: "border-red-500",
        status: "critical",
        glow: "shadow-red-500/20 shadow-lg",
      }
    }

    if (anomalies.some((a) => a.severity === "high")) {
      return {
        bgClass: "bg-red-900/10",
        borderClass: "border-red-400",
        status: "error",
        glow: "shadow-red-400/15 shadow-md",
      }
    }

    if (anomalies.some((a) => a.severity === "medium")) {
      return {
        bgClass: "bg-yellow-900/20",
        borderClass: "border-yellow-500",
        status: "warning",
        glow: "shadow-yellow-500/15 shadow-md",
      }
    }

    // Overall health based on multiple factors
    const healthScore =
      (current.communication || 0) +
      (current.charger_online || 0) +
      (current.battery > 20 ? 1 : 0) +
      (current.cell_temp < 50 ? 1 : 0)

    if (healthScore >= 3) {
      return {
        bgClass: "bg-green-900/20",
        borderClass: "border-green-500",
        status: "healthy",
        glow: "shadow-green-500/15 shadow-md",
      }
    }

    if (healthScore >= 2) {
      return {
        bgClass: "bg-yellow-900/20",
        borderClass: "border-yellow-600",
        status: "warning",
      }
    }

    return {
      bgClass: "bg-red-900/20",
      borderClass: "border-red-600",
      status: "error",
    }
  }
}
