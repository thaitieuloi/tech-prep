import { Question } from './data';

export const questions2: Question[] = [
  // ================= SYSTEM DESIGN (6-10) =================
  {
    id: 'sd-6', category: 'System Design', difficulty: 'Hard',
    tags: ['System Design', 'Hashing', 'Load Balancing'],
    question: 'Consistent Hashing là gì và giải quyết vấn đề gì?',
    answer: `
**Consistent Hashing** là một thuật toán phân tán dữ liệu trên nhiều server.
- **Vấn đề:** Khi dùng hash thông thường (\`hash(key) % N\`), nếu thêm hoặc bớt 1 server (N thay đổi), hầu hết các key sẽ bị đổi vị trí, dẫn đến cache miss hàng loạt.
- **Giải pháp:** Consistent Hashing đặt các server và key lên một "vòng tròn ảo" (hash ring). Mỗi key sẽ được gán cho server đầu tiên nó gặp khi đi theo chiều kim đồng hồ. Khi thêm/bớt server, chỉ có một lượng nhỏ key (thuộc server lân cận) bị ảnh hưởng, giúp hệ thống ổn định.
    `
  },
  {
    id: 'sd-7', category: 'System Design', difficulty: 'Medium',
    tags: ['System Design', 'Rate Limiting'],
    question: 'Kể tên các thuật toán Rate Limiting phổ biến?',
    answer: `
1. **Token Bucket:** Có một "xô" chứa tối đa N tokens. Mỗi giây thêm r tokens. Mỗi request lấy 1 token. Hết token thì reject. Cho phép burst traffic.
2. **Leaky Bucket:** Request vào hàng đợi (xô). Xô rỉ nước (xử lý request) với tốc độ cố định. Đầy xô thì tràn (reject). Tốc độ xử lý luôn đều đặn.
3. **Fixed Window Counter:** Đếm số request trong mỗi khung giờ cố định (ví dụ 1:00 - 1:01). Nhược điểm: Bị dồn traffic ở mép thời gian (edge of window).
4. **Sliding Window Log / Counter:** Khắc phục nhược điểm của Fixed Window bằng cách trượt khung thời gian liên tục.
    `
  },
  {
    id: 'sd-8', category: 'System Design', difficulty: 'Easy',
    tags: ['Database', 'SQL', 'NoSQL'],
    question: 'Khi nào nên chọn SQL và khi nào chọn NoSQL?',
    answer: `
**Chọn SQL (Relational DB):**
- Dữ liệu có cấu trúc rõ ràng, quan hệ phức tạp.
- Yêu cầu tính toàn vẹn dữ liệu cao (ACID transactions), ví dụ: hệ thống tài chính, ngân hàng.
- Cần thực hiện các câu query JOIN phức tạp.

**Chọn NoSQL (Non-relational DB):**
- Dữ liệu phi cấu trúc hoặc thay đổi schema liên tục.
- Cần scale ngang (horizontal scaling) dễ dàng để xử lý lượng dữ liệu khổng lồ.
- Yêu cầu tốc độ Read/Write cực nhanh, chấp nhận Eventual Consistency (ví dụ: Log, Social Media feed, IoT data).
    `
  },
  {
    id: 'sd-9', category: 'System Design', difficulty: 'Medium',
    tags: ['System Design', 'Caching'],
    question: 'Các chiến lược Caching (Cache Aside, Write Through, Write Behind) khác nhau thế nào?',
    answer: `
1. **Cache Aside (Lazy Loading):** Ứng dụng kiểm tra Cache trước. Nếu miss, đọc từ DB, lưu vào Cache rồi trả về. *Ưu điểm:* Chỉ cache data cần thiết. *Nhược điểm:* Lần đọc đầu tiên bị chậm.
2. **Write Through:** Khi ghi data, ứng dụng ghi vào Cache VÀ ghi vào DB cùng lúc. *Ưu điểm:* Data trong cache luôn mới nhất. *Nhược điểm:* Thao tác ghi bị chậm vì phải ghi 2 nơi.
3. **Write Behind (Write Back):** Ứng dụng chỉ ghi vào Cache và trả về ngay. Một process chạy ngầm sẽ đồng bộ từ Cache xuống DB sau. *Ưu điểm:* Ghi cực nhanh. *Nhược điểm:* Nguy cơ mất data nếu Cache sập trước khi đồng bộ.
    `
  },
  {
    id: 'sd-10', category: 'System Design', difficulty: 'Medium',
    tags: ['System Design', 'Message Queue'],
    question: 'Tại sao lại cần sử dụng Message Queue trong System Design?',
    answer: `
Message Queue (như Kafka, RabbitMQ) mang lại 3 lợi ích cốt lõi trong thiết kế hệ thống:
1. **Decoupling (Giảm phụ thuộc):** Các service không cần gọi trực tiếp lẫn nhau. Service A chỉ việc ném message vào Queue, Service B tự lấy ra xử lý.
2. **Asynchronous Processing (Xử lý bất đồng bộ):** Trả phản hồi ngay lập tức cho user trong khi các task nặng (gửi email, xử lý ảnh) được đẩy vào Queue để làm nền.
3. **Traffic Buffering (Giảm xóc):** Khi có lượng traffic tăng đột biến (Spike), Queue đóng vai trò như một bộ đệm chứa request, giúp các service backend không bị quá tải và sập.
    `
  },

  // ================= SQL (6-10) =================
  {
    id: 'sql-6', category: 'SQL', difficulty: 'Medium',
    tags: ['SQL', 'Database Design'],
    question: 'Chuẩn hóa dữ liệu (Normalization) là gì? Kể tên 3 dạng chuẩn đầu tiên (1NF, 2NF, 3NF).',
    answer: `
**Chuẩn hóa** là quá trình tổ chức lại database để giảm thiểu dư thừa dữ liệu (redundancy) và tránh các dị thường khi thêm/sửa/xóa.
- **1NF (Dạng chuẩn 1):** Mỗi ô trong bảng chỉ chứa 1 giá trị duy nhất (atomic). Không có cột chứa mảng hoặc danh sách.
- **2NF (Dạng chuẩn 2):** Đạt 1NF VÀ không có thuộc tính nào phụ thuộc vào một phần của khóa chính (chỉ áp dụng nếu khóa chính gồm nhiều cột).
- **3NF (Dạng chuẩn 3):** Đạt 2NF VÀ không có thuộc tính bắc cầu. (Các cột non-key không được phụ thuộc vào một cột non-key khác).
    `
  },
  {
    id: 'sql-7', category: 'SQL', difficulty: 'Medium',
    tags: ['SQL', 'Programming'],
    question: 'Sự khác biệt giữa Stored Procedure và Function trong SQL?',
    answer: `
1. **Giá trị trả về:** Function BẮT BUỘC phải trả về một giá trị (hoặc bảng). Stored Procedure có thể trả về 0, 1 hoặc nhiều giá trị (qua tham số OUT).
2. **Cách gọi:** Function có thể được gọi bên trong câu lệnh \`SELECT\`, \`WHERE\`, \`HAVING\`. Stored Procedure phải được gọi bằng lệnh \`EXEC\` hoặc \`CALL\`.
3. **Thao tác DML:** Function KHÔNG được phép thay đổi trạng thái database (không dùng \`INSERT\`, \`UPDATE\`, \`DELETE\`). Stored Procedure thì được phép.
    `
  },
  {
    id: 'sql-8', category: 'SQL', difficulty: 'Hard',
    tags: ['SQL', 'Views'],
    question: 'View và Materialized View khác nhau như thế nào?',
    answer: `
- **View (Khung nhìn ảo):** Chỉ là một câu lệnh SQL được lưu lại. Mỗi khi bạn \`SELECT\` từ View, database sẽ chạy lại câu lệnh SQL gốc. Không tốn dung lượng lưu trữ data, data luôn mới nhất, nhưng query có thể chậm.
- **Materialized View:** Lưu trữ cả câu lệnh SQL VÀ kết quả của nó xuống ổ cứng như một bảng thật. 
  - *Ưu điểm:* Query cực nhanh (vì data đã tính sẵn).
  - *Nhược điểm:* Tốn dung lượng, data có thể bị cũ (stale) và cần phải được làm mới (Refresh) định kỳ hoặc trigger.
    `
  },
  {
    id: 'sql-9', category: 'SQL', difficulty: 'Hard',
    tags: ['SQL', 'Transactions', 'Locks'],
    question: 'Deadlock trong Database là gì và cách phòng tránh?',
    answer: `
### 1. Deadlock là gì?
**Deadlock (Khóa chéo)** xảy ra khi hai hoặc nhiều Transactions đang giữ các Lock (khóa) trên một số tài nguyên, và mỗi Transaction lại đang chờ để lấy Lock trên tài nguyên mà Transaction kia đang giữ. Kết quả là cả hai chờ nhau mãi mãi.

### 2. Ví dụ cụ thể về vấn đề Deadlock
**Vấn đề:** Giả sử có 2 bảng \`Orders\` và \`Inventory\`.
- **Transaction A:** 
  1. Cập nhật \`Orders\` (Lấy Lock trên Orders).
  2. Cập nhật \`Inventory\` (Chờ Lock trên Inventory).
- **Transaction B:** 
  1. Cập nhật \`Inventory\` (Lấy Lock trên Inventory).
  2. Cập nhật \`Orders\` (Chờ Lock trên Orders).

Nếu A và B chạy gần như cùng lúc, A sẽ giữ khóa \`Orders\` và chờ \`Inventory\`, trong khi B giữ khóa \`Inventory\` và chờ \`Orders\`. Cả hai bị kẹt (Deadlock). Database Engine thường sẽ phát hiện ra điều này và tự động "kill" (rollback) một trong hai transaction để giải phóng khóa.

### 3. Cách Fix và Phòng tránh Deadlock
1. **Truy cập tài nguyên theo cùng một thứ tự:** Đây là cách hiệu quả nhất. Nếu cả Transaction A và B đều thống nhất luôn cập nhật \`Orders\` trước rồi mới đến \`Inventory\`, deadlock sẽ không bao giờ xảy ra.
2. **Giữ transaction càng ngắn càng tốt:** Xử lý logic tính toán ở Application code trước, sau đó mới mở Transaction để thực hiện các lệnh DB (UPDATE/INSERT) thật nhanh rồi COMMIT.
3. **Thêm Index phù hợp:** Nếu câu lệnh UPDATE/DELETE không có Index, DB có thể phải thực hiện Table Scan và khóa toàn bộ bảng (Table Lock) thay vì khóa từng dòng (Row Lock), làm tăng nguy cơ deadlock.
4. **Sử dụng mức độ cô lập (Isolation Level) thấp hơn:** Ví dụ dùng \`READ COMMITTED\` thay vì \`SERIALIZABLE\` nếu logic nghiệp vụ cho phép.
    `
  },
  {
    id: 'sql-10', category: 'SQL', difficulty: 'Hard',
    tags: ['SQL', 'Advanced'],
    question: 'Window Functions trong SQL là gì? Cho ví dụ.',
    answer: `
**Window Functions** thực hiện tính toán trên một tập hợp các dòng liên quan đến dòng hiện tại, nhưng KHÔNG gộp các dòng lại thành 1 dòng như \`GROUP BY\`.
*Ví dụ:* Tính tổng doanh thu cộng dồn hoặc xếp hạng nhân viên.
\`\`\`sql
SELECT 
  EmployeeName, 
  Department, 
  Salary,
  RANK() OVER (PARTITION BY Department ORDER BY Salary DESC) as RankInDept
FROM Employees;
\`\`\`
Hàm trên sẽ xếp hạng lương của nhân viên trong từng phòng ban, nhưng vẫn giữ nguyên danh sách chi tiết các nhân viên.
    `
  },

  // ================= API GATEWAY KONG (6-10) =================
  {
    id: 'kong-6', category: 'API Gateway', difficulty: 'Medium',
    tags: ['Kong', 'Kubernetes'],
    question: 'Kong Ingress Controller là gì?',
    answer: `
Trong môi trường Kubernetes, **Kong Ingress Controller** đóng vai trò là một Ingress (quản lý traffic từ ngoài vào K8s cluster).
Thay vì cấu hình Kong qua Admin API thủ công, bạn định nghĩa các rules (Route, Plugin) bằng các file YAML (Kubernetes CRDs). Kong Ingress Controller sẽ tự động đọc các file YAML này và dịch chúng thành cấu hình cho Kong Gateway chạy bên dưới.
    `
  },
  {
    id: 'kong-7', category: 'API Gateway', difficulty: 'Easy',
    tags: ['Kong', 'Concepts'],
    question: 'Khái niệm Consumer trong Kong là gì?',
    answer: `
**Consumer** trong Kong đại diện cho một người dùng hoặc một ứng dụng client đang tiêu thụ (consume) API của bạn.
Bằng cách tạo Consumer, bạn có thể:
1. Gắn thông tin xác thực (Credentials) như API Key, JWT cho họ.
2. Áp dụng các Plugin cụ thể cho từng Consumer (ví dụ: User A được gọi 100 req/phút, User B được gọi 1000 req/phút).
    `
  },
  {
    id: 'kong-8', category: 'API Gateway', difficulty: 'Medium',
    tags: ['Kong', 'Load Balancing'],
    question: 'Upstream và Target trong Kong khác nhau thế nào?',
    answer: `
Đây là 2 khái niệm dùng để Load Balancing trong Kong:
- **Upstream:** Là một đối tượng ảo đại diện cho một backend service (ví dụ: \`my-backend-service\`).
- **Target:** Là các địa chỉ IP/Port thực tế của các instances đang chạy service đó (ví dụ: \`192.168.1.1:8080\`, \`192.168.1.2:8080\`).
Kong sẽ phân phối traffic từ Upstream xuống các Targets bên trong nó theo thuật toán (Round Robin, Consistent Hashing) và tự động loại bỏ Target nếu nó bị chết (Health Check).
    `
  },
  {
    id: 'kong-9', category: 'API Gateway', difficulty: 'Medium',
    tags: ['Kong', 'Architecture'],
    question: 'Kong DB-less mode (Declarative Configuration) là gì?',
    answer: `
Mặc định, Kong lưu cấu hình vào database (PostgreSQL/Cassandra).
Trong **DB-less mode**, Kong chạy mà KHÔNG cần database. Toàn bộ cấu hình (Routes, Services, Plugins) được định nghĩa trong một file YAML/JSON duy nhất (\`kong.yml\`) và nạp vào bộ nhớ (RAM) của Kong khi khởi động.
*Ưu điểm:* Dễ dàng quản lý cấu hình bằng Git (GitOps), khởi động nhanh, giảm chi phí vận hành database.
    `
  },
  {
    id: 'kong-10', category: 'API Gateway', difficulty: 'Hard',
    tags: ['API Gateway', 'Architecture'],
    question: 'Sự khác biệt giữa API Gateway (như Kong) và API Management (như Apigee)?',
    answer: `
- **API Gateway (Kong):** Tập trung vào Data Plane. Xử lý traffic thực tế, routing, rate limiting, auth với hiệu năng cực cao và độ trễ thấp.
- **API Management (Apigee, Kong Enterprise):** Bao gồm API Gateway cộng thêm Control Plane mạnh mẽ. Cung cấp Developer Portal (nơi dev vào lấy API key, đọc docs), API Monetization (tính tiền theo API call), Analytics Dashboard chi tiết và quản lý vòng đời API (Lifecycle management).
    `
  },

  // ================= SERVICE MESH (6-10) =================
  {
    id: 'sm-6', category: 'Service Mesh', difficulty: 'Medium',
    tags: ['Service Mesh', 'Envoy'],
    question: 'Envoy Proxy là gì và tại sao nó phổ biến trong Service Mesh?',
    answer: `
**Envoy** là một L7 proxy mã nguồn mở (viết bằng C++) được phát triển bởi Lyft.
Nó cực kỳ phổ biến làm Sidecar trong Service Mesh (như Istio) vì:
1. Hiệu năng cực cao, tiêu thụ ít RAM.
2. Hỗ trợ HTTP/2, gRPC native.
3. Cấu hình có thể thay đổi động (Dynamic Configuration) qua API mà không cần restart.
4. Cung cấp số liệu thống kê (metrics) cực kỳ chi tiết.
    `
  },
  {
    id: 'sm-7', category: 'Service Mesh', difficulty: 'Medium',
    tags: ['Service Mesh', 'Observability'],
    question: 'Service Mesh cải thiện Observability (Khả năng quan sát) như thế nào?',
    answer: `
Vì mọi traffic đều đi qua Sidecar proxy, Service Mesh tự động thu thập được "Golden Signals" mà không cần sửa code ứng dụng:
1. **Metrics:** Tự động xuất ra số lượng request, error rate, latency (tích hợp Prometheus/Grafana).
2. **Distributed Tracing:** Tự động tạo và truyền các Trace Headers (tích hợp Jaeger/Zipkin) để theo dõi đường đi của request qua hàng chục services.
3. **Access Logs:** Ghi log chi tiết mọi kết nối mạng.
    `
  },
  {
    id: 'sm-8', category: 'Service Mesh', difficulty: 'Hard',
    tags: ['Architecture', 'ESB'],
    question: 'Service Mesh khác gì so với ESB (Enterprise Service Bus) ngày xưa?',
    answer: `
- **ESB:** Là kiến trúc tập trung. ESB chứa cả routing logic VÀ business logic (chuyển đổi định dạng data, orchestration). Nó trở thành một "cục tạ" khổng lồ, chậm chạp và là điểm chết duy nhất (SPOF).
- **Service Mesh:** Là kiến trúc phân tán (Sidecar). Nó CHỈ xử lý network logic (routing, retry, mTLS), tuyệt đối KHÔNG chứa business logic. Code ứng dụng vẫn là nơi xử lý nghiệp vụ.
    `
  },
  {
    id: 'sm-9', category: 'Service Mesh', difficulty: 'Hard',
    tags: ['Service Mesh', 'Istio', 'Linkerd'],
    question: 'So sánh nhanh Istio và Linkerd?',
    answer: `
- **Istio:** Tính năng cực kỳ đồ sộ, hỗ trợ nhiều môi trường (K8s, VM). Dùng Envoy làm proxy. Nhược điểm là phức tạp, khó học, tốn nhiều tài nguyên (RAM/CPU) hơn.
- **Linkerd:** Tập trung vào sự đơn giản, nhẹ và nhanh. Dùng proxy riêng viết bằng Rust (Linkerd2-proxy). Rất dễ cài đặt và vận hành trên K8s, nhưng ít tính năng nâng cao hơn Istio.
    `
  },
  {
    id: 'sm-10', category: 'Service Mesh', difficulty: 'Medium',
    tags: ['Service Mesh', 'Drawbacks'],
    question: 'Nhược điểm của việc áp dụng Service Mesh là gì?',
    answer: `
1. **Tăng độ trễ (Latency):** Request phải đi qua 2 proxy (Sidecar của client -> Sidecar của server) nên sẽ cộng thêm vài mili-giây độ trễ.
2. **Tốn tài nguyên:** Mỗi Pod đều phải chạy thêm một container Proxy, nhân lên hàng ngàn Pod sẽ tốn một lượng RAM/CPU đáng kể.
3. **Độ phức tạp vận hành:** Cần đội ngũ DevOps có kỹ năng cao để cài đặt, cấu hình và debug khi có lỗi mạng xảy ra.
    `
  },

  // ================= JAVA SPRING BOOT (6-10) =================
  {
    id: 'spring-6', category: 'Spring Boot', difficulty: 'Medium',
    tags: ['Spring Boot', 'Auto-configuration'],
    question: 'Spring Boot Auto-configuration hoạt động như thế nào?',
    answer: `
Auto-configuration là cơ chế "phép thuật" của Spring Boot. Nó tự động cấu hình các Beans dựa trên các thư viện (jar) có trong classpath.
*Ví dụ:* Nếu Spring Boot thấy thư viện \`h2-database\` trong classpath và bạn không cấu hình DataSource nào, nó sẽ tự động tạo một In-memory DataSource Bean cho bạn.
Nó hoạt động dựa trên annotation \`@EnableAutoConfiguration\` và các điều kiện \`@Conditional\` (như \`@ConditionalOnClass\`, \`@ConditionalOnMissingBean\`).
    `
  },
  {
    id: 'spring-7', category: 'Spring Boot', difficulty: 'Medium',
    tags: ['Spring Data', 'Hibernate'],
    question: 'Sự khác biệt giữa Spring Data JPA và Hibernate?',
    answer: `
- **Hibernate:** Là một framework ORM (Object-Relational Mapping). Nó implement chuẩn JPA (Java Persistence API) để map Java Object với Database tables.
- **Spring Data JPA:** Là một lớp abstraction (vỏ bọc) nằm trên JPA (và Hibernate). Nó giúp giảm boilerplate code bằng cách tự động sinh ra các câu query SQL chỉ dựa vào tên method của Interface (ví dụ: \`findByEmailAndName\`) mà không cần viết code implement.
    `
  },
  {
    id: 'spring-8', category: 'Spring Boot', difficulty: 'Easy',
    tags: ['Spring Boot', 'Annotations'],
    question: 'Phân biệt @Component, @Service, @Repository và @Controller?',
    answer: `
Tất cả đều là các annotation để đánh dấu một class là Spring Bean.
- **@Component:** Annotation chung nhất.
- **@Service:** Đánh dấu class chứa Business Logic. (Chỉ mang tính semantic, giống hệt @Component).
- **@Repository:** Đánh dấu class thao tác với Database (DAO). *Đặc biệt:* Nó tự động bắt các exception của DB và chuyển thành \`DataAccessException\` của Spring.
- **@Controller:** Đánh dấu class xử lý HTTP request trong mô hình MVC.
    `
  },
  {
    id: 'spring-9', category: 'Spring Boot', difficulty: 'Medium',
    tags: ['Spring Boot', 'Exception Handling'],
    question: 'Làm thế nào để xử lý Exception tập trung (Global Exception Handling) trong Spring Boot?',
    answer: `
Sử dụng annotation **\`@ControllerAdvice\`** (hoặc \`@RestControllerAdvice\`) kết hợp với **\`@ExceptionHandler\`**.
Bạn tạo một class riêng biệt, Spring sẽ tự động bắt tất cả các exception văng ra từ bất kỳ Controller nào và đưa vào class này xử lý, giúp trả về format lỗi chuẩn (JSON) cho client mà không cần dùng \`try-catch\` ở mọi nơi.
    `
  },
  {
    id: 'spring-10', category: 'Spring Boot', difficulty: 'Easy',
    tags: ['Spring Boot', 'Profiles'],
    question: 'Spring Profiles dùng để làm gì?',
    answer: `
**Profiles** giúp tách biệt cấu hình ứng dụng cho các môi trường khác nhau (dev, test, prod).
Bạn có thể tạo các file \`application-dev.yml\`, \`application-prod.yml\`.
Khi chạy ứng dụng, bạn chỉ định profile active (ví dụ: \`-Dspring.profiles.active=prod\`), Spring sẽ load cấu hình tương ứng (như DB URL, mật khẩu) và chỉ khởi tạo các Bean được đánh dấu \`@Profile("prod")\`.
    `
  },

  // ================= PYTHON (6-10) =================
  {
    id: 'py-6', category: 'Python', difficulty: 'Medium',
    tags: ['Python', 'Generators'],
    question: 'Generator trong Python là gì? Từ khóa "yield" hoạt động ra sao?',
    answer: `
**Generator** là một function trả về một iterator, sinh ra các giá trị một cách lười biếng (lazy evaluation) thay vì lưu tất cả vào bộ nhớ cùng lúc.
Khi dùng từ khóa **\`yield\`**, hàm sẽ tạm dừng thực thi, trả về giá trị, và lưu lại trạng thái. Lần gọi \`next()\` tiếp theo, hàm sẽ chạy tiếp từ dòng \`yield\` đó.
*Lợi ích:* Tiết kiệm RAM cực lớn khi xử lý dữ liệu khổng lồ (ví dụ đọc file log vài GB).
    `
  },
  {
    id: 'py-7', category: 'Python', difficulty: 'Medium',
    tags: ['Python', 'OOP', 'Magic Methods'],
    question: 'Magic Methods (Dunder methods) là gì?',
    answer: `
**Magic Methods** (hay Dunder - Double Underscore methods) là các hàm đặc biệt bắt đầu và kết thúc bằng 2 dấu gạch dưới, ví dụ: \`__init__\`, \`__str__\`, \`__len__\`.
Chúng cho phép bạn định nghĩa cách các object của class tương tác với các toán tử hoặc hàm built-in của Python.
*Ví dụ:* Định nghĩa \`__add__(self, other)\` cho phép bạn dùng dấu \`+\` để cộng 2 object lại với nhau.
    `
  },
  {
    id: 'py-8', category: 'Python', difficulty: 'Medium',
    tags: ['Python', 'Data Structures'],
    question: 'Sự khác biệt giữa Shallow Copy và Deep Copy?',
    answer: `
- **Shallow Copy (\`copy.copy()\'):** Tạo một object mới, nhưng các phần tử con bên trong nó vẫn trỏ (reference) đến cùng địa chỉ bộ nhớ với object gốc. Nếu sửa phần tử con (mutable) ở bản copy, bản gốc cũng bị đổi.
- **Deep Copy (\`copy.deepcopy()\'):** Tạo một object mới VÀ đệ quy tạo bản sao mới cho TẤT CẢ các phần tử con bên trong. Sửa bản copy hoàn toàn không ảnh hưởng bản gốc.
    `
  },
  {
    id: 'py-9', category: 'Python', difficulty: 'Easy',
    tags: ['Python', 'Functions'],
    question: '*args và **kwargs dùng để làm gì?',
    answer: `
Dùng để truyền số lượng tham số không xác định vào hàm.
- **\`*args\`:** Nhận các tham số không có tên (positional arguments) và đóng gói chúng thành một **Tuple**.
- **\`**kwargs\`:** Nhận các tham số có tên (keyword arguments) và đóng gói chúng thành một **Dictionary**.
\`\`\`python
def func(*args, **kwargs):
    print(args)   # (1, 2)
    print(kwargs) # {'name': 'John'}
func(1, 2, name='John')
\`\`\`
    `
  },
  {
    id: 'py-10', category: 'Python', difficulty: 'Hard',
    tags: ['Python', 'Memory Management'],
    question: 'Python quản lý bộ nhớ như thế nào (Garbage Collection)?',
    answer: `
Python quản lý bộ nhớ chủ yếu bằng **Reference Counting** (Đếm tham chiếu).
- Mỗi object có một biến đếm số lượng reference trỏ đến nó. Khi biến đếm về 0, bộ nhớ của object đó lập tức được giải phóng.
- **Vấn đề:** Reference Counting không xử lý được *Cyclic Reference* (A trỏ tới B, B trỏ lại A).
- **Giải pháp:** Python có thêm một **Generational Garbage Collector** chạy ngầm định kỳ để phát hiện và dọn dẹp các vòng lặp tham chiếu này.
    `
  },

  // ================= REACT & FRONTEND (6-10) =================
  {
    id: 'react-6', category: 'Frontend', difficulty: 'Medium',
    tags: ['React', 'State Management'],
    question: 'Khi nào nên dùng Context API và khi nào dùng Redux?',
    answer: `
- **Context API:** Tích hợp sẵn trong React. Phù hợp cho dữ liệu ít thay đổi (Theme, Ngôn ngữ, User Auth) và tránh Props Drilling. Nhược điểm: Khi value của Context đổi, TẤT CẢ component consume nó đều bị re-render, khó tối ưu hiệu năng cho data thay đổi liên tục.
- **Redux:** Thư viện ngoài. Phù hợp cho ứng dụng lớn, state phức tạp, thay đổi liên tục. Redux cho phép component chỉ re-render khi phần state nó quan tâm (qua selector) bị thay đổi. Hỗ trợ middleware (Redux Thunk/Saga) và DevTools mạnh mẽ.
    `
  },
  {
    id: 'react-7', category: 'Frontend', difficulty: 'Medium',
    tags: ['React', 'Hooks', 'Performance'],
    question: 'Phân biệt useMemo và useCallback?',
    answer: `
Cả hai đều dùng để tối ưu hiệu năng (Memoization) để tránh tính toán lại không cần thiết khi component re-render.
- **\`useMemo\`:** Cache lại **kết quả của một hàm** (một giá trị, array, object). Chỉ tính lại khi dependency thay đổi.
- **\`useCallback\`:** Cache lại **chính cái hàm đó** (reference của hàm). Thường dùng khi truyền hàm xuống component con (đã bọc \`React.memo\`) để tránh component con bị re-render vô cớ do reference của hàm bị tạo mới.
    `
  },
  {
    id: 'react-8', category: 'Frontend', difficulty: 'Hard',
    tags: ['React', 'Architecture'],
    question: 'React Fiber là gì?',
    answer: `
**React Fiber** là kiến trúc core engine mới của React (từ v16).
Trước Fiber, React render đồng bộ (chạy một mạch từ trên xuống dưới), nếu DOM tree lớn sẽ làm block Main Thread, gây giật lag UI.
Fiber chia quá trình render thành các đơn vị nhỏ (chunks). Nó có thể **tạm dừng, hủy bỏ, hoặc ưu tiên (prioritize)** các task quan trọng (như user gõ phím, animation) và làm tiếp các task ít quan trọng sau. Giúp UI luôn mượt mà (Concurrency).
    `
  },
  {
    id: 'react-9', category: 'Frontend', difficulty: 'Medium',
    tags: ['React', 'Patterns'],
    question: 'HOC (Higher-Order Component) là gì?',
    answer: `
**HOC** là một pattern trong React. Nó là một hàm nhận vào một Component và trả về một Component mới với các tính năng được bổ sung thêm.
*Ví dụ:* \`withAuth(Dashboard)\` sẽ kiểm tra đăng nhập trước khi render Dashboard.
Hiện nay, HOC ít được sử dụng hơn và thường được thay thế bằng **Custom Hooks** vì Hooks dễ đọc, dễ tái sử dụng logic và không làm sâu cây DOM (wrapper hell).
    `
  },
  {
    id: 'react-10', category: 'Frontend', difficulty: 'Medium',
    tags: ['Frontend', 'DOM'],
    question: 'Event Delegation trong Javascript/React là gì?',
    answer: `
Thay vì gắn Event Listener (như \`onClick\`) cho từng phần tử con (ví dụ 1000 thẻ \`<li>\`), ta chỉ gắn MỘT Event Listener duy nhất vào phần tử cha (\`<ul>\`).
Khi click vào \`<li>\`, sự kiện sẽ nổi bọt (Event Bubbling) lên \`<ul>\`. Tại đây ta dùng \`event.target\` để biết chính xác thẻ \`<li>\` nào được click.
*Lợi ích:* Tiết kiệm bộ nhớ cực lớn. (Lưu ý: React tự động áp dụng Event Delegation ngầm ở cấp độ root container).
    `
  },

  // ================= DOCKER & KUBERNETES (6-10) =================
  {
    id: 'dk-6', category: 'Docker & K8s', difficulty: 'Medium',
    tags: ['Docker', 'Dockerfile'],
    question: 'Sự khác biệt giữa CMD và ENTRYPOINT trong Dockerfile?',
    answer: `
Cả hai đều định nghĩa lệnh chạy khi container khởi động.
- **ENTRYPOINT:** Lệnh cố định, rất khó bị ghi đè khi chạy \`docker run\`. Thường dùng để định nghĩa file thực thi chính của container.
- **CMD:** Cung cấp tham số mặc định cho ENTRYPOINT, hoặc lệnh mặc định nếu không có ENTRYPOINT. RẤT DỄ bị ghi đè bởi tham số truyền vào từ \`docker run\`.
*Thực tế:* Thường kết hợp cả hai: ENTRYPOINT là file chạy (ví dụ \`java -jar\`), CMD là tham số (ví dụ \`app.jar\`).
    `
  },
  {
    id: 'dk-7', category: 'Docker & K8s', difficulty: 'Easy',
    tags: ['Kubernetes', 'Configuration'],
    question: 'ConfigMap và Secret trong K8s khác nhau thế nào?',
    answer: `
Dùng để tách cấu hình ra khỏi code ứng dụng.
- **ConfigMap:** Lưu trữ cấu hình dạng plain-text (không bảo mật), ví dụ: URL database, biến môi trường, file nginx.conf.
- **Secret:** Lưu trữ thông tin nhạy cảm (Password, API Key, TLS Certs). Dữ liệu được mã hóa Base64 (lưu ý Base64 không phải là mã hóa an toàn, K8s hiện đại hỗ trợ mã hóa Secret at rest bằng KMS).
    `
  },
  {
    id: 'dk-8', category: 'Docker & K8s', difficulty: 'Medium',
    tags: ['Kubernetes', 'Networking'],
    question: 'K8s Ingress là gì?',
    answer: `
**Ingress** là một API object quản lý truy cập từ bên ngoài (external access) vào các Services bên trong cluster, thường là HTTP/HTTPS.
Nó cung cấp tính năng Routing dựa trên tên miền (Host-based) hoặc đường dẫn (Path-based), SSL Termination.
Cần có một **Ingress Controller** (như Nginx Ingress, Kong Ingress) chạy trong cluster để thực thi các rules này.
    `
  },
  {
    id: 'dk-9', category: 'Docker & K8s', difficulty: 'Easy',
    tags: ['Kubernetes', 'Tools'],
    question: 'Helm là gì?',
    answer: `
**Helm** là Package Manager (Trình quản lý gói) cho Kubernetes (giống như \`npm\` cho Node.js hay \`apt\` cho Ubuntu).
Thay vì phải viết và quản lý hàng chục file YAML rời rạc (Deployment, Service, Ingress), Helm đóng gói chúng lại thành một **Chart**. Bạn có thể cài đặt toàn bộ ứng dụng phức tạp (như Redis cluster, Kafka) chỉ bằng một lệnh \`helm install\`. Hỗ trợ versioning và rollback dễ dàng.
    `
  },
  {
    id: 'dk-10', category: 'Docker & K8s', difficulty: 'Hard',
    tags: ['Kubernetes', 'Workloads'],
    question: 'Sự khác nhau giữa DaemonSet và ReplicaSet?',
    answer: `
- **ReplicaSet (thường qua Deployment):** Đảm bảo luôn có N bản sao (Pods) chạy trong cluster. K8s có thể xếp nhiều Pods lên cùng 1 Node, hoặc có Node không có Pod nào.
- **DaemonSet:** Đảm bảo **MỖI NODE** trong cluster đều chạy CHÍNH XÁC 1 bản sao của Pod. Khi thêm Node mới, Pod tự động được deploy lên đó. Thường dùng cho các agent chạy ngầm như: Thu thập Log (Fluentd), Monitoring (Prometheus Node Exporter), Network plugin.
    `
  },

  // ================= MESSAGE QUEUES (6-10) =================
  {
    id: 'mq-6', category: 'Message Queues', difficulty: 'Medium',
    tags: ['Message Queue', 'DLQ'],
    question: 'Dead Letter Queue (DLQ) là gì?',
    answer: `
**DLQ** là một hàng đợi đặc biệt dùng để chứa các message không thể xử lý thành công sau nhiều lần thử (retries), hoặc message bị sai định dạng, hoặc hết hạn (TTL).
Thay vì block toàn bộ hệ thống vì 1 message lỗi, message đó được đẩy ra DLQ để dev/admin có thể vào kiểm tra thủ công, debug lỗi và quyết định có đẩy lại vào queue chính (re-queue) hay không.
    `
  },
  {
    id: 'mq-7', category: 'Message Queues', difficulty: 'Hard',
    tags: ['Kafka', 'Ordering'],
    question: 'Làm thế nào để đảm bảo thứ tự Message (Message Ordering) trong Kafka?',
    answer: `
Kafka **CHỈ** đảm bảo thứ tự message ở cấp độ **Partition**, không đảm bảo trên toàn bộ Topic.
Để đảm bảo các message liên quan đến nhau (ví dụ: các event của cùng 1 UserID) được xử lý đúng thứ tự:
1. Khi Producer gửi message, phải đính kèm **Message Key** (ví dụ: UserID).
2. Kafka sẽ dùng hàm Hash(Key) để đảm bảo các message có cùng Key sẽ luôn rơi vào **cùng một Partition**.
3. Một Partition chỉ được đọc bởi 1 Consumer trong Group, do đó thứ tự xử lý được đảm bảo tuyệt đối.
    `
  },
  {
    id: 'mq-8', category: 'Message Queues', difficulty: 'Medium',
    tags: ['Kafka', 'Consumers'],
    question: 'Consumer Group trong Kafka là gì?',
    answer: `
**Consumer Group** là một nhóm các Consumer cùng hợp tác để đọc data từ một Topic.
- Mỗi Partition trong Topic chỉ được gán cho **TỐI ĐA 1 Consumer** trong cùng một Group.
- Giúp scale việc đọc dữ liệu: Nếu Topic có 4 Partitions, bạn chạy 4 Consumers trong 1 Group, mỗi Consumer sẽ đọc 1 Partition song song.
- Nếu số Consumer > số Partition, các Consumer thừa sẽ ngồi chơi (Idle).
    `
  },
  {
    id: 'mq-9', category: 'Message Queues', difficulty: 'Medium',
    tags: ['RabbitMQ', 'Performance'],
    question: 'Prefetch Count trong RabbitMQ là gì?',
    answer: `
**Prefetch Count** (QoS) giới hạn số lượng message chưa được xác nhận (unacknowledged) mà RabbitMQ gửi cho một Consumer cùng lúc.
- Nếu không set (mặc định), RabbitMQ sẽ đẩy ồ ạt toàn bộ message vào RAM của Consumer, có thể làm sập Consumer (Out of Memory).
- Nếu set Prefetch = 10, Consumer chỉ nhận tối đa 10 message. Nó phải xử lý và gửi ACK lại thì RabbitMQ mới đẩy tiếp. Giúp phân phối tải công bằng (Fair Dispatch) giữa các worker.
    `
  },
  {
    id: 'mq-10', category: 'Message Queues', difficulty: 'Hard',
    tags: ['Message Queue', 'Semantics'],
    question: 'Giải thích các mức độ Delivery Semantics (At-most-once, At-least-once, Exactly-once)?',
    answer: `
1. **At-most-once (Tối đa 1 lần):** Gửi xong là quên. Message có thể bị mất nhưng không bao giờ bị trùng lặp. (Dùng cho data không quan trọng như metrics).
2. **At-least-once (Ít nhất 1 lần):** Đảm bảo message đến đích, nếu lỗi sẽ gửi lại. Message không bị mất nhưng có thể bị **trùng lặp** (Duplicate). Hệ thống nhận phải tự xử lý trùng lặp (Idempotent). Đây là mức phổ biến nhất.
3. **Exactly-once (Chính xác 1 lần):** Message không mất, không trùng. Cực kỳ khó thiết kế và làm giảm hiệu năng hệ thống. Kafka hỗ trợ Exactly-once thông qua Transactional API.
    `
  }
];
