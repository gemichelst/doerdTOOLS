import React from "react";

export function HostExportBar({
  onExportHosts,
  onIPManagement,
  onImportHosts,
}: {
  onExportHosts: () => void;
  onIPManagement: () => void;
  onImportHosts: () => void;
}) {
  return (
    <div className="export-bar">
      <button className="export-btn" onClick={onExportHosts}>
        Hosts-Datei erstellen
      </button>
      <button className="export-btn" onClick={onIPManagement}>
        IP-Verwaltung
      </button>
      <button className="export-btn" onClick={onExportHosts}>
        Exportieren
      </button>
      <button className="export-btn" onClick={onImportHosts}>
        Importieren
      </button>
    </div>
  );
}
