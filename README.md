# BookStore Online — Bài thực hành Buổi 8

Đã hoàn thiện Bài 8.1–8.8, hai thử thách C1/C2 và nút hiện/ẩn mật khẩu. Câu trả lời bổ sung: [TraLoi.md](TraLoi.md).

## Chạy dự án

Yêu cầu Node.js 20 trở lên. Terminal thứ nhất:

```bash
npm install
npm run api
```

Terminal thứ hai:

```bash
npm start
```

Nhấn `w` mở web hoặc quét QR bằng Expo Go. Nếu PowerShell chặn `npm.ps1`, dùng `npm.cmd` và `npx.cmd` thay cho `npm` và `npx`.

Kiểm tra kiểu:

```bash
npm run typecheck
```

Tài khoản demo: `demo@bookstore.vn` / `123456`.

## Chức năng hoàn thiện

- Đăng nhập/đăng ký: validate từng ô, lỗi API, loading, tự đăng nhập sau đăng ký; nút 👁 hiện/ẩn mật khẩu.
- Khôi phục phiên, giỏ hàng, yêu thích bằng AsyncStorage; chỉ ghi sau khi nạp xong. Đăng xuất xóa phiên.
- Bảo vệ Checkout ở hai nơi; đăng nhập/đăng ký xong về Checkout với đúng tổng tiền.
- Hiển thị/chọn sao, điểm trung bình và gửi đánh giá qua API, cập nhật ngay trên màn hình.
- Giỏ hàng: tăng/giảm debounce 300 ms, giới hạn tồn kho, xác nhận trước khi xóa.
- Yêu thích dùng chung Redux; danh sách có loading, lỗi/thử lại và trạng thái trống.
- Sách liên quan cùng danh mục, loại sách hiện tại; mở bằng navigation.push.
- SALE10 giảm 10%, GIAM50K giảm tối đa 50.000đ; mã sai báo lỗi, tổng sau giảm chuyển sang Checkout.

Điện thoại thật và máy tính cần cùng Wi-Fi. Nếu không gọi được API, đặt `EXPO_PUBLIC_API_URL=http://<IP-máy-tính>:3000` trước khi chạy Expo.

Đăng nhập là mô phỏng theo đề. json-server ghi tài khoản và đánh giá vào db.json; form địa chỉ/đặt hàng để cho buổi sau theo phạm vi bài tập.
