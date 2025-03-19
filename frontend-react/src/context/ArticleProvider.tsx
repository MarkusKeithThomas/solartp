import axios from "axios";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Article = {
    id: number;
    title: string;
    header1: string;
    contentHeader11: string;
    contentHeader12: string;
    header2: string;
    contentHeader21: string;
    contentHeader22: string;
    header3: string;
    contentHeader31: string;
    contentHeader32: string;
    header4: string;
    contentHeader41: string;
    contentHeader42: string;
    image1: string;
    altImage1: string;
    image2: string;
    altImage2: string;
    dateCreated: string;
    dateModified: string;
}
interface ArticleContextType {
    articles: Article[];
    getArticleById: (id: number) => Article | undefined;
}


const ArticleContext = createContext({} as ArticleContextType);

export function useArticleContext() {
    return useContext(ArticleContext);
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export function ArticleProvider({ children }: { children: ReactNode }) {
    const [articles, setArticle] = useState<Article[]>([]);
    useEffect(() =>{
        axios.get(`${API_BASE_URL}/bai-viet/list`)
        .then((res) => setArticle(res.data))
        .catch((error) => console.error("Lỗi tải danh sách bài viết:", error));
    },[]);
    console.log(articles)

    function getArticleById(id: number): Article | undefined {
        return articles.find((article) => article.id === id);
    }


    return (
        <ArticleContext.Provider value={{ articles, getArticleById }}>
            {children}
        </ArticleContext.Provider>
        

    )
}