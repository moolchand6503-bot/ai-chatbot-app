# Design Brief

## Direction

Conversational clarity — interface designed to make message exchange feel effortless, warm, and focused.

## Tone

Refined minimalism with cool-blue primary tones and warm amber accents. Inspired by premium chat apps, prioritizing readability and visual calm over decoration.

## Differentiation

Intentional color separation between user (warm amber) and AI (cool blue) messages creates cognitive clarity; smooth message fade-in and subtle typing pulse animation reinforce conversational flow.

## Color Palette

| Token         | OKLCH          | Role                           |
| ------------- | -------------- | ------------------------------ |
| background    | 0.13 0.018 235 | Dark slate base, non-distracting |
| foreground    | 0.92 0.01 235  | High contrast text, readable    |
| card          | 0.17 0.022 235 | Message bubble containers      |
| primary       | 0.58 0.14 235  | AI messages, interactive focus |
| accent        | 0.72 0.17 70   | User messages, warm highlight  |
| muted         | 0.21 0.025 235 | Secondary surfaces, dividers    |
| destructive   | 0.55 0.22 25   | Error states, alerts            |

## Typography

- Display: Space Grotesk — headings, labels, UI accents
- Body: DM Sans — message content, UI text, inputs
- Scale: headers `text-xl font-bold`, messages `text-base`, labels `text-sm font-medium`

## Elevation & Depth

Message cards rendered with subtle elevation shadow (`shadow-sm`); no shadow on input area. Depth created through layering cards and consistent spacing hierarchy, not aggressive shadows.

## Structural Zones

| Zone    | Background       | Border          | Notes                                  |
| ------- | ---------------- | --------------- | -------------------------------------- |
| Header  | `bg-card`        | `border-b`      | Title "Chat" with divider              |
| Content | `bg-background`  | —               | Message list with smooth auto-scroll   |
| Footer  | `bg-card`        | `border-t`      | Input field + send button zone         |

## Spacing & Rhythm

Generous 16px gaps between sections (header, content, footer); messages grouped with 12px vertical padding; input field 12px padding. Micro-spacing consistent at 4px, 8px, 12px increments.

## Component Patterns

- Messages: `rounded-lg`, `bg-card`, subtle shadow, 12px padding, message fade-in animation
- User message accent: `bg-accent/10` background with `text-accent` accent text
- AI message: `bg-primary/10` background with `text-primary` accent text
- Send button: `bg-accent`, `text-accent-foreground`, rounded `md`, hover state darkens via opacity

## Motion

- Entrance: Messages fade in with slight upward slide (0.3s ease-out)
- Hover: Interactive elements use `transition-smooth` (0.3s cubic-bezier)
- Decorative: Typing indicator pulses at 1.4s cycle (opacity fade)

## Constraints

- Never use raw hex or named colors — all colors via CSS variables
- Maintain AA+ contrast in both light and dark modes
- Input focus state must be visible (ring color or border highlight)
- Typing indicator must be non-intrusive and animated smoothly

## Signature Detail

Intentional warm-accent user bubbles on a cool-blue foundation create a memorable, accessible visual contrast that reinforces sender identity without relying on left/right positioning alone.
