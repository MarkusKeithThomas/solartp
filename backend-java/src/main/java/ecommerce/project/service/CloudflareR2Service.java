package ecommerce.project.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CloudflareR2Service {
    List<String> uploadFileToCloudFlare(List<MultipartFile> file);
    List<String> getAllUrlImage ();
}
