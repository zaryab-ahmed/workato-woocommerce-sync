import axios from "axios";

const WOO_STORE_URL = process.env.WOO_STORE_URL || "https://your-woocommerce-store.example";
const WOO_CLIENT_KEY = process.env.WOO_CLIENT_KEY || "xxxxxxx";
const WOO_CLIENT_SECRET = process.env.WOO_CLIENT_SECRET || "xxxxxxx";

if (!WOO_STORE_URL || !WOO_CLIENT_KEY || !WOO_CLIENT_SECRET) {
  console.error("❌ Missing one of WOO_STORE_URL / WOO_CLIENT_KEY / WOO_CLIENT_SECRET");
  process.exit(1);
}

export const wooApi = axios.create({
  baseURL: `${WOO_STORE_URL}/wp-json/wc/v3`,
  auth: {
    username: WOO_CLIENT_KEY,
    password: WOO_CLIENT_SECRET,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchRecentOrders(): Promise<any[]> {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); //Last 24 hours
  const resp = await wooApi.get("/orders", {
    params: {
      after: oneDayAgo, // ISO 8601
      per_page: 100,
    },
  });
  return resp.data; 
}

export async function updateProductPrice(
  productId: number,
  newPrice: string
): Promise<any> {
  const resp = await wooApi.put(`/products/${productId}`, {
    regular_price: newPrice,
  });
  return resp.data;
}
