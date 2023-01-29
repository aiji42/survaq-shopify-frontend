import { Fundings } from "@/app/fundings/[productId]/Fundings";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: { productId: string };
};

const getFundingsProps = async (id: string) => {
  try {
    const data: Product = await fetch(
      `https://survaq-api-production.survaq.workers.dev/products/${id}`,
      {
        next: { revalidate: 3600 },
      }
    ).then((res) => res.json());
    const remainDays = Math.ceil(
      (new Date(data.foundation.closeOn).getTime() - new Date().getTime()) /
        86400000
    );

    return {
      totalPrice: data.foundation.totalPrice.toLocaleString("JP", {
        style: "currency",
        currency: "JPY",
      }),
      supporter: `${data.foundation.supporter.toLocaleString()}人`,
      status:
        remainDays === 0
          ? "最終日"
          : remainDays < 0
          ? "販売中"
          : `${remainDays}日`,
    };
  } catch (_) {
    return null;
  }
};

export default async function Page({ params: { productId } }: Props) {
  const props = await getFundingsProps(productId);

  if (!props) {
    return notFound();
  }

  return <Fundings {...props} />;
}
