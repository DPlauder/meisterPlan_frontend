# MeisterPlan Frontend – Dokumentation

## Übersicht

Dieses Projekt ist ein modernes React-Frontend mit Vite, TypeScript und Tailwind CSS. Es bietet eine modulare Struktur mit Routing, Layouts und einem konfigurierbaren Menüsystem.

---

## Technologien

- **React** (mit Hooks und Komponenten)
- **TypeScript**
- **Vite** (Build-Tool)
- **Tailwind CSS** (Styling)
- **React Router** (Routing)
- **ESLint & Prettier** (Code-Qualität)
- **Lucide React** (Icons)

---

## Projektstruktur

frontend/
│
├── src/
│ ├── components/
│ │ └── ui/
│ │ ├── Header/
│ │ │ └── Header.tsx
│ │ └── Menu/
│ │ ├── Menu.tsx
│ │ ├── MenuItem.tsx
│ │ └── SubMenuItem.tsx
│ ├── config/
│ │ └── menuConfig.ts
│ ├── layouts/
│ │ └── DashboardLayout.tsx
│ ├── pages/
│ │ └── Home.tsx
│ ├── router/
│ │ └── index.tsx
│ ├── styles/
│ │ └── global.css
│ └── main.tsx
├── index.html
├── package.json
├── tailwind.config.ts
└── ...

````

---

## Installation & Start

1. **Abhängigkeiten installieren:**

   ```sh
   npm install
````

2. **Entwicklungsserver starten:**

   ```sh
   npm run dev
   ```

3. **Build für Produktion:**
   ```sh
   npm run build
   ```

---

## Routing

- Die Routen werden in `src/router/index.tsx` definiert.
- Die Hauptkomponente `App.tsx` rendert den Router.
- Beispielroute:
  ```tsx
  <Route path="/" element={<Home />} />
  ```

---

## Layouts

- Das Hauptlayout ist `DashboardLayout.tsx`.
- Es bindet den Header und das Menü ein und rendert die Seiteninhalte im `<main>`-Bereich.

---

## Menü-Konfiguration

- Die Menüstruktur wird zentral in `src/config/menuConfig.ts` gepflegt.
- Beispiel:
  ```typescript
  export const menuItemsConfig = [
    { id: '1', label: 'Dashboard', path: '/', icon: Home },
    // ...
  ];
  ```
- Icons werden aus `lucide-react` importiert und als Komponente gespeichert.

---

## Menü-Komponenten

- **Menu.tsx:** Rendert das Hauptmenü und verwaltet den aktiven Zustand sowie Dropdowns.
- **MenuItem.tsx:** Einzelner Menüpunkt, unterstützt Icons, Aktiv-Zustand und Dropdowns.
- **SubMenuItem.tsx:** Für Untermenüpunkte.

**Wichtig:**  
Icons werden als JSX-Element gerendert:

```tsx
icon={item.icon ? React.createElement(item.icon) : undefined}
```

---

## Styling

- Tailwind CSS ist vollständig integriert.
- Globale Styles in `src/styles/global.css`:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- Die Tailwind-Konfiguration steht in `tailwind.config.ts`.

---

## Typen & Props

- Menü-Konfiguration (`MenuItemConfig`) ist typisiert.
- Komponenten wie `MenuItem` und `SubMenuItem` erwarten klar definierte Props.

---

## Erweiterung

- Neue Menüpunkte einfach in `menuConfig.ts` ergänzen.
- Neue Seiten unter `src/pages/` anlegen und im Router einbinden.
- Zusätzliche Layouts oder UI-Komponenten können modular ergänzt werden.

---

## Fehlerbehebung

- **Tailwind-Styling wird nicht übernommen:**  
  → Entwicklungsserver neu starten (`npm run dev`).  
  → Prüfen, ob die CSS-Datei geladen wird.
- **Icon-Fehler:**  
  → Icons immer als JSX-Element (`<Icon />` oder `React.createElement(Icon)`) übergeben.
- **Router-Fehler:**  
  → Nur einen `<BrowserRouter>` im gesamten Baum verwenden.

---

## Weiterführende Links

- [React Dokumentation](https://react.dev/)
- [Vite Dokumentation](https://vitejs.dev/)
- [Tailwind CSS Dokumentation](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Kontakt & Support:**  
Für Fragen oder Erweiterungen bitte an das Entwicklerteam wenden.

---
