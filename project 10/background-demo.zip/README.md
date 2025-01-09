# Background Demo Package

This package contains all the necessary components to implement the Background Demo page.

## Dependencies

Make sure your project has these dependencies installed:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.3",
    "lucide-react": "^0.344.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.2"
  }
}
```

## Installation

1. Copy all files from the `src` directory to your project's `src` directory
2. Make sure you have Tailwind CSS configured in your project
3. Add the page to your router:

```tsx
import BackgroundDemoPage from './pages/BackgroundDemoPage';

// In your router configuration:
<Route path="/background-demo" element={<BackgroundDemoPage />} />
```

## Components Structure

- `BackgroundDemo`: Main component that orchestrates the demo
- `SectionContent`: Handles expandable content sections
- `SectionHeader`: Header component with expand/collapse functionality
- `TableContent`: Displays formatted table data
- `ScoreTable`: Shows scoring information
- `ScoreSection`: Section component for score details
- `ScoringSection`: Section component for scoring explanation
- `DownloadLinkIcon`: Icon component for download functionality