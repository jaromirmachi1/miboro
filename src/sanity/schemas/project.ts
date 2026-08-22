import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Realizace",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Název projektu",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Stav",
      type: "string",
      options: {
        list: [
          { title: "Probíhající", value: "ongoing" },
          { title: "Dokončeno", value: "completed" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sector",
      title: "Sektor",
      type: "string",
      options: {
        list: [
          { title: "Veřejný", value: "public" },
          { title: "Soukromý", value: "private" },
        ],
      },
    }),
    defineField({ name: "investor", title: "Investor", type: "string" }),
    defineField({ name: "location", title: "Lokalita", type: "string" }),
    defineField({ name: "projectType", title: "Typ projektu", type: "string" }),
    defineField({ name: "yearFrom", title: "Rok zahájení", type: "number" }),
    defineField({ name: "yearTo", title: "Rok dokončení", type: "number" }),
    defineField({ name: "budget", title: "Rozpočet (volitelné)", type: "string" }),
    defineField({ name: "scope", title: "Rozsah prací", type: "text" }),
    defineField({ name: "challenge", title: "Výzva", type: "text" }),
    defineField({ name: "solution", title: "Řešení", type: "text" }),
    defineField({ name: "outcome", title: "Výsledek", type: "text" }),
    defineField({
      name: "coverImage",
      title: "Hlavní fotografie",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "Fotogalerie",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "featured",
      title: "Zvýraznit na homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", status: "status", media: "coverImage" },
    prepare: ({ title, status, media }) => ({
      title,
      subtitle: status === "ongoing" ? "Probíhající" : "Dokončeno",
      media,
    }),
  },
});
