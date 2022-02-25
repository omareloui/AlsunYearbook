import { User, UserAuthority } from "~~/@types";

export const useMockData = () => {
  const users = [
    // Omar Hussein
    {
      name: {
        first: "omar",
        second: "hussein",
        third: "muhamed",
        nickname: "ussin",
      },
      img: "omar-hussein",
      gender: "m",
      quote:
        "“Truth is, most of that was just luck. I didn't know what I was doing half the time and I always had help.” — Harry Potter",
      socialMedia: {
        fb: "omareloui",
        twitter: "_ussin",
        ig: "omarh.eloui",
      },
      whereNow:
        "He's a freelancer full-stack web developer. He's also the founder of Odin Leather Store.",
      fBDisplayName: "Omar H. Eloui",
    },

    // Hussam Essam
    {
      name: {
        first: "hussam",
        second: "essameldin",
        third: "sayed",
        nickname: "huss",
      },
      img: "hossam-essam",
      gender: "m",
      quote:
        "Antes no tuve amigos y actualmente tengo la mejor gente del mundo en mi vida, gracias por todo. Nunca te conformes con lo que es  menos que tú, y sueña por el más grande.",
      socialMedia: {
        fb: "hossam.essaam",
        twitter: "hossamesameldin",
        ig: "hossamesam_",
      },
      whereNow: "",
    },

    // Mary Ehab Maurice,
    {
      name: {
        first: "mary",
        second: "ehab",
        third: "maurice",
        nickname: "",
      },
      img: "mary-ehab",
      gender: "f",
      quote: "This too shall pass.",
      socialMedia: {
        fb: "mary.ehab.984",
        twitter: "",
        ig: "",
      },
      whereNow: "",
    },

    // Asil Khaled
    {
      name: {
        first: "asil",
        second: "khaled",
        third: "mohamed",
        nickname: "",
      },
      img: "asil-khaled",
      gender: "f",
      quote:
        "“We’ve all got both light and dark inside us. What matters is the part we choose to act on. That’s who we really are.” — Sirius Black",
      socialMedia: {
        fb: "asil.khald",
        twitter: "",
        ig: "asilkhaled",
      },
      whereNow: "",
    },

    // Youssry
    {
      name: {
        first: "yossry",
        second: "emad",
        third: "el dafrawy",
        nickname: "yuss",
      },
      img: "yossry-emad",
      gender: "m",
      quote: "A gate picked me,",
      socialMedia: {
        fb: "yossryemad",
        twitter: "",
        ig: "yossrii_",
      },
      whereNow: "",
    },

    // Nada Muhamed
    {
      name: {
        first: "nada",
        second: "muhamed",
        third: "hussien",
        nickname: "",
      },
      img: "nada-muhammed",
      gender: "f",
      quote:
        "No matter how much suffering we went through, I never wanted to let go of those memories. Mahdesh yez3al meny w lw rabena edany 3omr nefsy nefdal sohab kolena.",
      socialMedia: {
        fb: "nada.muhammed.98",
        twitter: "nadamhmd98",
        ig: "nadda_muhamed",
      },
      whereNow: "",
    },

    // Eugenie Refaat
    {
      name: {
        first: "eugenie",
        second: "refaat",
        third: "labib",
        nickname: "eugy",
      },
      img: "eugenie-refaat",
      gender: "f",
      quote:
        "The future belong to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
      socialMedia: {
        fb: "oginy.refaat",
        twitter: "",
        ig: "eugenie_refaat",
      },
      whereNow: "",
    },
  ];

  return users.map(data => ({
    username: data.socialMedia.fb,
    password: "",
    name: {
      first: data.name.first,
      second: data.name.second,
      third: data.name.third,
      nickname: data.name.nickname ? data.name.nickname : null,
    },
    role: "STUDENT",
    gender: data.gender === "m" ? "MALE" : "FEMALE",
    socialMedia: {
      fb: data.socialMedia.fb,
      twt: data.socialMedia.twitter ? data.socialMedia.twitter : null,
      ig: data.socialMedia.ig ? data.socialMedia.ig : null,
    },
    img: data.img ? data.img : null,
    currentJob: data.whereNow ? data.whereNow : null,
    quote: data.quote,
    authorityRole: data.socialMedia.fb === "omareloui" ? "ADMIN" : "USER",
    isShown: true,
  })) as User[];
};
