import React from "react";
import { Building2 } from "lucide-react";

const Nav = () => {
  return (
    <div className="sticky top-0 z-30 h-20 flex items-center justify-between px-6 md:px-10 bg-neutral text-neutral-content shadow-soft">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
          <Building2 size={20} />
        </div>
        <span className="ml-3 leading-tight">
          <span className="block text-xl md:text-2xl font-bold tracking-tight">
            Bibek <span className="text-primary">NextGen</span>
          </span>
          <span className="block text-[10px] md:text-xs uppercase tracking-[0.2em] text-neutral-content/60">
            Technologies
          </span>
        </span>
      </div>
    </div>
  );
};

export default Nav;
