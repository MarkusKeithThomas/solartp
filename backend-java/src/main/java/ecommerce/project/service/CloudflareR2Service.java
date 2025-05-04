package ecommerce.project.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CloudflareR2Service {
    List<String> uploadFileToCloudFlare(List<MultipartFile> file);
    List<String> getAllUrlImage ();
    void deleteFileFromCloudFlare(String fileKey);
    void deleteFileFromUrl(String imageUrl);

    String uploadFilePdfCVToCloudFlare(MultipartFile file) throws IOException;

}
