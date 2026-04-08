import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Container from "@/components/ui/Container";

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About Us", href: "#about" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-[#F3F6FC] text-[#143D59]">
      <Container className="grid gap-10 py-16 md:grid-cols-3">
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
                <a
                  href={link.href}
                  className="text-sm transition-colors hover:text-[#0f2e45]"
                >
                  {link.label}
                </a>
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
            <p>123 Design Street, Creative City</p>
            <p>Email: ibad1657@gmail.com</p>
            <p>Phone: +1 (555) 123-4567</p>
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
      <div className="border-t border-[#143D59]/20 py-4 text-center text-xs text-[#143D59]/70">
        &copy; {new Date().getFullYear()} Kayns Shop. All rights reserved.
      </div>
    </footer>
  );
}
