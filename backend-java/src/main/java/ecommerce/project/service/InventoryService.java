package ecommerce.project.service;

import ecommerce.project.dtorequest.InventoryDeductRequestDTO;

public interface InventoryService {
    void deductStock(InventoryDeductRequestDTO dto);
}
