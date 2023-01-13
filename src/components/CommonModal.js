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
              <main>
                <article class="terms-and-conditions">
                  <h1 className="mb-5">
                    Terms and Conditions for Supply We Stock LLC
                  </h1>
                  {/* <h2>Introduction</h2> */}
                  <p>
                    Thank you for considering using our website to sell your
                    products! By using our website, you agree to the following
                    terms and conditions:
                  </p>
                  <p>
                    You are responsible for ensuring that the products you list
                    on our website are accurate and complete, and that you have
                    the right to sell them.
                  </p>
                  <p>
                    You are responsible for setting the price of your products
                    and for managing the sale of your products and fulfilling
                    orders.
                  </p>
                  {/* <h2>Intellectual Property Rights</h2> */}
                  <p>
                    We reserve the right to remove any listings that violate our
                    policies or are otherwise deemed inappropriate for our
                    website.
                  </p>
                  <p>
                    We are not responsible for any disputes that may arise
                    between you and a buyer.
                  </p>
                  {/* <h2>Restrictions</h2> */}
                  <p>
                    We reserve the right to change these terms and conditions at
                    any time without notice.
                  </p>

                  <p>
                    We reserve the right to remove your account if you violate
                    our website policies.
                  </p>
                  {/* <h2>Your Content</h2> */}
                  <p>
                    Contacting the buyers directly or exchanging contact
                    information will be considered as a breach of contact and
                    such users will be permanently banned from the platform.
                  </p>
                  <p>
                    By using our website, you agree to indemnify and hold us
                    harmless from any claims, losses, or damages arising from
                    your use of our website or your violation of these terms and
                    conditions.
                  </p>
                  <p>
                    These terms and conditions constitute the entire agreement
                    between you and us, and supersede any prior agreements or
                    understandings, whether oral or written.
                  </p>
                  <p>
                    If any provision of these terms and conditions is found to
                    be invalid or unenforceable, the remaining provisions will
                    remain in full force and effect.
                  </p>
                  <p>Thank you for using our website!</p>
                </article>
              </main>
              <div className="justify-content-center mt-4 row">
                <div className="col-md-3 text-end">
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
