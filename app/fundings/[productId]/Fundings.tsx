import { NextPage } from "next";
import styles from "@/styles/fundings.module.scss";
import classnames from "classnames";

type Props = {
  totalPrice: string;
  supporter: string;
  status: string;
};

export const Fundings: NextPage<Props> = (props) => {
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
