package ecommerce.project.service;

import ecommerce.project.dtorequest.JobFormRequest;
import ecommerce.project.dtorequest.JobRequest;
import ecommerce.project.dtoresponse.JobResponse;
import ecommerce.project.entity.JobApplicationEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface JobService {
    int addListJob(MultipartFile file);
    List<JobResponse> getListJob();
    JobResponse getJobBySlug(String slug);
    JobApplicationEntity addJobForm(JobFormRequest formRequest) throws IOException;
}
