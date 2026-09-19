import React from "react";
import Nav from "./Nav";
import MainBody from "./MainBody";

const HomePage = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-slate-50" aria-hidden="true" />
      <div
        className="fixed inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />
      <div
        className="fixed -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="fixed top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-secondary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-accent/[0.06] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50"
        aria-hidden="true"
      />
      <div className="relative">
        <Nav />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <MainBody />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
