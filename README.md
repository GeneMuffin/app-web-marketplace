
# GeneMuffin - Blockchain-Based DNA Data Platform

## Project Overview

GeneMuffin is a blockchain-based platform that allows users to securely store, manage, and monetize their genetic data. The application provides a marketplace where users can purchase DNA test kits, submit their samples, and then control how their genetic information is shared with researchers, pharmaceutical companies, and other stakeholders in the healthcare ecosystem.

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: Shadcn UI library
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API and TanStack Query
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router DOM

## Environment Requirements

- Node.js v18.0.0 or higher
- npm v8.0.0 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/genemuffin.git
   cd genemuffin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
genemuffin/
├── public/              # Static assets
│   └── images/          # Image assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── about/       # About page components
│   │   ├── cart/        # Shopping cart components
│   │   ├── checkout/    # Checkout process components
│   │   ├── home/        # Home page components
│   │   ├── layout/      # Layout components (Header, Sidebar, etc.)
│   │   ├── marketplace/ # Marketplace components
│   │   ├── ui/          # UI library components
│   │   └── wallet/      # Wallet connection components
│   ├── context/         # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   └── styles/          # Global styles
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Core Features

### 1. DNA Test Kit Marketplace
- Browse and purchase DNA test kits
- Secure checkout process with cryptocurrency payments
- Order tracking and management

### 2. Genetic Data Management
- Secure storage of genetic data on blockchain
- Fine-grained access control for data sharing
- Visualization of genetic insights and reports

### 3. Data Categories
- Blood Data: Basic blood parameters and immune indicators
- DNA Traits: Specific gene sequences and disease risk predictions
- Kidney Profile: Chronic disease-related kidney physiological values
- Microbiome: Gut microbiota analysis and health correlations
- Health Risks: Predictive model summaries and individual risk values

### 4. Wallet Integration
- Connect various cryptocurrency wallets
- Manage digital assets and tokens
- Track transaction history

### 5. User Dashboard
- Personalized genetic insights
- Data sharing preferences and settings
- Revenue tracking from data monetization

## Build Process

1. **Development Build**
   ```bash
   npm run dev
   ```

2. **Production Build**
   ```bash
   npm run build
   ```

3. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Testing

### Unit Testing
```bash
npm run test
```


## Deployment

### Standard Deployment
1. Build the production bundle:
   ```bash
   npm run build
   ```

2. Deploy the contents of the `dist` directory to your web server or hosting platform of choice.

### Deployment with CI/CD
The project includes configuration for automated deployment through CI/CD pipelines:

1. GitHub Actions workflow for automated testing and deployment
2. Integration with Vercel/Netlify for preview deployments on pull requests
3. Automated production deployment on merges to the main branch

### Blockchain Network Configuration
For production deployment, ensure the correct blockchain network is configured in the environment variables:
- Ethereum Mainnet for production
- Goerli or Sepolia Testnet for staging environments


