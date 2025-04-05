package ecommerce.project.dtorequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequestDTO {

    @NotBlank(message = "chatRoomId không được để trống")
    @Pattern(regexp = "^[a-zA-Z0-9_-]{3,50}$", message = "chatRoomId chỉ được chứa chữ, số, _ và -")
    private String chatRoomId;

    @NotBlank(message = "Người gửi không được để trống")
    @Size(min = 3, max = 30, message = "Tên người gửi phải từ 3 đến 30 ký tự")
    private String sender;

    @NotBlank(message = "Nội dung không được để trống")
    @Size(max = 500, message = "Tin nhắn tối đa 500 ký tự")
    private String content;

    @NotBlank
    private String clientId; // mới thêm
}
