package ecommerce.project.controller;

import ecommerce.project.baseresponse.BaseResponse;
import ecommerce.project.baseresponse.CustomPageResponse;
import ecommerce.project.dtoresponse.ChatResponseDTO;
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

    /**
     * ✅ 1. Lấy toàn bộ lịch sử chat theo roomId (không phân trang)
     */
    @GetMapping("/history")
    public ResponseEntity<?> getHistory(@RequestParam String roomId) {
        List<ChatResponseDTO> list =  chatService.getMessagesByRoomId(roomId);
        return ResponseEntity.ok(new BaseResponse(200,"Lấy danh sách chat thành công.",list)) ;
    }

    /**
     * ✅ 2. Tải lịch sử chat theo phân trang (dùng để load dần)
     */
    @GetMapping("/history/paging")
    public ResponseEntity<?> getPagedHistory(
            @RequestParam String roomId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        // timestamp trung ten khai bao trong entity trung ten cot cua mysql khong can giong ten cot
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        CustomPageResponse<ChatResponseDTO> customPageResponse = chatService.getPagedMessages(roomId, pageable);
        return ResponseEntity.ok(new BaseResponse(200,"Lấy lịch sử chat theo pageable thành công.",customPageResponse)) ;
    }

    /**
     * ✅ 3. Đếm số tin nhắn chưa đọc dành cho người nhận (receiver)
     */
    @GetMapping("/unread-count")
    public ResponseEntity<?> getUnreadCount(
            @RequestParam String roomId,
            @RequestParam String receiver
    ) {
        int valueUnread = chatService.countUnreadMessages(roomId, receiver);
        return ResponseEntity.ok(new BaseResponse(200,"Lấy số lượng tin nhắn chưa đọc thành công.",valueUnread));
    }

    /**
     * ✅ 4. Đánh dấu toàn bộ tin nhắn là đã đọc trong một phòng chat
     */
    @PutMapping("/mark-read")
    public void markAsRead(
            @RequestParam String roomId,
            @RequestParam String reader
    ) {
        chatService.markMessagesAsRead(roomId, reader);
    }

    /**
     * ✅ 5. Lấy danh sách các phòng chat mà seller từng tham gia (userId = 0 với solartp)
     */
    @GetMapping("/rooms")
    public ResponseEntity<?> getRoomsBySeller(@RequestParam Long sellerId) {
        List<String> listChat = chatService.getChatRoomIdsByUser(sellerId);
        return ResponseEntity.ok(new BaseResponse(200,"Lấy danh sách chat cho seller thành công.",listChat));
    }
}