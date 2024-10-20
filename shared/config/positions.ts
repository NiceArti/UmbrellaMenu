import { Tag } from "./tags"

interface PositionsType {
    tag?: Tag,
    title?: string,
    names?: string[],
    prices?: string[],
}

export const coffee: PositionsType = {
    tag: "coffee",
    title: "Кофе",
    names: [
        "Капучино",
        "Латте",
        "Американо",
        "Эспрессо",
        "Какао",
        "Капучино с маршмеллоу",
        "Раф-кофе",
    ],
    prices: [
        "170",
        "180",
        "140",
        "120",
        "250",
        "250",
        "220",
    ]
}

export const ratte: PositionsType = {
    title: "Ratte",
    names: [
        "Вафля попкорн",
        "Малина кокос",
        "Банановое мороженое с солёной карамелью ",
        "Сырный",
    ],
    prices: [
        "270",
    ]
}

export const matchaLatte: PositionsType = {
    title: "Matcha Latte",
    names: [
        "Классический",
        "Зелёный бергамот",
    ],
    prices: [
        "250",
    ]
}

export const glintwein: PositionsType = {
    title: "Глинтвейн",
    prices: [
        "350",
    ]
}

export const herbalTea: PositionsType = {
    title: "Чай травяной",
    prices: [
        "400",
    ]
}

export const buckwheatTea: PositionsType = {
    title: "Чай гречишный",
    prices: [
        "400",
    ]
}

// export const mangoshake: PositionsType = {
//     title: "Манго шейк",
//     prices: [
//         "450",
//     ]
// }


export const additivesForTeaAndCoffee: PositionsType = {
    title: "Добавки к чаю и кофе",
    names: [
        "Сироп",
        "Сливки",
        "Мёд",
        "Мята",
        "Лимон",
    ],
    prices: [
        "30",
        "30",
        "100",
        "30",
        "70",
    ]
}


export const lemonades: PositionsType = {
    tag: "lemonade",
    title: "Лимонады",
    names: [
        "Манго - маракуйя",
        "Малина - базилик",
        "Груша - бергамот",
    ],
    prices: [
        "350"
    ]
}


export const chineseTeas: PositionsType = {
    title: "Китайский чай",
    names: [
        "Улун дыня",
        "Улун апельсиновый",
        "Улун молочный",
        "Жасминовый",
        "Габа",
        "Да Хун Пао",
        "Шу пуэр",
        "Шен пуэр",
        "Те Гуанинь",
    ],
    prices: [
        "550",
        "500",
        "500",
        "500",
        "700",
        "550",
        "650",
        "600",
        "600",
    ]
}


export const hotTeas: PositionsType = {
    tag: "tea",
    title: "Согревающие чаи",
    names: [
        "Облепиха с имбирём",
        "Груша с жасмином",
        "Брусника клюква",
        "Марокканский чай",
        "Ягодный чай",
    ],
    prices: [
        "550",
        "550",
        "550",
        "500",
        "500",
    ]
}

export const blackTeas: PositionsType = {
    title: "Чай чёрный",
    names: [
        "Английский завтрак",
        "Чабрец",
        "Эрл Грей",
        "Яблоко – Корица",
        "Липовый мёд",
        "Манго - маракуйя",
        "Экзотические фрукты",
        "Айва с персиком",
        "Красные ягоды",
    ],
    prices: [
        "400",
    ]
}

export const greenTeas: PositionsType = {
    title: "Чай зелёный",
    names: [
        "Папайя ананас",
        "Сладкая груша",
        "Свежая ромашка",
        "С имбирём и малиной",
        "Японская липа",
        "Романтика",
        "Сенча",
        "Сокровище Японии",
    ],
    prices: [
        "400",
    ]
}

export const teaDrinks: PositionsType = {
    title: "Чайные напитки",
    names: [
        "Вот фрукт!",
        "Тонус",
        "Айболит",
        "Освежающий",
    ],
    prices: [
        "350",
    ]
}

export const coldDrinks: PositionsType = {
    tag: "cooled-drinks",
    title: "Холодные напитки",
    names: [
        "Вода Байкал газ, б/г",
        "«Добрый» Кола",
        "«Добрый» манго-маракуйя",
        "«Добрый» апельсин",
        "Red Bull",
        "Сок Rich вишня, яблоко",
    ],
    prices: [
        "170",
        "170",
        "170",
        "170",
        "250",
        "380",
    ]
}



export const milkshakes: PositionsType = {
    tag: "milkshake",
    title: "Милкшейки",
    names: [
        "Oreo",
        "Банановый",
        "Груша-дыня",
        "Фисташковый",
    ],
    prices: [
        "350",
    ]
}


export const snacks: PositionsType = {
    tag: "snack",
    title: "Снеки",
    names: [
        "Оreo",
        "Choco-pie",
        "Lays STAX",
    ],
    prices: [
        "100",
        "100",
        "350",
    ]
}

export const beer: PositionsType = {
    tag: "beer",
    title: "Пиво",
    names: [
        "Белый кролик",
        "Два Бобра",
        "Червонный валет",
    ],
    prices: [
        "250",
    ]
}