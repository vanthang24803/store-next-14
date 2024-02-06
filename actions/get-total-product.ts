const getTotalProduct = async () => {
    const URL = `${process.env.API_URL}/api/product/total`;
  
    const response = await fetch(URL, { cache: "no-cache" });
  
    return response.json();
  };
  
  export default getTotalProduct;
  