import { Question } from './data';

export const questions5: Question[] = [
  {
    id: 'sql-11', category: 'SQL', difficulty: 'Medium',
    tags: ['SQL', 'Performance', 'N+1'],
    question: 'N+1 Query Problem là gì? Cách giải quyết?',
    answer: `
### 1. N+1 Query Problem là gì?
**N+1 Query** là một vấn đề hiệu suất phổ biến khi làm việc với ORM (như Hibernate, Entity Framework) hoặc khi query dữ liệu có quan hệ 1-N (One-to-Many). 
Nó xảy ra khi bạn thực hiện **1 query** để lấy danh sách N bản ghi cha, sau đó lại thực hiện thêm **N queries** để lấy dữ liệu con của từng bản ghi cha đó. Tổng cộng bạn mất N+1 queries.

### 2. Ví dụ cụ thể
**Vấn đề:** Bạn muốn lấy danh sách 100 bài viết (Posts) và bình luận (Comments) của từng bài viết.
\`\`\`sql
-- 1 query để lấy 100 bài viết
SELECT * FROM Posts LIMIT 100;

-- Sau đó, code của bạn lặp qua 100 bài viết và gọi 100 queries để lấy comments:
SELECT * FROM Comments WHERE post_id = 1;
SELECT * FROM Comments WHERE post_id = 2;
...
SELECT * FROM Comments WHERE post_id = 100;
\`\`\`
Kết quả: Bạn đã gửi 101 queries đến Database. Điều này làm tăng độ trễ mạng (Network Latency) và làm DB quá tải.

### 3. Cách Fix
**Sử dụng JOIN hoặc Eager Loading (IN clause):**
Thay vì lặp, bạn lấy tất cả bài viết và bình luận chỉ bằng 1 hoặc 2 queries.
\`\`\`sql
-- Cách 1: Dùng JOIN (1 query)
SELECT p.*, c.* FROM Posts p 
LEFT JOIN Comments c ON p.id = c.post_id 
WHERE p.id IN (1, 2, ..., 100);

-- Cách 2: Dùng IN clause (2 queries - Thường được ORM dùng khi cấu hình Eager Loading)
SELECT * FROM Posts LIMIT 100;
SELECT * FROM Comments WHERE post_id IN (1, 2, ..., 100);
\`\`\`
    `
  },
  {
    id: 'sql-12', category: 'SQL', difficulty: 'Easy',
    tags: ['SQL', 'Database Design', 'Normalization'],
    question: 'Chuẩn hóa dữ liệu (Database Normalization) là gì? Các dạng chuẩn 1NF, 2NF, 3NF?',
    answer: `
### 1. Normalization là gì?
**Chuẩn hóa dữ liệu** là quá trình tổ chức lại các bảng trong Database để giảm thiểu sự dư thừa dữ liệu (Data Redundancy) và đảm bảo tính toàn vẹn dữ liệu (Data Integrity).

### 2. Các dạng chuẩn cơ bản
- **1NF (First Normal Form):** 
  - Mỗi ô trong bảng chỉ chứa một giá trị duy nhất (Atomic value).
  - Không có cột nào chứa mảng hoặc danh sách.
  - *Ví dụ:* Cột \`skills\` chứa "Java, SQL, Python" vi phạm 1NF. Cần tách thành nhiều dòng hoặc bảng khác.
- **2NF (Second Normal Form):**
  - Phải đạt 1NF.
  - Tất cả các cột không phải khóa chính (Non-key attributes) phải phụ thuộc hoàn toàn vào toàn bộ khóa chính (không phụ thuộc vào một phần của khóa chính composite).
- **3NF (Third Normal Form):**
  - Phải đạt 2NF.
  - Không có sự phụ thuộc bắc cầu (Transitive dependency). Các cột không phải khóa chính không được phụ thuộc vào một cột không phải khóa chính khác.
  - *Ví dụ:* Bảng có \`Order_ID\`, \`Customer_ID\`, \`Customer_Name\`. \`Customer_Name\` phụ thuộc vào \`Customer_ID\` chứ không phụ thuộc trực tiếp vào \`Order_ID\`. Cần tách \`Customer\` ra bảng riêng.
    `
  },
  {
    id: 'sql-13', category: 'SQL', difficulty: 'Medium',
    tags: ['SQL', 'JOIN'],
    question: 'Phân biệt INNER JOIN, LEFT JOIN, RIGHT JOIN và FULL OUTER JOIN?',
    answer: `
Các loại JOIN dùng để kết hợp dữ liệu từ 2 hay nhiều bảng dựa trên một điều kiện chung.

### 1. INNER JOIN
- Trả về các dòng có sự **trùng khớp ở cả hai bảng**.
- *Ví dụ:* Lấy danh sách nhân viên ĐÃ được phân vào phòng ban. Nhân viên chưa có phòng ban hoặc phòng ban chưa có nhân viên sẽ bị loại bỏ.

### 2. LEFT JOIN (hoặc LEFT OUTER JOIN)
- Trả về **tất cả các dòng từ bảng bên trái**, và các dòng trùng khớp từ bảng bên phải. Nếu bảng bên phải không có dữ liệu khớp, các cột của bảng phải sẽ trả về \`NULL\`.
- *Ví dụ:* Lấy danh sách TẤT CẢ nhân viên, kèm theo thông tin phòng ban của họ (nếu có). Nhân viên chưa có phòng ban vẫn hiện ra với department = NULL.

### 3. RIGHT JOIN (hoặc RIGHT OUTER JOIN)
- Ngược lại với LEFT JOIN. Trả về **tất cả các dòng từ bảng bên phải**, và các dòng trùng khớp từ bảng bên trái.

### 4. FULL OUTER JOIN
- Trả về **tất cả các dòng từ cả hai bảng**. Nếu không có sự trùng khớp, phần bị thiếu sẽ là \`NULL\`.
- *Ví dụ:* Lấy danh sách tất cả nhân viên và tất cả phòng ban, bất kể họ có được liên kết với nhau hay không.
    `
  },
  {
    id: 'sql-14', category: 'SQL', difficulty: 'Hard',
    tags: ['SQL', 'Performance', 'Execution Plan'],
    question: 'Execution Plan (Query Plan) là gì? Làm sao để tối ưu một câu query chậm?',
    answer: `
### 1. Execution Plan là gì?
**Execution Plan** là một bản đồ chi tiết do Database Optimizer tạo ra, mô tả chính xác cách Database sẽ thực thi câu lệnh SQL của bạn (dùng Index nào, Join theo thuật toán gì, quét bao nhiêu dòng...).
Bạn có thể xem nó bằng cách thêm từ khóa \`EXPLAIN\` hoặc \`EXPLAIN ANALYZE\` trước câu query.

### 2. Các bước tối ưu một câu query chậm
1. **Dùng EXPLAIN để phân tích:** Xem query đang thực hiện \`Table Scan\` (quét toàn bảng) hay \`Index Scan\`/\`Index Seek\`.
2. **Kiểm tra Index:** Nếu thấy \`Table Scan\` trên các bảng lớn, hãy cân nhắc thêm Index cho các cột trong mệnh đề \`WHERE\`, \`JOIN\`, \`ORDER BY\`.
3. **Tránh SELECT *:** Chỉ select những cột thực sự cần thiết để giảm lượng dữ liệu truyền qua mạng và giảm Disk I/O.
4. **Cẩn thận với hàm (Functions) trong WHERE:** 
   - \`WHERE YEAR(created_at) = 2023\` sẽ làm vô hiệu hóa Index trên cột \`created_at\` (SARGable problem).
   - *Cách fix:* Sửa thành \`WHERE created_at >= '2023-01-01' AND created_at < '2024-01-01'\`.
5. **Sử dụng LIMIT/OFFSET hợp lý:** Tránh dùng \`OFFSET\` quá lớn vì DB vẫn phải quét qua các dòng đó. Cân nhắc dùng Keyset Pagination (Cursor-based pagination).
    `
  },
  {
    id: 'sql-15', category: 'SQL', difficulty: 'Medium',
    tags: ['SQL', 'Architecture', 'Connection Pooling'],
    question: 'Database Connection Pooling là gì? Tại sao nó quan trọng?',
    answer: `
### 1. Connection Pooling là gì?
**Connection Pooling** là một kỹ thuật tạo và duy trì một tập hợp (pool) các kết nối (connections) đến Database đã được mở sẵn, để tái sử dụng cho các request tương lai.

### 2. Tại sao nó quan trọng? (Vấn đề & Giải pháp)
**Vấn đề:** Việc mở một kết nối mới tới Database (TCP handshake, Authentication, cấp phát bộ nhớ) là một thao tác **rất tốn kém và chậm chạp**. Nếu ứng dụng của bạn có 1000 requests/s và mỗi request đều mở rồi đóng một connection mới, Database sẽ bị quá tải và sập rất nhanh.

**Giải pháp (Connection Pool):**
- Khi ứng dụng khởi động, nó tạo sẵn một số lượng connection (ví dụ: 50).
- Khi có request cần query DB, nó "mượn" 1 connection từ Pool.
- Sau khi query xong, thay vì đóng connection, nó "trả" connection đó về lại Pool để request khác dùng tiếp.

### 3. Cấu hình quan trọng
- **Min Pool Size:** Số lượng connection tối thiểu luôn duy trì.
- **Max Pool Size:** Số lượng connection tối đa được phép mở. Nếu vượt quá, các request sau phải chờ. Cài đặt quá cao có thể làm DB hết RAM.
    `
  },
  {
    id: 'sql-16', category: 'SQL', difficulty: 'Hard',
    tags: ['SQL', 'Architecture', 'Scaling'],
    question: 'Phân biệt Database Partitioning và Sharding?',
    answer: `
Cả hai đều là kỹ thuật chia nhỏ dữ liệu khi bảng trở nên quá lớn (hàng tỷ dòng), nhưng cách tiếp cận khác nhau.

### 1. Partitioning (Phân vùng)
- **Là gì:** Chia một bảng lớn thành các phần nhỏ hơn (partitions) **trên cùng một Database Server (cùng một máy vật lý)**.
- **Mục đích:** Tăng tốc độ truy vấn (DB chỉ cần quét một partition thay vì toàn bảng) và dễ quản lý dữ liệu (ví dụ: dễ dàng xóa dữ liệu cũ bằng cách drop một partition).
- **Ví dụ:** Bảng \`Logs\` được partition theo tháng. \`Logs_Jan\`, \`Logs_Feb\`... Tất cả vẫn nằm chung một database.

### 2. Sharding (Phân mảnh)
- **Là gì:** Chia dữ liệu của một bảng ra và lưu trữ trên **nhiều Database Servers khác nhau (nhiều máy vật lý)**.
- **Mục đích:** Scale-out (Mở rộng ngang). Khi một server không đủ dung lượng đĩa cứng hoặc CPU/RAM để xử lý, ta phải chia tải ra nhiều server.
- **Ví dụ:** Bảng \`Users\` được shard theo khu vực. \`Users_US\` nằm ở Server A, \`Users_Asia\` nằm ở Server B.
- **Độ phức tạp:** Sharding phức tạp hơn rất nhiều vì ứng dụng phải biết query đến server nào (Routing), và việc JOIN dữ liệu giữa các shard là cực kỳ khó khăn.
    `
  },
  {
    id: 'sql-17', category: 'SQL', difficulty: 'Hard',
    tags: ['SQL', 'Indexing', 'Data Structures'],
    question: 'Phân biệt B-Tree Index và Hash Index?',
    answer: `
### 1. B-Tree Index (Balanced Tree)
- **Cấu trúc:** Dữ liệu được lưu dưới dạng cây cân bằng. Các node lá chứa con trỏ trỏ đến dữ liệu thật và được liên kết với nhau.
- **Đặc điểm:** Dữ liệu được **sắp xếp theo thứ tự**.
- **Khi nào dùng:** Rất tốt cho các truy vấn tìm kiếm chính xác (\`=\`), tìm kiếm theo khoảng (\`>\`, \`<\`, \`BETWEEN\`), và sắp xếp (\`ORDER BY\`).
- *Lưu ý:* Đây là loại Index mặc định trong hầu hết các RDBMS (MySQL, PostgreSQL, SQL Server).

### 2. Hash Index
- **Cấu trúc:** Sử dụng hàm Hash (Băm) để tính toán ra vị trí lưu trữ dữ liệu từ giá trị của cột.
- **Đặc điểm:** Dữ liệu **không được sắp xếp**.
- **Khi nào dùng:** Cực kỳ nhanh (O(1)) cho các truy vấn tìm kiếm chính xác tuyệt đối (\`=\` hoặc \`IN\`).
- **Nhược điểm:** KHÔNG THỂ dùng cho tìm kiếm theo khoảng (\`>\`, \`<\`) hoặc sắp xếp (\`ORDER BY\`).

**Tóm lại:** Nếu chỉ cần tìm chính xác \`WHERE id = 10\`, Hash Index nhanh hơn. Nhưng thực tế B-Tree linh hoạt hơn rất nhiều nên được dùng phổ biến hơn.
    `
  },
  {
    id: 'sql-18', category: 'SQL', difficulty: 'Medium',
    tags: ['SQL', 'Transactions', 'Isolation'],
    question: 'Các mức độ cô lập (Isolation Levels) trong Database?',
    answer: `
Isolation Levels xác định mức độ "cách ly" của một Transaction so với các Transaction khác đang chạy song song, nhằm giải quyết các hiện tượng đọc sai dữ liệu (Read Phenomena).

Từ thấp đến cao (Hiệu năng giảm dần, tính nhất quán tăng dần):

1. **Read Uncommitted:** 
   - Transaction có thể đọc dữ liệu chưa được commit của transaction khác.
   - *Lỗi gặp phải:* Dirty Read (Đọc dữ liệu rác).
2. **Read Committed:** (Mặc định của PostgreSQL, SQL Server)
   - Chỉ đọc được dữ liệu đã commit.
   - *Lỗi gặp phải:* Non-repeatable Read (Đọc cùng 1 dòng 2 lần ra 2 kết quả khác nhau do có transaction khác vừa update).
3. **Repeatable Read:** (Mặc định của MySQL InnoDB)
   - Đảm bảo nếu đọc cùng 1 dòng nhiều lần trong 1 transaction thì kết quả luôn giống nhau.
   - *Lỗi gặp phải:* Phantom Read (Đọc ra số lượng dòng khác nhau do có transaction khác vừa INSERT/DELETE).
4. **Serializable:**
   - Mức cao nhất. Các transaction chạy tuần tự như thể không có chạy song song.
   - *Đặc điểm:* An toàn nhất nhưng hiệu năng cực kỳ tệ, dễ gây Deadlock.
    `
  },
  {
    id: 'sql-19', category: 'SQL', difficulty: 'Medium',
    tags: ['SQL', 'Advanced', 'Stored Procedure'],
    question: 'Stored Procedure là gì? Ưu và nhược điểm?',
    answer: `
### 1. Stored Procedure là gì?
**Stored Procedure (SP)** là một tập hợp các câu lệnh SQL được biên dịch sẵn và lưu trữ bên trong Database Server. Ứng dụng chỉ cần gọi tên SP và truyền tham số để thực thi.

### 2. Ưu điểm
- **Giảm lưu lượng mạng:** Thay vì gửi hàng chục câu query dài dòng qua mạng, ứng dụng chỉ gửi 1 lệnh gọi SP ngắn gọn.
- **Bảo mật:** Có thể cấp quyền cho user chỉ được chạy SP mà không được truy cập trực tiếp vào các bảng. Giúp chống SQL Injection tốt hơn.
- **Bảo trì:** Logic nghiệp vụ tập trung ở DB. Khi cần sửa logic, đôi khi chỉ cần sửa SP mà không cần deploy lại code ứng dụng.

### 3. Nhược điểm (Lý do hiện nay ít dùng)
- **Khó debug và test:** Viết Unit Test cho SP rất khó khăn so với code Java/Python/NodeJS.
- **Khó version control:** Quản lý source code của SP qua Git phức tạp hơn.
- **Khó scale:** Database thường là nút thắt cổ chai (bottleneck) khó scale nhất. Việc đẩy logic tính toán vào DB làm DB chịu tải nặng hơn. Hiện nay xu hướng là chuyển logic ra Application Layer để dễ scale ngang.
    `
  },
  {
    id: 'sql-20', category: 'SQL', difficulty: 'Hard',
    tags: ['SQL', 'Performance', 'Pagination'],
    question: 'Tại sao dùng LIMIT và OFFSET cho phân trang (Pagination) lại chậm? Cách giải quyết?',
    answer: `
### 1. Vấn đề với OFFSET
Khi bạn dùng query:
\`\`\`sql
SELECT * FROM Orders ORDER BY created_at DESC LIMIT 10 OFFSET 1000000;
\`\`\`
Database **không thể** nhảy thẳng đến dòng thứ 1,000,000. Nó bắt buộc phải duyệt qua và đếm 1,000,000 dòng đầu tiên, sau đó vứt bỏ chúng đi, và chỉ lấy 10 dòng tiếp theo. Khi số trang càng lớn (Deep Pagination), query càng chậm và tốn CPU.

### 2. Cách giải quyết: Keyset Pagination (Cursor-based Pagination)
Thay vì dùng OFFSET để đếm số dòng, ta dùng giá trị của dòng cuối cùng ở trang trước (Cursor) để làm mốc cho trang tiếp theo.

**Ví dụ:** Ở trang 1, dòng cuối cùng có \`id = 999990\`. Để lấy trang 2, ta query:
\`\`\`sql
SELECT * FROM Orders 
WHERE id < 999990 
ORDER BY id DESC 
LIMIT 10;
\`\`\`
**Tại sao nó nhanh?**
Nếu cột \`id\` có Index, Database sẽ dùng Index Seek để nhảy thẳng đến vị trí \`id = 999990\` (độ phức tạp O(log N)) và lấy 10 dòng tiếp theo rất nhanh chóng, bất kể bạn đang ở trang số 1 hay trang số 1 triệu.

*Nhược điểm:* Không thể nhảy cóc đến một trang bất kỳ (ví dụ nhảy thẳng đến trang 50), chỉ có thể đi tới/lui từng trang.
    `
  }
];
