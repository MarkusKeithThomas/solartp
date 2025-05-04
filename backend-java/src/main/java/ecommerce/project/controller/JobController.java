package ecommerce.project.controller;

import ecommerce.project.baseresponse.BaseResponse;
import ecommerce.project.dtorequest.JobFormRequest;
import ecommerce.project.dtoresponse.JobResponse;
import ecommerce.project.entity.JobApplicationEntity;
import ecommerce.project.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/job")
@RequiredArgsConstructor
public class JobController {
    private final JobService jobService;

    @PostMapping("/add-list-job")
    public ResponseEntity<?> addListJob(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty() || !file.getOriginalFilename().endsWith(".xlsx")) {
            return ResponseEntity.badRequest().body("Vui lòng tải lên một file Excel hợp lệ.");
        }
        int listSize = jobService.addListJob(file);
        return ResponseEntity.ok(new BaseResponse(200, "Bạn đã thêm công việc vào thành công", listSize));
    }

    @GetMapping("/get-list-job")
    public ResponseEntity<?> getListJob(){
        List<JobResponse> list = jobService.getListJob();
        return ResponseEntity.ok(new BaseResponse(200,"Danh Sách Job",list));
    }

    @GetMapping("/{slug}")
        public ResponseEntity<?> getJobBySlug(@PathVariable String slug){
            JobResponse job = jobService.getJobBySlug(slug);
            return ResponseEntity.ok(new BaseResponse(200,"Job bạn đã lấy thành công", job));
    }

    @PostMapping("/ung-tuyen")
    public ResponseEntity<?> applyJob(@ModelAttribute JobFormRequest form) throws IOException {
        JobApplicationEntity job = jobService.addJobForm(form);
        return ResponseEntity.ok(new BaseResponse(200,"Bạn đã ứng tuyển thành công",job));
    }
}
