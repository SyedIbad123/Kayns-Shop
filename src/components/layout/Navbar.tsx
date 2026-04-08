"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Uniform", href: "/uniform" },
  { label: "Contact Us", href: "/quote" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const syncHash = () => {
      setActiveHash(window.location.hash || "");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  const isNavLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    if (href.startsWith("/#")) {
      const targetHash = href.slice(1);
      return pathname === "/" && activeHash === targetHash;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const customizeActive =
    pathname === "/customize/7" || pathname.startsWith("/customize/");

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <Container className="flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Kayns Shop Home"
        >
          <Image
            src="/logo.png"
            alt="Kayns Shop"
            width={156}
            height={140}
            priority
            className="h-12 w-auto object-cover sm:h-14"
          />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "nav-link inline-flex items-center justify-center rounded-full px-3 py-1.5 text-sm font-medium",
                isNavLinkActive(link.href) ? "nav-link-active" : null,
              )}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/customize/7"
            className={cn(
              "site-btn inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em]",
              customizeActive ? "site-btn-active" : null,
            )}
          >
            Customize Now
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-64" : "max-h-0",
        )}
      >
        <nav
          className="flex flex-col gap-4 px-6 pb-6"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "nav-link inline-flex w-fit items-center justify-center rounded-full px-3 py-1.5 text-sm font-medium",
                isNavLinkActive(link.href) ? "nav-link-active" : null,
              )}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/customize/7"
            className={cn(
              "site-btn inline-flex w-fit items-center justify-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em]",
              customizeActive ? "site-btn-active" : null,
            )}
            onClick={() => setMobileOpen(false)}
          >
            Customize Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
