import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("MIBORO")
    .items([
      S.listItem()
        .title("Firemní údaje")
        .id("companyInfo")
        .child(
          S.document()
            .schemaType("companyInfo")
            .documentId("companyInfo")
        ),
      S.divider(),
      S.documentTypeListItem("project").title("Realizace"),
      S.documentTypeListItem("service").title("Služby"),
    ]);
