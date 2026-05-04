/**
 * ============================================================
 * INTERVIEW PREP — SUPPLEMENTAL Q&A DATA
 * Dựa trên transcript phỏng vấn thực tế (Louis & Mark)
 * ============================================================
 */

// ─────────────────────────────────────────────────────────────
// SECTION S5B — KAFKA AUTOSCALING (từ câu hỏi thực tế)
// ─────────────────────────────────────────────────────────────
export const kafkaAutoscalingQA = {
  sectionId: "s5b",
  sectionTitle: "Kafka AutoScaling — Câu hỏi thực tế từ interview",
  sectionSub: "Interviewer hỏi trực tiếp: 'What if TPS grows 10x tomorrow?'",

  questions: [
    {
      qNum: "AUS",
      qEn: "Kafka has a by-design limit on partition count. If TPS grows 10x overnight, how does your system handle it? How does AutoScaling work with Kafka?",
      qVi: "Kafka bị giới hạn partition theo thiết kế. Nếu TPS tăng 10 lần ngày mai, hệ thống bạn xử lý thế nào? AutoScaling với Kafka hoạt động ra sao?",
      isMustKnow: true,
      note: "⚠️ Câu này đã bị hỏi trong interview thực tế. Interviewer chỉ ra rằng candidate trả lời 'autoscale' nhưng chưa giải thích cụ thể. Đây là câu PHẢI trả lời được.",

      answerBLUF: {
        answer: "Kafka does NOT auto-scale transparently. You must pre-plan partition count and use Kubernetes HPA for consumer scaling.",
        why: `The core constraint: partition count is FIXED at topic creation. You cannot add partitions
to a topic without breaking key-based ordering guarantees.
My approach at HSC was to over-provision partitions at creation (3x expected peak load)
so that consumer scaling headroom was always available.`,
        tradeoff: "Pre-provisioning wastes some broker resources, but avoids the cost and complexity of re-partitioning in production.",
        result: "Consumer pods scaled from 3 → 30 within 90 seconds via HPA. Zero re-partitioning needed.",
      },

      deepDive: {
        title: "Autoscaling Architecture — Kafka + Kubernetes",
        layers: [
          {
            layer: "Layer 1 — Consumer Horizontal Scaling (EASY)",
            description: "Scale consumer pods via Kubernetes HPA triggered by consumer lag metric (KEDA).",
            detail: `// KEDA ScaledObject for Kafka consumer
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
spec:
  triggers:
  - type: kafka
    metadata:
      topic: orders.VNM
      consumerGroup: matching-engine-group
      lagThreshold: "1000"   // scale up when lag > 1000 msgs
      scaleToZeroOnIdle: "false"
      
// CONSTRAINT: #consumer pods <= #partitions
// If partitions = 10, max useful pods = 10
// Extra pods are IDLE (no partition to consume)`,
            viNote: "Scale consumer pod dễ dàng với KEDA. Nhưng bị giới hạn bởi số partition — thêm pod hơn số partition là vô nghĩa.",
          },
          {
            layer: "Layer 2 — Partition Pre-Planning Strategy (CRITICAL)",
            description: "The REAL solution: design partition count ahead of time for scaling headroom.",
            detail: `// HSC Partition Planning Formula
Expected peak TPS         = 10,000
Safety multiplier (3x)    = 30,000 TPS capacity needed
Throughput per partition  ~ 1,000 TPS (conservative)

Required partitions = 30,000 / 1,000 = 30 partitions

// We created 30 partitions from Day 1
// Started with 3 consumer pods (1 pod → 10 partitions)
// Can scale to 30 consumer pods under load
// Zero re-partitioning ever needed`,
            viNote: "Luôn tạo nhiều partition hơn nhu cầu hiện tại (3x). Đây là 'reserved scaling headroom'.",
          },
          {
            layer: "Layer 3 — If Re-Partitioning IS Required (HARD)",
            description: "When you truly must add partitions — the painful path.",
            detail: `// Re-partitioning Strategy (use as LAST RESORT)
Step 1: Create new topic with more partitions
        (e.g., orders.v2 with 100 partitions)
Step 2: Run DUAL consumers — read from BOTH topics
        Old: orders (30 partitions) 
        New: orders.v2 (100 partitions)
Step 3: Migrate producers to new topic gradually
        (feature flag: 10% → 50% → 100%)
Step 4: Wait for old topic consumer lag = 0
Step 5: Decommission old topic

// KEY PROBLEM: Key-based ordering breaks during migration
// Message for symbol VNM may go to partition 3 (old)
// OR partition 67 (new) during transition
// Solution: Accept brief out-of-order window OR
//           hard cutover at low-traffic time`,
            viNote: "Re-partition là phức tạp và rủi ro. Chỉ làm khi không còn cách nào khác. Luôn dùng dual-consumer migration pattern.",
          },
          {
            layer: "Layer 4 — Broker Scaling",
            description: "Scale Kafka brokers when single broker becomes I/O bottleneck.",
            detail: `// Broker scaling triggers (monitor these metrics)
- Broker CPU > 70% sustained
- Disk I/O wait > 20%
- Network throughput > 80% of NIC capacity
- Replication lag increasing

// Adding brokers does NOT automatically rebalance partitions
// Must run: kafka-reassign-partitions.sh
// Or use Cruise Control for automated rebalancing`,
            viNote: "Scale broker cần reassign partition thủ công hoặc dùng Confluent Cruise Control.",
          },
        ],
      },

      keyTakeaways: [
        "Kafka auto-scales CONSUMERS easily (via KEDA + HPA), but NOT partitions",
        "Partition count is fixed — always over-provision 3x at topic creation",
        "Consumer count must always be ≤ partition count or extra pods are wasted",
        "Re-partitioning = painful, risky, avoid by pre-planning",
        "KEDA is the bridge between Kafka lag metrics and Kubernetes pod scaling",
      ],

      viTakeaways: [
        "Kafka scale consumer dễ (KEDA + HPA), nhưng partition là cố định",
        "Luôn tạo partition nhiều hơn nhu cầu 3x ngay từ đầu",
        "Consumer pods <= partition count; thêm pod hơn là lãng phí",
        "Re-partition rất phức tạp — tránh bằng cách pre-plan từ đầu",
        "KEDA kết nối Kafka lag metrics với Kubernetes autoscaling",
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// SECTION S6B — RAG PIPELINE WALKTHROUGH
// ─────────────────────────────────────────────────────────────
export const ragPipelineWalkthroughQA = {
  sectionId: "s6b",
  sectionTitle: "RAG Pipeline Walkthrough — Interviewer gợi ý flow này",
  sectionSub: "Interviewer đã nói: 'I'm going to put it in the pipeline... JSON, email, chunking, embedding, retrieval, generation'",

  questions: [
    {
      qNum: "PIP",
      qEn: "Walk me through your RAG pipeline end-to-end: from data ingestion to final generation. Use the flow: data source → chunking → embedding → retrieval → generation.",
      qVi: "Mô tả toàn bộ RAG pipeline của bạn từ đầu đến cuối: từ nguồn dữ liệu → chunking → embedding → retrieval → generation.",
      isMustKnow: true,
      note: "Interviewer đã CHỈ RÕ flow này trong phỏng vấn. Nếu bạn không trả lời theo đúng flow này, interviewer sẽ cảm thấy bạn thiếu kiến thức cơ bản về RAG.",

      phases: [
        {
          phase: "Phase 1 — DATA INGESTION (Offline)",
          color: "blue",
          steps: [
            {
              step: "1A. Data Sources & Extraction",
              detail: `Sources at GLOHOW:
- Emails (Gmail/Exchange) → extract text, metadata (from, to, date, subject)
- PDFs & Documents → PyMuPDF / Apache Tika for text extraction
- Web pages → Playwright headless crawler
- JSON structured data → direct field mapping

Key decision: Preserve metadata (source, date, author, type)
alongside the text — critical for filtering later.`,
              viNote: "Thu thập từ nhiều nguồn: email, PDF, web. Quan trọng: giữ lại metadata kèm theo.",
              tradeoff: "Full re-ingestion vs. incremental. We used incremental (hash-based change detection) to avoid re-processing unchanged documents.",
            },
            {
              step: "1B. Chunking Strategy",
              detail: `Strategy: Fixed-size with overlap
- Chunk size: ~500 tokens (≈ 375 words)
- Overlap: 50 tokens (prevents boundary context loss)
- Splitter: RecursiveCharacterTextSplitter (LangChain)
  Priority: \\n\\n → \\n → ". " → " "

Special cases:
- Tables: keep entire table as one chunk
- Code blocks: never split mid-code
- Emails: split by thread, keep subject as metadata

Why NOT sentence-level chunking?
- Expensive (NLP sentence boundary detection)
- Inconsistent chunk sizes → unpredictable retrieval`,
              viNote: "500 token mỗi chunk, 50 token overlap. Không tách giữa bảng hoặc code block.",
              tradeoff: "Fixed-size is less semantically pure but faster and more predictable than semantic chunking. For our use case, acceptable.",
            },
            {
              step: "1C. Embedding",
              detail: `Model: text-embedding-3-small (OpenAI) — 1536 dimensions
Chosen over text-embedding-3-large because:
- 5x cheaper
- Only 10% quality degradation for our domain
- Latency: ~50ms vs 150ms

Batch processing: 100 chunks per API call
Error handling: exponential backoff, dead-letter queue for failures

Storage: Vector + metadata in Qdrant
{
  vector: [0.023, -0.156, ...],  // 1536 dims
  payload: {
    source: "email_20240115.eml",
    date: "2024-01-15",
    type: "email",
    chunk_index: 3,
    total_chunks: 8,
    text: "The meeting is scheduled for..."
  }
}`,
              viNote: "Dùng embedding model nhỏ hơn (text-embedding-3-small) để tiết kiệm chi phí. Lưu vector kèm metadata đầy đủ.",
              tradeoff: "Smaller model saves ~80% cost. For domain-specific content (financial/legal), fine-tuned embeddings would perform better but require training data we didn't have.",
            },
          ],
        },
        {
          phase: "Phase 2 — RETRIEVAL (Online, Per Query)",
          color: "green",
          steps: [
            {
              step: "2A. Query Understanding & Embedding",
              detail: `User query: "Summarize emails about Project Alpha last month"

Step 1: Query expansion (optional but improves recall)
  Original: "Project Alpha emails last month"
  Expanded: ["Project Alpha", "Alpha project", "alpha meeting notes", "alpha status"]

Step 2: Extract metadata filters from query
  date range: last 30 days
  type: email

Step 3: Embed the query (same model as documents!)
  query_vector = embed("Project Alpha emails last month")`,
              viNote: "Embed query bằng CÙNG model với document. Trích xuất filter từ câu hỏi để thu hẹp tìm kiếm.",
            },
            {
              step: "2B. Hybrid Search (Semantic + Keyword)",
              detail: `Why hybrid?
- Pure vector: misses exact matches (names, IDs, codes)
- Pure keyword (BM25): misses semantic similarity

Implementation at GLOHOW:
  vector_results  = qdrant.search(query_vector, filter=metadata_filter, top_k=20)
  keyword_results = elasticsearch.search(query_text, filter=metadata_filter, top_k=20)

  // Reciprocal Rank Fusion (RRF) to merge
  merged = RRF(vector_results, keyword_results)
  // Formula: score = Σ 1/(k + rank_i) where k=60`,
              viNote: "Kết hợp vector search (tìm ngữ nghĩa) và BM25 keyword (tìm từ khóa chính xác). Dùng RRF để merge kết quả.",
              tradeoff: "Hybrid adds ~30ms latency but improves recall@10 by ~25%. Worth it for factual queries with proper nouns.",
            },
            {
              step: "2C. Re-Ranking",
              detail: `Problem: Initial retrieval returns top-20 but not ordered by true relevance.
Solution: Cross-encoder re-ranker (ms-marco-MiniLM-L-6-v2)

// Cross-encoder evaluates query+document TOGETHER
// More accurate but O(n) — only run on top-20, not full index

reranked = cross_encoder.predict([
  (query, chunk_1),
  (query, chunk_2),
  ...
  (query, chunk_20)
])

// Keep only top 4-5 after re-ranking
final_context = reranked[:5]

Why not just use cross-encoder for everything?
- Cross-encoder on full index = infeasible (millions of docs)
- Two-stage: fast approximate (bi-encoder) → precise (cross-encoder)`,
              viNote: "Re-ranker là bước 'lọc tinh' sau khi đã lấy top-20. Chỉ chạy trên 20 kết quả, không phải toàn bộ index.",
              tradeoff: "Re-ranking adds ~80ms latency. For async use cases (daily summaries), acceptable. For real-time chat (<200ms target), skip re-ranking and rely on hybrid search.",
            },
          ],
        },
        {
          phase: "Phase 3 — GENERATION",
          color: "purple",
          steps: [
            {
              step: "3A. Context Assembly & Prompt Engineering",
              detail: `// System Prompt (controls behavior)
system_prompt = """
You are an assistant that answers questions based ONLY on the provided context.
If the answer is not in the context, say "I don't have enough information."
Always cite your sources using [Source: filename, date].
Do not make up information. Temperature is set to 0.1.
"""

// Context Assembly
context_str = ""
for i, chunk in enumerate(final_context):
    context_str += f"[{i+1}] Source: {chunk.metadata['source']}, Date: {chunk.metadata['date']}\\n"
    context_str += chunk.text + "\\n\\n"

// Final prompt
user_message = f"""
Context:
{context_str}

Question: {user_query}

Answer based only on the context above:
"""`,
              viNote: "System prompt yêu cầu LLM CHỈ dựa vào context. Bắt buộc cite nguồn. Temperature thấp (0.1) cho factual accuracy.",
            },
            {
              step: "3B. LLM Call & Response Handling",
              detail: `Model: Claude 3 Haiku (fast) or GPT-4o-mini (cheap)
max_tokens: 1000 for summaries, 500 for Q&A

Streaming: Yes — stream tokens to UI for better UX
Temperature: 0.1 (factual) or 0.3 (creative summaries)

Post-processing:
1. Parse citations from response
2. Validate: every claim should map to a source chunk
3. Groundedness check (optional): 
   Ask LLM "Does this answer follow from the context? Score 1-5"
   If score < 3, regenerate or flag for human review

Response format:
{
  "answer": "Project Alpha meeting is scheduled for...",
  "citations": [
    {"source": "email_20240115.eml", "chunk": 1},
    {"source": "meeting_notes.pdf", "chunk": 3}
  ],
  "confidence": 0.87
}`,
              viNote: "Stream response cho UX tốt hơn. Validate citation sau khi generate. Low temperature cho factual queries.",
              tradeoff: "Groundedness check adds 1 extra LLM call (+$0.001 + ~300ms). Only enable for high-stakes queries (financial, legal).",
            },
          ],
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// SECTION S6C — RAG SUMMARIZATION DEEP DIVE
// ─────────────────────────────────────────────────────────────
export const ragSummarizationQA = {
  sectionId: "s6c",
  sectionTitle: "RAG Summarization — Câu bị hỏi trực tiếp trong interview",
  sectionSub: "Interviewer: 'Summary — how you do summary? The process cannot be done by human. How it works behind?'",

  questions: [
    {
      qNum: "SMDP",
      qEn: "How does your summarization feature work exactly? You can't manually decide which documents to include. How does the system decide automatically?",
      qVi: "Tính năng tóm tắt hoạt động chính xác thế nào? Bạn không thể tự tay chọn document. Hệ thống tự quyết định như thế nào?",
      isMustKnow: true,
      note: "Đây là câu interviewer hỏi TRỰC TIẾP. Câu trả lời trước chỉ đề cập 'summary' mà không giải thích mechanism. Phải trả lời được HOW IT WORKS AUTOMATICALLY.",

      answerStructure: {
        step1: {
          title: "Step 1 — Query-Driven Document Selection (Automatic)",
          detail: `The system does NOT use all documents — it uses the QUERY to select relevant ones.

// Example: User asks "Summarize last week's client emails about Project Alpha"
// System automatically:

1. Parse intent from query:
   - Time filter: last 7 days
   - Type filter: emails
   - Topic filter: "Project Alpha"

2. Run retrieval (hybrid search):
   results = qdrant.search(
     query_vector=embed("Project Alpha client emails"),
     filter={
       "must": [
         {"key": "type", "match": {"value": "email"}},
         {"key": "date", "range": {"gte": "2024-01-08", "lte": "2024-01-15"}}
       ]
     },
     top_k=50  // wider net for summarization
   )
   
3. Group results by source document
   // chunks from same email → grouped together`,
          viNote: "Hệ thống KHÔNG đọc tất cả document. Nó dùng query để tự động filter theo metadata (ngày, loại, chủ đề) rồi mới tóm tắt.",
        },
        step2: {
          title: "Step 2 — Adaptive Summarization Strategy",
          detail: `// Strategy depends on total token count of selected documents

CASE A: Total content < 4,000 tokens (small)
→ Direct summarization (1 LLM call)
  prompt = "Summarize these emails: {all_content}"

CASE B: Total content 4,000 - 50,000 tokens (medium)
→ Map-Reduce summarization
  
  // MAP phase (parallel)
  chunk_summaries = parallel([
    llm("Summarize this section: {chunk_1}"),
    llm("Summarize this section: {chunk_2}"),
    llm("Summarize this section: {chunk_3}"),
    ...
  ])
  
  // REDUCE phase (single call)
  final_summary = llm(f"""
    Combine these section summaries into a coherent overall summary:
    {chunk_summaries}
    
    Focus on: key decisions, action items, timeline, stakeholders.
  """)

CASE C: Total content > 50,000 tokens (large)
→ Hierarchical summarization
  
  // Level 1: Summarize individual documents
  doc_summaries = [summarize(doc) for doc in documents]
  
  // Level 2: Cluster by topic (optional)
  clusters = cluster(doc_summaries, k=5)
  
  // Level 3: Summarize each cluster
  cluster_summaries = [summarize(cluster) for cluster in clusters]
  
  // Level 4: Final synthesis
  final = synthesize(cluster_summaries)`,
          viNote: "3 chiến lược tùy kích thước: Direct (nhỏ), Map-Reduce (vừa), Hierarchical (lớn). Hệ thống tự chọn chiến lược.",
        },
        step3: {
          title: "Step 3 — Quality Control & Structure",
          detail: `// Force structured output for summaries
summary_prompt = """
Summarize the following emails. Output in this JSON structure:
{
  "executive_summary": "2-3 sentence overview",
  "key_decisions": ["decision 1", "decision 2"],
  "action_items": [{"task": "...", "owner": "...", "deadline": "..."}],
  "participants": ["name1", "name2"],
  "sentiment": "positive|neutral|negative",
  "follow_up_required": true/false
}
Only use information from the provided emails.
"""

// Groundedness validation
validator_prompt = f"""
Original emails: {source_chunks}
Generated summary: {generated_summary}

Check: Does every claim in the summary appear in the original emails?
Return: {{"valid": true/false, "unsupported_claims": [...]}}
"""`,
          viNote: "Force structured JSON output từ LLM. Validate mọi claim trong summary đều có nguồn gốc từ email gốc.",
        },
      },

      limitations: [
        {
          problem: "Recency Bias",
          description: "Vector similarity may favor recent documents over older but more relevant ones",
          solution: "Time-decay scoring: score = similarity * decay_factor(age). Recent docs get small boost but not dominant.",
          viNote: "Vector search có thể ưu tiên doc mới hơn doc liên quan. Dùng time-decay scoring để cân bằng.",
        },
        {
          problem: "Cross-Document Contradiction",
          description: "Two emails may contain conflicting information (e.g., different meeting times)",
          solution: "Add conflict detection prompt: 'Identify any contradictions in the source material and note them explicitly.'",
          viNote: "Hai document có thể mâu thuẫn nhau. Thêm bước conflict detection để LLM tự ghi chú.",
        },
        {
          problem: "Hallucination in Synthesis",
          description: "LLM may infer/extrapolate during the REDUCE step beyond what's in chunk summaries",
          solution: "Low temperature (0.1) + explicit instruction 'Do not infer. Synthesize only.' + groundedness check.",
          viNote: "LLM có thể 'suy luận' ra thông tin không có trong chunk summaries khi reduce. Dùng temperature thấp + groundedness check.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// SECTION S13 — POSITIONING: TECH VS MANAGEMENT
// ─────────────────────────────────────────────────────────────
export const positioningQA = {
  sectionId: "s13",
  sectionTitle: "Positioning — Tech Lead vs Management",
  sectionSub: "Interviewer hỏi: 'How do you position yourself in both management and technical?'",

  questions: [
    {
      qNum: "POS",
      qEn: "How do you position yourself between technical and management roles? Are you more of a hands-on engineer or a people manager?",
      qVi: "Bạn tự định vị mình như thế nào giữa kỹ thuật và quản lý? Bạn thiên về engineer hay manager hơn?",
      isMustKnow: true,
      note: "Interviewer đã hỏi câu này đầu tiên nhưng candidate trả lời không rõ ràng. Phải có câu trả lời 2-3 câu súc tích NGAY LẬP TỨC.",

      answerBLUF: {
        answer: "I'm a Technical Leader — I stay hands-on while enabling the team. My ratio is roughly 40% individual contribution, 60% leadership.",
        why: `I believe a Tech Lead who drifts too far into pure management loses credibility with engineers
and misses critical technical insights. At HSC, I personally owned the Kafka architecture design
and the most complex performance bottlenecks — while simultaneously leading a 6-person team.
This 'leading from the front' model means I can make faster, more accurate architecture decisions
because I'm still in the code.`,
        tradeoff: "The trade-off is I can't scale a team as large as a pure manager. My sweet spot is 5-10 engineers where I can maintain technical depth and still drive team growth.",
        result: "Teams I've led delivered 10K TPS systems and AI features on schedule, with measurably lower defect rates than average.",
      },

      positioningMatrix: {
        title: "The Tech Lead Positioning Matrix",
        description: "Use this to answer clearly when asked",
        quadrants: [
          { role: "Staff Engineer", focus: "Deep technical, no team management", match: false },
          { role: "Tech Lead (YOU)", focus: "Technical + small team leadership, hands-on", match: true },
          { role: "Engineering Manager", focus: "People management, less technical", match: false },
          { role: "Director of Engineering", focus: "Org strategy, minimal hands-on", match: false },
        ],
        clarification: "You are NOT a pure manager. You are NOT a pure IC (Individual Contributor). You are the bridge — this is what Tech Lead means.",
        viClarification: "Bạn không phải pure manager, cũng không phải pure coder. Bạn là cầu nối — đây chính xác là Tech Lead.",
      },

      whatInterviewerWants: [
        "Clear self-awareness about your role identity",
        "Evidence you can do BOTH (concrete examples)",
        "Understanding of when to switch modes (technical vs leadership)",
        "No ambiguity — interviewers dislike vague answers like 'I can do both equally well'",
      ],
    },
    {
      qNum: "CNT",
      qEn: "What was your specific contribution in past projects? Were you the decision-maker on architecture, or more the executor?",
      qVi: "Đóng góp cụ thể của bạn trong các dự án trước là gì? Bạn là người quyết định kiến trúc hay người thực thi?",
      note: "Interviewer tiếp tục đào sâu câu positioning. Phải có ví dụ cụ thể với số liệu.",

      answerTemplate: `BLUF: "I was the primary architecture decision-maker, with execution shared across the team."

HSC Example (Architecture DM):
- Decision: Introduce Kafka as WAL → I proposed, designed, prototyped
- Decision: Partition strategy (by symbol) → My design
- Decision: CP vs AP per data type → My recommendation to CTO
- Execution: Led 5 engineers implementing the design
- Result: 10K TPS, p99 < 50ms

GLOHOW Example (Technical + AI):
- Decision: Choose Qdrant over Pinecone → My evaluation & recommendation  
- Decision: Hybrid search strategy → My design
- Execution: Built RAG pipeline core (embedding + retrieval layers myself)
- Led 3 engineers on integration and evaluation`,

      viTemplate: "Tôi là người QUYẾT ĐỊNH kiến trúc, không phải chỉ thực thi. Ví dụ: tại HSC, tôi đề xuất và thiết kế Kafka WAL strategy, còn team implement theo thiết kế của tôi.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// SECTION S14 — REAL INTERVIEW REPLAY
// ─────────────────────────────────────────────────────────────
export const realInterviewReplayQA = {
  sectionId: "s14",
  sectionTitle: "Real Interview Replay — Câu hỏi từ transcript thực tế",
  sectionSub: "Câu hỏi chính xác Louis & Mark đã hỏi + câu trả lời chuẩn",

  questions: [
    {
      qNum: "R01",
      qEn: "In the HSC project, you mentioned scaling to 1,000 transactions per second. Walk me through the architecture end-to-end. What were the bottlenecks? What trade-offs did you make and how did you validate the system can handle the load?",
      qVi: "Trong dự án HSC, bạn đề cập scaling lên 1,000 TPS. Hãy mô tả kiến trúc end-to-end. Đâu là bottleneck? Trade-off nào bạn đã chọn và bạn validate hệ thống xử lý được tải thế nào?",
      isMustKnow: true,
      note: "Đây là câu ĐẦU TIÊN interviewer hỏi. Candidate đã trả lời không có flow rõ ràng. Đây là cách trả lời chuẩn.",

      perfectAnswer: `ANSWER: "Let me walk you through this end-to-end.

[SITUATION]
At HSC Securities, we started at ~1,500 TPS. During market open hours, 
we needed to sustain 10,000 TPS with p99 < 50ms.

[BOTTLENECK IDENTIFICATION]
Using async-profiler, we identified 3 bottlenecks:
  #1: Synchronous DB writes on the hot path (800ms latency)
  #2: Single-threaded order processing per symbol
  #3: No caching — every position query hit the DB

[ARCHITECTURE SOLUTION]
  Client → API Gateway → Order Service → Kafka (partition by symbol) →
  Matching Engine (1 thread/symbol) → Settlement Service → PostgreSQL/Cassandra
  Redis layer for position caching

[KEY TRADE-OFF]
  I moved from synchronous consistency to eventual consistency for trade history.
  Account balances remained synchronous (CP via PostgreSQL).
  Trade history accepted eventual consistency (AP via Cassandra).
  This was acceptable because regulators allow T+2 settlement, 
  not real-time reconciliation.

[VALIDATION]
  1. Unit load tests with JMeter: simulated 15K TPS (1.5x target)
  2. Chaos engineering: killed 1 Kafka broker mid-test — system recovered
  3. Production shadow traffic: ran parallel for 2 weeks before cutover
  4. SLA monitoring: Grafana dashboard with p50/p95/p99 latency alerts

[RESULT]
  10,000 TPS sustained. p99 = 48ms. Zero data loss during broker failure."`,

      viAnswer: "Mô tả theo flow: Situation → Bottleneck tìm thấy bằng profiler → Kiến trúc giải quyết → Trade-off cụ thể (CP vs AP) → Cách validate (JMeter + chaos) → Kết quả với số liệu.",
    },
    {
      qNum: "R02",
      qEn: "You said you chose Kafka. Tell me more specifically about WHY Kafka. What was the difficulty? And what happens tomorrow if TPS grows 10x — would that break your system?",
      qVi: "Bạn nói chọn Kafka. Nói cụ thể hơn về LÝ DO chọn Kafka. Difficulty là gì? Và nếu ngày mai TPS tăng 10 lần — hệ thống có vỡ không?",
      isMustKnow: true,
      note: "Interviewer đã hỏi CÂU NÀY CHÍNH XÁC trong transcript. Candidate trả lời thiếu specifics về autoscaling.",

      perfectAnswer: `WHY KAFKA:
  "We had three specific reasons:
   1. Decouple: Order Service và Matching Engine có thể scale độc lập
   2. Buffer: Kafka absorbs burst — market open có spike 5x normal TPS
   3. Replay: Nếu Matching Engine crash, có thể replay từ last committed offset
   
   Alternatives we rejected:
   - RabbitMQ: không có replay, không đủ throughput cho 10K TPS
   - Redis Streams: không đủ durability cho financial data
   - Synchronous DB: 800ms bottleneck là proof"

DIFFICULTY:
  "The hardest part was ordering guarantee.
   We needed all VNM orders processed in exact sequence.
   Kafka guarantees order WITHIN a partition.
   So we partitioned by symbol — all VNM orders → partition 3.
   This means 1 consumer thread per symbol — no parallel processing per symbol.
   Trade-off: serialized matching per symbol, but parallel across symbols."

IF TPS GROWS 10X:
  "Great question. Let me be precise:
   
   Consumer scaling: YES, easy. We use KEDA — when consumer lag > 1000,
   Kubernetes adds new consumer pods. We can go from 3 → 30 pods in 90 seconds.
   
   BUT — there's a hard constraint: consumer pods <= partition count.
   If we have 30 partitions, max useful consumers = 30.
   
   Our solution: we over-provisioned partitions at topic creation.
   orders topic = 90 partitions (9x expected load at the time).
   So scaling from 10K → 100K TPS just means adding consumer pods.
   No re-partitioning needed.
   
   If we somehow hit 100K TPS:
   - Scale Kafka brokers + rebalance partitions
   - Or migrate to new topic with 300 partitions (painful but doable)"`,

      viAnswer: "WHY: 3 lý do cụ thể (decouple, buffer, replay). DIFFICULTY: ordering guarantee → giải quyết bằng partition by symbol. 10X: consumer scale dễ (KEDA), nhưng partition là fixed — đã pre-plan 3x ngay từ đầu.",
    },
    {
      qNum: "R03",
      qEn: "Now let's talk about the RAG system at GLOHOW. Tell me your use case and how you established the pipeline to handle it.",
      qVi: "Bây giờ nói về RAG system tại GLOHOW. Use case là gì và bạn thiết lập pipeline như thế nào?",
      isMustKnow: true,
      note: "Interviewer phải gợi ý 'email... chunking... embedding... retrieval... generation' vì candidate không tự nói theo flow. Phải thuộc lòng flow này.",

      perfectAnswer: `USE CASE:
  "At GLOHOW, we built a RAG system to help property managers 
   handle tenant communications at scale.
   
   The problem: Each manager handles 50-200 units.
   Daily: ~100 emails, maintenance requests, complaints.
   They were missing important items and spending 3h/day on email.
   
   Our RAG solution:
   - Ingest all communications (email, SMS, portal messages)
   - Allow natural language queries: 'Which tenants haven't paid this month?'
   - Auto-generate draft responses for common requests
   - Daily summary: 'Here's what needs your attention today'"

PIPELINE:
  "Let me walk through each stage:

   [INGESTION — Offline]
   Data sources: Gmail, portal JSON exports, PDF lease agreements
   ↓ Extract text + preserve metadata (sender, date, unit number)
   ↓ Chunk: 500 tokens, 50-token overlap, never split tables
   ↓ Embed: text-embedding-3-small → 1536-dim vector
   ↓ Store: Qdrant (vector + metadata payload)

   [RETRIEVAL — Per Query]
   User: 'Issues from Unit 4B this week'
   ↓ Extract metadata filter: unit=4B, date=last 7 days
   ↓ Hybrid search: vector similarity + BM25 keyword
   ↓ Re-rank: cross-encoder on top-20 results
   ↓ Select top 4-5 chunks

   [GENERATION]
   ↓ Assemble context with sources
   ↓ LLM call (Claude Haiku, temperature=0.1)
   ↓ Response with citations [Source: email_20240115]
   
   Latency: ~800ms end-to-end. For daily summaries, we pre-compute at 6am."`,

      viAnswer: "Use case cụ thể: property manager overwhelmed với emails. Pipeline: sources → chunking → embedding → Qdrant → hybrid search → re-rank → LLM generation. Cite latency: 800ms.",
    },
    {
      qNum: "R04",
      qEn: "RAG is just one solution. Vector-based retrieval has limitations — retrieved information may not accurately match the right document. You might fit too many documents to the AI causing 'drafting' — it doesn't know the right answer. Do you have other solutions to handle this?",
      qVi: "RAG chỉ là một giải pháp. Vector retrieval có giới hạn — đôi khi không lấy đúng document. Nếu fit quá nhiều document vào AI thì nó không biết đâu là đúng ('drafting'). Bạn có giải pháp nào khác không?",
      note: "Interviewer đã MÔ TẢ CHÍNH XÁC vấn đề context overflow và low precision. Đây là câu muốn nghe về advanced RAG solutions.",

      perfectAnswer: `"Great observation — this is exactly the RAG reliability problem. Let me give you 4 solutions:

   SOLUTION 1 — Reduce context pollution (your 'too many docs' problem):
   - Re-ranking: use cross-encoder to reorder top-20, then take only top 4
   - Relevance threshold: discard any chunk with similarity score < 0.7
   - Result: LLM receives 4 highly relevant chunks, not 20 mediocre ones

   SOLUTION 2 — Hybrid Search for precision:
   - Pure vector misses exact terms (names, IDs, codes)
   - Add BM25 keyword search, merge with RRF
   - 25% better recall for queries with specific names/numbers

   SOLUTION 3 — Structured retrieval for known patterns:
   - Not everything needs vector search
   - 'Tenants who haven't paid' → SQL query on structured DB
   - RAG is for unstructured content; SQL for structured
   - Route queries: if structured intent → SQL, if open-ended → RAG

   SOLUTION 4 — Query decomposition for complex questions:
   - User: 'Compare Unit 4B and 5A issues this month'
   - Decompose: [query_4B, query_5A] → retrieve independently
   - Then synthesize: LLM combines two focused results
   - Avoids mixing unrelated content in context window

   The 'drafting' problem you describe specifically?
   That's context overflow. My fix: strict top-K=4 after re-ranking,
   plus explicit prompt: 'If the answer is not in the provided context, 
   say I don't know. Do not infer or guess.'"`,

      viAnswer: "4 giải pháp: (1) Re-ranking + threshold để giảm context pollution, (2) Hybrid search cho precision tốt hơn, (3) SQL cho structured queries, (4) Query decomposition cho câu hỏi phức tạp.",
    },
    {
      qNum: "R05",
      qEn: "You mentioned summary. How do you do summary specifically? The system needs to decide which documents to include or shorten the context. This cannot be done manually. How does it work automatically?",
      qVi: "Bạn đề cập summary. Bạn làm summary cụ thể thế nào? Hệ thống cần tự quyết định document nào để tóm tắt. Không thể làm thủ công. Cơ chế tự động là gì?",
      note: "Đây là câu interviewer hỏi TRỰC TIẾP và candidate trả lời chưa đủ sâu. Phải giải thích cơ chế AUTOMATIC selection.",

      perfectAnswer: `"The key word here is AUTOMATIC. The system never has a human select documents.
   Here's the 3-layer automatic mechanism:

   LAYER 1 — Query-Driven Automatic Selection:
   User: 'Summarize last week's maintenance requests'
   System automatically:
   - Parses intent: type=maintenance, date=last 7 days
   - Applies metadata filter in vector search
   - Retrieves top-50 relevant chunks (wider net for summarization)
   - Groups by source document
   No human needed. Metadata does the selection.

   LAYER 2 — Adaptive Strategy (scales automatically):
   IF total_tokens < 4,000:
     → Single LLM call with all content
   
   ELIF total_tokens < 50,000:
     → Map-Reduce:
       MAP: Summarize each document independently (parallel)
       REDUCE: LLM synthesizes chunk summaries → final summary
   
   ELSE (large corpus):
     → Hierarchical:
       Level 1: Summarize each document
       Level 2: Cluster by topic
       Level 3: Summarize clusters
       Level 4: Final synthesis
   
   The system SELECTS THE STRATEGY automatically based on token count.

   LAYER 3 — Quality Verification (automatic):
   After generation, automated check:
   - Does summary contain claims not in source? → flag
   - Are key entities (names, dates, amounts) preserved? → validate
   - Is summary significantly shorter than source? → measure compression ratio
   
   This three-layer system means a property manager just types
   'Summarize this month's issues' — and gets a structured, accurate
   summary in 3-5 seconds with zero manual document selection."`,

      viAnswer: "3 lớp tự động: (1) Query-driven selection qua metadata filter, (2) Adaptive strategy chọn Map-Reduce hay Hierarchical tùy token count, (3) Automated quality check. Không cần human chọn document.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// SECTION S15 — COMPANY-SPECIFIC Q&A
// ─────────────────────────────────────────────────────────────
export const companySpecificQA = {
  sectionId: "s15",
  sectionTitle: "Company-Specific Prep — Bot Management Platform",
  sectionSub: "Mark giải thích sản phẩm: 'Fight bad bots, high-efficiency traffic pipeline, anomaly detection'",

  productContext: {
    description: "Board management software (Bot Management). Helps customers fight bad bots on the internet. Build high-efficiency traffic pipeline → detect up and no-moose (anomalies) → help customers mitigate based on their preference.",
    techChallenges: [
      "High-volume traffic ingestion (millions of requests/sec)",
      "Real-time anomaly detection with low false positive rate",
      "ML-based bot fingerprinting",
      "Low-latency decision making (<10ms per request)",
      "Scalable pipeline architecture",
    ],
    aiOpportunity: "Company is in 'brainstorming stage' for AI. They want to understand candidate's AI knowledge to explore how AI can enhance their product.",
  },

  questions: [
    {
      qNum: "BOT1",
      qEn: "How would you architect a high-efficiency traffic pipeline for bot detection at scale (millions of RPS)?",
      qVi: "Bạn sẽ thiết kế traffic pipeline hiệu năng cao cho bot detection ở quy mô triệu RPS như thế nào?",
      isMustKnow: true,
      note: "Câu này gắn trực tiếp kinh nghiệm HSC của bạn với bài toán của công ty.",

      perfectAnswer: `"This maps closely to what I built at HSC — high-throughput event pipeline.
   Here's how I'd architect it:

   INGESTION LAYER:
   Client requests → Load Balancer (Nginx/HAProxy)
                   → Edge Agents (deployed at CDN PoPs)
                   → Kafka topics (partitioned by IP range or geo)
   
   Why Kafka here? Same reason as HSC:
   - Buffer traffic spikes (DDoS can create 100x normal load)
   - Decouple ingestion from detection logic
   - Replay for model retraining
   - Throughput: single broker handles ~1M msg/sec

   DETECTION LAYER (real-time, <10ms target):
   Kafka Consumer → Feature Extraction Service
     Fast features (< 1ms): request rate, user agent, IP reputation lookup (Redis)
     Medium features (1-5ms): behavioral pattern (sliding window counter)
     Slow features (async): ML model scoring (offloaded, result cached)
   
   → Decision Engine:
     Rule-based: block known bad IPs immediately
     ML-score: if score > threshold → block/challenge
     Combination: rule OR (ml_score > 0.85 AND rate > 100rps)

   MITIGATION LAYER:
   Decision → Action:
     BLOCK: return 403 immediately
     CHALLENGE: serve CAPTCHA
     THROTTLE: rate limit to 10 rps
     ALLOW: pass through
   
   Feedback loop: Customer reports FP/FN → retrain model
   
   Key metrics to monitor:
   - Detection latency p99 < 10ms
   - False positive rate < 0.1% (critical — don't block real users)
   - Throughput: sustained 1M+ RPS per region"`,

      viAnswer: "Áp dụng kinh nghiệm HSC vào bài toán bot: Kafka cho ingestion buffer, 3-tier detection (rules → behavioral → ML), decision engine < 10ms, feedback loop cho model retraining.",
    },
    {
      qNum: "BOT2",
      qEn: "How would you apply AI/ML to enhance bot detection? What specific AI opportunities do you see?",
      qVi: "Bạn sẽ áp dụng AI/ML như thế nào để cải thiện bot detection? Cơ hội AI cụ thể nào bạn thấy?",
      note: "Mark đề cập công ty đang ở 'brainstorming stage về AI'. Đây là cơ hội để show AI knowledge trong context của họ.",

      perfectAnswer: `"I see 4 concrete AI opportunities for your platform:

   OPPORTUNITY 1 — ML-Based Bot Fingerprinting (most impactful):
   Current rule-based approach breaks when bots mimic humans.
   ML solution:
   - Features: mouse movement entropy, keystroke timing, request cadence,
     TLS fingerprint, browser API behavior
   - Model: Gradient Boosting (XGBoost) for initial, 
     LSTM for behavioral sequence patterns
   - Output: confidence score 0-1, not binary decision
   - Benefit: catches sophisticated bots that pass rules

   OPPORTUNITY 2 — Anomaly Detection with Isolation Forest:
   - Unsupervised ML: no need for labeled 'bot' data
   - Detects unusual traffic patterns automatically
   - Self-adapts as attack patterns evolve
   - Key for zero-day bot attacks (no signature yet)

   OPPORTUNITY 3 — RAG for Security Analyst Productivity:
   Given my RAG experience:
   - Ingest threat intel feeds, past incident reports, customer configs
   - Analyst query: 'What similar attack patterns have we seen from this IP range?'
   - Auto-generate incident summary and recommended mitigations
   - Reduce analyst investigation time from 30min → 5min

   OPPORTUNITY 4 — LLM for Config Generation:
   - Customer wants to block X but not Y — complex rule configuration
   - LLM converts natural language policy to firewall rules
   - 'Block all bots from China except Google and Bing crawlers'
   - → Auto-generates precise IP/ASN/UA rules
   
   I'd prioritize #1 (fingerprinting) for detection accuracy,
   and #3 (RAG for analysts) for operational efficiency — 
   both have clear ROI and I have direct experience with both."`,

    },
  ],
};


// ─────────────────────────────────────────────────────────────
// SECTION S16 — CANDIDATE'S QUESTIONS TO INTERVIEWER
// ─────────────────────────────────────────────────────────────
export const candidateQuestionsQA = {
  sectionId: "s16",
  sectionTitle: "Candidate's Questions to Interviewer",
  sectionSub: "Câu hỏi ngược lại cho người phỏng vấn để thể hiện sự quan tâm và tư duy leadership",

  questions: [
    {
      qNum: "CQ1",
      qEn: "What does a typical day look like for a Tech Lead in your team? How much time is spent on coding vs. architectural decisions vs. mentoring?",
      qVi: "Một ngày làm việc điển hình của một Tech Lead trong đội ngũ của anh/chị diễn ra như thế nào? Tỷ lệ thời gian dành cho việc coding, quyết định kiến trúc và hướng dẫn (mentoring) là bao nhiêu?",
      note: "Thể hiện bạn quan tâm đến sự cân bằng công việc và kỳ vọng thực tế của vai trò.",
    },
    {
      qNum: "CQ2",
      qEn: "What are the biggest technical challenges the team is currently facing? Is it scaling, legacy migration, or adopting new AI technologies?",
      qVi: "Những thách thức kỹ thuật lớn nhất mà đội ngũ đang phải đối mặt hiện nay là gì? Đó là việc mở rộng hệ thống (scaling), di chuyển hệ thống cũ (legacy migration), hay áp dụng các công nghệ AI mới?",
      note: "Thể hiện bạn muốn sẵn sàng giải quyết các vấn đề khó của công ty.",
    },
    {
      qNum: "CQ3",
      qEn: "How does the company balance the need for shipping fast features with maintaining long-term architectural quality and paying down technical debt?",
      qVi: "Công ty làm thế nào để cân bằng giữa nhu cầu ra mắt tính năng nhanh chóng với việc duy trì chất lượng kiến trúc dài hạn và xử lý nợ kỹ thuật (technical debt)?",
      note: "Thể hiện tư duy của một Lead quan tâm đến độ bền vững của hệ thống.",
    },
    {
      qNum: "CQ4",
      qEn: "Could you share more about the upcoming product roadmap? What are the most exciting features planned for the next 6-12 months?",
      qVi: "Anh/chị có thể chia sẻ thêm về lộ trình sản phẩm (product roadmap) sắp tới không? Những tính năng thú vị nhất nào được lên kế hoạch cho 6-12 tháng tới?",
      note: "Thể hiện sự quan tâm sâu sắc đến sản phẩm và tương lai của công ty.",
    },
    {
      qNum: "CQ5",
      qEn: "What does success look like for this position in the first 90 days?",
      qVi: "Sự thành công đối với vị trí này trong 90 ngày đầu tiên sẽ được định nghĩa như thế nào?",
      note: "Thể hiện bạn là người hướng đến kết quả và muốn đóng góp giá trị nhanh chóng.",
    }
  ]
};

// ─────────────────────────────────────────────────────────────
// SECTION S4PLUS — TECH LEAD PERFORMANCE STRATEGIES
// ─────────────────────────────────────────────────────────────
export const techLeadPerformanceQA = {
  sectionId: "s4plus",
  sectionTitle: "Tech Lead Performance Strategies",
  sectionSub: "Chiến lược cải thiện performance hệ thống từ góc độ lãnh đạo",

  questions: [
    {
      qNum: "TLP1",
      qEn: "As a Tech Lead, what systematic ways would you use to improve system performance?",
      qVi: "Với vai trò là Tech Lead, bạn sẽ cải thiện hiệu năng hệ thống bằng những cách hệ thống nào?",
      isMustKnow: true,
      perfectAnswer: `
1. **Establish Observability (Metrics First):**
   - Implement comprehensive monitoring (Prometheus, Grafana, ELK).
   - Define and track Golden Signals: Latency, Traffic, Errors, and Saturation.
   - Use Distributed Tracing (Jaeger/Zipkin) to identify bottlenecks in microservices.
   - *BLUF:* "You cannot improve what you cannot measure."

2. **Application Level Optimization:**
   - **Concurrency:** Use Virtual Threads (Java 21) or non-blocking I/O (WebFlux) for high-concurrency tasks.
   - **Caching:** Implement multi-tier caching (Local Guava/Caffeine + Distributed Redis).
   - **Algorithm:** Profile code using async-profiler to find hot spots and optimize algorithms (O(N^2) -> O(N log N)).

3. **Database & Storage Layer:**
   - **Indexing:** Optimize missing or redundant indexes.
   - **Read/Write Splitting:** Use Read Replicas to offload read traffic from the primary DB.
   - **Partitioning & Sharding:** Horizontal partitioning for massive tables; Sharding for scaling across multiple servers.
   - **Connection Pooling:** Tuning HikariCP for optimal performance.

4. **Architecture & Infrastructure:**
   - **Asynchronous Processing:** Use Kafka/RabbitMQ to offload non-critical tasks from the request-response path.
   - **Content Delivery:** Use CDN (Cloudflare/CloudFront) for static assets and edge caching.
   - **Load Balancing:** Strategic placement of L4/L7 load balancers (Kong, Nginx).
   - **Autoscaling:** Configure HPA/VPAs in Kubernetes based on CPU/Memory/Lag metrics.

5. **Operational Rigor:**
   - **Load Testing:** Regular JMeter/K6 stress tests.
   - **Code Reviews:** Enforcing performance-oriented coding standards.
   - **Resource Management:** Proper JVM tuning (G1GC/ZGC) and container resource limits.
`,
      viAnswer: `
1. **Thiết lập khả năng quan sát (Metrics First):** Triển khai Prometheus/Grafana, theo dõi Golden Signals (Latency, Traffic, Errors, Saturation).
2. **Tối ưu hóa tầng ứng dụng:** Java Virtual Threads, Caching đa tầng (Redis + Local), profiling code bằng async-profiler.
3. **Tối ưu hóa Database:** Indexing, Read replicas, Sharding/Partitioning, tuning Connection Pool.
4. **Kiến trúc & Hạ tầng:** Xử lý bất đồng bộ qua Kafka, sử dụng CDN, Load Balancing, và K8s Auto-scaling.
5. **Kỷ luật vận hành:** Load testing định kỳ, review code tập trung vào hiệu năng, và JVM tuning.
`
    }
  ]
};

// ─────────────────────────────────────────────────────────────
// TOC ADDITIONS — Add these to your navigation arrays
// ─────────────────────────────────────────────────────────────
export const supplementalTOCItems = [
  { id: "s5b", label: "Kafka AutoScaling ★", star: true },
  { id: "s6b", label: "RAG Pipeline Full ★", star: true },
  { id: "s6c", label: "RAG Summarization ★", star: true },
  { id: "s13", label: "Positioning" },
  { id: "s14", label: "Real Interview Replay ★", star: true },
  { id: "s15", label: "Company-Specific" },
];

// ─────────────────────────────────────────────────────────────
// QUICK REFERENCE — Flashcard data for rapid review
// ─────────────────────────────────────────────────────────────
export const flashcards = [
  {
    q: "Kafka partition count — can you increase after creation?",
    a: "YES but breaks key-based ordering. Solution: pre-provision 3x at creation.",
    vi: "Có thể tăng nhưng mất ordering. Pre-plan 3x từ đầu.",
  },
  {
    q: "Consumer count vs partition count rule?",
    a: "Consumer count must ALWAYS be ≤ partition count. Extra consumers = idle.",
    vi: "Consumer <= Partition. Thêm consumer hơn số partition là vô nghĩa.",
  },
  {
    q: "How does RAG select documents automatically?",
    a: "Query-driven: parse metadata filters from query (date, type, topic) → vector search with filter → automatic selection.",
    vi: "Parse metadata từ query → vector search có filter → tự động chọn.",
  },
  {
    q: "Map-Reduce summarization — when to use?",
    a: "When content > 4K tokens. MAP: parallel chunk summaries. REDUCE: synthesize summaries.",
    vi: "> 4K token: MAP song song từng chunk, REDUCE tổng hợp.",
  },
  {
    q: "RAG context overflow — what is it and how to fix?",
    a: "Too many retrieved chunks confuse LLM. Fix: re-rank top-20, keep only top 4. Relevance threshold.",
    vi: "Quá nhiều chunk làm LLM confused. Fix: re-rank, giữ top 4, dùng threshold.",
  },
  {
    q: "Tech Lead positioning in 1 sentence?",
    a: "40% hands-on IC, 60% leadership. Own hardest problems, enable the team.",
    vi: "40% code, 60% lãnh đạo. Tự làm phần khó nhất, enable team làm phần còn lại.",
  },
  {
    q: "Why Kafka over RabbitMQ for high-throughput?",
    a: "Replay capability, higher throughput (1M msg/s per broker), partition-based ordering, retention for reprocessing.",
    vi: "Replay, throughput cao hơn (1M/s), ordering trong partition, retention.",
  },
  {
    q: "KEDA — what is it?",
    a: "Kubernetes Event-Driven Autoscaler. Scales pods based on Kafka consumer lag metric.",
    vi: "KEDA scale Kubernetes pods dựa trên Kafka consumer lag.",
  },
  {
    q: "Hybrid search — why combine vector + BM25?",
    a: "Vector: semantic similarity (finds related concepts). BM25: exact keyword match (names, IDs). Hybrid = best of both.",
    vi: "Vector tìm nghĩa, BM25 tìm từ chính xác. Kết hợp = tốt nhất.",
  },
  {
    q: "Groundedness check in RAG — what is it?",
    a: "After generation, ask LLM to verify every claim exists in source context. Score 1-5. Regenerate if < 3.",
    vi: "Sau khi generate, dùng LLM kiểm tra mọi claim có trong source không. Score < 3 thì regenerate.",
  },
];

export default {
  kafkaAutoscalingQA,
  ragPipelineWalkthroughQA,
  ragSummarizationQA,
  positioningQA,
  realInterviewReplayQA,
  companySpecificQA,
  candidateQuestionsQA,
  techLeadPerformanceQA,
  supplementalTOCItems,
  flashcards,
};
