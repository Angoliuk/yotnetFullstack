import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Modal } from "../../Common/Modal/Modal";
import "./AnnouncementsBlock.scss";
import AnnouncementCard from "../../UploadCards/AnnouncementCard/AnnouncementCard";
import { Loader } from "../../Common/Loader/Loader";
import { useAnnouncementService } from "../../../Service/Requests/useAnnouncementService";

const AnnouncementsBlock = (props) => {
  const announcementService = useAnnouncementService();
  const { id, announcements, showAlertHandler, text } = props;

  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [loadNewAnnouncements, setLoadNewAnnouncements] = useState(false);

  const showAnnouncementHandler = async () => {
    if (!showAnnouncement) {
      dataRequest();
      setLoadNewAnnouncements(true);
    }

    setShowAnnouncement(!showAnnouncement);
  };

  const dataRequest = useCallback(async () => {
    try {
      if (!loadNewAnnouncements) {
        return null;
      }
      await announcementService.getAnnouncements(pageNum, 10);
    } catch (e) {
      showAlertHandler({
        show: true,
        text: `Error, try to reload this page. ${e}`,
        type: "error",
      });
    } finally {
      setLoadNewAnnouncements(false);
    }
  }, [showAlertHandler, pageNum, loadNewAnnouncements]);

  //load new announcements when scroll to the bottom of the page
  useEffect(() => {
    dataRequest();
  }, [dataRequest]);

  const scrollHandler = useCallback(
    (e) => {
      if (
        e.target.scrollHeight - (e.target.scrollTop + e.target.offsetHeight) <
          30 &&
        announcementService.xTotalCount > pageNum * 10
      ) {
        setLoadNewAnnouncements(true);
        setPageNum((prevState) => prevState + 1);
      }
    },
    [announcementService.xTotalCount, pageNum]
  );

  const AnnouncementsListBlock = useCallback(
    () =>
      announcements && announcements.length > 0 ? (
        announcements.map((announcement) => (
          <AnnouncementCard
            showAlertHandler={showAlertHandler}
            key={announcement.id + id}
            announcementId={announcement.id}
          />
        ))
      ) : (
        <p>Announcements not found</p>
      ),
    [announcements, id, showAlertHandler]
  );

  return (
    <>
      {text ? (
        <p
          onClick={showAnnouncementHandler}
          className="navElem navElemAnnouncements"
        >
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 32 32"
            enableBackground="new 0 0 32 32"
            id="Stock_cut"
            version="1.1"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <desc />
            <g>
              <polygon
                fill="none"
                points="2,3 2,23 6,23    6,29 12,23 30,23 30,3  "
                stroke="#000000"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <circle
                cx="8"
                cy="13"
                fill="none"
                r="2"
                stroke="#000000"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <circle
                cx="16"
                cy="13"
                fill="none"
                r="2"
                stroke="#000000"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <circle
                cx="24"
                cy="13"
                fill="none"
                r="2"
                stroke="#000000"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
            </g>
          </svg>
        </p>
      ) : (
        <p onClick={showAnnouncementHandler}>Announcements</p>
      )}

      {showAnnouncement &&
        Modal(
          <div
            onScroll={scrollHandler}
            id="navBarAnnouncementsBlock"
            className="navBarAnnouncementsBlock"
          >
            <p className="navBarAnnouncementsName">Announcements for you</p>
            <hr />

            <AnnouncementsListBlock />

            {(loadNewAnnouncements ||
              announcementService.announcementLoading) && (
              <div className="navBarAnnouncementsBlockLoader">
                <Loader />
              </div>
            )}
          </div>,
          showAnnouncementHandler,
          "modalBackground navBarAnnouncementBlockBackground"
        )}
    </>
  );
};

const mapStateToProps = (state) => ({
  id: state.userReducers.id,
  announcements: state.announcementReducers.announcements,
});

export default connect(mapStateToProps)(AnnouncementsBlock);
