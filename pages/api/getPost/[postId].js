const {
  connectToDatabase,
  castToObjectId,
  isValidObjectId,
} = require('../../../libs/mongo');

export default async (req, res) => {
  const postId = req.query.postId;

  if (!isValidObjectId(postId)) {
    return res.status(400).json({
      status: 400,
      message: 'postId is not valid',
    });
  }

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await db.collection('microblog');
  const result = await collection.findOne({ _id: castToObjectId(postId) });
  if (!result) {
    return res.status(404).json({
      status: 404,
      message: 'Post not found',
    });
  }
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  res.status(200).json({
    data: result,
    status: 200,
    message: 'Found successfully',
  });
};

export async function getPostById(postId) {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await db.collection('microblog');
  const result = await collection.findOne({ _id: castToObjectId(postId) });
  return result;
}
