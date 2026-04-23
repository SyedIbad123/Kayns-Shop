import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import Container from "@/components/ui/Container";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Uniform", href: "/uniform" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact Us", href: "/quote" },
];

const socialLinks = [
  {
    icon: Facebook,
    href: "https://web.facebook.com/profile.php?id=61576106605297",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/kaynsinternational1/",
    label: "Instagram",
  },
];

const informationLinks = [
  { label: "Delivery Information", href: "/delivery-information" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#143D59] bg-[#F3F6FC] text-[#143D59]">
      <Container className="grid gap-10 py-16 md:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Kayns Shop"
              width={140}
              height={56}
              className="h-12 w-auto rounded-sm p-1 object-contain"
            />
          </div>
          <p className="text-sm leading-relaxed">
            We design your imagination. Premium design solutions crafted with
            passion and precision.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 text-lg font-semibold text-[#143D59]">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors hover:text-[#0f2e45]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div>
          <h4 className="mb-4 text-lg font-semibold text-[#143D59]">
            Information
          </h4>
          <ul className="space-y-2">
            {informationLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors hover:text-[#0f2e45]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="mb-4 text-lg font-semibold text-[#143D59]">
            Contact Info
          </h4>
          <address className="space-y-2 text-sm not-italic">
            <p>
              Flat 22 Barons Court Church Lane, NW9 8AD, London, United Kingdom
            </p>
            <p>Email: kaynsintl44@gmail.com</p>
          </address>
          <div className="mt-6 flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#143D59]/10 transition-colors hover:bg-[#143D59]/20"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-[#143D59]/20 py-4 text-xs text-[#143D59]/70">
        <Container className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Kayns Shop. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#143D59]/80">
              Powered By Quantas Tech
            </span>
            <Image
              src="/quantastech_logo.png"
              alt="Quantas Tech"
              width={24}
              height={24}
              className="h-6 w-auto object-contain"
            />
          </div>
        </Container>
      </div>
    </footer>
  );
}
