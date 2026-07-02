// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || "main",
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      /* ─────────────────────── HERO (homepage) ─────────────── */
      {
        name: "hero",
        label: "Portada (Hero)",
        path: "content/hero",
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "string",
            name: "quote",
            label: "Frase principal",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "quoteAttribution",
            label: "Atribuci\xF3n de la frase (ej: G.F.)"
          },
          {
            type: "object",
            name: "slides",
            label: "Slides del carousel",
            list: true,
            ui: {
              itemProps: (_item, index) => ({
                label: `Slide ${(index ?? 0) + 1}`
              })
            },
            fields: [
              {
                type: "string",
                name: "bg",
                label: "Color de fondo (hex)"
              },
              {
                type: "string",
                name: "textColor",
                label: "Color del texto",
                options: [
                  { label: "Coral Reef (#c6ba9f)", value: "#c6ba9f" },
                  { label: "Black Haze (#e5e6e6)", value: "#e5e6e6" }
                ]
              },
              {
                type: "image",
                name: "image",
                label: "Fotograf\xEDa de fondo (opcional)"
              }
            ]
          }
        ]
      },
      /* ─────────────────────── VIDEOBOOK ───────────────────── */
      {
        name: "videobook",
        label: "Videobook",
        path: "content/videobook",
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "featured",
            label: "Video destacado",
            fields: [
              {
                type: "string",
                name: "embedUrl",
                label: "URL embed (Vimeo / YouTube)"
              },
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "date", label: "Fecha" }
            ]
          },
          {
            type: "object",
            name: "grid",
            label: "Grilla de videos",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title ?? "Video" })
            },
            fields: [
              {
                type: "string",
                name: "embedUrl",
                label: "URL embed (Vimeo / YouTube)"
              },
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "date", label: "Fecha" }
            ]
          }
        ]
      },
      /* ─────────────────────── GALERÍA ─────────────────────── */
      {
        name: "galeria",
        label: "Galer\xEDa",
        path: "content/galeria",
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "photos",
            label: "Fotos",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.alt ?? "Foto" })
            },
            fields: [
              { type: "image", name: "src", label: "Imagen" },
              { type: "string", name: "alt", label: "Descripci\xF3n (alt text)" }
            ]
          }
        ]
      },
      /* ─────────────────────── CONÓCEME ────────────────────── */
      {
        name: "conoceme",
        label: "Con\xF3ceme",
        path: "content/conoceme",
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "image",
            name: "portraitSrc",
            label: "Foto de perfil"
          },
          {
            type: "string",
            name: "portraitAlt",
            label: "Alt text de la foto"
          },
          {
            type: "string",
            name: "heading",
            label: "T\xEDtulo"
          },
          {
            type: "string",
            name: "bio",
            label: "Biograf\xEDa",
            ui: { component: "textarea" }
          }
        ]
      },
      /* ─────────────────────── CONTACTO ────────────────────── */
      {
        name: "contacto",
        label: "Contacto",
        path: "content/contacto",
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "image",
            name: "backgroundSrc",
            label: "Foto de fondo"
          },
          {
            type: "string",
            name: "backgroundAlt",
            label: "Alt text de la foto de fondo"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
