import { useState } from "react";
import { Device } from "../types";

declare global {
  interface Window {
    electronScan?: () => Promise<any[]>;
  }
}

function categorize(mac = "", name = ""): string {
  const macs = mac.replace(/[^0-9A-F]/gi, "").toUpperCase();

  if (/^50E636|C03F9E/i.test(macs)) return "Server";
  if (/^60|90|84|B8/i.test(macs) && name.includes("tasmota")) return "Smart Home";
  if (/iphone|ipad/i.test(name)) return "Smartphone/Tablet";
  if (/fritz|tp-link|router/i.test(name)) return "Router";
  if (/desktop|macbook|imac/i.test(name)) return "Desktop";
  if (/tuya/i.test(name)) return "Smart Home";
  return "Unbekannt";
}

export const useDeviceScanner = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  const scanNetwork = async () => {
    try {
      if (window?.electronScan) {
        const scanResult = await window.electronScan();
        setDevices(
          scanResult.map((dev: any, i: number) => ({
            id: dev.mac + i,
            mac: dev.mac,
            ip: dev.ip,
            name: dev.name,
            type: categorize(dev.mac, dev.name),
            lastSeen: new Date().toISOString(),
          }))
        );
      } else {
        setDevices([
          {
            id: "1",
            mac: "50:E6:36:CF:1A:A8",
            ip: "192.168.1.1",
            name: "fritz.box",
            type: "Router",
            lastSeen: new Date().toISOString(),
          },
          {
            id: "2",
            mac: "C0:3F:5E:9E:57:C6",
            ip: "192.168.1.21",
            name: "readynas2.fritz.box",
            type: "Server",
            lastSeen: new Date().toISOString(),
          },
          {
            id: "3",
            mac: "60:19:34:93:77:33",
            ip: "192.168.1.31",
            name: "tasmota1",
            type: "Smart Home",
            lastSeen: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      console.error("Scan fehlgeschlagen:", err);
    }
  };

  return { devices, setDevices, scanNetwork };
};
