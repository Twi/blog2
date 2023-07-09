// xeact.u

export default function u(url = "", params = {}): string {
  const result = new URL(url, window.location.href);
  Object.entries(params).forEach((kv) => {
    const [k, v] = kv;
    result.searchParams.set(k, v);
  });
  return result.toString();
}
