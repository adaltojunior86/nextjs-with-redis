import Redis from "ioredis";

export default async (req, res) => {
  const redis = new Redis(process.env.REDIS_URL);
  const title = req.body["title"];
  let v = await redis.zincrby("roadmap-vote", 1, title);
  redis.quit();
  res.json({ body: v });
};
