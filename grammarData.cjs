module.exports = [
  {
    id: "tobe",
    title: "To Be (am / is / are)",
    subtitle: "Verb paling dasar",
    explanation: "To be adalah kata kerja dasar yang menghubungkan subjek dengan pelengkapnya (noun, adjective, adverb). Digunakan saat tidak ada kata kerja aksi nyata.",
    formula: "S + am/is/are + Noun/Adjective/Adverb",
    examples: [
      {en: "I am a student.", id: "Saya adalah seorang siswa.", note: "am untuk I"},
      {en: "She is beautiful.", id: "Dia cantik.", note: "is untuk He/She/It"},
      {en: "They are here.", id: "Mereka ada di sini.", note: "are untuk You/We/They"}
    ],
    practice: [
      {q: "She ___ a doctor.", options: ["am", "is", "are"], answer: "is"},
      {q: "They ___ my best friends.", options: ["am", "is", "are"], answer: "are"}
    ]
  },
  {
    id: "present-simple",
    title: "Present Simple Tense",
    subtitle: "Fakta & Rutinitas",
    explanation: "Digunakan untuk menyatakan fakta, kebenaran umum, atau kebiasaan yang dilakukan secara berulang-ulang.",
    formula: "S + V1 (s/es) / S + do/does + not + V1",
    examples: [
      {en: "The sun rises in the east.", id: "Matahari terbit dari timur.", note: "Fakta"},
      {en: "She drinks coffee every morning.", id: "Dia minum kopi setiap pagi.", note: "Rutinitas (tambah 's' pada V1 untuk She/He/It)"},
      {en: "I do not like apples.", id: "Saya tidak suka apel.", note: "Kalimat negatif menggunakan do/does"}
    ],
    practice: [
      {q: "He ___ to school every day.", options: ["go", "goes", "going", "gone"], answer: "goes"},
      {q: "___ they play football on Sundays?", options: ["Do", "Does", "Are", "Is"], answer: "Do"}
    ]
  },
  {
    id: "present-continuous",
    title: "Present Continuous Tense",
    subtitle: "Aksi yang sedang berlangsung",
    explanation: "Digunakan untuk menyatakan kejadian yang sedang berlangsung saat ini atau rencana di masa depan yang sudah pasti.",
    formula: "S + am/is/are + V-ing",
    examples: [
      {en: "I am studying right now.", id: "Saya sedang belajar sekarang.", note: "Sedang terjadi"},
      {en: "We are leaving tomorrow.", id: "Kita akan berangkat besok.", note: "Rencana masa depan"}
    ],
    practice: [
      {q: "Look! The baby ___.", options: ["sleeps", "is sleeping", "sleep", "slept"], answer: "is sleeping"},
      {q: "What ___ you doing right now?", options: ["do", "are", "is", "did"], answer: "are"}
    ]
  },
  {
    id: "past-simple",
    title: "Past Simple Tense",
    subtitle: "Kejadian masa lalu",
    explanation: "Digunakan untuk menceritakan kejadian yang sudah selesai di masa lalu.",
    formula: "S + V2 / S + did + not + V1",
    examples: [
      {en: "I visited Bali last year.", id: "Saya mengunjungi Bali tahun lalu.", note: "Kejadian lampau dengan verb regular (-ed)"},
      {en: "She went to the market.", id: "Dia pergi ke pasar.", note: "Verb irregular (went dari go)"},
      {en: "He did not call me.", id: "Dia tidak menelepon saya.", note: "Setelah 'did', kembali ke V1"}
    ],
    practice: [
      {q: "I ___ a good movie yesterday.", options: ["see", "saw", "seen", "seeing"], answer: "saw"},
      {q: "They ___ not come to the party.", options: ["do", "does", "did", "were"], answer: "did"}
    ]
  },
  {
    id: "present-perfect",
    title: "Present Perfect Tense",
    subtitle: "Kejadian yang sudah berlalu tapi efeknya masih ada",
    explanation: "Digunakan untuk menyatakan kejadian yang terjadi pada waktu yang tidak spesifik di masa lalu, atau yang dimulai di masa lalu dan masih berlanjut hingga sekarang.",
    formula: "S + have/has + V3",
    examples: [
      {en: "I have finished my homework.", id: "Saya sudah menyelesaikan PR saya.", note: "Waktu tidak penting, yang penting sudah selesai"},
      {en: "She has lived here for 5 years.", id: "Dia telah tinggal di sini selama 5 tahun.", note: "Sampai sekarang masih tinggal di sini"}
    ],
    practice: [
      {q: "We ___ known each other since 2010.", options: ["have", "has", "had", "are"], answer: "have"},
      {q: "___ she eaten breakfast?", options: ["Do", "Has", "Have", "Did"], answer: "Has"}
    ]
  },
  {
    id: "future-simple",
    title: "Future Simple Tense",
    subtitle: "Masa Depan (Will / Be going to)",
    explanation: "Digunakan untuk membuat prediksi, janji, tawaran spontan (will) atau rencana yang sudah diniatkan (be going to).",
    formula: "S + will + V1 / S + am/is/are + going to + V1",
    examples: [
      {en: "I think it will rain.", id: "Saya pikir akan hujan.", note: "Prediksi"},
      {en: "I am going to buy a car.", id: "Saya akan membeli mobil.", note: "Rencana yang sudah ada niat"}
    ],
    practice: [
      {q: "Hold on, I ___ help you with those bags.", options: ["will", "am going to", "do", "did"], answer: "will"},
      {q: "She ___ to visit her grandma next week.", options: ["will", "is going", "goes", "went"], answer: "is going"}
    ]
  },
  {
    id: "modals",
    title: "Modal Verbs",
    subtitle: "Can, Could, Should, Must, May, Might",
    explanation: "Kata kerja bantu untuk mengekspresikan kemampuan, izin, kemungkinan, keharusan, atau saran. Modal selalu diikuti oleh Verb 1 murni (tanpa to, tanpa -s).",
    formula: "S + Modal + V1 murni",
    examples: [
      {en: "I can swim.", id: "Saya bisa berenang.", note: "Kemampuan (Ability)"},
      {en: "You should study harder.", id: "Kamu seharusnya belajar lebih giat.", note: "Saran (Advice)"},
      {en: "It might rain tonight.", id: "Mungkin akan hujan malam ini.", note: "Kemungkinan (Possibility)"},
      {en: "You must wear a uniform.", id: "Kamu harus memakai seragam.", note: "Keharusan mutlak (Obligation)"}
    ],
    practice: [
      {q: "You look tired. You ___ go to bed early.", options: ["should", "must", "can", "might"], answer: "should"},
      {q: "She ___ speak three languages.", options: ["can", "should", "must", "may"], answer: "can"}
    ]
  },
  {
    id: "conditional-0-1",
    title: "Conditionals Type 0 & 1",
    subtitle: "Fakta & Kemungkinan Masa Depan",
    explanation: "Type 0 untuk fakta mutlak (If + Present, Present). Type 1 untuk kemungkinan di masa depan (If + Present, Future).",
    formula: "Type 0: If + V1, V1. Type 1: If + V1, will + V1.",
    examples: [
      {en: "If you heat ice, it melts.", id: "Jika kamu memanaskan es, es itu mencair.", note: "Type 0 - Fakta ilmiah"},
      {en: "If it rains, I will stay home.", id: "Jika hujan, saya akan diam di rumah.", note: "Type 1 - Kemungkinan nyata"}
    ],
    practice: [
      {q: "If you mix red and blue, you ___ purple.", options: ["get", "will get", "got", "would get"], answer: "get"},
      {q: "If she studies hard, she ___ pass the exam.", options: ["passes", "will pass", "passed", "would pass"], answer: "will pass"}
    ]
  },
  {
    id: "conditional-2-3",
    title: "Conditionals Type 2 & 3",
    subtitle: "Khayalan & Penyesalan",
    explanation: "Type 2 untuk khayalan di masa kini (If + V2, would V1). Type 3 untuk penyesalan masa lalu (If + had V3, would have V3). Dalam tipe 2, 'to be' untuk semua subjek adalah 'were'.",
    formula: "Type 2: If + V2/were, would + V1. Type 3: If + had V3, would have V3.",
    examples: [
      {en: "If I were a millionaire, I would travel the world.", id: "Seandainya saya jutawan, saya akan keliling dunia.", note: "Type 2 - Faktanya tidak kaya"},
      {en: "If I had known, I would have helped you.", id: "Seandainya saya tahu dulu, saya pasti sudah membantumu.", note: "Type 3 - Faktanya dulu tidak tahu"}
    ],
    practice: [
      {q: "If I ___ you, I would apologize.", options: ["am", "was", "were", "had been"], answer: "were"},
      {q: "If they had left earlier, they ___ missed the train.", options: ["would not have", "would not", "will not", "had not"], answer: "would not have"}
    ]
  },
  {
    id: "passive-voice",
    title: "Passive Voice",
    subtitle: "Kalimat Pasif",
    explanation: "Fokus pada objek yang menerima aksi, bukan pada subjek pelaku. Penting untuk penulisan akademik dan berita.",
    formula: "Object + to be (sesuai tense) + Verb 3 (Past Participle)",
    examples: [
      {en: "The letter was written by John.", id: "Surat itu ditulis oleh John.", note: "Simple Past Passive"},
      {en: "A new road is being built.", id: "Sebuah jalan baru sedang dibangun.", note: "Present Continuous Passive"},
      {en: "The work will be finished tomorrow.", id: "Pekerjaan itu akan diselesaikan besok.", note: "Future Passive"}
    ],
    practice: [
      {q: "The window ___ by the boys yesterday.", options: ["broke", "is broken", "was broken", "has broken"], answer: "was broken"},
      {q: "English ___ spoken all over the world.", options: ["is", "was", "has", "be"], answer: "is"}
    ]
  },
  {
    id: "reported-speech",
    title: "Reported Speech",
    subtitle: "Kalimat Tidak Langsung",
    explanation: "Digunakan untuk menyampaikan kembali apa yang dikatakan orang lain. Tense biasanya mundur satu langkah ke masa lalu (backshift).",
    formula: "Present -> Past, Past -> Past Perfect, Will -> Would",
    examples: [
      {en: "Direct: 'I like apples.'", id: "Langsung: 'Saya suka apel.'", note: ""},
      {en: "Reported: He said (that) he liked apples.", id: "Tidak langsung: Dia mengatakan bahwa dia suka apel.", note: "like berubah menjadi liked"}
    ],
    practice: [
      {q: "She said, 'I am tired.' -> She said that she ___ tired.", options: ["is", "was", "were", "had been"], answer: "was"},
      {q: "John said, 'I will call you.' -> John said that he ___ call me.", options: ["will", "would", "can", "should"], answer: "would"}
    ]
  },
  {
    id: "gerund-infinitive",
    title: "Gerund vs Infinitive",
    subtitle: "V-ing vs To + V1",
    explanation: "Beberapa kata kerja hanya bisa diikuti oleh Gerund (enjoy, mind, stop). Beberapa hanya bisa diikuti Infinitive (want, decide, hope).",
    formula: "V + V-ing ATAU V + to V1",
    examples: [
      {en: "I enjoy reading books.", id: "Saya menikmati membaca buku.", note: "Enjoy + Gerund"},
      {en: "She decided to leave.", id: "Dia memutuskan untuk pergi.", note: "Decide + Infinitive"}
    ],
    practice: [
      {q: "Do you mind ___ the window?", options: ["to close", "close", "closing", "closed"], answer: "closing"},
      {q: "I want ___ the manager.", options: ["see", "seeing", "to see", "saw"], answer: "to see"}
    ]
  },
  {
    id: "relative-clauses",
    title: "Relative Clauses",
    subtitle: "Who, Which, That, Whose, Whom",
    explanation: "Klausa yang berfungsi menjelaskan kata benda sebelumnya. Who (manusia/subjek), Whom (manusia/objek), Which (benda), That (manusia/benda), Whose (kepemilikan).",
    formula: "Noun + Relative Pronoun + Clause",
    examples: [
      {en: "The man who called you is my uncle.", id: "Pria yang meneleponmu adalah pamanku.", note: "Who menjelaskan the man (subjek)"},
      {en: "The car which I bought is fast.", id: "Mobil yang saya beli cepat.", note: "Which menjelaskan the car (benda)"},
      {en: "The girl whose bag is red is my sister.", id: "Gadis yang tasnya merah adalah saudari saya.", note: "Whose menjelaskan kepemilikan tas"}
    ],
    practice: [
      {q: "The book ___ is on the table belongs to me.", options: ["who", "whom", "which", "whose"], answer: "which"},
      {q: "I know the boy ___ father is a doctor.", options: ["who", "whom", "which", "whose"], answer: "whose"}
    ]
  },
  {
    id: "question-tags",
    title: "Question Tags",
    subtitle: "Pertanyaan Singkat di Akhir Kalimat",
    explanation: "Digunakan untuk meminta persetujuan. Jika kalimat positif, tag negatif. Jika kalimat negatif, tag positif.",
    formula: "Kalimat Positif + , + Aux Negatif + S? / Kalimat Negatif + , + Aux Positif + S?",
    examples: [
      {en: "You are a student, aren't you?", id: "Kamu seorang siswa, kan?", note: "Are -> aren't"},
      {en: "She didn't come, did she?", id: "Dia tidak datang, kan?", note: "Didn't -> did"}
    ],
    practice: [
      {q: "He can swim, ___?", options: ["can he", "can't he", "does he", "doesn't he"], answer: "can't he"},
      {q: "They have arrived, ___?", options: ["have they", "haven't they", "do they", "don't they"], answer: "haven't they"}
    ]
  },
  {
    id: "degrees-of-comparison",
    title: "Degrees of Comparison",
    subtitle: "Positive, Comparative, Superlative",
    explanation: "Membandingkan kata sifat (adjectives). Comparative (+er / more) untuk membandingkan 2 hal. Superlative (+est / most) untuk membandingkan 3 hal atau lebih.",
    formula: "Adj-er + than / more + Adj + than / the + Adj-est / the most + Adj",
    examples: [
      {en: "He is taller than me.", id: "Dia lebih tinggi dariku.", note: "Comparative (1 suku kata)"},
      {en: "This book is more interesting.", id: "Buku ini lebih menarik.", note: "Comparative (3 suku kata)"},
      {en: "She is the smartest girl in the class.", id: "Dia gadis terpintar di kelas.", note: "Superlative"}
    ],
    practice: [
      {q: "My car is ___ than yours.", options: ["fast", "faster", "fastest", "more fast"], answer: "faster"},
      {q: "This is the ___ movie I have ever seen.", options: ["good", "better", "best", "most good"], answer: "best"}
    ]
  },
  {
    id: "articles",
    title: "Articles (a, an, the)",
    subtitle: "Kata Sandang",
    explanation: "A/An (Indefinite) untuk benda tunggal yang belum spesifik. A untuk bunyi konsonan, An untuk bunyi vokal. The (Definite) untuk benda yang sudah spesifik atau satu-satunya di dunia.",
    formula: "a/an + Singular Noun / the + Noun",
    examples: [
      {en: "I saw a cat.", id: "Saya melihat seekor kucing.", note: "Kucing mana saja (belum spesifik)"},
      {en: "I saw an umbrella.", id: "Saya melihat sebuah payung.", note: "An karena bunyi vokal 'u'"},
      {en: "The sun is hot.", id: "Matahari itu panas.", note: "Satu-satunya di dunia"}
    ],
    practice: [
      {q: "I want to buy ___ umbrella.", options: ["a", "an", "the", "-"], answer: "an"},
      {q: "Can you close ___ door, please?", options: ["a", "an", "the", "-"], answer: "the"}
    ]
  },
  {
    id: "causative-verbs",
    title: "Causative Verbs",
    subtitle: "Make, Have, Let, Get",
    explanation: "Digunakan ketika kita menyebabkan orang lain melakukan sesuatu. Make (memaksa), Have (menugaskan), Let (mengizinkan), Get (membujuk).",
    formula: "Make/Have/Let + Person + V1 murni | Get + Person + to V1",
    examples: [
      {en: "My boss made me work late.", id: "Bos saya memaksa saya kerja lembur.", note: "Make + V1"},
      {en: "I had the mechanic fix my car.", id: "Saya menyuruh mekanik memperbaiki mobil saya.", note: "Have + V1"},
      {en: "I got him to help me.", id: "Saya membujuk dia untuk membantuku.", note: "Get + to V1"}
    ],
    practice: [
      {q: "She let her children ___ outside.", options: ["play", "to play", "playing", "played"], answer: "play"},
      {q: "I will get him ___ the report.", options: ["finish", "to finish", "finishing", "finished"], answer: "to finish"}
    ]
  },
  {
    id: "subjunctive",
    title: "Subjunctive",
    subtitle: "Keinginan, Saran, atau Pengandaian",
    explanation: "Sering digunakan setelah kata kerja tertentu (suggest, recommend, demand) atau untuk harapan (wish). Kata kerja klausa setelah 'that' selalu dalam bentuk V1 murni untuk semua subjek.",
    formula: "S + suggest that + S2 + V1 murni",
    examples: [
      {en: "The doctor recommended that he stop smoking.", id: "Dokter menyarankan agar dia berhenti merokok.", note: "Bukan 'stops' meskipun subjeknya 'he'"},
      {en: "I wish I were rich.", id: "Saya harap saya kaya.", note: "Wish diikuti Past Tense (were untuk semua subjek)"}
    ],
    practice: [
      {q: "I demand that she ___ here immediately.", options: ["be", "is", "was", "am"], answer: "be"},
      {q: "I wish it ___ not raining right now.", options: ["is", "were", "was", "be"], answer: "were"}
    ]
  },
  {
    id: "inversion-advanced",
    title: "Inversion (Advanced)",
    subtitle: "Pembalikan Subjek & Verb (Level IELTS/TOEFL)",
    explanation: "Membalik urutan subjek dan verb seperti kalimat tanya untuk penekanan. Terjadi setelah kata negatif di awal kalimat (Never, Seldom, Rarely, Not only, Hardly).",
    formula: "Negative Word + Aux + S + V",
    examples: [
      {en: "Never have I seen such a beautiful view.", id: "Belum pernah saya melihat pemandangan seindah itu.", note: "Bukan 'I have never seen'"},
      {en: "Not only is he smart, but he is also kind.", id: "Bukan hanya dia pintar, tapi dia juga baik.", note: "Not only is he..."}
    ],
    practice: [
      {q: "Rarely ___ such a mistake.", options: ["he makes", "does he make", "he does make", "make he"], answer: "does he make"},
      {q: "Hardly ___ asleep when the phone rang.", options: ["had I fallen", "I had fallen", "did I fall", "I fell"], answer: "had I fallen"}
    ]
  },
  {
    id: "subject-verb-agreement",
    title: "Subject-Verb Agreement",
    subtitle: "Kesesuaian Subjek dan Predikat",
    explanation: "Subjek tunggal harus menggunakan verb tunggal (is, was, has, Vs). Subjek jamak menggunakan verb jamak (are, were, have, V1). Perhatikan kata 'everyone', 'each', 'neither' yang selalu dianggap tunggal.",
    formula: "Singular Subject -> Singular Verb | Plural Subject -> Plural Verb",
    examples: [
      {en: "Everyone is here.", id: "Semua orang ada di sini.", note: "Everyone dianggap tunggal (is)"},
      {en: "A number of students are absent.", id: "Sejumlah siswa absen.", note: "A number of = jamak"},
      {en: "The number of students is 50.", id: "Jumlah siswa adalah 50.", note: "The number of = tunggal"}
    ],
    practice: [
      {q: "Each of the boys ___ given a present.", options: ["was", "were", "are", "have been"], answer: "was"},
      {q: "Neither John nor his friends ___ coming.", options: ["is", "are", "was", "has"], answer: "are"}
    ]
  },
  {
    id: "determiners-quantifiers",
    title: "Determiners & Quantifiers",
    subtitle: "Some, Any, Much, Many, Few, Little",
    explanation: "Menunjukkan jumlah. Many/Few untuk benda yang bisa dihitung (countable). Much/Little untuk benda yang tidak bisa dihitung (uncountable). Some (positif), Any (negatif/tanya).",
    formula: "Countable vs Uncountable",
    examples: [
      {en: "I don't have much money.", id: "Saya tidak punya banyak uang.", note: "Money = Uncountable -> much"},
      {en: "She has few friends.", id: "Dia hanya punya sedikit teman (hampir tidak ada).", note: "Friends = Countable -> few"},
      {en: "I need some water.", id: "Saya butuh sedikit air.", note: "Kalimat positif"}
    ],
    practice: [
      {q: "How ___ apples do you need?", options: ["much", "many", "few", "little"], answer: "many"},
      {q: "There is very ___ milk left in the fridge.", options: ["few", "a few", "little", "a little"], answer: "little"}
    ]
  },
  {
    id: "parallel-structure",
    title: "Parallel Structure",
    subtitle: "Keseimbangan Kalimat",
    explanation: "Sangat penting di TOEFL! Elemen-elemen yang dihubungkan oleh conjunction (and, but, or) harus memiliki bentuk gramatikal yang sama (Noun dengan Noun, V-ing dengan V-ing).",
    formula: "A, B, and C (semua harus setara bentuknya)",
    examples: [
      {en: "I like hiking, swimming, and running.", id: "Saya suka mendaki, berenang, dan berlari.", note: "Semua V-ing"},
      {en: "The teacher is strict but fair.", id: "Guru itu tegas namun adil.", note: "Sama-sama adjective"}
    ],
    practice: [
      {q: "She wanted to buy a car, rent an apartment, and ___ a job.", options: ["getting", "to get", "get", "got"], answer: "get"},
      {q: "The presentation was informative, engaging, and ___.", options: ["persuade", "persuasion", "persuasive", "persuaded"], answer: "persuasive"}
    ]
  }
];
