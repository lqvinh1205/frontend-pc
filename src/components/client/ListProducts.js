import { Empty, Pagination, message } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../pages/client/homepage/slice';
import { getImage } from '../../ultils';
import { useNavigate } from 'react-router-dom';

const ListProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(0);
  const products = useSelector((state) => state.homepage?.list);
  const total = useSelector((state) => state.homepage?.total);

  const showTotal = (total) => `Tất cả ${total} sản phẩm`;
  const onChangePage = (page) => {
    dispatch(
      getProduct({
        query: `perpage=12&page=${page}&is_delete=false`
      })
    );
  };
  const addToCart = (product) => {
    let carts = localStorage.getItem('carts') || [];
    if (carts.length > 0) {
      carts = JSON.parse(carts);
      const productIdx = carts.findIndex((item) => item._id == product._id);
      if (productIdx !== -1) {
        carts[productIdx]['quantity']++;
        localStorage.setItem('carts', JSON.stringify(carts));
      } else {
        const data = {
          _id: product._id,
          thumbnail: product.thumbnail,
          price: product.price,
          price_root: product.price_root,
          quantity: 1,
          name: product.name
        };
        localStorage.setItem('carts', JSON.stringify([...carts, data]));
      }
    } else {
      const data = {
        _id: product._id,
        thumbnail: product.thumbnail,
        price: product.price,
        price_root: product.price_root,
        quantity: 1,
        name: product.name
      };
      localStorage.setItem('carts', JSON.stringify([data]));
    }
    message.success('Thêm sản phẩm vào giỏ hàng thành công');
  };
  useEffect(() => {
    dispatch(
      getProduct({
        query: `perpage=12&page=1&is_delete=false`
      })
    );
  }, []);

  return (
    <div className="flex w-full max-w-[1650px] flex-col">
      <div
        id="title"
        className="mb-1 flex h-[36px] items-center bg-[#4471c2] pl-2 font-medium text-[#fff]">
        <h3 className="max">Tất cả sản phẩm</h3>
      </div>
      <div
        id="main-list-product"
        className="flex flex-wrap border border-b-0 border-r-0 border-[#ddd] px-2">
        {products.length ? (
          products.map((item, idx) => (
            <div
              key={idx}
              className="flex min-h-[370px] w-[calc(100%/2)] flex-col border-b-[1px] border-r-[1px] text-[13px] sm:w-[calc(100%/4)] lg:w-[calc(100%/6)]">
              <div className="flex max-h-[250px] items-center justify-center overflow-hidden">
                <img src={getImage(item?.thumbnail?.path)} alt="" className="object-contain" />
              </div>
              <div
                onClick={() => navigate(`/products/${item._id}`)}
                className="flex flex-1 cursor-pointer flex-col justify-end p-2">
                <p className="line-clamp-2 overflow-hidden pb-1 leading-[18px]">{item.name}</p>
                <div className="leading-4">
                  <i className="text-[12px]">Giá niêm yết:</i> <span> {item.price_root} đ</span>
                </div>
                <div className="text-[#d42333]">
                  <i className="text-[12px]">Giá bán:</i>
                  <span className="text-[18px]"> {item.price} đ</span>
                </div>
              </div>
              <div className="flex justify-between px-2 pb-2">
                {item.quantity_in_stock > 0 ? (
                  <span className="text-[#12bd1b]">Có hàng</span>
                ) : (
                  <span className="text-[#d42333]">Hết hàng</span>
                )}
                {item.quantity_in_stock > 0 && (
                  <div className="cursor-pointer text-[#d42333]" onClick={() => addToCart(item)}>
                    Thêm vào giỏ
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex-1 py-4">
            <Empty />
          </div>
        )}
      </div>
      <div id="pagination" className="flex justify-center pt-4">
        <Pagination
          defaultCurrent={1}
          size="small"
          total={total}
          pageSize={12}
          onChange={onChangePage}
          showTotal={showTotal}
        />
      </div>
    </div>
  );
};

export default ListProducts;
