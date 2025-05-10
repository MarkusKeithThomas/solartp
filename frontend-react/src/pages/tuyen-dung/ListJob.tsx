import { useEffect, useState } from "react";
import JobCard from "../../components/JobCard";
import { JobList } from "../../type/job";
import { jobApi } from "../../api/jobApi";


export function ListJob() {
    const [jobList, setJobList] = useState<JobList[]>();
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true)
                const res = await jobApi.getListJob();
                setJobList(res);
            } catch (error) {
                console.error("Failed to fetch job list:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="bg-light">
          <h1 className="text-center">Danh Sách Vị Trí Tuyển Nhân Sự</h1>
      
          {loading ? (
            <p className="text-center py-4">Đang tải dữ liệu</p>
          ) : (
            jobList?.map((item) => (
                <JobCard key={item.id} job={item} />
            ))
          )}
        </div>
      );
}