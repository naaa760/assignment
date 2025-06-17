# Workflow Editing Interface

![image](https://github.com/user-attachments/assets/f08394f2-b0fc-43ab-b209-24e489a5a444)

Project Link: https://assignment-mmau.vercel.app/

A beautiful, responsive workflow editing interface built with React that allows users to create, edit, and manage AI-powered workflow steps through an intuitive drag-and-drop canvas.

## Features

- **Drag & Drop Canvas**: Freely position workflow steps anywhere on the canvas
- **Responsive Design**: Fully functional on desktop, tablet, and mobile devices
- **Real-time Editing**: Live updates and visual feedback during interactions
- **Beautiful UI**: Modern glass morphism design with subtle animations
- **Background Integration**: Custom background image with elegant dot grid overlay
- **Multi-step Process**: Input → Editing → Confirmation flow
- **State Management**: Persistent workflow state with undo/redo functionality

## Assumptions Made

### **User Interaction Patterns**

- Users prefer visual drag-and-drop over text-based reordering
- Mobile users need touch-friendly interfaces with larger buttons and swipe gestures
- Users want immediate visual feedback during drag operations
- Workflow steps should be freely positionable rather than constrained to rows


### **Technical Architecture**

- **React Hooks**: Assumed functional components with hooks are preferred over class components
- **Zustand Store**: Assumed lightweight state management is sufficient for this scope
- **CSS-in-JS**: Used Tailwind CSS for rapid development and consistent styling
- **Event Handling**: Assumed modern mouse/touch event APIs are supported

### **Performance Considerations**

- **Component Optimization**: Assumed re-renders should be minimized during drag operations
- **Event Listeners**: Assumed proper cleanup of event listeners is essential
- **Image Loading**: Assumed background images should load asynchronously without blocking UI


**Edge Cases Covered:**

- Cards dragged beyond canvas boundaries
- Simultaneous drag operations (prevented with dragging state)
- Mouse leave events during drag operations
- Touch vs mouse event compatibility
- Rapid drag movements causing event loss


**Edge Cases Covered:**

- Screen orientation changes during use
- Very small screen sizes (< 320px width)
- Sidebar overlapping with canvas content on mobile
- Touch scrolling conflicts with drag operations
- Keyboard navigation accessibility

**Edge Cases Covered:**

- Undo/redo at history boundaries
- State corruption during rapid interactions
- Memory leaks from large history arrays
- Component unmounting during async operations
- Browser refresh/navigation state loss


**Edge Cases Covered:**

- Background image loading failures
- Different deployment environments (relative vs absolute paths)
- High DPI displays and image scaling
- Browser caching issues
- Slow network conditions

## What I'd Improve With More Time

### **Performance Optimizations**

- **Virtual Canvas**: Implement virtualization for large numbers of workflow steps
- **Debounced Updates**: Add debouncing to drag position updates to reduce re-renders
- **Memoization**: Use React.memo and useMemo for expensive calculations
- **Bundle Splitting**: Implement code splitting for better initial load times
- **Image Optimization**: Add WebP support with fallbacks for better performance



### **Accessibility Improvements**

- **Keyboard Navigation**: Full keyboard support for drag operations
- **Screen Reader Support**: ARIA labels and live regions for dynamic content
- **High Contrast Mode**: Enhanced visibility for users with visual impairments
- **Reduced Motion**: Respect prefers-reduced-motion for animations
- **Focus Management**: Proper focus handling during modal interactions


### **Testing & Quality Assurance**

- **Unit Tests**: Comprehensive test coverage with Jest and React Testing Library
- **Integration Tests**: End-to-end testing with Cypress or Playwright
- **Visual Regression Testing**: Automated screenshot comparison
- **Performance Testing**: Bundle size analysis and runtime performance metrics
- **Cross-browser Testing**: Compatibility across all modern browsers



## Technology Stack

- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS with custom utilities
- **State Management**: Zustand for lightweight state
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Create React App (can be migrated to Vite)
- **Deployment**: Static hosting compatible (Vercel, Netlify, etc.)

### **Component Structure**

- **Separation of Concerns**: Each step (Input, Editing, Confirmation) is a separate component
- **Reusable Components**: WorkflowStep component handles individual step rendering
- **Custom Hooks**: State management abstracted into Zustand store
- **Event Handling**: Mouse events preferred over HTML5 drag API for better control


This project demonstrates modern React development practices with a focus on user experience, performance, and maintainability.
