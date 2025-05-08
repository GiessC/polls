interface IHttp {
  get: <TResponse>(
    url: string,
    headers?: Record<string, string>
  ) => Promise<TResponse>;
  post: <TResponse, TData = never>(
    url: string,
    data: TData,
    headers?: Record<string, string>
  ) => Promise<TResponse>;
  put: <TResponse, TData = never>(
    url: string,
    data: TData,
    headers?: Record<string, string>
  ) => Promise<TResponse>;
  patch: <TResponse, TData = never>(
    url: string,
    data: TData,
    headers?: Record<string, string>
  ) => Promise<TResponse>;
  delete: <TResponse>(url: string) => Promise<TResponse>;
}

class Http implements IHttp {
  public async get<TResponse>(
    url: string,
    headers?: Record<string, string>
  ): Promise<TResponse> {
    const response = await fetch(url, {
      method: 'GET',
      headers: overrideHeaders(headers),
    });
    return await response.json();
  }

  public async post<TResponse, TData = never>(
    url: string,
    data: TData,
    headers?: Record<string, string>
  ): Promise<TResponse> {
    const response = await fetch(url, {
      method: 'POST',
      headers: overrideHeaders(headers),
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  public async put<TResponse, TData = never>(
    url: string,
    data: TData,
    headers?: Record<string, string>
  ): Promise<TResponse> {
    const response = await fetch(url, {
      method: 'PUT',
      headers: overrideHeaders(headers),
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  public async patch<TResponse, TData = never>(
    url: string,
    data: TData,
    headers?: Record<string, string>
  ): Promise<TResponse> {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: overrideHeaders(headers),
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  public async delete<TResponse>(
    url: string,
    headers?: Record<string, string>
  ): Promise<TResponse> {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: overrideHeaders(headers),
    });
    return await response.json();
  }
}

function overrideHeaders(
  headers: Record<string, string> | undefined
): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    ...headers,
  };
}

export const http: IHttp = new Http();
