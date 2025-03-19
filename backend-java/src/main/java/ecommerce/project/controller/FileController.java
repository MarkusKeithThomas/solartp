package ecommerce.project.controller;

import ecommerce.project.baseresponse.BaseResponse;
import ecommerce.project.exception.UploadFileToCloudFlareException;
import ecommerce.project.service.CloudflareR2Service;
import ecommerce.project.service.FilesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/file")
public class FileController {

    @Autowired
    private FilesService filesService;
    @Autowired
    private CloudflareR2Service cloudflareR2Service;

    //tao duong dan de tai file ve imageDto.setUrlName("http://localhost:8080/download/"+image.getUrlName()); tra ve link file
    @GetMapping("download/{fileName}")
    public ResponseEntity<?> downloadFile(@PathVariable String fileName) {
        Resource resource = filesService.downloadFile(fileName);
        // Tự động xác định Content-Type dựa trên tên file
        String contentType = "application/octet-stream"; // Default
        if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
            contentType = MediaType.IMAGE_JPEG_VALUE;
        } else if (fileName.endsWith(".png")) {
            contentType = MediaType.IMAGE_PNG_VALUE;
        } else if (fileName.endsWith(".gif")) {
            contentType = MediaType.IMAGE_GIF_VALUE;
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType)) // Xác định loại file
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                .body(resource);
    }
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("listfile") List<MultipartFile> files){
        if (files.isEmpty()) {
            return ResponseEntity.badRequest().body("Không có file nào được chọn!");
        }
        List<String> imageUrl = cloudflareR2Service.uploadFileToCloudFlare(files);
        return ResponseEntity.ok(imageUrl);
    }

}
