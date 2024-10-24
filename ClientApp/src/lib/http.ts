const http = {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
  post: async <T>(url: string, body: unknown): Promise<T> => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  },
  put: async (url: string, body: unknown): Promise<void> => {
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  },
  delete: async (url: string): Promise<void> => {
    await fetch(url, {
      method: 'DELETE',
    });
  },
};

export default http;
