import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import AnnouncementCard from "../../UploadCards/AnnouncementCard/AnnouncementCard";
import "./UserAnnouncementsBlock.scss";

const UserAnnouncementsBlock = (props) => {
  const { userId, announcements, userInfo } = props;
  const _id = useParams().id;

  const userAnnouncements = announcements.filter(
    (announcement) => String(announcement.userId) === String(_id)
  );

  return userAnnouncements && userAnnouncements.length > 0 ? (
    <div className="profilePageAnnouncementsBlock">
      <p className="profilePageAnnouncementsName">
        {String(userId) === String(_id) ? "Your " : userInfo.firstname}
        announcements
      </p>

      {userAnnouncements.map((announcement) => (
        <AnnouncementCard
          key={announcement._id}
          announcementId={announcement._id}
        />
      ))}
    </div>
  ) : (
    <p className="profilePageAnnouncementsEmptySection">
      It`s time to create your first announcement
    </p>
  );
};

const mapStateToProps = (state) => ({
  userId: state.userReducers._id,
  announcements: state.announcementReducers.announcements,
});

export default connect(mapStateToProps)(UserAnnouncementsBlock);
