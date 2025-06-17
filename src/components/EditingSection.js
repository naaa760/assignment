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
  Menu,
  X,
} from "lucide-react";
import useWorkflowStore from "../store/workflowStore";
import WorkflowStep from "./WorkflowStep";

export default function EditingSection() {
  const [cardPositions, setCardPositions] = useState({});
  const [dragging, setDragging] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProceeding, setIsProceeding] = useState(false);

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
    setIsLoading,
  } = useWorkflowStore();

  // Debug: Check if image loads
  React.useEffect(() => {
    const img = new Image();
    img.onload = () => console.log("Background image loaded successfully");
    img.onerror = () => console.log("Background image failed to load");
    img.src = "/sd.png";
  }, []);

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

  // Touch start - for mobile devices
  const handleTouchStart = (e, index) => {
    e.preventDefault();
    const canvas = document.querySelector(".workflow-canvas");
    const canvasRect = canvas.getBoundingClientRect();
    const touch = e.touches[0];

    const currentPos = cardPositions[index] || getDefaultPosition(index);

    setDragging(index);
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setDragOffset({
      x: touch.clientX - canvasRect.left - currentPos.x,
      y: touch.clientY - canvasRect.top - currentPos.y,
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

  // Touch move - for mobile devices
  const handleTouchMove = (e) => {
    if (dragging !== null) {
      e.preventDefault(); // Prevent scrolling while dragging
      const canvas = document.querySelector(".workflow-canvas");
      const canvasRect = canvas.getBoundingClientRect();
      const touch = e.touches[0];

      const newX = touch.clientX - canvasRect.left - dragOffset.x;
      const newY = touch.clientY - canvasRect.top - dragOffset.y;

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

  // Touch end - for mobile devices
  const handleTouchEnd = () => {
    setDragging(null);
    setDragStart({ x: 0, y: 0 });
    setDragOffset({ x: 0, y: 0 });
  };

  // Add event listeners
  React.useEffect(() => {
    if (dragging !== null) {
      // Mouse events
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      // Touch events for mobile
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        // Cleanup mouse events
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        // Cleanup touch events
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
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
    <div
      className="min-h-screen flex relative"
      style={{
        backgroundImage: `url('/sd.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Grid Dot Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)
          `,
          backgroundSize: "20px 20px",
        }}
      ></div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        <Menu className="h-5 w-5 text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Beautiful White Sidebar - Mobile responsive */}
      <div
        className={`
        fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-50
        w-80 lg:w-64 bg-white/95 backdrop-blur-md border-r border-gray-100 shadow-lg flex flex-col h-full lg:min-h-screen
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>

        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-100">
          <button
            onClick={() => setCurrentStep("input")}
            className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors mb-3 w-full text-left group"
          >
            <ArrowLeft className="h-4 w-4 text-gray-600 group-hover:text-gray-800" />
            <span className="text-gray-600 group-hover:text-gray-800 font-medium text-sm">
              Back to Input
            </span>
          </button>

          <h1 className="text-lg font-bold text-gray-900 mb-1">
            Review Workflow
          </h1>
          <p className="text-xs text-gray-600">
            Edit, reorder, or ask AI to revise any step.
          </p>
        </div>

        {/* Original Request Card */}
        <div className="p-4 border-b border-gray-100">
          <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-gradient-to-r from-rose-500 to-red-500 rounded-md shadow-sm">
                <Stars className="h-3 w-3 text-white" />
              </div>
              <p className="text-rose-800 font-medium text-xs">
                Original Request
              </p>
            </div>
            <p className="text-rose-700 text-xs font-medium italic line-clamp-2">
              &quot;{currentPrompt}&quot;
            </p>
          </div>
        </div>

        {/* Pro Tips Section */}
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg mb-3 shadow-sm">
              <div className="p-1.5 bg-rose-500 rounded-md shadow-sm">
                <Lightbulb className="h-3 w-3 text-white" />
              </div>
              <h3 className="font-medium text-gray-900 text-sm">Pro Tips</h3>
            </div>

            <div className="space-y-2 ml-3">
              <div className="flex items-center gap-2 px-2 py-1 hover:bg-rose-50/50 rounded transition-colors">
                <div className="w-1 h-1 bg-rose-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-600 text-xs">
                  Drag steps to reorder
                </span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 hover:bg-rose-50/50 rounded transition-colors">
                <div className="w-1 h-1 bg-rose-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-600 text-xs">
                  Click refresh for AI alternatives
                </span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 hover:bg-rose-50/50 rounded transition-colors">
                <div className="w-1 h-1 bg-rose-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-600 text-xs">
                  Lower confidence = uncertain areas
                </span>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg mb-3 shadow-sm">
              <div className="p-1.5 bg-red-500 rounded-md shadow-sm">
                <Zap className="h-3 w-3 text-white" />
              </div>
              <h4 className="font-medium text-gray-900 text-sm">Actions</h4>
            </div>
            <div className="grid grid-cols-3 gap-1 ml-3">
              <button
                onClick={undo}
                disabled={!canUndo}
                className="p-2 bg-white hover:bg-rose-50 disabled:bg-gray-50 disabled:text-gray-400 text-gray-600 hover:text-rose-600 rounded-md transition-colors disabled:cursor-not-allowed text-xs flex flex-col items-center gap-1 shadow-sm border-0"
                title="Undo"
              >
                <Undo2 className="h-3 w-3" />
                <span className="text-xs">Undo</span>
              </button>
              <button
                onClick={redo}
                disabled={!canRedo}
                className="p-2 bg-white hover:bg-rose-50 disabled:bg-gray-50 disabled:text-gray-400 text-gray-600 hover:text-rose-600 rounded-md transition-colors disabled:cursor-not-allowed text-xs flex flex-col items-center gap-1 shadow-sm border-0"
                title="Redo"
              >
                <Redo2 className="h-3 w-3" />
                <span className="text-xs">Redo</span>
              </button>
              <button
                onClick={reset}
                className="p-2 bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-md transition-colors text-xs flex flex-col items-center gap-1 shadow-sm border-0"
                title="Reset Workflow"
              >
                <RotateCcw className="h-3 w-3" />
                <span className="text-xs">Reset</span>
              </button>
            </div>
          </div>

          {/* Workflow Stats */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-3 mb-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-gradient-to-r from-gray-500 to-gray-600 rounded-md shadow-sm">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
              <h4 className="font-medium text-gray-900 text-sm">Stats</h4>
            </div>
            <div className="text-xs text-gray-600 ml-6">
              <div className="flex justify-between items-center">
                <span>Steps:</span>
                <span className="font-medium text-gray-800 bg-white px-2 py-0.5 rounded text-xs shadow-sm">
                  {steps.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setCurrentStep("input")}
              className="w-full px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 rounded-lg font-medium transition-all text-xs lg:text-sm shadow-sm border-0"
            >
              ← Back to Edit
            </button>

            <button
              onClick={async () => {
                console.log("Proceeding to confirmation...");
                console.log("Current steps:", steps);
                if (steps.length === 0) {
                  alert(
                    "Please add at least one workflow step before proceeding."
                  );
                  return;
                }

                // Set proceeding state
                setIsProceeding(true);

                // Brief loading for smooth transition
                setIsLoading(true);

                // Wait for a smooth transition
                await new Promise((resolve) => setTimeout(resolve, 800));

                // Navigate to confirmation
                setCurrentStep("confirmation");
                setIsLoading(false);
                setIsProceeding(false);
              }}
              disabled={steps.length === 0 || isProceeding}
              className={`w-full px-3 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-xs lg:text-sm shadow-md border-0 ${
                steps.length === 0 || isProceeding
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white"
              }`}
            >
              {isProceeding ? (
                <>
                  <div className="w-3 h-3 lg:w-4 lg:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Preparing Review...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4" />
                  <span>Proceed to Confirmation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area - Always visible */}
      <div className="flex-1 p-4 lg:p-8 bg-gradient-to-br from-gray-50/80 to-white/80 lg:ml-0 relative z-10">
        {/* Mobile Canvas padding for menu button */}
        <div className="pt-12 lg:pt-0 h-full">
          {/* Workflow Steps - Dynamic Canvas Layout */}
          <div className="h-full min-h-[calc(100vh-120px)] lg:min-h-full">
            <div className="workflow-canvas bg-white/90 backdrop-blur-sm rounded-xl lg:rounded-2xl border border-gray-100 shadow-lg lg:shadow-xl p-4 lg:p-8 h-full relative overflow-hidden">
              {/* Canvas Header */}
              <div className="text-center mb-6 lg:mb-8">
                <h2 className="text-lg lg:text-3xl font-bold text-gray-900 mb-1 lg:mb-2">
                  Workflow Canvas
                </h2>
                <p className="text-gray-600 text-xs lg:text-base">
                  Drag and arrange your workflow steps below
                </p>
              </div>

              {/* Dynamic positioned workflow steps */}
              <div
                className="relative w-full"
                style={{ height: "calc(100% - 120px)" }}
              >
                {steps.map((step, index) => {
                  const position =
                    cardPositions[index] || getDefaultPosition(index);

                  return (
                    <div
                      key={step.id}
                      className={`workflow-card absolute transition-all duration-300 ${
                        dragging === index
                          ? "transform scale-105 z-20 opacity-75 rotate-1"
                          : "z-10 hover:scale-102"
                      }`}
                      style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                      }}
                    >
                      <WorkflowStep
                        step={step}
                        index={index}
                        isDragging={dragging === index}
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                      />
                    </div>
                  );
                })}

                {/* Beautiful soft grid background */}
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                      radial-gradient(circle at 25% 25%, #E11D48 1.2px, transparent 1.2px),
                      radial-gradient(circle at 75% 75%, #BE185D 1.2px, transparent 1.2px)
                    `,
                      backgroundSize: "40px 40px, 60px 60px",
                      backgroundPosition: "0 0, 20px 20px",
                    }}
                  ></div>
                </div>

                {/* Drop zone indicator */}
                {dragging !== null && (
                  <div className="absolute inset-0 border-2 border-dashed border-rose-300 bg-rose-50/30 rounded-xl pointer-events-none backdrop-blur-sm">
                    <div className="flex items-center justify-center h-full">
                      <div className="bg-white/95 backdrop-blur rounded-lg px-4 lg:px-6 py-2 lg:py-3 shadow-lg border-0">
                        <p className="text-rose-600 font-semibold text-sm lg:text-base">
                          Drop anywhere to position
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Add Step Button - Fixed at bottom of canvas */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-sm px-4">
                <button
                  onClick={addNewStep}
                  className="w-full p-3 lg:p-4 border border-gray-200/50 hover:border-rose-300/50 bg-white/95 hover:bg-rose-50/50 backdrop-blur-sm rounded-lg lg:rounded-xl transition-all duration-300 group shadow-md hover:shadow-lg"
                >
                  <div className="flex items-center justify-center gap-2 lg:gap-3">
                    <div className="p-2 lg:p-3 bg-gradient-to-r from-rose-500 to-red-500 rounded-lg group-hover:scale-110 transition-transform shadow-sm">
                      <Plus className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-700 group-hover:text-rose-600 text-sm lg:text-base">
                      Add Custom Step
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
