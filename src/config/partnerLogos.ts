export interface PartnerLogo {
  name: string;
  src: string;
  invert?: boolean;
}

export const partnerLogos: PartnerLogo[] = [
  {
    name: "Statutární město Ostrava",
    src: "/images/Logo_me%CC%8Csta_Ostravy.svg",
  },
  {
    name: "Město Opava",
    src: "/images/opava.png",
    invert: true,
  },
  {
    name: "Město Hlučín",
    src: "/images/hlucin.svg",
  },
  {
    name: "Město Kravaře",
    src: "/images/kravare.png",
    invert: true,
  },
  {
    name: "Proficredit",
    src: "/images/proficredit.png",
  },
  {
    name: "RT Torax",
    src: "/images/rttorax.png",
  },
  {
    name: "Satum",
    src: "/images/satum.svg",
  },
];
