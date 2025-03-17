import { useEffect, useState, useRef } from "react";
import { Link } from "react-scroll";
import { Card } from "react-bootstrap";
import "../styles/TableOfContents.css"; // Import CSS
import { FaListUl } from "react-icons/fa"; // Icon danh sách

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const tocRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const articleHeadings = Array.from(document.querySelectorAll("h2, h3")) as HTMLHeadingElement[];

    const tocItems = articleHeadings.map((heading, index) => {
      const id = heading.id || encodeURIComponent(heading.innerText.replace(/\s+/g, "-").toLowerCase());
      heading.id = id;

      return {
        id,
        text: `${index + 1}. ${heading.innerText}`, // Thêm số thứ tự
        level: heading.tagName === "H2" ? 2 : 3,
      };
    });

    setHeadings(tocItems);
  }, []);

  // Đóng mục lục khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tocRef.current && !tocRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Xác định mục đang được xem
  useEffect(() => {
    const handleScroll = () => {
      let currentActiveId = "";
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentActiveId = heading.id;
          }
        }
      });
      setActiveId(currentActiveId);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  return (
    <Card ref={tocRef} className="toc-container p-3">
      <div className="toc-header" onClick={() => setIsOpen(!isOpen)}>
        <FaListUl className="toc-icon" /> <strong>Nội dung chính</strong>
        <span className="toggle-icon">{isOpen ? "▼" : "▶"}</span>
      </div>
      {isOpen && (
        <ul className="toc-list">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`toc-item level-${heading.level} ${activeId === heading.id ? "active" : ""}`}
            >
              <Link to={heading.id} smooth duration={300} offset={-80}>
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}