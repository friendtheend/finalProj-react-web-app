import { Link } from "react-router-dom";

interface CourseNavCardProps {
  title: string;
  imageUrl: string;
  section: string;
  buttonText: string;
  linkUrl: string;
}

const CourseNavCard: React.FC<CourseNavCardProps> = ({
  title,
  imageUrl,
  section,
  buttonText,
  linkUrl,
}) => {
  return (
    // width: between 250 and 270 pixels
    <div className="wd-dashboard-course col" style={{ width: "265px" }}>
      <div className="card rounded-3 overflow-hidden">
        <Link
          className="wd-dashboard-course-link text-decoration-none text-dark"
          to={linkUrl}
        >
          <img src={imageUrl} width="100%" height={160} alt={title} />
          <div className="card-body">
            <h5 className="wd-dashboard-course-title card-title">{title}</h5>
            <p className="card-text">{section}
            <p className="card-text fs6">
          202410_1 Fall 2024 Semester Fall Term Grad
          </p>
            </p>
            <button className="btn btn-primary">{buttonText}</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CourseNavCard;
