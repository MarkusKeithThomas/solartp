package ecommerce.project.dtoresponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LastMessage {
    private int id;
    private String sender;
    private String content;
    private String timestamp;
    private String avatarUrl;

}