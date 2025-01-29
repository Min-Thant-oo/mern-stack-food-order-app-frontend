# MERN Stack Frontend

A TypeScript-based frontend application built with React + Vite, featuring Auth0 authentication integration.

## Prerequisites

- Node.js (22.10.5)
- npm or yarn
- Auth0 account and application setup
- Google Analytics 4 account

## Environment Setup

1. Create a `.env` file in the root directory
2. Add the following environment variables:

```env
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_AUTH0_AUDIENCE=your_auth0_audience
VITE_GA_MEASUREMENT_ID=your_google_analytics_id
VITE_API_BASE_URL=http://localhost:7000
VITE_AUTH0_CALLBACK_URI=http://localhost:5173
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Min-Thant-oo/mern-stack-food-order-app-frontend.git [folder-name]
cd [repository-name]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will start running at `http://localhost:5173`

## Configuration

### Auth0 Setup
1. Create an Auth0 application in your Auth0 dashboard
2. Set the callback URL to `http://localhost:5173`
3. Copy your Auth0 domain and client ID to the `.env` file
4. For `VITE_AUTH0_AUDIENCE`:
   - Go to your Auth0 dashboard
   - Navigate to "APIs" section
   - Create a new API or select existing one
   - The "API Identifier" is your audience value
   - You can check backend installation steps [here](https://github.com/Min-Thant-oo/mern-stack-food-order-app-backend)

### Google Analytics Setup
1. Go to Google Analytics dashboard (https://analytics.google.com)
2. Create a new property if you haven't already
3. During setup, select "Web" as your platform
4. Select "Show advanced options" and enable "Create a Universal Analytics property"
5. Once created, go to Admin → Property Settings
6. Your `VITE_GA_MEASUREMENT_ID` will be in the format "G-XXXXXXXXXX"

## Tech Stack

- React + Vite
- TypeScript
- Auth0 Authentication
- Google Analytics integration

Check out live demo [here](https://solareats.minthantoo.com). 

Sign in using the following credentials:

email - test@test.com

password - Password@1