import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/firebaseconfig";
import AddMember from "@/components/adminSide/AddMember";

const UpdateMember = () => {
  const [memberData, setMemberData] = useState([]);
  const router = useRouter();
  const memberId = router?.query?.memberId;

  const getMemberData = async () => {
    getDocs(collection(database, "members")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setMemberData(data);
    });
  };

  const memberDetails = memberData?.filter(
    (data) => data?.member_Id === memberId
  );

  useEffect(() => {
    getMemberData();
  }, []);
  return (
    <div>
      <AddMember memberData={memberDetails[0]} />
    </div>
  );
};

export default UpdateMember;
