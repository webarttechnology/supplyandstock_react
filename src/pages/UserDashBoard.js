import React from 'react'

const UserDashBoard = () => {
  return (
    <>
        <div className='row'>
            <div className='col-md-6'>
                <div class="c-dashboardInfo">
                    <div class="wrap">
                        <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Total Manufactures<svg
                        class="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                        </path>
                        </svg></h4><span class="hind-font caption-12 c-dashboardInfo__count">10,500</span>
                    </div>
                </div>
            </div>
            <div className='col-md-6'>
                <div class="c-dashboardInfo">
                    <div class="wrap">
                        <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Total Order<svg
                        class="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                        </path>
                        </svg></h4><span class="hind-font caption-12 c-dashboardInfo__count">10,500</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserDashBoard