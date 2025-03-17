package ecommerce.project.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface CSVServices {
    void saveCSVToDatabase(MultipartFile file, MultipartFile image1, MultipartFile image2);
}
