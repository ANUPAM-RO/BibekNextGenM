import React from "react";
import { Phone, Mail } from "lucide-react";

const Nav = () => {
  return (
    <div className="sticky top-0 z-30 h-20 md:h-24 flex items-center justify-between px-6 md:px-10 bg-[#062621] text-neutral-content shadow-2xl shadow-black/40">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="flex items-center">
          <img
            src="/company_logo.png"
            alt="Bibek NextGen Technologies"
          className="h-16 w-16 md:h-20 md:w-20 rounded-xl object-contain"
          />
      </div>

      <div className="flex items-center gap-3">
        <a
          href="tel:+918918510914"
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-sm font-semibold text-primary-content shadow-lg shadow-primary/30 transition hover:brightness-110 active:scale-[0.97]"
        >
          <Phone size={16} />
          <span className="hidden sm:inline">Call Now</span>
        </a>
        <a
          href="mailto:basubibek14@gmail.com"
          className="flex items-center gap-2 rounded-full border border-neutral-content/30 bg-neutral-content/5 px-4 py-2.5 text-sm font-semibold text-neutral-content backdrop-blur-sm transition hover:bg-neutral-content/10 active:scale-[0.97]"
        >
          <Mail size={16} />
          <span className="hidden sm:inline">Email Us</span>
        </a>
      </div>
    </div>
  );
};

export default Nav;
