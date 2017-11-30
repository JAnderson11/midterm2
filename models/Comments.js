var mongoose = require('mongoose')
var CommentSchema = new mongoose.Schema({
  name:{type: String, default:"Dog"},
  upvotes:{type: Number, default:0},
  price:{type: Number, default:100},
  image:{type: String, default:"https://static.pexels.com/photos/7720/night-animal-dog-pet.jpg"}
});
CommentSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
}
mongoose.model('Comment', CommentSchema);
