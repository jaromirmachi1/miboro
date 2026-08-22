import { defineField, defineType } from "sanity";

export const companyInfo = defineType({
  name: "companyInfo",
  title: "Firemní údaje",
  type: "document",
  fields: [
    defineField({ name: "phone", title: "Telefon", type: "string" }),
    defineField({ name: "email", title: "E-mail", type: "string" }),
    defineField({ name: "address", title: "Adresa", type: "string" }),
    defineField({ name: "ico", title: "IČO", type: "string" }),
    defineField({ name: "dic", title: "DIČ", type: "string" }),
    defineField({ name: "yearFounded", title: "Rok založení", type: "number" }),
    defineField({
      name: "employeeCount",
      title: "Počet zaměstnanců",
      type: "string",
    }),
    defineField({
      name: "annualRevenue",
      title: "Roční obrat (aktualizuj ročně!)",
      type: "string",
    }),
    defineField({
      name: "selfPerformedPercent",
      title: "% prací vlastní kapacitou",
      type: "string",
    }),
    defineField({
      name: "certificates",
      title: "Certifikáty",
      type: "array",
      of: [{ type: "file" }],
    }),
  ],
});
