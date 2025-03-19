package ecommerce.project.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface CSVServices {
    void saveCSVToDatabase(MultipartFile file, List<MultipartFile> image1);
}
