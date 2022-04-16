import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../Components/Common/Button/Button";
import { PagesWrapper } from "../../hoc/PagesWrapper/PagesWrapper";
import "./ProfilePage.scss";
import { Loader } from "../../Components/Common/Loader/Loader";
import { Modal } from "../../Components/Common/Modal/Modal";
import UserPersonalBlock from "../../Components/ProfilePageBlocks/UserPersonalBlock/UserPersonalBlock";
import UserPostsBlock from "../../Components/ProfilePageBlocks/UserPostsBlock/UserPostsBlock";
import UserAnnouncementsBlock from "../../Components/ProfilePageBlocks/UserAnnouncementsBlock/UserAnnouncementsBlock";
import { usePostService } from "../../Service/Requests/usePostService";
import { useAnnouncementService } from "../../Service/Requests/useAnnouncementService";
import { useUserService } from "../../Service/Requests/useUserService";

const ProfilePage = (props) => {
  const { showAlertHandler } = props;
  const id = useParams().id;
  const postService = usePostService();
  const userService = useUserService();
  const announcementService = useAnnouncementService();
  const loading =
    userService.userLoading ||
    postService.postLoading ||
    announcementService.announcementLoading;

  const [section, setSection] = useState("personal");

  const [userInfo, setUserInfo] = useState({
    email: "",
    firstname: "",
    lastname: "",
    age: 0,
    avatar: "https://picsum.photos/60",
  });

  const dataRequest = useCallback(async () => {
    try {
      if (section === "personal") {
        const user = await userService.getUser(id);
        delete user.password;
        setUserInfo(user);
      } else if (section === "announcements") {
        await postService.getUserPosts(id);
      } else if (section === "posts") {
        await announcementService.getUserAnnouncements(id);
      } else {
        throw new Error("unknown info section");
      }
    } catch (e) {
      console.log(e);
      showAlertHandler({
        show: true,
        text: `Error, try to reload this page. ${e}`,
        type: "error",
      });
    }
  }, [section, id, showAlertHandler]);

  const changeSection = (e) => setSection(e.target.name);

  const ChosenSectionBlock = useCallback(() => {
    return {
      personal: (
        <UserPersonalBlock
          showAlertHandler={showAlertHandler}
          userInfo={userInfo}
        />
      ),
      posts: (
        <UserPostsBlock
          showAlertHandler={showAlertHandler}
          userInfo={userInfo}
        />
      ),
      announcements: (
        <UserAnnouncementsBlock
          userInfo={userInfo}
          showAlertHandler={showAlertHandler}
        />
      ),
    }[section];
  }, [section, userInfo, showAlertHandler]);

  useEffect(() => {
    dataRequest();
  }, [dataRequest]);

  return (
    <div className="profilePageMainBlock">
      {loading && Modal(<Loader />)}

      <div className="chooseInfoTypeBlock">
        <Button
          onClick={changeSection}
          text="personal"
          name="personal"
          classNameBlock="chooseInfoTypeBlockProfilePage"
          className={`button chooseInfoTypeButtonProfilePage ${
            section === "personal"
              ? "chooseInfoTypeButtonProfilePageActive"
              : ""
          }`}
        />

        <Button
          onClick={changeSection}
          text="posts"
          name="posts"
          classNameBlock="chooseInfoTypeBlockProfilePage"
          className={`button chooseInfoTypeButtonProfilePage ${
            section === "posts" ? "chooseInfoTypeButtonProfilePageActive" : ""
          }`}
        />

        <Button
          onClick={changeSection}
          text="announcements"
          name="announcements"
          classNameBlock="chooseInfoTypeBlockProfilePage"
          className={`button chooseInfoTypeButtonProfilePage ${
            section === "announcements"
              ? "chooseInfoTypeButtonProfilePageActive"
              : ""
          }`}
        />
      </div>

      <ChosenSectionBlock />
    </div>
  );
};

export default PagesWrapper(ProfilePage);
