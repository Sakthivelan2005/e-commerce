import React from 'react';
import HeroCarousel from './HeroCarousel';
import CategorySection from './CategorySection';
import FloatingSupportButton from './FloatingSupportButton';

import { images, menImages, womenImages, jewelryImages} from './images/images';
const Home = () => {
  return (
    <div>
      <HeroCarousel
      images={images} />

      <CategorySection
        title="MEN'S CLOTHING"
        images={menImages}
      />

      <CategorySection
        title="WOMEN'S CLOTHING"
        images={womenImages}
      />

      <CategorySection
        title="JEWELRIES"
        images={jewelryImages}
      />

      <FloatingSupportButton />
    </div>
  );
};

export default Home;