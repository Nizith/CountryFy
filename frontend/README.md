# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Application Setup

To set up the application, follow these steps:

1. Clone the repository:
   ```bash
   git clone <https://github.com/Nizith/CountryFy.git>
   ```
2. Navigate to the project directory:
   ```bash
   cd frontend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Build Process

To build the application for production, run:
```bash
npm run build
```
This will create a `dist` directory with the production build.

## Usage Instructions

To start the development server, use:
```bash
npm run dev
```
This will start the application on `http://localhost:5173`.

## APIs and Challenges

### Chosen APIs

- **REST Countries API**: Used to fetch data about all countries, including their names, regions, and other details. Utilized in components like `FilterTab` and `UserContent`.

- **REST Countries API for Independent Countries**: Fetches data about independent countries, used in the `Independants` component.

- **REST Countries API for Country Search**: Allows searching for countries by name, used in the `NavBar` component.

- **REST Countries API for Country Details**: Fetches detailed information about a specific country using its alpha code, used in the `CountryName` component.

### Challenges and Resolutions

- **Challenge 1**: Using the region API did not provide the desired data, resulting in different data than expected.
  - **Resolution**: Used the 'all' API and filtered the regions to obtain the correct data.

- **Challenge 2**: The backend for authentication, login, signup, and user management did not work when deploying.
  - **Resolution**: Implemented a local storage approach for managing authentication and user data, as the backend could not be deployed.

## Hosted Application

The application is hosted in vercel.

[Hosted Application URL](https://country-5ao2vg5oe-niziths-projects.vercel.app/)
