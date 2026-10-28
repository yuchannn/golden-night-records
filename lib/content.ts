/**
 * Editable catalogue for Golden Night Records 金宵唱片.
 * Leave unknown fields null. Only add dates, biographies, emails, and URLs that have been confirmed.
 */

export type Accent = "burgundy" | "slate";

export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ExternalLink = {
  label: string;
  url: string;
};

export type ListeningService = "spotify" | "apple-music" | "youtube" | "other";

export type ListeningLink = {
  service: ListeningService;
  url: string;
  /** Required when service is "other". Overrides the default label for known services. */
  label?: string;
};

export type LabelContent = {
  nameEn: string;
  nameZh: string;
  cityEn: string;
  cityZh: string;
  regionEn: string;
  regionZh: string;
  email: string | null;
  /** Absolute site URL, for example https://example.com. Used for sharing metadata. */
  siteUrl: string | null;
  social: ExternalLink[];
  /** Set when a real logo file is available. Otherwise the site uses a text wordmark. */
  logo: ImageAsset | null;
  /** Optional light version for forest-green surfaces. */
  logoOnDark: ImageAsset | null;
};

export type Artist = {
  id: string;
  slug: string;
  nameEn: string;
  nameZh: string;
  introduction: string;
  biography: string | null;
  portrait: ImageAsset | null;
  accent: Accent;
  links: ExternalLink[];
};

export type Release = {
  id: string;
  title: string;
  artistId: string;
  artwork: ImageAsset | null;
  /** Editorial order in 金宵選曲. Independent of any release date. */
  featuredOrder: number;
  date: string | null;
  type: string | null;
  description: string | null;
  /** Site path such as /audio/track.mp3, or an https URL for an authorized file. */
  audio: string | null;
  listeningLinks: ListeningLink[];
};

export const label: LabelContent = {
  nameEn: "Golden Night Records",
  nameZh: "金宵唱片",
  cityEn: "Taipei",
  cityZh: "台北",
  regionEn: "Taiwan",
  regionZh: "台灣",
  email: null,
  siteUrl: null,
  social: [],
  logo: {
    src: "/images/logo.png",
    width: 2172,
    height: 724,
    alt: "Golden Night Records 金宵唱片",
  },
  logoOnDark: {
    src: "/images/logo-on-dark.png",
    width: 2172,
    height: 724,
    alt: "Golden Night Records 金宵唱片",
  },
};

export const artists: Artist[] = [
  {
    id: "romy-lo",
    slug: "romy-lo",
    nameEn: "Romy Lo",
    nameZh: "羅曼麗",
    introduction:
      "復古的輪廓，當代的心動。Romy 把搖擺節奏、俏皮告白和一點點壞心眼，唱成自己的浪漫。",
    biography:
      "羅曼麗 · ROMY LO 在台北長大，從小與祖父母同住。兩人曾為一九五〇、六〇年代一些不太知名的國語歌手寫歌。家裡堆著舊唱片與手寫樂譜，她聽著鋼琴聲長大，一度以為，每個人都會唱那些歌。\n\n後來，她就讀臺灣師範大學，研習中國文學，課餘在二手書店打工。原本想寫小說的她，喜歡記下身邊的小事：接得太快的電話、說了晚安卻遲遲不走的人，還有嘴上不肯承認的喜歡。\n\n這些片段慢慢成了歌。祖母教她如何寫出好聽的旋律，祖父教她把心事藏進一句玩笑。如今，她在金宵唱片旗下，把這份從小聽到大的浪漫，唱成屬於自己的故事。\n\n她的音樂融合國語時代曲與早期搖滾，以輕快鋼琴、明亮銅管和帶著笑意的歌聲，寫戀愛裡的試探、吃醋與小小得意。她筆下的人總有幾分自信，偏偏一動心，就藏不住了。",
    portrait: {
      src: "/images/artists/romy-lo.jpg",
      width: 1142,
      height: 1377,
      alt: "Romy Lo 羅曼麗，穿著酒紅絲絨洋裝，在暖色燈光下微笑。",
    },
    accent: "burgundy",
    links: [],
  },
  {
    id: "yan",
    slug: "yan",
    nameEn: "Yan",
    nameZh: "言川",
    introduction:
      "有些話不急著說完。Yan 用溫暖的聲線和輕盈的節奏，唱出靠近、試探，和日常裡的小小心動。",
    biography:
      "言川 · YAN 在高雄長大，家裡播放的是華語流行歌，耳機裡聽的則是 R&B。他從鋼琴前開始寫歌，慢慢發現，有些說不出口的話，唱出來反而容易一些。\n\n後來，他前往波士頓，就讀 Berklee College of Music，主修歌曲創作。畢業後，他落腳溫哥華，開了一間小小的社區咖啡店。清晨在吧檯後忙碌，打烊後繼續寫歌，錄下的 demo 卻很少讓人聽見。\n\n直到有一天，他決定不再等一個「更適合的時候」。那些深夜留下的錄音，逐漸成為他在金宵唱片旗下發行的第一批作品。\n\n他的音樂以溫暖的鋼琴與內斂的流行靈魂樂為底，歌詞像日常對話，寫一點猶豫、一個遲遲留在心裡的平凡瞬間，還有那些差一點就說出口的話。",
    portrait: {
      src: "/images/artists/yan.jpg",
      width: 1086,
      height: 1448,
      alt: "Yan 言川，穿著棕色燈芯絨外套，靠在藍色牆邊。",
    },
    accent: "slate",
    links: [],
  },
];

export const releases: Release[] = [
  {
    id: "bie-ba-kou-hong-ca-diao",
    title: "別把口紅擦掉",
    artistId: "romy-lo",
    artwork: {
      src: "/images/releases/bie-ba-kou-hong-ca-diao.jpg",
      width: 1254,
      height: 1254,
      alt: "《別把口紅擦掉》封面，Romy Lo 羅曼麗",
    },
    featuredOrder: 1,
    date: null,
    type: null,
    description:
      "一個吻留下的紅，怎麼捨得擦掉？輕快搖滾與甜蜜和聲裡，羅曼麗把一抹口紅變成俏皮的愛情記號——今晚這個先收好，明天還有再見的理由。",
    audio: null,
    listeningLinks: [
      {
        service: "spotify",
        url: "https://open.spotify.com/track/4KvrqAN0iW18EtzXLi3wcv",
      },
    ],
  },
  {
    id: "na-wei-xiao-jie-shi-shei",
    title: "那位小姐是誰？",
    artistId: "romy-lo",
    artwork: {
      src: "/images/releases/na-wei-xiao-jie-shi-shei.jpg",
      width: 1254,
      height: 1254,
      alt: "《那位小姐是誰？》封面，Romy Lo 羅曼麗",
    },
    featuredOrder: 4,
    date: null,
    type: null,
    description:
      "她才不是吃醋，只是你陪誰跳了幾支舞，她剛好都記得。明亮鋼琴與俏皮銅管之間，一句看似隨口的「她是誰」，越問越藏不住在意。名字可以慢慢說，下一支舞可得留給她。",
    audio: null,
    listeningLinks: [
      {
        service: "spotify",
        url: "https://open.spotify.com/track/6Ipn9fERwrgLLkOIXdVfng",
      },
    ],
  },
  {
    id: "bu-yong-song-le",
    title: "不用送了",
    artistId: "yan",
    artwork: {
      src: "/images/releases/bu-yong-song-le.jpg",
      width: 1254,
      height: 1254,
      alt: "《不用送了》封面，Yan 言川",
    },
    featuredOrder: 2,
    date: null,
    type: null,
    description:
      "「不用送了，我自己回去就好。」\n\n話是這樣說，腳步卻慢了下來。多等一個紅燈、多聊一件小事，好像就能把今晚留久一點。言川 Yan 的〈不用送了〉，送給那些回家的路很熟，卻還想跟某個人多走一段的人。",
    audio: null,
    listeningLinks: [
      {
        service: "spotify",
        url: "https://open.spotify.com/track/7xkAN0FfoTeYhPoi0H09E1",
      },
    ],
  },
  {
    id: "bu-ji",
    title: "不急",
    artistId: "yan",
    artwork: {
      src: "/images/releases/bu-ji.jpg",
      width: 1254,
      height: 1254,
      alt: "《不急》封面，Yan 言川",
    },
    featuredOrder: 3,
    date: null,
    type: null,
    description:
      "明明期待了一整個星期，約定落空時，還是回了笑臉，說改天也可以。怕你有壓力，就把想念說成隨意，把失望說得很輕。\n\n言川 Yan 的〈不急〉，唱給那些總是配合別人的時間，也希望被好好安排進某一天的人。從「你先忙」到「我先回家了」，中間是一次次沒說出口的期待，和終於不再說「都可以」的自己。",
    audio: null,
    listeningLinks: [
      {
        service: "spotify",
        url: "https://open.spotify.com/track/1YL99Nz8yrEaLsccfuXciI",
      },
    ],
  },
  {
    id: "wo-cai-mei-you-deng-ni",
    title: "我才沒有等你",
    artistId: "romy-lo",
    artwork: {
      src: "/images/releases/wo-cai-mei-you-deng-ni.jpg",
      width: 1254,
      height: 1254,
      alt: "《我才沒有等你》封面，Romy Lo 羅曼麗坐在窗邊，桌上有一臺黑電話。",
    },
    featuredOrder: 5,
    date: null,
    type: null,
    description:
      "花瓶挪到電話旁，椅子也跟著換了位置，但她真的「沒有在等你」。一句句否認踩著輕快節奏，直到鈴聲一響，全都露了餡。花在這裡，茶在這裡，就差一個你。",
    audio: null,
    listeningLinks: [
      {
        service: "spotify",
        url: "https://open.spotify.com/track/7mtRWnNgd8fexpWfjlFARN",
      },
    ],
  },
  {
    id: "hao-xiao-xi",
    title: "好消息",
    artistId: "yan",
    artwork: {
      src: "/images/releases/hao-xiao-xi.jpg",
      width: 1254,
      height: 1254,
      alt: "《好消息》封面，皺紙上畫著兩頂派對帽。",
    },
    featuredOrder: 6,
    date: null,
    type: null,
    description:
      "終於等到值得慶祝的那一天，最想分享的人，卻已經不在身邊。一首寫給遲來的好消息，也寫給那個曾經比你更相信你的人。",
    audio: null,
    listeningLinks: [
      {
        service: "spotify",
        url: "https://open.spotify.com/track/0DMuvYjJvToeRsgvMMBve9",
      },
    ],
  },
  {
    id: "huai-de-zhen-ke-ai",
    title: "壞得真可愛",
    artistId: "romy-lo",
    artwork: {
      src: "/images/releases/huai-de-zhen-ke-ai.jpg",
      width: 1254,
      height: 1254,
      alt: "《壞得真可愛》封面，Romy Lo 羅曼麗穿黑禮服，戴著長手套站在麥克風前。",
    },
    featuredOrder: 7,
    date: null,
    type: null,
    description:
      "晚安說了三遍，誰也沒打算先走。甜美搖擺與熱鬧銅管，伴著兩個人把告別拖成一場約會。嘴上怪你壞得可愛，牽起你的手，卻故意往回家的遠路拐。",
    audio: null,
    listeningLinks: [
      {
        service: "spotify",
        url: "https://open.spotify.com/track/02oXL5tceWF38c93oIE17p",
      },
    ],
  },
  {
    id: "shao-lai",
    title: "少來",
    artistId: "yan",
    artwork: {
      src: "/images/releases/shao-lai.jpg",
      width: 1254,
      height: 1254,
      alt: "《少來》封面，黃襯衫口袋裡露出一支手機。",
    },
    featuredOrder: 8,
    date: null,
    type: null,
    description:
      "嘴上說沒什麼，期待卻藏不住。輕快俏皮的律動，唱出被朋友看穿的小心思，和曖昧剛開始時，那點越解釋越明顯的心動。",
    audio: null,
    listeningLinks: [
      {
        service: "spotify",
        url: "https://open.spotify.com/track/0P2r3jHWMqVCvtQJokFHCQ",
      },
    ],
  },
  {
    id: "shei-zhun-ni-jin-wo-meng-li",
    title: "誰准你進我夢裡？",
    artistId: "romy-lo",
    artwork: {
      src: "/images/releases/shei-zhun-ni-jin-wo-meng-li.jpg",
      width: 1254,
      height: 1254,
      alt: "《誰准你進我夢裡？》封面，Romy Lo 羅曼麗在月夜窗邊，指向雲上的舞池。",
    },
    featuredOrder: 9,
    date: null,
    type: null,
    description:
      "白天連手都不敢牽，夢裡倒是什麼都敢。羅曼麗用輕快搖滾唱起一場甜蜜的興師問罪，怪你太靠近，更怪鬧鐘太不識趣。從「誰准你來」唱到「今晚再來」，原來最捨不得醒的人是她。",
    audio: null,
    listeningLinks: [
      {
        service: "spotify",
        url: "https://open.spotify.com/track/3sZJMVrtk5YYV0K54KLfTx",
      },
    ],
  },
  {
    id: "kan-cuo",
    title: "看錯",
    artistId: "yan",
    artwork: {
      src: "/images/releases/kan-cuo.jpg",
      width: 1254,
      height: 1254,
      alt: "《看錯》封面，藍色外套的一角，前面拉著窗簾。",
    },
    featuredOrder: 10,
    date: null,
    type: null,
    description:
      "只是認錯一個背影，心裡卻已經排練完一場重逢。明快的節奏裡，藏著那句「還好」之後，自己也說不清的失落。",
    audio: null,
    listeningLinks: [
      {
        service: "spotify",
        url: "https://open.spotify.com/track/3mCF7XYpdOpEDR8rFil91u",
      },
    ],
  },
  {
    id: "pian-pian-kan-shang-ni",
    title: "偏偏看上你",
    artistId: "romy-lo",
    artwork: {
      src: "/images/releases/pian-pian-kan-shang-ni.jpg",
      width: 1254,
      height: 1254,
      alt: "《偏偏看上你》封面，Romy Lo 羅曼麗在夜色舞廳裡拿著麥克風。",
    },
    featuredOrder: 11,
    date: null,
    type: null,
    description:
      "本來只想看你出洋相，怎麼先臉紅的反而是自己？跳躍的鋼琴與熱烈銅管，把一句喜歡從試探推向告白。不怪月亮，不怪酒意——滿場那麼多人，偏偏就是看上你。",
    audio: null,
    listeningLinks: [
      {
        service: "spotify",
        url: "https://open.spotify.com/track/6LcGrArpBT3OcgQiad28dt",
      },
    ],
  },
  {
    id: "ni-bu-wen-le",
    title: "你不問了",
    artistId: "yan",
    artwork: {
      src: "/images/releases/ni-bu-wen-le.jpg",
      width: 1254,
      height: 1254,
      alt: "《你不問了》封面，深夜裡一張藍色的床。",
    },
    featuredOrder: 12,
    date: null,
    type: null,
    description:
      "以為不再追問，是終於被諒解；直到對方不再等，才聽懂那些沉默。從克制的鋼琴走向情緒湧出的副歌，唱出那些終於願意說、卻已經無人再問的回答。",
    audio: null,
    listeningLinks: [
      {
        service: "spotify",
        url: "https://open.spotify.com/track/4X3H6r0Yd1TLedNrdLpVro",
      },
    ],
  },
  {
    id: "jie-kou",
    title: "戒口",
    artistId: "yan",
    artwork: {
      src: "/images/releases/jie-kou.jpg",
      width: 1254,
      height: 1254,
      alt: "《戒口》封面，一碗紅油麵和一雙藍筷子。",
    },
    featuredOrder: 14,
    date: null,
    type: null,
    description: null,
    audio: null,
    listeningLinks: [
      {
        service: "spotify",
        url: "https://open.spotify.com/track/4kIedne2p8Ari7A87SBZlk",
      },
    ],
  },
  {
    id: "xian-jie-ni",
    title: "先借你",
    artistId: "yan",
    artwork: {
      src: "/images/releases/xian-jie-ni.jpg",
      width: 1254,
      height: 1254,
      alt: "《先借你》封面，一把藍傘靠在陽台欄杆邊。",
    },
    featuredOrder: 15,
    date: null,
    type: null,
    description:
      "有些東西不急著拿回來，有些見面也不必把理由說穿。一把遲遲沒還的傘，一段溫暖輕盈的旋律，留住兩個人都默默期待的下一次。",
    audio: null,
    listeningLinks: [
      {
        service: "spotify",
        url: "https://open.spotify.com/track/6XGImJJojgCfh95CfWC1lK",
      },
    ],
  },
  {
    id: "bu-yong-jie-hua",
    title: "不用接話",
    artistId: "yan",
    artwork: {
      src: "/images/releases/bu-yong-jie-hua.jpg",
      width: 1254,
      height: 1254,
      alt: "《不用接話》封面，城市夜空裡一座小小的陽台。",
    },
    featuredOrder: 16,
    date: null,
    type: null,
    description:
      "不用一直找話題，安靜也能讓人靠近。輕巧的律動裡，是自在相處時悄悄冒出的好奇——嘴上說不用接話，卻還是想知道你在想什麼。",
    audio: null,
    listeningLinks: [
      {
        service: "spotify",
        url: "https://open.spotify.com/track/1rM4NWsWyAwoiyZBetqBcI",
      },
    ],
  },
];

export const navigation = [
  { id: "artists", labelZh: "藝人", labelEn: "Artists" },
  { id: "music", labelZh: "音樂", labelEn: "Music" },
  { id: "about", labelZh: "關於", labelEn: "About" },
  { id: "contact", labelZh: "聯絡", labelEn: "Contact" },
] as const;

export const chapters = [
  { id: "opening", mark: "序", en: "Opening", line: "推開今夜的門。" },
  { id: "artists", mark: "壹", en: "Artists", line: "先認識兩個聲音。" },
  { id: "music", mark: "貳", en: "Music", line: "再選一首，多留一會。" },
  { id: "about", mark: "參", en: "About", line: "情緒本來就不只一種。" },
  { id: "contact", mark: "終", en: "Contact", line: "下一段，從這裡寫起。" },
] as const;

export const heroReleaseIds = [
  "bie-ba-kou-hong-ca-diao",
  "bu-yong-song-le",
  "bu-ji",
  "na-wei-xiao-jie-shi-shei",
  "wo-cai-mei-you-deng-ni",
  "hao-xiao-xi",
  "huai-de-zhen-ke-ai",
  "shao-lai",
  "shei-zhun-ni-jin-wo-meng-li",
  "kan-cuo",
  "pian-pian-kan-shang-ni",
  "ni-bu-wen-le",
  "jie-kou",
  "xian-jie-ni",
  "bu-yong-jie-hua",
] as const;

export const aboutParagraphs = [
  "人的情緒，本來就很多樣。有人在一九五〇年代的華語裡看見光，也有人在今天的靈魂流行裡，聽見自己的心事。",
  "金宵想把這些不同的聲音，再帶回世界上。從復古的輪廓，到年輕人熟悉的當下，心動和試探，都可以被好好唱出來。",
  "我們和藝人一起，不把音樂收成一種樣子。那些真實、說不出口、卻一直都在的感覺，值得留下來。",
];

export const siteDescription =
  "金宵唱片，來自台北。收錄心動、試探，和那些還沒說出口的話。";
