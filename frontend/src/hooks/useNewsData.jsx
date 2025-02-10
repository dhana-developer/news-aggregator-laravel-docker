import { useState, useEffect } from "react";

const useNewsData = (category, searchTerm) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNewsData() {
      try {
        setLoading(true);
   //gnews :
  // const apiKey = "ea54ef556b97742cc814c093aed0975f";
  //  const apiUrl = `https://gnews.io/api/v4/top-headlines?token=${apiKey}`;

  //     newyork imes:
	// GET https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=Yw1p24e4xqF6S2enWYW4QcINEARImYNF
	// Yw1p24e4xqF6S2enWYW4QcINEARImYNF
	// Secret - tN8wN0HLPFDsDGOh


        const apiKey = "20bcd5abe4ce4c69ac744417893d9ef9";
        let apiUrl;    
        if(searchTerm){
           apiUrl = `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${searchTerm}`;
        }else{
           apiUrl = `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=trump`;
        }
 
        if(category){
          apiUrl = `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${category}`;
        }else{
           apiUrl = `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=trump`;
        }
        
        const categoryParam = category ? `&topic=${category}` : "";
        const searchParam = searchTerm ? `&q=${searchTerm}` : "";
        const url = apiUrl + categoryParam + searchParam;
        const response = await fetch(url);
        const data = await response.json();
  
        setNewsData(data.articles);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchNewsData();
  }, [category, searchTerm]);

  return { newsData, loading, error };
};

export default useNewsData;
