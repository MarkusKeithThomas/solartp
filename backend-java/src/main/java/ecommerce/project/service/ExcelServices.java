package ecommerce.project.service;

import ecommerce.project.entity.ArticleEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface ExcelServices {
   String saveExcelToDatabase(MultipartFile file, List<MultipartFile> image1);
}
