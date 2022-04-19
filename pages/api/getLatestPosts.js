const { connectToDatabase } = require('../../libs/mongo');

export default async function (req, res) {
  const page = req.query.page || 1;
  const limitVal = 5;
  const skipVal = (page - 1) * limitVal;

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await db.collection('microblog');
  const posts = await collection
    .find({})
    .sort({ createdAt: -1 })
    .limit(limitVal)
    .skip(skipVal)
    .toArray();

  const totalPosts = await collection.countDocuments();
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  res.status(200).json({
    data: {
      posts,
      totalPosts,
    },
    status: 200,
    message: 'Feteched successfully',
  });
}
