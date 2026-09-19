import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/firebaseconfig";
import Department from "./Department";
import { Users } from "lucide-react";

const SectionHeader = ({ icon, title, accent = "text-primary" }) => (
  <div className="flex items-center gap-2.5 mb-4">
    <span
      className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white/60 ring-1 ring-slate-900/5 ${accent}`}
    >
      {icon}
    </span>
    <h2 className="text-xl font-bold text-slate-900 tracking-tight">
      {title}
    </h2>
  </div>
);

const MainBody = () => {
  const [memberData, setMemberData] = useState([]);

  const getMemberData = async () => {
    getDocs(collection(database, "members")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setMemberData(data);
    });
  };

  useEffect(() => {
    getMemberData();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <section>
        <SectionHeader icon={<Users size={20} />} title="Employees" />
        <div className="card bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl shadow-slate-900/5 ring-1 ring-black/5">
          <div className="card-body">
            <Department memberData={memberData} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainBody;
