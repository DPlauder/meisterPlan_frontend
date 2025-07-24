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
├── index.html
├── package.json
├── tailwind.config.ts
├── README.md
│
├── src/
│ ├── App.tsx
│ ├── main.tsx
│ │
│ ├── assets/
│ │
│ ├── components/
│ │ └── ui/
│ │ ├── Button/
│ │ ├── Header/
│ │ │ ├── Header.tsx
│ │ │ └── Header.styles.ts
│ │ └── Menu/
│ │ ├── Menu.tsx
│ │ ├── MenuItem.tsx
│ │ ├── SubMenuItem.tsx
│ │ └── Menu.styles.ts
│ │
│ ├── config/
│ │ └── menuConfig.ts
│ │
│ ├── features/
│ │ ├── auth/
│ │ ├── invoices/
│ │ ├── products/
│ │ └── users/
│ │
│ ├── hooks/
│ │
│ ├── layouts/
│ │ └── DashboardLayout.tsx
│ │
│ ├── lib/
│ │ └── fetchClient.ts
│ │
│ ├── pages/
│ │ ├── Home.tsx
│ │ ├── Reports.tsx
│ │ ├── Settings.tsx
│ │ ├── customers/
│ │ │ ├── CustomersList.tsx
│ │ │ └── CustomersNew.tsx
│ │ ├── orders/
│ │ │ ├── Invoices.tsx
│ │ │ └── Orders.tsx
│ │ └── products/
│ │ ├── Inventory.tsx
│ │ └── ProductsList.tsx
│ │
│ ├── router/
│ │ └── AppRouter.tsx
│ │
│ ├── services/
│ │ └── authService.ts
│ │
│ ├── store/
│ │
│ ├── styles/
│ │ └── global.css
│ │
│ ├── types/
│ │
│ └── utils/

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

- Die Routen werden in `src/router/AppRouter.tsx` definiert.
- Die Hauptkomponente `App.tsx` rendert den AppRouter.
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

## Pflege & Mitwirken

- Änderungen an der Menüstruktur immer in `menuConfig.ts` vornehmen.
- Neue Komponenten und Seiten nach dem bestehenden Muster anlegen.
- Pull Requests und Issues sind willkommen!

---

**Kontakt & Support:**  
Für Fragen oder Erweiterungen bitte an das Entwicklerteam wenden.

---
