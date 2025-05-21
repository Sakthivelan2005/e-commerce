const apiRequest = async (url ='', optionsObj = null, errMsg = null) => {
   try {
      const response = await fetch(url, optionsObj);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("apiRequest error:", err);
      errMsg = err.message;
      return errMsg; 
    }
  };
  
  export default apiRequest;