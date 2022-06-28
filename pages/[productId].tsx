import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getProductFoundationInfo } from "../libs/getProductFoundationInfo";

type Props = Required<Product["foundation"]>;

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

  const props = await getProductFoundationInfo(productId);

  return {
    props,
    revalidate: 30 * 60,
  };
};

const Home: NextPage<Props> = (props) => {
  return <>{JSON.stringify(props)}</>;
};

export default Home;
