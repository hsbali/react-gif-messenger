import { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import Masonry from "react-responsive-masonry";
import { getGifs, getSearchedGifs } from "../actions/giphy";

const AddMsgModal = ({ open, onClose, setMessages }) => {
  const [offset, setOffset] = useState(0);
  const [gifLoading, setGifLoading] = useState(true);
  const [gifs, setGifs] = useState([]);
  //   const [onGifPage, setOnGifPage] = useState(0);
  const [gifError, setGifError] = useState();
  const [selectedGif, setSelectedGif] = useState(null);
  const [msgText, setMsgText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setGifs([]);
    loadGifsToState(0);
  }, [searchQuery]);

  const loadGifsToState = (pageOffset) => {
    setGifLoading(true);
    if (searchQuery !== "") {
      getSearchedGifs(pageOffset, searchQuery)
        .then((res) => {
          setGifs((prev) => [...prev, ...res.data]);
          setGifLoading(false);
        })
        .catch((err) => {
          setGifError(err.message);
          setGifLoading(false);
        });
    } else {
      getGifs(offset)
        .then((res) => {
          setGifs((prev) => [...prev, ...res.data]);
          setGifLoading(false);
        })
        .catch((err) => {
          setGifError(err.message);
          setGifLoading(false);
        });
    }
  };

  const onSelectGif = (gif) => {
    setSelectedGif(gif);
  };

  const onSaveMessage = (e) => {
    e.preventDefault();
    setMessages((prev) => [
      { msgText, gifUrl: selectedGif?.images.downsized.url },
      ...prev,
    ]);
    onClose();
  };

  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          width: "100vw",
          position: "fixed",
          height: "100vh",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        onClick={onClose}
      >
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Write new Message ✍️</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={(e) => onSaveMessage(e)}>
              <div
                className="modal-body"
                style={{ maxHeight: "69vh", overflow: "auto" }}
              >
                <div className="mb-2">
                  <label htmlFor="message" className="form-label">
                    Enter your message
                  </label>
                  <textarea
                    className="form-control"
                    rows="1"
                    value={msgText}
                    id="message"
                    placeholder="Start typing..."
                    style={{ resize: "none" }}
                    required
                    onChange={(e) => setMsgText(e.target.value)}
                    autoComplete="off"
                  ></textarea>
                </div>
                {selectedGif ? (
                  <div className="mb-2 position-relative">
                    <div className="selected-gif-overlay">
                      <button
                        type="button"
                        className="btn btn-dark d-flex align-items-center p-2"
                        onClick={() => setSelectedGif(null)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash-fill cursor-pointer"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                      </button>
                    </div>
                    <img
                      height={selectedGif.images.downsized.height}
                      src={selectedGif.images.downsized.url}
                      alt={selectedGif.title}
                      className="w-100 rounded"
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="mb-2">
                  <label htmlFor="gifSearch" className="form-label">
                    Search GIFs
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="gifSearch"
                    placeholder="Search GIFs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="gifs-container rounded p-2 my-2">
                    {gifLoading && gifs.length === 0 ? (
                      <div className="d-flex justify-content-center my-4">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : gifError ? (
                      <div className="d-flex justify-content-center">
                        <small className="text-muted">{gifError.message}</small>
                      </div>
                    ) : gifs.length !== 0 ? (
                      <>
                        <small className="text-muted">
                          Powered by GIPHY.com
                        </small>
                        <Masonry columnsCount={2}>
                          {gifs.map((gif, i) => {
                            return (
                              <Fragment key={i}>
                                <div
                                  className="m-1"
                                  onClick={() => onSelectGif(gif)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <img
                                    src={gif.images.preview_gif.url}
                                    alt={gif.title}
                                    className="w-100 rounded"
                                  />
                                </div>
                              </Fragment>
                            );
                          })}
                        </Masonry>
                        <div className="d-flex my-1">
                          {gifLoading ? (
                            <button
                              type="button"
                              className="btn btn-dark flex-grow-1 mx-1"
                            >
                              <div
                                className="spinner-border spinner-border-sm"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-dark flex-grow-1 mx-1"
                              onClick={() => {
                                loadGifsToState(offset + 1);
                                setOffset((prev) => prev + 1);
                              }}
                            >
                              Load More
                            </button>
                          )}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={onClose}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-dark">
                  Save Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default AddMsgModal;
