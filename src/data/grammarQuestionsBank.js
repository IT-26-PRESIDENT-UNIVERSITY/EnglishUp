// Bank Soal Lengkap Grammar untuk seluruh 42 Topik
// Setiap topik memiliki minimal 8-10 soal bervariasi dengan penjelasan bahasa Indonesia

export const GRAMMAR_QUESTION_BANK = {
  "tobe": [
    {
      q: "She ___ an ambitious software engineer at a tech company.",
      options: ["am", "is", "are", "be"],
      answer: "is",
      explanation: "Subjek tunggal orang ketiga (she/he/it) menggunakan 'is' pada Simple Present Tense."
    },
    {
      q: "They ___ not satisfied with the final exam results.",
      options: ["is", "am", "are", "was"],
      answer: "are",
      explanation: "Subjek jamak (they/we/you) menggunakan 'are' pada bentuk waktu sekarang."
    },
    {
      q: "I ___ currently preparing for the TOEFL examination.",
      options: ["am", "is", "are", "be"],
      answer: "am",
      explanation: "Subjek 'I' selalu berpasangan dengan 'am' pada Simple Present Tense."
    },
    {
      q: "Both the laptop and the monitor ___ brand new.",
      options: ["is", "are", "am", "was"],
      answer: "are",
      explanation: "Dua subjek yang dihubungkan dengan 'and' dianggap jamak, sehingga memerlukan to be 'are'."
    },
    {
      q: "The weather in Bandung ___ very pleasant today.",
      options: ["am", "are", "is", "were"],
      answer: "is",
      explanation: "'The weather' adalah kata benda tak dapat dihitung (uncountable), dianggap tunggal (it) -> 'is'."
    },
    {
      q: "___ you ready to start the presentation?",
      options: ["Is", "Are", "Am", "Do"],
      answer: "Are",
      explanation: "Subjek 'you' dalam kalimat tanya nominal menggunakan 'Are'."
    },
    {
      q: "Neither of the answers ___ correct.",
      options: ["are", "is", "am", "were"],
      answer: "is",
      explanation: "'Neither of + plural noun' secara gramatikal formal dianggap tunggal (singular), sehingga memakai 'is'."
    },
    {
      q: "My parents ___ proud of my recent academic achievements.",
      options: ["is", "are", "am", "be"],
      answer: "are",
      explanation: "'My parents' adalah kata benda jamak (plural), menggunakan 'are'."
    }
  ],

  "present-simple": [
    {
      q: "He usually ___ to campus by public transportation.",
      options: ["go", "goes", "going", "gone"],
      answer: "goes",
      explanation: "Subjek orang ketiga tunggal (he) memerlukan akhiran -es pada kata kerja berakhiran huruf vokal 'o' (goes)."
    },
    {
      q: "Water ___ at 100 degrees Celsius under normal atmospheric pressure.",
      options: ["boil", "boils", "boiling", "boiled"],
      answer: "boils",
      explanation: "Fakta ilmiah/kebenaran umum (general truth) menggunakan Simple Present Tense dengan subjek singular (water -> boils)."
    },
    {
      q: "___ they attend the English club meeting every Tuesday?",
      options: ["Do", "Does", "Are", "Is"],
      answer: "Do",
      explanation: "Kalimat tanya Simple Present Tense untuk subjek jamak (they) menggunakan kata kerja bantu 'Do'."
    },
    {
      q: "My sister ___ not drink coffee in the evening.",
      options: ["do", "does", "is", "has"],
      answer: "does",
      explanation: "Bentuk negatif Simple Present untuk subjek tunggal (my sister -> she) menggunakan 'does not + V1'."
    },
    {
      q: "The flight to Singapore ___ at 07:30 AM tomorrow morning.",
      options: ["depart", "departs", "departing", "departed"],
      answer: "departs",
      explanation: "Jadwal resmi transportasi menggunakan Simple Present Tense (the flight -> departs)."
    },
    {
      q: "Cats ___ a lot of sleep during the daytime.",
      options: ["need", "needs", "needing", "needed"],
      answer: "need",
      explanation: "Subjek jamak 'cats' menggunakan bentuk dasar kata kerja (V1) 'need'."
    },
    {
      q: "How often ___ your professor assign research papers?",
      options: ["do", "does", "is", "has"],
      answer: "does",
      explanation: "Subjek 'your professor' adalah tunggal (he/she), sehingga kata kerja bantu adalah 'does'."
    },
    {
      q: "The earth ___ around the sun.",
      options: ["revolve", "revolves", "revolving", "revolved"],
      answer: "revolves",
      explanation: "Fakta astronomi menggunakan Present Simple: The earth (singular) -> revolves."
    }
  ],

  "present-continuous": [
    {
      q: "Look! The children ___ peacefully on the sofa.",
      options: ["sleep", "are sleeping", "is sleeping", "slept"],
      answer: "are sleeping",
      explanation: "Kata petunjuk 'Look!' menandakan aksi sedang berlangsung saat ini. Subjek jamak 'the children' memakai 'are sleeping'."
    },
    {
      q: "Why ___ you wearing a thick jacket on a warm sunny day?",
      options: ["do", "are", "is", "have"],
      answer: "are",
      explanation: "Bentuk tanya Present Continuous untuk subjek 'you' adalah 'Why are you + V-ing?'."
    },
    {
      q: "She ___ on a critical semester project right now.",
      options: ["works", "is working", "work", "has worked"],
      answer: "is working",
      explanation: "Keterangan waktu 'right now' menunjukkan kejadian sedang berlangsung (is working)."
    },
    {
      q: "Listen! Someone ___ on the front door.",
      options: ["knocks", "is knocking", "knocked", "knock"],
      answer: "is knocking",
      explanation: "Petunjuk 'Listen!' menandakan aksi sedang berlangsung (is knocking)."
    },
    {
      q: "They ___ to Bali for vacation next Monday.",
      options: ["fly", "are flying", "flew", "flown"],
      answer: "are flying",
      explanation: "Present Continuous juga digunakan untuk rencana masa depan yang sudah terkonfirmasi (fixed arrangement)."
    },
    {
      q: "I ___ this book, so you can borrow it if you want.",
      options: ["am not reading", "not read", "do not read", "was not reading"],
      answer: "am not reading",
      explanation: "Bentuk negatif Present Continuous untuk 'I' adalah 'am not + V-ing'."
    },
    {
      q: "The global climate ___ warmer each decade.",
      options: ["is becoming", "becomes", "become", "became"],
      answer: "is becoming",
      explanation: "Present Continuous digunakan untuk menggambarkan situasi atau tren yang sedang berubah/berkembang."
    },
    {
      q: "Be quiet! The baby ___.",
      options: ["sleeps", "is sleeping", "slept", "sleep"],
      answer: "is sleeping",
      explanation: "'Be quiet!' menandakan proses sedang terjadi saat pembicara berbicara (is sleeping)."
    }
  ],

  "past-simple": [
    {
      q: "She ___ to London two years ago to pursue her master's degree.",
      options: ["move", "moved", "moving", "has moved"],
      answer: "moved",
      explanation: "Keterangan waktu lampau yang jelas 'two years ago' mewajibkan penggunaan Past Simple (V2: moved)."
    },
    {
      q: "They ___ not receive the notification yesterday.",
      options: ["do", "does", "did", "were"],
      answer: "did",
      explanation: "Bentuk kalimat negatif pada Past Simple menggunakan kata kerja bantu 'did not + V1'."
    },
    {
      q: "Where ___ you find that rare vintage camera?",
      options: ["do", "did", "are", "have"],
      answer: "did",
      explanation: "Bentuk pertanyaan untuk kejadian masa lalu menggunakan auxiliary 'did'."
    },
    {
      q: "The company ___ its highest quarterly revenue in 2022.",
      options: ["record", "records", "recorded", "recording"],
      answer: "recorded",
      explanation: "Waktu spesifik 'in 2022' membutuhkan bentuk Past Simple regular (recorded)."
    },
    {
      q: "He ___ a delicious dinner for his family last night.",
      options: ["cook", "cooks", "cooked", "cooking"],
      answer: "cooked",
      explanation: "Keterangan waktu 'last night' menggunakan Past Simple (cooked)."
    },
    {
      q: "We ___ all the tickets sold out within ten minutes.",
      options: ["hear", "heard", "hearing", "hears"],
      answer: "heard",
      explanation: "Bentuk V2 (irregular) dari kata kerja 'hear' adalah 'heard'."
    },
    {
      q: "Why ___ she leave the conference early?",
      options: ["does", "did", "was", "has"],
      answer: "did",
      explanation: "Bentuk tanya Past Simple verbal menggunakan 'did + Subject + V1'."
    },
    {
      q: "The ancient library ___ down during the war in 1845.",
      options: ["burns", "burned", "burning", "is burning"],
      answer: "burned",
      explanation: "Peristiwa sejarah lampau (1845) diungkapkan dengan Past Simple (burned)."
    }
  ],

  "present-perfect": [
    {
      q: "I have already ___ all the required documentation for the visa.",
      options: ["submit", "submits", "submitted", "submitting"],
      answer: "submitted",
      explanation: "Present Perfect Tense dibentuk dengan 'have/has + Verb 3' (submitted)."
    },
    {
      q: "She has lived in Jakarta ___ more than eight years.",
      options: ["since", "for", "during", "in"],
      answer: "for",
      explanation: "'For' digunakan untuk menunjukkan durasi/rentang waktu (for 8 years), sedangkan 'since' untuk titik awal."
    },
    {
      q: "Have you ever ___ traditional Indonesian Gamelan music?",
      options: ["hear", "hearing", "heard", "hears"],
      answer: "heard",
      explanation: "Pertanyaan Present Perfect dengan 'ever' membutuhkan Verb 3 (heard)."
    },
    {
      q: "Scientists have ___ significant progress in clean energy research.",
      options: ["make", "made", "making", "makes"],
      answer: "made",
      explanation: "Bentuk past participle (V3) dari kata kerja 'make' adalah 'made'."
    },
    {
      q: "He has worked at this university ___ 2018.",
      options: ["for", "since", "from", "ago"],
      answer: "since",
      explanation: "'Since' digunakan untuk merujuk pada titik waktu awal terjadinya suatu aksi lampau yang masih berlangsung."
    },
    {
      q: "They haven't announced the tournament schedule ___.",
      options: ["already", "just", "yet", "never"],
      answer: "yet",
      explanation: "'Yet' digunakan pada akhir kalimat negatif atau tanya dalam Present Perfect Tense."
    },
    {
      q: "We have ___ finished our lunch, so we are full.",
      options: ["just", "yet", "ever", "never"],
      answer: "just",
      explanation: "'Just' digunakan untuk aksi yang baru saja selesai terjadi beberapa saat yang lalu."
    },
    {
      q: "How many times ___ you visited Japan?",
      options: ["did", "do", "have", "are"],
      answer: "have",
      explanation: "Menanyakan frekuensi pengalaman hidup hingga saat ini menggunakan 'have you + V3'."
    }
  ],

  "future-simple": [
    {
      q: "Don't worry about the heavy boxes, I ___ carry them for you.",
      options: ["will", "am going to", "did", "have"],
      answer: "will",
      explanation: "'Will' digunakan untuk keputusan spontan atau tawaran bantuan yang dibuat saat berbicara."
    },
    {
      q: "Look at those dark clouds! It ___ rain very soon.",
      options: ["will", "is going to", "is", "rains"],
      answer: "is going to",
      explanation: "'Be going to' digunakan untuk prediksi masa depan yang didasari oleh bukti fisik nyata saat ini (dark clouds)."
    },
    {
      q: "I promise I ___ tell anyone your secret.",
      options: ["will not", "am not", "do not", "have not"],
      answer: "will not",
      explanation: "Janji (promise) di masa depan dinyatakan dengan 'will not (won't)'."
    },
    {
      q: "She ___ study abroad next semester; she already paid the tuition.",
      options: ["will", "is going to", "would", "might"],
      answer: "is going to",
      explanation: "Rencana yang sudah ada niat dan persiapan sebelumnya menggunakan 'is going to'."
    },
    {
      q: "The semester exam ___ begin promptly at 08:00 AM.",
      options: ["will", "is", "did", "has"],
      answer: "will",
      explanation: "Pernyataan masa depan formal menggunakan 'will + V1'."
    },
    {
      q: "Perhaps we ___ meet again at the international seminar.",
      options: ["will", "are", "did", "have"],
      answer: "will",
      explanation: "Kata 'perhaps / maybe' biasanya berpasangan dengan 'will' untuk kemungkinan masa depan."
    },
    {
      q: "What ___ you do after you graduate from university?",
      options: ["will", "are", "have", "did"],
      answer: "will",
      explanation: "Pertanyaan masa depan menggunakan 'will you do'."
    },
    {
      q: "I think technology ___ continue to transform education.",
      options: ["will", "is going", "does", "has"],
      answer: "will",
      explanation: "Prediksi berbasis opini pribadi (I think...) memakai 'will'."
    }
  ],

  "modals": [
    {
      q: "You look exhausted. You ___ take a short rest before continuing.",
      options: ["should", "must", "might", "can"],
      answer: "should",
      explanation: "'Should' digunakan untuk memberikan saran (advice) yang baik."
    },
    {
      q: "All vehicle drivers ___ stop when the traffic light turns red.",
      options: ["must", "might", "could", "would"],
      answer: "must",
      explanation: "'Must' menunjukkan kewajiban mutlak atau aturan hukum (obligation/rule)."
    },
    {
      q: "___ you please pass me the microphone?",
      options: ["Could", "Must", "Should", "May"],
      answer: "Could",
      explanation: "'Could you...' adalah bentuk permohonan sopan (polite request)."
    },
    {
      q: "He is not in his room. He ___ be in the library studying.",
      options: ["might", "must", "should", "shall"],
      answer: "might",
      explanation: "'Might' menunjukkan kemungkinan tentatif (possibility)."
    },
    {
      q: "You ___ not use your phone during the examination.",
      options: ["must", "might", "could", "would"],
      answer: "must",
      explanation: "'Must not' mengekspresikan larangan keras (prohibition)."
    },
    {
      q: "She ___ speak four different languages fluently.",
      options: ["can", "may", "must", "should"],
      answer: "can",
      explanation: "'Can' mengekspresikan kemampuan (ability)."
    },
    {
      q: "May I ___ this question before we move to the next chapter?",
      options: ["ask", "to ask", "asking", "asked"],
      answer: "ask",
      explanation: "Modal verbs selalu diikuti oleh bare infinitive (V1 murni tanpa 'to' atau imbuhan)."
    },
    {
      q: "You don't ___ submit the draft today; tomorrow is fine.",
      options: ["have to", "must", "should", "need"],
      answer: "have to",
      explanation: "'Don't have to' berarti tidak wajib / tidak perlu (lack of obligation)."
    }
  ],

  "conditional-0-1": [
    {
      q: "If you heat water to 100 degrees Celsius, it ___ into steam.",
      options: ["turns", "will turn", "turned", "would turn"],
      answer: "turns",
      explanation: "Conditional Type 0 untuk hukum alam/fakta ilmiah menggunakan pola If + Present Simple, Present Simple (turns)."
    },
    {
      q: "If you study hard, you ___ the entrance test with high marks.",
      options: ["will pass", "passed", "would pass", "passes"],
      answer: "will pass",
      explanation: "Conditional Type 1 untuk kemungkinan masa depan menggunakan pola If + Present Simple, will + V1."
    },
    {
      q: "If it rains tomorrow, we ___ the outdoor tennis match.",
      options: ["cancel", "will cancel", "canceled", "would cancel"],
      answer: "will cancel",
      explanation: "Pola Conditional Type 1: If + Present (rains), will + V1 (will cancel)."
    },
    {
      q: "Plants die if they ___ not get enough sunlight and water.",
      options: ["do", "does", "will", "did"],
      answer: "do",
      explanation: "Zero conditional fakta biologi: 'plants' jamak -> 'do not get'."
    },
    {
      q: "Unless you ___ now, you will miss the morning train.",
      options: ["leave", "leaves", "will leave", "left"],
      answer: "leave",
      explanation: "'Unless' bermakna 'if not' dan diikuti klausa Present Simple (leave) pada Type 1."
    },
    {
      q: "If she ___ free this evening, she will join our discussion.",
      options: ["is", "will be", "was", "were"],
      answer: "is",
      explanation: "Klausa 'if' pada Type 1 tidak boleh memakai 'will', melainkan Present Simple 'is'."
    },
    {
      q: "What will you do if you ___ the competition?",
      options: ["win", "wins", "will win", "won"],
      answer: "win",
      explanation: "Klausa 'if' pada conditional type 1 menggunakan V1 (win)."
    },
    {
      q: "When ice melts, it ___ liquid water.",
      options: ["becomes", "will become", "became", "become"],
      answer: "becomes",
      explanation: "Zero conditional dengan kata sambung 'when' untuk fakta ilmiah (becomes)."
    }
  ],

  "conditional-2-3": [
    {
      q: "If I ___ more free time, I would learn how to play the violin.",
      options: ["have", "had", "had had", "would have"],
      answer: "had",
      explanation: "Conditional Type 2 (khayalan masa kini): If + Past Simple (had), would + V1."
    },
    {
      q: "If I ___ you, I would consult a doctor immediately.",
      options: ["am", "was", "were", "had been"],
      answer: "were",
      explanation: "Dalam Conditional Type 2 formal, 'were' digunakan untuk semua subjek termasuk I/he/she/it."
    },
    {
      q: "If we had left earlier, we ___ caught the express flight.",
      options: ["would have", "will have", "would", "had"],
      answer: "would have",
      explanation: "Conditional Type 3 (penyesalan masa lalu): If + Past Perfect (had left), would have + V3."
    },
    {
      q: "She would have passed the exam if she ___ more systematically.",
      options: ["studied", "had studied", "studies", "would study"],
      answer: "had studied",
      explanation: "Klausa 'if' pada Type 3 menggunakan Past Perfect (had studied)."
    },
    {
      q: "If they ___ rich, they would donate heavily to charity.",
      options: ["are", "were", "had been", "will be"],
      answer: "were",
      explanation: "Conditional Type 2 mengandaikan kondisi yang berlawanan dengan fakta saat ini (were)."
    },
    {
      q: "I would travel around the world if I ___ the lottery.",
      options: ["won", "win", "had won", "would win"],
      answer: "won",
      explanation: "Type 2: main clause (would travel) berpasangan dengan if-clause V2 (won)."
    },
    {
      q: "If he had known about the traffic, he ___ another route.",
      options: ["would take", "would have taken", "will take", "took"],
      answer: "would have taken",
      explanation: "Type 3 main clause membutuhkan 'would have + V3' (would have taken)."
    },
    {
      q: "What would you do if you ___ an invisible person for one day?",
      options: ["are", "were", "had been", "will be"],
      answer: "were",
      explanation: "Situasi hipotetis/khayalan masa kini menggunakan 'were'."
    }
  ],

  "passive-voice": [
    {
      q: "The international conference ___ held in Jakarta next month.",
      options: ["is", "will be", "was", "has been"],
      answer: "will be",
      explanation: "Kalimat pasif masa depan (next month): 'will be + V3' (will be held)."
    },
    {
      q: "Millions of emails ___ sent around the world every minute.",
      options: ["are", "is", "were", "have"],
      answer: "are",
      explanation: "Pasif Present Simple dengan subjek jamak (millions of emails): 'are + V3' (are sent)."
    },
    {
      q: "This historical novel ___ by a Nobel laureate in 1954.",
      options: ["wrote", "is written", "was written", "has written"],
      answer: "was written",
      explanation: "Pasif waktu lampau (1954): 'was written'."
    },
    {
      q: "The software update is currently ___ deployed across all servers.",
      options: ["being", "been", "be", "is"],
      answer: "being",
      explanation: "Pasif Continuous Tense menggunakan bentuk 'is/are + being + V3'."
    },
    {
      q: "All security guidelines must ___ strictly by the employees.",
      options: ["follow", "be followed", "being followed", "followed"],
      answer: "be followed",
      explanation: "Kalimat pasif setelah modal verb (must) menggunakan 'must + be + V3'."
    },
    {
      q: "The Mona Lisa was painted ___ Leonardo da Vinci.",
      options: ["with", "by", "from", "for"],
      answer: "by",
      explanation: "Preposisi 'by' digunakan untuk menunjukkan pelaku (agent) dalam kalimat pasif."
    },
    {
      q: "The new bridge has already ___ completed ahead of schedule.",
      options: ["been", "being", "be", "is"],
      answer: "been",
      explanation: "Pasif Present Perfect: 'has + been + V3'."
    },
    {
      q: "English is ___ as a medium of instruction in this course.",
      options: ["use", "used", "using", "uses"],
      answer: "used",
      explanation: "Kalimat pasif memerlukan past participle (V3: used)."
    }
  ],

  "reported-speech": [
    {
      q: "Alex said, 'I am working on my thesis.' -> Alex said that he ___ on his thesis.",
      options: ["is working", "was working", "had worked", "works"],
      answer: "was working",
      explanation: "Present Continuous (am working) mengalami pergeseran waktu (backshift) menjadi Past Continuous (was working)."
    },
    {
      q: "She told me, 'I will visit you tomorrow.' -> She told me that she ___ visit me the next day.",
      options: ["will", "would", "can", "should"],
      answer: "would",
      explanation: "'Will' bergeser menjadi 'would' dalam kalimat tidak langsung (reported speech)."
    },
    {
      q: "David said, 'I bought a new car.' -> David said that he ___ a new car.",
      options: ["bought", "has bought", "had bought", "buys"],
      answer: "had bought",
      explanation: "Past Simple (bought) bergeser menjadi Past Perfect (had bought)."
    },
    {
      q: "The teacher asked us ___ noisy during the exam.",
      options: ["not to be", "to not be", "don't be", "not being"],
      answer: "not to be",
      explanation: "Bentuk larangan tidak langsung (reported imperative) menggunakan pola 'asked + object + not to + V1'."
    },
    {
      q: "He asked me where I ___ my holiday last summer.",
      options: ["spend", "had spent", "have spent", "will spend"],
      answer: "had spent",
      explanation: "Pertanyaan lampau dalam reported speech bergeser ke Past Perfect (had spent)."
    },
    {
      q: "She said that she ___ never seen such a breathtaking view.",
      options: ["has", "had", "have", "was"],
      answer: "had",
      explanation: "Past reporting verb (said) memicu backshift ke Past Perfect (had never seen)."
    },
    {
      q: "My mother told me ___ my vegetables.",
      options: ["to eat", "eat", "eating", "ate"],
      answer: "to eat",
      explanation: "Perintah tidak langsung menggunakan 'told + object + to + V1'."
    },
    {
      q: "They said, 'We have completed the task.' -> They said that they ___ completed the task.",
      options: ["have", "had", "were", "are"],
      answer: "had",
      explanation: "Present Perfect (have completed) bergeser menjadi Past Perfect (had completed)."
    }
  ],

  "gerund-infinitive": [
    {
      q: "She avoided ___ eye contact during the intense cross-examination.",
      options: ["make", "to make", "making", "made"],
      answer: "making",
      explanation: "Kata kerja 'avoid' selalu diikuti oleh Gerund (V-ing)."
    },
    {
      q: "He decided ___ his own startup company after graduating.",
      options: ["launch", "to launch", "launching", "launched"],
      answer: "to launch",
      explanation: "Kata kerja 'decide' selalu diikuti oleh to-infinitive (to launch)."
    },
    {
      q: "Do you mind ___ the window? It is getting chilly.",
      options: ["close", "to close", "closing", "closed"],
      answer: "closing",
      explanation: "Ungkapan 'Do you mind / Would you mind' selalu diikuti oleh Gerund (closing)."
    },
    {
      q: "I look forward to ___ from you soon.",
      options: ["hear", "hearing", "to hear", "heard"],
      answer: "hearing",
      explanation: "'Look forward to' adalah frasa preposisional di mana 'to' adalah preposisi, sehingga diikuti Gerund (hearing)."
    },
    {
      q: "He stopped ___ a cigarette because he wanted to live a healthier life.",
      options: ["smoking", "to smoke", "smoke", "smoked"],
      answer: "smoking",
      explanation: "'Stop + V-ing' bermakna menghentikan total kebiasaan tersebut (berhenti merokok)."
    },
    {
      q: "On the way home, he stopped ___ some fresh bread at the bakery.",
      options: ["buy", "to buy", "buying", "bought"],
      answer: "to buy",
      explanation: "'Stop + to V1' bermakna berhenti sejenak dari aktivitas lain untuk melakukan suatu tujuan (membeli roti)."
    },
    {
      q: "They refused ___ the controversial contract terms.",
      options: ["sign", "to sign", "signing", "signed"],
      answer: "to sign",
      explanation: "Kata kerja 'refuse' diikuti oleh to-infinitive (to sign)."
    },
    {
      q: "She is capable of ___ complex mathematical problems quickly.",
      options: ["solve", "to solve", "solving", "solved"],
      answer: "solving",
      explanation: "Preposisi 'of' selalu diikuti oleh Gerund (solving)."
    }
  ],

  "relative-clauses": [
    {
      q: "The professor ___ gave the keynote lecture is an expert in AI.",
      options: ["which", "who", "whom", "whose"],
      answer: "who",
      explanation: "'Who' digunakan sebagai subjek yang merujuk pada orang (the professor)."
    },
    {
      q: "The laptop ___ I purchased last week is extremely fast.",
      options: ["who", "which", "whose", "whom"],
      answer: "which",
      explanation: "'Which' atau 'that' digunakan untuk merujuk pada benda/objek non-manusia (the laptop)."
    },
    {
      q: "That is the student ___ project won first prize in the national contest.",
      options: ["who", "whose", "whom", "which"],
      answer: "whose",
      explanation: "'Whose' digunakan untuk menunjukkan hubungan kepemilikan (proyek milik siswa tersebut)."
    },
    {
      q: "The candidate ___ the committee interviewed yesterday was very qualified.",
      options: ["whom", "whose", "which", "what"],
      answer: "whom",
      explanation: "'Whom' secara gramatikal formal digunakan sebagai objek manusia yang dikenai aksi (interviewed)."
    },
    {
      q: "The city ___ I was born has changed dramatically over the decades.",
      options: ["where", "which", "when", "whose"],
      answer: "where",
      explanation: "'Where' digunakan untuk merujuk pada tempat (the city)."
    },
    {
      q: "1998 was the year ___ my elder brother graduated from university.",
      options: ["where", "when", "which", "who"],
      answer: "when",
      explanation: "'When' digunakan sebagai relative adverb untuk merujuk pada waktu/tahun."
    },
    {
      q: "The book, ___ cover is torn, is actually an antique edition.",
      options: ["who", "whose", "which", "that"],
      answer: "whose",
      explanation: "'Whose' dapat digunakan untuk kepemilikan benda (cover milik buku tersebut)."
    },
    {
      q: "He didn't explain the reason ___ he arrived late to the seminar.",
      options: ["why", "where", "which", "who"],
      answer: "why",
      explanation: "'Why' digunakan untuk merujuk pada alasan (reason)."
    }
  ],

  "question-tags": [
    {
      q: "You have completed the entire assignment, ___?",
      options: ["have you", "haven't you", "don't you", "didn't you"],
      answer: "haven't you",
      explanation: "Kalimat utama positif dengan auxiliary 'have' memerlukan question tag negatif: 'haven't you?'."
    },
    {
      q: "She doesn't like spicy food, ___?",
      options: ["does she", "doesn't she", "is she", "did she"],
      answer: "does she",
      explanation: "Kalimat utama negatif dengan 'doesn't' memerlukan tag positif: 'does she?'."
    },
    {
      q: "Let's review the final chapter together, ___?",
      options: ["shall we", "will you", "don't we", "aren't we"],
      answer: "shall we",
      explanation: "Kalimat ajakan 'Let's' selalu memiliki question tag 'shall we?'."
    },
    {
      q: "Nobody called for me while I was away, ___?",
      options: ["did they", "didn't they", "did he", "was they"],
      answer: "did they",
      explanation: "Kata 'nobody' bermakna negatif, sehingga tag harus positif. Pronoun untuk 'nobody' adalah 'they' -> 'did they?'."
    },
    {
      q: "I am late for the morning briefing, ___?",
      options: ["aren't I", "am not I", "amn't I", "don't I"],
      answer: "aren't I",
      explanation: "Question tag standar dalam bahasa Inggris untuk 'I am' adalah 'aren't I?'."
    },
    {
      q: "Open the door for our guests, ___?",
      options: ["will you", "do you", "shall we", "don't you"],
      answer: "will you",
      explanation: "Kalimat perintah (imperative) umumnya menggunakan tag 'will you?'."
    },
    {
      q: "He can speak Japanese fluently, ___?",
      options: ["can't he", "can he", "doesn't he", "isn't he"],
      answer: "can't he",
      explanation: "Modal 'can' positif berpasangan dengan tag negatif 'can't he?'."
    },
    {
      q: "There were many participants at the summit, ___?",
      options: ["weren't there", "were there", "aren't they", "wasn't there"],
      answer: "weren't there",
      explanation: "Subjek semu 'there were' berpasangan dengan tag 'weren't there?'."
    }
  ],

  "degrees-of-comparison": [
    {
      q: "Mount Everest is the ___ mountain peak in the world.",
      options: ["high", "higher", "highest", "most high"],
      answer: "highest",
      explanation: "Bentuk superlatif untuk kata sifat satu suku kata (high) adalah 'the highest'."
    },
    {
      q: "This analytical method is ___ more reliable than the traditional one.",
      options: ["much", "very", "more", "most"],
      answer: "much",
      explanation: "'Much / far' digunakan sebagai intensifier di depan bentuk komparatif (much more reliable)."
    },
    {
      q: "Her presentation was ___ more convincing than expected.",
      options: ["far", "very", "too", "so"],
      answer: "far",
      explanation: "'Far' digunakan untuk mempertegas perbandingan komparatif (far more convincing)."
    },
    {
      q: "The ___ you practice speaking, the ___ confident you will become.",
      options: ["more / more", "most / most", "many / much", "better / good"],
      answer: "more / more",
      explanation: "Pola 'The + comparative, the + comparative' menunjukkan hubungan sebab-akibat timbal balik."
    },
    {
      q: "This phone is not as ___ as the flagship model.",
      options: ["expensive", "more expensive", "most expensive", "expensively"],
      answer: "expensive",
      explanation: "Pola 'as ... as' (positive degree) menggunakan kata sifat dasar tanpa perubahan (expensive)."
    },
    {
      q: "Good health is ___ important than material wealth.",
      options: ["more", "most", "as", "much"],
      answer: "more",
      explanation: "Kata sifat panjang (important) pada tingkat komparatif menggunakan 'more + adjective + than'."
    },
    {
      q: "Of all the candidates, Sarah performed the ___ during the interview.",
      options: ["well", "better", "best", "most well"],
      answer: "best",
      explanation: "Bentuk superlatif dari 'well / good' adalah 'the best'."
    },
    {
      q: "The pollution in this industrial area is getting worse and ___.",
      options: ["bad", "worse", "worst", "baddest"],
      answer: "worse",
      explanation: "Pola 'comparative and comparative' (worse and worse) menunjukkan peningkatan secara bertahap."
    }
  ],

  "articles": [
    {
      q: "She wants to pursue ___ MBA degree from a prestigious university.",
      options: ["a", "an", "the", "no article"],
      answer: "an",
      explanation: "Huruf 'M' pada 'MBA' dilafalkan dengan bunyi vokal /em/, sehingga membutuhkan artikel 'an'."
    },
    {
      q: "___ Pacific Ocean is the largest and deepest ocean on Earth.",
      options: ["A", "An", "The", "No article"],
      answer: "The",
      explanation: "Nama samudera (oceans), laut, dan sungai selalu menggunakan artikel 'The' (The Pacific Ocean)."
    },
    {
      q: "He is ___ honest and hardworking researcher.",
      options: ["a", "an", "the", "no article"],
      answer: "an",
      explanation: "Kata 'honest' diawali dengan huruf 'h' yang tidak berbunyi (silent h), menghasilkan bunyi vokal /ɒnɪst/, memakai 'an'."
    },
    {
      q: "___ Mount Bromo is an active volcano in East Java.",
      options: ["A", "An", "The", "No article"],
      answer: "No article",
      explanation: "Nama gunung tunggal (individual mountain) tidak menggunakan artikel 'the' (Mount Bromo, bukan The Mount Bromo)."
    },
    {
      q: "Can you pass me ___ blue folder on your desk?",
      options: ["a", "an", "the", "no article"],
      answer: "the",
      explanation: "Benda sudah spesifik (map biru di atas mejamu), sehingga menggunakan artikel definit 'the'."
    },
    {
      q: "I usually have ___ breakfast at 7:00 AM.",
      options: ["a", "an", "the", "no article"],
      answer: "no article",
      explanation: "Nama-nama waktu makan umum (breakfast, lunch, dinner) umumnya tidak menggunakan artikel."
    },
    {
      q: "She plays ___ piano exceptionally well.",
      options: ["a", "an", "the", "no article"],
      answer: "the",
      explanation: "Instrumen alat musik yang dimainkan (play the piano, play the guitar) menggunakan artikel 'the'."
    },
    {
      q: "It was such ___ unique opportunity to meet the founder.",
      options: ["a", "an", "the", "no article"],
      answer: "a",
      explanation: "'Unique' diawali dengan bunyi konsonan semi-vokal /juː/, sehingga menggunakan 'a' (a unique opportunity)."
    }
  ],

  "causative-verbs": [
    {
      q: "The professor had the assistant ___ the final exam papers.",
      options: ["grade", "to grade", "grading", "graded"],
      answer: "grade",
      explanation: "Pola causative aktif 'have + person + V1 (bare infinitive)': had the assistant grade."
    },
    {
      q: "She got the technician ___ her broken laptop screen.",
      options: ["repair", "to repair", "repairing", "repaired"],
      answer: "to repair",
      explanation: "Pola causative aktif 'get + person + to V1': got the technician to repair."
    },
    {
      q: "I need to have my car ___ before going on the long road trip.",
      options: ["service", "to service", "servicing", "serviced"],
      answer: "serviced",
      explanation: "Pola causative pasif 'have/get + object (benda) + V3': have my car serviced."
    },
    {
      q: "The strict teacher made the students ___ their homework during recess.",
      options: ["redo", "to redo", "redoing", "redone"],
      answer: "redo",
      explanation: "Pola causative 'make + person + V1': made the students redo."
    },
    {
      q: "Can you help me ___ this heavy luggage up the stairs?",
      options: ["carry", "to carry", "carried", "both A and B"],
      answer: "both A and B",
      explanation: "Kata kerja 'help' dapat diikuti bare infinitive (carry) ataupun to-infinitive (to carry)."
    },
    {
      q: "The manager let the team ___ early on Friday afternoon.",
      options: ["leave", "to leave", "leaving", "left"],
      answer: "leave",
      explanation: "Pola causative izin 'let + person + V1': let the team leave."
    },
    {
      q: "We got our house ___ before the holiday season.",
      options: ["paint", "painted", "to paint", "painting"],
      answer: "painted",
      explanation: "Causative pasif 'get + object + V3': got our house painted."
    },
    {
      q: "He persuaded his father to let him ___ the car.",
      options: ["drive", "to drive", "driving", "drove"],
      answer: "drive",
      explanation: "'Let + person + bare infinitive': let him drive."
    }
  ],

  "subjunctive": [
    {
      q: "The doctor recommended that he ___ smoking immediately.",
      options: ["stop", "stops", "stopped", "stopping"],
      answer: "stop",
      explanation: "Subjunctive mood setelah kata kerja rekomendasi (recommend that) menggunakan bentuk dasar kata kerja (V1 murni/base form: stop)."
    },
    {
      q: "It is essential that every student ___ on time for the final exam.",
      options: ["be", "is", "are", "was"],
      answer: "be",
      explanation: "Subjunctive mood untuk kata kerja 'to be' setelah ungkapan urgensi (It is essential that...) selalu berbentuk 'be'."
    },
    {
      q: "The manager insisted that the report ___ submitted before midnight.",
      options: ["is", "was", "be", "were"],
      answer: "be",
      explanation: "Subjunctive pasif menggunakan 'be + V3' (insisted that the report be submitted)."
    },
    {
      q: "The judge demanded that the witness ___ the complete truth.",
      options: ["tell", "tells", "told", "telling"],
      answer: "tell",
      explanation: "Subjunctive mood: demanded that + subject + V1 murni (tell, bukan tells)."
    },
    {
      q: "It is crucial that she ___ not miss this orientation session.",
      options: ["do", "does", "did", "be"],
      answer: "do",
      explanation: "Bentuk negatif subjunctive formal menggunakan 'not + V1' atau 'do not + V1'."
    },
    {
      q: "I propose that we ___ a vote to decide the outcome.",
      options: ["take", "takes", "took", "taking"],
      answer: "take",
      explanation: "Kata 'propose that' memicu subjunctive base form (take)."
    },
    {
      q: "It is vital that all safety protocols ___ observed by the crew.",
      options: ["are", "be", "were", "been"],
      answer: "be",
      explanation: "Subjunctive pasif 'that ... be observed'."
    },
    {
      q: "The director suggested that he ___ for the scholarship.",
      options: ["apply", "applies", "applied", "applying"],
      answer: "apply",
      explanation: "Subjunctive: suggested that he apply (bukan applies)."
    }
  ],

  "inversion-advanced": [
    {
      q: "Rarely ___ such exceptional teamwork in a newly formed division.",
      options: ["have I seen", "I have seen", "I saw", "saw I"],
      answer: "have I seen",
      explanation: "Ketika adverbia negatif seperti 'Rarely' diletakkan di awal kalimat untuk penekanan, terjadi inversi: Adverb + Auxiliary + Subject + Main Verb."
    },
    {
      q: "Not only ___ win the grand prize, but he also broke the national record.",
      options: ["he did", "did he", "he had", "had he"],
      answer: "did he",
      explanation: "Pola 'Not only + auxiliary + subject + V1' (did he win) merupakan struktur inversi standar."
    },
    {
      q: "Hardly had they arrived at the station ___ the train departed.",
      options: ["when", "than", "then", "after"],
      answer: "when",
      explanation: "Pasangan inversi 'Hardly had + Subject + V3' selalu menggunakan konjungsi 'when'."
    },
    {
      q: "No sooner had the bell rung ___ the students left the classroom.",
      options: ["than", "when", "then", "after"],
      answer: "than",
      explanation: "Pasangan inversi 'No sooner had + Subject + V3' selalu menggunakan konjungsi 'than'."
    },
    {
      q: "Under no circumstances ___ leave the laboratory unattended.",
      options: ["you should", "should you", "you must", "you can"],
      answer: "should you",
      explanation: "Frasa preposisional negatif di awal kalimat memerlukan inversi: should you leave."
    },
    {
      q: "Little ___ that a surprise celebration was waiting for him.",
      options: ["he knew", "did he know", "he knows", "knows he"],
      answer: "did he know",
      explanation: "'Little' di awal kalimat memicu inversi Past Simple: did he know."
    },
    {
      q: "Only after submitting the final report ___ realize the minor calculation error.",
      options: ["did she", "she did", "she was", "was she"],
      answer: "did she",
      explanation: "Pola 'Only after...' di awal kalimat memicu inversi pada klausa utama (did she realize)."
    },
    {
      q: "Seldom ___ such a magnificent performance on this stage.",
      options: ["we have witnessed", "have we witnessed", "we witnessed", "witnessed we"],
      answer: "have we witnessed",
      explanation: "'Seldom' di awal kalimat memicu inversi: have we witnessed."
    }
  ],

  "subject-verb-agreement": [
    {
      q: "The list of approved project proposals ___ posted on the board.",
      options: ["is", "are", "were", "have been"],
      answer: "is",
      explanation: "Subjek utama adalah 'The list' (singular), bukan 'proposals', sehingga kata kerja yang benar adalah 'is'."
    },
    {
      q: "Neither the manager nor the employees ___ aware of the policy shift.",
      options: ["was", "were", "is", "has been"],
      answer: "were",
      explanation: "Pada pola 'Neither... nor...', kata kerja menyesuaikan dengan subjek yang paling dekat (the employees -> plural -> were)."
    },
    {
      q: "Every one of the participants ___ given a participation certificate.",
      options: ["was", "were", "are", "have been"],
      answer: "was",
      explanation: "'Every one of + plural noun' secara gramatikal memerlukan kata kerja tunggal (was)."
    },
    {
      q: "The team ___ discussing various strategic options among themselves.",
      options: ["are", "is", "was", "has"],
      answer: "are",
      explanation: "Ketika collective noun seperti 'team' bertindak sebagai individu-individu terpisah (themselves), kata kerja jamak (are) digunakan."
    },
    {
      q: "Ten kilometers ___ a long distance to walk in this hot weather.",
      options: ["is", "are", "were", "have been"],
      answer: "is",
      explanation: "Ukuran jarak, waktu, atau uang dianggap sebagai satu kesatuan tunggal (singular) -> 'is'."
    },
    {
      q: "A large number of students ___ participating in the robotics competition.",
      options: ["is", "are", "was", "has been"],
      answer: "are",
      explanation: "'A number of + plural noun' bermakna banyak dan membutuhkan kata kerja jamak (are)."
    },
    {
      q: "The number of smartphone users ___ steadily increasing every year.",
      options: ["is", "are", "were", "have been"],
      answer: "is",
      explanation: "'The number of + plural noun' fokus pada angka spesifik dan membutuhkan kata kerja tunggal (is)."
    },
    {
      q: "Physics ___ always been my favorite academic subject.",
      options: ["have", "has", "are", "were"],
      answer: "has",
      explanation: "Nama bidang ilmu berakhiran -s (Physics, Mathematics, Economics) adalah singular -> 'has'."
    }
  ],

  "determiners-quantifiers": [
    {
      q: "She has ___ patience left after dealing with the rude customer.",
      options: ["little", "few", "a few", "many"],
      answer: "little",
      explanation: "'Patience' adalah uncountable noun. 'Little' berarti hampir tidak ada sama sekali (makna negatif)."
    },
    {
      q: "There are only ___ tickets available for tonight's concert.",
      options: ["a few", "a little", "little", "much"],
      answer: "a few",
      explanation: "'Tickets' adalah countable plural noun. 'A few' berarti beberapa (jumlah sedikit namun cukup)."
    },
    {
      q: "How ___ research did you conduct before publishing the paper?",
      options: ["many", "much", "few", "little"],
      answer: "much",
      explanation: "'Research' adalah kata benda tak dapat dihitung (uncountable), sehingga menggunakan 'much'."
    },
    {
      q: "___ student in the class must submit their essay by noon.",
      options: ["Every", "All", "Both", "Many"],
      answer: "Every",
      explanation: "'Every' diikuti oleh singular countable noun (student)."
    },
    {
      q: "I have ___ friends in Australia who can help us with the visa process.",
      options: ["a few", "a little", "much", "little"],
      answer: "a few",
      explanation: "'Friends' adalah plural countable noun, sehingga berpasangan dengan 'a few'."
    },
    {
      q: "Would you like ___ milk in your black tea?",
      options: ["some", "any", "many", "few"],
      answer: "some",
      explanation: "'Some' digunakan dalam kalimat tawaran sopan (polite offer) dengan harapan jawaban 'yes'."
    },
    {
      q: "Do you have ___ questions before we wrap up today's meeting?",
      options: ["any", "some", "much", "little"],
      answer: "any",
      explanation: "'Any' umumnya digunakan dalam kalimat tanya umum dan kalimat negatif."
    },
    {
      q: "___ of the two candidates was selected for the executive position.",
      options: ["Neither", "None", "All", "Every"],
      answer: "Neither",
      explanation: "'Neither' digunakan khusus saat memilih antara 2 orang/benda (tidak satupun dari keduanya)."
    }
  ],

  "parallel-structure": [
    {
      q: "He likes swimming, jogging, and ___ in his leisure time.",
      options: ["to read", "reading", "read", "reads"],
      answer: "reading",
      explanation: "Parallel structure mensyaratkan bentuk kata kerja yang setara dalam sebuah daftar: swimming (V-ing), jogging (V-ing), and reading (V-ing)."
    },
    {
      q: "The new mentor is knowledgeable, patient, and ___.",
      options: ["inspires", "inspiring", "inspiration", "to inspire"],
      answer: "inspiring",
      explanation: "Elemen yang dirangkai harus sama-sama berjenis kata sifat (adjective): knowledgeable, patient, and inspiring."
    },
    {
      q: "You can achieve success either by working hard or ___ smart.",
      options: ["working", "work", "to work", "by work"],
      answer: "working",
      explanation: "Setelah korelasi 'either by ... or ...', bentuk gerund 'working' harus dipertahankan agar paralel."
    },
    {
      q: "She decided to finish her thesis, ___ a job, and move abroad.",
      options: ["find", "finding", "found", "to finding"],
      answer: "find",
      explanation: "Setelah infinitive marker 'to', kata kerja berikutnya paralel dengan bare infinitive: finish, find, and move."
    },
    {
      q: "The internship taught him how to analyze data and ___ reports.",
      options: ["write", "writing", "to writing", "wrote"],
      answer: "write",
      explanation: "Paralel dengan 'how to analyze data and [how to] write reports'."
    },
    {
      q: "Not only did she pass the test, but she also ___ highest in the district.",
      options: ["ranked", "ranking", "to rank", "ranks"],
      answer: "ranked",
      explanation: "Kedua klausa menggunakan bentuk Past Simple (did she pass ... she also ranked)."
    },
    {
      q: "The workshop focused on public speaking, critical thinking, and ___ solving.",
      options: ["problem", "problems", "to solve", "solving"],
      answer: "problem",
      explanation: "Paralel dengan frasa noun: public speaking, critical thinking, and problem solving."
    },
    {
      q: "He is interested not in wealth but in ___ knowledge.",
      options: ["gaining", "gain", "to gain", "gained"],
      answer: "gaining",
      explanation: "Paralel dengan preposisi 'in + Gerund' (in wealth / in gaining knowledge)."
    }
  ],

  "past-continuous": [
    {
      q: "While I ___ down the street, I ran into an old high school friend.",
      options: ["walked", "was walking", "am walking", "have walked"],
      answer: "was walking",
      explanation: "Klausa 'while' menunjukkan aksi panjang yang sedang berlangsung di masa lalu ketika disela oleh aksi pendek (was walking)."
    },
    {
      q: "What ___ you doing at 8 PM yesterday when the power went out?",
      options: ["were", "was", "did", "are"],
      answer: "were",
      explanation: "Pertanyaan aksi sedang berlangsung pada titik waktu tertentu di masa lalu: 'What were you doing?'."
    },
    {
      q: "They ___ football while it was raining heavily outside.",
      options: ["were playing", "played", "are playing", "have played"],
      answer: "were playing",
      explanation: "Dua aksi yang berlangsung bersamaan di masa lalu menggunakan Past Continuous pada kedua klausa."
    },
    {
      q: "The sun was shining and the birds ___ when I woke up this morning.",
      options: ["sing", "were singing", "sang", "are singing"],
      answer: "were singing",
      explanation: "Paralel dengan Past Continuous 'The sun was shining and the birds were singing'."
    },
    {
      q: "She ___ dinner when the doorbell suddenly rang.",
      options: ["cooked", "was cooking", "is cooking", "had cooked"],
      answer: "was cooking",
      explanation: "Aksi yang sedang berlangsung (was cooking) disela oleh kejadian tiba-tiba (rang)."
    },
    {
      q: "I ___ to music, so I didn't hear you calling my name.",
      options: ["was listening", "listened", "am listening", "have listened"],
      answer: "was listening",
      explanation: "Aksi sedang berlangsung di masa lalu menjadi latar belakang alasan kejadian."
    },
    {
      q: "At midnight last night, they ___ still working on the urgent project.",
      options: ["were", "was", "did", "are"],
      answer: "were",
      explanation: "Titik waktu spesifik di masa lalu (at midnight last night) dengan subjek 'they' memakai 'were'."
    },
    {
      q: "He slipped on the wet floor while he ___ to catch the bus.",
      options: ["ran", "was running", "is running", "has run"],
      answer: "was running",
      explanation: "Klausa 'while' dengan proses gerak masa lalu: was running."
    }
  ],

  "past-perfect": [
    {
      q: "By the time we arrived at the cinema, the movie ___ already.",
      options: ["started", "had started", "has started", "was starting"],
      answer: "had started",
      explanation: "Aksi yang terjadi dan selesai lebih dulu sebelum aksi masa lalu lainnya (arrived) dinyatakan dengan Past Perfect (had started)."
    },
    {
      q: "She couldn't enter her apartment because she ___ her keys at the office.",
      options: ["forgot", "had forgotten", "has forgotten", "was forgetting"],
      answer: "had forgotten",
      explanation: "Kejadian lupa kunci terjadi lebih dulu sebelum dia tidak bisa masuk -> 'had forgotten'."
    },
    {
      q: "He felt much better after he ___ the prescribed medicine.",
      options: ["took", "had taken", "has taken", "takes"],
      answer: "had taken",
      explanation: "Minum obat terjadi terlebih dahulu sebelum merasa lebih baik -> 'had taken'."
    },
    {
      q: "They ___ never visited Europe before their graduation trip last summer.",
      options: ["had", "have", "were", "did"],
      answer: "had",
      explanation: "Pengalaman sebelum titik waktu tertentu di masa lalu menggunakan Past Perfect (had never visited)."
    },
    {
      q: "When the police reached the bank, the suspects ___ already fled.",
      options: ["have", "had", "were", "did"],
      answer: "had",
      explanation: "Pelaku kabur terlebih dahulu sebelum polisi tiba -> 'had fled'."
    },
    {
      q: "I recognized the novel because I ___ it three years prior.",
      options: ["read", "had read", "have read", "was reading"],
      answer: "had read",
      explanation: "Membaca novel terjadi lebih awal di masa lalu (prior) -> 'had read'."
    },
    {
      q: "She was disappointed because she ___ the contest by just two points.",
      options: ["lost", "had lost", "has lost", "was losing"],
      answer: "had lost",
      explanation: "Penyebab kekecewaan terjadi sebelumnya -> 'had lost'."
    },
    {
      q: "Hardly had the meeting begun ___ the fire alarm went off.",
      options: ["when", "than", "then", "after"],
      answer: "when",
      explanation: "Kombinasi Past Perfect inversi 'Hardly had ... when'."
    }
  ],

  "future-continuous": [
    {
      q: "This time tomorrow, I ___ across the Pacific Ocean to Tokyo.",
      options: ["will fly", "will be flying", "am flying", "fly"],
      answer: "will be flying",
      explanation: "Aksi yang akan SEDANG berlangsung pada titik waktu tertentu di masa depan (this time tomorrow) dinyatakan dengan Future Continuous (will be flying)."
    },
    {
      q: "Please don't call me at 8:00 PM tonight; I ___ dinner with my family.",
      options: ["will have", "will be having", "have", "had"],
      answer: "will be having",
      explanation: "Aksi sedang berlangsung pada jam 8 malam nanti -> 'will be having'."
    },
    {
      q: "At 10:00 AM next Monday, the delegates ___ the international treaty.",
      options: ["discuss", "will be discussing", "discussed", "are discuss"],
      answer: "will be discussing",
      explanation: "Future Continuous untuk kegiatan yang sedang berjalan pada jadwal spesifik masa depan."
    },
    {
      q: "Will you ___ using the laboratory equipment this afternoon?",
      options: ["be", "been", "being", "are"],
      answer: "be",
      explanation: "Bentuk tanya Future Continuous: 'Will + Subject + be + V-ing?'."
    },
    {
      q: "In ten years, most people ___ driving autonomous electric cars.",
      options: ["will be", "are", "have been", "were"],
      answer: "will be",
      explanation: "Prediksi proses masa depan yang sedang berlangsung: 'will be driving'."
    },
    {
      q: "She won't be joining us because she ___ for her medical exam all evening.",
      options: ["will study", "will be studying", "studies", "studied"],
      answer: "will be studying",
      explanation: "Menekankan proses belajar sepanjang malam di masa depan."
    },
    {
      q: "Tomorrow morning, the construction workers ___ the road.",
      options: ["will be paving", "will pave", "pave", "paved"],
      answer: "will be paving",
      explanation: "Aksi yang berlangsung selama rentang waktu pagi besok."
    },
    {
      q: "What will you ___ doing at this time next year?",
      options: ["be", "been", "being", "are"],
      answer: "be",
      explanation: "Pola: 'will you be doing'."
    }
  ],

  "present-perfect-continuous": [
    {
      q: "She is exhausted because she ___ non-stop for five hours.",
      options: ["has worked", "has been working", "is working", "worked"],
      answer: "has been working",
      explanation: "Present Perfect Continuous (has been working) menekankan durasi aksi yang dimulai di masa lalu dan masih berlangsung/baru saja selesai dengan efek nyata saat ini."
    },
    {
      q: "How long ___ you been studying computer science at this university?",
      options: ["have", "has", "do", "did"],
      answer: "have",
      explanation: "Subjek 'you' menggunakan kata kerja bantu 'have' dalam Present Perfect Continuous."
    },
    {
      q: "It ___ raining since early morning, so the roads are flooded.",
      options: ["has been", "have been", "is", "was"],
      answer: "has been",
      explanation: "Subjek tunggal 'It' menggunakan 'has been + V-ing'."
    },
    {
      q: "They have been living in this neighborhood ___ over a decade.",
      options: ["since", "for", "during", "in"],
      answer: "for",
      explanation: "'For' digunakan untuk menyatakan durasi waktu (for over a decade)."
    },
    {
      q: "I ___ trying to solve this coding bug all afternoon.",
      options: ["have been", "has been", "am", "was"],
      answer: "have been",
      explanation: "Subjek 'I' menggunakan 'have been + V-ing'."
    },
    {
      q: "The researcher has been collecting samples ___ last March.",
      options: ["for", "since", "from", "in"],
      answer: "since",
      explanation: "'Since' digunakan untuk titik awal waktu di masa lampau."
    },
    {
      q: "Why are your hands dirty? What have you ___ doing?",
      options: ["been", "being", "be", "done"],
      answer: "been",
      explanation: "Pola: 'What have you been doing?'."
    },
    {
      q: "We ___ waiting for the bus for almost 45 minutes now.",
      options: ["have been", "are", "were", "had been"],
      answer: "have been",
      explanation: "Durasi yang masih berlangsung hingga saat ini -> 'have been waiting'."
    }
  ],

  "past-perfect-continuous": [
    {
      q: "He was out of breath when he arrived because he ___ for three kilometers.",
      options: ["had been running", "has been running", "was running", "ran"],
      answer: "had been running",
      explanation: "Past Perfect Continuous (had been running) digunakan untuk menunjukkan durasi aksi lampau yang berlangsung sebelum titik waktu lampau lainnya."
    },
    {
      q: "They ___ negotiating the merger for months before reaching a final deal.",
      options: ["had been", "have been", "were", "are"],
      answer: "had been",
      explanation: "Aksi negosiasi berdurasi panjang terjadi sebelum kesepakatan lampau (reaching a deal)."
    },
    {
      q: "The ground was soaked because it ___ raining heavily all night.",
      options: ["had been", "has been", "was", "is"],
      answer: "had been",
      explanation: "Hujan berlangsung sepanjang malam sebelum waktu pengamatan lampau (ground was soaked)."
    },
    {
      q: "She ___ studying French for three years before she moved to Paris.",
      options: ["had been", "has been", "was", "is"],
      answer: "had been",
      explanation: "Durasi belajar bahasa terjadi sebelum kepindahan ke Paris di masa lampau."
    },
    {
      q: "How long had you been ___ for the flight when it was officially cancelled?",
      options: ["waiting", "wait", "waited", "to wait"],
      answer: "waiting",
      explanation: "Pola Past Perfect Continuous: 'had you been + V-ing'."
    },
    {
      q: "His eyes were red because he had been ___ at the computer screen for hours.",
      options: ["staring", "stare", "stared", "stares"],
      answer: "staring",
      explanation: "Efek lampau yang diakibatkan oleh aktivitas berdurasi panjang sebelumnya."
    },
    {
      q: "We had been ___ the road for two hours before realizing we took the wrong turn.",
      options: ["following", "follow", "followed", "follows"],
      answer: "following",
      explanation: "Pola: 'had been following'."
    },
    {
      q: "The company had been ___ a loss for years before the government intervention.",
      options: ["operating at", "operate at", "operated at", "operates at"],
      answer: "operating at",
      explanation: "Proses berlangsung bertahun-tahun di masa lampau sebelum intervensi."
    }
  ],

  "future-perfect": [
    {
      q: "By next December, I ___ from the university with honors.",
      options: ["will graduate", "will have graduated", "graduated", "am graduating"],
      answer: "will have graduated",
      explanation: "'By + future time marker' (By next December) adalah penanda utama Future Perfect (will have + V3), menunjukkan aksi sudah selesai sebelum waktu tersebut."
    },
    {
      q: "They ___ completed the highway construction by the end of this year.",
      options: ["will have", "will be", "have", "had"],
      answer: "will have",
      explanation: "Future Perfect Tense: 'will have completed'."
    },
    {
      q: "By 2030, scientists ___ discovered new treatments for rare diseases.",
      options: ["will have", "will be", "are", "have"],
      answer: "will have",
      explanation: "Target penyelesaian sebelum tahun 2030: 'will have discovered'."
    },
    {
      q: "Will you have ___ the report by the time the manager arrives tomorrow?",
      options: ["finished", "finish", "finishing", "finishes"],
      answer: "finished",
      explanation: "Bentuk interrogative Future Perfect: 'Will you have + V3 (finished)'."
    },
    {
      q: "By the time she turns thirty, she ___ visited over forty countries.",
      options: ["will have", "will", "has", "had"],
      answer: "will have",
      explanation: "Akumulasi pengalaman yang terselesaikan sebelum batas waktu masa depan."
    },
    {
      q: "The train ___ already left before we reach the platform.",
      options: ["will have", "will be", "is", "has"],
      answer: "will have",
      explanation: "Aksi selesai di masa depan sebelum aksi lain terjadi (before we reach)."
    },
    {
      q: "In two months, we ___ lived in this apartment for exactly five years.",
      options: ["will have", "will be", "have", "had"],
      answer: "will have",
      explanation: "Durasi total yang genap tercapai pada masa depan."
    },
    {
      q: "By next week, the team ___ tested all security patches.",
      options: ["will have", "will", "has", "is"],
      answer: "will have",
      explanation: "'By next week' -> Future Perfect 'will have tested'."
    }
  ],

  "future-perfect-continuous": [
    {
      q: "By 2028, she ___ working at this multinational corporation for ten years.",
      options: ["will have been", "will be", "has been", "had been"],
      answer: "will have been",
      explanation: "Future Perfect Continuous (will have been + V-ing) menekankan durasi aksi yang akan terus berlangsung hingga titik waktu di masa depan."
    },
    {
      q: "By midnight, the developers ___ coding for twelve consecutive hours.",
      options: ["will have been", "will be", "are", "have been"],
      answer: "will have been",
      explanation: "Menghitung durasi jam kerja berkelanjutan hingga tengah malam nanti."
    },
    {
      q: "Next month, I will have been ___ English for exactly five years.",
      options: ["studying", "study", "studied", "to study"],
      answer: "studying",
      explanation: "Pola: 'will have been + V-ing (studying)'."
    },
    {
      q: "By the time the race ends, the runners ___ running for over four hours.",
      options: ["will have been", "will be", "have been", "are"],
      answer: "will have been",
      explanation: "Durasi aksi lari yang masih berlangsung saat batas akhir tercapai."
    },
    {
      q: "How long will you have been ___ here by the time your visa expires?",
      options: ["living", "live", "lived", "to live"],
      answer: "living",
      explanation: "Pertanyaan durasi berkelanjutan pada Future Perfect Continuous."
    },
    {
      q: "By next year, they ___ researching renewable energy sources for a decade.",
      options: ["will have been", "will be", "had been", "have been"],
      answer: "will have been",
      explanation: "Pola durasi 10 tahun: 'will have been researching'."
    },
    {
      q: "She will be tired tomorrow because she ___ practicing all afternoon.",
      options: ["will have been", "will be", "is", "was"],
      answer: "will have been",
      explanation: "Alasan kelelahan masa depan akibat proses berdurasi panjang sebelumnya."
    },
    {
      q: "By 5 PM, we will have been ___ in this line for three hours.",
      options: ["standing", "stand", "stood", "to stand"],
      answer: "standing",
      explanation: "Pola: 'will have been standing'."
    }
  ],

  "prepositions-time": [
    {
      q: "The international seminar begins ___ 09:00 AM sharp.",
      options: ["at", "on", "in", "by"],
      answer: "at",
      explanation: "Waktu jam yang tepat (exact time) selalu menggunakan preposisi 'at' (at 09:00 AM)."
    },
    {
      q: "We always celebrate our anniversary ___ August 17th.",
      options: ["on", "in", "at", "during"],
      answer: "on",
      explanation: "Tanggal lengkap dan nama hari menggunakan preposisi 'on' (on August 17th / on Monday)."
    },
    {
      q: "Many groundbreaking technological inventions emerged ___ the 21st century.",
      options: ["in", "on", "at", "for"],
      answer: "in",
      explanation: "Bulan, tahun, dekade, dan abad (centuries) menggunakan preposisi 'in' (in the 21st century)."
    },
    {
      q: "I prefer doing my deep study sessions ___ night.",
      options: ["at", "in", "on", "by"],
      answer: "at",
      explanation: "Ekspresi waktu 'night / midnight / noon' menggunakan 'at' (at night)."
    },
    {
      q: "He promised to submit the complete project draft ___ Friday afternoon.",
      options: ["by", "at", "in", "on"],
      answer: "by",
      explanation: "'By' bermakna batas akhir waktu (deadline / no later than Friday afternoon)."
    },
    {
      q: "The leaves turn golden and fall ___ autumn.",
      options: ["in", "on", "at", "by"],
      answer: "in",
      explanation: "Nama musim (seasons: summer, winter, autumn, spring) menggunakan preposisi 'in'."
    },
    {
      q: "What do you usually do ___ weekends?",
      options: ["on", "in", "by", "during"],
      answer: "on",
      explanation: "Dalam American English, 'on the weekend / on weekends' adalah bentuk standar."
    },
    {
      q: "She worked as an intern ___ the summer holiday.",
      options: ["during", "at", "on", "in to"],
      answer: "during",
      explanation: "'During' digunakan untuk merujuk pada rentang waktu berlangsungnya suatu peristiwa (during the holiday)."
    }
  ],

  "prepositions-place": [
    {
      q: "She was sitting ___ the corner of the cozy library reading a book.",
      options: ["in", "on", "at", "by"],
      answer: "in",
      explanation: "'In the corner of a room / building' merujuk pada sudut di dalam ruangan."
    },
    {
      q: "The emergency meeting will take place ___ room 302 on the third floor.",
      options: ["in", "on", "at", "by"],
      answer: "in",
      explanation: "Ruangan tertutup menggunakan preposisi 'in' (in room 302)."
    },
    {
      q: "I met my university advisor ___ the bus stop this morning.",
      options: ["at", "in", "on", "under"],
      answer: "at",
      explanation: "Titik lokasi spesifik (specific point/stop) menggunakan preposisi 'at' (at the bus stop)."
    },
    {
      q: "There is an inspiring motivational poster hanging ___ the wall.",
      options: ["on", "in", "at", "above"],
      answer: "on",
      explanation: "Menempel pada permukaan bidang (surface) menggunakan preposisi 'on' (on the wall)."
    },
    {
      q: "The cat is sleeping comfortably ___ the wooden table.",
      options: ["under", "in", "at", "on to"],
      answer: "under",
      explanation: "'Under' menunjukkan posisi di bawah suatu benda."
    },
    {
      q: "The historic bookstore is located ___ Sudirman Street.",
      options: ["on", "in", "at", "by"],
      answer: "on",
      explanation: "Nama jalan tanpa nomor rumah menggunakan 'on' (on Sudirman Street). Jika disertai nomor, menggunakan 'at'."
    },
    {
      q: "The headquarters is situated ___ 45 Thamrin Boulevard, Jakarta.",
      options: ["at", "on", "in", "of"],
      answer: "at",
      explanation: "Alamat lengkap beserta nomor bangunan menggunakan preposisi 'at'."
    },
    {
      q: "The airplane flew high ___ the fluffy white clouds.",
      options: ["above", "on", "at", "under"],
      answer: "above",
      explanation: "'Above' menunjukkan posisi lebih tinggi tanpa menempel langsung."
    }
  ],

  "noun-clauses": [
    {
      q: "___ he decided to resign from the company surprised everyone.",
      options: ["That", "What", "Which", "Whether"],
      answer: "That",
      explanation: "Noun clause sebagai subjek kalimat fakta: 'That + subject + verb' (Bahwa dia memutuskan untuk mengundurkan diri...)."
    },
    {
      q: "I do not understand ___ he is trying to explain.",
      options: ["what", "that", "which", "whose"],
      answer: "what",
      explanation: "Noun clause sebagai objek kata kerja: 'what he is trying to explain' (apa yang sedang dia coba jelaskan)."
    },
    {
      q: "The committee is debating ___ they should invest in the new technology.",
      options: ["whether", "that", "what", "which"],
      answer: "whether",
      explanation: "'Whether' digunakan untuk noun clause yang menyatakan pilihan atau keraguan (apakah)."
    },
    {
      q: "Could you please tell me where the nearest train station ___?",
      options: ["is", "is it", "it is", "was"],
      answer: "is",
      explanation: "Noun clause dalam kalimat tanya tidak mengalami pembalikan susunan kata (embedded question format: Subject + Verb -> station is)."
    },
    {
      q: "___ wins the hackathon will receive full funding for their startup.",
      options: ["Whoever", "Whomever", "Whatever", "Whenever"],
      answer: "Whoever",
      explanation: "'Whoever' berfungsi sebagai subjek klausa noun (siapapun yang menang)."
    },
    {
      q: "My main concern is ___ we will meet the tight deadline.",
      options: ["how", "which", "what", "whom"],
      answer: "how",
      explanation: "Noun clause sebagai pelengkap subjek (subject complement): 'how we will meet the deadline'."
    },
    {
      q: "I wonder ___ the package has arrived yet.",
      options: ["if", "that", "what", "which"],
      answer: "if",
      explanation: "'If / whether' digunakan untuk klausa tanya tidak langsung (yes/no embedded question)."
    },
    {
      q: "Do you know who ___ this magnificent sculpture?",
      options: ["created", "did create", "creates", "creating"],
      answer: "created",
      explanation: "Noun clause dengan 'who' sebagai subjek klausa langsung diikuti kata kerja bentuk lampau (created)."
    }
  ],

  "adverbial-clauses": [
    {
      q: "___ she was feeling unwell, she delivered an exceptional presentation.",
      options: ["Although", "Because", "Since", "Unless"],
      answer: "Although",
      explanation: "'Although / Even though' digunakan untuk menghubungkan dua klausa yang bertentangan (contrast/concession)."
    },
    {
      q: "We decided to stay indoors ___ it was raining heavily outside.",
      options: ["because", "although", "despite", "unless"],
      answer: "because",
      explanation: "'Because / Since' mengawali adverbial clause of reason (alasan/sebab)."
    },
    {
      q: "You will not improve your speaking skills ___ you practice consistently.",
      options: ["unless", "if", "although", "because"],
      answer: "unless",
      explanation: "'Unless' bermakna 'if not' (kecuali jika kamu berlatih secara konsisten)."
    },
    {
      q: "He took detailed notes ___ he would not forget any crucial instructions.",
      options: ["so that", "in order", "because of", "although"],
      answer: "so that",
      explanation: "'So that' mengawali adverbial clause of purpose (tujuan agar tidak lupa)."
    },
    {
      q: "___ soon as the results were announced, the room erupted in applause.",
      options: ["As", "So", "Too", "Than"],
      answer: "As",
      explanation: "Frasa 'As soon as' merupakan konjungsi waktu (adverbial clause of time) yang bermakna 'segera setelah'."
    },
    {
      q: "She spoke softly ___ wake the sleeping baby.",
      options: ["so as not to", "in order to not", "because not", "although"],
      answer: "so as not to",
      explanation: "'So as not to + V1' adalah bentuk standar untuk menyatakan tujuan negatif (agar tidak membangunkan)."
    },
    {
      q: "The flight was delayed ___ there was severe turbulence on the runway.",
      options: ["since", "despite", "in spite of", "due to"],
      answer: "since",
      explanation: "'Since' dapat berfungsi sebagai kata sambung sebab-akibat yang diikuti klausa (Subject + Verb)."
    },
    {
      q: "Wherever you ___, I will support your dreams.",
      options: ["go", "will go", "went", "gone"],
      answer: "go",
      explanation: "Adverbial clause of place/time menggunakan Present Simple (go) untuk merujuk pada masa depan."
    }
  ],

  "participles-adjectives": [
    {
      q: "The lecture on astrophysics was so ___ that everyone stayed focused.",
      options: ["interesting", "interested", "interest", "interestingly"],
      answer: "interesting",
      explanation: "Present participle (-ing) digunakan untuk menerangkan hal/benda yang menimbulkan perasaan (the lecture is interesting)."
    },
    {
      q: "The students were deeply ___ in the artificial intelligence workshop.",
      options: ["interested", "interesting", "interest", "interests"],
      answer: "interested",
      explanation: "Past participle (-ed) digunakan untuk menggambarkan perasaan yang dialami oleh seseorang (students feel interested)."
    },
    {
      q: "She was ___ by the unexpected test results.",
      options: ["shocked", "shocking", "shock", "shocks"],
      answer: "shocked",
      explanation: "Perasaan kaget yang dialami oleh orang (she was shocked)."
    },
    {
      q: "It was a ___ journey through the mountain trail.",
      options: ["tiring", "tired", "tire", "tires"],
      answer: "tiring",
      explanation: "Perjalanan tersebut menyebabkan rasa lelah -> 'tiring journey'."
    },
    {
      q: "The ___ vase on the floor could not be repaired.",
      options: ["broken", "breaking", "broke", "break"],
      answer: "broken",
      explanation: "Past participle sebagai kata sifat pasif: vas yang sudah pecah -> 'broken vase'."
    },
    {
      q: "We witnessed a ___ increase in global digital adoption.",
      options: ["fascinating", "fascinated", "fascinate", "fascination"],
      answer: "fascinating",
      explanation: "Peningkatan yang menarik perhatian -> 'fascinating increase'."
    },
    {
      q: "The instructions were quite ___, so nobody understood the assignment.",
      options: ["confusing", "confused", "confuse", "confusion"],
      answer: "confusing",
      explanation: "Instruksi yang membingungkan -> 'confusing instructions'."
    },
    {
      q: "The ___ crowd cheered loudly when their team scored.",
      options: ["excited", "exciting", "excite", "excitement"],
      answer: "excited",
      explanation: "Penonton yang merasakan antusiasme/kegembiraan -> 'excited crowd'."
    }
  ],

  "preferences": [
    {
      q: "I prefer studying in a quiet library ___ studying in a crowded cafe.",
      options: ["to", "than", "rather than", "from"],
      answer: "to",
      explanation: "Pola standar kata kerja 'prefer' adalah 'prefer [Noun/V-ing] TO [Noun/V-ing]'."
    },
    {
      q: "I would rather ___ by train than drive through the traffic jam.",
      options: ["travel", "to travel", "traveling", "traveled"],
      answer: "travel",
      explanation: "'Would rather' selalu diikuti oleh bare infinitive (V1 murni tanpa 'to'): would rather travel."
    },
    {
      q: "She would prefer ___ at home tonight rather than go to the party.",
      options: ["to stay", "stay", "staying", "stayed"],
      answer: "to stay",
      explanation: "'Would prefer' diikuti oleh to-infinitive (would prefer to stay)."
    },
    {
      q: "He would rather read a book than ___ television.",
      options: ["watch", "to watch", "watching", "watched"],
      answer: "watch",
      explanation: "Paralel dengan bare infinitive: 'would rather [V1] than [V1]' -> watch."
    },
    {
      q: "My father prefers black coffee ___ sweetened tea.",
      options: ["to", "than", "better than", "over"],
      answer: "to",
      explanation: "Perbandingan dua kata benda pada 'prefer': 'prefer A to B'."
    },
    {
      q: "I would rather you ___ not smoke inside the house.",
      options: ["did", "do", "would", "are"],
      answer: "did",
      explanation: "'Would rather + subject + Past Simple' digunakan untuk menyatakan preferensi terhadap tindakan orang lain di masa kini."
    },
    {
      q: "She prefers walking to work to ___ public transport.",
      options: ["taking", "take", "to take", "took"],
      answer: "taking",
      explanation: "'Prefer V-ing to V-ing': walking to work to taking public transport."
    },
    {
      q: "He would rather starve than ___ money dishonestly.",
      options: ["steal", "to steal", "stealing", "stole"],
      answer: "steal",
      explanation: "'Would rather [V1] than [V1]' -> steal."
    }
  ],

  "conjunctions": [
    {
      q: "He is extremely wealthy, ___ he lives a remarkably modest lifestyle.",
      options: ["yet", "so", "for", "and"],
      answer: "yet",
      explanation: "Konjungsi koordinatif 'yet' bermakna 'namun/tetapi' untuk menunjukkan kontras yang mengejutkan."
    },
    {
      q: "You can pay for the subscription ___ via credit card or bank transfer.",
      options: ["either", "neither", "both", "not only"],
      answer: "either",
      explanation: "Konjungsi korelatif 'either' selalu berpasangan dengan 'or' (either ... or)."
    },
    {
      q: "___ the heavy rain and strong wind, the flight landed safely.",
      options: ["Despite", "Although", "Even though", "Because"],
      answer: "Despite",
      explanation: "'Despite / In spite of' adalah preposisi yang diikuti oleh noun phrase (the heavy rain)."
    },
    {
      q: "She is not only a brilliant researcher ___ a passionate teacher.",
      options: ["but also", "and also", "as well", "or else"],
      answer: "but also",
      explanation: "Pasangan korelatif baku: 'not only ... but also ...'."
    },
    {
      q: "Hurry up, ___ you will miss the morning registration deadline.",
      options: ["otherwise", "therefore", "furthermore", "moreover"],
      answer: "otherwise",
      explanation: "'Otherwise' bermakna 'jika tidak' untuk menunjukkan konsekuensi negatif."
    },
    {
      q: "The project was delayed ___ technical difficulties in the server room.",
      options: ["due to", "because", "since", "as"],
      answer: "due to",
      explanation: "'Due to / Because of' diikuti oleh noun phrase (technical difficulties)."
    },
    {
      q: "Both the CEO ___ the board members agreed on the new policy.",
      options: ["and", "or", "nor", "as well as"],
      answer: "and",
      explanation: "Pasangan korelatif: 'both ... and ...'."
    },
    {
      q: "He studied hard; ___, he passed the exam with the highest distinction.",
      options: ["consequently", "however", "nevertheless", "otherwise"],
      answer: "consequently",
      explanation: "'Consequently / Therefore' menunjukkan akibat logis dari kalimat sebelumnya."
    }
  ],

  "reflexive-pronouns": [
    {
      q: "She taught ___ how to program in Python through online tutorials.",
      options: ["herself", "her", "hers", "she"],
      answer: "herself",
      explanation: "Ketika subjek dan objek adalah orang yang sama (she -> herself), gunakan reflexive pronoun."
    },
    {
      q: "The team members organized the entire charity event ___.",
      options: ["themselves", "themself", "theirselves", "theirs"],
      answer: "themselves",
      explanation: "Reflexive pronoun untuk subjek jamak 'they / the team members' adalah 'themselves'."
    },
    {
      q: "He accidentally cut ___ while preparing vegetables for dinner.",
      options: ["himself", "him", "his", "he"],
      answer: "himself",
      explanation: "Subjek 'he' melukai dirinya sendiri -> 'himself'."
    },
    {
      q: "We must believe in ___ if we want to achieve great things.",
      options: ["ourselves", "ourself", "us", "ours"],
      answer: "ourselves",
      explanation: "Reflexive pronoun untuk subjek 'we' adalah 'ourselves'."
    },
    {
      q: "The modern software updates ___ automatically every midnight.",
      options: ["itself", "it", "its", "themselves"],
      answer: "itself",
      explanation: "Subjek benda tunggal 'the modern software' menggunakan 'itself'."
    },
    {
      q: "Please help ___ to the buffet food, everyone!",
      options: ["yourselves", "yourself", "you", "yours"],
      answer: "yourselves",
      explanation: "Merujuk kepada banyak orang ('everyone' audiens jamak) -> 'yourselves'."
    },
    {
      q: "I will deliver the presentation to the board of directors ___.",
      options: ["myself", "me", "mine", "my"],
      answer: "myself",
      explanation: "Penekanan intensif untuk subjek 'I' -> 'myself'."
    },
    {
      q: "The child is proud that he can tie his shoes by ___.",
      options: ["himself", "his", "him", "he"],
      answer: "himself",
      explanation: "Frasa 'by himself' bermakna 'sendirian tanpa bantuan orang lain'."
    }
  ],

  "indefinite-pronouns": [
    {
      q: "___ is knocking at the front door; could you check who it is?",
      options: ["Someone", "Anyone", "No one", "Everyone"],
      answer: "Someone",
      explanation: "'Someone' digunakan dalam kalimat positif untuk orang yang belum diketahui identitasnya."
    },
    {
      q: "Is there ___ in the conference room right now?",
      options: ["anybody", "somebody", "nobody", "everybody"],
      answer: "anybody",
      explanation: "'Anybody / Anyone' digunakan dalam kalimat tanya umum."
    },
    {
      q: "I looked everywhere for my car keys, but I found ___.",
      options: ["nothing", "anything", "something", "everything"],
      answer: "nothing",
      explanation: "'Nothing' bermakna tidak ada satupun benda yang ditemukan."
    },
    {
      q: "___ of the applicants meets the minimum language proficiency requirement.",
      options: ["None", "No", "Nobody", "Any"],
      answer: "None",
      explanation: "'None of + plural noun' digunakan saat menyatakan tidak satupun dari sekelompok orang/benda."
    },
    {
      q: "Everything in this store ___ on a 50% discount today.",
      options: ["is", "are", "were", "have been"],
      answer: "is",
      explanation: "Indefinite pronoun seperti 'everything, everyone, someone' selalu berpasangan dengan kata kerja tunggal (singular -> is)."
    },
    {
      q: "She was very hungry because she had eaten ___ all day.",
      options: ["nothing", "anything", "something", "everything"],
      answer: "nothing",
      explanation: "'Had eaten nothing' bermakna tidak makan apa-apa sepanjang hari."
    },
    {
      q: "Does ___ have any questions regarding the final assignment?",
      options: ["anyone", "someone", "no one", "all"],
      answer: "anyone",
      explanation: "Kalimat tanya umum menggunakan 'anyone'."
    },
    {
      q: "___ was happy with the unexpected holiday announcement.",
      options: ["Everyone", "All", "Every", "Anybody"],
      answer: "Everyone",
      explanation: "'Everyone' diikuti oleh kata kerja tunggal 'was'."
    }
  ],

  "zero-article": [
    {
      q: "___ water is essential for the survival of all living organisms.",
      options: ["No article (-)", "The", "A", "An"],
      answer: "No article (-)",
      explanation: "Kata benda tak dapat dihitung (uncountable noun) yang dibicarakan secara umum tidak menggunakan artikel (Zero Article)."
    },
    {
      q: "She goes to ___ school by bicycle every morning.",
      options: ["No article (-)", "the", "a", "an"],
      answer: "No article (-)",
      explanation: "Institusi seperti school, hospital, prison, church yang digunakan sesuai fungsi utamanya tidak memakai artikel."
    },
    {
      q: "They are currently studying ___ Japanese literature at the faculty.",
      options: ["No article (-)", "the", "a", "an"],
      answer: "No article (-)",
      explanation: "Nama bahasa dan mata pelajaran akademis tidak menggunakan artikel."
    },
    {
      q: "He loves playing ___ basketball with his neighborhood friends.",
      options: ["No article (-)", "the", "a", "an"],
      answer: "No article (-)",
      explanation: "Nama olahraga dan permainan (basketball, soccer, chess) tidak menggunakan artikel."
    },
    {
      q: "___ honesty is the best policy in any relationship.",
      options: ["No article (-)", "The", "A", "An"],
      answer: "No article (-)",
      explanation: "Kata benda abstrak yang bersifat umum (honesty, love, courage) tidak memakai artikel."
    },
    {
      q: "We had ___ dinner at a traditional restaurant downtown.",
      options: ["No article (-)", "the", "a", "an"],
      answer: "No article (-)",
      explanation: "Nama waktu makan umum (breakfast, lunch, dinner) umumnya tanpa artikel."
    },
    {
      q: "She traveled to ___ France to attend a fashion convention.",
      options: ["No article (-)", "the", "a", "an"],
      answer: "No article (-)",
      explanation: "Nama negara tunggal (kecuali yang berbentuk serikat/kepulauan seperti The USA/The UK) tidak menggunakan artikel."
    },
    {
      q: "He was admitted to ___ hospital after the accident.",
      options: ["No article (-)", "the", "a", "an"],
      answer: "No article (-)",
      explanation: "'To hospital' (sebagai pasien) tidak memakai artikel."
    }
  ],

  "order-of-adjectives": [
    {
      q: "She bought a ___ Italian leather handbag at the boutique.",
      options: [
        "beautiful small black",
        "small beautiful black",
        "black small beautiful",
        "beautiful black small"
      ],
      answer: "beautiful small black",
      explanation: "Urutan kata sifat (OSASCOMP): Opinion (beautiful) -> Size (small) -> Age -> Shape -> Color (black) -> Origin (Italian) -> Material (leather)."
    },
    {
      q: "He was wearing a ___ woolen sweater during the winter hike.",
      options: [
        "warm cozy red",
        "cozy warm red",
        "red cozy warm",
        "cozy red warm"
      ],
      answer: "cozy warm red",
      explanation: "Opinion (cozy, warm) mendahului Color (red), diikuti Material (woolen)."
    },
    {
      q: "They live in a ___ wooden house near the pine forest.",
      options: [
        "charming old Swiss",
        "old charming Swiss",
        "Swiss charming old",
        "charming Swiss old"
      ],
      answer: "charming old Swiss",
      explanation: "Urutan kata sifat: Opinion (charming) -> Age (old) -> Origin (Swiss) -> Material (wooden)."
    },
    {
      q: "He drove an impressive ___ sports car into the driveway.",
      options: [
        "fast new German",
        "new fast German",
        "German new fast",
        "fast German new"
      ],
      answer: "fast new German",
      explanation: "Opinion/Quality (fast) -> Age (new) -> Origin (German)."
    },
    {
      q: "She has gorgeous ___ hair that reaches her shoulders.",
      options: [
        "long curly brown",
        "curly long brown",
        "brown long curly",
        "long brown curly"
      ],
      answer: "long curly brown",
      explanation: "Size/Length (long) -> Shape (curly) -> Color (brown)."
    },
    {
      q: "The antique shop sold a ___ dining table.",
      options: [
        "magnificent round wooden",
        "wooden magnificent round",
        "round magnificent wooden",
        "magnificent wooden round"
      ],
      answer: "magnificent round wooden",
      explanation: "Opinion (magnificent) -> Shape (round) -> Material (wooden)."
    },
    {
      q: "He found a ___ metal box buried in the garden.",
      options: [
        "strange small square",
        "small strange square",
        "square small strange",
        "metal small strange"
      ],
      answer: "strange small square",
      explanation: "Opinion (strange) -> Size (small) -> Shape (square) -> Material (metal)."
    },
    {
      q: "She wore a ___ silk dress to the annual gala.",
      options: [
        "stunning red Japanese",
        "stunning Japanese red",
        "red stunning Japanese",
        "Japanese stunning red"
      ],
      answer: "stunning red Japanese",
      explanation: "Opinion (stunning) -> Color (red) -> Origin (Japanese) -> Material (silk)."
    }
  ],

  "phrasal-verbs": [
    {
      q: "The sudden storm forced the committee to ___ the football final.",
      options: ["call off", "call on", "call in", "call up"],
      answer: "call off",
      explanation: "'Call off' bermakna membatalkan (cancel) suatu acara atau rencana."
    },
    {
      q: "Never ___ what you can accomplish today until tomorrow.",
      options: ["put off", "put on", "put up", "put out"],
      answer: "put off",
      explanation: "'Put off' bermakna menunda (postpone / delay)."
    },
    {
      q: "The brave firefighters worked tirelessly to ___ the forest blaze.",
      options: ["put out", "put in", "put off", "put away"],
      answer: "put out",
      explanation: "'Put out' bermakna memadamkan api (extinguish a fire)."
    },
    {
      q: "I ___ an old photograph album while cleaning the storage attic.",
      options: ["came across", "came by", "came into", "came up"],
      answer: "came across",
      explanation: "'Come across' bermakna menemukan sesuatu secara tidak sengaja (find by chance)."
    },
    {
      q: "She had to ___ her job offer due to unforeseen family obligations.",
      options: ["turn down", "turn off", "turn out", "turn away"],
      answer: "turn down",
      explanation: "'Turn down' bermakna menolak tawaran atau lamaran (reject / decline)."
    },
    {
      q: "He decided to ___ smoking for the sake of his health.",
      options: ["give up", "give in", "give away", "give off"],
      answer: "give up",
      explanation: "'Give up' bermakna berhenti melakukan kebiasaan (quit / surrender)."
    },
    {
      q: "The plane will ___ on schedule despite the foggy weather.",
      options: ["take off", "take up", "take on", "take in"],
      answer: "take off",
      explanation: "'Take off' bermakna lepas landas (pesawat terbang)."
    },
    {
      q: "I need to ___ this new word in the English dictionary.",
      options: ["look up", "look for", "look after", "look into"],
      answer: "look up",
      explanation: "'Look up' bermakna mencari arti kata atau informasi di buku rujukan/kamus."
    }
  ],

  "wh-questions": [
    {
      q: "___ of these two career paths do you find more promising?",
      options: ["Which", "What", "Who", "Where"],
      answer: "Which",
      explanation: "'Which' digunakan ketika memilih di antara opsi atau pilihan yang terbatas dan spesifik."
    },
    {
      q: "___ did you discuss the project details with during the meeting?",
      options: ["Whom", "Whose", "Which", "Why"],
      answer: "Whom",
      explanation: "'Whom' digunakan sebagai kata tanya untuk objek orang (with whom / whom did you discuss with)."
    },
    {
      q: "___ briefcase was left unattended on the conference table?",
      options: ["Whose", "Who", "Whom", "Which"],
      answer: "Whose",
      explanation: "'Whose' menanyakan kepemilikan suatu benda (tas milik siapa)."
    },
    {
      q: "___ long does it take to travel from Jakarta to Bandung by high-speed train?",
      options: ["How", "What", "Which", "Where"],
      answer: "How",
      explanation: "'How long' menanyakan durasi waktu perjalanan."
    },
    {
      q: "___ is responsible for overseeing the safety inspection?",
      options: ["Who", "Whom", "Whose", "Which"],
      answer: "Who",
      explanation: "'Who' menanyakan subjek pelaku orang yang bertanggung jawab."
    },
    {
      q: "___ often do you conduct server security audits?",
      options: ["How", "What", "When", "Why"],
      answer: "How",
      explanation: "'How often' menanyakan frekuensi pengulangan suatu kegiatan."
    },
    {
      q: "___ didn't you inform the team about the schedule alteration earlier?",
      options: ["Why", "How", "When", "Where"],
      answer: "Why",
      explanation: "'Why' menanyakan alasan atau penyebab."
    },
    {
      q: "___ far is the international airport from the city center?",
      options: ["How", "What", "Where", "Which"],
      answer: "How",
      explanation: "'How far' menanyakan jarak geografis."
    }
  ]
};

// Helper: Ambil bank soal untuk suatu topik dengan random shuffle dan pemilihan jumlah soal
export function getRandomLessonQuestions(lessonId, count = 5) {
  const bank = GRAMMAR_QUESTION_BANK[lessonId] || [];
  if (bank.length === 0) return [];
  
  // Clone & shuffle questions
  const shuffled = [...bank].sort(() => Math.random() - 0.5);
  
  // Ambil sebanyak count, lalu shuffle opsi jawabannya
  return shuffled.slice(0, count).map(q => {
    const opts = [...q.options].sort(() => Math.random() - 0.5);
    return {
      ...q,
      options: opts
    };
  });
}

// Helper: Ambil soal campuran dari seluruh topik untuk Session Latihan AI (Fallback / Mixed Mode)
export function getRandomMixedGrammarQuestions(count = 5) {
  const allQuestions = [];
  Object.keys(GRAMMAR_QUESTION_BANK).forEach(topicId => {
    GRAMMAR_QUESTION_BANK[topicId].forEach(q => {
      allQuestions.push({ ...q, topicId });
    });
  });

  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(q => ({
    ...q,
    options: [...q.options].sort(() => Math.random() - 0.5)
  }));
}
