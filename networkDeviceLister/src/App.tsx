import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { Searchbar } from "./components/Searchbar";
import { DeviceTable } from "./components/DeviceTable";
import { HostExportBar } from "./components/HostExportBar";
import { useDeviceScanner } from "./hooks/useDeviceScanner";

const categories = [
  "Alle Geräte", "Server", "Router",
  "Desktop", "Smartphone/Tablet", "Smart Home",
  "Netzwerkgeräte", "Unbekannt"
];

export default function App() {
  const { devices, scanNetwork } = useDeviceScanner();
  const [category, setCategory] = useState("Alle Geräte");
  const [search, setSearch] = useState("");

  const filtered = devices.filter(d =>
    (category === "Alle Geräte" || d.type === category) &&
    (search === "" || d.name.toLowerCase().includes(search.toLowerCase()))
  );

  function handleExportHosts() {
    const lines = filtered.map(d => `${d.ip}\t${d.name}`).join("\n");
    const blob = new Blob([lines], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hosts.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleIPManagement() {
    alert("IP-Management: Hier könnte eine Umordnung/Reservierung nach Gruppen erfolgen.");
  }

  function handleImport() {
    alert("Import startet hier – z. B. CSV/JSON/Hosts-Datei.");
  }

  return (
    <div className="app-container">
      <Sidebar
        categories={categories}
        devices={devices}
        selected={category}
        setSelected={setCategory}
        onAction={{
          exportHosts: handleExportHosts,
          ipManagement: handleIPManagement,
          importHosts: handleImport
        }}
      />
      <div className="main-content">
        <Topbar onScan={scanNetwork} />
        <Searchbar value={search} setValue={setSearch} />
        <DeviceTable devices={filtered} />
        <HostExportBar
          onExportHosts={handleExportHosts}
          onIPManagement={handleIPManagement}
          onImportHosts={handleImport}
        />
      </div>
    </div>
  );
}
