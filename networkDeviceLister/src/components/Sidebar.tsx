import React from "react";
import { Device } from "../types";

const categoryIcons: Record<string, string> = {
  "Alle Geräte": "📋",
  "Server": "🖥️",
  "Router": "🌐",
  "Desktop": "💻",
  "Smartphone/Tablet": "📱",
  "Smart Home": "🏠",
  "Netzwerkgeräte": "🔧",
  "Unbekannt": "❓"
};

interface Props {
  categories: string[];
  devices: Device[];
  selected: string;
  setSelected: (s: string) => void;
  onAction: {
    exportHosts: () => void,
    ipManagement: () => void,
    importHosts: () => void,
  }
}

export default function Sidebar({ categories, devices, selected, setSelected, onAction }: Props) {
  return (
    <div className="sidebar">
      <h3>Kategorien</h3>
      <ul className="category-list">
        {categories.map((cat) => (
          <li key={cat} className="category-item">
            <button
              className={`category-button ${selected === cat ? 'active' : ''}`}
              onClick={() => setSelected(cat)}
            >
              <span className="category-icon">{categoryIcons[cat] || "📦"}</span>
              <span>{cat}</span>
              <span className="category-count">
                {devices.filter(d => cat === "Alle Geräte" || d.type === cat).length}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="actions-section">
        <div className="actions-title">Aktionen</div>
        <button className="action-button" onClick={onAction.exportHosts}>
          Hosts-Datei erstellen
        </button>
        <button className="action-button" onClick={onAction.ipManagement}>
          IP-Verwaltung
        </button>
        <button className="action-button" onClick={onAction.exportHosts}>
          Exportieren
        </button>
        <button className="action-button" onClick={onAction.importHosts}>
          Importieren
        </button>
      </div>
      
      <div className="footer-info">
        Letzter Scan: <span style={{fontFamily: 'monospace'}}>Nie</span>
      </div>
    </div>
  );
}
