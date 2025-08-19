export type DeviceType =
  | "Alle Geräte"
  | "Server"
  | "Router"
  | "Desktop"
  | "Smartphone/Tablet"
  | "Smart Home"
  | "Netzwerkgeräte"
  | "Unbekannt";

export interface Device {
  id: string;
  name: string;
  mac: string;
  ip: string;
  type: DeviceType;
  lastSeen: string;
}
