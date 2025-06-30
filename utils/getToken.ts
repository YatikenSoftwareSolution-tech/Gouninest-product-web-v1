export function getAuthToken(): string {
  const match = document.cookie.match(/(?:^|;\s*)PNPtoken=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : '';
}