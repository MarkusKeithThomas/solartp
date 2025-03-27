package ecommerce.project.service;

import ecommerce.project.dto.CategoryDTO;
import ecommerce.project.dto.ProductDTO;
import ecommerce.project.dto.ProductImageDTO;
import ecommerce.project.dto.ProductSpecificationDTO;
import ecommerce.project.entity.CategoryEntity;
import ecommerce.project.entity.ProductEntity;
import ecommerce.project.entity.ProductSpecificationEntity;
import ecommerce.project.exception.UploadExcelException;
import ecommerce.project.repository.CategoryRepository;
import ecommerce.project.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProductExcelServiceImpl implements ProductExcelService{
    private final ProductRepository productRepository;
    private CategoryRepository categoryRepository;


    @Override
    public String createProduct(MultipartFile file) {

        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheet("Product");
            Map<String, Long> skuToProductId = new HashMap<>();


            for (int i = 2; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                ProductDTO dto = convertRowToProductDTO(row);
                if (dto != null) {





                }
            }

            Sheet sheet2 = workbook.getSheet("ProductSpecification");
            for (int i = 2; i <= sheet2.getLastRowNum(); i++){
                Row row = sheet.getRow(i);
                ProductSpecificationDTO productSpecificationDTO = convertRowToProductSpecificationDTO(row);
                if (productSpecificationDTO != null){


                }
            }

        } catch (IOException e) {
            throw new UploadExcelException("Lỗi khi đọc file Excel. Kiểm tra trường SKU và Ngành hàng" + e.getMessage());
        }
        return null;
    }

    @Override
    public ProductDTO updateProduct(Long id, ProductDTO dto) {
        return null;
    }

    @Override
    public void deleteProduct(Long id) {

    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return null;
    }

    @Override
    public ProductDTO getProductById(Long id) {
        return null;
    }
    private String getString(Cell cell) {
        return (cell != null) ? cell.toString().trim() : null;
    }
    private ProductEntity mapToEntity(ProductDTO dto) {
        ProductEntity productEntity = new ProductEntity();
        productEntity.setSkuProduct(dto.getSku_product());
        productEntity.setName(dto.getName());
        productEntity.setSlug(dto.getSlug());
        productEntity.setNewPrice(dto.getNewPrice());
        productEntity.setOldPrice(dto.getOldPrice());
        productEntity.setCategoryId(dto.getCategory_id());
        productEntity.setStockQuantity(dto.getStock_quantity());
        productEntity.setSoldQuantity(dto.getSold_quantity());
        productEntity.setWattage(dto.getWattage());
        return productEntity;
    }

    //Cân tìm giá trị product_id cho sản phẩm
    private ProductSpecificationEntity mapToDTO(ProductSpecificationDTO dto){
        ProductSpecificationEntity productSpecificationEntity = new ProductSpecificationEntity();
        productSpecificationEntity.set
    }

    private ProductDTO mapToResponseDTO(ProductEntity entity) {
        ProductDTO dto = new ProductDTO();


        return dto;
    }

    private ProductSpecificationDTO convertRowToProductSpecificationDTO(Row row){
        try {
            // Bỏ qua dòng tiêu đề hoặc dòng trống
            if (row == null || row.getCell(0) == null) return null;
            String sku = getString(row.getCell(0));
            if (sku == null) return null;

            ProductSpecificationDTO dto = new ProductSpecificationDTO();

            dto.setSku(sku);
            dto.setSpecGroup(getString(row.getCell(1)));
            dto.setName(getString(row.getCell(2)));
            dto.setValue(getString(row.getCell(3)));
            dto.setDisplayOrder((int) getNumeric(row.getCell(4)));
            return dto;


        } catch (Exception e) {
            throw new UploadExcelException("Các trường thông tin không được trống: SKU, Ngành hàng" + e.getMessage());
        }
    }

    private ProductDTO convertRowToProductDTO(Row row) {
        try {
            // Bỏ qua dòng tiêu đề hoặc dòng trống
            if (row == null || row.getCell(0) == null) return null;
            String sku = getString(row.getCell(2));
            String name = getString(row.getCell(1));
            if (sku == null || name == null) return null;

            ProductDTO dto = new ProductDTO();

            long categoryId = (long) getNumeric(row.getCell(0));
            CategoryEntity category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với ID = " + categoryId));
            dto.setCategory_id(category.getId());

            dto.setName(name);
            dto.setSku_product(sku);
            dto.setWattage(getString(row.getCell(3)));
            dto.setNewPrice(BigDecimal.valueOf(getNumeric(row.getCell(4))));
            dto.setOldPrice(BigDecimal.valueOf(getNumeric(row.getCell(5))));
            dto.setStock_quantity((int) getNumeric(row.getCell(6)));
            dto.setSold_quantity((int) getNumeric(row.getCell(7)));
            dto.setDescription(getString(row.getCell(8)));

            // Đọc tối đa 6 ảnh
            List<ProductImageDTO> images = new ArrayList<>();
            for (int i = 0; i < 6; i++) {
                int urlIndex = 9 + i * 2;
                int altIndex = urlIndex + 1;
                String imageUrl = getString(row.getCell(urlIndex));
                if (imageUrl != null && !imageUrl.isBlank()) {
                    ProductImageDTO img = new ProductImageDTO();
                    img.setImageUrl(imageUrl);
                    img.setAltText(getString(row.getCell(altIndex)));
                    img.setIsThumbnail(i == 0); // Ảnh đầu là thumbnail
                    img.setDisplayOrder(i + 1);
                    images.add(img);
                }
            }
            dto.setImages(images);
            return dto;

        } catch (Exception e) {
            throw new UploadExcelException("Các trường thông tin không được trống: SKU, Ngành hàng" + e.getMessage());
        }
    }

    private double getNumeric(Cell cell) {
        if (cell == null) return 0;
        return switch (cell.getCellType()) {
            case NUMERIC -> cell.getNumericCellValue();
            case STRING -> {
                try { yield Double.parseDouble(cell.getStringCellValue()); }
                catch (NumberFormatException e) { yield 0; }
            }
            default -> 0;
        };
    }
}
