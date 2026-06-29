const fs = require('fs');

const extraGrammar = [
  {
    id: "past-continuous",
    title: "Past Continuous Tense",
    subtitle: "Sedang terjadi di masa lalu",
    explanation: "Digunakan untuk menyatakan kejadian yang sedang berlangsung pada waktu tertentu di masa lalu, atau kejadian yang sedang berlangsung ketika kejadian lain (Past Simple) menyela.",
    formula: "S + was/were + V-ing",
    examples: [
      {en: "I was sleeping when the phone rang.", id: "Saya sedang tidur ketika telepon berdering.", note: "Kejadian panjang (was sleeping) disela kejadian pendek (rang)"},
      {en: "They were playing football at 3 PM yesterday.", id: "Mereka sedang bermain sepak bola jam 3 sore kemarin.", note: "Fokus pada proses di waktu spesifik masa lalu"}
    ],
    practice: [
      {q: "While I ___ TV, the power went out.", options: ["watch", "watched", "was watching", "am watching"], answer: "was watching"},
      {q: "What ___ you doing when the accident happened?", options: ["was", "were", "are", "did"], answer: "were"}
    ]
  },
  {
    id: "past-perfect",
    title: "Past Perfect Tense",
    subtitle: "Lebih lampau dari masa lalu",
    explanation: "Digunakan untuk menunjukkan bahwa suatu kejadian sudah selesai SEBELUM kejadian lain di masa lalu terjadi.",
    formula: "S + had + V3",
    examples: [
      {en: "When I arrived at the station, the train had left.", id: "Ketika saya tiba di stasiun, kereta sudah berangkat.", note: "Kereta berangkat duluan (had left), baru saya tiba (arrived)"},
      {en: "She had finished her work before 5 PM.", id: "Dia sudah menyelesaikan pekerjaannya sebelum jam 5 sore.", note: "Kejadian selesai sebelum titik waktu di masa lalu"}
    ],
    practice: [
      {q: "I couldn't get in because I ___ my keys.", options: ["lost", "have lost", "had lost", "was losing"], answer: "had lost"},
      {q: "By the time we got to the cinema, the movie ___.", options: ["started", "has started", "had started", "was starting"], answer: "had started"}
    ]
  },
  {
    id: "future-continuous",
    title: "Future Continuous Tense",
    subtitle: "Sedang terjadi di masa depan",
    explanation: "Digunakan untuk menyatakan kejadian yang AKAN SEDANG berlangsung pada waktu tertentu di masa depan.",
    formula: "S + will be + V-ing",
    examples: [
      {en: "This time tomorrow, I will be flying to Tokyo.", id: "Jam segini besok, saya akan sedang terbang ke Tokyo.", note: "Menekankan proses di masa depan"},
      {en: "Don't call me at 8 PM. I will be having dinner.", id: "Jangan telepon jam 8 malam. Saya akan sedang makan malam.", note: "Proses sedang terjadi"}
    ],
    practice: [
      {q: "At 10 AM tomorrow, we ___ a meeting.", options: ["will have", "will be having", "have", "are having"], answer: "will be having"}
    ]
  },
  {
    id: "present-perfect-continuous",
    title: "Present Perfect Continuous",
    subtitle: "Sudah mulai dan masih berlangsung",
    explanation: "Digunakan untuk menyatakan kejadian yang dimulai di masa lalu dan MASIH BERLANGSUNG hingga sekarang (menekankan durasi waktu).",
    formula: "S + have/has + been + V-ing",
    examples: [
      {en: "I have been waiting for two hours.", id: "Saya sudah menunggu selama dua jam (dan sekarang masih menunggu).", note: "Menekankan durasi"},
      {en: "It has been raining since morning.", id: "Sudah hujan sejak pagi.", note: "Fokus pada proses yang belum selesai"}
    ],
    practice: [
      {q: "She is very tired. She ___ all day.", options: ["has worked", "has been working", "is working", "worked"], answer: "has been working"}
    ]
  },
  {
    id: "past-perfect-continuous",
    title: "Past Perfect Continuous",
    subtitle: "Proses sebelum masa lalu",
    explanation: "Menunjukkan berapa lama suatu kejadian telah berlangsung sebelum kejadian lain di masa lalu terjadi.",
    formula: "S + had + been + V-ing",
    examples: [
      {en: "He was tired because he had been running.", id: "Dia lelah karena dia telah berlari.", note: "Proses berlari selesai sebelum dia merasa lelah di masa lalu"},
      {en: "We had been waiting for an hour when the bus finally arrived.", id: "Kami telah menunggu selama satu jam ketika bus akhirnya tiba.", note: "Durasi sebelum kejadian masa lalu"}
    ],
    practice: [
      {q: "The ground was wet because it ___ all night.", options: ["had rained", "had been raining", "has rained", "rained"], answer: "had been raining"}
    ]
  },
  {
    id: "future-perfect",
    title: "Future Perfect Tense",
    subtitle: "Selesai di masa depan",
    explanation: "Digunakan untuk menyatakan kejadian yang PASTI SUDAH SELESAI pada titik waktu tertentu di masa depan.",
    formula: "S + will + have + V3",
    examples: [
      {en: "By next year, I will have graduated.", id: "Menjelang tahun depan, saya akan sudah lulus.", note: "Kejadian selesai sebelum batas waktu"},
      {en: "She will have finished the report by 5 PM.", id: "Dia akan sudah menyelesaikan laporan menjelang jam 5.", note: "Menunjukkan penyelesaian"}
    ],
    practice: [
      {q: "By the time you arrive, I ___ the house.", options: ["will clean", "will be cleaning", "will have cleaned", "clean"], answer: "will have cleaned"}
    ]
  },
  {
    id: "future-perfect-continuous",
    title: "Future Perfect Continuous",
    subtitle: "Durasi hingga titik masa depan",
    explanation: "Tense paling jarang dipakai. Menunjukkan berapa lama suatu kejadian telah berlangsung PADA titik waktu tertentu di masa depan.",
    formula: "S + will + have + been + V-ing",
    examples: [
      {en: "By next month, I will have been working here for 5 years.", id: "Menjelang bulan depan, saya akan sudah bekerja di sini selama 5 tahun.", note: "Fokus pada durasi"}
    ],
    practice: [
      {q: "By December, she ___ English for two years.", options: ["will study", "will have studied", "will have been studying", "is studying"], answer: "will have been studying"}
    ]
  },
  {
    id: "prepositions-time",
    title: "Prepositions of Time",
    subtitle: "In, On, At untuk Waktu",
    explanation: "AT untuk waktu spesifik (jam). ON untuk hari dan tanggal. IN untuk bulan, tahun, musim, dan bagian hari yang panjang.",
    formula: "At (waktu spesifik), On (hari/tanggal), In (periode panjang)",
    examples: [
      {en: "The meeting is at 8 AM.", id: "Rapatnya jam 8 pagi.", note: "At + jam"},
      {en: "I will see you on Monday.", id: "Saya akan menemuimu pada hari Senin.", note: "On + hari"},
      {en: "He was born in 1995.", id: "Dia lahir pada tahun 1995.", note: "In + tahun"}
    ],
    practice: [
      {q: "My birthday is ___ October 5th.", options: ["in", "on", "at", "by"], answer: "on"},
      {q: "We usually ski ___ winter.", options: ["in", "on", "at", "during"], answer: "in"}
    ]
  },
  {
    id: "prepositions-place",
    title: "Prepositions of Place",
    subtitle: "In, On, At untuk Tempat",
    explanation: "AT untuk titik lokasi spesifik. ON untuk permukaan (nempel). IN untuk ruang tertutup atau area 3 dimensi.",
    formula: "At (titik), On (permukaan), In (ruang)",
    examples: [
      {en: "Someone is at the door.", id: "Seseorang ada di depan pintu.", note: "Titik lokasi"},
      {en: "The book is on the table.", id: "Buku itu ada di atas meja.", note: "Menempel di permukaan"},
      {en: "She lives in London.", id: "Dia tinggal di London.", note: "Area luas/dalam ruang"}
    ],
    practice: [
      {q: "There is a fly ___ the ceiling.", options: ["in", "on", "at", "over"], answer: "on"},
      {q: "I am waiting for you ___ the bus stop.", options: ["in", "on", "at", "under"], answer: "at"}
    ]
  },
  {
    id: "noun-clauses",
    title: "Noun Clauses",
    subtitle: "Klausa sebagai Kata Benda",
    explanation: "Anak kalimat yang berfungsi sebagai subjek atau objek dalam kalimat. Biasanya diawali that, wh- questions, if/whether.",
    formula: "Clause (S + V) acts as Noun",
    examples: [
      {en: "I know what you did last summer.", id: "Saya tahu apa yang kamu lakukan musim panas lalu.", note: "Objek"},
      {en: "What he said is not true.", id: "Apa yang dia katakan tidaklah benar.", note: "Subjek"}
    ],
    practice: [
      {q: "Do you know ___?", options: ["where does she live", "where she lives", "she lives where", "does she live where"], answer: "where she lives"}
    ]
  },
  {
    id: "adverbial-clauses",
    title: "Adverbial Clauses",
    subtitle: "Klausa Kata Keterangan",
    explanation: "Klausa yang menjelaskan kapan, mengapa, di mana, atau bagaimana suatu kejadian terjadi (karena, meskipun, jika, ketika).",
    formula: "Conjunction + S + V",
    examples: [
      {en: "Although it was raining, we went out.", id: "Meskipun sedang hujan, kami pergi keluar.", note: "Adverbial clause of concession"},
      {en: "I will call you when I arrive.", id: "Saya akan meneleponmu ketika saya tiba.", note: "Adverbial clause of time"}
    ],
    practice: [
      {q: "___ he was tired, he kept working.", options: ["Because", "Although", "If", "When"], answer: "Although"}
    ]
  },
  {
    id: "participles-adjectives",
    title: "Participles as Adjectives",
    subtitle: "Bored vs Boring",
    explanation: "V-ing (Present Participle) memberikan sifat/efek ke luar (membosankan). V-ed/V3 (Past Participle) menunjukkan perasaan dari dalam yang menerima efek (bosan).",
    formula: "-ing (penyebab) vs -ed (penerima/perasaan)",
    examples: [
      {en: "The movie was boring.", id: "Filmnya membosankan.", note: "Film = penyebab sifat"},
      {en: "I was bored during the movie.", id: "Saya merasa bosan selama film.", note: "Saya = penerima efek"}
    ],
    practice: [
      {q: "I am very ___ in history.", options: ["interest", "interesting", "interested", "interests"], answer: "interested"},
      {q: "The roller coaster ride was ___.", options: ["thrill", "thrilling", "thrilled", "thrills"], answer: "thrilling"}
    ]
  },
  {
    id: "preferences",
    title: "Preferences",
    subtitle: "Menyatakan Pilihan",
    explanation: "Cara mengatakan lebih suka sesuatu daripada yang lain. Prefer (Noun/V-ing to Noun/V-ing). Would rather (V1 than V1). Would prefer (to V1 rather than V1).",
    formula: "Prefer A to B | Would rather A than B",
    examples: [
      {en: "I prefer tea to coffee.", id: "Saya lebih suka teh daripada kopi.", note: ""},
      {en: "I would rather stay home than go out.", id: "Saya lebih suka diam di rumah daripada pergi keluar.", note: "Peringatan: jangan pakai 'to' setelah would rather"}
    ],
    practice: [
      {q: "I prefer reading ___ watching TV.", options: ["than", "to", "rather than", "from"], answer: "to"},
      {q: "She would rather ___ now.", options: ["leave", "to leave", "leaving", "leaves"], answer: "leave"}
    ]
  },
  {
    id: "conjunctions",
    title: "Conjunctions",
    subtitle: "Kata Sambung (FANBOYS & Correlative)",
    explanation: "Coordinating (For, And, Nor, But, Or, Yet, So). Correlative (pasangan): Both...and, Either...or, Neither...nor, Not only...but also.",
    formula: "Either + A + or + B",
    examples: [
      {en: "He is both smart and hard-working.", id: "Dia pintar sekaligus pekerja keras.", note: ""},
      {en: "Neither John nor Mary is coming.", id: "Baik John maupun Mary tidak datang.", note: "Verb ikut subjek terdekat (Mary -> is)"}
    ],
    practice: [
      {q: "I will either buy a car ___ rent one.", options: ["nor", "and", "but", "or"], answer: "or"},
      {q: "It was raining, ___ we stayed home.", options: ["for", "but", "so", "yet"], answer: "so"}
    ]
  },
  {
    id: "reflexive-pronouns",
    title: "Reflexive Pronouns",
    subtitle: "Myself, Yourself, Themselves",
    explanation: "Digunakan ketika subjek dan objek adalah orang/benda yang sama, atau untuk memberi penekanan (saya sendiri yang melakukannya).",
    formula: "S + V + Reflexive Pronoun",
    examples: [
      {en: "I cut myself while cooking.", id: "Saya tidak sengaja mengiris tangan saya sendiri saat memasak.", note: ""},
      {en: "She built the house herself.", id: "Dia membangun rumah itu sendiri (tanpa bantuan).", note: "Penekanan"}
    ],
    practice: [
      {q: "They solved the problem by ___.", options: ["them", "their", "themselves", "theirs"], answer: "themselves"}
    ]
  },
  {
    id: "indefinite-pronouns",
    title: "Indefinite Pronouns",
    subtitle: "Someone, Anybody, Everything",
    explanation: "Kata ganti yang tidak merujuk pada orang/benda tertentu. Semuanya selalu dianggap TUNGGAL secara gramatikal (Singular).",
    formula: "Indefinite Pronoun + Singular Verb",
    examples: [
      {en: "Everybody is happy.", id: "Semua orang bahagia.", note: "Bukan 'are' meskipun maknanya banyak"},
      {en: "Is there anybody home?", id: "Apakah ada orang di rumah?", note: ""}
    ],
    practice: [
      {q: "Someone ___ knocking at the door.", options: ["is", "are", "were", "have"], answer: "is"}
    ]
  },
  {
    id: "zero-article",
    title: "Zero Article",
    subtitle: "Kapan TIDAK memakai A, An, atau The",
    explanation: "Artikel tidak digunakan untuk benda abstrak, bahasa, olahraga, makanan, nama negara tunggal, atau rutinitas tertentu (go to bed, go to school).",
    formula: "Tanpa a/an/the",
    examples: [
      {en: "I love music.", id: "Saya cinta musik.", note: "Bukan 'the music' secara umum"},
      {en: "He speaks French.", id: "Dia berbicara bahasa Prancis.", note: "Bukan 'the French'"},
      {en: "Time is money.", id: "Waktu adalah uang.", note: "Benda abstrak"}
    ],
    practice: [
      {q: "I usually drink ___ coffee in the morning.", options: ["a", "an", "the", "-"], answer: "-"}
    ]
  },
  {
    id: "order-of-adjectives",
    title: "Order of Adjectives",
    subtitle: "OSASCOMP (Urutan Kata Sifat)",
    explanation: "Jika ada banyak kata sifat untuk 1 benda, urutannya: Opinion, Size, Age, Shape, Color, Origin, Material, Purpose.",
    formula: "Opinion > Size > Age > Shape > Color > Origin > Material > Purpose",
    examples: [
      {en: "A beautiful, small, old, brown, Italian, wooden chair.", id: "Kursi kayu Italia cokelat tua yang indah dan kecil.", note: "Op(beautiful)-Si(small)-Ag(old)-Co(brown)-Or(Italian)-Ma(wooden)"}
    ],
    practice: [
      {q: "She bought a ___ car.", options: ["red new sports", "new red sports", "sports new red", "red sports new"], answer: "new red sports"}
    ]
  },
  {
    id: "phrasal-verbs",
    title: "Phrasal Verbs (Grammar)",
    subtitle: "Separable vs Inseparable",
    explanation: "Gabungan kata kerja dan preposisi. Ada yang bisa dipisah (Turn it off) dan ada yang tidak bisa dipisah (Look for it). Jika objeknya Pronoun (it/them), letaknya WAJIB di tengah pada phrasal verb separable.",
    formula: "Turn off the TV / Turn the TV off / Turn it off",
    examples: [
      {en: "Take off your shoes. / Take them off.", id: "Lepas sepatumu. / Lepas sepatu itu.", note: "Separable"},
      {en: "I am looking for my keys. / I am looking for them.", id: "Saya sedang mencari kunci saya.", note: "Inseparable (Bukan 'looking them for')"}
    ],
    practice: [
      {q: "Please turn off the lights. Please turn ___.", options: ["off them", "them off", "they off", "off they"], answer: "them off"}
    ]
  },
  {
    id: "wh-questions",
    title: "Question Words (Wh-)",
    subtitle: "Struktur Kalimat Tanya",
    explanation: "Rumus baku kalimat tanya: Wh-word + Auxiliary + Subject + Main Verb. Perhatikan bahwa auxiliary wajib ada kecuali jika menanyakan Subject secara langsung (Who broke the window?).",
    formula: "Wh- + Aux + S + V ?",
    examples: [
      {en: "Where do you live?", id: "Di mana kamu tinggal?", note: "Where + do + you + live"},
      {en: "Who ate the cake?", id: "Siapa yang memakan kuenya?", note: "Menanyakan subjek, tidak perlu 'did' (Bukan 'Who did eat')"}
    ],
    practice: [
      {q: "___ did you arrive?", options: ["When", "Who", "What", "Which"], answer: "When"},
      {q: "Who ___ this beautiful song?", options: ["write", "wrote", "did write", "does write"], answer: "wrote"}
    ]
  }
];

const dbData = JSON.parse(fs.readFileSync('db.json', 'utf8'));

// Filter out to avoid duplicates if run multiple times
const existingIds = new Set(dbData.grammar.map(g => g.id));
let addedCount = 0;

for (const grammar of extraGrammar) {
  if (!existingIds.has(grammar.id)) {
    dbData.grammar.push(grammar);
    addedCount++;
  }
}

fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
console.log(`Added ${addedCount} remaining grammar topics. Total topics now: ${dbData.grammar.length}`);
