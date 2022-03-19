import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import "./UserPostsBlock.scss";
import PostCard from "../../UploadCards/PostCard/PostCard";

const UserPostsBlock = (props) => {
  const { showAlertHandler, userId, posts, userInfo } = props;
  const _id = useParams().id;

  const userPosts = posts.filter((post) => String(post.userId) === String(_id));

  return userPosts.length > 0 ? (
    <div className="profilePagePostsBlock">
      <p className="profilePagePostsName">
        {String(userId) === String(_id) ? "Your" : userInfo.firstname} posts
      </p>

      {userPosts.map((post, i) => (
        <PostCard
          showAlertHandler={showAlertHandler}
          key={i}
          postId={post._id}
        />
      ))}
    </div>
  ) : (
    <p className="profilePagePostsEmptySection">
      It`s time to create your first post
    </p>
  );
};

const mapStateToProps = (state) => ({
  userId: state.userReducers._id,
  posts: state.postReducers.posts,
});

export default connect(mapStateToProps)(UserPostsBlock);
