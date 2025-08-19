import React from "react";

export function Topbar({ onScan }: { onScan: () => void }) {
  return (
    <div className="app-header">
      <div>
        <h1 className="app-title">
          🌐 Network Device Lister
        </h1>
        <div className="network-info">192.168.1.0/24</div>
      </div>
      <div className="header-controls">
        <button className="btn btn--primary" onClick={onScan}>
          Netzwerk scannen
        </button>
        <button className="btn btn--secondary">⚙️</button>
      </div>
    </div>
  );
}
