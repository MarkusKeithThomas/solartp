package ecommerce.project.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "job_applications")
@Data
public class JobApplicationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(length = 100)
    private String experience;

    @Column(name = "cv_filename", length = 255)
    private String fileName;

    @Column(name = "cv_file_path", length = 500)
    private String filePath;
}