import axios from "axios";
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { useArticleLocalStorage } from "../hook/useArticleLocalStorage";

export type Article = {
    id: number;
    title: string;
    slugTitle:string;
    header1: string;
    content11: string;
    content12: string;
    header2: string;
    content21: string;
    content22: string;
    header3: string;
    content31: string;
    content32: string;
    header4: string;
    content41: string;
    content42: string;
    image1Url: string;
    altImage1: string;
    image2Url: string;
    altImage2: string;
    dateCreate: string; // Hoặc `Date` nếu muốn xử lý dưới dạng đối tượng thời gian
};
interface ArticleContextType {
    articles: Article[];
    getArticleById: (id: number) => Article | undefined;
    shortArticles: Article[]    
}


const ArticleContext = createContext({} as ArticleContextType);

export function useArticleContext() {
    return useContext(ArticleContext);
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export function ArticleProvider({ children }: { children: ReactNode }) {
    const [articles, setArticle] = useArticleLocalStorage<Article[]>("article-save",[]);
    const[shortArticles,setShortArticles] = useState<Article[]>([])
    const [lastId, setLastId] = useState(0);
    const observerRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Kiểm soát còn bài để tải hay không


    const fetchArticles = async () => {
        if (loading || !hasMore) return; // Tránh gọi API liên tục khi chưa có dữ liệu mới
      setLoading(true);

      try {
        const res = await axios.get(`${API_BASE_URL}/bai-viet/list`, {
          params: { lastId: lastId, limit: 10 },
        });
        if (res.data.articles.length > 0) {
            // Kiểm tra xem có dữ liệu mới không, tránh trùng lặp
            const newArticles: Article[] = res.data.articles.filter(
                (newArticle: Article) => !articles.some((oldArticle: Article) => oldArticle.id === newArticle.id)
            );
            if (newArticles.length === 0) {
                setHasMore(false); // Không còn bài viết mới
            } else {
                
                setArticle((prev) => [...prev, ...newArticles]); // Gộp dữ liệu đúng cách
                setLastId(res.data.lastId); // Cập nhật lastId đúng cách
            }
        }
      } catch (error) {
        console.error("Lỗi tải bài viết : ArticleContext", error);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
        if (articles.length >= 10) {
            setShortArticles(articles.slice(5, 10)); // Lấy từ bài viết số 5 đến số 10
        }
    }, [articles]);


    // 🟢 Dùng IntersectionObserver để tự động tải thêm bài viết khi cuộn xuống
    useEffect(() => {
        if (!hasMore) return; // Nếu không còn bài viết mới, không theo dõi nữa

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    fetchArticles();
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [lastId, hasMore]);


    function getArticleById(id: number): Article | undefined {
        return articles.find((article) => article.id === id);
    }


    return (
        <ArticleContext.Provider value={{ articles, getArticleById, shortArticles }}>
            {children}
            {/* 🟢 Thêm ref vào cuối danh sách để kích hoạt Load More */}
            <div ref={observerRef} style={{ height: "10px" }}></div>
            {loading && <p className="text-center">Đang tải thêm...</p>}
        </ArticleContext.Provider>
        

    )
}