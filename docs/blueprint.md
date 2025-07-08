# **App Name**: FieldFlow

## Core Features:

- Package Dashboard: Display a dashboard with a list of packages fetched from a static JSON file. Each item shows the tracking ID, recipient name, and a status badge with colored tags.
- Package Details View: Display package details including tracking ID, recipient information, current status (selectable via dropdown), and package specifics.
- Update Status Form: Form to change the status of a package. Status options include Pending, In Transit, Delivered, and Failed.
- Font Scaling Toggle: Settings screen with a toggle to enable or disable font scaling across the app. Settings are saved to AsyncStorage.

## Style Guidelines:

- Primary color: HSL(210, 70%, 50%) - RGB(41, 137, 204). A bright blue, conveying reliability and trust.
- Background color: HSL(210, 20%, 95%) - RGB(242, 247, 250). Very light tint of blue for a calm background.
- Accent color: HSL(180, 60%, 40%) - RGB(41, 179, 171). A desaturated cyan to complement the primary, for highlights and interactive elements.
- Font pairing: 'Inter' (sans-serif) for both headlines and body text, for a clean and modern feel.
- Use clear and simple icons to represent package status and actions. Icons should be consistent with the modern UI.
- Implement a clean, card-based layout for package listings and details to ensure readability and focus.
- Incorporate subtle animations for status updates and screen transitions to enhance user engagement without being distracting.