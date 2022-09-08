import Comment from "/src/components/comment/comment";

const CommentList = ({ comments }) => {
  if (!comments || !Object.keys(comments).length) return null;

  if (comments?.length > 0 && comments[0].data.body)
    return (
      <div className="space-y-8">
        {comments.map(({ data: comment }) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
};

export default CommentList;
