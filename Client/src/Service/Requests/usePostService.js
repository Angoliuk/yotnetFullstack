import { useCallback, useState } from "react";
import { useApiPostService } from "../ApiRequests/useApiPostService";
import { useReduxPostService } from "../ReduxRequests/useReduxPostService";
import {
  PostSchema,
  PostUpdateSchema,
} from "../../Hooks/Validator/Schemas/Schemas";
import { useValidator } from "../../Hooks/Validator/useValidator";

export const usePostService = () => {
  const [postLoading, setPostLoading] = useState(false);
  const apiPostService = useApiPostService();
  const reduxPostService = useReduxPostService();
  const xTotalCount = apiPostService.xTotalCount;
  const { validate } = useValidator();

  const getPosts = useCallback(
    async (page, limit) => {
      try {
        setPostLoading(true);
        const postsFromDB = await apiPostService.getPostsApi(page, limit);
        reduxPostService.setPostsRedux(postsFromDB);
      } catch (e) {
        throw e;
      } finally {
        setPostLoading(false);
      }
    },
    [apiPostService, reduxPostService]
  );

  const getUserPosts = useCallback(
    async (_id) => {
      try {
        const postsFromDB = await apiPostService.getUserPostsApi(_id);
        reduxPostService.setUserPostsRedux(postsFromDB);
      } catch (e) {
        throw e;
      } finally {
        setPostLoading(false);
      }
    },
    [apiPostService, reduxPostService]
  );

  const deletePost = useCallback(
    async (_id) => {
      try {
        setPostLoading(true);
        await apiPostService.deletePostApi(_id);
        reduxPostService.deletePostRedux(_id);
      } catch (e) {
        throw e;
      } finally {
        setPostLoading(false);
      }
    },
    [apiPostService, reduxPostService]
  );

  const patchPost = useCallback(
    async (_id, changes) => {
      try {
        setPostLoading(true);
        await validate(changes, PostUpdateSchema);
        const formData = new FormData();
        for (const key in changes) {
          if (key !== "photos") {
            formData.append(key, changes[key]);
          } else if (key === "photos") {
            for (let i = 0; i < changes.photos.length; i++) {
              formData.append("photos", changes.photos[i]);
            }
          }
          // } else if (key === "oldPhotos") {
          //   for (let i = 0; i < changes.photos.length; i++) {
          //     formData.append("oldPhotos", changes.photos[i]);
          //   }
          // }
        }
        for (const key in changes) {
          console.log(key, formData.getAll(key));
        }
        const updatedPost = await apiPostService.patchPostApi(_id, formData); //formData
        reduxPostService.patchPostRedux(updatedPost);
      } catch (e) {
        throw e;
      } finally {
        setPostLoading(false);
      }
    },
    [apiPostService, reduxPostService]
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
        const newPostFromDB = await apiPostService.createPostApi(formData);
        reduxPostService.createPostRedux(newPostFromDB);
      } catch (e) {
        throw e;
      } finally {
        setPostLoading(false);
      }
    },
    [apiPostService, reduxPostService]
  );

  return {
    getPosts,
    deletePost,
    patchPost,
    getUserPosts,
    createPost,
    postLoading,
    xTotalCount,
  };
};
