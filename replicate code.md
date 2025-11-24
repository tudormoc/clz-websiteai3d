# Prompt for Industrial Luxury Bookbinding App (CLZ)

**Role:** Senior Creative Frontend Engineer
**Stack:** React 18+, TypeScript, Tailwind CSS, Framer Motion, Three.js (@react-three/fiber, @react-three/drei).

**Project Goal:**
Create a single-page, high-performance "Industrial Luxury" website for **Cooperativa Lavoratori Zanardi (CLZ)**.

**Constraints:**
- **NO Softcovers:** Hardback/board books only.
- **NO Spine Hubs:** Clean, modern industrial spines.
- **Focus:** Speed, performance, and maximum user interaction.

**Key Sections & Functionality:**

1.  **Hero Section (3D Immersive):**
    -   Floating paper and gold leaf particles.

2.  **Legacy Section (Story):**
    -   History since 1963.
    -   Emphasis on evolution from Artisan to Industry.

3.  **The Process (Chronological Timeline):**
    -   **Concept:** Show the evolution of the book object.
    -   **Stages:** Printed Sheets -> Cutting -> Folding -> Gathering (Sewing) -> Book Block -> Cover & Details.
    -   **Visuals:** Animations transforming from flat sheet -> folded signature -> stacked block -> case bound book.

4.  **Book Anatomy (3D Interaction):**
    -   **Visualizer:** A fully 3D procedural book (Canvas).
    -   **Interaction:** **Highlight & Isolate**.
        -   Selected parts (e.g., Spine) must GLOW/HIGHLIGHT in Gold.
        -   Selection of "Endpapers" -> **Opens the book**.
        -   Selection of "Headband" -> **Camera rotates** to top view.
        -   **Controls:** OrbitControls with Zoom enabled (constrained) + Drag to rotate.
        -   **Mobile:** Flex layout (Canvas top, list bottom).
    -   **Style:** Distinct materials for Board (Dark), Block (White), and Endpapers (Cream).

5.  **Scale Matters (Technical Configurator):**
    -   **Visualizer:** Compact Technical Grid with Fluid Scaling.
    -   **Interaction:** **Dual Horizontal Sliders** in a control deck below the visual. No vertical sliders.
    -   **Data:** Millimeters (mm) only.
    -   **Limits:** Max Width **435mm**, Max Height **605mm**.
    -   **Performance:** Use CSS Transforms.

6.  **Maxi Extra Specs (Technical Blueprint):**
    -   **Visualizer:** Clean, card-based technical data grid.
    -   **Content:** Spine width (80mm), weight capacity (12kg), board caliper (5mm).
    -   **Style:** Blueprint / Spec Sheet aesthetic.

7.  **Selected Works (Gallery):**
    -   Grid of abstract book covers.
    -   3D Tilt effect on hover.
    -   Categories: Fine Art, Architecture, Photography.

8.  **Global Reach:**
    -   Logos/Typography emphasizing international presence.

**Design Philosophy:**
-   **Industrial Luxury:** Gold (#C5A059), Dark Grey (#1a1a1a), Cream (#F9F8F4).
-   **Typography:** Playfair Display (Headings), Inter (Technical).

**Performance Requirements:**
-   Lazy load 3D components.
-   Efficient re-renders for sliders (use CSS transforms).
