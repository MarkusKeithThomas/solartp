package ecommerce.project.service;


import ecommerce.project.dtorequest.RegisterSolarPanelRequest;
import ecommerce.project.dtoresponse.RegisterSolarPanelResponse;

import java.util.List;

public interface RegisterSolarPanelService {
    RegisterSolarPanelResponse register(RegisterSolarPanelRequest request);
    List<RegisterSolarPanelResponse> getAllOrderedByNewest();

}
