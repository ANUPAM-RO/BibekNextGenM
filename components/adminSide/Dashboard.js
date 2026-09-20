import { useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { database } from "../../firebaseconfig";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Plus, Pencil, Trash2, LayoutDashboard } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";

const Panel = ({ title, addHref, addLabel, children }) => (
  <div className="card bg-base-100 border border-slate-100 shadow-soft">
    <div className="card-body p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        {addHref && (
          <Link href={addHref} className="self-start sm:self-auto">
            <button className="btn btn-sm btn-primary gap-1 whitespace-nowrap">
              <Plus size={14} /> {addLabel}
            </button>
          </Link>
        )}
      </div>
      {children}
    </div>
  </div>
);

const EditBtn = ({ onClick }) => (
  <button
    className="btn btn-xs sm:btn-sm btn-outline btn-warning gap-1"
    onClick={onClick}
  >
    <Pencil size={14} />
    <span className="hidden sm:inline">Edit</span>
  </button>
);

const DeleteBtn = ({ onClick }) => (
  <button
    className="btn btn-xs sm:btn-sm btn-outline btn-error gap-1"
    onClick={onClick}
  >
    <Trash2 size={14} />
    <span className="hidden sm:inline">Delete</span>
  </button>
);

const ActionCell = ({ children }) => (
  <td>
    <div className="flex items-center gap-2">{children}</div>
  </td>
);

const Dashboard = () => {
  const [memberData, setMemberData] = useState([]);
  const [notificationData, setNotificationData] = useState([]);
  const [confirm, setConfirm] = useState(null);

  const router = useRouter();

  const getMemberData = async () => {
    getDocs(collection(database, "members")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setMemberData(data);
    });
  };

  const getNotificationData = async () => {
    getDocs(collection(database, "notifications")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setNotificationData(data);
    });
  };

  const deleteMember = async (id) => {
    await deleteDoc(doc(database, "members", id));
    setMemberData((prev) => prev.filter((m) => m.member_Id !== id));
  };

  const deleteNotification = async (id) => {
    await deleteDoc(doc(database, "notifications", id));
    setNotificationData((prev) => prev.filter((n) => n.message_Id !== id));
  };

  const requestDelete = (message, action) => {
    setConfirm({
      message,
      onConfirm: async () => {
        await action();
        setConfirm(null);
      },
    });
  };

  useEffect(() => {
    getMemberData();
    getNotificationData();
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-primary text-primary-content flex items-center justify-center">
            <LayoutDashboard size={22} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        </div>

        <Panel
          title="Notifications"
          addHref="/adminPage/notification-add"
          addLabel="Add Notification"
        >
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="text-slate-500 text-xs uppercase tracking-wide">
                  <th>ID</th>
                  <th>Message</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!!notificationData.length ? (
                  notificationData?.map((s) => (
                    <tr className="hover" key={s.message_Id}>
                      <td>{s.message_Id}</td>
                      <td>{s.message}</td>
                      <ActionCell>
                        <DeleteBtn
                          onClick={() =>
                            requestDelete(
                              `Delete this notification? This cannot be undone.`,
                              () => deleteNotification(s.message_Id)
                            )
                          }
                        />
                      </ActionCell>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center text-slate-400 py-6">
                      No notifications yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel
          title="All Members"
          addHref="/adminPage/member-add"
          addLabel="Add Member"
        >
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="text-slate-500 text-xs uppercase tracking-wide">
                  <th></th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!!memberData.length ? (
                  memberData?.map((s) => (
                    <tr className="hover" key={s.member_Id}>
                      <td>
                        {s.member_Image ? (
                          <img
                            src={s.member_Image}
                            alt={s.member_Name}
                            className="h-9 w-9 rounded-full object-cover ring-1 ring-slate-200"
                          />
                        ) : (
                          <div className="h-9 w-9 rounded-full bg-slate-100 ring-1 ring-slate-200" />
                        )}
                      </td>
                      <td>{s.member_Id}</td>
                      <td className="font-medium text-slate-800">
                        {s.member_Name}
                      </td>
                      <td>{s.designation}</td>
                      <td>
                        <span className="badge badge-ghost">{s.type}</span>
                      </td>
                      <ActionCell>
                        <EditBtn
                          onClick={() =>
                            router.push(`/adminPage/member-add/${s.member_Id}`)
                          }
                        />
                        <DeleteBtn
                          onClick={() =>
                            requestDelete(
                              `Delete member "${s.member_Name}"? This cannot be undone.`,
                              () => deleteMember(s.member_Id)
                            )
                          }
                        />
                      </ActionCell>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-slate-400 py-6">
                      No members added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      <ConfirmDialog
        open={!!confirm}
        title="Confirm delete"
        message={confirm?.message}
        onConfirm={confirm?.onConfirm}
        onCancel={() => setConfirm(null)}
      />
    </div>
  );
};

export default Dashboard;
