/**
 * DsaVault catalog
 * ---------------
 * To publish a new note:
 *   1. Copy notes/TEMPLATE.html → notes/<slug>/index.html
 *   2. Fill in the page (keep the ← DsaVault link as ../../)
 *   3. Add one object here with matching `path`
 *   4. Push. GitHub Pages serves /notes/<slug>/
 */
window.DSA_NOTES = [
  {
    id: "array-techniques",
    path: "array-techniques",
    title: "Array Techniques & Algorithmic Patterns",
    summary:
      "Prefix sums, contribution method, next permutation, even-sum deltas, sliding windows, and two pointers — from brute force to O(1) range queries.",
    tags: ["arrays", "prefix-sum", "contribution", "two-pointers"],
    features: ["Visualizer", "Calculator", "Quiz"],
    badge: "Masterclass",
    date: "2026-08-20",
    accent: "#d97706",
  },
  {
    id: "sliding-window-two-pointers",
    path: "sliding-window-two-pointers",
    title: "Sliding Window & Two Pointers",
    summary:
      "Fixed and variable windows, opposite-end pointers, and 3-way partition. How amortized O(N) replaces nested loops.",
    tags: ["sliding-window", "two-pointers", "amortized"],
    features: ["Visualizer", "Complexity chart", "Quiz"],
    badge: "O(N) Path",
    date: "2026-08-18",
    accent: "#0f766e",
  },
];
