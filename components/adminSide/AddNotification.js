import { useState } from "react";
import { database } from "../../firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { BellPlus } from "lucide-react";
import { FormShell, Field, inputClass, SubmitButton } from "./FormShell";

const AddNotification = () => {
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    const messageId = `${Date.now()}`;
    try {
      await setDoc(doc(database, "notifications", messageId), {
        message_Id: messageId,
        message: message,
      });
      router.push("/adminPage");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Failed to save the notification. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormShell icon={<BellPlus size={20} />} title="Add Notification">
      <form onSubmit={onHandleSubmit}>
        <Field label="Message">
          <textarea
            className={inputClass}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Field>
        <SubmitButton disabled={saving}>
          {saving ? "Saving..." : "Create"}
        </SubmitButton>
      </form>
    </FormShell>
  );
};

export default AddNotification;
