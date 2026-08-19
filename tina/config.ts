import { defineConfig } from "tinacms";

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
    "main",
  token: process.env.TINA_TOKEN!,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
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
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "quoteAttribution",
            label: "Atribución de la frase (ej: G.F.)",
          },
          {
            type: "object",
            name: "slides",
            label: "Slides del carousel",
            list: true,
            ui: {
              itemProps: (_item: Record<string, unknown>, index: number) => ({
                label: `Slide ${(index ?? 0) + 1}`,
              }),
            },
            fields: [
              {
                type: "string",
                name: "bg",
                label: "Color de fondo (hex)",
              },
              {
                type: "string",
                name: "textColor",
                label: "Color del texto",
                options: [
                  { label: "Coral Reef (#c6ba9f)", value: "#c6ba9f" },
                  { label: "Black Haze (#e5e6e6)", value: "#e5e6e6" },
                ],
              },
              {
                type: "image",
                name: "image",
                label: "Fotografía de fondo (opcional)",
              },
            ],
          },
        ],
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
                label: "URL del video (Vimeo / YouTube)",
                ui: {
                  description:
                    "Pega cualquier URL de YouTube o Vimeo (la de la barra del navegador). El sitio la convierte automáticamente.",
                },
              },
              { type: "string", name: "title", label: "Título" },
              { type: "string", name: "date",  label: "Fecha" },
            ],
          },
          {
            type: "object",
            name: "grid",
            label: "Grilla de videos",
            list: true,
            ui: {
              itemProps: (item: Record<string, unknown>) => ({ label: (item?.title as string) ?? "Video" }),
            },
            fields: [
              {
                type: "string",
                name: "embedUrl",
                label: "URL del video (Vimeo / YouTube)",
                ui: {
                  description:
                    "Pega cualquier URL de YouTube o Vimeo (la de la barra del navegador). El sitio la convierte automáticamente.",
                },
              },
              { type: "string", name: "title", label: "Título" },
              { type: "string", name: "date",  label: "Fecha" },
            ],
          },
        ],
      },

      /* ─────────────────────── GALERÍA ─────────────────────── */
      {
        name: "galeria",
        label: "Galería",
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
              itemProps: (item: Record<string, unknown>) => ({ label: (item?.alt as string) ?? "Foto" }),
            },
            fields: [
              { type: "image",  name: "src", label: "Imagen" },
              { type: "string", name: "alt", label: "Descripción (alt text)" },
            ],
          },
        ],
      },

      /* ─────────────────────── CONÓCEME ────────────────────── */
      {
        name: "conoceme",
        label: "Conóceme",
        path: "content/conoceme",
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          /* ── Portrait ── */
          {
            type: "image",
            name: "portraitSrc",
            label: "Foto de perfil",
          },
          {
            type: "string",
            name: "portraitAlt",
            label: "Alt text de la foto",
          },

          /* ── CV sections (Teatro, Formación, etc.) ── */
          {
            type: "object",
            name: "cvSections",
            label: "Secciones CV",
            list: true,
            ui: {
              itemProps: (item: Record<string, unknown>) => ({
                label: (item?.title as string) ?? "Sección",
              }),
              description:
                "Añade tantas secciones como necesites (Teatro, Formación, Cortometrajes…). Cada entrada admite saltos de línea.",
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Título de la sección",
              },
              {
                type: "object",
                name: "items",
                label: "Entradas",
                list: true,
                ui: {
                  itemProps: (item: Record<string, unknown>) => ({
                    label:
                      ((item?.text as string) ?? "").split("\n")[0] || "Entrada",
                  }),
                },
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Texto (usa Enter para nuevas líneas dentro de la misma entrada)",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },

          /* ── Idiomas (one-liner list) ── */
          {
            type: "object",
            name: "idiomas",
            label: "Idiomas",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Título",
              },
              {
                type: "string",
                name: "items",
                label: "Idiomas (uno por entrada)",
                list: true,
                ui: {
                  description: "Escribe cada idioma por separado, p. ej. «Español • Nativo»",
                },
              },
            ],
          },

          /* ── Bio (two-column on frontend, single textarea here) ── */
          {
            type: "string",
            name: "bioHeading",
            label: "Título del bio",
          },
          {
            type: "string",
            name: "bio",
            label: "Biografía (el texto se divide en dos columnas automáticamente)",
            ui: {
              component: "textarea",
              description:
                "Escribe el texto corrido. El sitio lo divide en dos columnas igual. Usa líneas en blanco para separar párrafos.",
            },
          },
        ],
      },

      /* ─────────────────────── SITIO (redes sociales) ──────── */
      {
        name: "site",
        label: "Sitio",
        path: "content/site",
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "socialLinks",
            label: "Redes sociales",
            list: true,
            ui: {
              itemProps: (item: Record<string, unknown>) => ({
                label: (item?.platform as string) ?? "Red social",
              }),
              description:
                "Estos links aparecen en el footer, en el orden en que los agregues.",
            },
            fields: [
              {
                type: "string",
                name: "platform",
                label: "Plataforma (texto a mostrar, ej: Instagram)",
              },
              {
                type: "string",
                name: "url",
                label: "URL del perfil",
              },
            ],
          },
        ],
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
            label: "Foto de fondo",
          },
          {
            type: "string",
            name: "backgroundAlt",
            label: "Alt text de la foto de fondo",
          },
        ],
      },
    ],
  },
});
