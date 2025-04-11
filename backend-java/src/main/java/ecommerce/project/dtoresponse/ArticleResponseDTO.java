package ecommerce.project.dtoresponse;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ArticleResponseDTO {
        private Long id;

        private String title;
        private String slugTitle;

        private String header1;
        private String content11;
        private String content12;

        private String header2;
        private String content21;
        private String content22;

        private String header3;
        private String content31;
        private String content32;

        private String header4;
        private String content41;
        private String content42;

        private String image1Url;
        private String altImage1;

        private String image2Url;
        private String altImage2;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private LocalDateTime dateCreate;
        private String note;
    }
