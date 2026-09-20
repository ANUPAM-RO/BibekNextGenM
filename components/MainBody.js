import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/firebaseconfig";
import Department from "./Department";
import { Users, Bell } from "lucide-react";

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
  const [message, setMessage] = useState([]);

  const getMemberData = async () => {
    getDocs(collection(database, "members")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setMemberData(data);
    });
  };

  const getNotificationData = async () => {
    getDocs(collection(database, "notifications")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setMessage(data);
    });
  };

  useEffect(() => {
    getMemberData();
    getNotificationData();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <section>
        <SectionHeader
          icon={<Bell size={20} />}
          title="Notices"
          accent="text-warning"
        />
        <div className="flex flex-col gap-3">
          {!!message?.length ? (
            message?.map((data, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-900/5 ring-1 ring-black/5 px-5 py-4 transition hover:shadow-2xl hover:-translate-y-0.5"
              >
                <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-warning to-amber-400 text-white shadow-lg shadow-warning/30 flex items-center justify-center">
                  <Bell size={16} />
                </div>
                <p className="text-slate-700 leading-relaxed pt-1.5">
                  {data?.message}
                </p>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-sm">No notices right now.</p>
          )}
        </div>
      </section>

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
