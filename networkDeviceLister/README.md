# Network Device Lister

Eine moderne Progressive Web App (PWA) mit Electron-Wrapper zur Verwaltung und Kategorisierung von Netzwerkgeräten.

## STRUCTURE

network-device-lister/
├── .gitignore
├── README.md
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── index.html
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   └── icons/
│       ├── icon-192x192.png
│       └── icon-512x512.png
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── types.ts
│   ├── styles/
│   │   └── main.css
│   ├── hooks/
│   │   └── useDeviceScanner.ts
│   └── components/
│       ├── Sidebar.tsx
│       ├── Topbar.tsx
│       ├── Searchbar.tsx
│       ├── DeviceTable.tsx
│       └── HostExportBar.tsx
├── electron/
│   ├── main.js
│   ├── preload.js
│   └── backend/
│       └── networkScan.js
├── dist/
└── dist_electron/


## 🚀 Features

- **Netzwerk-Scanning**: Automatische Erkennung von Geräten im lokalen Netzwerk
- **Gerätekategorisierung**: Organisiere Geräte nach Typ (Server, Router, Desktop, etc.)
- **Host-Datei Generator**: Automatische Erstellung von Host-Dateien
- **IP-Management**: Verwaltung und Reorganisation von IP-Adressen
- **Export/Import**: Datenexport als CSV/JSON/TXT
- **Progressive Web App**: Installierbar als Desktop-App
- **Electron-Integration**: Native macOS .dmg/.app Build

## 📦 Installation

### Voraussetzungen
- Node.js (>= 16.0.0)
- npm oder yarn

### Setup
git clone https://github.com/DEIN-USERNAME/network-device-lister.git
cd network-device-lister
npm install

## 🛠️ Entwicklung

### Web-Entwicklung (PWA)
Öffnet die App auf `http://localhost:5173`
npm run dev

### Electron-Entwicklung
Startet die Electron-App im Entwicklungsmodus
npm run electron:dev


## 🏗️ Build

### Web-Build (PWA)
npm run build

### Electron-Build (macOS .dmg)
npm run build:electron

## 🖥️ Technologie-Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build-Tool**: Vite
- **Desktop**: Electron
- **PWA**: Vite PWA Plugin
- **Network-Scanning**: Node.js child_process (ARP)

## 📱 PWA-Installation

Die App kann direkt über den Browser als Desktop-App installiert werden:
1. Öffne die App im Browser
2. Klicke auf das "Installieren"-Icon in der Adressleiste
3. Folge den Anweisungen zur Installation

## 🔧 Konfiguration

### Netzwerk-Bereiche
Passe die Scan-Bereiche in `electron/backend/networkScan.js` an:

const scanRanges = ['192.168.1.0/24', '10.0.0.0/24'];

### Kategorien
Erweitere die Gerätekategorien in `src/App.tsx`:

const categories = ["Server", "Router", "Desktop", ...];

## 🤝 Mitwirken

1. Fork das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/amazing-feature`)
3. Committe deine Änderungen (`git commit -m 'Add amazing feature'`)
4. Push zum Branch (`git push origin feature/amazing-feature`)
5. Erstelle einen Pull Request

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE) Datei für Details.