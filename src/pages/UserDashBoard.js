import React, { useEffect, useState } from "react";
const UserDashBoard = ({ orderCount, menuFetch }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div class="c-dashboardInfo">
            <div class="wrap">
              <h2 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                Total Manufactures
              </h2>
              <span class="hind-font caption-12 c-dashboardInfo__count">
                {menuFetch.length}
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div class="c-dashboardInfo">
            <div class="wrap">
              <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                Total Order
              </h4>
              <span class="hind-font caption-12 c-dashboardInfo__count">
                {orderCount.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashBoard;
