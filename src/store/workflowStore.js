import { create } from "zustand";

const useWorkflowStore = create((set, get) => ({
  // Main state
  currentPrompt: "",
  steps: [],
  isLoading: false,
  currentStep: "input", // 'input', 'editing', 'confirmation'

  // History for undo functionality
  history: [],
  historyIndex: -1,

  // Editing state
  editingStepId: null,

  // Actions
  setCurrentPrompt: (prompt) => set({ currentPrompt: prompt }),

  setIsLoading: (loading) => set({ isLoading: loading }),

  setCurrentStep: (step) => set({ currentStep: step }),

  // Save current state to history before making changes
  saveToHistory: () => {
    const state = get();
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push({
      steps: JSON.parse(JSON.stringify(state.steps)),
      timestamp: Date.now(),
    });
    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  // Undo functionality
  undo: () => {
    const state = get();
    if (state.historyIndex > 0) {
      const previousState = state.history[state.historyIndex - 1];
      set({
        steps: previousState.steps,
        historyIndex: state.historyIndex - 1,
      });
    }
  },

  // Redo functionality
  redo: () => {
    const state = get();
    if (state.historyIndex < state.history.length - 1) {
      const nextState = state.history[state.historyIndex + 1];
      set({
        steps: nextState.steps,
        historyIndex: state.historyIndex + 1,
      });
    }
  },

  // Generate mock AI workflow
  generateWorkflow: async (prompt) => {
    set({ isLoading: true });

    // Simulate AI delay
    await new Promise((resolve) =>
      setTimeout(resolve, 2000 + Math.random() * 1000)
    );

    const mockSteps = generateMockSteps(prompt);

    // Save to history before setting new steps
    get().saveToHistory();

    set({
      steps: mockSteps,
      isLoading: false,
      currentStep: "editing",
    });
  },

  // Step management
  updateStep: (stepId, updates) => {
    get().saveToHistory();
    set((state) => ({
      steps: state.steps.map((step) =>
        step.id === stepId ? { ...step, ...updates } : step
      ),
    }));
  },

  deleteStep: (stepId) => {
    get().saveToHistory();
    set((state) => ({
      steps: state.steps.filter((step) => step.id !== stepId),
    }));
  },

  reorderSteps: (dragIndex, hoverIndex) => {
    get().saveToHistory();
    set((state) => {
      const draggedStep = state.steps[dragIndex];
      const newSteps = [...state.steps];
      newSteps.splice(dragIndex, 1);
      newSteps.splice(hoverIndex, 0, draggedStep);
      return { steps: newSteps };
    });
  },

  setEditingStep: (stepId) => set({ editingStepId: stepId }),

  // Add new step
  addStep: (step) => {
    get().saveToHistory();
    set((state) => ({
      steps: [
        ...state.steps,
        {
          ...step,
          id: step.id || `step-${Date.now()}`,
          order: state.steps.length + 1,
        },
      ],
    }));
  },

  // Ask AI to revise a step
  reviseStep: async (stepId) => {
    set({ isLoading: true });

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const step = get().steps.find((s) => s.id === stepId);
    if (step) {
      const revisedStep = generateRevisedStep(step);
      get().updateStep(stepId, revisedStep);
    }

    set({ isLoading: false });
  },

  // Reset workflow
  reset: () =>
    set({
      currentPrompt: "",
      steps: [],
      isLoading: false,
      currentStep: "input",
      editingStepId: null,
      history: [],
      historyIndex: -1,
    }),
}));

// Mock data generators
function generateMockSteps(prompt) {
  const tools = [
    "Salesforce",
    "HubSpot",
    "Slack",
    "Gmail",
    "Zapier",
    "Notion",
    "Airtable",
  ];
  const agents = [
    "Data Agent",
    "Communication Agent",
    "Analytics Agent",
    "Automation Agent",
  ];

  const stepTemplates = [
    {
      title: "Export current data",
      description: "Extract and backup existing records for analysis",
      reasoning:
        "We need to understand the current state before making changes",
    },
    {
      title: "Identify duplicates",
      description: "Scan for duplicate entries using fuzzy matching",
      reasoning: "Duplicates are the most common cause of CRM clutter",
    },
    {
      title: "Standardize data formats",
      description: "Normalize phone numbers, addresses, and company names",
      reasoning:
        "Consistent formatting improves data quality and searchability",
    },
    {
      title: "Merge duplicate contacts",
      description: "Combine duplicate entries while preserving important data",
      reasoning:
        "Consolidating duplicates reduces confusion and improves efficiency",
    },
    {
      title: "Update contact stages",
      description: "Review and update deal stages based on recent activity",
      reasoning: "Accurate pipeline stages are crucial for sales forecasting",
    },
    {
      title: "Generate cleanup report",
      description: "Create a summary of changes made and recommendations",
      reasoning:
        "Documentation helps track improvements and plan future maintenance",
    },
  ];

  const numSteps = Math.min(
    stepTemplates.length,
    3 + Math.floor(Math.random() * 4)
  );
  const selectedTemplates = stepTemplates.slice(0, numSteps);

  return selectedTemplates.map((template, index) => ({
    id: `step-${Date.now()}-${index}`,
    title: template.title,
    description: template.description,
    tool: tools[Math.floor(Math.random() * tools.length)],
    reasoning: template.reasoning,
    agent: agents[Math.floor(Math.random() * agents.length)],
    confidence: 0.7 + Math.random() * 0.3,
    order: index + 1,
  }));
}

function generateRevisedStep(originalStep) {
  const improvements = [
    "with enhanced error handling",
    "using advanced filtering",
    "with automated validation",
    "including backup procedures",
    "with real-time monitoring",
    "using machine learning optimization",
  ];

  const improvement =
    improvements[Math.floor(Math.random() * improvements.length)];

  return {
    description: `${originalStep.description} ${improvement}`,
    reasoning: `${originalStep.reasoning}. This revision adds reliability and performance improvements.`,
    confidence: Math.min(1, originalStep.confidence + 0.1),
  };
}

export default useWorkflowStore;
