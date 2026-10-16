# FSD CLI Brand and Interface Guide

This document defines the visual direction for the FSD CLI website and
documentation. The identity is derived from the product logo: a dark foundation
with cyan, blue, and violet layers representing the FSD hierarchy.

## Brand idea

FSD CLI turns architecture decisions into visible, repeatable layers. The
interface should feel technical, confident, and practical rather than playful
or decorative.

Core principles:

- Show hierarchy through stacked layers, grids, and connected structures.
- Use dark navy for authority and cyan-to-violet accents for product energy.
- Keep documentation surfaces light, calm, and highly readable.
- Use code and terminal output as real product proof.
- Prefer specific capabilities over broad marketing claims.

## Color system

| Token | Value | Use |
| --- | --- | --- |
| Canvas | `#f8fafc` | Main page background |
| Surface soft | `#eef4fb` | Alternating sections and navigation states |
| Surface card | `#e5edf8` | Secondary cards |
| Surface dark | `#071426` | Terminal and strong CTA surfaces |
| Ink | `#071426` | Headlines and primary actions |
| Body | `#31445f` | Running text |
| Muted | `#5b6f8d` | Captions and secondary labels |
| Blue | `#2563eb` | Primary brand accent |
| Cyan | `#38bdf8` | Framework and code highlights |
| Mint | `#2dd4bf` | Success and completion |
| Violet | `#a78bfa` | Architecture and generator highlights |
| Magenta | `#c026d3` | Select emphasis only |
| Amber | `#f59e0b` | Warnings and tooling highlights |

## Typography

- Inter is used for navigation, headings, and body copy.
- Geist Mono is used for commands, configuration, and generated paths.
- Headlines use weights 600–700 with compact negative tracking.
- Body text stays at 16–18px with generous line height.

## Layout

- Maximum content width: 1280px.
- Main section spacing: 96–128px on desktop, 72–96px on mobile.
- Documentation content width: 768–896px with a 260px sidebar.
- Card radius: 16–24px.
- Interactive targets: at least 44px high where practical.

## Components

### Navigation

Use the FSD logo, the short product name `FSD CLI`, and the package name as a
secondary label. Internal navigation uses Next.js links. GitHub and npm links
open externally.

### Hero

Use a dark navy stage, oversized outcome-led typography, and an exploded six-layer
FSD structure in cyan, blue, and violet. The layers assemble on entry and separate
with natural scroll progress. Keep the real project creation command selectable
and copyable, with visible clipboard failure feedback.

### Product overview and detail pages

Keep the home page focused on the hero, a three-chapter product workflow,
architecture/capabilities links, and a compact final CTA. The complete layer
explanation and six-step walkthrough live at `/architecture`. Feature cards,
capability groups, templates, roadmap, and FAQ live at `/capabilities`.

On desktop, a single sticky workflow stage changes chapters as users scroll.
Use native scrolling without wheel interception. Update animation transforms
through a requestAnimationFrame-coalesced CSS variable rather than React state
on every frame. On small or short viewports and with reduced motion enabled,
show all three chapters in normal document flow with every link accessible.
Keep documentation surfaces and typography independent of landing visuals.

### Architecture visualization

Show the six layers in import order: app, pages, widgets, features, entities,
and shared. Upper layers may compose lower layers, never the reverse.

### Documentation

Documentation pages prioritize accuracy and scanning:

- one H1 per route;
- short introductions;
- real commands and configuration examples;
- explicit notes about destructive flags such as `--force`;
- a visible active navigation state.

## Accessibility

- Preserve keyboard focus outlines.
- Use descriptive image alternative text.
- Expose expanded state for menus and disclosures.
- Respect `prefers-reduced-motion`.
- Do not rely on color alone to communicate completion or selection.
- Maintain readable contrast on every accent surface.

## Content rules

- Do not promise exact setup times.
- Do not call a future framework available before its adapter and tests ship.
- Keep commands synchronized with the published CLI.
- Treat `fsd.config.json` as the project source of truth.
- Link architectural theory to the official Feature-Sliced Design website.
- Keep product claims verifiable from the CLI and starter repositories.

## Color themes

The global theme selector offers Light, Dark, and System; System is the default.
Store the preference under `fsd-theme`, follow live OS changes only in System,
and synchronize changes across tabs. A static head script resolves the theme
before first paint, while the provider handles later updates. Storage failures
must not prevent switching themes during the current visit.

Neutral surfaces, text, borders, controls, and documentation use semantic CSS
variables. Bright brand cards use the fixed `on-accent` foreground; code windows,
the hero, and the final CTA keep their dark product-stage appearance in both
modes. Native controls follow the resolved `color-scheme`.
