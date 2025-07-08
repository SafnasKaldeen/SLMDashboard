"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";

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
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "No Data";
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const getSpeedLabel = (speed) => {
    switch (speed) {
      case 500:
        return "2x";
      case 1000:
        return "1x";
      case 2000:
        return "0.5x";
      case 3000:
        return "0.33x";
      default:
        return "1x";
    }
  };

  const handleQuickJump = (position) => {
    let targetIndex;
    switch (position) {
      case "start":
        targetIndex = 0;
        break;
      case "quarter":
        targetIndex = Math.floor(timestamps.length * 0.25);
        break;
      case "half":
        targetIndex = Math.floor(timestamps.length * 0.5);
        break;
      case "three-quarter":
        targetIndex = Math.floor(timestamps.length * 0.75);
        break;
      case "end":
        targetIndex = timestamps.length - 1;
        break;
      default:
        return;
    }
    onSliderChange([targetIndex]);
  };

  if (timestamps.length === 0) {
    return (
      <Card className="border-slate-700">
        <CardContent className="p-4">
          <div className="text-center text-slate-400">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <span>No timeline data available</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-700">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
          {/* Current Time Display */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-slate-300">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Current Time</span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {formatTimestamp(currentTimestamp)}
            </div>
            <div className="text-xs text-slate-500">
              Frame {currentTimestampIndex + 1} of {timestamps.length}
            </div>
          </div>

          {/* Step Navigation */}
          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={onPrevious}
              disabled={!canGoPrevious}
              size="sm"
              variant="outline"
              className="border-slate-600 hover:bg-slate-700 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="text-xs text-slate-400 min-w-[60px] text-center">
              Step by Step
            </div>
            <Button
              onClick={onNext}
              disabled={!canGoNext}
              size="sm"
              variant="outline"
              className="border-slate-600 hover:bg-slate-700 bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Timeline Slider */}
          <div className="space-y-3">
            <div className="text-xs text-slate-400 text-center">
              Timeline Position
            </div>
            <div className="space-y-2">
              <Slider
                value={[currentTimestampIndex]}
                onValueChange={onSliderChange}
                max={timestamps.length - 1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>{formatTimestamp(timestamps[0])}</span>
                <span>
                  {formatTimestamp(timestamps[timestamps.length - 1])}
                </span>
              </div>
            </div>
            {/* Quick Jump Buttons */}
            <div className="flex justify-between">
              <Button
                onClick={() => handleQuickJump("start")}
                size="sm"
                variant="ghost"
                className="text-xs px-2 py-1 h-6"
              >
                Start
              </Button>
              <Button
                onClick={() => handleQuickJump("quarter")}
                size="sm"
                variant="ghost"
                className="text-xs px-2 py-1 h-6"
              >
                1/4
              </Button>
              <Button
                onClick={() => handleQuickJump("half")}
                size="sm"
                variant="ghost"
                className="text-xs px-2 py-1 h-6"
              >
                1/2
              </Button>
              <Button
                onClick={() => handleQuickJump("three-quarter")}
                size="sm"
                variant="ghost"
                className="text-xs px-2 py-1 h-6"
              >
                3/4
              </Button>
              <Button
                onClick={() => handleQuickJump("end")}
                size="sm"
                variant="ghost"
                className="text-xs px-2 py-1 h-6"
              >
                End
              </Button>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={onPlayToggle}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <Button
              onClick={onReset}
              size="sm"
              variant="outline"
              className="border-slate-600 hover:bg-slate-700 bg-transparent"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <div className="text-xs text-slate-400">
              {isPlaying ? "Playing" : "Paused"}
            </div>
          </div>

          {/* Speed Control */}
          <div className="space-y-2">
            <div className="text-xs text-slate-400 text-center">
              Playback Speed
            </div>
            <Select
              value={playbackSpeed.toString()}
              onValueChange={(value) => onSpeedChange(Number.parseInt(value))}
            >
              <SelectTrigger className="bg-slate-800 border-slate-600 text-slate-200 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem
                  value="500"
                  className="text-slate-200 hover:bg-slate-700"
                >
                  2x Speed
                </SelectItem>
                <SelectItem
                  value="1000"
                  className="text-slate-200 hover:bg-slate-700"
                >
                  1x Speed
                </SelectItem>
                <SelectItem
                  value="2000"
                  className="text-slate-200 hover:bg-slate-700"
                >
                  0.5x Speed
                </SelectItem>
                <SelectItem
                  value="3000"
                  className="text-slate-200 hover:bg-slate-700"
                >
                  0.33x Speed
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="text-xs text-slate-500 text-center">
              Current: {getSpeedLabel(playbackSpeed)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
