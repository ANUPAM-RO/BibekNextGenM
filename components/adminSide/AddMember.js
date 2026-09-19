import { useState } from "react";
import { database } from "../../firebaseconfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { UserPlus } from "lucide-react";
import { FormShell, Field, inputClass, SubmitButton } from "./FormShell";

const AddMember = ({ memberData }) => {
  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [designation, setDesignation] = useState("");
  const [type, setType] = useState("");

  const router = useRouter();
  const onHandleSubmit = (event) => {
    event.preventDefault();
    if (!memberData?.member_Id) {
      setDoc(doc(database, "members", `${memberId}`), {
        member_Id: memberId,
        member_Name: memberName,
        designation: designation,
        type: type,
      })
        .then(() => {
          console.log("store successfully");
          router.push("/adminPage");
          setMemberId("");
          setMemberName("");
          setDesignation("");
          setType("");
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to save the member. Please try again.");
        });
    } else {
      updateDoc(
        doc(database, "members", `${memberId || memberData?.member_Id}`),
        {
          member_Id: memberId || memberData?.member_Id,
          member_Name: memberName || memberData?.member_Name,
          designation: designation || memberData?.designation,
          type: type || memberData?.type,
        }
      )
        .then(() => {
          console.log("store successfully");
          router.push("/adminPage");
          setMemberId("");
          setMemberName("");
          setDesignation("");
          setType("");
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to update the member. Please try again.");
        });
    }
  };
  return (
    <FormShell
      icon={<UserPlus size={20} />}
      title={!memberData?.member_Id ? "Add Member" : "Update Member"}
    >
      <form onSubmit={onHandleSubmit}>
        <Field label="Member Id">
          <input
            className={inputClass}
            type="text"
            value={memberId || memberData?.member_Id || ""}
            onChange={(e) => setMemberId(e.target.value)}
          />
        </Field>
        <Field label="Member Name">
          <input
            className={inputClass}
            type="text"
            value={memberName || memberData?.member_Name || ""}
            onChange={(e) => setMemberName(e.target.value)}
          />
        </Field>
        <Field label="Designation">
          <textarea
            className={inputClass}
            value={designation || memberData?.designation || ""}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </Field>
        <Field label="Type">
          <select
            className={inputClass}
            value={type || memberData?.type || ""}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled>
              Select department
            </option>
            <option value="fed">Frontend</option>
            <option value="bed">Backend</option>
            <option value="dvd">DevOps</option>
          </select>
        </Field>
        <SubmitButton>
          {!memberData?.member_Id ? "Create" : "Update"}
        </SubmitButton>
      </form>
    </FormShell>
  );
};

export default AddMember;
