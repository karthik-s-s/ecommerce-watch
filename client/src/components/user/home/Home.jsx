import React from 'react';
import { Box, Typography ,Button} from '@mui/material';
//swiper
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
// import 'swiper/swiper.min.css';
import './Home.css';

SwiperCore.use([EffectCoverflow, Autoplay, Pagination]);
const slide_img = [
  'https://img.freepik.com/premium-psd/watch-promotion-social-media-banner-template_229256-76.jpg?size=338&ext=jpg&ga=GA1.2.1755782096.1660159902',
  'https://img.freepik.com/premium-psd/watch-sale-social-media-post-template_179771-163.jpg?size=338&ext=jpg&ga=GA1.2.1755782096.1660159902',
  'https://img.freepik.com/premium-psd/dark-color-classic-watch-brand-product-social-media-post-banner-template_154386-132.jpg?size=626&ext=jpg&ga=GA1.2.1755782096.1660159902',
  'https://img.freepik.com/premium-psd/modern-watch-social-media-instagram-post-template_264308-56.jpg?size=338&ext=jpg&ga=GA1.2.1755782096.1660159902',
  'https://img.freepik.com/premium-psd/flash-sale-smartwatch-social-media-post-template_490640-271.jpg?size=338&ext=jpg&ga=GA1.2.1755782096.1660159902',
  'https://img.freepik.com/premium-psd/watch-social-media-instagram-post-banner-template_170823-76.jpg?size=338&ext=jpg&ga=GA1.2.1755782096.1660159902',
  'https://img.freepik.com/premium-psd/dark-color-classic-watch-brand-product-social-media-post-banner-template_154386-132.jpg?size=626&ext=jpg&ga=GA1.2.1755782096.1660159902',
  'https://img.freepik.com/premium-psd/chocolate-color-watch-brand-product-social-media-post-banner_154386-160.jpg?size=626&ext=jpg&ga=GA1.2.1755782096.1660159902',
  'https://img.freepik.com/premium-psd/watch-sale-social-media-post-template_179771-163.jpg?size=338&ext=jpg&ga=GA1.2.1755782096.1660159902',
];

export default () => {
  return (
    <>
    <div className="main-swiper">
      <Swiper
        effect={'coverflow'}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={false}
        className="mySwiper"
      >
        {/* using array */}
        {slide_img.map((img, i) => {
          return (
            <SwiperSlide key={i}>
              <img src={img} alt="" />
            </SwiperSlide>
          );
        })}

        {/* or use normally 

      <SwiperSlide>
        <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://swiperjs.com/demos/images/nature-4.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://swiperjs.com/demos/images/nature-5.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://swiperjs.com/demos/images/nature-6.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-7.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://swiperjs.com/demos/images/nature-8.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-9.jpg" alt="" />
      </SwiperSlide>
      
    */}
      </Swiper>
    </div>

      {/* paragraphs */}
      <Box 
        textAlign={'center'}
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        
        >
        <Typography
          fontFamily="fantasy"
          sx={{ mx: 'auto', my: 4 }}
          align="center"
          variant="h3"
          component="div"
          gutterBottom
          >
          bringing Joy through Time
        </Typography>
        <Typography
          sx={{ mx: 'auto', px: 3 }}
          variant="h4"
          gutterBottom
          component="div"
          fontFamily="monospace"
        >
          "Time is what we want most but what we use worst.”
        </Typography>
        <Typography
          fontFamily="-moz-initial"
          sx={{ mx: 'auto', px: 3 }}
          variant="body1"
          gutterBottom
        >
          If Fastrack was to be described in a single word, ‘Irreverent’ would
          be it. Not the insolent, sacrilegious or rude variety, but more the
          cheeky anti-authoritarian kind. This is evident in the brand’s edgy,
          provocative and tongue-in-cheek advertising. A brand that questions
          everything, pushes boundaries, constantly re-invents and never strays
          near the beaten path. Fastrack has earned the tag of being
          ‘Effortlessly Cool’. For them it boils down to not taking things too
          seriously, they flip the bird at having to be acceptable and smile
          sardonically in the face of all the haters. Stemming from the need to
          keep their audience engaged and at the edge of their seats, Fastrack
          has developed the innate ability to switch tracks and constantly
          reinvent. The brand is ‘Unpredictable’, and always has a trick up its
          sleeve. The ideal of being ‘Eternally Young’ is a concept that
          Fastrack identifies with and lives by, every day. It is straddling
          that thin red line between adolescent and adulthood and it is staying
          right there. Fastrack’s permanent subscription to the fountain of
          youth is an integral base in its DNA strand as progression is infinite
          when you are forever young.
        </Typography>
        <div style={{backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/116/423/763/clock-detail-jewelry-luxury-wallpaper-preview.jpg)'}} className='my-4 p-5' >
          <Button sx={{width:'60%',m:5,p:5,fontWeight:'bold'}} variant="outlined">Explore Watches</Button>
        </div>
      </Box>

          </>
  );
};
