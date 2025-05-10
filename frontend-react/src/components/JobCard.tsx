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

      function generateStableNumberFromSlug(slug: string, min = 10, max = 30): number {
        let hash = 0;
        for (let i = 0; i < slug.length; i++) {
          hash = slug.charCodeAt(i) + ((hash << 5) - hash);
        }
        const result = Math.abs(hash % (max - min + 1)) + min;
        return result;
      }
      const today = new Date();
      const dateOnlyStr = today.toISOString().split('T')[0]; 
      const number = generateStableNumberFromSlug((job.htmlContent.toString()+dateOnlyStr)!);


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
          <FaRegClock /> Còn {number} ngày
        </span>
      </div>
    </div>
  </Link>
</div>
  );
};
export default JobCard;
