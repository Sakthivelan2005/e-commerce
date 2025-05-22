const apiRequest = async (url = '', optionsObj = null) => {
  try {
    const response = await fetch(url, optionsObj);

    const data = await response.json();

    if (!response.ok) {
      return { error: true, status: response.status, message: data.message || 'Unknown error' };
    }

    return { success: true, data }; 
  } catch (err) {
    console.error("apiRequest error:", err);
    return { error: true, message: err.message || 'Network error' };
  }
};

export default apiRequest;
