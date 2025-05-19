
# GeneMuffin Web Application

![GeneMuffin Logo](public/images/Genemuffin-Logo-s.png)

## Project Overview

GeneMuffin is a web platform dedicated to genetic optimization and DNA insights. The application serves as a hub for health optimization through advanced genetic testing, a DNA marketplace, and matchmaking services. It aims to transform health insights through innovative genetic analysis, giving users personalized recommendations and data ownership.

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI component library
- **State Management**: React Query (Tanstack Query)
- **Routing**: React Router v6
- **Animation**: Custom animations with Tailwind's animation utilities
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation
- **Notifications**: Sonner toast system

## Environment Requirements

- Node.js v18.0.0 or higher
- npm v9.0.0 or higher (or equivalent yarn/pnpm)
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd genemuffin-web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
genemuffin-web/
├── public/             # Static assets
│   └── images/         # Image assets
├── src/
│   ├── assets/         # Project assets
│   ├── components/     # Reusable UI components
│   │   └── ui/         # Shadcn UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility libraries and functions
│   ├── pages/          # Page components
│   └── utils/          # Utility functions
├── index.html          # HTML entry point
└── vite.config.ts      # Vite configuration
```

## Core Features

### Advanced Genetic Testing
Comprehensive DNA analysis providing insights into health markers, genetic predispositions, and personalized recommendations.

### DNA Marketplace
A platform for users to securely monetize their genetic data while maintaining ownership and control.

### Genetic Matchmaking
Tools for relationship compatibility based on genetic insights, helping users find compatible partners.

### Web3 Integration
Blockchain-based security and data ownership features, ensuring users maintain control of their genetic information.

## Build Process

1. **Development Build**:
   ```bash
   npm run dev
   ```

2. **Production Build**:
   ```bash
   npm run build
   ```


## Testing

The application uses a combination of unit, integration, and end-to-end tests to ensure reliability:

1. **Run Tests**:
   ```bash
   npm run test
   ```


## Deployment

The application is configured for continuous deployment:

1. **Local Deployment**:
   After building the application, serve the `dist` folder with a static file server.

2. **Production Deployment**:
   The application can be deployed to any static hosting service like Vercel, Netlify, or AWS S3.

