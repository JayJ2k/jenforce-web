const API_URL = import.meta.env.VITE_API_URL;

type ApiErrorResponse = {
  message?: string;
};

export async function apiRequest<TResponse>(
  path: string,
  options: RequestInit = {},
): Promise<TResponse> {
  if (!API_URL) {
    throw new Error("URL da API nÃ£o configurada.");
  }

  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorData = data as ApiErrorResponse | null;

    throw new Error(errorData?.message || "NÃ£o foi possÃ­vel processar a solicitaÃ§Ã£o.");
  }

  return data as TResponse;
}
