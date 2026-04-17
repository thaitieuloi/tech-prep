export type Category = 
  | 'System Design' 
  | 'SQL' 
  | 'API Gateway' 
  | 'Service Mesh' 
  | 'Spring Boot' 
  | 'Python'
  | 'Frontend'
  | 'Docker & K8s'
  | 'Message Queues'
  | 'DevOps'
  | 'AWS'
  | 'Git'
  | 'Monitoring'
  | 'AI & ML'
  | 'Security'
  | 'DSA';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Language = 'vi' | 'en' | 'ja';

export interface QuestionTranslation {
  question: string;
  answer: string;
}

export interface Question {
  id: string;
  category: Category;
  question: string;
  answer: string;
  translations?: {
    vi?: QuestionTranslation;
    en?: QuestionTranslation;
    ja?: QuestionTranslation;
  };
  imageUrl?: string;
  difficulty: Difficulty;
  tags: string[];
  likes?: number;
  publishAt?: string;
}

export const categories: Category[] = [
  'System Design',
  'SQL',
  'API Gateway',
  'Service Mesh',
  'Spring Boot',
  'Python',
  'Frontend',
  'Docker & K8s',
  'Message Queues',
  'DevOps',
  'AWS',
  'Git',
  'Monitoring',
  'AI & ML',
  'Security',
  'DSA'
];

export const questions: Question[] = [
  // ================= SYSTEM DESIGN =================
  {
    id: 'sd-1', category: 'System Design', difficulty: 'Easy',
    tags: ['Architecture', 'Microservices'],
    question: 'Sự khác biệt giữa Microservices và Monolithic Architecture là gì?',
    answer: `
### 1. Monolithic Architecture (Kiến trúc nguyên khối)
Toàn bộ ứng dụng (UI, Business Logic, Data Access) được xây dựng và deploy thành **một khối duy nhất** (single codebase/executable).

**Ưu điểm:**
- Dễ dàng phát triển, test và debug ở giai đoạn đầu.
- Deploy đơn giản (chỉ copy 1 file WAR/JAR hoặc 1 thư mục).

**Nhược điểm:**
- **Khó scale:** Phải scale toàn bộ ứng dụng dù chỉ 1 module bị quá tải.
- **Rủi ro cao:** Một bug nhỏ (ví dụ memory leak ở module thanh toán) có thể làm sập toàn bộ hệ thống.
- **Khó nâng cấp công nghệ:** Bị khóa chặt vào một ngôn ngữ/framework duy nhất.

---

### 2. Microservices Architecture (Kiến trúc vi dịch vụ)
Ứng dụng được chia nhỏ thành nhiều services độc lập. Mỗi service phụ trách một nghiệp vụ riêng (ví dụ: User Service, Order Service) và giao tiếp qua API (REST/gRPC) hoặc Message Queue.

**Ưu điểm:**
- **Scale linh hoạt:** Module nào tải nặng thì chỉ scale module đó.
- **Fault Isolation:** Service này sập không làm chết service khác.
- **Đa dạng công nghệ:** Có thể dùng Node.js cho API, Python cho AI, Java cho Core Banking trong cùng 1 hệ thống.

**Nhược điểm:**
- Vận hành cực kỳ phức tạp (cần K8s, CI/CD tốt).
- Khó debug và theo dõi log (cần Distributed Tracing).
- Xử lý transaction phân tán (Distributed Transaction) rất khó.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Microservices+vs+Monolithic+Architecture'
  },
  {
    id: 'sd-2', category: 'System Design', difficulty: 'Easy',
    tags: ['Load Balancing', 'Networking'],
    question: 'Load Balancer (Bộ cân bằng tải) là gì? Có những thuật toán nào phổ biến?',
    answer: `
### 1. Load Balancer là gì?
**Load Balancer (Bộ cân bằng tải)** là một thiết bị (Hardware) hoặc phần mềm (Software) đứng giữa Client và các Server Backend. Nó làm nhiệm vụ phân phối lượng traffic truy cập đồng đều vào các server, đảm bảo không có server nào bị quá tải.

### 2. Lợi ích cốt lõi
- **High Availability (Độ sẵn sàng cao):** Nếu 1 server chết, LB tự động phát hiện (qua Health Check) và ngưng gửi traffic vào đó.
- **Scalability (Khả năng mở rộng):** Dễ dàng thêm server mới vào hệ thống mà không làm gián đoạn người dùng.
- **Security:** Giấu IP thật của server backend, hỗ trợ SSL Termination (giải mã SSL tại LB để giảm tải cho backend).

### 3. Các thuật toán phân phối phổ biến
1. **Round Robin:** Phân phối request lần lượt theo vòng tròn (A -> B -> C -> A). Dùng khi các server có cấu hình giống nhau.
2. **Least Connections:** Gửi request đến server đang có ít kết nối đang mở nhất. Dùng khi các request có thời gian xử lý không đều nhau.
3. **IP Hash:** Dùng IP của client băm (hash) ra để luôn map client đó vào một server cố định. Rất hữu ích để duy trì Session (Session Sticky).
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Load+Balancing+Algorithms'
  },
  {
    id: 'sd-3', category: 'System Design', difficulty: 'Medium',
    tags: ['System Design', 'Scalability'],
    question: 'Làm thế nào để thiết kế hệ thống URL Shortener (như TinyURL)?',
    answer: `
### 1. Bài toán
Thiết kế hệ thống rút gọn URL (như bit.ly). Đầu vào là 1 URL dài, đầu ra là 1 URL ngắn (ví dụ: \`bit.ly/3xYz1\`). Khi user truy cập URL ngắn, hệ thống redirect về URL dài.

### 2. Thiết kế Database
Hệ thống này **Read-heavy** (Tỉ lệ Đọc:Ghi thường là 100:1).
- Nên dùng **NoSQL** (DynamoDB, Cassandra) để scale dễ dàng và đọc siêu tốc.
- Bảng \`URL_Mapping\`: \`short_url\` (Partition Key), \`long_url\`, \`created_at\`, \`user_id\`.

### 3. Thuật toán tạo URL ngắn
Dùng mã hóa **Base62** (gồm 26 chữ thường, 26 chữ hoa, 10 số).
- Với độ dài 6 ký tự Base62, ta tạo được \`62^6 = 56.8 tỷ\` URL khác nhau.
- **Cách làm:** Cấp cho mỗi URL dài một ID tự tăng (Auto-increment ID) từ Database, sau đó convert ID đó sang Base62.
- *Ví dụ:* ID = 11157 -> Base62 = \`2TX\`. URL ngắn sẽ là \`bit.ly/2TX\`.

### 4. Xử lý đụng độ (Collision) và Scale
Nếu dùng Auto-increment ID trong môi trường phân tán, các DB node có thể sinh trùng ID.
- **Giải pháp:** Dùng một **Key Generation Service (KGS)**. KGS sẽ sinh sẵn hàng triệu ID độc lập, lưu vào bộ nhớ đệm (Zookeeper/Redis). Khi có request rút gọn, chỉ cần lấy 1 ID ra dùng ngay lập tức, đảm bảo không bao giờ trùng lặp và tốc độ cực nhanh.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=URL+Shortener+Architecture'
  },
  {
    id: 'sd-4', category: 'System Design', difficulty: 'Medium',
    tags: ['Distributed Systems', 'CAP'],
    question: 'Định lý CAP (CAP Theorem) là gì?',
    answer: `
### 1. Định nghĩa
Định lý CAP phát biểu rằng trong một hệ thống phân tán (Distributed System), bạn **CHỈ CÓ THỂ ĐẠT ĐƯỢC TỐI ĐA 2 TRONG 3** đặc tính sau:

1. **Consistency (Tính nhất quán - C):** Mọi node đều nhìn thấy cùng một dữ liệu tại cùng một thời điểm. (Đọc sau khi ghi chắc chắn ra data mới nhất).
2. **Availability (Tính sẵn sàng - A):** Mọi request đều nhận được phản hồi (không bị lỗi), nhưng không đảm bảo là data mới nhất.
3. **Partition Tolerance (Khả năng chịu lỗi phân vùng - P):** Hệ thống vẫn hoạt động dù kết nối mạng giữa các node bị đứt gãy.

### 2. Sự đánh đổi (Trade-offs) trong thực tế
Mạng Internet luôn có rủi ro đứt kết nối, do đó **P là bắt buộc phải có**. Ta chỉ có thể chọn giữa **CP** hoặc **AP**:

- **Hệ thống CP (Consistency + Partition Tolerance):** 
  - *Cách hoạt động:* Khi mạng đứt, hệ thống sẽ từ chối trả lời (báo lỗi) để tránh trả về data cũ sai lệch.
  - *Ví dụ:* MongoDB, Redis, HBase, Hệ thống ngân hàng.
- **Hệ thống AP (Availability + Partition Tolerance):**
  - *Cách hoạt động:* Khi mạng đứt, hệ thống vẫn trả về data (dù có thể là data cũ). Đảm bảo user luôn truy cập được.
  - *Ví dụ:* Cassandra, DynamoDB, Facebook Feed, Shopee Product Catalog.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=CAP+Theorem+Triangle'
  },
  {
    id: 'sd-5', category: 'System Design', difficulty: 'Hard',
    tags: ['Database', 'Scaling'],
    question: 'Sự khác nhau giữa Database Sharding và Partitioning?',
    answer: `
### 1. Partitioning (Phân vùng)
Chia một bảng lớn thành các phần nhỏ hơn lưu trên **CÙNG MỘT database server**.
- **Cách hoạt động:** Ví dụ bảng \`Orders\` có 100 triệu dòng, ta chia thành 12 partitions theo tháng (Tháng 1 đến Tháng 12).
- **Mục đích:** Tăng tốc độ query (chỉ quét trên partition cần thiết thay vì toàn bảng), dễ dàng xóa data cũ (chỉ cần drop partition của năm ngoái).
- **Nhược điểm:** Vẫn bị giới hạn bởi phần cứng của 1 server (CPU, RAM, Disk).

### 2. Sharding (Phân mảnh)
Chia dữ liệu ra và lưu trữ trên **NHIỀU database servers khác nhau** (mỗi server là một Shard).
- **Cách hoạt động:** Ví dụ chia User theo khu vực. User Châu Á lưu ở DB Server 1, User Châu Âu lưu ở DB Server 2.
- **Mục đích:** Scale ngang (Horizontal scaling) khi một server không đủ sức chứa hoặc xử lý lượng traffic khổng lồ.
- **Nhược điểm (Rất phức tạp):** 
  - Khó thực hiện JOIN giữa các bảng nằm ở 2 server khác nhau.
  - Phức tạp trong việc chọn **Shard Key** (nếu chọn sai sẽ gây ra Hotspot - một server chịu tải quá nặng trong khi server kia rảnh rỗi).
  - Khó khăn khi muốn thêm server mới (phải re-balance lại toàn bộ dữ liệu).
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Database+Sharding+vs+Partitioning'
  },

  // ================= SQL =================
  {
    id: 'sql-1', category: 'SQL', difficulty: 'Easy',
    tags: ['SQL', 'Joins'],
    question: 'Giải thích sự khác nhau giữa INNER, LEFT, RIGHT và FULL JOIN?',
    answer: `
JOIN là thao tác kết hợp dữ liệu từ 2 hay nhiều bảng dựa trên một cột chung.

### 1. INNER JOIN
- Chỉ trả về các dòng có sự khớp nhau ở **cả 2 bảng**.
- *Ví dụ:* Chỉ lấy những Khách hàng ĐÃ CÓ Đơn hàng.
\`\`\`sql
SELECT * FROM Customers c INNER JOIN Orders o ON c.id = o.customer_id;
\`\`\`

### 2. LEFT JOIN (LEFT OUTER JOIN)
- Trả về **TẤT CẢ** các dòng từ bảng bên trái (bảng A), và các dòng khớp ở bảng phải (bảng B). 
- Nếu bảng B không có dữ liệu khớp, các cột của bảng B sẽ mang giá trị \`NULL\`.
- *Ví dụ:* Lấy TẤT CẢ Khách hàng, ai có đơn hàng thì hiện ra, ai chưa mua gì thì cột đơn hàng để NULL.

### 3. RIGHT JOIN (RIGHT OUTER JOIN)
- Ngược lại với LEFT JOIN. Trả về **TẤT CẢ** các dòng từ bảng bên phải (bảng B).

### 4. FULL JOIN (FULL OUTER JOIN)
- Trả về tất cả các dòng từ cả 2 bảng. Không khớp bên nào thì bên đó \`NULL\`.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=SQL+Joins+Venn+Diagrams'
  },
  {
    id: 'sql-2', category: 'SQL', difficulty: 'Easy',
    tags: ['SQL', 'Keys'],
    question: 'Primary Key khác Unique Key ở điểm nào?',
    answer: `
Cả hai đều dùng để đảm bảo tính duy nhất của dữ liệu trong một cột, nhưng có các điểm khác biệt cốt lõi:

### 1. Mục đích sử dụng
- **Primary Key (Khóa chính - PK):** Dùng để **định danh duy nhất** một dòng (record) trong bảng. (Ví dụ: \`id\`, \`CMND\`).
- **Unique Key (Khóa độc nhất - UK):** Dùng để đảm bảo giá trị của một cột không bị trùng lặp với các dòng khác. (Ví dụ: \`email\`, \`username\`).

### 2. Giá trị NULL
- **Primary Key:** TUYỆT ĐỐI KHÔNG cho phép giá trị \`NULL\`.
- **Unique Key:** CHO PHÉP giá trị \`NULL\` (Tùy thuộc vào Database, MySQL cho phép nhiều dòng có giá trị NULL trong cột Unique, trong khi SQL Server chỉ cho phép 1 dòng NULL).

### 3. Số lượng trong một bảng
- Một bảng chỉ có thể có **TỐI ĐA 1 Primary Key** (có thể là Composite Key gồm nhiều cột gộp lại).
- Một bảng có thể có **NHIỀU Unique Key**.

### 4. Indexing
- Mặc định, Primary Key sẽ tự động tạo ra một **Clustered Index** (sắp xếp dữ liệu vật lý trên ổ cứng theo PK).
- Unique Key sẽ tạo ra một **Non-Clustered Index**.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Primary+Key+vs+Unique+Key'
  },
  {
    id: 'sql-3', category: 'SQL', difficulty: 'Medium',
    tags: ['SQL', 'Performance', 'Indexing'],
    question: 'Index là gì? Khi nào nên và không nên dùng Index?',
    answer: `
### 1. Index là gì?
**Index (Chỉ mục)** là một cấu trúc dữ liệu (thường là B-Tree hoặc Hash) được Database tạo ra để tăng tốc độ tìm kiếm dữ liệu. 
Nó giống như **Mục lục của một cuốn sách**: Thay vì lật từng trang để tìm một từ (Table Scan), bạn mở mục lục ra, tìm số trang và lật thẳng đến đó (Index Seek).

### 2. Vấn đề xảy ra khi KHÔNG có Index (Ví dụ cụ thể)
**Vấn đề:** Giả sử bạn có bảng \`Users\` với 10 triệu bản ghi. Bạn cần tìm user có email là \`test@example.com\`.
\`\`\`sql
SELECT * FROM Users WHERE email = 'test@example.com';
\`\`\`
Nếu không có Index trên cột \`email\`, Database phải thực hiện **Full Table Scan** (quét từ dòng 1 đến dòng 10 triệu) để tìm kiếm. Điều này làm CPU và Disk I/O tăng vọt, query có thể mất vài giây đến vài chục giây.

**Cách Fix:** Tạo Index trên cột \`email\`.
\`\`\`sql
CREATE INDEX idx_users_email ON Users(email);
\`\`\`
Lúc này, DB sẽ tạo ra một cây B-Tree lưu trữ các email đã được sắp xếp. Việc tìm kiếm chỉ mất vài thao tác duyệt cây (độ phức tạp O(log N)), query sẽ trả về kết quả chỉ trong vài mili-giây.

### 3. Khi nào NÊN dùng Index?
- Các cột thường xuyên xuất hiện trong mệnh đề \`WHERE\`.
- Các cột dùng để \`JOIN\` giữa các bảng (Foreign Keys).
- Các cột thường xuyên dùng để \`ORDER BY\` hoặc \`GROUP BY\`.

### 4. Khi nào KHÔNG NÊN dùng Index?
**Vấn đề:** Lạm dụng tạo Index trên mọi cột.
- **Bảng thường xuyên bị INSERT/UPDATE/DELETE:** Mỗi lần dữ liệu thay đổi, Database phải tốn chi phí để cập nhật lại cấu trúc cây Index. Quá nhiều Index sẽ làm thao tác Ghi (Write) cực kỳ chậm.
- **Cột có giá trị trùng lặp cao (Low Cardinality):** Ví dụ cột \`Gender\` (chỉ có Male/Female) hoặc \`Status\` (Active/Inactive). Index trên các cột này gần như vô dụng vì DB vẫn phải quét một nửa số lượng dòng.
- **Bảng quá nhỏ:** Quét toàn bảng đôi khi còn nhanh hơn đọc Index rồi mới đọc bảng.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Database+Indexing+B-Tree'
  },
  {
    id: 'sql-4', category: 'SQL', difficulty: 'Medium',
    tags: ['SQL', 'Transactions'],
    question: 'Thuộc tính ACID trong Database là gì?',
    answer: `
**ACID** là tập hợp 4 thuộc tính đảm bảo các giao dịch (Transactions) trong Database được thực hiện một cách an toàn và đáng tin cậy.

### 1. Atomicity (Tính nguyên tử)
- **"All or nothing" (Tất cả hoặc không gì cả).**
- Một transaction có thể gồm nhiều câu lệnh (VD: Trừ tiền tài khoản A, Cộng tiền tài khoản B). Nếu một câu lệnh thất bại, TOÀN BỘ transaction sẽ bị hủy bỏ (Rollback). Không bao giờ có chuyện A bị trừ tiền mà B chưa được cộng.

### 2. Consistency (Tính nhất quán)
- Dữ liệu phải luôn hợp lệ theo các quy tắc (Constraints, Triggers, Cascades) trước và sau khi transaction diễn ra.
- Ví dụ: Cột số dư không được âm. Nếu transaction làm số dư bị âm, nó sẽ bị từ chối.

### 3. Isolation (Tính cô lập)
- Các transaction chạy song song (concurrently) không được phép ảnh hưởng lẫn nhau.
- Kết quả của việc chạy song song nhiều transaction phải giống hệt như khi chạy tuần tự từng cái một. (Được kiểm soát qua các Isolation Levels).

### 4. Durability (Tính bền vững)
- Một khi transaction đã được **Commit** thành công, dữ liệu sẽ được lưu vĩnh viễn vào ổ cứng.
- Dù ngay sau đó máy chủ bị mất điện hay crash, dữ liệu vẫn không bị mất.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=ACID+Properties+in+Database'
  },
  {
    id: 'sql-5', category: 'SQL', difficulty: 'Hard',
    tags: ['SQL', 'Performance', 'ORM'],
    question: 'Vấn đề N+1 Query là gì và cách khắc phục?',
    answer: `
### 1. Vấn đề N+1 Query là gì?
Đây là lỗi hiệu năng kinh điển khi sử dụng các ORM (như Hibernate, Entity Framework, Prisma). Nó xảy ra khi bạn thực hiện **1 câu query** để lấy danh sách N đối tượng cha, sau đó ORM tự động thực hiện thêm **N câu query** nữa để lấy thông tin đối tượng con của từng cha.

**Ví dụ:** Lấy danh sách 100 bài viết và tên tác giả của từng bài.
- Query 1: \`SELECT * FROM Posts LIMIT 100;\` (Trả về 100 bài)
- Query 2 đến 101: \`SELECT * FROM Users WHERE id = ?;\` (Chạy 100 lần cho 100 bài viết)
=> Tổng cộng mất **101 queries** thay vì 1.

### 2. Hậu quả
- Làm chậm hệ thống nghiêm trọng do tốn thời gian round-trip (network latency) giữa App và Database.
- Gây quá tải Database (quá nhiều connection và query nhỏ).

### 3. Cách khắc phục
**Cách 1: Dùng Eager Loading trong ORM**
Thay vì để ORM tự động lấy data (Lazy Loading), ta ép nó lấy luôn data con bằng \`JOIN\` hoặc \`IN\`.
- *Laravel:* \`Post::with('author')->get();\`
- *Entity Framework:* \`db.Posts.Include(p => p.Author).ToList();\`

**Cách 2: Viết SQL thuần với JOIN**
\`\`\`sql
SELECT p.*, u.name AS author_name 
FROM Posts p
JOIN Users u ON p.author_id = u.id;
\`\`\`
=> Chỉ tốn đúng **1 query** duy nhất!
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=N%2B1+Query+Problem+Explained'
  },

  // ================= API GATEWAY KONG =================
  {
    id: 'kong-1', category: 'API Gateway', difficulty: 'Easy',
    tags: ['API Gateway', 'Kong'],
    question: 'Kong API Gateway là gì?',
    answer: `
**Kong** là một API Gateway mã nguồn mở, nhẹ và cực nhanh, được xây dựng trên NGINX và OpenResty. 
Nó đóng vai trò là "cửa ngõ" duy nhất (single entry point) đứng trước các microservices để xử lý routing, bảo mật, và traffic control.
    `
  },
  {
    id: 'kong-2', category: 'API Gateway', difficulty: 'Easy',
    tags: ['API Gateway', 'Nginx'],
    question: 'Tại sao dùng Kong thay vì Nginx thuần?',
    answer: `
Dù Kong chạy trên Nginx, nhưng Kong cung cấp:
1. **Admin API:** Cho phép cấu hình dynamic (thêm route, service) mà không cần reload lại Nginx.
2. **Hệ sinh thái Plugin:** Có sẵn hàng trăm plugin (Auth, Rate Limit, Prometheus...) dễ dàng bật/tắt.
3. **Database-backed:** Lưu cấu hình vào Postgres/Cassandra, dễ dàng scale Kong ra nhiều node (Cluster).
    `
  },
  {
    id: 'kong-3', category: 'API Gateway', difficulty: 'Medium',
    tags: ['Kong', 'Rate Limiting'],
    question: 'Plugin Rate Limiting trong Kong hoạt động như thế nào?',
    answer: `
Rate Limiting giới hạn số lượng request từ một client (dựa trên IP hoặc Consumer ID) trong một khoảng thời gian (giây, phút, giờ).
- Giúp chống DDoS và Brute-force.
- Kong có thể lưu counter ở bộ nhớ local (nhanh nhưng không đồng bộ giữa các Kong node) hoặc dùng **Redis** để đồng bộ counter trên toàn bộ Kong Cluster.
    `
  },
  {
    id: 'kong-4', category: 'API Gateway', difficulty: 'Medium',
    tags: ['Kong', 'Security'],
    question: 'Làm sao để xác thực (Authentication) request bằng Kong?',
    answer: `
Kong hỗ trợ nhiều plugin xác thực đứng trước backend service:
1. **Key Authentication:** Client gửi API Key trong Header/Query.
2. **JWT:** Kong verify chữ ký của JWT token, nếu hợp lệ mới pass request xuống backend.
3. **OAuth 2.0 / OIDC:** Tích hợp với Identity Provider (Keycloak, Okta).
*Lợi ích:* Backend service không cần tự viết code xử lý Auth nữa.
    `
  },
  {
    id: 'kong-5', category: 'API Gateway', difficulty: 'Hard',
    tags: ['Kong', 'Plugins', 'Lua'],
    question: 'Làm thế nào để viết một Custom Plugin cho Kong?',
    answer: `
Kong plugin thường được viết bằng **Lua** (chạy trên OpenResty).
Một plugin sẽ can thiệp vào vòng đời của request qua các phase:
1. \`init_worker\`: Chạy khi Nginx worker khởi động.
2. \`certificate\`: Xử lý SSL/TLS.
3. \`rewrite\` & \`access\`: Chạy trước khi request đến backend (thường dùng để check Auth, Rate limit).
4. \`header_filter\` & \`body_filter\`: Chạy khi nhận response từ backend (dùng để sửa response).
5. \`log\`: Ghi log sau khi hoàn tất.
    `
  },

  // ================= SERVICE MESH =================
  {
    id: 'sm-1', category: 'Service Mesh', difficulty: 'Easy',
    tags: ['Service Mesh', 'Architecture'],
    question: 'Service Mesh là gì?',
    answer: `
**Service Mesh** là một lớp hạ tầng chuyên dụng để quản lý giao tiếp nội bộ (service-to-service) trong kiến trúc Microservices. 
Nó tách biệt logic mạng (routing, retry, security) ra khỏi code ứng dụng. Các công cụ phổ biến: Istio, Linkerd.
    `
  },
  {
    id: 'sm-2', category: 'Service Mesh', difficulty: 'Medium',
    tags: ['Service Mesh', 'Sidecar'],
    question: 'Sidecar Pattern trong Service Mesh là gì?',
    answer: `
Trong Service Mesh, một proxy (thường là Envoy) được deploy song song cùng với mỗi service instance trong cùng một Pod (gọi là **Sidecar**).
Tất cả traffic đi vào hoặc đi ra khỏi service đều bị Sidecar chặn lại và xử lý. Nhờ đó, service không cần biết về network logic, chỉ cần gọi \`localhost\`.
    `
  },
  {
    id: 'sm-3', category: 'Service Mesh', difficulty: 'Medium',
    tags: ['Service Mesh', 'Traffic Management'],
    question: 'Service Mesh hỗ trợ Traffic Management như thế nào?',
    answer: `
Service Mesh cho phép điều khiển luồng traffic cực kỳ chi tiết (Layer 7):
- **Canary Release:** Đẩy 10% traffic sang version mới (v2), 90% ở lại version cũ (v1).
- **Fault Injection:** Cố tình tạo ra lỗi (delay, HTTP 500) để test độ bền bỉ của hệ thống (Chaos Engineering).
- **Circuit Breaking & Retries:** Tự động retry khi lỗi mạng, hoặc ngắt kết nối (circuit breaker) nếu service đích đang quá tải.
    `
  },
  {
    id: 'sm-4', category: 'Service Mesh', difficulty: 'Medium',
    tags: ['Service Mesh', 'Security', 'mTLS'],
    question: 'mTLS trong Service Mesh có tác dụng gì?',
    answer: `
**mTLS (Mutual TLS)** là xác thực TLS hai chiều. 
Trong Service Mesh, các Sidecar proxy tự động mã hóa toàn bộ traffic giữa các service với nhau và xác thực danh tính của nhau bằng certificates do Control Plane cấp phát.
Giúp ngăn chặn tấn công Man-in-the-Middle trong mạng nội bộ (Zero Trust Network).
    `
  },
  {
    id: 'sm-5', category: 'Service Mesh', difficulty: 'Hard',
    tags: ['Istio', 'Architecture'],
    question: 'Kiến trúc của Istio gồm những thành phần nào?',
    answer: `
Istio chia làm 2 phần chính:
1. **Data Plane:** Gồm các Envoy proxies (Sidecars) nằm cạnh các services, trực tiếp xử lý data traffic.
2. **Control Plane (Istiod):** Bộ não quản lý Data Plane.
   - *Pilot:* Cấu hình routing cho Envoy.
   - *Citadel:* Quản lý chứng chỉ (Certificates) cho mTLS.
   - *Galley:* Validate cấu hình K8s YAML.
    `
  },

  // ================= JAVA SPRING BOOT =================
  {
    id: 'spring-1', category: 'Spring Boot', difficulty: 'Easy',
    tags: ['Spring Boot', 'MVC'],
    question: 'Sự khác biệt giữa @Controller và @RestController?',
    answer: `
- **@Controller:** Dùng trong Spring MVC truyền thống. Trả về tên của một View (như file HTML/JSP) để render giao diện.
- **@RestController:** Là sự kết hợp của \`@Controller\` và \`@ResponseBody\`. Nó không trả về View mà tự động chuyển đổi object trả về thành JSON/XML và ghi thẳng vào HTTP Response. Dùng để viết RESTful APIs.
    `
  },
  {
    id: 'spring-2', category: 'Spring Boot', difficulty: 'Easy',
    tags: ['Spring Boot', 'Beans'],
    question: 'Singleton và Prototype Bean Scope khác nhau thế nào?',
    answer: `
- **Singleton (Mặc định):** Spring Container chỉ tạo **một instance duy nhất** của Bean đó cho toàn bộ ứng dụng. Mọi request xin Bean đều nhận được cùng một object.
- **Prototype:** Mỗi lần request xin Bean, Spring Container sẽ tạo ra một **instance hoàn toàn mới**.
    `
  },
  {
    id: 'spring-3', category: 'Spring Boot', difficulty: 'Medium',
    tags: ['Spring Boot', 'IoC', 'DI'],
    question: 'Giải thích IoC và DI trong Spring.',
    answer: `
- **IoC (Inversion of Control):** Đảo ngược điều khiển. Thay vì code tự \`new\` object, Spring Container sẽ quản lý vòng đời và khởi tạo object (Beans).
- **DI (Dependency Injection):** Cách implement IoC. Spring sẽ "tiêm" các object phụ thuộc vào class cần nó (thường qua Constructor Injection). Giúp giảm sự phụ thuộc cứng (loose coupling) và dễ viết Unit Test.
    `
  },
  {
    id: 'spring-4', category: 'Spring Boot', difficulty: 'Medium',
    tags: ['Spring Boot', 'Transactions'],
    question: 'Annotation @Transactional hoạt động như thế nào?',
    answer: `
\`@Transactional\` dùng để quản lý database transaction.
Spring sử dụng **AOP (Aspect-Oriented Programming)** để tạo một Proxy bọc ngoài method. 
- Khi method bắt đầu, Proxy mở transaction.
- Nếu method chạy thành công, Proxy gọi \`commit()\`.
- Nếu có **Unchecked Exception (RuntimeException)** văng ra, Proxy tự động gọi \`rollback()\`. (Lưu ý: Checked Exception mặc định sẽ không rollback trừ khi cấu hình \`rollbackFor\`).
    `
  },
  {
    id: 'spring-5', category: 'Spring Boot', difficulty: 'Hard',
    tags: ['Spring Security', 'Architecture'],
    question: 'Luồng hoạt động của Spring Security (Filter Chain)?',
    answer: `
Spring Security hoạt động dựa trên một chuỗi các **Servlet Filters** (SecurityFilterChain).
1. Request đi qua \`DelegatingFilterProxy\` để vào chuỗi filter của Spring Security.
2. \`AuthenticationFilter\` (VD: UsernamePasswordAuthenticationFilter) chặn request để lấy thông tin đăng nhập.
3. Giao cho \`AuthenticationManager\` -> \`AuthenticationProvider\` -> \`UserDetailsService\` để query DB kiểm tra user/pass.
4. Nếu đúng, lưu thông tin user vào \`SecurityContextHolder\`.
5. \`FilterSecurityInterceptor\` kiểm tra quyền (Authorization) xem user có được phép truy cập URL đó không.
    `
  },

  // ================= PYTHON =================
  {
    id: 'py-1', category: 'Python', difficulty: 'Easy',
    tags: ['Python', 'Data Types'],
    question: 'Phân biệt Mutable và Immutable types trong Python?',
    answer: `
- **Mutable (Có thể thay đổi):** Giá trị có thể bị thay đổi sau khi khởi tạo mà không làm đổi địa chỉ bộ nhớ (ID). Ví dụ: \`list\`, \`dict\`, \`set\`.
- **Immutable (Không thể thay đổi):** Giá trị không thể thay đổi. Nếu cố gắng gán giá trị mới, Python sẽ tạo ra một object mới ở địa chỉ bộ nhớ khác. Ví dụ: \`int\`, \`float\`, \`string\`, \`tuple\`.
    `
  },
  {
    id: 'py-2', category: 'Python', difficulty: 'Easy',
    tags: ['Python', 'Syntax'],
    question: 'List Comprehension là gì? Cho ví dụ.',
    answer: `
List Comprehension là cú pháp ngắn gọn để tạo ra một list mới dựa trên một iterable có sẵn. Nó thường nhanh hơn vòng lặp for truyền thống.
*Ví dụ tạo list các số chẵn bình phương:*
\`\`\`python
# Cách cũ
evens = []
for i in range(10):
    if i % 2 == 0:
        evens.append(i**2)

# List Comprehension
evens = [i**2 for i in range(10) if i % 2 == 0]
\`\`\`
    `
  },
  {
    id: 'py-3', category: 'Python', difficulty: 'Medium',
    tags: ['Python', 'Functions'],
    question: 'Decorator trong Python là gì?',
    answer: `
**Decorator** là một function nhận đầu vào là một function khác, thêm tính năng mới cho nó và trả về một function mới mà không làm thay đổi code của function gốc.
Thường dùng ký hiệu \`@\` đặt trên đầu hàm.
Ứng dụng phổ biến: Đo thời gian chạy hàm, kiểm tra quyền đăng nhập, caching.
    `
  },
  {
    id: 'py-4', category: 'Python', difficulty: 'Medium',
    tags: ['Python', 'Context Managers'],
    question: 'Từ khóa "with" (Context Manager) dùng để làm gì?',
    answer: `
Từ khóa \`with\` được dùng để quản lý tài nguyên (như mở file, kết nối DB, lock thread). 
Nó đảm bảo tài nguyên sẽ **luôn được giải phóng/đóng lại** một cách an toàn sau khi khối lệnh thực thi xong, ngay cả khi có Exception xảy ra.
\`\`\`python
with open('file.txt', 'r') as f:
    data = f.read()
# File tự động đóng tại đây, không cần gọi f.close()
\`\`\`
    `
  },
  {
    id: 'py-5', category: 'Python', difficulty: 'Hard',
    tags: ['Python', 'Concurrency', 'GIL'],
    question: 'GIL (Global Interpreter Lock) là gì và ảnh hưởng thế nào?',
    answer: `
**GIL** là một khóa (mutex) trong CPython đảm bảo chỉ có **1 thread duy nhất** được thực thi Python bytecode tại một thời điểm (để an toàn bộ nhớ).
- *Hệ quả:* Multi-threading trong Python KHÔNG giúp tăng tốc các tác vụ nặng về CPU (CPU-bound) trên máy nhiều core.
- *Giải pháp:* Dùng module \`multiprocessing\` (tạo nhiều process độc lập, mỗi process có GIL riêng) hoặc viết code C extension.
    `
  },

  // ================= REACT & FRONTEND =================
  {
    id: 'react-1', category: 'Frontend', difficulty: 'Easy',
    tags: ['React', 'Core Concepts'],
    question: 'Sự khác biệt giữa State và Props?',
    answer: `
- **Props (Properties):** Dữ liệu được truyền từ component Cha xuống component Con. Props là **read-only** (không thể bị thay đổi bởi component nhận nó).
- **State:** Dữ liệu nội bộ được quản lý bên trong một component. State có thể thay đổi (thông qua \`setState\` hoặc \`useState\`) và khi State đổi, component sẽ re-render.
    `
  },
  {
    id: 'react-2', category: 'Frontend', difficulty: 'Easy',
    tags: ['React', 'Lists'],
    question: 'Tại sao cần dùng thuộc tính "key" khi render danh sách trong React?',
    answer: `
\`key\` giúp React định danh duy nhất các phần tử trong danh sách. 
Khi danh sách bị thay đổi (thêm, xóa, sắp xếp), React dùng \`key\` để so sánh Virtual DOM và biết chính xác phần tử nào bị thay đổi để cập nhật Real DOM một cách tối ưu nhất.
*Lưu ý: Không nên dùng \`index\` làm key nếu danh sách có thể bị thay đổi thứ tự.*
    `
  },
  {
    id: 'react-3', category: 'Frontend', difficulty: 'Medium',
    tags: ['React', 'Virtual DOM'],
    question: 'Virtual DOM là gì? Tại sao nó làm React nhanh?',
    answer: `
**Virtual DOM** là bản sao nhẹ của Real DOM lưu trong bộ nhớ JS.
Khi State đổi, React tạo Virtual DOM mới, so sánh (Diffing) với Virtual DOM cũ để tìm ra chính xác những node thay đổi. Sau đó, React gom các thay đổi này lại và cập nhật lên Real DOM thật cùng một lúc (Reconciliation).
Giúp giảm thiểu tối đa các thao tác đắt đỏ lên Real DOM.
    `
  },
  {
    id: 'react-4', category: 'Frontend', difficulty: 'Medium',
    tags: ['React', 'Hooks'],
    question: 'Giải thích Dependency Array trong useEffect.',
    answer: `
- \`useEffect(fn)\`: Chạy sau MỌI lần render.
- \`useEffect(fn, [])\`: Chỉ chạy 1 lần duy nhất sau lần render đầu tiên (giống \`componentDidMount\`).
- \`useEffect(fn, [a, b])\`: Chỉ chạy lại khi giá trị của \`a\` hoặc \`b\` thay đổi.
- *Cleanup function:* Hàm \`return\` bên trong effect dùng để dọn dẹp (clear timeout, remove event listener) trước khi component unmount hoặc trước khi effect chạy lại.
    `
  },
  {
    id: 'react-5', category: 'Frontend', difficulty: 'Hard',
    tags: ['React', 'Rendering'],
    question: 'So sánh CSR (Client-Side Rendering) và SSR (Server-Side Rendering)?',
    answer: `
- **CSR (React thuần):** Server trả về file HTML rỗng và file JS lớn. Trình duyệt tải JS, chạy React rồi mới vẽ UI. *Nhược điểm:* SEO kém, First Contentful Paint (FCP) chậm.
- **SSR (Next.js):** Server chạy React, render sẵn ra HTML đầy đủ rồi gửi về trình duyệt. Trình duyệt hiển thị UI ngay lập tức, sau đó tải JS để gắn event (Hydration). *Ưu điểm:* SEO cực tốt, load trang đầu nhanh.
    `
  },

  // ================= DOCKER & KUBERNETES =================
  {
    id: 'dk-1', category: 'Docker & K8s', difficulty: 'Easy',
    tags: ['Docker', 'Virtualization'],
    question: 'Sự khác biệt giữa Docker Container và Virtual Machine (VM)?',
    answer: `
- **VM:** Ảo hóa ở tầng phần cứng. Mỗi VM chạy một hệ điều hành (Guest OS) riêng biệt. Nặng, tốn RAM/CPU, khởi động chậm.
- **Docker:** Ảo hóa ở tầng hệ điều hành. Các container dùng chung Kernel của máy Host. Cực kỳ nhẹ, khởi động tính bằng mili-giây, tốn ít tài nguyên.
    `
  },
  {
    id: 'dk-2', category: 'Docker & K8s', difficulty: 'Easy',
    tags: ['Kubernetes', 'Pod'],
    question: 'Pod trong Kubernetes là gì?',
    answer: `
**Pod** là đơn vị nhỏ nhất có thể deploy trong K8s.
Một Pod chứa 1 hoặc nhiều Container. Các container trong cùng 1 Pod chia sẻ chung Network (cùng IP, gọi nhau qua localhost) và Storage Volumes. Thường thiết kế 1 Pod = 1 Container.
    `
  },
  {
    id: 'dk-3', category: 'Docker & K8s', difficulty: 'Medium',
    tags: ['Docker', 'Storage'],
    question: 'Docker Volumes dùng để làm gì?',
    answer: `
Container mang tính chất "tạm thời" (ephemeral). Khi container bị xóa, mọi dữ liệu sinh ra bên trong nó cũng mất.
**Volumes** là cơ chế mount một thư mục từ máy Host vào Container. Giúp lưu trữ dữ liệu bền vững (Persistent Data) như Database files, logs, ngay cả khi container bị xóa hay tạo lại.
    `
  },
  {
    id: 'dk-4', category: 'Docker & K8s', difficulty: 'Medium',
    tags: ['Kubernetes', 'Networking'],
    question: 'Phân biệt ClusterIP, NodePort và LoadBalancer trong K8s Services?',
    answer: `
Service giúp expose Pods ra mạng:
- **ClusterIP (Mặc định):** Chỉ cho phép các Pods bên TRONG cluster gọi nhau. Không thể truy cập từ ngoài.
- **NodePort:** Mở một Port tĩnh trên mọi Node của Cluster. Truy cập từ ngoài qua \`NodeIP:NodePort\`.
- **LoadBalancer:** Tích hợp với Cloud Provider (AWS, GCP) để cấp một IP Public (External Load Balancer) trỏ vào các Node.
    `
  },
  {
    id: 'dk-5', category: 'Docker & K8s', difficulty: 'Hard',
    tags: ['Kubernetes', 'Workloads'],
    question: 'Sự khác nhau giữa Deployment và StatefulSet?',
    answer: `
- **Deployment:** Dùng cho ứng dụng Stateless (như Web Server). Các Pods giống hệt nhau, có thể thay thế cho nhau, tên Pod sinh ngẫu nhiên.
- **StatefulSet:** Dùng cho ứng dụng Stateful (như Database, Kafka). Đảm bảo thứ tự khởi tạo, mỗi Pod có một định danh cố định (ví dụ: \`db-0\`, \`db-1\`) và gắn chặt với một Volume cố định (PersistentVolumeClaim). Nếu Pod chết, Pod mới sinh ra vẫn giữ nguyên tên và gắn lại đúng Volume cũ.
    `
  },

  // ================= MESSAGE QUEUES =================
  {
    id: 'mq-1', category: 'Message Queues', difficulty: 'Easy',
    tags: ['Message Queue', 'Concepts'],
    question: 'Message Queue là gì? Tại sao lại cần nó?',
    answer: `
**Message Queue (MQ)** là hệ thống trung gian giúp các services giao tiếp bất đồng bộ (asynchronous) bằng cách gửi/nhận tin nhắn.
- *Lợi ích:* Giảm sự phụ thuộc (Decoupling), tăng khả năng chịu tải (Buffering/Spike smoothing), và đảm bảo không mất dữ liệu nếu service nhận đang bị sập.
    `
  },
  {
    id: 'mq-2', category: 'Message Queues', difficulty: 'Easy',
    tags: ['Message Queue', 'Patterns'],
    question: 'Phân biệt Point-to-Point và Pub/Sub model?',
    answer: `
- **Point-to-Point (Queue):** Một message gửi vào Queue chỉ được tiêu thụ bởi **MỘT** consumer duy nhất. Xử lý xong message sẽ bị xóa.
- **Publish/Subscribe (Topic):** Một message gửi vào Topic sẽ được broadcast (phát) tới **TẤT CẢ** các subscribers đang lắng nghe Topic đó.
    `
  },
  {
    id: 'mq-3', category: 'Message Queues', difficulty: 'Medium',
    tags: ['RabbitMQ', 'Exchanges'],
    question: 'Các loại Exchange trong RabbitMQ?',
    answer: `
Exchange nhận message từ Producer và định tuyến vào Queue:
1. **Direct:** Gửi vào Queue có \`routing_key\` khớp chính xác.
2. **Topic:** Gửi vào Queue có \`routing_key\` khớp theo pattern (dùng \`*\` hoặc \`#\`).
3. **Fanout:** Broadcast message tới TẤT CẢ các Queue đang bind với Exchange, bỏ qua routing_key.
    `
  },
  {
    id: 'mq-4', category: 'Message Queues', difficulty: 'Hard',
    tags: ['Kafka', 'Architecture'],
    question: 'Kiến trúc của Kafka (Topic, Partition, Offset) hoạt động ra sao?',
    answer: `
- **Topic:** Nơi chứa message (như một thư mục log).
- **Partition:** Một Topic chia thành nhiều Partition để scale. Message ghi vào Partition theo thứ tự (append-only).
- **Offset:** Số thứ tự định danh duy nhất của message trong Partition. Consumer dùng Offset để biết mình đã đọc đến đâu. Kafka không xóa message ngay khi đọc, mà giữ lại trên disk theo thời gian cấu hình.
    `
  },
  {
    id: 'mq-5', category: 'Message Queues', difficulty: 'Hard',
    tags: ['Kafka', 'RabbitMQ'],
    question: 'So sánh Apache Kafka và RabbitMQ?',
    answer: `
- **RabbitMQ (Smart Broker):** Broker tự push message cho consumer, hỗ trợ routing phức tạp, xóa message sau khi xử lý (ACK). Phù hợp task queue, gửi email.
- **Kafka (Dumb Broker):** Consumer tự pull message dựa trên offset. Lưu trữ message bền vững trên disk (có thể replay). Thông lượng (throughput) cực kỳ khủng khiếp. Phù hợp Event Sourcing, Log Aggregation, Big Data stream.
    `
  }
];
