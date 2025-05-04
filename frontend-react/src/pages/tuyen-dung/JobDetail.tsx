import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { FormState, JobFormResponse, JobList } from '../../type/job';
import { jobApi } from "../../api/jobApi";
import { useParams } from "react-router-dom";

const JobDetail: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    phone: "",
    email: "",
    experience: "",
    file: null,
  });

  const [submittedData, setSubmittedData] = useState<JobFormResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [job, setJob] = useState<JobList>();
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        if (slug) {
          const res = await jobApi.getJobDetail(slug);
          setJob(res);
        }
      } catch (err) {
        console.error("Lỗi khi lấy thông tin công việc:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [slug]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file || formData.file.type !== "application/pdf") {
      alert("Vui lòng đính kèm file PDF hợp lệ.");
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("experience", formData.experience);
    data.append("file", formData.file);

    try {
      const res = await jobApi.addFormApplication(data);
      setSubmittedData(res);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        experience: "",
        file: null,
      });
    } catch (err) {
      console.error("Gửi thất bại:", err);
      alert("Gửi thất bại, vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="my-5 mt-4" style={{ maxWidth: "800px" }}>
      {loading ? (
        <p className="text-center">Đang tải thông tin công việc...</p>
      ) : (
        <>
          <h1>{job?.title}</h1>
          <div
            className="bg-light p-4 rounded shadow-sm mb-5"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(job?.htmlContent?.toString() || "")
            }}
          />
        </>
      )}

      {submittedData ? (
        <div className="mt-4 p-4 bg-success bg-opacity-10 border rounded">
          <h4 className="mb-3 text-center">🎉 Bạn đã ứng tuyển thành công!</h4>
          <p><strong>Họ tên:</strong> {submittedData.fullName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>SĐT:</strong> {submittedData.phone}</p>
          <p><strong>Kinh nghiệm:</strong> {submittedData.experience}</p>
          {submittedData.filePath && (
            <p><strong>CV đã gửi:</strong> <a href={submittedData.filePath} target="_blank" rel="noreferrer">Xem CV</a></p>
          )}
        </div>
      ) : (
        <>
          <h3 className="mb-3 d-flex">Thông tin ứng tuyển</h3>
          <Form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm border">
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Kinh nghiệm làm việc</Form.Label>
              <div className="d-flex flex-column gap-2">
                {["Dưới 1 năm", "Trên 1 năm", "Trên 2 năm"].map((exp) => (
                  <Form.Check
                    key={exp}
                    type="radio"
                    name="experience"
                    label={exp}
                    value={exp}
                    checked={formData.experience === exp}
                    onChange={handleInputChange}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Đính kèm CV (PDF)</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Đang gửi...
                </>
              ) : (
                "Gửi thông tin ứng tuyển"
              )}
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default JobDetail;