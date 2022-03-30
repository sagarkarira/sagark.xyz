const { connectToDatabase, castToObjectId } = require('../../../libs/mongo');

module.exports = async (req, res) => {
  const postId = req.query.postId;
  // const key = req.params.key;
  // console.log(key, process.env.KEY);
  // if (key !== process.env.KEY) {
  //   return res.status(401).json({
  //     status: 401,
  //     message: 'Wrong Key',
  //   });
  // }
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await db.collection('microblog');
  const post = await collection.deleteOne({ _id: castToObjectId(postId) });
  res.status(200).json({
    data: {
      post,
    },
    status: 201,
    message: 'Deleted successfully',
  });
};
