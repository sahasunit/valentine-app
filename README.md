# Valentine Quiz App 💕

A romantic, interactive quiz application built with React. This personalized quiz features different question types, image displays, and fun interactions designed to create a special moment.

## Features

- **Multiple Question Types:**
  - Text input with validation (Question 1)
  - Single-select buttons (Questions 2-4)
  - Multi-select checkboxes with special "All of the above" logic (Question 5)
  - Yes/No with disappointment message rotation (Question 6)

- **Interactive Elements:**
  - Case-insensitive input validation
  - Auto-advance with countdown timer
  - Rotating error messages and images
  - Success/error message displays with images
  - Final question with special display

- **User Experience:**
  - Visual feedback for correct/incorrect answers
  - Countdown timers for better UX
  - Smooth transitions between questions
  - Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd valentine
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
valentine/
├── public/          # Static files
├── src/
│   ├── assets/      # Image files
│   ├── App.js       # Main application component
│   ├── App.css      # Application styles
│   ├── index.js     # Entry point
│   └── index.css     # Global styles
├── package.json
└── README.md
```

## Technologies Used

- React 19.2.4
- React DOM 19.2.4
- Create React App

## License

Private project - All rights reserved
