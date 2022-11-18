import React from "react";
import Modal from "react-responsive-modal";

const CommonModal = ({ commonModal, setCommonModal }) => {
  return (
    <>
      <Modal open={commonModal} onClose={() => setCommonModal(false)}>
        <div class="modal-content">
          {/* <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Forgot Password
            </h5>
          </div> */}
          <div class="modal-body forgot">
            <img src="https://img.freepik.com/premium-vector/illustration-work-progress-woman-working-computer-vector-illustration_357257-919.jpg" />
            <h3 className="modalContent">
              This feature is not ready yet. <br /> Watch This space for further
              developments
            </h3>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CommonModal;
