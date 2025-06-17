import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import useWorkflowStore from "../store/workflowStore";

export default function InputSection() {
  const [input, setInput] = useState("");
  const { generateWorkflow, isLoading, setCurrentPrompt, currentPrompt } =
    useWorkflowStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      setCurrentPrompt(input);
      await generateWorkflow(input);
    }
  };

  const examplePrompts = [
    "Clean up my CRM by removing duplicates and standardizing data",
    "Organize my email inbox and set up automated filters",
    "Sync data between Salesforce and HubSpot",
    "Create a customer onboarding workflow with Slack notifications",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">AI Teammate</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Describe your task in plain English and get back an AI-generated,
            editable multi-step workflow that you can customize and approve.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your task... (e.g., 'Clean up my CRM')"
              className="w-full h-32 p-6 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-none transition-all duration-200 shadow-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Generate Workflow</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Try these examples:
            </h3>
            <div className="space-y-3">
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInput(prompt)}
                  disabled={isLoading}
                  className="w-full text-left p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <p className="text-gray-700 text-sm">{prompt}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              What happens next?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    AI analyzes your request
                  </p>
                  <p className="text-sm text-gray-600">
                    Our AI breaks down your task into logical steps
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    Review and customize
                  </p>
                  <p className="text-sm text-gray-600">
                    Edit, reorder, or ask AI to revise any step
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    Approve and execute
                  </p>
                  <p className="text-sm text-gray-600">
                    Confirm your workflow and let AI handle the rest
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {currentPrompt && (
          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-600 font-medium">
              Current request:
            </p>
            <p className="text-blue-800">{currentPrompt}</p>
          </div>
        )}
      </div>
    </div>
  );
}
