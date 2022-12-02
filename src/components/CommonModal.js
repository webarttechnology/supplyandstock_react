import React from "react";
import Modal from "react-responsive-modal";
import pdfFiel from "../assets/images/aggrement-1.png";
const CommonModal = ({
  commonModal,
  setCommonModal,
  trams,
  agreeButton,
  agreeExit,
}) => {
  return (
    <>
      <Modal open={commonModal} onClose={() => setCommonModal(false)}>
        <div class={trams ? "tramsCondi modal-content" : "modal-content"}>
          {trams ? (
            <>
              <img src={pdfFiel} />
              <div className="justify-content-center mt-4 row">
                <div className="col-md-2 text-end">
                  <span className="loginBtn" onClick={agreeButton}>
                    I Agree
                  </span>
                </div>
                <div className="col-md-1">
                  <span className="loginBtn exit" onClick={agreeExit}>
                    Exit
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div class="modal-body forgot">
              <img src="https://img.freepik.com/premium-vector/illustration-work-progress-woman-working-computer-vector-illustration_357257-919.jpg" />
              <h3 className="modalContent">
                This feature is not ready yet. <br /> Watch This space for
                further developments
              </h3>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default CommonModal;
