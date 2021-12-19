import Redis from "ioredis";

export default async (req, res) => {
  const { title } = req.body;
  const redis = new Redis(process.env.REDIS_URL);
  if (!title) {
    redis.quit();
    res.json({
      error: "Title is required",
    });
  } else if (title.length < 70) {
    await redis.zadd("roadmap-vote", "NX", 1, title);
    redis.quit();
    res.json({
      body: "success"
    })
  } else {
    redis.quit();
    res.json({ error: "Max 70 characters please." });
  }
};
