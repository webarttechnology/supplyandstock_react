import React from "react";
import { useEffect } from "react";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="termCond">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
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
                    the right to sell them .
                  </p>
                  <p>
                    You are responsible for setting the price of your products
                    and for managing the sale of your products and fulfilling
                    orders.
                  </p>
                  {/* <h2>Intellectual Property Rights</h2> */}
                  <p>
                    We are not responsible for any disputes that may arise
                    between you and a buyer.
                  </p>
                  <p>
                    We reserve the right to change these terms and conditions at
                    any time without notice.
                  </p>
                  {/* <h2>Restrictions</h2> */}
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
                  {/* <h2>Your Content</h2> */}
                  <p>
                    If any provision of these terms and conditions is found to
                    be invalid or unenforceable, the remaining provisions will
                    remain in full force and effect.
                  </p>
                  <p>
                    We reserve the right to remove your account if you violate
                    our website policies.
                  </p>
                  <p>
                    Contacting the buyers directly or exchanging contact
                    information will be considered as a breach of contact and
                    such users will be permanently banned from the platform.
                  </p>
                  <p>Thank you for using our website!</p>
                </article>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
