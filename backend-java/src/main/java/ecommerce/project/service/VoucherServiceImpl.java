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
import java.util.List;
import java.util.Optional;

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
        if (request.getDiscount() != null) entity.setDiscountValue(request.getDiscount());
        if (request.getMinOrderValue() != null) entity.setMinOrderValue(request.getMinOrderValue());
        if (request.getMaxOrderValue() != null) entity.setMaxDiscountValue(request.getMaxOrderValue());
        if (request.getQuantity() != null) entity.setQuantity(request.getQuantity());
        if (request.getActive() != null) entity.setIsActive(request.getActive());
        if (request.getStartAt() != null) entity.setStartAt(LocalDateTime.parse(request.getStartAt()));
        if (request.getEndAt() != null) entity.setEndAt(LocalDateTime.parse(request.getEndAt()));
        if (request.getCode() != null) entity.setCode(request.getCode());
        if (request.getUsed() > 0) entity.setUsed(request.getUsed());

        voucherRedisTemplate.delete(VOUCHER_KEY_PREFIX + entity.getCode()); // clear Redis cache
        voucherRedisTemplate.opsForValue().set(VOUCHER_KEY_PREFIX+entity.getCode(),entity,Duration.ofHours(1));
        return voucherRepo.save(entity);
    }

    @Override
    public List<VoucherResponse> getListVoucher() {
        List<VoucherEntity> entities = voucherRepo.findAll();
        List<VoucherResponse> voucherResponses = entities.stream().map(item -> {
            VoucherResponse voucherResponse = new VoucherResponse();
            voucherResponse.setCode(item.getCode());
            voucherResponse.setDiscount(item.getDiscountValue());
            voucherResponse.setDiscountType(item.getDiscountType());
            voucherResponse.setId(item.getId().intValue());
            voucherResponse.setActive(item.getIsActive());
            voucherResponse.setUsed(item.getUsed());
            voucherResponse.setCreatedAt(item.getCreatedAt().toString());
            voucherResponse.setQuantity(item.getQuantity());
            voucherResponse.setEndAt(item.getEndAt().toString());
            voucherResponse.setUpdatedAt(item.getUpdatedAt().toString());
            voucherResponse.setMaxOrderValue(item.getMaxDiscountValue());
            voucherResponse.setMinOrderValue(item.getMinOrderValue());
            voucherResponse.setStartAt(item.getStartAt().toString());
            return voucherResponse;
        }).toList();
        return voucherResponses;
    }

    @Override
    public VoucherResponse getVoucherById(int id) {
        VoucherEntity item = voucherRepo.findById((long) id)
                .orElseThrow(() -> new VoucherException("Voucher không tồn tại"));
        VoucherResponse voucherResponse = new VoucherResponse();
        voucherResponse.setCode(item.getCode());
        voucherResponse.setDiscount(item.getDiscountValue());
        voucherResponse.setDiscountType(item.getDiscountType());
        voucherResponse.setId(item.getId().intValue());
        voucherResponse.setActive(item.getIsActive());
        voucherResponse.setUsed(item.getUsed());
        voucherResponse.setCreatedAt(item.getCreatedAt().toString());
        voucherResponse.setQuantity(item.getQuantity());
        voucherResponse.setEndAt(item.getEndAt().toString());
        voucherResponse.setUpdatedAt(item.getUpdatedAt().toString());
        voucherResponse.setMaxOrderValue(item.getMaxDiscountValue());
        voucherResponse.setMinOrderValue(item.getMinOrderValue());
        voucherResponse.setStartAt(item.getStartAt().toString());

        return voucherResponse;
    }


    @Override
    public VoucherResponse validate(String codeInput, BigDecimal orderTotal) {
        String code = codeInput.trim().toUpperCase();
        String redisKey = VOUCHER_KEY_PREFIX + code;

        VoucherEntity voucher = voucherRedisTemplate.opsForValue().get(redisKey);

        if (voucher == null) {
            voucher = voucherRepo.findByCodeIgnoreCase(code).orElse(null);
            if (voucher == null){
                VoucherResponse voucher1 = new VoucherResponse();
                voucher1.setCode(null);
                voucher1.setDiscount(BigDecimal.valueOf(0));
                voucher1.setDiscountType(DiscountType.FIXED);
                return voucher1;
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
        VoucherResponse voucher1 = new VoucherResponse();
        voucher1.setCode(voucher.getCode());
        voucher1.setDiscount(discount);
        voucher1.setDiscountType(voucher.getDiscountType());

        return voucher1;
    }

    @Override
    public VoucherEntity create(VoucherCreateRequest request) {
        VoucherEntity entity = VoucherEntity.builder()
                .code(request.getCode().trim().toUpperCase())
                .discountType(request.getDiscountType())
                .discountValue(request.getDiscount())
                .minOrderValue(request.getMinOrderValue())
                .maxDiscountValue(request.getMaxDiscountValue())
                .quantity(request.getQuantity())
                .startAt(request.getStartAt())
                .endAt(request.getEndAt())
                .isActive(true)
                .used(0)
                .build();
        VoucherEntity saved = voucherRepo.save(entity);
        String redisKey = VOUCHER_KEY_PREFIX + request.getCode();
        voucherRedisTemplate.opsForValue().set(redisKey, saved, Duration.ofHours(1));

        return saved;
    }
}
