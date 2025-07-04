"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FleetStatusCard from "./fleet-status-card";
import ScooterStatusTable from "./scooter-status-table";
import MotorOverview from "./motor-overview";
import AlertsOverview from "./alerts-overview";
import BatteryAnalyticsChart from "@/components/BatteryAnalyticsChart";
import dynamic from "next/dynamic";
// import { FleetMap } from "./fleet/fleet-map";
import ScooterMap from "@/components/ScooterMap";

// Mock data - replace with your actual API calls
const mockFleetData = {
  totalScooters: 120,
  activeScooters: 87,
  inactiveScooters: 33,
  alertsCount: 12,
  batteryAvg: 76,
  motorHealth: 92,
};

export default function DashboardOverview() {
  const [fleetData, setFleetData] = useState(mockFleetData);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/fleet-status');
        // const data = await response.json();
        // setFleetData(data);

        // Using mock data for now
        setTimeout(() => {
          setFleetData(mockFleetData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch fleet data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <FleetStatusCard data={fleetData} isLoading={isLoading} />

      {/* <Tabs defaultValue="scooters" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4 bg-slate-800/50 p-1">
          <TabsTrigger
            value="scooters"
            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
          >
            Scooter Status
          </TabsTrigger>
          <TabsTrigger
            value="battery"
            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
          >
            Battery Analytics
          </TabsTrigger>
          <TabsTrigger
            value="motor"
            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
          >
            Motor Performance
          </TabsTrigger>
          <TabsTrigger
            value="alerts"
            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
          >
            System Alerts
          </TabsTrigger>
        </TabsList> */}

      {/* <TabsContent value="scooters" className="space-y-6"> */}
      <ScooterMap />
      {/* </TabsContent> */}

      {/* <TabsContent value="battery" className="space-y-6">
          <BatteryAnalyticsChart />
        </TabsContent>

        <TabsContent value="motor" className="space-y-6">
          <MotorOverview />
        </TabsContent> */}

      {/* <TabsContent value="alerts" className="space-y-6">
          <AlertsOverview />
        </TabsContent> */}
      {/* </Tabs> */}
    </div>
  );
}
