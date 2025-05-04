import { Link } from "react-router-dom";
import "../styles/job-card.css";
import {
  FaMapMarkedAlt,
  FaNetworkWired,
  FaRegClock,
  FaSolarPanel,
} from "react-icons/fa";
import { JobList } from "../type/job";

interface Props {
  job: JobList;
}

const JobCard: React.FC<Props> = ({ job }) => {


  return (  
    <div className="job-card">
  <div className="job-icon-wrapper">
    <FaSolarPanel className="job-logo-icon" />
  </div>
  <Link to={`/list-job/${job.slug}`} className="text-decoration-none text-dark flex-grow-1">
    <div className="job-info ms-4">
      <h3 className="job-title">{job.title}</h3>
      <p>
        <FaNetworkWired /> Yêu cầu kinh nghiệm: {job.experience}
      </p>
      <div className="job-meta-footer">
        <span>
          <FaMapMarkedAlt /> Nơi làm việc: {job.placeWork}
        </span>
        <span>
          <FaRegClock /> Còn {job.datOutOfDate}
        </span>
      </div>
    </div>
  </Link>
</div>
  );
};
export default JobCard;
