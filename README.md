# Brillo Sport Frontend

## Overview
Brillo Sport is a mobile-friendly web application designed to help sports enthusiasts record their activities, network with like-minded individuals, and discover new sports interests. This repository contains the frontend code of the application, built with ReactJS and Chakra UI for a responsive and accessible user interface.

## Features

- User authentication (login, registration, password reset)
- Profile management
- Sport interest selection and management
- Responsive design for both desktop and mobile devices

## Technologies Used
- ReactJS
- TypeScript
- Chakra UI
- Axios 
- React Query
- Vite as a build tool
- Other libraries and tools as listed in `package.json`

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (version 14 or newer)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Iamswart/brillo-sport-frontend.git
   cd brillo-sport-frontend


2. **Install dependencies:**
    ```bash
    npm install

3. **Set up environment variables**

    Create a .env file in the root directory of the project and add the following variables:

    ```bash
    VITE_API_BASE_URL='The base URL of your backend API'
    VITE_API_KEY='API key for accessing your backend services'

    Replace the placeholders with your backend base url and x-api-key.

4. **Running the Application**
    ```bash
    npm run dev

    The API will be available at http://localhost:5173 .

