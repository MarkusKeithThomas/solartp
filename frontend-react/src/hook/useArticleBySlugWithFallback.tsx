import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {useArticleContext } from "../context/ArticleProvider";
import type { Article } from "../context/ArticleProvider";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useArticleBySlugWithFallback(slug: string) {
  const { getArticleBySlug } = useArticleContext();
  const [article, setArticle] = useState<Article>();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const cached = getArticleBySlug(slug);

    if (cached) {
      setArticle(cached);
      setLoading(false);
    } else {
      axios
        .get(`${API_BASE_URL}/bai-viet/slug/${slug}`)
        .then((res) => {
          setArticle(res.data.data);
        })
        .catch(() => setNotFound(true))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  return { article, loading, notFound };
}
