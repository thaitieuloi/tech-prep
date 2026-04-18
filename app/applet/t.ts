import * as fs from 'fs';

const path = 'public/architecture.html';
let html = fs.readFileSync(path, 'utf8');

const t2 = [
  {
    en: "Cloudflare's Anycast routes each DNS query to the geographically closest PoP. Cache-hit ratio &gt;90% for static assets means the origin never sees most requests — critical for global fleet management apps serving drivers across 50+ cities.",
    vi: "Cloudflare Anycast định tuyến truy vấn đến PoP gần nhất. Cache-hit >90% giúp giảm tải hoàn toàn cho origin server — cốt lõi để scale ứng dụng quản lý xe trên 50+ thành phố."
  },
  {
    en: "WAF at the edge means malicious traffic is dropped at Cloudflare's PoP — never consuming backend compute. This is far more cost-effective than WAF behind the load balancer.",
    vi: "WAF tại edge chặn traffic độc hại ngay tại PoP của Cloudflare — không bao giờ chạm đến backend. Việc này tiết kiệm chi phí compute hơn rất nhiều so với đặt WAF sau Load Balancer."
  },
  {
    en: "Workers use V8 isolates (not containers) — startup in &lt;1ms vs 50–500ms for Lambda cold starts. Ideal for auth pre-checks: reject invalid tokens before they consume API Gateway capacity.",
    vi: "Workers dùng V8 isolates (không phải container) — khởi động <1ms so với 50–500ms của Lambda cold start. Lý tưởng cho auth pre-checks: chặn token sai trước đỉnh API Gateway."
  },
  {
    en: "R2 vs S3: R2 has zero egress fees — critical when streaming dashcam footage to investigators. At 1TB/month egress, R2 saves ~$90/month vs S3 Standard.",
    vi: "R2 so với S3: R2 miễn phí egress — cực kỳ quan trọng khi stream video dashcam. Với 1TB/tháng, R2 tiết kiệm ~$90/tháng so sánh S3 Standard."
  },
  {
    en: "Static secrets in env vars are a vulnerability — they're long-lived and hard to rotate. Vault issues dynamic credentials: a DB password valid for 1 hour. Even if leaked, it's useless in 60 minutes.",
    vi: "Lưu secret trong env vars là rủi ro vì chúng sống lâu và khó xoay vòng. Vault cấp dynamic credentials: VD password DB chỉ sống 1 giờ. Dù bị lộ, nó sẽ vô dụng sau 60 phút."
  },
  {
    en: "mTLS means a compromised internal service cannot impersonate another — it must present a valid certificate. Combined with SPIFFE workload identity, each pod has a cryptographic identity, not just a network IP.",
    vi: "mTLS đảm bảo một service bị hack không thể giả mạo service khác — nó phải có chứng chỉ. Kết hợp SPIFFE, mỗi pod có định danh mã hóa không chỉ IP mạng."
  },
  {
    en: "GDPR Article 17 (right to erasure): when a driver requests deletion, we run a data erasure job that removes all records keyed to their vehicle_id across Cassandra, PostgreSQL, MongoDB, and S3 — with a compliance receipt generated.",
    vi: "GDPR Điều 17: khi yêu cầu xóa, chạy job xóa toàn bộ dữ liệu theo vehicle_id trên Cassandra, Postgres, Mongo và S3 — xuất hóa đơn tuân thủ."
  },
  {
    en: "Shared API keys for IoT devices are dangerous — one compromised key affects the whole fleet. Per-device X.509 certs mean revocation is surgical: one cert in the CRL, that device is silenced, others continue normally.",
    vi: "Dùng chung API key cho IoT rất nguy hiểm. X.509 cert cấp từng thiết bị giúp thu hồi chính xác: 1 cert vào CRL, thiết bị đó bị chặn, còn lại bình thường."
  },
  {
    en: "Kong in DB-less mode uses declarative config (YAML) — GitOps-friendly, no DB dependency, faster restart. Canary routing by weight lets us shift 5% traffic to a new service version, monitor error rate, then promote or rollback.",
    vi: "Kong DB-less dùng file YAML — chuẩn GitOps, không phụ thuộc DB. Canary routing đẩy 5% traffic sang bản mới, theo dõi lỗi để promote/rollback."
  },
  {
    en: "JWT claims embed tenant_id and role. The Gateway validates the token signature locally (no round-trip to Auth Service on every request) — adds only ~0.2ms latency vs ~20ms for introspection.",
    vi: "JWT chứa sẵn tenant_id/role. API Gateway check signature nội bộ (không gọi Auth Service mỗi request) — tốn ~0.2ms so với ~20ms introspection."
  },
  {
    en: "WebSocket connections are long-lived — round-robin breaks them. Least-connection algorithm keeps existing connections on the same pod. On pod shutdown, a 30s graceful drain lets active WebSockets migrate before the pod dies.",
    vi: "WebSocket sống rất lâu. Thuật toán Least-connection giữ kết nối ở cùng 1 pod. Khi pod tắt, cơ chế 30s graceful drain giúp kết nối chuyển pod."
  },
  {
    en: "Offline-first design: the app caches map tiles and hazard data locally. When connectivity drops (tunnel, dead zone), the driver still sees the last known hazard overlay — then syncs delta on reconnect.",
    vi: "Offline-first: app cache bản đồ/cảnh báo ở local. Khi mất sóng, tài xế vẫn thấy cảnh báo gần nhất — sau có mạng sẽ sync đồng bộ trở lại."
  },
  {
    en: "MapboxGL renders 100k+ vehicle markers using WebGL — pure DOM manipulation would crash the browser. Vector tiles from PostGIS serve only visible viewport, not the entire dataset.",
    vi: "MapboxGL dùng WebGL vẽ 100k+ xe — việc dùng DOM sẽ gây treo browser. Vector tiles từ PostGIS chỉ hiển thị khu vực màn hình chứ không tải toàn bộ."
  },
  {
    en: "QoS 2 = exactly-once delivery but high overhead. We use QoS 1 (at-least-once) with deduplication at the broker — better throughput with acceptable duplicate handling via Redis idempotency key.",
    vi: "QoS 2 tốn rất nhiều overhead. Dùng QoS 1 kèm deduplication ở broker tăng throughput, xử lý trùng lặp nhẹ nhàng bằng Redis idempotency key."
  },
  {
    en: "Three-tier delivery ensures alerts reach drivers even if the app is backgrounded. alert_id dedup prevents double-notification — the driver sees the hazard once, not three times.",
    vi: "Delivery 3 tầng cam kết cảnh báo tới kể cả app đã tắt. Cơ chế Dedup alert_id giữ nguyên tốc độ, tài xế không bao giờ bị spam 3 báo cáo cho cùng 1 sự kiện."
  },
  {
    en: "EMQX is chosen over Mosquitto for its horizontal scalability — EMQX cluster can handle 10M+ concurrent connections. The built-in Kafka bridge means sensor data flows: Device → MQTT → Kafka with no extra service in the path.",
    vi: "Chọn EMQX thay vì Mosquitto nhờ horizontal scalability — cluster tải được 10 triệu+ connection. Tích hợp sẵn Kafka bridge giúp luồng Device → MQTT → Kafka kết nối trực tiếp."
  },
  {
    en: "Geo-hash partitioning is the key insight for scaling. Without it, all vehicles in Ho Chi Minh City hit the same partition — a hot-spot bottleneck. With level-5 geo-hash, the city is split into ~200 cells, each processed by independent consumer groups in parallel.",
    vi: "Geo-hash partition là chìa khóa scale. Mọi xe ở TP.HCM ghi chung 1 hướng gây nghẽn cổ chai. Với Level 5 geo-hash, thành phố chia làm ~200 vùng độc lập đa luồng xử lý."
  },
  {
    en: "DLQ depth is a critical metric — a growing DLQ means a downstream service is sick. We alert on DLQ depth &gt;100 and trigger a PagerDuty incident. This is how we catch silent failures in the async pipeline.",
    vi: "Số message trong DLQ là metric chí mạng — DLQ tụ đọng nghĩa là 1 service đang yếu. Nếu DLQ > 100 sẽ Trigger báo ứng trực tiếp PagerDuty."
  },
  {
    en: "Vehicle Service is the system of record for vehicle identity. It publishes vehicle.registered events — downstream services (Tracking, Telemetry) react and provision their own data structures. Loose coupling via events, not direct DB sharing.",
    vi: "Vehicle Service là System of Record. Nó bắn event 'vehicle.registered' — Tracking, Telemetry tự phản hồi và tạo DB của mình (Loose Coupling thay vì chia sẻ DB chung)."
  },
  {
    en: "On vehicle.reconnected, Tracking Service publishes an event that triggers Alert Service to run a one-time GEORADIUS sweep — catching the driver up on hazards reported during the GPS gap (e.g. while in a tunnel).",
    vi: "Khi 'vehicle.reconnected', hệ thống Trigger Alert tự động quét GEORADIUS 1 lần — bù những cảnh báo đã bị lọt thỏm trong lúc đoạn xe khuất GPS (đi hầm)."
  },
  {
    en: "The connection registry in Redis maps vehicle_id → pod_id. Without it, each pod would need to broadcast to all other pods to find the right WebSocket — O(N) fan-out that kills performance. With the registry, it's O(1) direct route.",
    vi: "Giữ cấu trúc Registry ở Redis ánh xạ vehicle_id → pod_id. Nếu không mỗi Pod phải Broadcast mảng lưới để tìm WebSocket (O(N) fan-out hại hiệu năng). Có Registry ta quy về O(1)."
  },
  {
    en: "Telemetry Service is stateless — it ingests, validates, enriches (adds road type context), and publishes. The ML layer pulls from the enriched stream, not raw sensor data — separation of concerns.",
    vi: "Telemetry Service hoàn toàn Stateless — chỉ xử lý Validate/Enrich. ML kéo Layer Enrichment thay cho Raw stream rác — Độc lập Mối lo (Separation of Concerns)."
  },
  {
    en: "The FSM is the system's self-healing mechanism. '5 consecutive clean passes' means if 5 vehicles drive through a reported hazard location without sensor triggering, the system marks it RESOLVED automatically — no ops team needed.",
    vi: "Cấu trúc vòng đời tự trị FSM: '5 xe lướt mượt qua đoạn đường cảnh báo' mà không nhảy Sensor thì nó sẽ đưa trạng thái hạ cảnh báo RESOLVED hoàn toàn tự động."
  },
  {
    en: "Reports are generated async via a job queue — a 10,000-vehicle fleet report can take 30 seconds. We never block the HTTP response. Client polls a job_id endpoint, or we push a notification when ready.",
    vi: "Report trả về Async qua Job Queue. Tải báo cáo 10k xe mất khoảng 30s nhưng máy chủ không bao giờ Block HTTP. App Client sẽ gọi job_id endpoint hoặc đợi Push notify trả kết quả."
  },
  {
    en: "LSTM alone captures 'something bumpy happened'. The CNN on the spectrogram captures the frequency signature — potholes have a characteristic ~15Hz spike, while speed bumps are broader and slower. Combined model reduces false positive rate by 40%.",
    vi: "Mô hình LSTM nhạy bắt cú sốc xóc gập. Kèm tích hợp CNN soi quang phổ đo chóp 15Hz sẽ xác minh 100% đó là ổ gà chứ không phải Gờ giảm tốc, né cực mạnh tới 40% sai lệch nhận diện."
  },
  {
    en: "Edge inference with TensorRT INT8 quantization runs YOLOv8n at 30fps on a Jetson Orin Nano (under $200). Cloud inference fallback for complex scenes. NMS (Non-Max Suppression) threshold is tunable at runtime via Redis config.",
    vi: "Chạy Mô hình nhúng TensorRT INT8 với YOLOv8n đạt vọt lên 30FPS ở mạch Nano Jetson (Chỉ ~$200). Fallback cho vùng mù lên Cloud. Tuning ngưỡng bù đè trực tiếp Runtime vào hệ số NMS thông qua Redis Config."
  },
  {
    en: "Per-vehicle baseline is critical — aggressive braking is normal for a sports car, abnormal for a delivery truck. Isolation Forest scores each event against that vehicle's own 90-day baseline, not a global threshold.",
    vi: "Mỗi xe là 1 thực thể đặc dụng — Phanh khét lốp bình thường với Sport Car nhưng hỏng lốp với xe Tải nhẹ. Machine Learning nhắm vào chấn động 90 Ngày riêng biệt chứ không dùng mức chung Global."
  },
  {
    en: "MLflow Model Registry has 3 stages: Staging, Production (Champion), Archived. Challenger runs on 10% of inference traffic. If Challenger precision &gt; Champion by &gt;2%, auto-promote. If either drops below 75% precision, auto-rollback within one pipeline cycle (~6 hours).",
    vi: "Quản lý Version MLFlow gồm: Staging, Sản Phẩm, Đóng Băng. Lôi quy trình Challenger nhử trước 10% traffic. Tỉ lệ chuẩn ăn chặt hơn 2% thì Push toàn bộ Auto-Promote. AutoRollback nếu nhận diện xuống mã."
  },
  {
    en: "RLS is the last line of defense for multi-tenancy. Even if a bug in application code removes the tenant filter, PostgreSQL enforces it at the query plan level. You can test: connect as a tenant role and try SELECT * — you'll only see your own rows.",
    vi: "RLS là ngọn cờ cắm mốc chặn cuối cùng trong DB Postgres (của multi-tenant). Tỉ như App code chập mạch thả lưới query trắng xóa thì DB Level Filter vẫn nhét data an toàn khỏi lọt."
  },
  {
    en: "Cassandra's masterless architecture means no single point of failure and true linear write scalability. Adding a node increases write throughput proportionally. The query-first model means 'last 2 hours of vehicle X' is a single-partition range scan — O(log N) not O(N).",
    vi: "Ở Cassandra, thiết kế phi Master không có SPF và có Linear Capability. Lấy trích '2 giờ ghi cuối trạm' chỉ là 1 query Range Scan siêu tốc O(log N) do Partion key làm việc quá êm."
  },
  {
    en: "Redis serves 5 distinct roles in this system — each leveraging a different data structure: GEO sorted set (positions), Hash (connection registry), Set+TTL (dedup), Pub/Sub (dashboard), String (config). This is intentional: Redis is not just a cache, it's an operational data store.",
    vi: "Giao dịch qua Redis tại dự án đóng cả thảy 5 vai trò riêng biệt cho từng DB Structure: GEO(Cho map), Hash(Session), Tập hợp Set(Khử trùng lặp Data), Tín hiệu Pub/sub (Sống động màn hình). Redis này không còn là 1 Data cache qua đường."
  },
  {
    en: "MongoDB's flexible schema handles evolving sensor payloads — a new OBD sensor type doesn't require a migration. We store raw event JSON and project it via the aggregation pipeline for analytics, rather than forcing a rigid schema upfront.",
    vi: "Nhờ cái DB phi cấu trúc xé nát của Mongo, Mọi loại Module xe hơi Payload dù kì lạ đến đâu đều được đáp xuống mà không dính DB Migration. Json đổ thẳng, Phân tích Aggregation pipeline trực tiếp."
  },
  {
    en: "Pre-signed URLs are critical for dashcam footage — we never proxy the video through our servers. The client gets a time-limited (15-min) signed URL and streams directly from R2/S3. This eliminates bandwidth costs and server load.",
    vi: "Dấu tích URL Pre-signed có hiệu lực 15 phút rất cực kỳ nhạy cảm và tốt cho việc tránh Server tắc nghẽn Dashcam băng tần. Trả Link từ S3 về để Stream triệt tiêu mọi nỗi lo đường truyền."
  },
  {
    en: "KEDA (Kubernetes Event-Driven Autoscaling) scales pods based on Kafka consumer lag — not CPU/memory. When GPS events spike (rush hour), lag rises, KEDA adds Telemetry Service pods within ~30s. CPU-based HPA would react too slowly to bursty IoT workloads.",
    vi: "Cơ chế KEDA tự bung Pod phụ trợ thông qua độ nghẽn Delay trạm thông điệp thay vì dùng độ mỏi CPU/Mem. Lúc ùn tắc kẹt xe làm tràn thông tin, HPA dội nọc mới ở tầm ~30 giây. 1 con CPU load metric bình thường sẽ không kịp cứu thua 1 đợt IoT bão tuyết."
  },
  {
    en: "SLO-based alerting is smarter than threshold alerting. Instead of 'alert if error rate &gt;1%', we alert when the error budget is being consumed faster than expected. A 1% error rate at 3am burns budget slowly; the same rate during rush hour burns it 10x faster — the alert reflects actual user impact.",
    vi: "Báo Alert ở hệ quy tắc SLO khôn khéo hơn Threshold cứng chập chờn. Không cần hô hoán khi Lỗi lên >1% nếu Budget chịu tải còn thoải mái. Cùng 1 lỗi bùng lên ở đỉnh điểm Rush Hour mới cắn cháy Budget nhanh gấp 10 lúc bình thường."
  },
  {
    en: "GitOps means the cluster state is always defined in git. ArgoCD continuously reconciles. If someone manually changes a Kubernetes resource (kubectl edit), ArgoCD reverts it within minutes. The git repo is the single source of truth — not the cluster.",
    vi: "Truyền thống GitOps tự động hòa giải qua ArgoCD trên Cluster. Nếu 1 gã quản trị thay đổi file rác qua CMD Kubernetes, ArgoCD đè bẹp chúng sau vài giây đưa nó về cội nguồn ở Git (Nguồn duy nhất sinh Truth)."
  },
  {
    en: "Chaos engineering (quarterly GameDay) is how we validate our RTO claims. We literally kill an AZ in staging and measure: did the system recover within the promised RTO? If not, fix the gap before production finds it.",
    vi: "Tự tiêu diệt hệ thống qua Chaos Engineer mỗi đợt GameDay đem về kiểm chứng sâu sắc RTO của khối vận hành. Tự diệt Staging Server rồi ngồi xem hệ thống tự chữa bệnh, nếu không thì chắp lại khâu hổng ngay lúc đó."
  }
];

const t3 = [
  {
    en: "We achieve eventual consistency without a distributed transaction coordinator. The Saga pattern trades atomicity for availability — correct trade-off for a system where writes must not block reads.",
    vi: "Chúng ta đạt trạng thái Nhất quán cuối (Eventual Consistency) mà không cần bộ điều phối (Coordinator) phân tán tốn kém. Mô hình Saga đánh đổi tính toàn vẹn tức thời (Atomicity) lấy tính khả dụng (Availability) — đánh đổi chính xác để Write không cản Read."
  },
  {
    en: "The threshold in Redis is the fastest lever — we can tune the model's behavior in production within seconds, without a deployment pipeline.",
    vi: "Sử dụng Redis Threshold để tinh chỉnh AI Model Production là đòn bẩy phản ứng thần tốc — ngay lập tức chuyển đổi hành vi trí tuệ nhân tạo chỉ bằng config."
  },
  {
    en: "We have 3 layers of buffering before data is lost. The system degrades gracefully — not catastrophically.",
    vi: "Kiến trúc bọc 3 lớp Buffer kiên cố trước khi mất trắng Dữ liệu. Tính thoái triển hệ thống mềm mỏng (Graceful Degradation) mới làm nên System an toàn."
  },
  {
    en: "In Cassandra, you model the table for the query, not the query for the table. The partition key is the unit of co-location — get it right and every query is a single-node, single-partition read.",
    vi: "Sử dụng Cassandra, Database phải tạo nắn theo form của Query. Dùng đúng đắn khóa cấu trúc Phân mảnh thì Read nào cũng chỉ về vỏn vẹn đúng 1 Node."
  },
  {
    en: "RLS is the last line of defense. It's not a replacement for application-level security — it's the backstop that catches mistakes.",
    vi: "RLS chỉ là chiến tuyến bảo vệ trong cùng cuối. Phải dùng nó như chiếc lưới lọc bọc đuôi cho Application Layer thay vì trốn tránh làm Security ở App."
  },
  {
    en: "Redis GEO is not just a cache — it's the primary spatial data store for real-time lookups. PostGIS is the analytical and complex-geometry store. The separation of concerns is intentional.",
    vi: "Tách bạch mảng chuyên trách (Separation of Concerns). Redis Geo cho Real-time cực tiểu Delay — PostGIS cho Analytics độ trễ rộng hơn. Logic này là Intentional từ bộ khung kiến trúc."
  },
  {
    en: "Stale alerts are more damaging to user trust than missed alerts. The FSM ensures every hazard has an exit path — nothing stays ACTIVE forever.",
    vi: "Người dùng thù ghét những cảnh báo giả và quá hạn. Hệ biểu diễn vòng đời FSM xử lý mọi lối thoát tự động, không rủi ro nào ở mức Tồn Tại (Active) mãi mãi."
  },
  {
    en: "We don't trust any single layer. If the application layer has a bug, the DB layer catches it. Defense-in-depth means N independent failures must occur simultaneously to breach isolation.",
    vi: "Chúng tôi Không tin ở 1 Layer đơn cực. Nếu logic hở khóa, DB sẽ gánh vác. Defense-in-depth ép chuỗi Error ngẫu nhiên rơi đồng loạt rớt cùng chung thì rủi ro mới suy yếu hệ thống Multi-tenant."
  },
  {
    en: "A vehicle at 80km/h exiting a tunnel has ~2 seconds before reaching any hazard within 50m. The reconnect sweep runs in &lt;20ms — the driver gets the warning before they arrive.",
    vi: "Phản gia tốc cho chiếc ô tô đi 80 cây số/h khi qua hầm là rất mong manh (2s). Lực xử lý quá độ mượt 20ms càn dữ liệu Sweep mang lại cái cảnh báo hoàn chỉnh kịp bảo toàn tài xế."
  },
  {
    en: "We monitor not just for errors, but for the absence of expected signals. In a safety-critical system, silence can be more dangerous than noise.",
    vi: "Tracking phải có tính Cảnh giác sự biến mất Data (Absence). Ở ngành giao thông chí mạng này, Im ắng không số hiệu thường đáng sợ và đau đớn hơn sự chật chội ồn ào."
  },
  {
    en: "Cell-based architecture solves data residency and blast radius simultaneously. A regulatory change in Germany doesn't require an emergency deployment in Vietnam.",
    vi: "Cell-based xử lý trọn vẹn nỗi lo cô lập ranh giới Data. Vùng chịu sát thương cũng giới hạn. Có chỉnh sửa luật ở Châu Âu cũng không cần phải gồng rống Update ở VN."
  },
  {
    en: "I never argue technology for its own sake. Kafka is justified here specifically because of replay, independent consumer groups, and geo-partitioning. At MVP scale, I'd agree with Redis Streams.",
    vi: "Không đem đồ cộ ra để loè nhau! Chọn Kafka vì sức mạnh của Data Replay và rẽ nhánh luồng dữ liệu (Geo-Hash group). Giả sử App nhỏ hơn, tôi sẵn lòng ôm cái dễ dàng của Redis Stream."
  },
  {
    en: "Forensic auditability is not a feature you add later — it shapes your logging strategy, retention policy, and trace design from day one. Knowing the limits of what you can prove is as important as knowing what you can.",
    vi: "Giám định và Forensic phải được bồi thấm thiết kế Database chứ chẳng phải 1 Feature thêm bằng mồm cho app. Hiểu sự chứng minh dữ liệu và sự bất tín (Audit Logging Trace) đắp vào ngay Day 1."
  },
  {
    en: "External consumers are untrusted by definition — not maliciously, but because you cannot control their behavior. Bulkhead + read-only materialized view means worst-case for external partners is stale data, not a takedown of your internal system.",
    vi: "Tất cả App kéo Data API External không bao giờ đáng tin. Ứng dụng chốt chặn Bulkhead đẩy họ vào lối mòn Read-Only, Hệ lụy tồi tệ nhất chỉ là dính vài Data Cũ chứ không thể hạ ngã toàn bộ DB Nội bộ của chúng ta."
  },
  {
    en: "Schema Registry is the technical enforcement. CDCT is the cultural mechanism — it makes breaking changes visible before production and forces producing teams to negotiate with consuming teams explicitly. Without both, you have either chaos or a distributed monolith.",
    vi: "Registry Schema là sự bắt buộc cơ tính cứng. Test (CDCT) là luật bù lại quy trình cấm cửa những anh mưu đồ lách luật thay đổi. Có cả hai là sự an bài hoàn hảo — Bằng không sẽ là 1 mớ rác của Distributed Monolith."
  }
];

function run(t) {
  t.forEach(x => {
    let p = html.split(x.en);
    if (p.length > 1) {
      console.log("Matched: " + x.en.substring(0,20));
      html = p.join('<span class="en-hide">' + x.en + '</span><div class="lang-dual"><span class="lang-en">' + x.en + '</span><span class="lang-vi pt-2 block mt-2 text-indigo-400 font-semibold" style="border-top:1px dotted rgba(255,255,255,0.15)">' + x.vi + '</span></div>');
    }
  });
}
run(t2);
run(t3);

html = html.replace(/<strong>Interview:<\/strong>/g, '<strong>Interview (Phỏng vấn):</strong>');
html = html.replace(/<strong>Interview key phrase:<\/strong>/g, '<strong>Interview (Highlight Phỏng vấn):</strong>');
html = html.replace(/Interview: "/g, 'Interview (Phỏng vấn): "');
html = html.replace(/Interview key phrase: "/g, 'Interview (Highlight Phỏng vấn): "');

if (!html.includes('.lang-dual')) {
  html = html.replace('<style>', '<style>\n.en-hide { display: inline; }\nbody.vi .en-hide { display: none; }\n.lang-dual { display: none; }\nbody.vi .lang-dual { display: block; margin-top: 5px; }\n.lang-dual .lang-en { display: block; opacity: 0.6; font-size: 0.9em; margin-bottom: 4px; }\n.lang-dual .lang-vi { display: block; font-style: italic; color: #a1a1aa; border-top: 1px dotted rgba(255,255,255,0.15); padding-top: 6px; }\n');
}

fs.writeFileSync(path, html, 'utf8');
console.log("Translations successful.");
