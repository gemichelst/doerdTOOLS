import React from "react";
import { Device } from "../types";

const headers = [
  { label: "Status", icon: "●" },
  { label: "IP-Adresse", icon: "🌐" },
  { label: "MAC-Adresse", icon: "🔢" },
  { label: "Hostname", icon: "📝" },
  { label: "Kategorie", icon: "📦" },
  { label: "Hersteller", icon: "🏷️" },
  { label: "Zuletzt gesehen", icon: "⏰" },
  { label: "Aktionen", icon: "⚡" }
];

export function DeviceTable({ devices }: { devices: Device[] }) {
  if (!devices?.length) {
    return (
      <div className="device-table-container">
        <table className="device-table">
          <thead>
            <tr>
              {headers.map(h => (
                <th key={h.label}>
                  <span>{h.icon}</span> {h.label}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <div className="empty-state">
          <h3>Keine Geräte gefunden.</h3>
          <p>Klicke auf "Netzwerk scannen" um Geräte zu finden.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="device-table-container">
      <table className="device-table">
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h.label}>
                <span>{h.icon}</span> {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {devices.map((d) => (
            <tr key={d.id}>
              <td>
                <div className="status-indicator">
                  <div className="status-dot online"></div>
                  Online
                </div>
              </td>
              <td>{d.ip}</td>
              <td>
                <span className="mac-address">{d.mac}</span>
              </td>
              <td>{d.name}</td>
              <td>
                <span className="category-badge">{d.type}</span>
              </td>
              <td>Auto</td>
              <td>{new Date(d.lastSeen).toLocaleString()}</td>
              <td>
                <button
                  className="table-action-btn"
                  onClick={() => alert(`Bearbeiten: ${d.name}`)}>
                  Bearbeiten
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
