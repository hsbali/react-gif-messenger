import { Fragment, useState } from "react";
import "./styles.scss";

import AddMsgModal from "./components/AddMsgModal";

const App = () => {
  const [messages, setMessages] = useState([
    {
      msgText: "Hello",
      gifUrl:
        "https://media1.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif?cid=790b7611bff129c5f10a2e2d7c97bc234505331c553a02d6&rid=giphy.gif&ct=g",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="container my-4">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="d-flex align-item-center mb-3">
            <h3 className="m-0 flex-grow-1">Gif Messenger 💬</h3>
            <button
              className="btn btn-dark"
              onClick={() => setIsModalOpen(true)}
            >
              Add Message
            </button>
          </div>
          {isModalOpen ? (
            <AddMsgModal
              open={setIsModalOpen}
              onClose={() => setIsModalOpen(false)}
              setMessages={setMessages}
            ></AddMsgModal>
          ) : (
            ""
          )}
          {messages.length !== 0 &&
            messages.map((msg, i) => {
              return (
                <Fragment key={i}>
                  <div className="rounded border p-2 my-2">
                    {msg.gifUrl ? (
                      <div className="mb-2">
                        <img
                          src={msg.gifUrl}
                          alt={msg.msgText}
                          className="w-100 rounded"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <p className="fw-bolder mx-2 mb-0">{msg.msgText}</p>
                  </div>
                </Fragment>
              );
            })}
        </div>
        <div className="col-md-3"></div>
      </div>
    </main>
  );
};

export default App;
