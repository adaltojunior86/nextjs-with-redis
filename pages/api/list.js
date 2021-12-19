import Redis from "ioredis";

export default async function(req, res) {
  const redis = new Redis(process.env.REDIS_URL);
  const results = await redis.zrevrange('roadmap-vote', 0, 100, "WITHSCORES");
  let result = [];
  for (let i = 0; i < results.length - 1; i += 2) { 
    result.push({ title: results[i], score: results[i+1]})
  }
  redis.quit();
  res.json({
    body: result
  })
}