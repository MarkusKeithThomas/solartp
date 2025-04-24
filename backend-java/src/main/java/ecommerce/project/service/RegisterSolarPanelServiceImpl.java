package ecommerce.project.service;

import ecommerce.project.dtorequest.RegisterSolarPanelRequest;
import ecommerce.project.dtoresponse.RegisterSolarPanelResponse;
import ecommerce.project.entity.RegisterSolarPanelEntity;
import ecommerce.project.mapper.RegisterSolarPanelMapper;
import ecommerce.project.repository.RegisterSolarPanelRepository;
import org.springframework.stereotype.Service;
import static ecommerce.project.mapper.RegisterSolarPanelMapper.*;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RegisterSolarPanelServiceImpl implements RegisterSolarPanelService {

    private final RegisterSolarPanelRepository repository;

    public RegisterSolarPanelServiceImpl(RegisterSolarPanelRepository repository) {
        this.repository = repository;
    }

    @Override
    public RegisterSolarPanelResponse register(RegisterSolarPanelRequest request) {
        RegisterSolarPanelEntity entity = RegisterSolarPanelMapper.toEntity(request);
        RegisterSolarPanelEntity saved = repository.save(entity);
        return RegisterSolarPanelMapper.toResponse(saved);
    }

    @Override
    public List<RegisterSolarPanelResponse> getAllOrderedByNewest() {
        return repository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(RegisterSolarPanelMapper::toResponse)
                .collect(Collectors.toList());
    }
}