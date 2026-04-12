"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact Us", href: "/quote" },
];

const navLinksAfterDropdowns = navLinks.slice(1); // Portfolio, Uniform, Contact Us

const capDropdownItems = [
  { label: "Beanie", href: "/collection/1" },
  { label: "Baggy Cap", href: "/collection/2" },
  { label: "Bucket Hat", href: "/collection/3" },
  { label: "Flat Peak Cap", href: "/collection/4" },
  { label: "Sun Hat", href: "/collection/5" },
  { label: "Trucker Cap", href: "/collection/6" },
  { label: "Visor", href: "/collection/7" },
  { label: "Performance Cap", href: "/collection/23" },
  { label: "Honour Cap", href: "/collection/24" },
];

const uniformDropdownItems = [
  { label: "Cricket", href: "/uniform/cricket" },
  { label: "Football", href: "/uniform/football" },
  { label: "Basketball", href: "/uniform/basketball" },
  { label: "Rugby", href: "/uniform/rugby" },
  { label: "Netball", href: "/uniform/netball" },
  { label: "Running", href: "/uniform/running" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleDropdownEnter = (key: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(key);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#f3f6fc] shadow-sm">
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
          className="hidden items-center gap-3 md:flex"
          aria-label="Main navigation"
        >
          {/* Home */}
          <Link
            href="/"
            className={cn(
              "nav-link inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium",
              isNavLinkActive("/") ? "nav-link-active" : null,
            )}
          >
            Home
          </Link>

          {/* Custom Caps dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleDropdownEnter("caps")}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              type="button"
              className={cn(
                "no-global-button inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-[#143d59] transition hover:bg-[#143d59]/10",
                openDropdown === "caps" && "bg-[#143d59]/10",
              )}
            >
              Custom Caps & Hats
              <ChevronDown
                size={14}
                className={cn(
                  "transition-transform",
                  openDropdown === "caps" && "rotate-180",
                )}
              />
            </button>
            {openDropdown === "caps" && (
              <div className="absolute left-0 top-full z-50 mt-1 w-48 rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
                {capDropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-xs text-gray-700 transition hover:bg-[#143d59]/10 hover:text-[#143d59]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Custom Uniforms dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleDropdownEnter("uniforms")}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              type="button"
              className={cn(
                "no-global-button inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-[#143d59] transition hover:bg-[#143d59]/10",
                openDropdown === "uniforms" && "bg-[#143d59]/10",
              )}
            >
              Custom Uniforms
              <ChevronDown
                size={14}
                className={cn(
                  "transition-transform",
                  openDropdown === "uniforms" && "rotate-180",
                )}
              />
            </button>
            {openDropdown === "uniforms" && (
              <div className="absolute left-0 top-full z-50 mt-1 w-48 rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
                {uniformDropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-xs text-gray-700 transition hover:bg-[#143d59]/10 hover:text-[#143d59]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Remaining nav links */}
          {navLinksAfterDropdowns.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "nav-link inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium",
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
          mobileOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0",
        )}
      >
        <nav
          className="flex flex-col gap-4 px-6 pb-6"
          aria-label="Mobile navigation"
        >
          {/* Home */}
          <Link
            href="/"
            className={cn(
              "nav-link inline-flex w-fit items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium",
              isNavLinkActive("/") ? "nav-link-active" : null,
            )}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          {/* Mobile: Custom Caps */}
          <div>
            <button
              type="button"
              className="no-global-button inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-[#143d59]"
              onClick={() =>
                setMobileDropdown(mobileDropdown === "caps" ? null : "caps")
              }
            >
              Custom Caps & Hats
              <ChevronDown
                size={14}
                className={cn(
                  "transition-transform",
                  mobileDropdown === "caps" && "rotate-180",
                )}
              />
            </button>
            {mobileDropdown === "caps" && (
              <div className="ml-4 mt-2 flex flex-col gap-1">
                {capDropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-1.5 text-xs text-gray-700 transition hover:bg-[#143d59]/10"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: Custom Uniforms */}
          <div>
            <button
              type="button"
              className="no-global-button inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-[#143d59]"
              onClick={() =>
                setMobileDropdown(
                  mobileDropdown === "uniforms" ? null : "uniforms",
                )
              }
            >
              Custom Uniforms
              <ChevronDown
                size={14}
                className={cn(
                  "transition-transform",
                  mobileDropdown === "uniforms" && "rotate-180",
                )}
              />
            </button>
            {mobileDropdown === "uniforms" && (
              <div className="ml-4 mt-2 flex flex-col gap-1">
                {uniformDropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-1.5 text-xs text-gray-700 transition hover:bg-[#143d59]/10"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Remaining mobile nav links */}
          {navLinksAfterDropdowns.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "nav-link inline-flex w-fit items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium",
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
