import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Služba",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({ name: "shortDescription", type: "string" }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [
    {
      title: "Pořadí",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
