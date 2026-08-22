export const statusLabels: Record<string, string> = {
  ongoing: "Probíhající",
  completed: "Dokončeno",
};

export const sectorLabels: Record<string, string> = {
  public: "Veřejný",
  private: "Soukromý",
};

export function formatPhoneHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export function formatYearRange(from?: number, to?: number): string {
  if (!from) return "—";
  if (!to) return `${from} — probíhá`;
  return from === to ? String(from) : `${from} — ${to}`;
}
