import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [UserRole, setUserRole] = useState(role);
  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
    // console.log(e.target.value);
  };
  const UpdateUserRole = async (e) => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: UserRole,
      }),
    });

    const responseData = await fetchResponse.json();
    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
    // console.log("role updated", responseData);
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 pt-10 pb-6 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto w-full bg-slate-200 p-4 max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <div className="flex justify-between items-center my-4">
          <p>Role :</p>
          <select
            className="py-1 px-4 border"
            value={UserRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="mx-auto w-fit block py-1 px-3 text-white bg-blue-600 rounded-full hover:bg-blue-700"
          onClick={UpdateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
