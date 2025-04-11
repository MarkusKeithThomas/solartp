package ecommerce.project.service;

import ecommerce.project.dtorequest.VoucherCreateRequest;
import ecommerce.project.dtorequest.VoucherUpdateRequest;
import ecommerce.project.entity.VoucherEntity;
import ecommerce.project.exception.VoucherException;
import ecommerce.project.model.DiscountType;
import ecommerce.project.repository.VoucherRepository;
import ecommerce.project.dtoresponse.VoucherResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class VoucherServiceImpl implements VoucherService {

    private final VoucherRepository voucherRepo;
    private final RedisTemplate<String, VoucherEntity> voucherRedisTemplate;
    private static final String VOUCHER_KEY_PREFIX = "voucher:";

    @Override
    public VoucherEntity update(Long id, VoucherUpdateRequest request) {
        VoucherEntity entity = voucherRepo.findById(id)
                .orElseThrow(() -> new VoucherException("Voucher không tồn tại"));

        if (request.getDiscountType() != null) entity.setDiscountType(request.getDiscountType());
        if (request.getDiscountValue() != null) entity.setDiscountValue(request.getDiscountValue());
        if (request.getMinOrderValue() != null) entity.setMinOrderValue(request.getMinOrderValue());
        if (request.getMaxDiscountValue() != null) entity.setMaxDiscountValue(request.getMaxDiscountValue());
        if (request.getQuantity() != null) entity.setQuantity(request.getQuantity());
        if (request.getIsActive() != null) entity.setIsActive(request.getIsActive());
        if (request.getStartAt() != null) entity.setStartAt(request.getStartAt());
        if (request.getEndAt() != null) entity.setEndAt(request.getEndAt());

        voucherRedisTemplate.delete(VOUCHER_KEY_PREFIX + entity.getCode()); // clear Redis cache
        return voucherRepo.save(entity);
    }


    @Override
    public VoucherResponse validate(String codeInput, BigDecimal orderTotal) {
        String code = codeInput.trim().toUpperCase();
        String redisKey = VOUCHER_KEY_PREFIX + code;

        VoucherEntity voucher = voucherRedisTemplate.opsForValue().get(redisKey);

        if (voucher == null) {
            voucher = voucherRepo.findByCodeIgnoreCase(code).orElse(null);
            if (voucher == null){
                return new VoucherResponse(null,BigDecimal.valueOf(0),DiscountType.FIXED);
            }
            // Cache nếu vẫn còn lượt dùng và đang hoạt động
            if (voucher.getIsActive() && voucher.getUsed() < voucher.getQuantity()) {
                voucherRedisTemplate.opsForValue().set(redisKey, voucher, Duration.ofHours(1));
            }
        }

        LocalDateTime now = LocalDateTime.now();

        if (Boolean.FALSE.equals(voucher.getIsActive()))
            throw new VoucherException("Voucher không hoạt động");

        if (voucher.getStartAt() != null && now.isBefore(voucher.getStartAt()))
            throw new VoucherException("Voucher chưa bắt đầu");

        if (voucher.getEndAt() != null && now.isAfter(voucher.getEndAt()))
            throw new VoucherException("Voucher đã hết hạn");

        if (voucher.getUsed() >= voucher.getQuantity())
            throw new VoucherException("Voucher đã hết lượt sử dụng");

        if (voucher.getMinOrderValue() != null && orderTotal.compareTo(voucher.getMinOrderValue()) < 0)
            throw new VoucherException("Chưa đạt giá trị tối thiểu");

        BigDecimal discount = switch (voucher.getDiscountType()) {
            case PERCENT -> orderTotal.multiply(voucher.getDiscountValue()).divide(BigDecimal.valueOf(100));
            case FIXED -> voucher.getDiscountValue();
        };

        if (voucher.getMaxDiscountValue() != null && discount.compareTo(voucher.getMaxDiscountValue()) > 0) {
            discount = voucher.getMaxDiscountValue();
        }

        return new VoucherResponse(voucher.getCode(), discount, voucher.getDiscountType());
    }

    @Override
    public VoucherEntity create(VoucherCreateRequest request) {
        VoucherEntity entity = VoucherEntity.builder()
                .code(request.getCode().trim().toUpperCase())
                .discountType(request.getDiscountType())
                .discountValue(request.getDiscountValue())
                .minOrderValue(request.getMinOrderValue())
                .maxDiscountValue(request.getMaxDiscountValue())
                .quantity(request.getQuantity())
                .startAt(request.getStartAt())
                .endAt(request.getEndAt())
                .isActive(true)
                .used(0)
                .build();
        return voucherRepo.save(entity);
    }
}
