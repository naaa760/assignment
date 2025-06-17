import { useState } from "react";
import * as React from "react";
import {
  ArrowLeft,
  CheckCircle,
  Plus,
  Undo2,
  Redo2,
  RotateCcw,
  Lightbulb,
  Sparkles,
  Zap,
  Stars,
} from "lucide-react";
import useWorkflowStore from "../store/workflowStore";
import WorkflowStep from "./WorkflowStep";

export default function EditingSection() {
  const [cardPositions, setCardPositions] = useState({});
  const [dragging, setDragging] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const {
    steps,
    currentPrompt,
    setCurrentStep,
    reorderSteps,
    undo,
    redo,
    history,
    historyIndex,
    reset,
    addStep,
  } = useWorkflowStore();

  // Initialize default positions for cards
  const getDefaultPosition = (index) => {
    const positions = [
      { x: 50, y: 80 }, // First step
      { x: 200, y: 80 }, // Second step
      { x: 350, y: 80 }, // Third step
      { x: 125, y: 220 }, // Fourth step
      { x: 275, y: 220 }, // Fifth step
    ];
    return (
      positions[index] || {
        x: 50 + (index % 3) * 150,
        y: 80 + Math.floor(index / 3) * 140,
      }
    );
  };

  // Mouse down on drag handle
  const handleMouseDown = (e, index) => {
    e.preventDefault();
    const canvas = document.querySelector(".workflow-canvas");
    const canvasRect = canvas.getBoundingClientRect();

    const currentPos = cardPositions[index] || getDefaultPosition(index);

    setDragging(index);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragOffset({
      x: e.clientX - canvasRect.left - currentPos.x,
      y: e.clientY - canvasRect.top - currentPos.y,
    });
  };

  // Mouse move - update card position
  const handleMouseMove = (e) => {
    if (dragging !== null) {
      const canvas = document.querySelector(".workflow-canvas");
      const canvasRect = canvas.getBoundingClientRect();

      const newX = e.clientX - canvasRect.left - dragOffset.x;
      const newY = e.clientY - canvasRect.top - dragOffset.y;

      // Keep within canvas bounds
      const boundedX = Math.max(0, Math.min(canvasRect.width - 200, newX));
      const boundedY = Math.max(0, Math.min(canvasRect.height - 100, newY));

      setCardPositions((prev) => ({
        ...prev,
        [dragging]: { x: boundedX, y: boundedY },
      }));
    }
  };

  // Mouse up - stop dragging
  const handleMouseUp = () => {
    setDragging(null);
    setDragStart({ x: 0, y: 0 });
    setDragOffset({ x: 0, y: 0 });
  };

  // Add event listeners
  React.useEffect(() => {
    if (dragging !== null) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragging, dragOffset]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const addNewStep = () => {
    const newStep = {
      title: "New Step",
      description: "Describe what this step should do...",
      tool: "Custom",
      reasoning: "User-added step for custom workflow requirements",
      agent: "User",
      confidence: 1.0,
    };

    addStep(newStep);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Clean Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <button
                onClick={() => setCurrentStep("input")}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Back to Input</span>
              </button>

              {/* Control Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={undo}
                  disabled={!canUndo}
                  className="p-2 bg-white hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-400 text-gray-600 rounded-lg border border-gray-200 transition-colors disabled:cursor-not-allowed"
                  title="Undo"
                >
                  <Undo2 className="h-4 w-4" />
                </button>
                <button
                  onClick={redo}
                  disabled={!canRedo}
                  className="p-2 bg-white hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-400 text-gray-600 rounded-lg border border-gray-200 transition-colors disabled:cursor-not-allowed"
                  title="Redo"
                >
                  <Redo2 className="h-4 w-4" />
                </button>
                <button
                  onClick={reset}
                  className="p-2 bg-white hover:bg-gray-50 text-gray-600 hover:text-red-600 rounded-lg border border-gray-200 transition-colors"
                  title="Reset Workflow"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Clean Title */}
            <div className="text-center mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Review Your Workflow
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Edit, reorder, or ask AI to revise any step. When you&apos;re
                happy with the workflow, proceed to confirmation.
              </p>
            </div>

            {/* Original Request Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Stars className="h-5 w-5 text-white" />
                </div>
                <p className="text-blue-900 font-semibold text-lg">
                  Original Request:
                </p>
              </div>
              <p className="text-blue-800 text-lg font-medium italic">
                &quot;{currentPrompt}&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Pro Tips Section */}
        <div className="mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-500 rounded-lg flex-shrink-0">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-900 mb-3">
                  Pro Tips
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-700 font-medium">
                      Drag steps by the grip handle to reorder
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-700 font-medium">
                      Click refresh for AI alternative approaches
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-700 font-medium">
                      Lower confidence = areas where AI is uncertain
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-700 font-medium">
                      Edit steps directly for customization
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workflow Steps - Dynamic Canvas Layout Like Reference Image */}
        <div className="mb-8">
          <div className="workflow-canvas bg-white rounded-lg border border-gray-200 shadow-sm p-8 min-h-[600px] relative">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Workflow Canvas
            </h2>

            {/* Dynamic positioned workflow steps */}
            <div className="relative w-full h-full">
              {steps.map((step, index) => {
                // Dynamic positioning for each step
                const position =
                  cardPositions[index] || getDefaultPosition(index);

                return (
                  <div
                    key={step.id}
                    className={`workflow-card absolute transition-all duration-200 ${
                      dragging === index
                        ? "transform scale-105 z-20 opacity-75"
                        : "z-10"
                    }`}
                    style={{ left: `${position.x}px`, top: `${position.y}px` }}
                  >
                    <WorkflowStep
                      step={step}
                      index={index}
                      isDragging={dragging === index}
                      onMouseDown={handleMouseDown}
                    />
                  </div>
                );
              })}

              {/* Grid background for better visual guidance */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #9CA3AF 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                ></div>
              </div>

              {/* Drop zone indicator */}
              {dragging !== null && (
                <div className="absolute inset-0 border-2 border-dashed border-blue-400 bg-blue-50 bg-opacity-30 rounded-lg pointer-events-none">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-blue-600 font-medium">
                      Drop anywhere to position your workflow step
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Step Button */}
        <div className="mb-8 max-w-sm mx-auto">
          <button
            onClick={addNewStep}
            className="w-full p-4 border-2 border-dashed border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 rounded-lg transition-all duration-200 group"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="p-2 bg-gray-600 rounded-lg group-hover:bg-gray-700 transition-colors">
                <Plus className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-gray-900">
                Add Custom Step
              </span>
            </div>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="text-xl font-bold text-gray-900 mb-2">
                {steps.length} steps in your workflow
              </div>
              <div className="text-gray-600 font-medium">
                Ready to proceed when you are!
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => setCurrentStep("input")}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors border border-gray-300"
              >
                Back to Edit Request
              </button>

              <button
                onClick={() => setCurrentStep("confirmation")}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Proceed to Confirmation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
