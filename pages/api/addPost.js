const { connectToDatabase } = require('../../libs/mongo');

module.exports = async (req, res) => {
  const { name, content, tags, key } = req.body;
  console.log(key, process.env.KEY);
  if (key !== process.env.KEY) {
    return res.status(401).json({
      status: 401,
      message: 'Wrong Key',
    });
  }
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await db.collection('microblog');
  const post = await collection.insertOne({
    name,
    content,
    tags,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.status(200).json({
    data: {
      post,
    },
    status: 201,
    message: 'Created a new post successfully',
  });
};
