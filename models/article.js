import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: true },
  isDeleted: { type: Boolean, required: false },
  newsChannel: { type: String, required: true},
}, {
    timestamps: true,
});

const Article = mongoose.model('Article', articleSchema);

export default Article;