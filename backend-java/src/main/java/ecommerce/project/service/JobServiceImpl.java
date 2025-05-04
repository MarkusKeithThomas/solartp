package ecommerce.project.service;

import ecommerce.project.dtorequest.JobFormRequest;
import ecommerce.project.dtoresponse.JobResponse;
import ecommerce.project.entity.JobApplicationEntity;
import ecommerce.project.entity.JobEntity;
import ecommerce.project.repository.JobFormRepository;
import ecommerce.project.repository.JobRepository;
import ecommerce.project.utils.StringUtil;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {
    private final StringUtil stringUtil;
    private final JobRepository jobRepository;
    private final CloudflareR2Service cloudflareR2Service;
    private final JobFormRepository formRepository;



    @Override
    public int addListJob(MultipartFile file) {
        int jobSize = 0;
        try(
            InputStream inputStream = file.getInputStream();
            Workbook workbook = new XSSFWorkbook(inputStream)){

            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();

            //Bo qua dong tieu de
            if(rows.hasNext()) rows.next();
            int jobIndex = 0;
            while (rows.hasNext()){
                Row row = rows.next();
                JobEntity jobEntity = new JobEntity();
                String title = getCellValue(row.getCell(0)).trim();
                if (title.isEmpty()){
                    continue;
                }
                jobEntity.setTitle(title);
                jobEntity.setSlug(stringUtil.toSlug(title));
                jobEntity.setPlaceWorking(getCellValue(row.getCell(1)));
                jobEntity.setExperience(getCellValue(row.getCell(2)));
                jobEntity.setDatOutOfDate(getCellValue(row.getCell(3)));
                jobEntity.setHtmlContent(getCellValue(row.getCell(4)));
                jobSize++;
                jobRepository.save(jobEntity);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return jobSize;
    }

    @Override
    public List<JobResponse> getListJob() {
        List<JobEntity> entities = jobRepository.findAll();
        List<JobResponse> list = entities.stream().map(item -> {
                   JobResponse jobResponse = new JobResponse();
                   jobResponse.setId(item.getId());
                   jobResponse.setTitle(item.getTitle());
                   jobResponse.setPlaceWork(item.getPlaceWorking());
                   jobResponse.setSlug(item.getSlug());
                   jobResponse.setDatOutOfDate(item.getDatOutOfDate());
                   jobResponse.setHtmlContent(item.getHtmlContent());
                   jobResponse.setExperience(item.getExperience());
                   return jobResponse;
        }).toList();
        return list;
    }

    @Override
    public JobResponse getJobBySlug(String slug) {
        JobEntity entity = jobRepository.findBySlug(slug);
        JobResponse job = new JobResponse();
        job.setId(entity.getId());
        job.setExperience(entity.getExperience());
        job.setTitle(entity.getTitle());
        job.setPlaceWork(entity.getPlaceWorking());
        job.setHtmlContent(entity.getHtmlContent());
        job.setDatOutOfDate(entity.getDatOutOfDate());
        job.setSlug(entity.getSlug());
        return job;
    }

    @Override
    public JobApplicationEntity addJobForm(JobFormRequest formRequest) throws IOException {
        MultipartFile file = formRequest.getFile();
        String fileUrl = cloudflareR2Service.uploadFilePdfCVToCloudFlare(file);

        JobApplicationEntity entity = new JobApplicationEntity();

        entity.setFullName(formRequest.getFullName());
        entity.setEmail(formRequest.getEmail());
        entity.setPhone(formRequest.getPhone());
        entity.setFilePath(fileUrl);
        entity.setExperience(formRequest.getExperience());
        entity.setFileName(formRequest.getFile().getOriginalFilename());
        formRepository.save(entity);
        return formRepository.save(entity);
    }

    private String getCellValue(Cell cell) {
        if (cell == null) return "";
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                return String.valueOf(cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            default:
                return "";
        }
    }
}
