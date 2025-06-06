import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { fetchRecentOrders, updateProductPrice } from "./woocommerceClient";

dotenv.config(); // load from .env in local dev

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

// 1) GET /orders → returns orders from last 24 hours
app.get("/orders", async (_req: Request, res: Response) => {
  try {
    const orders = await fetchRecentOrders();
    return res.json({ success: true, orders });
  } catch (err: any) {
    console.error("Error fetching orders:", err.message || err);
    return res.status(500).json({ success: false, error: err.message || err });
  }
});

// 2) POST /update_price → body: { product_id: number, new_price: string }
app.post("/update_price", async (req: Request, res: Response) => {
  const { product_id, new_price } = req.body;
  if (!product_id || !new_price) {
    return res
      .status(400)
      .json({ success: false, error: "product_id and new_price are required" });
  }

  try {
    const updated = await updateProductPrice(Number(product_id), String(new_price));
    return res.json({ success: true, updated });
  } catch (err: any) {
    console.error("Error updating product price:", err.message || err);
    return res.status(500).json({ success: false, error: err.message || err });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 WooCommerce middleware running on http://localhost:${PORT}`);
});
