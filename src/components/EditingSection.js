import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Plus,
  Undo2,
  Redo2,
  RotateCcw,
  Lightbulb,
} from "lucide-react";
import useWorkflowStore from "../store/workflowStore";
import WorkflowStep from "./WorkflowStep";

export default function EditingSection() {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

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

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (
      draggedIndex !== null &&
      dragOverIndex !== null &&
      draggedIndex !== dragOverIndex
    ) {
      reorderSteps(draggedIndex, dragOverIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleDragEnd();
  };

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentStep("input")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Input
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={undo}
                disabled={!canUndo}
                className="p-2 text-gray-400 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-blue-50 transition-colors"
                title="Undo"
              >
                <Undo2 className="h-4 w-4" />
              </button>

              <button
                onClick={redo}
                disabled={!canRedo}
                className="p-2 text-gray-400 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-blue-50 transition-colors"
                title="Redo"
              >
                <Redo2 className="h-4 w-4" />
              </button>

              <button
                onClick={reset}
                className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                title="Start Over"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Review Your Workflow
            </h1>
            <p className="text-gray-600">
              Edit, reorder, or ask AI to revise any step. When you&apos;re
              happy with the workflow, proceed to confirmation.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium mb-1">
              Original Request:
            </p>
            <p className="text-blue-800">{currentPrompt}</p>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800 mb-1">Pro Tips</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Drag steps by the grip handle to reorder them</li>
                <li>
                  • Click the refresh icon to ask AI for alternative approaches
                </li>
                <li>
                  • Lower confidence scores indicate areas where AI is less
                  certain
                </li>
                <li>
                  • Edit steps directly to customize them for your specific
                  needs
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="space-y-4 mb-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
              className={`transition-all duration-200 ${
                dragOverIndex === index ? "transform scale-105" : ""
              }`}
            >
              <WorkflowStep
                step={step}
                index={index}
                isDragging={draggedIndex === index}
              />
            </div>
          ))}
        </div>

        {/* Add Step Button */}
        <div className="mb-8">
          <button
            onClick={addNewStep}
            className="w-full p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
          >
            <div className="flex items-center justify-center gap-3">
              <Plus className="h-6 w-6 text-gray-400 group-hover:text-blue-600" />
              <span className="text-gray-600 group-hover:text-blue-700 font-medium">
                Add Custom Step
              </span>
            </div>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {steps.length} steps in your workflow
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep("input")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Back to Edit Request
              </button>

              <button
                onClick={() => setCurrentStep("confirmation")}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium flex items-center gap-2"
              >
                <CheckCircle className="h-5 w-5" />
                Proceed to Confirmation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
