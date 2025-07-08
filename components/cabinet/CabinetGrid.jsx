import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CabinetCard } from "./CabinetCard";

export function CabinetGrid({ currentData, previousData, anomalyDetector }) {
  return (
    <Card className=" border-slate-600/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Cabinet Status Grid
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {currentData.map((cabinet, index) => {
            const previous = previousData[index];
            const anomalies = anomalyDetector.detectAnomalies(
              cabinet,
              previous
            );

            return (
              <CabinetCard
                key={index}
                cabinet={cabinet}
                previous={previous}
                anomalies={anomalies}
                anomalyDetector={anomalyDetector}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
