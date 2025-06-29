# Contributing to CineVault

Thank you for your interest in contributing! Follow the steps below to get your changes merged.

---

## 1. Fork the Repository

Click the **Fork** button at the top-right of the [CineVault repo](https://github.com/mdryaan/CinaVault) to create your own copy under your GitHub account.

---

## 2. Clone Your Fork

```bash
git clone https://github.com/<your-username>/CinaVault.git
cd CinaVault
```

Add the original repo as `upstream` so you can pull future updates:

```bash
git remote add upstream https://github.com/mdryaan/CinaVault.git
```

---

## 3. Install Dependencies

```bash
npm install
```

Set up your environment variables:

```bash
cp .env.example .env.local
# Add your TMDB API key inside .env.local
```

---

## 4. Create a Feature Branch

Always branch off from `main`. Use a short, descriptive name:

```bash
git checkout -b feat/your-feature-name
# or for bug fixes:
git checkout -b fix/bug-description
```

---

## 5. Make Your Changes

- Follow the existing code style (TypeScript strict, Tailwind classes, no unnecessary comments).
- Keep commits focused — one logical change per commit.
- Run the dev server to verify nothing is broken:

```bash
npm run dev
```

---

## 6. Commit Your Changes

Write a clear, imperative commit message:

```bash
git add <specific-files>
git commit -m "feat: add genre filter to search page"
```

---

## 7. Sync With Upstream (Optional but Recommended)

Before pushing, pull in any changes that landed on `main` while you were working:

```bash
git fetch upstream
git rebase upstream/main
```

---

## 8. Push Your Branch

```bash
git push origin feat/your-feature-name
```

---

## 9. Open a Pull Request

1. Go to your fork on GitHub.
2. Click **Compare & pull request**.
3. Set the base repository to `mdryaan/CinaVault` and base branch to `main`.
4. Fill in the PR title and description — explain **what** changed and **why**.
5. Submit the PR and wait for a review.

---

## Guidelines

- One PR per feature or fix — keep scope small.
- Do not commit `.env.local` or any API keys.
- Prefer editing existing files over creating new ones.
- All UI changes should work on mobile, tablet, and desktop.

---

Thank you for helping make CineVault better!
