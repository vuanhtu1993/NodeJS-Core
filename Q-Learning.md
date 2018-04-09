### Q-Learning
1. Cách học từ quá khứ (tìm ra quy luật hành động nói chung thông qua kinh nghiệm thu được từ các
hành động trước đó)
2. Có nhiều phương pháp học tăng cường nhưng Q-Learning tỏ ra hiệu quả cho các bài toán tìm đường
3. Bài toán được thực hiện theo kiểu off-policy, vì vậy pp này được điều chình và kết hợp với các phương
pháp khác để giải các bài toán đặc biệt trong mạng Q-route hay trong hệ thông multi-agent (Ant - Q)

### Học tăng cường
1. Là phương pháp học thông qua tương tác với môi trường. Mô hình của học tăng cường gồm 3 phần chính
tác tử, môi trường và giá trị phản hồi. Quá trình học là quá trình lặp đi lặp lại (iteration) các hành động
. Sau khi thực hiện một hành động thì agent chuyển từ state này sang state khác đồng thời nhận giá trị phản 
hồi từ hành động cũ. Dựa vào giá trị phản hồi nhận được, agent có thể điều chỉnh luận chọn hành động cho các
bước tiếp theo
Việc điều chỉnh và tối ưu hóa luật chọn hành động (policy) dựa vào các giá trị phản hồi là học TĂNG CƯỜNG
![alt text](https://www.google.com.vn/search?rlz=1C1CHBF_viVN788VN788&biw=1366&bih=662&tbm=isch&sa=1&ei=-pjLWpb2Komx0AT664yYDQ&q=q+learning+algorithm&oq=Q-lear&gs_l=psy-ab.3.1.0i30k1l2j0i13i30k1j0i8i30k1.2479.5133.0.6739.6.6.0.0.0.0.127.661.2j4.6.0....0...1c.1.64.psy-ab..0.6.656...0j0i10i30k1j0i19k1j0i30i19k1j0i13i30i19k1.0.xnPtbcO1MN0#imgrc=jNF8ZceNaE9edM:)

2. Thách thức như sau: Sau mỗi lần nhận được giá trị phản hồi thì qua thời gian học lâu dài dẫn đến 
só lượng thông tin phản hồi là rất lớn mà mỗi thời điểm lại không thể quan tâm hết được 

    > Để giải quyết vấn đề này, mô hình học tăng cường được đưa về mô hình Markov là sự mở rộng của chuỗi 
    > Markov. Chuỗi Markov là quá trình ngẫu nhiên mà giá trị hàm xác suất của mỗi bước tiếp theo chỉ
    > phụ thuộc thông số của bước trước đó, điều này cho phép ta chỉ quản tâm đến giá trị phản hồi ngay trước đó
    ```javascript
       
    ``` 