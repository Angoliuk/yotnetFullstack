import { useCallback, useState } from "react";
import { ApiPostService } from "../ApiRequests/ApiPostService";
import { useReduxPostService } from "../ReduxRequests/useReduxPostService";
import {
  PostSchema,
  PostUpdateSchema,
} from "../../Hooks/Validator/Schemas/Schemas";
import { useValidator } from "../../Hooks/Validator/useValidator";

export const usePostService = () => {
  const [postLoading, setPostLoading] = useState(false);
  const reduxPostService = useReduxPostService();
  // const xTotalCount = apiPostService.xTotalCount;
  const { validate } = useValidator();

  const getPosts = useCallback(
    async (page, limit) => {
      try {
        setPostLoading(true);
        const postsFromDB = await ApiPostService.getPostsApi(page, limit);
        reduxPostService.setPostsRedux(postsFromDB.data);
      } catch (e) {
        throw e;
      } finally {
        setPostLoading(false);
      }
    },
    [reduxPostService]
  );

  const getUserPosts = useCallback(
    async (id) => {
      try {
        const postsFromDB = await ApiPostService.getUserPostsApi(id);
        reduxPostService.setUserPostsRedux(postsFromDB.data);
      } catch (e) {
        throw e;
      } finally {
        setPostLoading(false);
      }
    },
    [reduxPostService]
  );

  const deletePost = useCallback(
    async (id) => {
      try {
        setPostLoading(true);
        await ApiPostService.deletePostApi(id);
        reduxPostService.deletePostRedux(id);
      } catch (e) {
        throw e;
      } finally {
        setPostLoading(false);
      }
    },
    [reduxPostService]
  );

  const patchPost = useCallback(
    async (id, changes) => {
      try {
        setPostLoading(true);
        await validate(changes, PostUpdateSchema);
        const formData = new FormData();
        if (changes.oldPhotos)
          changes.oldPhotos = JSON.stringify(changes.oldPhotos);
        for (const key in changes) {
          if (key !== "photos") {
            formData.append(key, changes[key]);
          } else if (key === "photos") {
            for (let i = 0; i < changes.photos.length; i++) {
              formData.append("photos", changes.photos[i]);
            }
          }
        }
        const updatedPost = await ApiPostService.patchPostApi(id, formData); //formData
        reduxPostService.patchPostRedux(updatedPost.data);
      } catch (e) {
        throw e;
      } finally {
        setPostLoading(false);
      }
    },
    [reduxPostService]
  );

  const createPost = useCallback(
    async (post) => {
      try {
        setPostLoading(true);
        await validate(post, PostSchema);
        const formData = new FormData();
        for (const key in post) {
          if (key !== "photos") {
            formData.append(key, post[key]);
          } else {
            for (let i = 0; i < post.photos.length; i++) {
              formData.append("photos", post.photos[i]);
            }
          }
        }
        const newPostFromDB = await ApiPostService.createPostApi(formData);
        reduxPostService.createPostRedux(newPostFromDB.data);
      } catch (e) {
        throw e;
      } finally {
        setPostLoading(false);
      }
    },
    [reduxPostService]
  );

  return {
    getPosts,
    deletePost,
    patchPost,
    getUserPosts,
    createPost,
    postLoading,
  };
};
