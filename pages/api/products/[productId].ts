import { NextApiHandler } from "next";
import { createClient } from "microcms-js-sdk";
import { makeSchedule, Schedule } from "@/libs/makeSchedule";
import NextCors from "nextjs-cors";

export const cmsClient = createClient({
  serviceDomain: "survaq-shopify",
  apiKey: process.env.MICROCMS_API_TOKEN ?? "",
});

type NewRule = Rule & {
  schedule: Schedule;
};

const handler: NextApiHandler = async (req, res) => {
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "*",
  });

  const productId = Array.isArray(req.query.productId)
    ? req.query.productId[0]
    : req.query.productId;

  let cmsRes: Product | null = null;
  try {
    cmsRes = await cmsClient.getListDetail<Product>({
      endpoint: "products",
      contentId: productId,
    });
  } catch (e) {
    console.log(e);
  }
  if (!cmsRes) {
    res.status(404).json({ message: "product not found" });
    return;
  }

  const product: Product & { rule: NewRule } = {
    ...cmsRes,
    rule: {
      ...cmsRes.rule,
      schedule: makeSchedule(cmsRes.rule.customSchedules),
    },
  };

  res.status(200).json(product);
};

export default handler;
