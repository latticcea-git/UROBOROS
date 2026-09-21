"use client";

import { useEffect } from "react";

const RETURN_MESSAGES = [
  "Vuelve a La LATTICCE",
  "Retoma tu Sesión",
  "Cotiza tu Video",
  "Continúa Creando",
  "Confía en el Sistema",
  "Hacemos tu Logotipo",
  "Grabamos tus Voces",
  "Diseñamos tu Marca",
  "Creamos tu Identidad",
  "Construimos tu Universo",
  "Dale Forma a tu Idea",
  "Renueva tu Imagen",
  "Diseñamos tu Campaña",
  "Creamos tu Sitio Web",
  "Diseñamos Experiencias",
  "Creamos Mundos Digitales",
  "Llevamos tu Marca al 3D",
  "Animamos tu Identidad",
  "Creamos tu Dirección de Arte",
  "Diseñamos tu Presentación",
  "Producimos tu Comercial",
  "Filmamos tu Historia",
  "Dirigimos tu Producción",
  "Producimos tu Video",
  "Editamos tu Película",
  "Creamos tu Cortometraje",
  "Hacemos Fotografía",
  "Fotografiamos tu Producto",
  "Retratamos tu Proyecto",
  "Documentamos tu Proceso",
  "Creamos tu Contenido",
  "Grabamos tu Podcast",
  "Producimos tu Música",
  "Diseñamos tu Sonido",
  "Mezclamos tus Canciones",
  "Grabamos tu Locución",
  "Musicalizamos tu Historia",
  "Creamos tu Identidad Sonora",
  "Damos Voz a tu Marca",
  "Convertimos Ideas en Sistemas",
  "Tu Proyecto Puede Crecer",
  "Tu Marca Necesita Movimiento",
  "Tu Historia Merece una Película",
  "Tu Idea Merece una Identidad",
  "Haz Visible tu Proyecto",
  "Construyamos Algo Juntos",
  "Todo Comienza con una Idea",
  "Activa tu Próximo Proyecto",
  "Entra al Sistema Creativo",
  "Regresa al Sistema",
  "LATTICCE Sigue Creando",
] as const;

const MESSAGE_INTERVAL_MS = 4000;

export default function DynamicTabTitle() {
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
      document.title = RETURN_MESSAGES[messageIndex];
      messageIndex = (messageIndex + 1) % RETURN_MESSAGES.length;
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
  }, []);

  return null;
}
