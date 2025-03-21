package ecommerce.project.service;

import ecommerce.project.exception.UploadFileToCloudFlareException;
import io.jsonwebtoken.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.net.URI;

import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class CloudflareR2ServiceImpl implements CloudflareR2Service{

    private final S3Client s3Client;

    @Value("${cloudflare.bucket-name}")
    private String bucketName;
    @Value("${link_image_get}")
    private String link_image_get;

    public CloudflareR2ServiceImpl(
            @Value("${cloudflare.access-key}") String accessKey,
            @Value("${cloudflare.secret-key}") String secretKey,
            @Value("${cloudflare.endpoint}") String endpoint
    ) {
        this.s3Client = S3Client.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey, secretKey)))
                .endpointOverride(URI.create(endpoint))
                .build();
    }
    @Override
    public List<String> uploadFileToCloudFlare(List<MultipartFile> files) {
        // Sử dụng multi-thread để upload nhiều file cùng lúc
        List<CompletableFuture<String>> uploadFutures = files.stream()
                .map(file -> CompletableFuture.supplyAsync(() -> uploadFile(file)))
                .toList();

        // Chờ tất cả file upload hoàn tất và trả về danh sách URL
        return uploadFutures.stream().map(CompletableFuture::join).collect(Collectors.toList());
    }

    private String uploadFile(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new IllegalArgumentException("File rỗng hoặc không hợp lệ!");
            }

            // Sử dụng UUID để tránh trùng tên file
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType(file.getContentType())
                    .build();

            PutObjectResponse response = s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

            if (response.sdkHttpResponse().isSuccessful()) {
                return link_image_get + fileName;
            } else {
                throw new RuntimeException("Upload thất bại với HTTP status: " + response.sdkHttpResponse().statusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Lỗi upload file lên Cloudflare R2", e);
        }
    }


}
