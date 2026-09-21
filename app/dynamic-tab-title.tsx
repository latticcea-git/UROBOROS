"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";

const GENERAL_RETURN_MESSAGES = [
  "Vuelve a LATTICCE",
  "Retoma tu sesión",
  "Confía en el sistema",
  "Todo comienza con una idea",
  "LATTICCE sigue creando",
] as const;

const NODE_RETURN_MESSAGES = {
  agency: ["Tu proyecto puede crecer", "Construimos tu universo", "Diseñamos tu campaña", "Creamos tu sitio web", "Diseñamos experiencias", "Creamos mundos digitales", "Activa tu próximo proyecto"],
  studio: ["Hacemos fotografía", "Fotografiamos tu producto", "Retratamos tu proyecto", "Creamos tu contenido", "Producimos tu video", "Dirigimos tu producción"],
  sound: ["Grabamos tus voces", "Grabamos tu podcast", "Producimos tu música", "Diseñamos tu sonido", "Mezclamos tus canciones", "Grabamos tu locución", "Musicalizamos tu historia", "Creamos tu identidad sonora", "Damos voz a tu marca"],
  design: ["Hacemos tu logotipo", "Diseñamos tu marca", "Creamos tu identidad", "Dale forma a tu idea", "Renueva tu imagen", "Animamos tu identidad", "Diseñamos tu presentación"],
  time: ["Documentamos tu proceso", "Guardamos tu memoria", "Hacemos visible tu historia"],
  films: ["Tu historia merece una película", "Producimos tu comercial", "Filmamos tu historia", "Editamos tu película", "Creamos tu cortometraje"],
} as const;

const HOME_RETURN_MESSAGES = [
  ...GENERAL_RETURN_MESSAGES,
  "Tu proyecto puede crecer",
  "Hacemos fotografía",
  "Mezclamos tus canciones",
  "Diseñamos tu marca",
  "Documentamos tu proceso",
  "Tu historia merece una película",
] as const;

const MESSAGE_INTERVAL_MS = 4000;

function getReturnMessages(pathname: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/") return HOME_RETURN_MESSAGES;
  if (path.startsWith("/agency")) return NODE_RETURN_MESSAGES.agency;
  if (path.startsWith("/studio")) return NODE_RETURN_MESSAGES.studio;
  if (path.startsWith("/sound")) return NODE_RETURN_MESSAGES.sound;
  if (path.startsWith("/design")) return NODE_RETURN_MESSAGES.design;
  if (path.startsWith("/time")) return NODE_RETURN_MESSAGES.time;
  if (path.startsWith("/films")) return NODE_RETURN_MESSAGES.films;
  return GENERAL_RETURN_MESSAGES;
}

export default function DynamicTabTitle() {
  const pathname = usePathname();
  const returnMessages = useMemo(() => getReturnMessages(pathname), [pathname]);

  useEffect(() => {
    let visibleTitle = document.title;
    let messageIndex = 0;
    let intervalId: number | undefined;

    const stopRotation = () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
    };

    const showNextMessage = () => {
      document.title = returnMessages[messageIndex];
      messageIndex = (messageIndex + 1) % returnMessages.length;
    };

    const handleVisibilityChange = () => {
      stopRotation();

      if (document.hidden) {
        visibleTitle = document.title;
        showNextMessage();
        intervalId = window.setInterval(showNextMessage, MESSAGE_INTERVAL_MS);
        return;
      }

      document.title = visibleTitle;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopRotation();
      document.title = visibleTitle;
    };
  }, [returnMessages]);

  return null;
}
