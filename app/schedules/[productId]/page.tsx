import styles from "../../../styles/schedule.module.scss";
export const runtime = "experimental-edge";

const getScheduleProps = async (
  id: string
): Promise<null | {
  current: {
    text: string;
  };
  skus: {
    code: string;
    name: string;
    schedule: {
      text: string;
    };
  }[];
}> => {
  try {
    return await fetch(
      `${process.env.SURVAQ_API_ORIGIN}/products/${id}/delivery`,
      { cache: "no-store" }
    ).then((res) => res.json());
  } catch (_) {
    console.log(_);
    return null;
  }
};

type Props = {
  params: { productId: string };
};

export default async function Page({ params: { productId } }: Props) {
  const props = await getScheduleProps(productId);
  if (!props || props.skus.length < 1) return null;

  return (
    <>
      <p className={styles.message}>
        <span>下記商品はつきましては、</span>
        <span>{props.current.text.slice(5)}発送分の在庫が完売のため</span>
        <span>発送時期が異なります。</span>
      </p>
      <table className={styles.table}>
        <thead />
        <tbody>
          {props.skus.map(({ code, name, schedule }) => (
            <tr key={code}>
              <th className={styles.rowHead}>
                <span dangerouslySetInnerHTML={{ __html: name }} />
              </th>
              <td>
                <p className={styles.icon}>△</p>
                <span className={styles.schedule}>
                  {schedule.text.slice(5)} 発送予定
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
