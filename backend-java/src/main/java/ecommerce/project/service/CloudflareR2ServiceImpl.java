package ecommerce.project.service;

import ecommerce.project.utils.StringUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;


import java.io.IOException;
import java.net.URI;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Slf4j
@Service
public class CloudflareR2ServiceImpl implements CloudflareR2Service{

    private final S3Client s3Client;
    private final StringUtil stringUtil;

    @Value("${cloudflare.bucket-name}")
    private String bucketName;
    @Value("${link_image_get}")
    private String link_image_get;
    private final String LINK_CV_PDF = "https://pub-e19fe2876a394ac09022a300014e7ffb.r2.dev/";

    public CloudflareR2ServiceImpl(
            @Value("${cloudflare.access-key}") String accessKey,
            @Value("${cloudflare.secret-key}") String secretKey,
            @Value("${cloudflare.endpoint}") String endpoint, StringUtil stringUtil
    ) {
        this.stringUtil = stringUtil;
        this.s3Client = S3Client.builder()
                .region(Region.of("auto")) // bắt buộc là 'auto'
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

    @Override
    public List<String> getAllUrlImage() {
        ListObjectsV2Request request = ListObjectsV2Request.builder()
                .bucket(bucketName)
                .build();

        ListObjectsV2Response response = s3Client.listObjectsV2(request);

        return response.contents().stream()
                .map(S3Object::key)
                .map(key -> link_image_get + key)
                .collect(Collectors.toList());
    }
    @Override
    public void deleteFileFromUrl(String imageUrl) {
        String fileKey = extractKeyFromUrl(imageUrl);
        deleteFileFromCloudFlare(fileKey);
    }

    @Override
    public String uploadFilePdfCVToCloudFlare(MultipartFile file) throws IOException {
        String nameFile = stringUtil.toSlug(file.getOriginalFilename());
        String key =  UUID.randomUUID() + "cv_" + nameFile +".pdf";

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket("cv-upload")
                .key(key)
                .contentType("application/pdf")
                .build();
        s3Client.putObject(putObjectRequest,RequestBody.fromBytes(file.getBytes()));


        return LINK_CV_PDF+key;
    }

    @Override
    public void deleteFileFromCloudFlare(String fileKey) {
        try {
            DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileKey)
                    .build();

            s3Client.deleteObject(deleteRequest);

            log.info("✅ Đã xoá file khỏi R2: {}", fileKey);
        } catch (S3Exception e) {
            log.error("❌ Không thể xoá file: {}, lỗi: {}", fileKey, e.awsErrorDetails().errorMessage());
            throw new RuntimeException("Không thể xoá file khỏi Cloudflare R2", e);
        }
    }


    private String uploadFile(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new IllegalArgumentException("File rỗng hoặc không hợp lệ!");
            }

            // Sử dụng UUID để tránh trùng tên file
            String fileName =file.getOriginalFilename();

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
    private String extractKeyFromUrl(String url) {
        if (!url.startsWith(link_image_get)) {
            throw new IllegalArgumentException("URL không hợp lệ: " + url);
        }
        return url.replace(link_image_get, "");
    }



}
