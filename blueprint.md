# Virtual Lab: Linear Algebra - Project Blueprint

## 1. Project Overview
A high-performance, interactive educational platform designed to bridge the gap between abstract linear algebra concepts and geometric intuition. Built for engineering students to visualize vector spaces, perform row reductions, and validate mastery through data-driven assessments.

---

## 2. Technical Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion (for physics-based animations)
- **Math Engine**: 
  - `mathjs`: High-precision algebraic computations.
  - `Plotly.js`: WebGL-accelerated 3D/2D vector visualization.
- **Backend/Storage**: 
  - **Supabase**: Real-time DB, Authentication, and Edge Functions.
  - **Gemini AI**: Integrated LLM for generating step-by-step proofs and explanations.
- **Architecture**: 
  - **Scalable Repository Pattern**: Decoupled data access via `DataRepository`.
  - **Async Task Queueing**: Custom `AsyncQueue` to handle heavy mathematical computations without blocking the UI thread.
  - **In-Memory Caching**: `CacheService` to skip repetitive RREF calculations.

---

## 3. Directory Structure
```text
/src
├── components/          # Reusable UI elements (Sidebar, Nav, Visualizers)
├── context/             # Global states (Navigation, Auth)
├── lib/                 # Core low-level services
│   ├── cache.ts         # Performance optimization layer
│   ├── taskQueue.ts     # Background process management
│   ├── linearAlgebra.ts # Mathematical core algorithms
│   └── supabase.ts      # Backend infrastructure config
├── services/            # Sharding-ready data access layers
│   └── dataRepository.ts# Abstracted CRUD operations
├── pages/               # Top-level route components
│   ├── Home.tsx         # Modern, conversion-focused landing
│   ├── Simulator.tsx    # Command center for vector analysis
│   └── Quiz.tsx         # Assessment engine
└── App.tsx              # Main entry point & routing logic
```

---

## 4. UI/UX Design System
### Design Identity: "Geometric Professionalism"
- **Typography**: 
  - Headings: `font-black tracking-tight` for a bold, structural feel.
  - Body: High-legibility sans-serif with optimized line heights.
- **Color Palette**:
  - `Primary`: Indigo-600 (Academic Trust)
  - `Accent`: Emerald-500 (Success/Verification)
  - `Background`: Slate-50 with a custom SVG grid mask for "Engineering Blueprint" aesthetic.
- **Components**:
  - **Glassmorphism**: White/40 backdrop with high blur (32px+) for modern overlays.
  - **Interactive States**: Hover actions include slight Y-translation and dynamic shadow expansion.

---

## 5. Core Working Principles
### Mathematical Pipeline
1. **Input Interface**: Users provide vectors/matrices via `Simulator.tsx`.
2. **Analysis Cycle**:
   - `solveRREF` computes the reduced form while logging "steps".
   - Result is pushed to the `CacheService`.
   - `findBasisVectors` extracts the span of the given set.
3. **Visualization**:
   - Data is converted to Plotly traces.
   - Vectors are rendered in a 3D coordinate system using `ResizeObserver` for fluidity.

### Optimization Strategies
- **Manual Chunking**: Large dependencies (Plotly, MathJS) are separated into individual chunks to minimize initial load time.
- **Lazy Loading**: All pages are loaded via `React.lazy` and `Suspense` for instantaneous perceived performance.
- **Sharding Prep**: The `DataRepository` is designed to support "feature sharding," allowing the platform to split data across multiple backend instances if user load scales.

---

## 6. Functional Requirements
- **Simulator**: Real-time matrix entry with rank, basis, and dependency analysis.
- **Theory Engine**: Interactive Markdown-based notes with LaTeX integration.
- **Assessment Suite**: Pre-test and Post-test logic with progress tracking.
- **AI Chatbot**: Context-aware assistance trained on the current lab's state.

---

## 7. Development Roadmap
- **Phase 1**: Core Math Engine & RREF Visualization (Completed)
- **Phase 2**: Professional UI Branding & Responsive Optimization (Completed)
- **Phase 3**: Authentication & Persistent Data Layer (Completed)
- **Phase 4**: Multi-user collaboration & Advanced AI Grounding (In Progress)
