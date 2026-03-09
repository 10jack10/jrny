# Interactive Journey: Template Specification

This document outlines the capabilities, logic, and functional elements of the **Interactive Journey** framework. Built with modular, vanilla HTML/CSS/JavaScript, this repository acts as a blueprint for visualizing complex, multi-phased workflows, complete with media, tooltips, interactive charting, and an embedded AI assistant.

---

## 1. Introductory Sequence (Data Synthesis Animation)
Upon initialization, the page dynamically executes an atmospheric loading state designed to convey synthesis.
- **Particle System**: Spawns multiple "data particle" pills (simulating messy, unstructured data) floating atop a darkened, blurred overlay.
- **Convergence & Morph**: The particles swiftly converge to the exact center of the screen, perfectly blending and morphing into a single glowing geometric bubble.
- **Symphonic Reveal**: The unified bubble expands outward as an invisible mask, simultaneously fading out to instantly unveil the cleanly structured Interactive Journey flowchart beneath it.
- **Cleanup**: The overlay nodes are completely removed from the DOM after the 4-second sequence to ensure the journey is fully interactive.

## 2. Core Layout & Architecture

### Visual Theme
- **Glassmorphism**: Modals, tooltips, cards, and floating panels rely on heavy backdrop-blurs, glowing drop shadows (`rgba(99, 102, 241, 0.4)`), and translucent borders (`rgba(255, 255, 255, 0.1)`).
- **Dark Mode Background**: Utilizes variables for a space-themed dark mode (`--bg-dark`), overlaid with a `.bg-grid` to simulate a blueprint or architectural mapping surface. Slowly drifting ambient `.floating-orb` elements inject motion into the negative space.

### Structural Grid
- **Phase Timeline (Horizontal)**: A sticky header delineating logical steps or chronological phases of a given journey (e.g., Phase 1 | Phase 2 | Phase 3).
- **Swimlanes (Vertical Segments)**: Horizontal blocks splitting the board by persona, context, or workflow (e.g., "Designing", "Building", "Back-office").
- **Footer / Touchpoints**: A horizontal band at the base displaying offline or cross-functional global "Touchpoints" corresponding to specific timeline phases.

## 3. Map Elements: Nodes & Connectors

### Step Nodes `.step-node`
The primary interactive building block.
- **Text Labels**: Represent an isolated action.
- **Hover States**: Expanding borders and inner gradients with swift cubic-bezier transitions signify interactivity.
- **Information Tooltips/Cards**: Hovering over designated nodes reveals floating glassmorphic `.card` panels.
    - Driven by an injected JavaScript `cardData` object mapping `nodeID` to HTML content.
    - Tooltips dynamically render titles, tags, bulleted lists, and paragraph context.
    - *Note*: Position calculations handle relative offset spacing based on cursor interaction.

### Connections & Flow Lines
- **SVG Layering**: An absolutley positioned `<svg class="connections">` layer overlays the grid.
- **Dynamic Routing**: JavaScript computes coordinates between `[data-source]` nodes and `[data-target]` nodes.
- **Cross-Lane Logic**: Curving, Bezier-based paths visually illustrate flow jumping boundaries from top swimlanes to bottom swimlanes, rendering dashed or dotted stroke styles with animated, directional arrowheads at the destination.
- **Modular Mapping**: Adding connections only requires assigning element IDs directly in the markup or within the drawing iteration loop.

## 4. Modal Embedded Content (iFrames)
- **Triggers**: Designated touchpoints or nodes feature a trigger class (`.interactive-touchpoint` or `.modal-trigger`).
- **Overlay**: A darkened, blurred global overlay `.modal-overlay` captures strict focus. Built-in `fade-in` logic.
- **iFrame Container**: A premium container slides in gracefully (`transform: translateY(-20px) to (0)`), encapsulating an embedded window `<iframe>`.
- **Purpose**: Enables showcasing fully functional sub-applications, external tools, or specific prototypes directly within the narrative context of the flowchart, without navigating away.
- **Dismissal**: Handled via an absolute positioned 'X' button or generic click-out listeners on the overlay.

## 5. Global AI Chatbot Widget
A ubiquitous, intelligent contextual assistant living in the bottom-right corner.

### Chat Interface
- **Floating Action Button (FAB)**: A glowing toggle button featuring a hover micro-animation that summons the panel.
- **Messaging App Panel**: A rigid, glassmorphic column showcasing conversational history (`.chat-messages`) and a dedicated text-input footer (`.ai-input-area`).
- **Simulated Intelligence**:
    - **Message Delay**: Implements a fake typing delay (1.5 - 2.5 seconds) with animated `.typing-dot` elements for realism, keeping the user engaged in a natural dialogue cadence.
    - **Context Parsing**: Receives user query text and searches against keywords (e.g., "phase 3", "how do I look for a product") to trigger corresponding `.cardData` HTML payloads.

### Board Integration & Data Highlighting
The AI directly manipulates the visual state of the parent Journey grid to spatially educate the user.
- **Target Tracking**: When the AI outputs a response tied to a specific phase/step, it determines a `targetID`.
- **Dimming Protocol (`.board-dimmed`)**: The root `.journey-container` drops its opacity, scaling slightly, and applying grayscale to force unwanted elements into the background hierarchy.
- **Spotlight Mode (`.node-active`)**: The target nodes corresponding to the AI's explanation are injected with a highly vibrant `.node-active` class, overriding the dimming state. This causes specific phases/swimlane buckets to brilliantly "glow" to map the AI's text directly to the chart.
- **Reset**: Any new queries, or closing the AI panel immediately nullifies these classes instantly restoring the default state.

---
*This architecture allows new journeys, workflows, or architectural diagrams to be rapidly assembled and mapped without needing to rebuild intricate connection lines, tooltips, intro sequences, or contextual AI mappings.*
