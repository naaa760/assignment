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
} from "lucide-react";
import useWorkflowStore from "../store/workflowStore";

export default function WorkflowStep({ step, index, isDragging = false }) {
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

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return "bg-green-100 text-green-700";
    if (confidence >= 0.7) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const getConfidenceIcon = (confidence) => {
    if (confidence >= 0.9) return <Check className="h-3 w-3" />;
    if (confidence >= 0.7) return <Info className="h-3 w-3" />;
    return <AlertTriangle className="h-3 w-3" />;
  };

  const getToolColor = (tool) => {
    const colors = {
      Salesforce: "bg-blue-100 text-blue-700",
      HubSpot: "bg-orange-100 text-orange-700",
      Slack: "bg-purple-100 text-purple-700",
      Gmail: "bg-red-100 text-red-700",
      Zapier: "bg-indigo-100 text-indigo-700",
      Notion: "bg-gray-100 text-gray-700",
      Airtable: "bg-yellow-100 text-yellow-700",
    };
    return colors[tool] || "bg-gray-100 text-gray-700";
  };

  return (
    <div
      className={`
      group bg-white rounded-xl border-2 transition-all duration-200 
      ${
        isDragging
          ? "border-blue-300 shadow-lg rotate-1"
          : "border-gray-200 hover:border-gray-300"
      }
      ${isLoading ? "opacity-75" : ""}
    `}
    >
      {/* Drag Handle */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
          <GripVertical className="h-5 w-5" />
        </div>

        <div className="flex items-center gap-2 flex-1">
          <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
            Step {index + 1}
          </span>

          <div
            className={`px-2 py-1 rounded-md text-xs font-medium ${getToolColor(
              step.tool
            )}`}
          >
            {step.tool}
          </div>

          <div
            className={`px-2 py-1 rounded-md text-xs font-medium ${getConfidenceColor(
              step.confidence
            )} flex items-center gap-1`}
          >
            {getConfidenceIcon(step.confidence)}
            {Math.round(step.confidence * 100)}%
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(!isEditing)}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit step"
          >
            <Edit3 className="h-4 w-4" />
          </button>

          <button
            onClick={handleRevise}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            title="Ask AI to revise"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>

          <button
            onClick={() => deleteStep(step.id)}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete step"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Step Title
              </label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSaveEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Check className="h-4 w-4" />
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {step.title}
            </h3>

            <p className="text-gray-700 leading-relaxed">{step.description}</p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    AI Reasoning ({step.agent})
                  </p>
                  <p className="text-sm text-blue-700">{step.reasoning}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
