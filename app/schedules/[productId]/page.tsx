export const runtime = "experimental-edge";

const getScheduleProps = async (id: string) => {
  try {
    const data = await fetch(
      `${process.env.SURVAQ_API_ORIGIN}/products/${id}/supabase`,
      { cache: "no-store" }
    ).then((res) => res.json());

    return data;
  } catch (_) {
    return null;
  }
};

const style = ({
  color,
  tableHeadBg,
  tableHeadColor,
  tableBodyBg,
  tableBodyColor,
}: {
  color?: string;
  tableHeadBg?: string;
  tableHeadColor?: string;
  tableBodyBg?: string;
  tableBodyColor?: string;
}) => `
.message {
    ${color ? `color: ${color.replace(/^_/, "#")}` : ""};
    display: block;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding: 4px 0;
    margin: 4px 0 5px;
    border-bottom: 3px double ${color ? `${color.replace(/^_/, "#")}` : ""};
    border-top: 3px double ${color ? `${color.replace(/^_/, "#")}` : ""};
}
.message span {
    display: inline-block;
}
table {
    width: 100%;
    font-weight: bold;
    font-size: 13px;
}
table tr th {
    ${tableHeadBg ? `background: ${tableHeadBg.replace(/^_/, "#")}` : ""};
    padding: 8px;
    ${tableHeadColor ? `color: ${tableHeadColor.replace(/^_/, "#")}` : ""};
    text-align: center;
    vertical-align:middle;
}
table .row-head {
    width: 100px;
}
@media (min-width: 500px) {
  table .row-head {
     width: 150px;
  }
}
table tr td {
    ${tableBodyBg ? `background: ${tableBodyBg.replace(/^_/, "#")}` : ""};
    padding: 8px;
    font-size: 18px;
    ${tableBodyColor ? `color: ${tableBodyColor.replace(/^_/, "#")}` : ""};
    text-align: center;
    vertical-align:middle;
}
table tr span {
    display: inline-block;
}
`;

type Props = {
  params: { productId: string };
  searchParams: {
    color?: string;
    tableHeadBg?: string;
    tableHeadColor?: string;
    tableBodyBg?: string;
    tableBodyColor?: string;
  };
};

export default async function Page({
  params: { productId },
  searchParams,
}: Props) {
  const props = await getScheduleProps(productId);
  const season = "4月下旬";

  if (!props) return null;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: style(searchParams),
        }}
      />
      <p className="message">
        <span>下記商品はつきましては、</span>
        <span>{season}発送分の在庫が完売のため</span>
        <span>発送時期が異なります。</span>
      </p>
      <table>
        <thead>
          <tr>
            <th className="row-head" />
            <th>
              2月下旬<span>発送</span>
            </th>
            <th>
              3月中旬<span>発送</span>
            </th>
            <th>
              3月下旬<span>発送</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="row-head">
              <span>ライトピンク</span>
              <span>(あったか)</span>
            </th>
            <td>
              <span>在庫</span>
              <span>なし</span>
            </td>
            <td>
              <span>在庫</span>
              <span>なし</span>
            </td>
            <td>
              <span>残り</span>
              <span>わずか</span>
            </td>
          </tr>
          <tr>
            <th className="row-head">
              <span>ライトグレー</span>
              <span>(あったか)</span>
            </th>
            <td>
              <span>在庫</span>
              <span>なし</span>
            </td>
            <td>
              <span>在庫</span>
              <span>なし</span>
            </td>
            <td>
              <span>残り</span>
              <span>わずか</span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
