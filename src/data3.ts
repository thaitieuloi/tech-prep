import { Question } from './data';

export const questions3: Question[] = [
  // ================= SYSTEM DESIGN (11-20) =================
  {
    id: 'sd-11', category: 'System Design', difficulty: 'Hard',
    tags: ['System Design', 'Database', 'Scaling'],
    question: 'Database Sharding là gì? Các chiến lược Sharding phổ biến?',
    answer: `
**Database Sharding** là kỹ thuật chia nhỏ một database khổng lồ thành nhiều database nhỏ hơn (gọi là các Shards) đặt trên các server khác nhau. Giúp scale ngang (horizontal scaling) database.

**Các chiến lược phổ biến:**
1. **Range Based Sharding:** Chia theo khoảng giá trị. VD: User ID từ 1-1000 vào Shard 1, 1001-2000 vào Shard 2. *Nhược điểm:* Dễ bị "hotspot" (truy cập dồn vào 1 shard).
2. **Hash Based Sharding:** Dùng hàm Hash(Key) % N để quyết định Shard. Phân phối data đều hơn. *Nhược điểm:* Khó thêm/bớt Shard (thường kết hợp với Consistent Hashing để giải quyết).
3. **Directory Based Sharding:** Dùng một Lookup Service (Bảng tra cứu) để lưu mapping giữa Key và Shard. Linh hoạt nhất nhưng Lookup Service có thể thành điểm nghẽn (SPOF).
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Database+Sharding:+Range+vs+Hash'
  },
  {
    id: 'sd-12', category: 'System Design', difficulty: 'Medium',
    tags: ['System Design', 'CDN'],
    question: 'CDN (Content Delivery Network) hoạt động như thế nào?',
    answer: `
**CDN** là một mạng lưới các server phân tán trên toàn cầu (Edge Servers), dùng để cache các nội dung tĩnh (hình ảnh, video, CSS, JS) gần với người dùng nhất.

**Cách hoạt động:**
1. User ở Việt Nam request một hình ảnh từ website (Server gốc ở Mỹ).
2. Request được DNS điều hướng đến Edge Server của CDN tại Việt Nam.
3. Nếu Edge Server đã có ảnh (Cache Hit), nó trả về ngay lập tức (độ trễ < 10ms).
4. Nếu chưa có (Cache Miss), Edge Server sẽ kéo ảnh từ Server gốc ở Mỹ, lưu vào cache của nó, rồi trả về cho User. Các user Việt Nam sau đó sẽ lấy được ảnh ngay lập tức.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=CDN+Architecture:+Origin+vs+Edge+Servers'
  },
  {
    id: 'sd-13', category: 'System Design', difficulty: 'Hard',
    tags: ['System Design', 'CAP Theorem'],
    question: 'Định lý CAP (CAP Theorem) là gì?',
    answer: `
Định lý CAP phát biểu rằng trong một hệ thống phân tán, bạn CHỈ CÓ THỂ ĐẠT ĐƯỢC TỐI ĐA 2 TRONG 3 đặc tính sau:

1. **Consistency (Tính nhất quán):** Mọi node đều nhìn thấy cùng một dữ liệu tại cùng một thời điểm. (Đọc sau khi ghi chắc chắn ra data mới nhất).
2. **Availability (Tính sẵn sàng):** Mọi request đều nhận được phản hồi (không bị lỗi), nhưng không đảm bảo là data mới nhất.
3. **Partition Tolerance (Khả năng chịu lỗi phân vùng):** Hệ thống vẫn hoạt động dù kết nối mạng giữa các node bị đứt gãy.

*Thực tế:* Mạng Internet luôn có rủi ro đứt kết nối (P là bắt buộc). Do đó, ta luôn phải đánh đổi giữa **CP** (chọn Nhất quán, hy sinh Sẵn sàng - VD: MongoDB, Redis) hoặc **AP** (chọn Sẵn sàng, hy sinh Nhất quán - VD: Cassandra, DynamoDB).
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=CAP+Theorem+Triangle'
  },
  {
    id: 'sd-14', category: 'System Design', difficulty: 'Medium',
    tags: ['System Design', 'API'],
    question: 'So sánh REST API, GraphQL và gRPC?',
    answer: `
- **REST:** Dùng HTTP/1.1, data JSON. Dễ hiểu, phổ biến nhất. *Nhược điểm:* Over-fetching (lấy thừa data) hoặc Under-fetching (phải gọi nhiều API mới đủ data).
- **GraphQL:** Do Facebook tạo ra. Client tự định nghĩa cấu trúc data muốn lấy trong 1 request duy nhất. Giải quyết triệt để Over/Under-fetching. *Nhược điểm:* Khó cache ở tầng HTTP, query phức tạp có thể làm sập DB.
- **gRPC:** Do Google tạo ra. Dùng HTTP/2 và Protobuf (binary). Tốc độ cực nhanh, payload siêu nhỏ, hỗ trợ streaming 2 chiều. *Nhược điểm:* Khó debug (vì là binary), trình duyệt không hỗ trợ native (phải dùng gRPC-web). Thường dùng cho giao tiếp server-to-server (Microservices).
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=REST+vs+GraphQL+vs+gRPC'
  },
  {
    id: 'sd-15', category: 'System Design', difficulty: 'Hard',
    tags: ['System Design', 'Microservices', 'Saga'],
    question: 'Làm thế nào để quản lý Transaction trong Microservices (Saga Pattern)?',
    answer: `
Trong Microservices, mỗi service có một DB riêng, nên không thể dùng ACID transaction thông thường (2-Phase Commit rất chậm). Ta dùng **Saga Pattern**.

**Saga** là một chuỗi các local transactions. Khi một transaction ở Service A thành công, nó bắn event để kích hoạt transaction ở Service B.
Nếu Service B thất bại, Saga sẽ kích hoạt các **Compensating Transactions (Giao dịch bù trừ)** chạy ngược lại từ B về A để rollback dữ liệu (VD: A đã trừ tiền, B lỗi không giao hàng -> B kích hoạt A cộng lại tiền).

*Có 2 cách triển khai:*
1. **Choreography:** Các service tự lắng nghe event của nhau (Decentralized).
2. **Orchestration:** Có một cục trung tâm (Orchestrator) đứng ra gọi và điều phối các service (Centralized).
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Saga+Pattern:+Choreography+vs+Orchestration'
  },
  {
    id: 'sd-16', category: 'System Design', difficulty: 'Medium',
    tags: ['System Design', 'WebSockets', 'Polling'],
    question: 'So sánh Long Polling, WebSockets và Server-Sent Events (SSE)?',
    answer: `
Các kỹ thuật để server đẩy data realtime xuống client:
1. **Long Polling:** Client gửi request. Server giữ request đó (không trả lời ngay) cho đến khi có data mới. Trả lời xong, client lập tức mở request mới. *Tốn tài nguyên HTTP overhead.*
2. **WebSockets:** Mở một kết nối TCP duy trì liên tục, cho phép giao tiếp 2 chiều (Full-duplex) với độ trễ cực thấp. *Phù hợp: Chat, Game realtime.*
3. **Server-Sent Events (SSE):** Kết nối 1 chiều (Server -> Client) qua HTTP thông thường. *Phù hợp: Bảng giá chứng khoán, Notification, News feed.*
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Realtime:+WebSocket+vs+SSE+vs+Polling'
  },
  {
    id: 'sd-17', category: 'System Design', difficulty: 'Hard',
    tags: ['System Design', 'Idempotency'],
    question: 'Idempotency Key là gì và tại sao nó quan trọng trong API thanh toán?',
    answer: `
**Idempotency (Tính lũy đẳng)** nghĩa là một thao tác dù được thực hiện 1 lần hay 100 lần thì kết quả cuối cùng vẫn như nhau.

Trong API thanh toán, nếu network bị chập chờn, client không nhận được response nên tự động Retry (gọi lại API). Nếu không có Idempotency, user sẽ bị trừ tiền 2 lần.
**Giải pháp:** Client sinh ra một \`Idempotency-Key\` (UUID) và gửi kèm header. Server lưu key này vào DB. Khi nhận request, server check key:
- Nếu key chưa tồn tại: Xử lý trừ tiền, lưu key + kết quả.
- Nếu key đã tồn tại: Bỏ qua xử lý, trả về ngay kết quả đã lưu trước đó.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Idempotency+Key+in+Payment+API'
  },
  {
    id: 'sd-18', category: 'System Design', difficulty: 'Medium',
    tags: ['System Design', 'Scaling'],
    question: 'Scale Up (Vertical Scaling) và Scale Out (Horizontal Scaling) khác nhau thế nào?',
    answer: `
- **Scale Up (Vertical):** Nâng cấp phần cứng của server hiện tại (thêm RAM, thêm CPU, đổi ổ SSD). *Ưu điểm:* Dễ làm, không phải sửa code. *Nhược điểm:* Có giới hạn vật lý (không thể mua server 1000TB RAM), rủi ro SPOF (chết server là sập toàn bộ).
- **Scale Out (Horizontal):** Mua thêm nhiều server nhỏ và kết nối chúng lại qua Load Balancer. *Ưu điểm:* Khả năng mở rộng vô hạn, chịu lỗi tốt (chết 1 server không sao). *Nhược điểm:* Phức tạp, code phải thiết kế dạng Stateless, khó quản lý data consistency.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Vertical+Scaling+vs+Horizontal+Scaling'
  },
  {
    id: 'sd-19', category: 'System Design', difficulty: 'Hard',
    tags: ['System Design', 'Bloom Filter'],
    question: 'Bloom Filter là gì và ứng dụng trong System Design?',
    answer: `
**Bloom Filter** là một cấu trúc dữ liệu xác suất (probabilistic data structure) cực kỳ tiết kiệm bộ nhớ, dùng để kiểm tra xem một phần tử CÓ THỂ ĐÃ TỒN TẠI trong tập hợp hay CHẮC CHẮN CHƯA TỒN TẠI.

- Nếu Bloom Filter nói "Chưa tồn tại": Chắc chắn 100% là chưa.
- Nếu Bloom Filter nói "Đã tồn tại": Có thể đúng, nhưng cũng có thể sai (False Positive).

**Ứng dụng:** 
- Trình duyệt dùng để check URL có phải web độc hại không (không cần lưu toàn bộ URL tốn RAM).
- Database (Cassandra) dùng để check xem data có nằm trong ổ cứng không trước khi đọc, giúp giảm disk I/O.
- Hệ thống đăng ký User check xem Username đã bị trùng chưa.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Bloom+Filter+Data+Structure'
  },
  {
    id: 'sd-20', category: 'System Design', difficulty: 'Medium',
    tags: ['System Design', 'Proxy'],
    question: 'Forward Proxy và Reverse Proxy khác nhau như thế nào?',
    answer: `
- **Forward Proxy:** Đứng trước **Client**. Nó đại diện cho client để gửi request ra Internet. *Mục đích:* Vượt tường lửa, ẩn IP của client (VPN), cache nội dung cho mạng nội bộ. (Internet không biết client là ai).
- **Reverse Proxy:** Đứng trước **Server**. Nó đại diện cho server để nhận request từ Internet. *Mục đích:* Load Balancing, SSL Termination, bảo mật (giấu IP của server thật), cache. (Client không biết server thật là ai). Nginx và HAProxy thường làm Reverse Proxy.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Forward+Proxy+vs+Reverse+Proxy'
  },

  // ================= CI/CD & DevOps (1-10) =================
  {
    id: 'cicd-1', category: 'DevOps', difficulty: 'Easy',
    tags: ['CI/CD', 'Concepts'],
    question: 'CI/CD là viết tắt của từ gì? Giải thích ngắn gọn.',
    answer: `
- **CI (Continuous Integration - Tích hợp liên tục):** Quá trình tự động build và chạy test mỗi khi developer push code lên Git. Giúp phát hiện lỗi (bug) sớm nhất có thể.
- **CD (Continuous Delivery / Deployment - Phân phối / Triển khai liên tục):** 
  - *Delivery:* Tự động đóng gói code đã test thành Artifact (VD: Docker image) sẵn sàng để deploy, nhưng việc bấm nút deploy lên Production vẫn làm thủ công.
  - *Deployment:* Tự động deploy thẳng lên Production mà không cần con người can thiệp.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=CI/CD+Pipeline+Flow'
  },
  {
    id: 'cicd-2', category: 'DevOps', difficulty: 'Medium',
    tags: ['DevOps', 'Jenkins', 'GitLab CI'],
    question: 'Kể tên một số công cụ CI/CD phổ biến và sự khác biệt cơ bản?',
    answer: `
1. **Jenkins:** Mã nguồn mở, lâu đời nhất. Rất mạnh mẽ nhờ hệ sinh thái Plugin khổng lồ. *Nhược điểm:* Giao diện cũ, cấu hình phức tạp, tốn công bảo trì server Jenkins.
2. **GitLab CI/CD:** Tích hợp sẵn trong GitLab. Cấu hình bằng file \`.gitlab-ci.yml\`. Rất tiện lợi nếu dùng chung hệ sinh thái GitLab.
3. **GitHub Actions:** Tích hợp sẵn trong GitHub. Cấu hình bằng YAML. Dễ dùng, có chợ Actions phong phú do cộng đồng viết sẵn.
4. **CircleCI / TravisCI:** Các dịch vụ Cloud CI/CD, dễ setup, tốc độ build nhanh nhưng tốn phí khi dùng nhiều.
    `
  },
  {
    id: 'cicd-3', category: 'DevOps', difficulty: 'Medium',
    tags: ['DevOps', 'Deployment'],
    question: 'Blue-Green Deployment là gì?',
    answer: `
**Blue-Green Deployment** là chiến lược triển khai không gây gián đoạn (Zero-downtime).
1. Bạn có 2 môi trường giống hệt nhau: **Blue** (đang chạy bản cũ, nhận 100% traffic) và **Green** (đang rảnh).
2. Bạn deploy code mới lên môi trường **Green** và test nội bộ.
3. Khi mọi thứ OK, bạn chuyển cấu hình Load Balancer để trỏ 100% traffic từ Blue sang **Green**.
4. Nếu có lỗi, chỉ cần trỏ Load Balancer ngược lại Blue (Rollback tức thì). Môi trường Blue sau đó trở thành môi trường rảnh cho lần deploy tiếp theo.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Blue-Green+Deployment+Strategy'
  },
  {
    id: 'cicd-4', category: 'DevOps', difficulty: 'Medium',
    tags: ['DevOps', 'Deployment'],
    question: 'Canary Deployment khác gì với Blue-Green Deployment?',
    answer: `
- **Blue-Green:** Chuyển 100% user sang phiên bản mới cùng một lúc.
- **Canary:** Chuyển từ từ một lượng nhỏ user (VD: 5%) sang phiên bản mới. Nếu hệ thống ổn định (không có lỗi, CPU/RAM bình thường), tiếp tục tăng lên 20%, 50% rồi 100%. 
*Lợi ích:* Giảm thiểu rủi ro. Nếu bản mới có lỗi nghiêm trọng, chỉ 5% user bị ảnh hưởng thay vì 100% như Blue-Green.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Canary+Deployment+Strategy'
  },
  {
    id: 'cicd-5', category: 'DevOps', difficulty: 'Hard',
    tags: ['DevOps', 'Infrastructure as Code', 'Terraform'],
    question: 'Infrastructure as Code (IaC) là gì? Tại sao nên dùng Terraform?',
    answer: `
**IaC** là việc quản lý và cung cấp hạ tầng (Server, Network, Database) thông qua code (file cấu hình) thay vì click chuột thủ công trên giao diện Cloud.

**Terraform** là công cụ IaC phổ biến nhất vì:
1. **Cloud-agnostic:** Hỗ trợ mọi Cloud (AWS, GCP, Azure) bằng cùng một ngôn ngữ HCL (HashiCorp Configuration Language).
2. **Declarative:** Bạn chỉ cần khai báo "Tôi muốn 3 server", Terraform sẽ tự tính toán xem hiện tại có mấy server để tạo thêm hoặc xóa bớt (thông qua file \`terraform.tfstate\`).
3. Dễ dàng version control hạ tầng bằng Git.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Infrastructure+as+Code+(IaC)'
  },
  {
    id: 'cicd-6', category: 'DevOps', difficulty: 'Medium',
    tags: ['DevOps', 'GitOps', 'ArgoCD'],
    question: 'GitOps là gì?',
    answer: `
**GitOps** là sự tiến hóa của IaC và CI/CD, đặc biệt dành cho Kubernetes.
Nguyên tắc cốt lõi: **Git là nguồn chân lý duy nhất (Single Source of Truth).**
Thay vì CI pipeline chạy lệnh \`kubectl apply\` để đẩy code lên K8s (Push model), GitOps dùng một Agent (như **ArgoCD** hoặc **Flux**) chạy bên trong K8s. Agent này liên tục theo dõi Git repo (Pull model). Nếu file YAML trên Git thay đổi, Agent tự động kéo về và đồng bộ (sync) trạng thái của K8s cho khớp với Git.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=GitOps+Workflow+with+ArgoCD'
  },
  {
    id: 'cicd-7', category: 'DevOps', difficulty: 'Easy',
    tags: ['CI/CD', 'Testing'],
    question: 'Các loại Test thường có trong một CI Pipeline?',
    answer: `
Một CI Pipeline chuẩn thường chạy các loại test sau theo thứ tự:
1. **Linting & Code Analysis (SonarQube):** Quét lỗi cú pháp, format code, lỗ hổng bảo mật tĩnh (SAST).
2. **Unit Test:** Test các hàm/class nhỏ lẻ, độc lập (chạy cực nhanh).
3. **Integration Test:** Test sự kết nối giữa các module hoặc với Database (chạy chậm hơn).
4. **E2E Test (End-to-End):** Dùng tool như Cypress/Selenium giả lập thao tác người dùng trên trình duyệt (chạy chậm nhất).
    `
  },
  {
    id: 'cicd-8', category: 'DevOps', difficulty: 'Medium',
    tags: ['DevOps', 'Monitoring'],
    question: 'Prometheus và Grafana thường đi chung với nhau để làm gì?',
    answer: `
Đây là bộ đôi tiêu chuẩn cho **Monitoring & Alerting** (Giám sát và Cảnh báo).
- **Prometheus:** Là một Time-Series Database. Nó chủ động đi "kéo" (Pull) các chỉ số (Metrics như CPU, RAM, Request rate) từ các server/ứng dụng về và lưu trữ.
- **Grafana:** Là công cụ Data Visualization. Nó kết nối vào Prometheus, lấy data và vẽ thành các biểu đồ (Dashboards) trực quan, đẹp mắt.
- Prometheus cũng có Alertmanager để gửi tin nhắn (Slack, Email) khi CPU > 90%.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Prometheus+and+Grafana+Architecture'
  },
  {
    id: 'cicd-9', category: 'DevOps', difficulty: 'Hard',
    tags: ['DevOps', 'Containers'],
    question: 'Docker Image Layer Caching hoạt động như thế nào trong CI?',
    answer: `
Mỗi lệnh trong \`Dockerfile\` (RUN, COPY) tạo ra một Layer. Docker sẽ cache các layer này.
Khi build lại, nếu một layer không đổi, Docker sẽ dùng lại cache (rất nhanh). Nếu một layer bị đổi (VD: sửa code), TẤT CẢ các layer bên dưới nó sẽ bị mất cache và phải build lại.
**Tối ưu trong CI:**
Luôn \`COPY package.json\` và chạy \`npm install\` TRƯỚC KHI \`COPY .\` (toàn bộ source code). Vì source code thay đổi liên tục, nếu để lên trên sẽ làm mất cache của bước \`npm install\` (rất tốn thời gian).
    `
  },
  {
    id: 'cicd-10', category: 'DevOps', difficulty: 'Medium',
    tags: ['DevOps', 'Security'],
    question: 'DevSecOps là gì?',
    answer: `
**DevSecOps** = Development + Security + Operations.
Thay vì để team Security kiểm tra bảo mật ở bước cuối cùng trước khi release (rất chậm và tốn kém nếu phải sửa lại), DevSecOps tích hợp các công cụ kiểm tra bảo mật tự động vào **mọi giai đoạn** của CI/CD Pipeline.
*Ví dụ:* Quét secret bị lộ trên Git (TruffleHog), quét lỗ hổng thư viện (Snyk), quét lỗ hổng Docker image (Trivy) ngay trong lúc CI đang build. "Shift-Left Security" (Đẩy bảo mật về bên trái - làm càng sớm càng tốt).
    `
  }
];
