import MyNotificationsSec from "@/components/dashboard/MyNotificationsSec";
import MyPersonalInfoSec from "@/components/dashboard/MyPersonalInfoSec";
import MyProfileSec from "@/components/dashboard/MyProfileSec";
import MySecuritySec from "@/components/dashboard/MySecuritySec";
import MyStarredContectsSec from "@/components/dashboard/MyStarredContectsSec";
import { CgProfile } from "react-icons/cg";
import { MdSecurity } from "react-icons/md";
import { RiNotificationBadgeLine } from "react-icons/ri";
import { RiUserStarLine } from "react-icons/ri";
import { BsPersonLock } from "react-icons/bs";
import { MdBlock } from "react-icons/md";
import MyBlockedUsersSec from "@/components/dashboard/MyBlockedUsersSec";

export const data = [
  {
    id: 1,
    name: "My Profile",
    link: "my-profile",
    content: <MyProfileSec />,
    icon: <CgProfile className="text-lg" />,
  },
  {
    id: 5,
    name: "Personal Info",
    link: "personal-info",
    content: <MyPersonalInfoSec />,
    icon: <BsPersonLock className="text-lg" />,
  },
  {
    id: 4,
    name: "Star Contacts",
    link: "star-contacts",
    content: <MyStarredContectsSec />,
    icon: <RiUserStarLine className="text-lg" />,
  },
  {
    id: 3,
    name: "Notifications",
    link: "notifications",
    content: <MyNotificationsSec />,
    icon: <RiNotificationBadgeLine className="text-lg" />,
  },
  {
    id: 2,
    name: "Security",
    link: "security",
    content: <MySecuritySec />,
    icon: <MdSecurity className="text-lg" />,
  },
 
  {
    id: 6,
    name: "Blocked Users",
    link: "blocked-users",
    content: <MyBlockedUsersSec />,
    icon: <MdBlock className="text-lg" />,
  },
];
