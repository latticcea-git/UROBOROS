import type { Metadata } from "next";
import PortalPrototype from "../portal-prototype";

export const metadata: Metadata = { title: "Clientes — LATTICCE" };

export default function ClientsPage() { return <PortalPrototype type="client" />; }
