import CategoryBrand from '../../../components/client/CategoryBrand';
import CarouselBanner from '../../../components/client/CarouselBanner';
import ListProducts from '../../../components/client/ListProducts';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';

const Homepage = (prop) => {
  const loading = useSelector((state) => state.homepage.loading);
  return (
    <div className="mt-2">
      <div className="mx-auto w-full max-w-[1650px]">
        <div className="grid grid-cols-6 md:gap-2">
          <div id="brands" className="hidden md:flex">
            <CategoryBrand />
          </div>
          <div id="group-images" className="col-span-full max-w-full md:col-span-5">
            <div className="grid grid-cols-4 gap-2">
              <div id="banner" className="col-span-full max-w-full lg:col-span-3">
                <CarouselBanner />
              </div>
              <div id="sub-images" className="hidden flex-col lg:flex">
                <div className="flex h-[calc(700px/3)] items-center overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src="https://img.youtube.com/vi/km7C6Hd9cFg/hqdefault.jpg"
                    alt=""
                  />
                </div>
                <div className="flex h-[calc(700px/3)] items-center overflow-hidden py-2">
                  <img
                    className="h-full w-full object-cover"
                    src="https://phucanh.vn/upload/img/laptop/350x195.jpg"
                    alt=""
                  />
                </div>
                <div className="flex h-[calc(700px/3)] items-center overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src="https://phucanh.vn/media/banner/12_Oct579702eb66a569ac47e496cba555e382.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-2">
          <ListProducts />
        </div>
      </div>
      <Spin spinning={loading} fullscreen />
    </div>
  );
};

export default Homepage;
