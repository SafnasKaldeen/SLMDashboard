"use client";

import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  ChevronLeft,
  ChevronRight,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export function TimelineControls({
  timestamps,
  currentTimestampIndex,
  currentTimestamp,
  isPlaying,
  playbackSpeed,
  onSliderChange,
  onPlayToggle,
  onReset,
  onSpeedChange,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}) {
  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get time range info
  const getTimeRangeInfo = () => {
    if (timestamps.length === 0) return null;

    const startTime = new Date(timestamps[0] * 1000);
    const endTime = new Date(timestamps[timestamps.length - 1] * 1000);
    const duration = endTime - startTime;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    return { startTime, endTime, hours, minutes };
  };

  const timeInfo = getTimeRangeInfo();

  // Jump to specific time periods
  const jumpToTime = (percentage) => {
    const targetIndex = Math.floor((timestamps.length - 1) * percentage);
    onSliderChange([targetIndex]);
  };

  return (
    <Card className="border-slate-700">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-slate-200 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Timeline Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Time Range Info */}
        {timeInfo && (
          <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
            <div className="text-xs text-slate-400 mb-2">Data Range</div>
            <div className="text-xs text-slate-300 space-y-1">
              <div>
                Duration: {timeInfo.hours}h {timeInfo.minutes}m
              </div>
              <div>From: {timeInfo.startTime.toLocaleDateString()}</div>
              <div>To: {timeInfo.endTime.toLocaleDateString()}</div>
            </div>
          </div>
        )}

        {/* Current Time Display */}
        <div className="text-center p-3 bg-blue-900/30 rounded-lg border border-blue-500/40">
          <div className="text-xs text-blue-200 mb-1">Current Time</div>
          <div className="text-slate-100 font-mono text-sm">
            {formatTimestamp(currentTimestamp)}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Position {currentTimestampIndex + 1} of {timestamps.length}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="space-y-3">
          <label className="text-sm text-slate-400 font-medium">
            Step Navigation
          </label>
          <div className="flex gap-2">
            <Button
              onClick={() => jumpToTime(0)}
              disabled={currentTimestampIndex === 0}
              size="sm"
              variant="outline"
              className="border-slate-600 hover:bg-slate-700 bg-transparent text-slate-300 disabled:opacity-50"
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              onClick={onPrevious}
              disabled={!canGoPrevious}
              size="sm"
              variant="outline"
              className="border-slate-600 hover:bg-slate-700 bg-transparent text-slate-300 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              onClick={onNext}
              disabled={!canGoNext}
              size="sm"
              variant="outline"
              className="border-slate-600 hover:bg-slate-700 bg-transparent text-slate-300 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => jumpToTime(1)}
              disabled={currentTimestampIndex === timestamps.length - 1}
              size="sm"
              variant="outline"
              className="border-slate-600 hover:bg-slate-700 bg-transparent text-slate-300 disabled:opacity-50"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Jump Buttons */}
        <div className="space-y-3">
          <label className="text-sm text-slate-400 font-medium">
            Quick Jump
          </label>
          <div className="grid grid-cols-4 gap-2">
            <Button
              onClick={() => jumpToTime(0)}
              size="sm"
              variant="outline"
              className="border-slate-600 hover:bg-slate-700 bg-transparent text-slate-300 text-xs"
            >
              Start
            </Button>
            <Button
              onClick={() => jumpToTime(0.33)}
              size="sm"
              variant="outline"
              className="border-slate-600 hover:bg-slate-700 bg-transparent text-slate-300 text-xs"
            >
              1/3
            </Button>
            <Button
              onClick={() => jumpToTime(0.66)}
              size="sm"
              variant="outline"
              className="border-slate-600 hover:bg-slate-700 bg-transparent text-slate-300 text-xs"
            >
              2/3
            </Button>
            <Button
              onClick={() => jumpToTime(1)}
              size="sm"
              variant="outline"
              className="border-slate-600 hover:bg-slate-700 bg-transparent text-slate-300 text-xs"
            >
              End
            </Button>
          </div>
        </div>

        {/* Timeline Slider */}
        <div className="space-y-3">
          <label className="text-sm text-slate-400 font-medium">
            Timeline Position
          </label>
          <Slider
            value={[currentTimestampIndex]}
            onValueChange={onSliderChange}
            max={timestamps.length - 1}
            step={1}
            className="w-full"
          />
        </div>

        {/* Playback Controls */}
        <div className="space-y-3">
          <label className="text-sm text-slate-400 font-medium">Playback</label>
          <div className="flex gap-2">
            <Button
              onClick={onPlayToggle}
              className={`flex-1 ${
                isPlaying
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              } text-white`}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 mr-2" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              className="border-slate-600 hover:bg-slate-700 bg-transparent text-slate-300"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Speed Control */}
        <div className="space-y-3">
          <label className="text-sm text-slate-400 font-medium">
            Playback Speed:{" "}
            <span className="text-slate-200">
              {playbackSpeed === 2000
                ? "0.5x"
                : playbackSpeed === 1000
                ? "1x"
                : playbackSpeed === 500
                ? "2x"
                : "4x"}
            </span>
          </label>
          <select
            value={playbackSpeed}
            onChange={(e) => onSpeedChange(Number.parseInt(e.target.value))}
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:border-blue-500 focus:outline-none"
          >
            <option value={2000}>0.5x (Slow)</option>
            <option value={1000}>1x (Normal)</option>
            <option value={500}>2x (Fast)</option>
            <option value={250}>4x (Very Fast)</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
}
