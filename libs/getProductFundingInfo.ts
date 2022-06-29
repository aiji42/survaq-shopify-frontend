import { BigQuery } from "@google-cloud/bigquery";
import { createClient } from "microcms-js-sdk";
import sql from "sqlstring";

export const getProductFundingInfo = async (
  productId: string
): Promise<Required<Product["foundation"]>> => {
  const credentials = JSON.parse(
    process.env.BIGQUERY_CREDENTIALS ??
      '{"client_email":"","private_key":"","project_id":""}'
  ) as { client_email: string; private_key: string; project_id: "" };

  const bigQueryClient = new BigQuery({
    credentials,
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/bigquery",
    ],
    projectId: credentials.project_id,
  });

  const cmsClient = createClient({
    serviceDomain: "survaq-shopify",
    apiKey: process.env.MICROCMS_API_TOKEN ?? "",
  });

  const product = await cmsClient.getListDetail<Product>({
    endpoint: "products",
    contentId: productId,
  });

  const [[bq]] = await bigQueryClient.query({
    query: sql.format(query, [Number(productId)]),
  });

  return {
    ...product.foundation,
    supporter: (product.foundation.supporter ?? 0) + (bq?.supporters ?? 0),
    objectivePrice: product.foundation.objectivePrice ?? 0,
    totalPrice: (product.foundation.totalPrice ?? 0) + (bq?.price ?? 0),
  };
};

const query = `
  SELECT
    sum(original_total_price) AS price,
    count(distinct order_id) AS supporters
  FROM shopify.line_items li
  WHERE product_id = "gid://shopify/Product/?"
  GROUP BY product_id
`;
