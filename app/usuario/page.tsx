import type { Metadata } from "next";
import AccessPrototype from "../access-prototype";

export const metadata: Metadata = {
  title: "Acceso — LATTICCE",
  description: "Acceso local de prueba para colaboradores y clientes de LATTICCE.",
};

export default function UsuarioPage() {
  return <AccessPrototype />;
}
