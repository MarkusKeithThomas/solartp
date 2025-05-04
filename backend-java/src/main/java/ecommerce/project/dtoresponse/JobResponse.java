package ecommerce.project.dtoresponse;

import lombok.Data;

@Data
public class JobResponse {
    private int id;
    private String title;
    private String placeWork;
    private String slug;
    private String experience;
    private String datOutOfDate;
    private String htmlContent;
}
