import type { Metadata } from "next";
import PortalPrototype from "../portal-prototype";

export const metadata: Metadata = { title: "Colaboradores — LATTICCE" };

export default function CollaboratorsPage() { return <PortalPrototype type="collaborator" />; }
