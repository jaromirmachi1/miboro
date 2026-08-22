import Link from "next/link";
import { navLinks } from "@/config/site";
import { formatPhoneHref } from "@/lib/utils/format";
import { Container } from "@/components/ui/Container";
import { MiboroLogo } from "@/components/ui/MiboroLogo";

interface FooterProps {
  phone: string;
  email: string;
  address: string;
  ico: string;
  dic: string;
}

export function Footer({ phone, email, address, ico, dic }: FooterProps) {
  return (
    <footer className="border-t border-bila/10 bg-grafit text-bila">
      <Container className="grid gap-14 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <MiboroLogo href="/" className="h-8 w-auto sm:h-9" />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-bila">
            Stavební firma pro veřejné i soukromé zakázky v Moravskoslezském
            kraji.
          </p>
        </div>

        <div className="lg:col-span-3">
          <p className="text-label text-bila/90">Navigace</p>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-bila/90 transition-colors hover:text-bila"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <p className="text-label text-bila/90">Kontakt</p>
          <ul className="mt-5 space-y-3 text-sm text-bila/90">
            <li>
              <a href={formatPhoneHref(phone)} className="hover:text-bila">
                {phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="hover:text-bila">
                {email}
              </a>
            </li>
            <li>{address}</li>
            <li>
              IČO {ico} · DIČ {dic}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-bila/10">
        <Container className="flex flex-col gap-3 py-5 text-[11px] uppercase tracking-[0.16em] text-bila/90 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MIBORO</p>
          <Link href="/gdpr" className="hover:text-bila/90">
            Zásady zpracování osobních údajů
          </Link>
        </Container>
      </div>
    </footer>
  );
}
