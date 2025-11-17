# Lewis-Tac-Azure

React Tic-Tac-Toe app ("Lewis-Tac-Azure") designed to be deployed using **Azure Static Web Apps** with **GitHub Actions (CI/CD)**.

## How to use this project

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run locally:

   ```bash
   npm start
   ```

3. Build for production:

   ```bash
   npm run build
   ```

4. Push this folder to GitHub, then in the Azure Portal create a **Static Web App**:
   - Source: GitHub
   - Framework: React
   - App location: `/`
   - App artifact location: `build`

Azure will generate a GitHub Actions workflow that builds and deploys this app automatically on each push.

From the user's perspective, the app is named **Lewis-Tac-Azure**.
