package ecommerce.project.controller;

import ecommerce.project.baseresponse.BaseResponse;
import ecommerce.project.dtorequest.CategoryDTO;
import ecommerce.project.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    // CREATE
    @PostMapping("/add")
    public ResponseEntity<?> createCategory(@Validated @RequestBody CategoryDTO dto) {
        boolean isCreate = categoryService.createCategory(dto);
        return ResponseEntity.ok().body(new BaseResponse(200,"Bạn đã tạo createCategory thành công",isCreate));
    }

    // READ - GET ALL
    @GetMapping("/get-categories")
    public ResponseEntity<?> getAllCategories() {
        List<CategoryDTO> list = categoryService.getAllCategories();
        return ResponseEntity.ok(new BaseResponse(200,"Bạn lấy danh sách thành công",list));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @Valid @RequestBody CategoryDTO dto) {
        CategoryDTO updated = categoryService.updateCategory(id, dto);
        return ResponseEntity.ok(new BaseResponse(200,"Bạn đã cập nhật thành công",updated));
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(new BaseResponse(200,"Bạn đã xoá thành công",null));
    }
}
