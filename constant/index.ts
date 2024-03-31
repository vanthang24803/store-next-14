export const PHUKIEN = "Phụ kiện";

export const menubar: { title: string; href: string }[] = [
  {
    title: "Tất cả",
    href: "/collections/all",
  },
  {
    title: "Sách mới",
    href: "/collections/sach-moi",
  },
  {
    title: "Tiểu thuyết",
    href: "/collections/tieu-thuyet",
  },
  {
    title: "Kỹ năng",
    href: "/collections/ky-nang",
  },
  {
    title: "Light Novel",
    href: "/collections/light-novel",
  },
  {
    title: "Manga - Comic",
    href: "/collections/manga-comic",
  },
  {
    title: "Phụ kiện",
    href: "/collections/phu-kien",
  },
  {
    title: "Tra cứu đơn hàng",
    href: "/tra-cuu",
  },
];

export const subBillboard = [
  {
    name: "Sale",
    thumbnail:
      "https://theme.hstatic.net/200000294254/1001077164/14/banner_top_1_img_large.jpg?v=320",
    url: "/",
  },

  {
    name: "Product",
    thumbnail:
      "https://theme.hstatic.net/200000294254/1001077164/14/banner_top_2_img_large.jpg?v=320",
    url: "/",
  },

  {
    name: "Gift",
    thumbnail:
      "https://theme.hstatic.net/200000294254/1001077164/14/banner_top_3_img_large.jpg?v=357",
    url: "/",
  },
];

export const categories = [
  {
    name: "Light Novel",
    url: "/collections/light-novel",
    thumbnail:
      "https://theme.hstatic.net/200000294254/1001077164/14/categorybanner_1_img.jpg?v=342",
  },

  {
    name: "Truyện Tranh",
    url: "/collections/manga-comic",
    thumbnail:
      "https://theme.hstatic.net/200000294254/1001077164/14/categorybanner_2_img.jpg?v=342",
  },

  {
    name: "Tiểu thuyết",
    url: "/collections/tieu-thuyet",
    thumbnail:
      "https://theme.hstatic.net/200000294254/1001077164/14/categorybanner_3_img.jpg?v=342",
  },

  {
    name: "Kỹ năng",
    url: "/collections/ky-nang",
    thumbnail:
      "https://theme.hstatic.net/200000294254/1001077164/14/categorybanner_4_img.jpg?v=342",
  },
];

export const categoryImage = [
  {
    url: "https://theme.hstatic.net/200000294254/1001077164/14/home_tabs_1_banner.jpg?v=342",
    link: "/collections/all",
  },

  {
    url: "https://theme.hstatic.net/200000294254/1001077164/14/home_tabs_2_banner.jpg?v=342",
    link: "/collections/manga-comic",
  },
];

export const info = {
  title: "AMAK Store",
  address: "AMAK Store, Đường Abc, Hà Nội",
  phone: "0123456789",
  email: "mail@example.com",
};

export const footer = [
  {
    title: "Hỗ trợ khách hàng",
    data: [
      {
        name: "Chính sách thanh toán",
        url: "/",
      },
      {
        name: "Chính sách vận chuyển",
        url: "/",
      },

      {
        name: "Chính sách bảo mật thông tin",
        url: "/",
      },

      {
        name: "Chính sách xử lý Khiếu nại",
        url: "/",
      },
      {
        name: "Chính sách đổi trả",
        url: "/",
      },
    ],
  },
  {
    title: "Liên kết",
    data: [
      {
        name: "Sản phẩm khuyến mãi",
        url: "/",
      },
      {
        name: "Sản phẩm nổi bật",
        url: "/",
      },
      {
        name: "Tất cả sản phẩm",
        url: "/",
      },
    ],
  },

  {
    title: "Blog",
    data: [
      {
        name: "Tin Tức",
        url: "/",
      },
      {
        name: "Thông báo bản quyền",
        url: "/",
      },
      {
        name: "Review",
        url: "/",
      },
    ],
  },
];

export const DashboardMenu = [
  {
    name: "Overview",
    href: "/dashboard",
  },
  {
    name: "Billboard",
    href: "/dashboard/billboard",
  },
  {
    name: "Category",
    href: "/dashboard/category",
  },
  {
    name: "Voucher",
    href: "/dashboard/voucher",
  },
  {
    name: "Product",
    href: "/dashboard/product",
  },
  {
    name: "Order",
    href: "/dashboard/order",
  },
];

export const statusList: { [key: string]: string } = {
  PENDING: "Chờ xác nhận",
  CREATE: "Khởi tạo thành công",
  SHIPPING: "Đơn hàng đang trên đường giao",
  SUCCESS: "Giao hàng thành công",
};

export const starList: { [key: number]: string } = {
  5: "Tuyệt vời",
  4: "Hài lòng",
  3: "Bình thường",
  2: "Không hài lòng",
  1: "Tệ",
};

export const statusRanking: { [key: string]: string } = {
  Bronze: "Đồng",
  Silver: "Bạc",
  Gold: "Vàng",
  Platinum: "Bạch kim",
  Diamond: "Kim cương",
};

export const MANGA: string = "Manga";

export const SACHMOI: string = "Sách mới";

export const statusRankingIcon: { [key: string]: string } = {
  Bronze: "/3.png",
  Silver: "/2.png",
  Gold: "/1.png",
  Platinum: "/4.png",
  Diamond: "/5.png",
};

export const Collections = {
  MANGA: {
    name: "Manga",
    thumbnail:
      "https://file.hstatic.net/200000294254/collection/banner_danh_muc_homepage___collection_1920x580px__truyen_tranh__ebacebcd2b134638a9179a96f7b4af29.jpg",
  },
  SACHMOI: {
    name: "Sách mới",
    thumbnail:
      "https://file.hstatic.net/200000294254/collection/sach-moi_df2e4877d9264169bf17da8d1339cbb2.jpg",
  },
  KYNANG: {
    name: "Kỹ năng",
    thumbnail:
      "https://file.hstatic.net/200000294254/collection/banner_danh_muc_homepage___collection_1920x580px__ky_nang__73b162c327bd4a9c8040a0df028632fb.jpg",
  },
  TIEUTHUYET: {
    name: "Tiểu Thuyết",
    thumbnail:
      "https://file.hstatic.net/200000294254/collection/banner_danh_muc_homepage___collection_1920x580px__tieu_thuyet__8c8d0f4a2511417b8ce2191535c34a8a.jpg",
  },
  LIGHTNOVEL: {
    name: "Light Novel",
    thumbnail:
      "https://file.hstatic.net/200000294254/collection/banner_danh_muc_homepage___collection_1920x580px__light_novel__ce3fdb87f20a4423bca39b43a57eb2e9.jpg",
  },
  PHUKIEN: {
    name: "Phụ kiện",
    thumbnail:
      "https://file.hstatic.net/200000294254/collection/phu-kien-1200x628_dbee01b7158e4e0299add52c4ab27531.png",
  },
  HETHANG: {
    name: "SoldOut",
    thumbnail:
      "https://theme.hstatic.net/200000294254/1001077164/14/collection_banner.jpg?v=323",
  },
  GIAMGIA: {
    name: "Sale",
    thumbnail:
      "https://file.hstatic.net/200000294254/collection/banner-collection-50_4cefb152aae04945bbe205504cc7c7a6.jpg",
  },
};

export const statusReview = [
  {
    name: "Mới nhất",
    value: "Lasted",
  },
  {
    name: "Có hình ảnh",
    value: "Image",
  },
];

export const starReview = [
  {
    name: "5 sao",
    value: 5,
  },
  {
    name: "4 sao",
    value: 4,
  },
  {
    name: "3 sao",
    value: 3,
  },
  {
    name: "2 sao",
    value: 2,
  },
  {
    name: "1 sao",
    value: 1,
  },
];
