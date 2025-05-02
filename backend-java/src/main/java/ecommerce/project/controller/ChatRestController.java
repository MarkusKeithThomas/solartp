package ecommerce.project.controller;

import ecommerce.project.baseresponse.BaseResponse;
import ecommerce.project.baseresponse.CustomPageResponse;
import ecommerce.project.dtoresponse.ChatMessageResponse;
import ecommerce.project.dtoresponse.ChatResponseDTO;
import ecommerce.project.dtoresponse.ChatRoomResponse;
import ecommerce.project.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatRestController {

    private final ChatService chatService;

    @GetMapping("/groups-chat")
    public ResponseEntity<?> getAllGroupChat(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ){
        Pageable pageable = PageRequest.of(page,size,Sort.by("updatedAt").descending());
        CustomPageResponse<ChatRoomResponse> listChat = chatService.getAllGroupChat(pageable);
        return ResponseEntity.ok(new BaseResponse(200,"Danh sách nhóm chat",listChat));
    }

    @GetMapping("/detail-chat")
    public ResponseEntity<?> getDetailChat(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size,
            @RequestParam String chatRoomId
    ){
        Pageable pageable = PageRequest.of(page,size,Sort.by("sentAt").descending());
        CustomPageResponse<ChatMessageResponse> listMessage = chatService.getDetailChat(chatRoomId,pageable);
        return ResponseEntity.ok(new BaseResponse(200,"Đoạn chat bạn lấy thành công", listMessage));
    }






}