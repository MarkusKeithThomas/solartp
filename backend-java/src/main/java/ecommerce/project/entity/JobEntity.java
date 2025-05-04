package ecommerce.project.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "jobs")
@Data
public class JobEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(name = "location")
    private String placeWorking;

    @Column(nullable = false, unique = true, length = 255)
    private String slug;

    @Column(length = 100)
    private String experience;

    @Column(name = "day_out_of_date")
    private String datOutOfDate;

    @Lob
    @Column(name = "html_content")
    private String htmlContent;


}
