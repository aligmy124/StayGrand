
import { ApiError } from "../api-error/ApiError";
import { getToken } from "../cookies/cookies";

const BASE_URL = process.env.BASE_URL;

interface ApiFetchOptions extends RequestInit {
  auth?: boolean; // default: true
  next?: NextFetchRequestConfig;
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { auth = true, ...fetchOptions } = options;
  const isFormData = fetchOptions.body instanceof FormData;

  const token = auth ? await getToken() : null;
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token && {
        Authorization: `${token}`,
      }),
      ...fetchOptions.headers,
    },
  });

  if (!res.ok) {
    let errorBody: { message?: string; fieldErrors?: Record<string, string> } =
      {};
    try {
      errorBody = await res.json();
    } catch {
      errorBody = { message: res.statusText || "Unknown Error" };
    }
    throw new ApiError(
      res.status,
      errorBody.message ?? "Request failed",
      errorBody.fieldErrors,
    );
  }
  if (res.status === 204) {
    return undefined as T;
  }

  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}