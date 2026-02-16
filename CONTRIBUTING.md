# Contributing Guide

This guide outlines the process for collaborating on this project. We use the **Feature Branch Workflow**.

## prerequisites
- Node.js (version 20 or later)
- npm (installed automatically with Node.js)

## Getting Started

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone https://github.com/YOUR_USERNAME/leklek-website.git
    cd leklek-website
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Development Workflow

Follow these steps for every new feature or fix. **Do not push directly to `main`.**

### 1. Update your local `main` branch
Always start from up-to-date code.
```bash
git checkout main
git pull origin main
```

### 2. Create a new branch
Name your branch descriptively (e.g., `feature/add-blog-post`, `fix/navbar-typo`).
```bash
git checkout -b feature/your-feature-name
```

### 3. Make your changes
Edit the files as needed. You can preview your changes locally:
```bash
npm start
```
This opens the site at `http://localhost:3000`.

### 4. Commit your changes
Group related changes into commits.
```bash
git add .
git commit -m "Add a clear description of your changes"
```

### 5. Push your branch
Push your branch to GitHub.
```bash
git push -u origin feature/your-feature-name
```

### 6. Create a Pull Request (PR)
1.  Go to the repository on GitHub.
2.  You should see a "Compare & pull request" button for your new branch. Click it.
3.  Fill in the title and description.
4.  Click **Create pull request**.

### 7. Code Review & Checks
- GitHub Actions will automatically run checks (build tests) on your PR.
- Ask your teammate to review the changes.
- If changes are requested, make them locally, commit, and push again. The PR will update automatically.

### 8. Merge
Once the PR is approved and checks pass:
1.  Click **Merge pull request** on GitHub.
2.  Click **Confirm merge**.
3.  The changes are now in `main` and will be automatically deployed.

---

## Important: Branch Protection Setup (Repository Admin Only)
To ensure this workflow is followed, you should protect the `main` branch in GitHub settings:
1.  Go to **Settings** > **Branches**.
2.  Click **Add branch protection rule**.
3.  Branch name pattern: `main`.
4.  Check **Require a pull request before merging**.
5.  Check **Require status checks to pass before merging** (select `test-depoy` or `Build Docusaurus` if available).
6.  Click **Create**.
