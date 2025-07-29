# MeisterPlan Frontend

## Übersicht

Dieses Projekt ist ein modernes React-Frontend für MeisterPlan. Es nutzt Vite, TypeScript, Tailwind CSS und eine modulare Komponentenstruktur. Das Menü ist zentral konfigurierbar, das Routing flexibel und die UI ist auf Erweiterbarkeit ausgelegt. Die Anwendung kommuniziert mit mehreren Backend-Mikroservices über REST-APIs.

---

## Technologien

- **React** (mit Hooks und Komponenten)
- **TypeScript**
- **Vite** (Build-Tool)
- **Tailwind CSS** (Styling)
- **React Router** (Routing)
- **Lucide React** (Icons)
- **ESLint & Prettier** (Code-Qualität)

---

## Projektstruktur

```
frontend/
│
├── index.html
├── package.json
├── tailwind.config.ts
├── README.md
│
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── businessCustomers/
│   │   │   ├── BusinessCustomerForm.tsx
│   │   │   └── BusinessCustomerList.tsx
│   │   └── ui/
│   │       ├── Button/
│   │       │   └── button.tsx
│   │       ├── Header/
│   │       │   ├── Header.tsx
│   │       │   └── Header.styles.ts
│   │       └── Menu/
│   │           ├── Menu.tsx
│   │           ├── MenuItem.tsx
│   │           ├── SubMenuItem.tsx
│   │           └── Menu.styles.ts
│   │       └── ConfirmDialog.tsx
│   │
│   ├── config/
│   │   ├── apiConfig.ts
│   │   └── menuConfig.ts
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── invoices/
│   │   ├── products/
│   │   └── users/
│   │
│   ├── hooks/
│   │   └── businessCustomers/
│   │       └── useBusinessCustomerDelete.ts
│   │
│   ├── layouts/
│   │   └── DashboardLayout.tsx
│   │
│   ├── lib/
│   │   └── fetchClient.ts
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Reports.tsx
│   │   ├── Settings.tsx
│   │   ├── customers/
│   │   │   ├── CustomersList.tsx
│   │   │   └── CustomersNew.tsx
│   │   ├── orders/
│   │   │   ├── Orders.tsx
│   │   │   └── Invoices.tsx
│   │   └── products/
│   │       ├── ProductsList.tsx
│   │       └── Inventory.tsx
│   │
│   ├── router/
│   │   └── AppRouter.tsx
│   │
│   ├── services/
│   │   ├── authService.ts
│   │   └── businessCustomers/
│   │       └── businessCustomerService.ts
│   │
│   ├── store/
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   ├── types/
│   │   └── businessCustomer.ts
│   │
│   └── utils/
```

---

## Installation & Start

1. **Abhängigkeiten installieren:**

   ```sh
   npm install
   ```

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

## Menü-Konfiguration

- Die Menüstruktur wird zentral in `src/config/menuConfig.ts` gepflegt.
- Icons werden aus `lucide-react` importiert und als Komponente gespeichert.
- Beispiel:
  ```typescript
  export const menuItemsConfig = [
    { id: '1', label: 'Dashboard', path: '/', icon: Home },
    // ...
  ];
  ```

---

## Komponenten

- **Menu.tsx:** Rendert das Hauptmenü und verwaltet den aktiven Zustand sowie Dropdowns.
- **MenuItem.tsx:** Einzelner Menüpunkt, unterstützt Icons, Aktiv-Zustand und Dropdowns.
- **SubMenuItem.tsx:** Für Untermenüpunkte.
- **Header.tsx:** Zeigt den App-Header mit Logo und User-Icon.
- **BusinessCustomerList.tsx:** Listet Geschäftskunden auf.
- **BusinessCustomerForm.tsx:** Formular zum Anlegen neuer Kunden.
- **ConfirmDialog.tsx:** Bestätigungsdialog für Aktionen wie Löschen.

---

## Services & Mikroservices

Dieses Frontend kommuniziert mit mehreren Backend-Mikroservices über REST-APIs.  
Die Service-Logik ist im Ordner `src/services/` gekapselt.

### Beispiele für Services

- **authService.ts**  
  Authentifizierung (Login, Token-Handling etc.):

  ```ts
  export async function login(payload: LoginPayload): Promise<LoginResponse> {
    return apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
  ```

- **businessCustomers/businessCustomerService.ts**  
  CRUD-Operationen für Geschäftskunden:
  - `fetchCustomers()`: Holt alle Kunden
  - `fetchBusinessCustomerById(id)`: Holt einen Kunden per ID
  - `createBusinessCustomer(data)`: Legt einen neuen Kunden an
  - `updateBusinessCustomer(id, data)`: Aktualisiert einen Kunden
  - `deleteBusinessCustomer(id)`: Löscht einen Kunden

  Beispiel:

  ```ts
  export async function fetchCustomers(): Promise<businessCustomer[]> {
    return apiFetch(`${BUSINESS_CUSTOMER_API}/business-customers`, {
      method: 'GET',
    });
  }
  ```

Die Endpunkte werden zentral in `src/config/apiConfig.ts` verwaltet, z.B.:

```ts
export const API_ENDPOINTS = {
  customers: 'http://localhost:3001/api',
  // ...
};
```

Alle Service-Funktionen nutzen einen gemeinsamen `apiFetch`-Wrapper (`src/lib/fetchClient.ts`), um Fehlerbehandlung und Authentifizierung zu vereinheitlichen.

---

## Hinweise zu Mikroservices

- Jeder Service ist für einen eigenen Bereich zuständig (z.B. Kunden, Authentifizierung, Produkte).
- Die Kommunikation erfolgt ausschließlich über HTTP(S)-APIs.
- Die Service-Implementierungen im Frontend sind lose gekoppelt und können leicht erweitert oder ausgetauscht werden.

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

## Typisierung

- Menü-Konfiguration (`MenuItemConfig`) und weitere Datenstrukturen sind mit TypeScript typisiert.
- Komponenten erwarten klar definierte Props.

---

## Erweiterung

- Neue Menüpunkte einfach in `menuConfig.ts` ergänzen.
- Neue Seiten unter `src/pages/` anlegen und im Router einbinden.
- Zusätzliche Layouts oder UI-Komponenten können modular ergänzt werden.
- Neue Services im Ordner `src/services/` anlegen und in `apiConfig.ts` konfigurieren.

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
