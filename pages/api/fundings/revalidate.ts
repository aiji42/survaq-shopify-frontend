import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    console.log(req.body);
    await res.unstable_revalidate(`/fundings/${req.body.id}`);
    return res.json({ revalidated: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error revalidating");
  }
};

export default handler;
