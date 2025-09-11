import { Tag } from "./tags"

interface PositionsType {
    tag?: Tag,
    title?: string,
    names?: string[],
    prices?: string[],
    tableView?: boolean,
}

export const coffee: PositionsType = {
    tag: "coffee",
    title: "Кофе",
    tableView: true,
    names: [
        "Эспрессо",
        "Американо",
        "Капучино",
        "Флэт Уайт",
        "Капучино с маршмеллоу",
        "Раф",
        "Какао",
        // "Rate",
        // "Матча латте",
        "Латте",
    ],
    prices: [
        "170",
        "200",
        "250",
        "300",
        "320",
        "300",
        "300",
        // "350",
        // "350",
        "270",
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
        "350",
    ]
}

export const matchaLatte: PositionsType = {
    title: "Matcha Latte",
    names: [
        "Классический",
        "Зелёный бергамот",
    ],
    prices: [
        "350",
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
        "Ананас лемонграсс", 
        "Апельсин ваниль",
        "Вишня шисо",
        "Жасмин бузина",
        "Кактус РЕНЕТ",
        "Миндаль шафран", 
        "Персик молочный улун",
        "Фуджи сакура",
        "Манго маракуйя кокос",
    ],
    prices: [
        "0,35 л",
        "400",
        "",
        "",
        "",
        "1,2 л",
        "1050"
    ]
}


export const chineseTeas: PositionsType = {
    tag: "tea",
    tableView: true,
    title: "Китайский чай",
    names: [
        "Габа Алишань улун зеленый",
        "Габа Лишань \"Амариллис\"",
        "Габа Алишань улун красный", 
        "Те гуань инь Нунсян из Сянхуа",
        "Те гуань инь Нунсян из Ганьдэ",
        "Ми тао жоугуй коричный улун Медовый персик",
        "Да хун пао чжун хо",
        "Цзинь цзюнь мэй \"Золотые брови\"",
        "Янь сюнь сяочжун \"Лапсанг Сушонг сильного копчения\"",
        "Шу пуэр 2014г. \"Веха\" марки \"Пагода\" завода \"Лимин\"",
        "Шу пуэр 2019г. \"Золотые почки  Баньчжан\" завода \"Чашуван\"",
        "Шен пуэр \"Кун Цюэ Цзинь Я\" завода \"Чашуван\"", 
        "Улун жасминовый",
        "Улун дыня",
        "Улун молочный",
        "Улун апельсиновый",
    ],
    prices: [
        "850",
        "950",
        "850",
        "800",
        "1050",
        "950",
        "850",
        "850",
        "800",
        "1150",
        "800",
        "850",
        "600",
        "600",
        "600",
        "600",
    ]
}


// Согревающие чаи
// Грушевый чай с жасмином 650
// Облепиховый чай с имбирем 650
// Ягодный чай 600
// Марокканский чай 600

export const hotTeas: PositionsType = {
    tag: "tea",
    title: "Согревающие чаи",
    names: [
        "Грушевый чай с жасмином",
        "Облепиховый чай с имбирем",
        "Ягодный чай",
        "Марокканский чай",
        // "Брусника клюква",
    ],
    prices: [
        "650",
        "650",
        "600",
        "600",
        // "550",
    ]
}

export const blackTeas: PositionsType = {
    title: "Чай чёрный",
    names: [
        "Английский завтрак",
        "Чабрец",
        "Эрл Грей",
        // "Яблоко – Корица",
        "Липовый мёд",
        "Манго - маракуйя",
        "Экзотические фрукты",
        "Айва с персиком",
        // "Красные ягоды",
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
        // "С имбирём и малиной",
        // "Японская липа",
        // "Романтика",
        "Сенча",
        // "Сокровище Японии",
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
        "\"Добрый\" Кола",
        "\"Добрый\" манго-маракуйя",
        "\"Добрый\" апельсин",
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
        "250",
        "300",
    ]
}