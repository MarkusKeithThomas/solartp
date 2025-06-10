package ecommerce.project.service;

import ecommerce.project.entity.ArticleEntity;
import ecommerce.project.exception.UploadExcelException;
import ecommerce.project.repository.ArticleRepository;
import ecommerce.project.utils.StringUtil;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;

@Service
public class ExcelServiceImpl implements ExcelServices{
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private StringUtil stringUtil;
    @Autowired
    private CloudflareR2Service cloudflareR2Service;

    @Override
    public String saveExcelToDatabase(MultipartFile file, List<MultipartFile> images) {
        List<String> imageList = cloudflareR2Service.uploadFileToCloudFlare(images);

        try (InputStream inputStream = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(inputStream)) {

            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();

            // Bỏ qua dòng tiêu đề
            if (rows.hasNext()) rows.next();

            int articleIndex = 0;

            while (rows.hasNext()) {
                Row row = rows.next();
                ArticleEntity article = new ArticleEntity();

                String title = getCellValue(row.getCell(0)).trim();
                if (title.isEmpty()) {
                    // Bỏ qua dòng không có tiêu đề
                    continue;
                }

                article.setTitle(title);
                article.setSlugTitle(stringUtil.toSlug(title));

                // Lấy các thông tin từ Excel
                article.setHeader1(getCellValue(row.getCell(2)));
                article.setContent11(getCellValue(row.getCell(3)));
                article.setContent12(getCellValue(row.getCell(4)));
                article.setHeader2(getCellValue(row.getCell(5)));
                article.setContent21(getCellValue(row.getCell(6)));
                article.setContent22(getCellValue(row.getCell(7)));
                article.setHeader3(getCellValue(row.getCell(8)));
                article.setContent31(getCellValue(row.getCell(9)));
                article.setContent32(getCellValue(row.getCell(10)));
                article.setHeader4(getCellValue(row.getCell(11)));
                article.setContent41(getCellValue(row.getCell(12)));
                article.setContent42(getCellValue(row.getCell(13)));
                article.setAltImage1(getCellValue(row.getCell(15)));
                article.setAltImage2(getCellValue(row.getCell(17)));
                article.setDateCreate(LocalDate.now().atStartOfDay());
                article.setNote(getCellValue(row.getCell(18)));


                // Gán ảnh tương ứng
                int imgIndex = articleIndex * 2;
                if (imgIndex < imageList.size()) {
                    article.setImage1Url(imageList.get(imgIndex)); // hoặc upload trước rồi lấy URL
                }
                if (imgIndex + 1 < imageList.size()) {
                    article.setImage2Url(imageList.get(imgIndex + 1));
                }

                // Lưu bài viết
                articleRepository.save(article);
                articleIndex++;
            }

        } catch (IOException e) {
            throw new UploadExcelException("Lỗi khi đọc file Excel: " + e.getMessage());
        }

        return "Thêm dữ liệu từ Excel thành công.";
    }
    private String getCellValue(Cell cell) {
        if (cell == null) return "";
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                return String.valueOf(cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            default:
                return "";
        }
    }
}
