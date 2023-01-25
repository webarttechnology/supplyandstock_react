import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import user1 from "../assets/images/user-1.jpg";
import user2 from "../assets/images/user-4.jpg";
import user3 from "../assets/images/user-07.jpg";
import user4 from "../assets/images/user-10.jpg";
const Slider = () => {
  return (
    <>
      <div className="testimonials">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9">
              <OwlCarousel
                className="owl-theme"
                loop
                margin={10}
                autoplay={true}
                items={1}
                responsiveClass={true}
                autoplaySpeed={5000}
              >
                <div class="item">
                  <div class="testimonial">
                    <div class="pic">
                      <img src={user1} alt="" class="img-responsive" />
                    </div>
                    <h3 class="testimonial-info">
                      krystal
                      <small>Consectetur</small>
                    </h3>
                    <p class="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Morbi facilisis. Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Voluptatibus minus temporibus aspernatur
                      dignissimos illum, autem a debitis ex excepturi facilis
                      possimus facere laborum doloremque iure fugiat iusto quod
                      tenetur vel?
                    </p>
                  </div>
                </div>
                <div class="item">
                  <div class="testimonial">
                    <div class="pic">
                      <img src={user2} alt="" class="img-responsive" />
                    </div>
                    <h3 class="testimonial-info">
                      krystal
                      <small>Web Developer</small>
                    </h3>
                    <p class="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Morbi facilisis. Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Voluptatibus minus temporibus aspernatur
                      dignissimos illum, autem a debitis ex excepturi facilis
                      possimus facere laborum doloremque iure fugiat iusto quod
                      tenetur vel?
                    </p>
                  </div>
                </div>
                <div class="item">
                  <div class="testimonial">
                    <div class="pic">
                      <img src={user3} alt="" class="img-responsive" />
                    </div>
                    <h3 class="testimonial-info">
                      krystal
                      <small>Web Developer</small>
                    </h3>
                    <p class="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Morbi facilisis. Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Voluptatibus minus temporibus aspernatur
                      dignissimos illum, autem a debitis ex excepturi facilis
                      possimus facere laborum doloremque iure fugiat iusto quod
                      tenetur vel?
                    </p>
                  </div>
                </div>
                <div class="item">
                  <div class="testimonial">
                    <div class="pic">
                      <img src={user4} alt="" class="img-responsive" />
                    </div>
                    <h3 class="testimonial-info">
                      krystal
                      <small>Web Developer</small>
                    </h3>
                    <p class="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Morbi facilisis. Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Voluptatibus minus temporibus aspernatur
                      dignissimos illum, autem a debitis ex excepturi facilis
                      possimus facere laborum doloremque iure fugiat iusto quod
                      tenetur vel?
                    </p>
                  </div>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
