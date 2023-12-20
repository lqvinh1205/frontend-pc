import CategoryBrand from '../../../components/client/CategoryBrand';
import CarouselBanner from '../../../components/client/CarouselBanner';
import ListProducts from '../../../components/client/ListProducts';

const Homepage = (prop) => {
  return (
    <div className="mt-2">
      <div className="mx-auto w-full max-w-[1650px]">
        <div className="flex flex-wrap gap-2">
          <div id="brands">
            <CategoryBrand />
          </div>
          <div id="group-images" className="flex max-w-full flex-1 flex-wrap gap-2">
            <div id="banner" className="max-w-[900px]">
              <CarouselBanner />
            </div>
            <div id="sub-images" className="flex-1 flex-col bg-red-100">
              <div className="flex h-[calc(700px/3)] items-center overflow-hidden">
                <img
                  className=" w-full object-cover"
                  src="https://img.youtube.com/vi/km7C6Hd9cFg/hqdefault.jpg"
                  alt=""
                />
              </div>
              <div className="flex h-[calc(700px/3)] items-center overflow-hidden">
                <img
                  className=" w-full object-cover"
                  src="https://phucanh.vn/upload/img/laptop/350x195.jpg"
                  alt=""
                />
              </div>
              <div className="flex h-[calc(700px/3)] items-center overflow-hidden">
                <img
                  className="w-full object-cover"
                  src="https://phucanh.vn/media/banner/12_Oct579702eb66a569ac47e496cba555e382.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="my-2">
          <ListProducts />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
