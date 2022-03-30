const { connectToDatabase, castToObjectId } = require('../../libs/mongo');

module.exports = async (req, res) => {
  const { name, content, tags, key, _id } = req.body;
  if (key !== process.env.KEY) {
    return res.status(401).json({
      status: 401,
      message: 'Wrong Key',
    });
  }
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await db.collection('microblog');
  const post = await collection.updateOne(
    {
      _id: castToObjectId(_id),
    },
    { $set: { name, content, tags } }
  );
  res.status(200).json({
    data: {
      post,
    },
    status: 201,
    message: 'Created a new post successfully',
  });
};
