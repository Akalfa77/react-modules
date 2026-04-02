const BASE_URL = "https://dummyjson.com/products";

export async function fetchProducts(limit = 30) {
  try {
    const response = await fetch(`${BASE_URL}?limit=${limit}`);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();

    return data.products;
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
}
