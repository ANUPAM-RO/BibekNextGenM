import { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const initials = (name = "") =>
  name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function Department({ memberData }) {
  const [activeTab, setActiveTab] = useState("fed");
  const fontendData = memberData?.filter((data) => data?.type === "fed");
  const backendData = memberData?.filter((data) => data?.type === "bed");
  const devopsData = memberData?.filter((data) => data?.type === "dvd");

  const data = [
    {
      label: "Frontend",
      value: "fed",
      dataArr: fontendData,
    },
    {
      label: "Backend",
      value: "bed",
      dataArr: backendData,
    },
    {
      label: "DevOps",
      value: "dvd",
      dataArr: devopsData,
    },
  ];

  return (
    <Tabs value="fed">
      <TabsHeader
        className="mb-4 bg-slate-900/5 p-1.5"
        indicatorProps={{
          className:
            "bg-gradient-to-r from-primary to-secondary shadow-md shadow-primary/30 rounded-lg",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={`font-semibold transition-colors ${
              activeTab === value ? "text-white" : "text-slate-500"
            }`}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, dataArr }) => (
          <TabPanel key={value} value={value} className="p-0">
            <div className="overflow-x-auto rounded-xl border border-white/60 ring-1 ring-black/5">
              <table className="table w-full">
                <thead>
                  <tr className="bg-primary/5 text-slate-600 text-xs uppercase tracking-wide">
                    <th>Employee</th>
                    <th>Id</th>
                    <th>Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {dataArr?.length ? (
                    dataArr.map((emp) => (
                      <tr
                        key={emp?.member_Id}
                        className="hover:bg-primary/5 transition-colors"
                      >
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-sm shadow-primary/30 flex items-center justify-center text-xs font-bold">
                              {initials(emp?.member_Name)}
                            </div>
                            <span className="font-medium text-slate-900">
                              {emp?.member_Name}
                            </span>
                          </div>
                        </td>
                        <td className="text-slate-500">{emp?.member_Id}</td>
                        <td className="text-slate-500">{emp?.designation}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center text-slate-400 py-6">
                        No employees in this department.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
