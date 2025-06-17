import { useState } from "react";
import {
  Edit3,
  Trash2,
  GripVertical,
  Bot,
  Check,
  X,
  RefreshCw,
  AlertTriangle,
  Info,
  MoreHorizontal,
} from "lucide-react";
import useWorkflowStore from "../store/workflowStore";

export default function WorkflowStep({
  step,
  index,
  isDragging = false,
  onMouseDown,
  onTouchStart,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(step.title);
  const [editedDescription, setEditedDescription] = useState(step.description);

  const { updateStep, deleteStep, reviseStep, isLoading } = useWorkflowStore();

  const handleSaveEdit = () => {
    updateStep(step.id, {
      title: editedTitle,
      description: editedDescription,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedTitle(step.title);
    setEditedDescription(step.description);
    setIsEditing(false);
  };

  const handleRevise = () => {
    reviseStep(step.id);
  };

  const handleMouseDown = (e) => {
    if (onMouseDown) {
      onMouseDown(e, index);
    }
  };

  const handleTouchStart = (e) => {
    if (onTouchStart) {
      onTouchStart(e, index);
    }
  };

  const getToolIcon = (tool) => {
    // Simple colored circles like in the image
    const colors = {
      Salesforce: "bg-blue-500",
      HubSpot: "bg-orange-500",
      Slack: "bg-purple-500",
      Gmail: "bg-red-500",
      Zapier: "bg-orange-400",
      Notion: "bg-gray-500",
      Airtable: "bg-yellow-500",
      Custom: "bg-green-500",
    };
    return colors[tool] || "bg-gray-500";
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return "text-green-600";
    if (confidence >= 0.7) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="relative">
      {/* Connection Line to Next Step */}
      {index < 2 && (
        <div className="absolute left-1/2 -bottom-6 w-px h-6 bg-gray-300 transform -translate-x-1/2 z-0"></div>
      )}

      {/* Workflow Card - Clean Style like the image */}
      <div
        className={`
        relative bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 max-w-sm mx-auto
        ${isDragging ? "transform rotate-2 scale-105 shadow-lg z-50" : ""}
        ${isLoading ? "opacity-75" : ""}
      `}
      >
        {/* Drag Handle - Small dots like in the reference image */}
        <div
          className="absolute left-1 top-1/2 transform -translate-y-1/2 cursor-grab active:cursor-grabbing p-1 z-10 select-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          title="Drag to reorder"
        >
          <div className="flex flex-col gap-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        {/* Card Header */}
        <div className="p-4 pb-2 pl-6">
          <div className="flex items-center justify-between mb-2">
            {/* Tool Icon */}
            <div
              className={`w-6 h-6 rounded-full ${getToolIcon(
                step.tool
              )} flex-shrink-0`}
            ></div>

            {/* More Options */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
                title="Edit step"
              >
                <Edit3 className="h-4 w-4" />
              </button>
              <button
                onClick={handleRevise}
                disabled={isLoading}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
                title="Ask AI to revise"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
              </button>
              <button
                onClick={() => deleteStep(step.id)}
                className="p-1 text-gray-400 hover:text-red-600 rounded"
                title="Delete step"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Tool Name */}
          <div className="text-xs text-gray-500 mb-1">{step.tool}</div>

          {/* Step Title */}
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">
            {step.title}
          </h3>
        </div>

        {/* Confidence Badge */}
        {step.confidence < 0.9 && (
          <div className="px-4 pb-3 pl-6">
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getConfidenceColor(
                step.confidence
              )}`}
            >
              {step.confidence < 0.8 ? (
                <AlertTriangle className="h-3 w-3" />
              ) : (
                <Info className="h-3 w-3" />
              )}
              {Math.round(step.confidence * 100)}%
            </span>
          </div>
        )}

        {/* Editing Mode */}
        {isEditing && (
          <div className="p-4 pt-0 border-t border-gray-100 pl-6">
            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                  placeholder="Step title..."
                />
              </div>
              <div>
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  rows={2}
                  className="w-full p-2 text-sm border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-200 resize-none"
                  placeholder="Description..."
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  <Check className="h-3 w-3" />
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                >
                  <X className="h-3 w-3" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
