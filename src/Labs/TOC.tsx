import { useLocation } from "react-router";
// TOC means table of contents 目录
export default function TOC() {
  // useLocation 是来自 react-router 的一个钩子，用来获取当前浏览器地址栏的路径（pathname）。
  // const { pathname } = useLocation();：通过这个钩子，可以访问当前页面的 URL 路径，用于确定用户目前所在的页面。
  const { pathname } = useLocation();
  return (
    // use pills from bootstrap, pills is a css style, 
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a id="wd-a" href="#/Labs" className="nav-link">
          Labs
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a1" href="#/Labs/Lab1"
          className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`}>
          Lab 1
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a2" href="#/Labs/Lab2"
          className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`}>
          Lab 2
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a3" href="#/Labs/Lab3"
          className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`}>
          Lab 3
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a4" href="#/Labs/Lab4"
          className={`nav-link ${pathname.includes("Lab4") ? "active" : ""}`}>
          Lab 4
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a4" href="#/Labs/Lab5"
          className={`nav-link ${pathname.includes("Lab5") ? "active" : ""}`}>
          Lab 5
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="#/Kanbas" className="nav-link">
          Kanbas
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="https://github.com/k1guo" className="nav-link">
          My GitHub
        </a>
      </li>

      <li className="nav-item">
        <a id="wd-github-repo" href="https://github.com/k1guo/kanbas-node-server-app" className="nav-link" target="_blank" rel="noopener noreferrer">
          Kanbas GitHub Repository
        </a>
      </li>


      <li className="nav-item">
        <a id="wd-heroku-app" href="https://kanbas-node-server-app.herokuapp.com" className="nav-link" target="_blank" rel="noopener noreferrer">
          Heroku Deployment
        </a>
      </li>
    </ul>
  );
}
