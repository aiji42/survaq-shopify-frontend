import { Fundings } from "@/app/fundings/[productId]/Fundings";
import { notFound } from "next/navigation";

// export const runtime = "experimental-edge";

type Props = {
  params: { productId: string };
};

type Funding = {
  totalPrice: number;
  closeOn: string;
  supporters: number;
};

const getFundingsProps = async (id: string) => {
  try {
    const data: Funding = await fetch(
      `${process.env.SURVAQ_API_ORIGIN}/products/${id}/funding`,
      { cache: "no-store" }
    ).then((res) => res.json());

    const remainDays = Math.ceil(
      (new Date(data.closeOn).getTime() - new Date().getTime()) / 86400000
    );

    return {
      totalPrice: data.totalPrice.toLocaleString("JP", {
        style: "currency",
        currency: "JPY",
      }),
      supporter: `${data.supporters.toLocaleString()}人`,
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
