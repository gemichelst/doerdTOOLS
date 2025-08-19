import React from "react";

export function Searchbar({ value, setValue }: { value: string, setValue: (s: string) => void }) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Nach Geräten suchen..."
      />
      <label className="offline-toggle">
        <input type="checkbox" defaultChecked />
        Offline-Geräte anzeigen
      </label>
    </div>
  );
}
