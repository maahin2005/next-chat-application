import React from "react";
import { data } from "@/utils/letschat/contactChatList";
import Contact from "./Contact";

const ContactList: React.FC = () => {
  return (
    <div className="md:max-h-[450px] overflow-y-scroll scrollbar-none overscroll-contain"
    style={{ scrollbarWidth: "none" }}
    >
      {data?.map((el: any) => (
        <Contact data={el} key={el.id} />
      ))}
    </div>
  );
};

export default ContactList;
