export const CONFIG = {
  appName: "DateQuest",
  event: {
    date: "Saturday, June 13"
  },
  steps: [
    {
      id: "time",
      label: "01 · time",
      title: "Would you want to see a play?",
      missing: "Choose a time first.",
      grid: "time-grid",
      options: [
        {
          id: "4pm",
          title: "4:00 PM",
          eyebrow: "recommended",
          emoji: "⭐",
          meta: "best route",
          note: "i highly recommend this time so we can have more time to eat xD",
          tags: ["more time", "better flow", "recommended"],
          gradient: "linear-gradient(135deg, #80d66b, #d8ff73 48%, #ffe074)",
          recommended: true
        },
        {
          id: "7pm",
          title: "7:00 PM",
          eyebrow: "later",
          emoji: "🌙",
          meta: "night route",
          description: "A later start with a quieter evening rhythm.",
          tags: ["night", "backup"],
          gradient: "linear-gradient(135deg, #2352b8, #7465f2 48%, #ff86ba)"
        }
      ]
    },
    {
      id: "play",
      label: "02 · play",
      title: "Choose a play",
      missing: "Choose a play first.",
      options: [
        {
          id: "magic-school",
          title: "Học Viện Phép Thuật",
          eyebrow: "magic",
          emoji: "🪄",
          meta: "IDECAF",
          description: "Cute magic play. imagine tấm cám.",
          tags: ["cute", "funny", "magic"],
          gradient: "linear-gradient(135deg, #ffe074, #ff9ccc 48%, #5ab8ff)"
        },
        {
          id: "ghost-singer",
          title: "Hồn ma cô đào hát",
          eyebrow: "theatre",
          emoji: "🎭",
          meta: "Thế Giới Trẻ",
          description: "Slice-of-life. Funny, warm, miền Tây vibes.",
          tags: ["warm", "funny", "cải lương"],
          gradient: "linear-gradient(135deg, #ffd99a, #ff7a68 48%, #7465f2)"
        }
      ]
    },
    {
      id: "food",
      label: "03 · food",
      title: "Food + dessert",
      missing: "Choose food first.",
      options: [
        {
          id: "pasta-tiramisu",
          title: "Pasta + tiramisu",
          eyebrow: "romance",
          emoji: "🍝",
          meta: "dinner + dessert",
          description: "Soft lighting. Cute plates. Sauce risk managed professionally.",
          tags: ["romantic", "classic"],
          gradient: "linear-gradient(135deg, #fff2a0, #ffb26f 48%, #ff86ba)"
        },
        {
          id: "sushi-matcha",
          title: "Sushi + matcha",
          eyebrow: "aesthetic",
          emoji: "🍣",
          meta: "clean + cute",
          description: "Very calm. Very Pinterest. Very we-have-good-taste.",
          tags: ["fresh", "matcha"],
          gradient: "linear-gradient(135deg, #c9ffd9, #5ab8ff 50%, #ff9ccc)"
        },
        {
          id: "hotpot-icecream",
          title: "Hotpot + ice cream",
          eyebrow: "cozy",
          emoji: "🍲",
          meta: "warm then cold",
          description: "Comfort food chaos, then dessert walk.",
          tags: ["cozy", "comfort"],
          gradient: "linear-gradient(135deg, #ffbe7a, #ff86ba 48%, #5ab8ff)"
        }
      ]
    },
    {
      id: "color",
      label: "04 · outfit",
      title: "What color are you wearing?",
      missing: "Choose a color first.",
      options: [
        {
          id: "pink",
          title: "Pink",
          eyebrow: "soft",
          emoji: "💗",
          meta: "cute mode",
          description: "Sweet, soft, and easy to match.",
          tags: ["soft", "cute"],
          gradient: "linear-gradient(135deg, #ffd4eb, #ff86ba 52%, #ffe074)"
        },
        {
          id: "blue",
          title: "Blue",
          eyebrow: "dreamy",
          emoji: "💙",
          meta: "cool mode",
          description: "Calm, clean, and dreamy.",
          tags: ["clean", "dreamy"],
          gradient: "linear-gradient(135deg, #d9f2ff, #5ab8ff 52%, #7465f2)"
        },
        {
          id: "black",
          title: "Black",
          eyebrow: "classic",
          emoji: "🖤",
          meta: "cinema mode",
          description: "Classic, sleek, and simple.",
          tags: ["classic", "sleek"],
          gradient: "linear-gradient(135deg, #f2e9ff, #5d4a66 44%, #151018)"
        },
        {
          id: "cream",
          title: "White / cream",
          eyebrow: "clean",
          emoji: "🤍",
          meta: "soft mode",
          description: "Pretty, light, and calm.",
          tags: ["clean", "soft"],
          gradient: "linear-gradient(135deg, #ffffff, #ffe8c7 52%, #ffc6dd)"
        },
        {
          id: "yellow",
          title: "Yellow",
          eyebrow: "sunny",
          emoji: "💛",
          meta: "toy-box mode",
          description: "Bright, playful, and warm.",
          tags: ["sunny", "toy"],
          gradient: "linear-gradient(135deg, #fff06d, #ffc06f 52%, #5ab8ff)"
        },
        {
          id: "surprise",
          title: "Surprise me",
          eyebrow: "mystery",
          emoji: "🎁",
          meta: "classified",
          description: "Unknown color. Neutral outfit deployed.",
          tags: ["mystery", "simple"],
          gradient: "linear-gradient(135deg, #ff86ba, #7465f2 50%, #80d66b)"
        }
      ]
    }
  ]
};
