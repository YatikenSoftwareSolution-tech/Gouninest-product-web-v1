

function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('gouninest-token');
  }
  return null;
}

interface FetchApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';
  headers?: Record<string, string>;
  data?: FormData | Record<string, unknown> | null;
  retryCount?: number; // Number of allowed retries
  body?: BodyInit | null;
}

interface ApiError extends Error {
  status?: number;
  payload?: unknown;
}

export async function fetchApi(
  url: string,
  {
    method = 'GET',
    headers = {},
    data = null,
    retryCount = 1, // Only retry once (total 2 attempts)
  }: FetchApiOptions = {}
): Promise<unknown> {
  const token = getAuthToken();
  const fullUrl = process.env.NEXT_PUBLIC_API_BASE + url;

  const config: RequestInit & { headers: Record<string, string> } = {
    method: method.toUpperCase(),
    headers: { ...headers }
  };

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  if (data != null && !['GET', 'HEAD'].includes(config.method!)) {
    if (data instanceof FormData) {
      config.body = data;
    } else {
      config.headers['Content-Type'] = 'application/json';
      config.body = JSON.stringify(data);
    }
  }

  try {
    const res = await fetch(fullUrl, config);
    const contentType = res.headers.get('Content-Type') || '';

    if (contentType.includes('application/json')) {
      const json = await res.json();
      if (!res.ok) {
        const err = new Error(json.message || 'Request failed') as ApiError;
        err.status = res.status;
        err.payload = json;
        throw err;
      }
      return json;
    } else {
      const text = await res.text();
      if (!res.ok) {
        const err = new Error(text || 'Request failed') as ApiError;
        err.status = res.status;
        throw err;
      }
      return text;
    }
  } catch (err) {
    if (retryCount > 0) {
      console.warn(`Retrying ${url}, attempts left: ${retryCount}`);
      return fetchApi(url, { method, headers, data, retryCount: retryCount - 1 });
    } else {
      console.error('API fetch failed:', err);
      throw err; // Only throw after exhausting retries
    }
  }
}
