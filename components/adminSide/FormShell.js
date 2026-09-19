import React from "react";

export const FormShell = ({ icon, title, children }) => (
  <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
    <div className="w-full max-w-lg">
      <div className="card bg-base-100 border border-slate-100 shadow-soft">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-6">
            {icon && (
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                {icon}
              </div>
            )}
            <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  </div>
);

export const Field = ({ label, children }) => (
  <div className="mb-5">
    <label className="block text-sm font-medium text-slate-700 mb-1.5">
      {label}
    </label>
    {children}
  </div>
);

export const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20";

export const SubmitButton = ({ children, disabled }) => (
  <button
    type="submit"
    disabled={disabled}
    className="w-full mt-2 rounded-xl bg-primary py-3 font-semibold text-primary-content shadow-soft transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);
