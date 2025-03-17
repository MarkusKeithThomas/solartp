package ecommerce.project.service;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface FilesService {
    String uploadFile(MultipartFile file);
    Resource downloadFile(String fileName);
}
