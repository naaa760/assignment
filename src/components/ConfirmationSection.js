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
  Stars,
  Sparkles,
  Zap,
  Heart,
  Shield,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-6xl mx-auto p-4 lg:p-8">
        {/* Stunning Header with Glass Effect */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 shadow-xl p-6 lg:p-8 mb-8 relative overflow-hidden">
          {/* Gradient Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-200/30 to-gray-300/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-300/30 to-gray-400/30 rounded-full blur-xl"></div>

          <button
            onClick={() => setCurrentStep("editing")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-800 rounded-xl transition-all duration-300 mb-6 border border-gray-100 shadow-sm group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">Back to Editing</span>
          </button>

          <div className="text-center relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-gray-700 to-black rounded-2xl shadow-lg">
                <Stars className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent">
                Final Review
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Review your final workflow before execution. Once approved, the AI
              will execute these steps automatically.
            </p>
          </div>
        </div>

        {/* Beautiful Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Workflow Details Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 shadow-lg p-6 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-gray-700 to-black rounded-xl shadow-md group-hover:scale-110 transition-transform">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Workflow Details</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-100">
                <span className="text-gray-600 font-medium">Total Steps:</span>
                <span className="font-bold text-xl text-gray-800 bg-white px-3 py-1 rounded-lg shadow-sm">
                  {steps.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-600 font-medium">
                  Tools Involved:
                </span>
                <span className="font-bold text-xl text-gray-800 bg-white px-3 py-1 rounded-lg shadow-sm">
                  {toolsUsed.length}
                </span>
              </div>
            </div>
          </div>

          {/* Estimated Time Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 shadow-lg p-6 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-black to-gray-700 rounded-xl shadow-md group-hover:scale-110 transition-transform">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Estimated Time</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent mb-2">
                ~{estimatedTime} min
              </div>
              <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-lg inline-block border border-gray-100">
                Depending on data volume
              </div>
            </div>
          </div>

          {/* Confidence Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 shadow-lg p-6 hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform ${
                  hasLowConfidence
                    ? "bg-gradient-to-r from-gray-600 to-gray-700"
                    : "bg-gradient-to-r from-gray-700 to-black"
                }`}
              >
                {hasLowConfidence ? (
                  <AlertCircle className="h-5 w-5 text-white" />
                ) : (
                  <Shield className="h-5 w-5 text-white" />
                )}
              </div>
              <h3 className="font-semibold text-gray-900">Confidence</h3>
            </div>
            {hasLowConfidence ? (
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700 mb-2">
                  {lowConfidenceSteps.length} steps need review
                </div>
                <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-lg inline-block border border-gray-100">
                  Consider reviewing these steps
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-black bg-clip-text text-transparent mb-2">
                  All steps verified ✓
                </div>
                <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-lg inline-block border border-gray-100">
                  Ready for execution
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Elegant Tools Overview */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 shadow-lg p-6 lg:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-gray-600 to-black rounded-xl shadow-md">
              <Users className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Tools & Integrations
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {toolsUsed.map((tool, index) => (
              <span
                key={tool}
                className={`px-4 py-2 rounded-xl text-sm font-medium border border-gray-100 shadow-sm transition-all duration-300 hover:scale-105 ${
                  index % 3 === 0
                    ? "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700"
                    : index % 3 === 1
                    ? "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700"
                    : "bg-gradient-to-r from-gray-200 to-gray-50 text-gray-700"
                }`}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Elegant Low Confidence Warning */}
        {hasLowConfidence && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-100 rounded-2xl p-6 lg:p-8 mb-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl shadow-md flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-3 text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Steps Needing Your Attention
                </h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  The following steps have confidence scores below 80%. You may
                  want to review them:
                </p>
                <div className="space-y-3">
                  {lowConfidenceSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className="flex items-center gap-4 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <span className="bg-gradient-to-r from-gray-700 to-black text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-sm">
                        Step {steps.findIndex((s) => s.id === step.id) + 1}
                      </span>
                      <span className="text-gray-800 font-semibold flex-1">
                        {step.title}
                      </span>
                      <span className="text-gray-600 text-sm bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                        {Math.round(step.confidence * 100)}% confidence
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Beautiful Original Request */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 shadow-lg p-6 lg:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-black to-gray-700 rounded-xl shadow-md">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Original Request
            </h3>
          </div>
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-100 rounded-xl p-6 shadow-sm">
            <p className="text-gray-800 italic font-medium text-lg leading-relaxed">
              &quot;{currentPrompt}&quot;
            </p>
          </div>
        </div>

        {/* Stunning Workflow Steps Summary */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 shadow-lg p-6 lg:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-gray-700 to-black rounded-xl shadow-md">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Workflow Steps</h3>
          </div>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-start gap-4 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 ${
                  step.confidence < 0.8
                    ? "bg-gradient-to-r from-gray-50 to-gray-100"
                    : "bg-gradient-to-r from-gray-50 to-white"
                }`}
              >
                <div
                  className={`text-white w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md ${
                    step.confidence < 0.8
                      ? "bg-gradient-to-r from-gray-700 to-black"
                      : "bg-gradient-to-r from-gray-600 to-gray-700"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h4 className="font-bold text-gray-900 text-lg">
                      {step.title}
                    </h4>
                    <span className="px-3 py-1.5 bg-white text-gray-700 border border-gray-100 text-xs rounded-lg font-semibold shadow-sm">
                      {step.tool}
                    </span>
                    {step.confidence < 0.8 && (
                      <span className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-100 text-xs rounded-lg font-semibold flex items-center gap-1.5 shadow-sm">
                        <AlertCircle className="h-3 w-3" />
                        {Math.round(step.confidence * 100)}%
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spectacular Action Buttons */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 shadow-xl p-6 lg:p-8 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gray-200/20 to-gray-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-gray-300/20 to-gray-400/20 rounded-full blur-2xl"></div>

          <div className="text-center mb-8 relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-gray-700 to-black rounded-2xl shadow-lg">
                <Play className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent">
                Ready to Execute?
              </h3>
            </div>
            <p className="text-gray-600 text-lg">
              Your workflow is configured and ready to run.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button
              onClick={handleCancel}
              className="px-8 py-4 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 text-gray-700 hover:text-gray-900 rounded-xl font-semibold transition-all duration-300 border border-gray-100 flex items-center justify-center gap-3 shadow-md hover:shadow-lg group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Editing</span>
            </button>

            <button
              onClick={handleApprove}
              className="px-10 py-4 bg-gradient-to-r from-gray-700 to-black hover:from-gray-800 hover:to-gray-900 text-white rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 group"
            >
              <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>🚀 Execute Workflow</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
