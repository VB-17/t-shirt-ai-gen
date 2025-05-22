import { FormSchema } from "@/hooks/use-questions-form";

// export const API_BASE_URL = "http://localhost:3000/api";
const API_BASE_URL = "https://image-magic-ten.vercel.app/api";

export type ServerResponse<T> = T | { error: string };

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
}

async function request<T>(
  endpoint: string,
  {
    method = "GET",
    body,
    headers = {},
  }: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const mergedHeaders = {
    ...defaultHeaders,
    ...headers,
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: mergedHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new ApiError(res.status, errorMessage || `API request failed with status ${res.status}`);
    }

    const data = await res.json();

    console.log(
      `Request to ${API_BASE_URL}${endpoint} with method ${method} and body ${body ? JSON.stringify(body) : "none"
      }\n`,
      { res, data }
    );

    return { success: true, data };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof ApiError
        ? `${error.message} (Status: ${error.status})`
        : "Network error",
    };
  }
}

export const ApiService = {
  generatePrompt: async (data: FormSchema) => {
    return await request<{ prompts: string[] }>("/generate-prompt", {
      method: "POST",
      body: data,
    });
  },

  generateImage: async (prompts: string[]) => {
    return await request<{ images: string[] }>("/generate-image", {
      method: "POST",
      body: { prompts },
    });
  }

};