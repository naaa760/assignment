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
      "🎉 Workflow approved! In a real implementation, this would start executing the workflow."
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <button
            onClick={() => setCurrentStep("editing")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Back to Editing</span>
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Final Review
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Review your final workflow before execution. Once approved, the AI
              will execute these steps automatically.
            </p>
          </div>
        </div>

        {/* Workflow Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Workflow Details</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Steps:</span>
                <span className="font-semibold text-lg text-gray-900">
                  {steps.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tools Involved:</span>
                <span className="font-semibold text-lg text-gray-900">
                  {toolsUsed.length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Estimated Time</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ~{estimatedTime} min
              </div>
              <div className="text-sm text-gray-600">
                Depending on data volume
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`p-2 rounded-lg ${
                  hasLowConfidence ? "bg-yellow-600" : "bg-green-600"
                }`}
              >
                {hasLowConfidence ? (
                  <AlertCircle className="h-5 w-5 text-white" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-white" />
                )}
              </div>
              <h3 className="font-semibold text-gray-900">Confidence</h3>
            </div>
            {hasLowConfidence ? (
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-2">
                  {lowConfidenceSteps.length} steps need review
                </div>
                <div className="text-sm text-gray-600">
                  Consider reviewing these steps
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  All steps verified ✓
                </div>
                <div className="text-sm text-gray-600">Ready for execution</div>
              </div>
            )}
          </div>
        </div>

        {/* Tools Overview */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Tools & Integrations
          </h3>
          <div className="flex flex-wrap gap-2">
            {toolsUsed.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-full text-sm font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Low Confidence Warning */}
        {hasLowConfidence && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">
                  ⚠️ Steps with Lower Confidence
                </h3>
                <p className="text-yellow-700 text-sm mb-3">
                  The following steps have confidence scores below 80%. You may
                  want to review them:
                </p>
                <div className="space-y-2">
                  {lowConfidenceSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className="flex items-center gap-3 p-3 bg-white rounded-lg"
                    >
                      <span className="bg-yellow-600 text-white text-sm font-semibold px-2 py-1 rounded">
                        Step {steps.findIndex((s) => s.id === step.id) + 1}
                      </span>
                      <span className="text-yellow-800 font-medium">
                        {step.title}
                      </span>
                      <span className="text-yellow-600 text-sm">
                        {Math.round(step.confidence * 100)}% confidence
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Original Request */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Original Request
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 italic font-medium text-lg">
              &quot;{currentPrompt}&quot;
            </p>
          </div>
        </div>

        {/* Workflow Steps Summary */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
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
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div
                  className={`text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                    step.confidence < 0.8 ? "bg-yellow-600" : "bg-blue-600"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {step.title}
                    </h4>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-200 text-xs rounded-md font-medium">
                      {step.tool}
                    </span>
                    {step.confidence < 0.8 && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 border border-yellow-200 text-xs rounded-md font-medium flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {Math.round(step.confidence * 100)}%
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Ready to Execute?
            </h3>
            <p className="text-gray-600">
              Your workflow is configured and ready to run.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors border border-gray-300 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Editing</span>
            </button>

            <button
              onClick={handleApprove}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Play className="h-5 w-5" />
              <span>🚀 Execute Workflow</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
