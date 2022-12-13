import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import * as API from "../api/index";
const Order = ({ setOrderCount }) => {
  const [allEnqris, setAllEnqris] = useState([]);

  const allEnquery = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      if (localStorage.getItem("_userType") === "Buyer") {
        const response = await API.user_order(
          localStorage.getItem("__userId"),
          header
        );
        setAllEnqris(response.data.data);
      } else {
        const response = await API.user_order_seller(
          localStorage.getItem("__userId"),
          header
        );
        setAllEnqris(response.data.data);
        setOrderCount(response.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    allEnquery();
  }, []);

  return (
    <>
      <div class="table-responsive">
        <table class="table table-darks mb-0">
          <thead>
            <tr>
              <th>No.</th>
              {localStorage.getItem("_userType") === "Buyer" ? (
                <th>Seller Details</th>
              ) : (
                <th>Buyer Details</th>
              )}

              <th>Enquiry</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allEnqris.map((item, index) => (
              <tr key={index}>
                <td class="text-bold-500">{index + 1}</td>
                {localStorage.getItem("_userType") === "Buyer" ? (
                  <td class="text-bold-500">
                    {item.seller[0].firstName + " " + item.seller[0].lastName}{" "}
                  </td>
                ) : (
                  <td class="text-bold-500">
                    {item.buyer[0].firstName + " " + item.buyer[0].lastName}{" "}
                  </td>
                )}

                <td>
                  <ul className="ps-0">
                    <li>
                      <strong>Product name : </strong> {item.productName}
                    </li>
                    <li>
                      <strong>Quantities : </strong> {item.quantities}
                    </li>
                    <li>
                      <strong>Price : </strong> $ {item.finalAmount}
                    </li>
                  </ul>
                </td>
                <td>
                  {item.isPaid === "paid" ? (
                    <div class="buttons">
                      <span class="btn icon btn-success">Paid</span>
                    </div>
                  ) : (
                    <div class="buttons">
                      <span class="btn icon btn-info">Unpaid</span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Order;
