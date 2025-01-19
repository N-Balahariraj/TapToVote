// Libraries
import React from "react";
import { useMediaQuery } from "react-responsive";
import { SignOut } from "../Firebase/Utils/users.utils";
import { useAuth } from "../Firebase/Utils/AuthContext";

// Icons
import { MdLogout } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

// Data
import { peopleList } from "../Data/People";

export default function Account({ selPg, setSelPg }) {
  const isMobile = useMediaQuery({ minWidth: "320px", maxWidth: "1075px" });
  let isAccount = selPg == "Account" ? "Account" : "hidden";
  const { user, userDetails } = useAuth();
  return (
    <nav className={`${isMobile ? isAccount : "Account"} `}>
      <header className="h-[10%] w-[100%] flex justify-between items-center">
        <img src="/Vote.png" alt="Logo" className="h-[100%]" />
        {isMobile && (
          <IoIosClose
            className="text-2xl"
            onClick={() => {
              setSelPg("Events");
            }}
          />
        )}
      </header>
      <dl className="h-[50%] w-[90%] flex flex-col flex-wrap overflow-y-auto">
        <dt className="text-lg font-bold mb-5">Your votes</dt>
        {peopleList.map((P) =>
          P.votes.map((e) => {
            return (
              <dd className="h-[10%] w-[100%] flex justify-around">
                <span className="h-[90%] w-[10%] border-2 rounded-lg text-center text-sm">
                  {e.charAt(0)}
                </span>
                <span className="h-[90%] w-[75%]">{e}</span>
              </dd>
            );
          })
        )}
      </dl>
      <footer className="h-[10%] w-[80%] flex self-start items-center justify-between border-2 rounded-lg p-1 gap-2">
        {user.photoURL ? (
          <img
            src="/pictures/me.jpg"
            alt="profile"
            className="h-[100%] rounded-full border-2"
          />
        ) : (
          <span className="h-[100%] w-[30%] border-2 rounded-full flex items-center justify-center text-2xl font-bold bg-slate-400">{userDetails.name.charAt(0)}</span>
        )}
        <div className="h-[100%] w-[60%] flex flex-col items-center">
          <span className="w-[100%]">{userDetails.name}</span>
          <button
            className="w-[100%] flex items-center gap-2 text-[#4f46e5]"
            onClick={(e) => {
              e.preventDefault();
              SignOut();
            }}
          >
            LogOut
            <MdLogout className="font-extrabold" />
          </button>
        </div>
      </footer>
    </nav>
  );
}
