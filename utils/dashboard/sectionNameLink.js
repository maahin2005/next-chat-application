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
import { LiaUserClockSolid } from "react-icons/lia";
import MyRequests from "@/components/dashboard/MyRequests";

export const data = [
  {
    id: 1,
    name: "My Profile",
    link: "my-profile",
    content: <MyProfileSec />,
    icon: <CgProfile className="text-lg" />,
  },
  {
    id: 2,
    name: "Friend Requests",
    link: "friend-requests",
    content: <MyRequests />,
    icon: <LiaUserClockSolid className="text-lg" />,
  },
  {
    id: 3,
    name: "Star Friends",
    link: "star-contacts",
    content: <MyStarredContectsSec />,
    icon: <RiUserStarLine className="text-lg" />,
  },
  {
    id: 4,
    name: "Notifications",
    link: "notifications",
    content: <MyNotificationsSec />,
    icon: <RiNotificationBadgeLine className="text-lg" />,
  },
  {
    id: 5,
    name: "Personal Info",
    link: "personal-info",
    content: <MyPersonalInfoSec />,
    icon: <BsPersonLock className="text-lg" />,
  },

  {
    id: 6,
    name: "Security",
    link: "security",
    content: <MySecuritySec />,
    icon: <MdSecurity className="text-lg" />,
  },

  {
    id: 7,
    name: "Blocked",
    link: "blocked-users",
    content: <MyBlockedUsersSec />,
    icon: <MdBlock className="text-lg" />,
  },
];
