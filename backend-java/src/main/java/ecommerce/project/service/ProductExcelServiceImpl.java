package ecommerce.project.service;

import ecommerce.project.baseresponse.CustomPageResponse;
import ecommerce.project.dtorequest.ProductDTO;
import ecommerce.project.dtorequest.ProductImageDTO;
import ecommerce.project.dtorequest.ProductSpecificationDTO;
import ecommerce.project.dtoresponse.ProductImageResponseDTO;
import ecommerce.project.dtoresponse.ProductResponseDTO;
import ecommerce.project.dtoresponse.SpecificationResponseDTO;
import ecommerce.project.entity.CategoryEntity;
import ecommerce.project.entity.ProductEntity;
import ecommerce.project.entity.ProductImageEntity;
import ecommerce.project.entity.ProductSpecificationEntity;
import ecommerce.project.exception.CategoryNotFoundException;
import ecommerce.project.exception.DeleteProductException;
import ecommerce.project.exception.ProductNotFoundException;
import ecommerce.project.exception.UploadExcelException;
import ecommerce.project.repository.CategoryRepository;
import ecommerce.project.repository.ProductImageRepository;
import ecommerce.project.repository.ProductRepository;
import ecommerce.project.repository.ProductSpecificationRepository;
import ecommerce.project.utils.ProductMapperUtils;
import ecommerce.project.utils.StringUtil;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductExcelServiceImpl implements ProductExcelService{
    private final ProductRepository productRepository;
    private final ProductSpecificationRepository productSpecificationRepository;
    private final CategoryRepository categoryRepository;
    private final ProductImageRepository productImageRepository;
    @Autowired
    private StringUtil stringUtil;
    @Autowired
    private final ProductMapperUtils productMapperUtils;


    @Override
    public ProductResponseDTO updateProduct(Long id, ProductDTO productDTO) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        if (productDTO.getName() != null) {
            product.setName(productDTO.getName());
        }

        if (productDTO.getSlug() != null) {
            product.setSlug(productDTO.getSlug());
        }

        if (productDTO.getNewPrice() != null) {
            product.setNewPrice(productDTO.getNewPrice());
        }

        if (productDTO.getOldPrice() != null) {
            product.setOldPrice(productDTO.getOldPrice());
        }

        if (productDTO.getDescription() != null) {
            product.setDescription(productDTO.getDescription());
        }

        if (productDTO.getCategory_id() != null) {
            if (!categoryRepository.existsById(productDTO.getCategory_id())) {
                throw new CategoryNotFoundException(productDTO.getCategory_id());
            }
            product.setCategoryId(productDTO.getCategory_id());
        }

        if (productDTO.getStock_quantity() > 0) {
            product.setStockQuantity(productDTO.getStock_quantity());
        }

        if (productDTO.getSold_quantity() > 0) {
            product.setSoldQuantity(productDTO.getSold_quantity());
        }

        if (productDTO.getWattage() != null) {
            product.setWattage(productDTO.getWattage());
        }

        ProductEntity updatedProduct = productRepository.save(product);
        return productMapperUtils.toProductResponseDTO(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        ProductEntity product = productRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new DeleteProductException("Không tìm thấy sản phẩm với ID: " + id));
        product.setIsActive(false);
        productRepository.save(product);
    }

    @Override
    public CustomPageResponse<ProductResponseDTO> getAllProducts(Pageable pageable) {
        Page<ProductEntity> productPage = productRepository.findByIsActiveTrue(pageable);

        List<ProductResponseDTO> content = productPage.stream().map(product -> {
            ProductResponseDTO dto = productMapperUtils.toProductResponseDTO(product);

            List<ProductImageEntity> imageEntities = productImageRepository.findByProductIdOrderByDisplayOrderAsc(product.getId());
            List<ProductImageResponseDTO> imageDTOs = imageEntities.stream()
                    .map(productMapperUtils::toProductImageResponseDTO)
                    .toList();
            dto.setImages(imageDTOs);

            List<ProductSpecificationEntity> specs = productSpecificationRepository.findByProductIdOrderByDisplayOrderAsc(product.getId());
            List<SpecificationResponseDTO> specDTOs = specs.stream()
                    .map(productMapperUtils::toSpecificationResponseDTO)
                    .toList();
            Map<String, List<SpecificationResponseDTO>> groupedSpecs = specDTOs.stream()
                    .collect(Collectors.groupingBy(SpecificationResponseDTO::getSpecGroup));
            dto.setSpecificationGroups(groupedSpecs);

            return dto;
        }).toList();

        return new CustomPageResponse<>(
                content,
                productPage.getNumber(),
                productPage.getSize(),
                productPage.getTotalElements(),
                productPage.getTotalPages(),
                productPage.isFirst(),
                productPage.isLast()
        );
    }

    @Override
    public ProductDTO getProductById(Long id) {
        return null;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public List<String> createProduct(MultipartFile file) {
        List<String> list = new ArrayList<>();

        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheet("Product");
            Map<String, Long> skuToProductId = new HashMap<>();
            for (int i = 2; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                ProductDTO dto = convertRowToProductDTO(row);
                if (dto != null) {
                    ProductEntity savedProductEntity = productRepository.save(productMapperUtils.toProductEntity(dto));
                    skuToProductId.put(dto.getSku_product(),savedProductEntity.getId());
                    list.add("✅ Thêm " + dto.getSku_product() + " sản phẩm và thông số thành công!");
                    if (dto.getImages() != null){
                        for (int j=0; j  < dto.getImages().size();j++){
                            ProductImageEntity pro = productMapperUtils.toImageEntity(dto.getImages().get(j), savedProductEntity.getId() );
                            productImageRepository.save(pro);
                        }
                    }
                }
            }
            Sheet sheet2 = workbook.getSheet("ProductSpecification");
            for (int i = 2; i <= sheet2.getLastRowNum(); i++){
                Row row = sheet2.getRow(i);
                ProductSpecificationDTO productSpecificationDTO = convertRowToProductSpecificationDTO(row);
                if (productSpecificationDTO != null){
                    Long productId = skuToProductId.get(productSpecificationDTO.getSku());
                    if (productId != null){
                        productSpecificationRepository.save(productMapperUtils.toSpecificationEntity(productSpecificationDTO,productId));
                    }
                }
            }
            return list;

        } catch (IOException e) {
            throw new UploadExcelException("Lỗi khi đọc file Excel. Kiểm tra trường SKU và Ngành hàng" + e.getMessage());
        }
    }




    private String getString(Cell cell) {
        return (cell != null) ? cell.toString().trim() : null;
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
            dto.setSlug(stringUtil.toSlug(name));

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
