import { Question } from './data';

export const questions4: Question[] = [
  // ================= OBSERVABILITY & MONITORING =================
  {
    id: 'obs-1', category: 'Monitoring', difficulty: 'Easy',
    tags: ['Observability', 'Monitoring'],
    question: 'Khái niệm Observability (Tính quan sát được) là gì? Khác gì với Monitoring?',
    answer: `
### 1. Monitoring (Giám sát)
- Là việc thu thập, phân tích và hiển thị dữ liệu để biết **"Hệ thống có đang hoạt động bình thường không?"** (Ví dụ: CPU có đang 100% không? Có bao nhiêu lỗi 500?).
- Tập trung vào các **triệu chứng** (symptoms) đã biết trước.

### 2. Observability (Tính quan sát được)
- Là khả năng hiểu được trạng thái bên trong của hệ thống dựa trên dữ liệu đầu ra (logs, metrics, traces).
- Trả lời câu hỏi **"TẠI SAO hệ thống lại bị lỗi?"** (Ví dụ: Tại sao CPU lại 100%? Request nào gây ra lỗi 500?).
- Giúp giải quyết các vấn đề **chưa biết trước** (unknown unknowns) trong các hệ thống phân tán phức tạp (Microservices).

*Tóm lại: Monitoring cho bạn biết hệ thống đang hỏng, Observability giúp bạn tìm ra nguyên nhân tại sao nó hỏng.*
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Observability+vs+Monitoring'
  },
  {
    id: 'obs-2', category: 'Monitoring', difficulty: 'Medium',
    tags: ['Observability', 'Metrics', 'Logs', 'Traces'],
    question: 'Ba trụ cột của Observability (Three Pillars of Observability) là gì?',
    answer: `
### 1. Metrics (Chỉ số)
- Là các dữ liệu số học được đo lường theo thời gian (Time-series data).
- *Ví dụ:* CPU usage (%), Memory usage (MB), Request rate (req/s), Error rate (%).
- *Đặc điểm:* Rất nhẹ, dễ lưu trữ, dùng để cảnh báo (Alerting) và vẽ biểu đồ (Dashboards).

### 2. Logs (Nhật ký)
- Là các bản ghi văn bản mô tả các sự kiện đã xảy ra trong hệ thống, thường kèm theo timestamp.
- *Ví dụ:* \`2023-10-27 10:00:00 ERROR [UserService] Failed to connect to DB\`.
- *Đặc điểm:* Cung cấp ngữ cảnh chi tiết nhất để debug, nhưng tốn nhiều dung lượng lưu trữ.

### 3. Traces (Dấu vết)
- Ghi lại toàn bộ hành trình của một request khi nó đi qua nhiều dịch vụ (Microservices) khác nhau.
- *Ví dụ:* Request từ Client -> API Gateway -> User Service -> DB.
- *Đặc điểm:* Giúp tìm ra "nút thắt cổ chai" (bottleneck) về hiệu năng và hiểu được luồng giao tiếp giữa các services.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Three+Pillars:+Metrics,+Logs,+Traces'
  },
  {
    id: 'obs-3', category: 'Monitoring', difficulty: 'Medium',
    tags: ['Prometheus', 'Architecture'],
    question: 'Prometheus hoạt động theo mô hình nào? (Pull vs Push)',
    answer: `
Prometheus hoạt động chủ yếu theo mô hình **Pull Model**.

### 1. Pull Model (Mô hình Kéo)
- Prometheus Server sẽ chủ động định kỳ (ví dụ: mỗi 15 giây) gọi HTTP GET đến một endpoint (thường là \`/metrics\`) của các ứng dụng (Targets) để "kéo" dữ liệu metrics về.
- *Ưu điểm:*
  - Dễ dàng phát hiện ứng dụng bị chết (nếu không pull được tức là app có vấn đề).
  - Ứng dụng không cần biết IP của Prometheus Server (giảm coupling).
  - Tránh việc Prometheus bị quá tải (DDoS) nếu có quá nhiều ứng dụng cùng push dữ liệu một lúc.

### 2. Pushgateway (Ngoại lệ)
- Đối với các tác vụ chạy trong thời gian rất ngắn (Short-lived jobs, ví dụ: cronjob chạy 2 giây là xong), Prometheus chưa kịp pull thì job đã tắt.
- Lúc này, job sẽ chủ động **Push** metrics lên một thành phần trung gian gọi là **Pushgateway**, sau đó Prometheus sẽ pull từ Pushgateway về.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Prometheus+Pull+Model'
  },
  {
    id: 'obs-4', category: 'Monitoring', difficulty: 'Hard',
    tags: ['Distributed Tracing', 'Microservices'],
    question: 'Distributed Tracing hoạt động như thế nào trong Microservices?',
    answer: `
Distributed Tracing giúp theo dõi một request đi qua nhiều services. Nó hoạt động dựa trên 2 khái niệm chính: **Trace ID** và **Span ID**.

### Cách hoạt động:
1. Khi một request từ Client chạm vào service đầu tiên (ví dụ: API Gateway), hệ thống sẽ tạo ra một **Trace ID** duy nhất.
2. Tại mỗi service mà request đi qua, một **Span** được tạo ra (đại diện cho một đơn vị công việc, có thời gian bắt đầu và kết thúc). Mỗi Span có một **Span ID** riêng biệt.
3. Service hiện tại sẽ truyền **Trace ID** và **Span ID** của nó (gọi là Parent Span ID) sang service tiếp theo thông qua HTTP Headers (ví dụ: \`X-B3-TraceId\`, \`X-B3-SpanId\`).
4. Các công cụ (như Jaeger, Zipkin) sẽ thu thập tất cả các Spans này, nhóm chúng lại theo Trace ID và vẽ ra một biểu đồ dạng cây (Gantt chart) cho thấy toàn bộ vòng đời của request.

*Lợi ích:* Giúp lập trình viên nhìn thấy ngay service nào đang làm chậm toàn bộ request.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Distributed+Tracing+TraceID+SpanID'
  },
  {
    id: 'obs-5', category: 'Monitoring', difficulty: 'Medium',
    tags: ['SRE', 'SLI', 'SLO', 'SLA'],
    question: 'Sự khác biệt giữa SLI, SLO và SLA là gì?',
    answer: `
Đây là các thuật ngữ cốt lõi trong SRE (Site Reliability Engineering) do Google định nghĩa.

### 1. SLI (Service Level Indicator - Chỉ số)
- Là một phép đo lường thực tế về hiệu năng của dịch vụ.
- *Ví dụ:* Tỉ lệ HTTP 200 OK trên tổng số request là **99.85%**. Thời gian phản hồi trung bình là **120ms**.

### 2. SLO (Service Level Objective - Mục tiêu)
- Là mục tiêu nội bộ mà team kỹ thuật đặt ra cho SLI.
- *Ví dụ:* Chúng ta đặt mục tiêu tỉ lệ HTTP 200 OK phải đạt **>= 99.9%** trong tháng này. Nếu SLI rớt xuống dưới SLO, team phải ngừng làm tính năng mới và tập trung sửa lỗi (Error Budget bị cạn).

### 3. SLA (Service Level Agreement - Cam kết)
- Là hợp đồng pháp lý giữa nhà cung cấp dịch vụ và khách hàng.
- *Ví dụ:* Cam kết hệ thống uptime **99.9%**. Nếu tháng này hệ thống chỉ đạt 99.0%, chúng tôi sẽ **đền bù** cho bạn 10% phí dịch vụ.
- *Lưu ý:* SLO luôn phải khắt khe hơn SLA (ví dụ SLO là 99.99% để đảm bảo SLA 99.9% không bị vi phạm).
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=SLI+vs+SLO+vs+SLA'
  },

  // ================= AI & MACHINE LEARNING =================
  {
    id: 'ai-1', category: 'AI & ML', difficulty: 'Easy',
    tags: ['AI', 'Machine Learning', 'Deep Learning'],
    question: 'Phân biệt AI, Machine Learning và Deep Learning?',
    answer: `
Đây là 3 khái niệm lồng nhau, từ rộng đến hẹp:

### 1. Artificial Intelligence (AI - Trí tuệ nhân tạo)
- Là khái niệm rộng nhất, chỉ bất kỳ kỹ thuật nào giúp máy tính bắt chước trí thông minh của con người (như suy luận, học tập, giải quyết vấn đề).
- *Ví dụ:* Một con bot chơi cờ vua dùng các quy tắc if-else phức tạp cũng là AI.

### 2. Machine Learning (ML - Học máy)
- Là một tập con của AI. Thay vì lập trình các quy tắc if-else tĩnh, ta cung cấp **Dữ liệu (Data)** cho máy tính để nó tự tìm ra quy luật (Học).
- *Ví dụ:* Thuật toán dự đoán giá nhà dựa trên diện tích và vị trí (Linear Regression).

### 3. Deep Learning (DL - Học sâu)
- Là một tập con của ML, sử dụng các **Mạng nơ-ron nhân tạo (Artificial Neural Networks)** với nhiều lớp (Deep) để mô phỏng cách não bộ con người hoạt động.
- Cần lượng dữ liệu khổng lồ và sức mạnh tính toán lớn (GPU).
- *Ví dụ:* Nhận diện khuôn mặt, ChatGPT, xe tự lái.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=AI+vs+ML+vs+Deep+Learning'
  },
  {
    id: 'ai-2', category: 'AI & ML', difficulty: 'Easy',
    tags: ['Machine Learning', 'Algorithms'],
    question: 'Supervised Learning vs Unsupervised Learning?',
    answer: `
### 1. Supervised Learning (Học có giám sát)
- Mô hình được huấn luyện trên tập dữ liệu **đã được gán nhãn (labeled data)**. Nghĩa là ta cung cấp cho máy cả câu hỏi (Input) và đáp án đúng (Output).
- *Mục tiêu:* Dự đoán nhãn cho dữ liệu mới.
- *Ví dụ:* Đưa cho máy 1000 ảnh chó (gắn nhãn "Chó") và 1000 ảnh mèo (gắn nhãn "Mèo"). Sau đó đưa ảnh mới, máy sẽ đoán là Chó hay Mèo (Classification). Hoặc dự đoán giá nhà (Regression).

### 2. Unsupervised Learning (Học không giám sát)
- Mô hình được huấn luyện trên tập dữ liệu **chưa được gán nhãn (unlabeled data)**. Máy phải tự tìm ra cấu trúc, quy luật ẩn bên trong dữ liệu.
- *Mục tiêu:* Phân nhóm hoặc giảm chiều dữ liệu.
- *Ví dụ:* Đưa cho máy thông tin mua hàng của 1 triệu khách hàng (không có nhãn gì cả). Máy tự động gom thành 3 nhóm: Khách thích đồ công nghệ, Khách thích thời trang, Khách thích đồ gia dụng (Clustering).
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Supervised+vs+Unsupervised+Learning'
  },
  {
    id: 'ai-3', category: 'AI & ML', difficulty: 'Medium',
    tags: ['Machine Learning', 'Overfitting'],
    question: 'Hiện tượng Overfitting là gì và cách khắc phục?',
    answer: `
### 1. Overfitting là gì?
Overfitting (Học vẹt/Quá khớp) xảy ra khi mô hình học **quá kỹ** các chi tiết và nhiễu (noise) của tập dữ liệu huấn luyện (Training data). 
- *Hậu quả:* Mô hình dự đoán cực kỳ chính xác trên tập dữ liệu huấn luyện, nhưng lại dự đoán **rất tệ** trên dữ liệu thực tế mới (Test data). Nó mất đi khả năng tổng quát hóa (Generalization).

### 2. Cách khắc phục
- **Thêm dữ liệu (More data):** Cung cấp nhiều dữ liệu đa dạng hơn để mô hình học được quy luật chung.
- **Data Augmentation:** Tạo thêm dữ liệu giả từ dữ liệu thật (ví dụ: xoay ảnh, lật ảnh, thêm nhiễu).
- **Regularization (L1/L2):** Thêm hình phạt (penalty) vào hàm mất mát để ngăn các trọng số (weights) trở nên quá lớn.
- **Dropout (trong Deep Learning):** Ngẫu nhiên tắt một số nơ-ron trong quá trình huấn luyện để ép mạng nơ-ron không phụ thuộc vào một vài nơ-ron cụ thể.
- **Early Stopping:** Dừng quá trình huấn luyện sớm khi độ lỗi trên tập Validation bắt đầu tăng lên.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Overfitting+vs+Underfitting'
  },
  {
    id: 'ai-4', category: 'AI & ML', difficulty: 'Hard',
    tags: ['LLM', 'RAG', 'Generative AI'],
    question: 'RAG (Retrieval-Augmented Generation) trong LLM là gì?',
    answer: `
### 1. Vấn đề của LLM (như ChatGPT)
- **Ảo giác (Hallucination):** LLM có thể bịa ra câu trả lời sai một cách rất tự tin.
- **Kiến thức lỗi thời:** LLM chỉ biết thông tin tính đến thời điểm nó được huấn luyện (ví dụ: đến năm 2023).
- **Không có dữ liệu nội bộ:** LLM không biết dữ liệu mật của công ty bạn.

### 2. Giải pháp RAG
**RAG (Sinh văn bản tăng cường truy xuất)** kết hợp khả năng ngôn ngữ của LLM với một cơ sở dữ liệu tìm kiếm bên ngoài.

*Cách hoạt động:*
1. **Retrieval (Truy xuất):** Khi user đặt câu hỏi, hệ thống không gọi LLM ngay. Nó sẽ tìm kiếm trong Database nội bộ (thường là Vector Database) để lấy ra các tài liệu liên quan nhất đến câu hỏi.
2. **Augmented (Tăng cường):** Hệ thống ghép câu hỏi của user + các tài liệu vừa tìm được thành một Prompt lớn (Context).
3. **Generation (Sinh văn bản):** Gửi Prompt lớn đó cho LLM. LLM sẽ đọc tài liệu được cung cấp và sinh ra câu trả lời chính xác, trích dẫn đúng nguồn.

*Lợi ích:* Cập nhật kiến thức realtime, giảm ảo giác, bảo mật dữ liệu nội bộ.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=RAG+Architecture+Diagram'
  },
  {
    id: 'ai-5', category: 'AI & ML', difficulty: 'Medium',
    tags: ['Vector Database', 'Embeddings'],
    question: 'Vector Database là gì và tại sao nó quan trọng cho AI hiện nay?',
    answer: `
### 1. Vector Embeddings là gì?
Trong AI, máy tính không hiểu văn bản (text) hay hình ảnh. Chúng ta phải chuyển đổi chúng thành các mảng số thực (gọi là Vector Embeddings). 
- Các từ/câu có ý nghĩa giống nhau sẽ có các Vector nằm gần nhau trong không gian nhiều chiều. (Ví dụ: vector của "Chó" sẽ gần với "Mèo" hơn là "Ô tô").

### 2. Vector Database là gì?
Là loại cơ sở dữ liệu được thiết kế chuyên biệt để lưu trữ, quản lý và tìm kiếm các Vector Embeddings này với tốc độ cực nhanh.
- *Ví dụ:* Pinecone, Milvus, Qdrant, pgvector.

### 3. Tại sao nó quan trọng?
Cơ sở dữ liệu truyền thống (SQL/NoSQL) tìm kiếm theo **từ khóa chính xác (Keyword match)**. 
Vector Database tìm kiếm theo **ngữ nghĩa (Semantic search)**.
- Nếu bạn tìm "Điện thoại Apple", DB truyền thống chỉ tìm từ chứa chữ "Apple". Vector DB sẽ hiểu ngữ nghĩa và trả về cả "iPhone" dù trong văn bản không có chữ "Apple".
- Đây là thành phần cốt lõi để xây dựng hệ thống RAG (Retrieval-Augmented Generation) cho các ứng dụng LLM.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Vector+Database+Embeddings'
  },

  // ================= SECURITY =================
  {
    id: 'sec-1', category: 'Security', difficulty: 'Easy',
    tags: ['Security', 'SQL Injection'],
    question: 'SQL Injection là gì và cách phòng chống?',
    answer: `
### 1. SQL Injection là gì?
Là lỗ hổng bảo mật xảy ra khi ứng dụng web cho phép người dùng nhập dữ liệu trực tiếp vào câu lệnh SQL mà không qua kiểm tra. Hacker có thể chèn các đoạn mã SQL độc hại để thao túng database.

*Ví dụ:* Câu lệnh đăng nhập: \`SELECT * FROM users WHERE username = '\$user' AND password = '\$pass'\`
Nếu hacker nhập username là: \`admin' --\`
Câu lệnh trở thành: \`SELECT * FROM users WHERE username = 'admin' -- AND password = '...'\`
(Dấu \`--\` comment bỏ phần check password, hacker đăng nhập thành công không cần pass).

### 2. Cách phòng chống
- **Sử dụng Prepared Statements (Parameterized Queries):** Đây là cách hiệu quả nhất. Database sẽ biên dịch câu SQL trước, sau đó mới truyền tham số vào như một giá trị thuần túy, không thể bị thực thi như mã lệnh.
- **Sử dụng ORM (Object-Relational Mapping):** Các ORM hiện đại (như Prisma, Hibernate) tự động xử lý escape dữ liệu.
- **Validate và Sanitize Input:** Kiểm tra chặt chẽ dữ liệu đầu vào (chỉ cho phép số, email hợp lệ...).
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=SQL+Injection+Explained'
  },
  {
    id: 'sec-2', category: 'Security', difficulty: 'Easy',
    tags: ['Security', 'XSS'],
    question: 'XSS (Cross-Site Scripting) là gì?',
    answer: `
### 1. XSS là gì?
XSS là lỗ hổng cho phép hacker chèn các đoạn mã script độc hại (thường là JavaScript) vào trang web của bạn. Khi người dùng khác truy cập trang web, đoạn script đó sẽ chạy trên trình duyệt của họ.

*Mục đích của hacker:* Đánh cắp Cookie/Session Token, tự động thực hiện hành động thay mặt người dùng, hoặc chuyển hướng trang web.

### 2. Các loại XSS
- **Stored XSS:** Script độc hại được lưu vĩnh viễn trên database (ví dụ: trong một bình luận). Ai vào đọc bình luận cũng bị dính.
- **Reflected XSS:** Script độc hại nằm trong URL. Hacker lừa nạn nhân click vào link chứa mã độc.
- **DOM-based XSS:** Lỗ hổng xảy ra hoàn toàn ở phía Client-side (JavaScript xử lý dữ liệu từ URL/Input không an toàn).

### 3. Cách phòng chống
- **Escape/Encode Output:** Luôn mã hóa dữ liệu trước khi hiển thị ra HTML (chuyển \`<\` thành \`&lt;\`). Các framework như React/Angular tự động làm việc này.
- **Sử dụng Content Security Policy (CSP):** Cấu hình HTTP Header để chỉ cho phép chạy script từ các domain tin cậy.
- **Set cờ HttpOnly cho Cookie:** Ngăn chặn JavaScript (và XSS) đọc được Cookie chứa Session ID.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Cross-Site+Scripting+(XSS)'
  },
  {
    id: 'sec-3', category: 'Security', difficulty: 'Medium',
    tags: ['Security', 'CSRF'],
    question: 'CSRF (Cross-Site Request Forgery) là gì và cách ngăn chặn?',
    answer: `
### 1. CSRF là gì?
CSRF (Giả mạo yêu cầu chéo trang) là kiểu tấn công lừa trình duyệt của người dùng thực hiện một hành động không mong muốn trên một trang web mà họ **đang đăng nhập**.

*Kịch bản:*
1. Bạn đang đăng nhập vào \`nganhang.com\`. Trình duyệt lưu Cookie xác thực.
2. Bạn vô tình vào trang web của hacker \`hacker.com\`.
3. Trang \`hacker.com\` ngầm gửi một request POST đến \`nganhang.com/chuyen-tien?den=hacker&so_tien=1000\`.
4. Trình duyệt tự động đính kèm Cookie của \`nganhang.com\` vào request này. Ngân hàng thấy Cookie hợp lệ nên thực hiện chuyển tiền!

### 2. Cách ngăn chặn
- **Anti-CSRF Tokens (Synchronizer Token Pattern):** Server tạo ra một chuỗi token ngẫu nhiên, duy nhất cho mỗi session và nhúng vào form HTML (hidden field). Khi submit form, server kiểm tra token này. Trang \`hacker.com\` không thể đọc được token này do chính sách Same-Origin Policy (SOP).
- **SameSite Cookie Attribute:** Set thuộc tính \`SameSite=Lax\` hoặc \`Strict\` cho Cookie. Trình duyệt sẽ không gửi Cookie nếu request xuất phát từ một domain khác.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=CSRF+Attack+Flow'
  },
  {
    id: 'sec-4', category: 'Security', difficulty: 'Medium',
    tags: ['Security', 'JWT', 'Auth'],
    question: 'JWT (JSON Web Token) là gì? Cấu trúc của JWT?',
    answer: `
### 1. JWT là gì?
JWT là một tiêu chuẩn mở (RFC 7519) định nghĩa cách truyền thông tin an toàn giữa các bên dưới dạng một đối tượng JSON. Thông tin này có thể được xác minh và tin cậy vì nó được **ký điện tử** (Digital Signature). Thường dùng cho Authentication (Stateless).

### 2. Cấu trúc của JWT
Gồm 3 phần ngăn cách nhau bởi dấu chấm (\`.\`): \`Header.Payload.Signature\`

1. **Header:** Chứa loại token (JWT) và thuật toán ký (ví dụ: HMAC SHA256 hoặc RSA).
2. **Payload (Claims):** Chứa các thông tin cần truyền đi (ví dụ: \`user_id\`, \`role\`, \`exp\` - thời gian hết hạn). *Lưu ý: Phần này chỉ được mã hóa Base64Url, ai cũng có thể giải mã và đọc được, KHÔNG lưu mật khẩu ở đây.*
3. **Signature (Chữ ký):** Được tạo ra bằng cách lấy \`Header\` + \`Payload\` + một **Secret Key** (chỉ server biết) băm qua thuật toán. Dùng để đảm bảo token không bị sửa đổi trên đường truyền.

### 3. Ưu nhược điểm
- *Ưu điểm:* Stateless (Server không cần lưu session trong DB/Redis), dễ scale, phù hợp cho Microservices.
- *Nhược điểm:* Không thể thu hồi (revoke) token ngay lập tức trước khi nó hết hạn (trừ khi dùng blacklist). Payload lớn tốn băng thông.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=JWT+Structure:+Header.Payload.Signature'
  },
  {
    id: 'sec-5', category: 'Security', difficulty: 'Medium',
    tags: ['Security', 'CORS'],
    question: 'CORS (Cross-Origin Resource Sharing) là gì?',
    answer: `
### 1. Same-Origin Policy (SOP)
Trình duyệt web có một cơ chế bảo mật cốt lõi gọi là SOP. Nó ngăn chặn JavaScript từ một trang web (ví dụ: \`domain-a.com\`) gọi API đến một trang web khác (ví dụ: \`api.domain-b.com\`). 
Hai URL được coi là "Same-Origin" nếu chúng giống nhau cả 3 yếu tố: **Protocol (http/https)**, **Domain**, và **Port**.

### 2. CORS là gì?
CORS là một cơ chế cho phép máy chủ (Server) chỉ định những Domain nào khác được phép truy cập vào tài nguyên của nó, vượt qua rào cản của SOP.

### 3. Cách hoạt động
- Khi Frontend gọi API khác domain, trình duyệt sẽ tự động gửi một request "thăm dò" gọi là **Preflight Request** (dùng method \`OPTIONS\`).
- Server trả về các HTTP Headers (như \`Access-Control-Allow-Origin\`, \`Access-Control-Allow-Methods\`).
- Nếu trình duyệt thấy domain của Frontend nằm trong danh sách cho phép, nó mới gửi request thật (GET/POST) đi.

*Lỗi CORS:* Lỗi CORS xảy ra ở **Trình duyệt**, không phải ở Postman hay cURL. Để sửa lỗi, Backend phải cấu hình trả về đúng các header CORS.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=CORS+Preflight+Request'
  },

  // ================= DATA STRUCTURES & ALGORITHMS =================
  {
    id: 'dsa-1', category: 'DSA', difficulty: 'Easy',
    tags: ['DSA', 'Array', 'Linked List'],
    question: 'So sánh Array (Mảng) và Linked List (Danh sách liên kết)?',
    answer: `
### 1. Array (Mảng)
- **Lưu trữ:** Các phần tử được lưu trữ ở các ô nhớ **liên tiếp nhau** trong RAM.
- **Truy cập (Read):** Cực nhanh \`O(1)\` vì có thể tính toán ngay địa chỉ ô nhớ dựa vào Index.
- **Thêm/Xóa (Insert/Delete):** Chậm \`O(n)\` (nếu ở đầu hoặc giữa mảng) vì phải dịch chuyển tất cả các phần tử phía sau.
- **Kích thước:** Thường cố định (Static Array) hoặc phải cấp phát lại vùng nhớ mới lớn hơn (Dynamic Array).

### 2. Linked List (Danh sách liên kết)
- **Lưu trữ:** Các phần tử (Node) nằm rải rác trong RAM. Mỗi Node chứa Data và một Con trỏ (Pointer) trỏ đến Node tiếp theo.
- **Truy cập (Read):** Chậm \`O(n)\` vì phải duyệt từ phần tử đầu tiên (Head) dọc theo các con trỏ.
- **Thêm/Xóa (Insert/Delete):** Nhanh \`O(1)\` (nếu đã biết vị trí) vì chỉ cần thay đổi con trỏ, không cần dịch chuyển dữ liệu.
- **Kích thước:** Linh hoạt, có thể phình to thu nhỏ dễ dàng.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Array+vs+Linked+List'
  },
  {
    id: 'dsa-2', category: 'DSA', difficulty: 'Medium',
    tags: ['DSA', 'Hash Table'],
    question: 'Hash Table (Bảng băm) hoạt động như thế nào? Xử lý đụng độ (Collision) ra sao?',
    answer: `
### 1. Hash Table là gì?
Là cấu trúc dữ liệu lưu trữ theo cặp Key-Value, cho phép thao tác Thêm/Xóa/Tìm kiếm với tốc độ trung bình là **O(1)**.

### 2. Cách hoạt động
1. Đưa \`Key\` qua một **Hash Function (Hàm băm)**.
2. Hàm băm trả về một số nguyên (Hash code).
3. Dùng phép chia lấy dư (\`Hash code % Kích thước mảng\`) để xác định **Index** lưu trữ trong mảng.
4. Lưu \`Value\` vào vị trí Index đó.

### 3. Xử lý đụng độ (Collision)
Đụng độ xảy ra khi 2 Key khác nhau nhưng hàm băm lại trả về cùng một Index. Có 2 cách xử lý chính:
- **Chaining (Separate Chaining):** Tại mỗi Index của mảng, thay vì lưu 1 giá trị, ta lưu một Linked List. Nếu đụng độ, cứ nối thêm vào cuối Linked List đó.
- **Open Addressing:** Nếu vị trí Index đã bị chiếm, thuật toán sẽ đi tìm một ô trống khác trong mảng (ví dụ: Linear Probing - tìm ô trống ngay kế tiếp).
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Hash+Table+Collision+Resolution'
  },
  {
    id: 'dsa-3', category: 'DSA', difficulty: 'Medium',
    tags: ['DSA', 'Trees'],
    question: 'Binary Search Tree (BST - Cây tìm kiếm nhị phân) là gì?',
    answer: `
### 1. Đặc điểm của BST
Là một cây nhị phân (mỗi node có tối đa 2 node con) tuân thủ quy tắc cực kỳ nghiêm ngặt:
- Giá trị của TẤT CẢ các node ở **nhánh bên trái** phải **nhỏ hơn** giá trị của node cha.
- Giá trị của TẤT CẢ các node ở **nhánh bên phải** phải **lớn hơn** giá trị của node cha.
- Không có 2 node nào có giá trị trùng nhau.

### 2. Độ phức tạp thời gian
- **Trung bình (Cây cân bằng):** Tìm kiếm, Thêm, Xóa đều mất **O(log n)**. Mỗi lần so sánh ta loại bỏ được một nửa số node.
- **Trường hợp xấu nhất (Cây bị lệch - Skewed Tree):** Cây biến thành một Linked List (ví dụ insert liên tục 1, 2, 3, 4, 5). Lúc này độ phức tạp là **O(n)**.
- *Giải pháp:* Sử dụng các cây tự cân bằng như AVL Tree hoặc Red-Black Tree.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Binary+Search+Tree+(BST)'
  },
  {
    id: 'dsa-4', category: 'DSA', difficulty: 'Easy',
    tags: ['DSA', 'Stack', 'Queue'],
    question: 'Sự khác biệt giữa Stack và Queue?',
    answer: `
### 1. Stack (Ngăn xếp)
- Hoạt động theo nguyên tắc **LIFO (Last In, First Out)** - Vào sau, Ra trước.
- Giống như một chồng đĩa: Đĩa nào đặt lên sau cùng sẽ được lấy ra đầu tiên.
- Các thao tác chính: \`Push\` (Thêm vào đỉnh), \`Pop\` (Lấy ra từ đỉnh).
- *Ứng dụng:* Nút Back của trình duyệt, Undo/Redo, Call Stack trong lập trình.

### 2. Queue (Hàng đợi)
- Hoạt động theo nguyên tắc **FIFO (First In, First Out)** - Vào trước, Ra trước.
- Giống như xếp hàng mua vé: Ai đến trước mua trước.
- Các thao tác chính: \`Enqueue\` (Thêm vào cuối hàng), \`Dequeue\` (Lấy ra từ đầu hàng).
- *Ứng dụng:* Message Queue (RabbitMQ), Xử lý request của Web Server, Lập lịch CPU.
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Stack+(LIFO)+vs+Queue+(FIFO)'
  },
  {
    id: 'dsa-5', category: 'DSA', difficulty: 'Easy',
    tags: ['DSA', 'Big O'],
    question: 'Độ phức tạp thời gian (Time Complexity) Big O Notation là gì?',
    answer: `
**Big O Notation** là cách dùng toán học để mô tả **tốc độ thực thi của thuật toán sẽ tăng lên như thế nào** khi kích thước dữ liệu đầu vào (n) tăng lên. Nó quan tâm đến trường hợp xấu nhất (Worst-case).

Các độ phức tạp phổ biến (từ nhanh nhất đến chậm nhất):
1. **O(1) - Constant:** Thời gian chạy luôn cố định dù n có là 1 hay 1 tỷ. (Ví dụ: Truy cập phần tử mảng bằng index).
2. **O(log n) - Logarithmic:** Rất nhanh. Khi n tăng gấp đôi, thời gian chỉ tăng thêm 1 bước. (Ví dụ: Binary Search).
3. **O(n) - Linear:** Thời gian tăng tuyến tính cùng n. (Ví dụ: Vòng lặp for duyệt qua mảng).
4. **O(n log n):** Thường thấy ở các thuật toán sắp xếp tốt nhất (Merge Sort, Quick Sort).
5. **O(n^2) - Quadratic:** Chậm. Thường là 2 vòng lặp lồng nhau (Bubble Sort).
6. **O(2^n) - Exponential:** Cực kỳ chậm, thuật toán đệ quy không tối ưu (Fibonacci đệ quy).
    `,
    imageUrl: 'https://placehold.co/800x400/e2e8f0/1e293b?text=Big+O+Complexity+Chart'
  }
];
