import { Question } from './data';

export const premiumQuestions: Question[] = [
  // ================= SYSTEM DESIGN (ADVANCED) =================
  {
    id: 'sd-premium-1', category: 'System Design', difficulty: 'Hard',
    tags: ['Architecture', 'CQRS', 'Event Sourcing'],
    question: 'Giải thích mô hình CQRS và Event Sourcing? Khi nào nên kết hợp chúng?',
    answer: `
### 1. Bản chất vấn đề
Trong các hệ thống CRUD truyền thống, ta dùng chung một model (và một database) cho cả việc Đọc (Read) và Ghi (Write). Khi hệ thống lớn lên, logic Ghi trở nên cực kỳ phức tạp (nhiều validation, transaction), trong khi logic Đọc lại cần tốc độ siêu nhanh và query đa dạng. Việc dùng chung 1 DB gây ra thắt cổ chai (bottleneck) và lock lẫn nhau.

### 2. CQRS (Command Query Responsibility Segregation)
CQRS tách biệt hoàn toàn model và database của việc Đọc và Ghi:
- **Command (Ghi):** Chịu trách nhiệm thay đổi trạng thái hệ thống (Insert, Update, Delete). DB ghi thường là Relational DB (PostgreSQL) để đảm bảo tính toàn vẹn (ACID).
- **Query (Đọc):** Chỉ trả về dữ liệu, không làm thay đổi state. DB đọc thường là NoSQL (MongoDB, Elasticsearch) được tối ưu hóa cho việc query nhanh.
- **Đồng bộ:** Khi có Command thành công, hệ thống bắn ra một Event (qua Kafka/RabbitMQ) để cập nhật dữ liệu sang DB Query.

### 3. Event Sourcing
Thay vì lưu trạng thái *hiện tại* của object (ví dụ: Số dư tài khoản = $100), Event Sourcing lưu **tất cả các sự kiện (events)** đã làm thay đổi trạng thái đó (ví dụ: Nạp $150, Rút $50).
- Trạng thái hiện tại được tính toán bằng cách "replay" (chạy lại) tất cả các events từ đầu.

### 4. Tại sao kết hợp CQRS + Event Sourcing?
- Event Sourcing đóng vai trò là **Nguồn chân lý (Source of Truth)** cho phần Command.
- Khi một Event được lưu vào Event Store, nó lập tức được publish sang phần Query để build ra các "Read Models" (Materialized Views) khác nhau phục vụ cho UI.
- **Ưu điểm:** Khả năng Audit (truy vết) tuyệt đối 100%, dễ dàng debug, scale Read và Write độc lập, có thể tái tạo lại Read DB bất cứ lúc nào nếu bị lỗi.
- **Nhược điểm (Trade-offs):** Cực kỳ phức tạp, Eventual Consistency (dữ liệu đọc có thể bị trễ vài mili-giây so với ghi), đường cong học tập (learning curve) rất dốc.

### 5. Use-case thực tế
- **Nên dùng:** Hệ thống ngân hàng/ví điện tử (cần lưu lịch sử giao dịch tuyệt đối), Hệ thống giỏ hàng E-commerce lớn, Hệ thống đặt vé.
- **Không nên dùng:** Các ứng dụng CRUD đơn giản (Blog, CMS nội bộ).
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=CQRS+%2B+Event+Sourcing+Architecture'
  },
  {
    id: 'sd-premium-2', category: 'System Design', difficulty: 'Hard',
    tags: ['Database', 'Distributed Systems', 'Transactions'],
    question: 'So sánh 2PC (Two-Phase Commit) và Saga Pattern trong Distributed Transactions?',
    answer: `
### 1. Vấn đề của Distributed Transactions
Khi một nghiệp vụ (ví dụ: Đặt hàng) yêu cầu cập nhật dữ liệu trên nhiều Microservices khác nhau (Order Service, Inventory Service, Payment Service), ta cần đảm bảo tính **Atomicity** (hoặc tất cả thành công, hoặc tất cả thất bại).

### 2. 2PC (Two-Phase Commit)
Là giao thức đồng bộ, có một Coordinator đứng giữa điều phối.
- **Phase 1 (Prepare):** Coordinator hỏi tất cả các services: "Các bạn đã sẵn sàng commit chưa?". Các services lock database record lại và trả lời "Yes/No".
- **Phase 2 (Commit/Rollback):** Nếu tất cả "Yes", Coordinator ra lệnh "Commit". Nếu có 1 "No", ra lệnh "Rollback".
- **Trade-offs:** 
  - *Ưu điểm:* Đảm bảo Strong Consistency (Nhất quán mạnh).
  - *Nhược điểm:* **Rất chậm và dễ gây Deadlock**. Trong suốt quá trình hỏi đáp, database records bị khóa (lock), làm giảm throughput của toàn hệ thống. Không phù hợp cho Microservices hiện đại.

### 3. Saga Pattern
Là giao thức bất đồng bộ, chia transaction lớn thành chuỗi các local transactions nhỏ.
- Mỗi service tự thực hiện local transaction của mình và bắn ra một Event.
- Nếu một service ở giữa bị lỗi (VD: Payment fail), Saga sẽ kích hoạt các **Compensating Transactions (Giao dịch bù trừ)** chạy ngược lại để hoàn tác các bước trước đó (VD: Gọi API hủy Order, Gọi API cộng lại Inventory).
- **Trade-offs:**
  - *Ưu điểm:* Không có database lock kéo dài, hiệu năng cực cao, scale tốt.
  - *Nhược điểm:* Chỉ đạt được Eventual Consistency. Việc viết logic cho các Compensating Transactions rất phức tạp (phải xử lý Idempotency, retry).

### 4. Kết luận cho Phỏng vấn
Trong kiến trúc Microservices, **Saga Pattern** gần như là tiêu chuẩn bắt buộc để thay thế 2PC. 2PC chỉ còn được dùng trong các hệ thống Monolith dùng chung 1 Relational DB hoặc các hệ thống tài chính yêu cầu độ trễ cực thấp và nhất quán tuyệt đối trên mạng nội bộ (LAN).
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=2PC+vs+Saga+Pattern'
  },

  // ================= CLOUD COMPUTING (AWS) =================
  {
    id: 'aws-premium-1', category: 'AWS', difficulty: 'Hard',
    tags: ['AWS', 'Architecture', 'High Availability'],
    question: 'Thiết kế kiến trúc High Availability (HA) và Fault Tolerance cho một Web App trên AWS?',
    answer: `
Để thiết kế một hệ thống không bao giờ sập (HA) và chịu được lỗi phần cứng (Fault Tolerance) trên AWS, ta cần loại bỏ mọi điểm chết duy nhất (Single Point of Failure - SPOF) ở tất cả các tầng (Tiers).

### Kiến trúc chuẩn 3-Tier trên AWS:

**1. Tầng Edge & DNS (Routing & Caching):**
- **Route 53:** Quản lý DNS, cấu hình *Latency-based routing* hoặc *Failover routing* để điều hướng user đến Region gần nhất hoặc Region dự phòng nếu Region chính sập.
- **CloudFront (CDN):** Cache static assets (ảnh, JS, CSS) ở các Edge Locations toàn cầu, giảm tải cho server gốc.
- **AWS WAF & Shield:** Chống DDoS và SQL Injection ở ngay tầng biên.

**2. Tầng Web/App (Compute):**
- Đặt các EC2 instances hoặc ECS/EKS (Containers) vào một **Auto Scaling Group (ASG)**.
- **Multi-AZ:** Cấu hình ASG rải các instances ra ít nhất 2-3 Availability Zones (AZs) khác nhau trong cùng 1 Region. Nếu 1 Data Center (AZ) bị cháy/mất điện, các AZ khác vẫn chạy bình thường.
- **Application Load Balancer (ALB):** Đứng trước ASG để phân phối traffic đều vào các instances khỏe mạnh (dựa trên Health Checks).

**3. Tầng Database & Storage (Stateful):**
- **Amazon RDS / Aurora:** Bật chế độ **Multi-AZ Deployment**. AWS sẽ tự động tạo một bản Standby Replica ở một AZ khác và đồng bộ dữ liệu liên tục (Synchronous replication). Khi DB chính chết, AWS tự động switch DNS sang DB dự phòng trong < 60s.
- **ElastiCache (Redis):** Dùng để cache query và lưu Session. Cũng cấu hình Multi-AZ với Redis Cluster.
- **S3:** Lưu trữ file upload của user. S3 mặc định đã replicate data ra 3 AZs, độ bền (Durability) lên tới 99.999999911% (11 số 9).

### Trade-offs:
- **Chi phí (Cost):** Kiến trúc Multi-AZ nhân đôi/nhân ba chi phí hạ tầng (chạy nhiều server, phí truyền tải data giữa các AZ).
- **Độ trễ (Latency):** Đồng bộ dữ liệu giữa các AZ (cách nhau vài chục km) sẽ thêm khoảng 1-2ms độ trễ cho mỗi transaction ghi vào DB.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=AWS+Multi-AZ+High+Availability+Architecture'
  },
  {
    id: 'aws-premium-2', category: 'AWS', difficulty: 'Medium',
    tags: ['AWS', 'Serverless', 'Containers'],
    question: 'So sánh AWS Lambda (Serverless) và AWS Fargate / EKS (Containers)? Khi nào dùng cái nào?',
    answer: `
Đây là câu hỏi kinh điển về việc chọn Compute Engine trên AWS.

### 1. AWS Lambda (Serverless Functions)
- **Bản chất:** Bạn chỉ viết code (hàm), upload lên AWS. AWS tự lo việc cấp phát server, chạy code khi có trigger (API Gateway, S3 event, SQS), và tự tắt khi chạy xong.
- **Ưu điểm:** 
  - Scale từ 0 lên 10,000 requests/s gần như tức thì.
  - Trả tiền theo mili-giây thực thi (Pay-per-use). Không có request = $0.
  - Zero Ops (Không cần quản lý OS, patch bảo mật).
- **Nhược điểm:**
  - **Cold Start:** Lần gọi đầu tiên (hoặc khi scale đột ngột) mất vài giây để khởi động môi trường.
  - Giới hạn thời gian chạy (Max 15 phút).
  - Khó debug cục bộ, Vendor lock-in (bị trói buộc vào AWS).

### 2. AWS Fargate / EKS (Container Orchestration)
- **Bản chất:** Bạn đóng gói app thành Docker Image. Fargate là Serverless Compute cho Containers (không cần quản lý EC2), còn EKS là Kubernetes do AWS quản lý.
- **Ưu điểm:**
  - Không có giới hạn thời gian chạy (phù hợp cho long-running background jobs, WebSockets).
  - Không bị Cold Start (container luôn chạy).
  - Dễ dàng migrate sang Cloud khác (GCP, Azure) vì dùng chuẩn Docker/K8s.
- **Nhược điểm:**
  - Phải trả tiền 24/7 kể cả khi không có traffic (vì container luôn bật).
  - Scale chậm hơn Lambda (mất vài chục giây đến vài phút để spin up container mới).
  - Phức tạp hơn trong việc setup CI/CD và quản lý hạ tầng.

### 3. Quyết định (Use-cases)
- Chọn **Lambda** cho: Các tác vụ chạy nền ngắn hạn (resize ảnh, gửi email), Cron jobs, API có traffic không đều (lúc rất cao, lúc không có ai), các startup muốn tiết kiệm chi phí ban đầu.
- Chọn **Fargate/EKS** cho: Ứng dụng Web/API truyền thống cần phản hồi cực nhanh (không chịu được Cold Start), các hệ thống Legacy chuyển lên Cloud, các service dùng WebSockets/gRPC duy trì kết nối lâu dài.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=AWS+Lambda+vs+Fargate'
  },

  // ================= DATABASE / SQL (ADVANCED) =================
  {
    id: 'sql-premium-1', category: 'SQL', difficulty: 'Hard',
    tags: ['Database', 'Isolation Levels', 'Concurrency'],
    question: 'Giải thích các mức độ cô lập (Isolation Levels) trong Database và các hiện tượng lỗi đọc (Read Phenomena)?',
    answer: `
Trong môi trường có hàng ngàn transaction chạy song song, DB cần các mức độ cô lập (Isolation Levels) để cân bằng giữa **Tính nhất quán (Consistency)** và **Hiệu năng (Performance)**.

### 1. Các hiện tượng lỗi đọc (Read Phenomena)
- **Dirty Read:** Transaction A đọc được dữ liệu mà Transaction B vừa sửa *nhưng chưa Commit*. Nếu B rollback, A đang cầm dữ liệu "ma".
- **Non-repeatable Read:** Trong cùng 1 Transaction A, đọc 1 dòng 2 lần ra 2 kết quả khác nhau (do Transaction B đã nhảy vào Update và Commit ở giữa).
- **Phantom Read:** Trong cùng 1 Transaction A, chạy 1 câu \`SELECT COUNT(*)\` 2 lần ra 2 số lượng khác nhau (do Transaction B đã nhảy vào Insert/Delete và Commit ở giữa).

### 2. Các mức độ cô lập (Từ thấp đến cao)
1. **Read Uncommitted:** Mức thấp nhất, tốc độ nhanh nhất. Bị dính toàn bộ 3 lỗi trên. (Rất hiếm dùng).
2. **Read Committed:** Chỉ đọc data đã commit. Chống được *Dirty Read*. (Là mức mặc định của PostgreSQL, SQL Server).
3. **Repeatable Read:** Đảm bảo đọc 1 dòng nhiều lần kết quả không đổi (Lock dòng đang đọc). Chống được *Dirty Read* và *Non-repeatable Read*. Vẫn có thể bị *Phantom Read*. (Là mức mặc định của MySQL/InnoDB).
4. **Serializable:** Mức cao nhất, an toàn tuyệt đối. Các transaction chạy tuần tự như xếp hàng. Chống được cả 3 lỗi. 
   - *Trade-off:* Hiệu năng cực kỳ tệ, dễ gây timeout và deadlock. Chỉ dùng cho các giao dịch tài chính cực kỳ nhạy cảm.

### 3. Lời khuyên thực tế
Không bao giờ set DB ở mức \`Serializable\` cho toàn hệ thống. Hãy để mặc định (\`Read Committed\` hoặc \`Repeatable Read\`) và xử lý các case nhạy cảm (như trừ tiền) bằng **Pessimistic Locking** (\`SELECT ... FOR UPDATE\`) hoặc **Optimistic Locking** (dùng cột \`version\`).
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Database+Isolation+Levels'
  }
];
