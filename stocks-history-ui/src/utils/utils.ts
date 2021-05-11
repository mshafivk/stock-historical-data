export const isDevEnv = (): boolean =>
  window.location.host.includes("localhost");

export const getUrl = (): string =>
  isDevEnv() ? "http://localhost:8080/" : "xyz"; // TODO-  update before hosting

export async function http<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}
