import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useArticleLocalStorage } from "../hook/useArticleLocalStorage";

export type Article = {
  id: number;
  title: string;
  slugTitle: string;
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
  dateCreate: string;
};

interface ArticleContextType {
  articles: Article[];
  getArticleById: (id: number) => Article | undefined;
  getArticleBySlug: (slug: string) => Article | undefined;
  shortArticles: Article[];
}

const ArticleContext = createContext<ArticleContextType>({
  articles: [],
  shortArticles: [],
  getArticleById: () => undefined,
  getArticleBySlug: () => undefined,
});

export function useArticleContext() {
  return useContext(ArticleContext);
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function ArticleProvider({ children }: { children: ReactNode }) {
  const [articles, setArticle] = useArticleLocalStorage<Article[]>(
    "article-save",
    [],
    1000 * 60 * 5
  );
  const [shortArticles, setShortArticles] = useState<Article[]>([]);
  const [lastId, setLastId] = useState(0);
  const observerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchArticles = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await axios.get(`${API_BASE_URL}/bai-viet/list`, {
        params: { lastId: lastId, limit: 30 },
      });
      if (res.data.articles?.length > 0) {
        const newArticles: Article[] =
          res.data.articles?.filter(
            (newArticle: Article) =>
              !Array.isArray(articles) ||
              !articles.some(
                (oldArticle: Article) => oldArticle.id === newArticle.id
              )
          ) || [];

        if (newArticles.length === 0) {
          setHasMore(false);
        } else {
          setArticle((prev: Article[]) => [...prev, ...newArticles]);
          setLastId(res.data.lastId);
        }
      }
    } catch (error) {
      console.error("Lỗi tải bài viết : ArticleContext", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (articles?.length >= 4) {
      setShortArticles(articles.slice(4, 10));
    }
  }, [articles]);

  useEffect(() => {
    if (articles.length > 0 && hasMore === false) {
      setHasMore(true); // reset lại để cho phép fetch tiếp
    }
  }, []);

  useEffect(() => {
    if (!hasMore) return;

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

  function getArticleBySlug(slug: string): Article | undefined {
    return articles.find((article) => article.slugTitle === slug);
  }

  return (
    <ArticleContext.Provider
      value={{ articles, getArticleById, getArticleBySlug, shortArticles }}
    >
      {children}
      <div ref={observerRef} style={{ height: "10px" }}></div>
      {loading && <p className="text-center">Đang tải thêm...</p>}
    </ArticleContext.Provider>
  );
}
