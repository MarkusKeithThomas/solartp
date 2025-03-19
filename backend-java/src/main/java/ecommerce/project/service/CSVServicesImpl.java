package ecommerce.project.service;

import ecommerce.project.entity.ArticleEntity;
import ecommerce.project.exception.UploadCSVException;
import ecommerce.project.repository.ArticleRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class CSVServicesImpl implements CSVServices{
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private FilesService filesService;
    @Autowired
    private CloudflareR2Service cloudflareR2Service;


    @Override
    public void saveCSVToDatabase(MultipartFile file, List<MultipartFile> images) {
        try {
            BufferedReader fileReader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
            CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT.withDelimiter(';').withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());
            List<ArticleEntity> articles = new ArrayList<>();
            List<String> imageList = cloudflareR2Service.uploadFileToCloudFlare(images);
            if (imageList.size() ==  images.size()){
                for (CSVRecord csvRecord : csvParser) {
                    ArticleEntity article = new ArticleEntity();
                    article.setTitle(csvRecord.get("Tên bài viết"));
                    article.setHeader1(csvRecord.get("Tiêu đề 1"));
                    article.setContent11(csvRecord.get("Nội dung 1.1"));
                    article.setContent12(csvRecord.get("Nội dung 1.2"));
                    article.setHeader2(csvRecord.get("Tiêu đề 2"));
                    article.setContent21(csvRecord.get("Nội dung 2.1"));
                    article.setContent22(csvRecord.get("Nội dung 2.2"));
                    article.setHeader3(csvRecord.get("Tiêu đề 3"));
                    article.setContent31(csvRecord.get("Nội dung 3.1"));
                    article.setContent32(csvRecord.get("Nội dung 3.2"));
                    article.setHeader4(csvRecord.get("Tiêu đề 4"));
                    article.setContent41(csvRecord.get("Nội dung 4.1"));
                    article.setContent42(csvRecord.get("Nội dung 4.2"));
                    article.setImage1Url(imageList.getFirst());
                    article.setAltImage1(csvRecord.get("AltImage1"));
                    article.setImage2Url(imageList.get(1));
                    article.setAltImage2(csvRecord.get("AltImage2"));
                    articles.add(article);
                }

            }
            articleRepository.saveAll(articles);
        } catch (Exception e) {
            throw new UploadCSVException(e.getMessage());
        }
    }
    }
