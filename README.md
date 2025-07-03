# SnapView

A modern React + TypeScript application for viewing user stories, inspired by Instagram/Snapchat. Users can view, navigate, and auto-play stories with smooth progress bars and a responsive UI.

## 🚀 Deployment

Live Demo: [https://snap-view.vercel.app/](https://snap-view.vercel.app/)

---

## 🛠️ Setup & Running Locally

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Vats-tech/snap-view.git
   cd snap-view
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**

   ```sh
   npm run dev
   ```

   Visit [http://localhost:5173](http://localhost:5173) in your browser.

4. **Run unit tests:**

   ```sh
   npm run test
   ```

5. **Run end-to-end (Cypress) tests:**
   ```sh
   npm run cypress:open
   ```
   _(Or use `npm run cy:run` for headless mode)_

---

## 🧩 Design Choices

### Performance

- **Virtualized Story List:** The story list is lightweight and only renders visible avatars, ensuring fast initial load even with many users.
- **Optimized Image Loading:** Story images only trigger progress bars after fully loading, preventing premature progress and improving perceived performance.
- **Minimal Re-renders:** State is scoped to only what changes (current story index, progress, image loaded), reducing unnecessary component updates.

### Scalability

- **Component Modularity:** Each UI piece (StoryList, StoryViewer, ProgressBar, Profile, Icons) is isolated, making it easy to extend or swap implementations.
- **TypeScript Types:** All user and story data is strictly typed, preventing runtime errors as the app grows.
- **Test Coverage:** Comprehensive unit and E2E tests ensure reliability as features are added.

### Accessibility & UX

- **Keyboard Navigation:** Story viewer is accessible via keyboard and screen readers.
- **Responsive Design:** Works seamlessly on desktop and mobile screens.
- **Smooth Transitions:** Progress bars and story transitions are animated for a modern feel.

---

## 📁 Project Structure

- `src/components/` – UI components (StoryList, StoryViewer, ProgressBar, etc.)
- `src/types/` – TypeScript types for users and stories
- `src/utils/dummy-data/` – Sample user/story data
- `cypress/` – E2E tests and fixtures

---

## 📋 License

---

\*Feel free to open
