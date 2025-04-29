interface CachedData<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 60 * 60 * 1000;
export async function fetchWithCache<T>(url: string): Promise<T> {
  try {
    // Try to fetch fresh data
    if (navigator.onLine) {
      const response = await fetch(url);
      if (response.ok) {
        const data = (await response.json()) as T;
        localStorage.setItem(
          url,
          JSON.stringify({
            data,
            timestamp: Date.now(),
          })
        );
        return data;
      }
    }

    // If offline or fetch failed, try to get from cache
    const cachedItem = localStorage.getItem(url);
    if (cachedItem) {
      const { data, timestamp }: CachedData<T> = JSON.parse(cachedItem);
      const isExpired = Date.now() - timestamp > CACHE_DURATION;

      // If online and cache is expired, throw error to trigger refetch
      if (navigator.onLine && isExpired) {
        throw new Error("Cached data expired");
      }

      return data;
    }

    throw new Error("No cached data available");
  } catch (error) {
    // Check if we have any cached data regardless of expiration
    const cachedItem = localStorage.getItem(url);
    if (cachedItem) {
      const { data }: CachedData<T> = JSON.parse(cachedItem);
      return data;
    }

    throw error;
  }
}
