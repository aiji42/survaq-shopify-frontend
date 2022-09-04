import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import styles from "../../styles/fundings.module.scss";
import classnames from "classnames";

type Props = {
  totalPrice: string;
  supporter: string;
  status: string;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  Props,
  { productId: string }
> = async ({ params }) => {
  const { productId = "" } = params ?? {};
  if (!productId || !Number.isInteger(Number(productId)))
    return { notFound: true };

  try {
    const data: Product = await fetch(
      `https://survaq-api-production.aiji422990.workers.dev/products/${productId}`
    ).then((res) => res.json());
    const remainDays = Math.ceil(
      (new Date(data.foundation.closeOn).getTime() - new Date().getTime()) /
        86400000
    );

    return {
      props: {
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
      },
      revalidate: 30 * 60,
    };
  } catch (e) {
    return {
      props: {
        totalPrice: "-",
        supporter: "-",
        status: "-",
      },
    };
  }
};

const Page: NextPage<Props> = (props) => {
  return (
    <div className={styles.fundingWrapper}>
      <div className={styles.fundingItem__main}>
        <p className={styles.fundingItem__main__label}>累計販売金額</p>
        <p className={styles.fundingItem__main__text}>{props.totalPrice}</p>
      </div>
      <div className={styles.fundingItem__sub}>
        <p className={styles.fundingItem__sub_label}>購入者数</p>
        <p className={styles.fundingItem__sub_text}>{props.supporter}</p>
      </div>
      <div
        className={classnames([
          styles.fundingItem__sub,
          styles.fundingItem__sub__border,
        ])}
      >
        <p className={styles.fundingItem__sub_label}>ステータス</p>
        <p className={styles.fundingItem__sub_text}>{props.status}</p>
      </div>
    </div>
  );
};

export default Page;
