import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KanbasNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Dashboard", path: "/Kanbas/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Kanbas/Dashboard", icon: LiaBookSolid },
    { label: "Calendar", path: "/Kanbas/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Kanbas/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
  ];

  return (
    <div
      id="wd-kanbas-navigation"
      style={{ width: 105 }}
      // bottom-0 和底部的距离为0
      // top-0 和顶部的距离为0
      // z-2 - applies z-index: 2 which brings the element above other elements with a lower z-index.
      // d-none 在所有屏幕尺寸下都隐藏元素
      // d-md-block  在中等一集更大屏幕尺寸上显示该元素 >= 768px
      className="list-group rounded-0 position-fixed
         bottom-0 top-0 d-none d-md-block bg-black z-2 ml-2"
    >
      {/* <a> 用于外部链接，导航到一个外部网站 */}
      {/* <a> 标签会触发整个页面的刷新，并导航到新的url */}
      {/* border-0 没有边框，移除边框 */}
      <a
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        className="list-group-item bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" width="75px" />
      </a>
      <Link
        to="/Kanbas/Account"
        className={`list-group-item text-center border-0 bg-black
            ${
              pathname.includes("Account")
                ? "bg-white text-danger"
                : "bg-black text-white"
            }`}
      >
        <FaRegCircleUser
          className={`fs-1 ${
            pathname.includes("Account") ? "text-danger" : "text-white"
          }`}
        />
        <br />
        Account
      </Link>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`list-group-item text-center border-0 bg-black 
              ${
                pathname.includes(link.label)
                  ? "text-danger bg-white"
                  : "text-white bg-black"
              }`}
        >
          {link.icon({ className: "fs-1 text-danger" })}
          <br />
          {link.label}
        </Link>
      ))}

      {/* <Link>标签是React Router提供的组件 */}
      {/* 用于在React应用内部导航时使用，可以避免页面刷新 */}
    </div>
  );
}
