export const isDevEnv = (): boolean =>
  window.location.host.includes("localhost");

export const getUrl = (): string =>
  isDevEnv() ? "http://localhost:8080/" : "xyz"; // TODO-  update before hosting

export async function http<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

export const numFormatter = (num: number): string => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num.toString(); // if value < 1000, nothing to do
  }
};
