package ecommerce.project.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "article")
public class ArticleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "header_1")
    private String header1;

    @Column(name = "content_1_1")
    private String content11;

    @Column(name = "content_1_2")
    private String content12;

    @Column(name = "header_2")
    private String header2;

    @Column(name = "content_2_1")
    private String content21;

    @Column(name = "content_2_2")
    private String content22;

    @Column(name = "header_3")
    private String header3;

    @Column(name = "content_3_1")
    private String content31;

    @Column(name = "content_3_2")
    private String content32;

    @Column(name = "header_4")
    private String header4;

    @Column(name = "content_4_1")
    private String content41;

    @Column(name = "content_4_2")
    private String content42;

    @Column(name = "image_1_url")
    private String image1Url;

    @Column(name = "alt_image1")
    private String altImage1;

    @Column(name = "image_2_url")
    private String image2Url;

    @Column(name = "alt_image2")
    private String altImage2;

    @Column(name = "date_create", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime dateCreate;

    @PrePersist
    protected void onCreate() {
        this.dateCreate = LocalDateTime.now();
    }
}