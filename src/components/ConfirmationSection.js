import {
  ArrowLeft,
  Play,
  Download,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Users,
  Calendar,
  FileText,
} from "lucide-react";
import useWorkflowStore from "../store/workflowStore";

export default function ConfirmationSection() {
  const { steps, currentPrompt, setCurrentStep, reset } = useWorkflowStore();

  const handleApprove = () => {
    // Simulate workflow execution
    console.log("Workflow approved and executing:", {
      steps,
      prompt: currentPrompt,
    });

    // In a real implementation, this would:
    // 1. Send the workflow to the backend
    // 2. Start the execution process
    // 3. Navigate to a monitoring/progress view

    alert(
      "Workflow approved! In a real implementation, this would start executing the workflow."
    );
    reset();
  };

  const handleCancel = () => {
    setCurrentStep("editing");
  };

  const estimatedTime = steps.length * 15; // Rough estimate: 15 minutes per step
  const toolsUsed = [...new Set(steps.map((step) => step.tool))];

  const lowConfidenceSteps = steps.filter((step) => step.confidence < 0.8);
  const hasLowConfidence = lowConfidenceSteps.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <button
            onClick={() => setCurrentStep("editing")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Editing
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Workflow Confirmation
          </h1>
          <p className="text-lg text-gray-600">
            Review your final workflow before execution. Once approved, the AI
            will execute these steps automatically.
          </p>
        </div>

        {/* Workflow Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Workflow Details</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Steps:</span>
                <span className="font-medium">{steps.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tools Involved:</span>
                <span className="font-medium">{toolsUsed.length}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Estimated Time</h3>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-green-600">
                ~{estimatedTime} min
              </div>
              <div className="text-sm text-gray-600">
                Depending on data volume
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2 rounded-full ${
                  hasLowConfidence ? "bg-yellow-100" : "bg-green-100"
                }`}
              >
                {hasLowConfidence ? (
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                )}
              </div>
              <h3 className="font-semibold text-gray-900">Confidence</h3>
            </div>
            <div className="space-y-2">
              {hasLowConfidence ? (
                <>
                  <div className="text-2xl font-bold text-yellow-600">
                    {lowConfidenceSteps.length} low
                  </div>
                  <div className="text-sm text-gray-600">
                    Review highlighted steps
                  </div>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-green-600">High</div>
                  <div className="text-sm text-gray-600">
                    All steps well-defined
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tools Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Tools & Integrations
          </h3>
          <div className="flex flex-wrap gap-2">
            {toolsUsed.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Original Request */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Original Request
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-800 italic">&quot;{currentPrompt}&quot;</p>
          </div>
        </div>

        {/* Workflow Steps Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Workflow Steps
          </h3>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-start gap-4 p-4 rounded-lg border-2 ${
                  step.confidence < 0.8
                    ? "border-yellow-200 bg-yellow-50"
                    : "border-gray-100 bg-gray-50"
                }`}
              >
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {step.title}
                    </h4>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium">
                      {step.tool}
                    </span>
                    {step.confidence < 0.8 && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-md font-medium flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {Math.round(step.confidence * 100)}%
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning for Low Confidence Steps */}
        {hasLowConfidence && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">
                  Review Recommended
                </h3>
                <p className="text-yellow-700 text-sm mb-3">
                  Some steps have lower confidence scores. Consider reviewing or
                  asking AI to revise these steps before execution.
                </p>
                <button
                  onClick={() => setCurrentStep("editing")}
                  className="text-yellow-700 hover:text-yellow-800 font-medium text-sm underline"
                >
                  Go back to review steps
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Ready to execute {steps.length} steps across {toolsUsed.length}{" "}
              tools
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
              >
                <XCircle className="h-5 w-5" />
                Make Changes
              </button>

              <button
                onClick={handleApprove}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                Approve & Execute
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
