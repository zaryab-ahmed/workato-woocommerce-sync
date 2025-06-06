# 🛠️ WooCommerce Order Sync - Workato Integration Project

This repository contains a **Workato integration project** designed to sync WooCommerce **orders and their prices** using the **Workato HTTP connector**. It supports environment-based credential management, GitHub GitOps workflows with `dev` and `prod` branches, and includes support for custom scripting in **TypeScript**.

---

## 🔍 Overview

- **Platform**: [Workato](https://www.workato.com/)
- **Target System**: WooCommerce (via REST API)
- **Features**:
  - Sync WooCommerce orders and prices.
  - Use Workato **recipes** and **workflows**.
  - HTTP connector with dynamic environment-based configuration.
  - GitHub-based `dev` and `prod` environments.
  - TypeScript-supported custom transformations.

---

## 🧱 Project Structure
```
├── recipes/
│ ├── dev/
│ └── prod/
├── connections/
│ └── http_woocommerce.yaml
├── scripts/
│ └── custom_transform.ts
├── .env
├── README.md
└── .gitignore
```

## ⚙️ Setup & Configuration

### 1. 🔐 Environment Variables

Create a `.env` file at the root of your repo:

```dotenv
WOOCOMMERCE_BASE_URL=https://your-woocommerce-site.com/wp-json/wc/v3
WOOCOMMERCE_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxxx
WOOCOMMERCE_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxxx
```

### 2. 🔗 HTTP Connector
File: connections/http_woocommerce.yaml

```yaml
type: http
name: WooCommerce API
authorization:
  type: basic
  username: "${{env.WOOCOMMERCE_CONSUMER_KEY}}"
  password: "${{env.WOOCOMMERCE_CONSUMER_SECRET}}"
base_url: "${{env.WOOCOMMERCE_BASE_URL}}"

```

### 3. 🔁 Recipes
#### Core Recipes (located in /recipes)
- sync_orders_from_woocommerce_to_internal.recipe.yaml
- update_order_prices_to_woocommerce.recipe.yaml

#### These recipes:
- Fetch orders from WooCommerce using HTTP GET.
- Transform the data using TypeScript (optional).
- Update order info or prices via HTTP PUT.

### 4. 🧪 Dev vs Prod Environment
- Use the dev branch for testing with sandbox credentials.
- Merge to prod for production deployment.
- Recipes are connected to Workato’s dev/prod environments.
- Use Workato CLI or UI to deploy recipes to appropriate environment.

### 5. ✍️ TypeScript Scripting
File: scripts/custom_transform.ts

```typescript
export function transformOrder(order: any): any {
  return {
    id: order.id,
    total: parseFloat(order.total).toFixed(2),
    status: order.status.toUpperCase()
  };
}
```

Used inside a Workato script step to modify data before syncing.

### 6. 🚀 Deployment Workflow
- Develop and test recipes in dev branch with Workato dev environment.
- Merge changes to prod branch to promote them to production.
- Optionally automate with GitHub Actions and Workato CLI

### 7. 🧠 Suggested Enhancements
- Add error logging and alerting for failed syncs.
- Track metrics using Workato job history or external monitoring.
- Use secret managers for managing credentials securely.
- Extend to sync products, customers, inventory.

### 8. 👨‍💻 Tech Stack

| Component            | Tool                 |
| -------------------- | -------------------- |
| Integration Platform | Workato              |
| API Communication    | HTTP Connector       |
| Language             | TypeScript (scripts) |
| Source Control       | Git + GitHub         |
| CI/CD (Optional)     | GitHub Actions / CLI |
| Secrets Management   | `.env` + Workato Env |

### 9. 📬 Contact
For questions or issues, create an Issue or reach out to the integration team.


Let me know if you'd like a sample GitHub Actions `.yml` file for automatic promotion/deployment too!
