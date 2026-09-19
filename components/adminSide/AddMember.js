import { useState } from "react";
import { database } from "../../firebaseconfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { UserPlus, ImagePlus } from "lucide-react";
import { FormShell, Field, inputClass, SubmitButton } from "./FormShell";
import { uploadImageToCloudinary, MAX_IMAGE_SIZE_BYTES } from "@/lib/cloudinary";

const AddMember = ({ memberData }) => {
  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [designation, setDesignation] = useState("");
  const [type, setType] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const displayedImage = imagePreview || memberData?.member_Image || "";

  const router = useRouter();

  const onImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      alert("Image must be 2MB or smaller.");
      event.target.value = "";
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);
    try {
      const memberImage = imageFile
        ? await uploadImageToCloudinary(imageFile)
        : memberData?.member_Image || "";

      if (!memberData?.member_Id) {
        await setDoc(doc(database, "members", `${memberId}`), {
          member_Id: memberId,
          member_Name: memberName,
          designation: designation,
          type: type,
          member_Image: memberImage,
        });
      } else {
        await updateDoc(
          doc(database, "members", `${memberId || memberData?.member_Id}`),
          {
            member_Id: memberId || memberData?.member_Id,
            member_Name: memberName || memberData?.member_Name,
            designation: designation || memberData?.designation,
            type: type || memberData?.type,
            member_Image: memberImage,
          }
        );
      }
      router.push("/adminPage");
      setMemberId("");
      setMemberName("");
      setDesignation("");
      setType("");
      setImageFile(null);
      setImagePreview("");
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to save the member. Please try again.");
    } finally {
      setUploading(false);
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
        <Field label="Photo (max 2MB)">
          <div className="flex items-center gap-4">
            {displayedImage && (
              <img
                src={displayedImage}
                alt="Preview"
                className="h-16 w-16 rounded-full object-cover ring-1 ring-slate-200"
              />
            )}
            <label className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-600 cursor-pointer hover:bg-slate-100 transition">
              <ImagePlus size={16} />
              {displayedImage ? "Change photo" : "Upload photo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onImageChange}
              />
            </label>
          </div>
        </Field>
        <SubmitButton disabled={uploading}>
          {uploading
            ? "Saving..."
            : !memberData?.member_Id
            ? "Create"
            : "Update"}
        </SubmitButton>
      </form>
    </FormShell>
  );
};

export default AddMember;
