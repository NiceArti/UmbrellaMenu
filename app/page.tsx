import Image from 'next/image';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Hookah from './Hookah/Hookah';
import styles from './Layout.module.scss';
import MenuPosition from './MenuPosition/MenuPosition';
import MenuPositionsByHeader from './MenuPosition/MenuPositionsByHeader';
import MenuPositionsWithOnePrice from './MenuPosition/MenuPositionsWithOnePrice';
import stoneImg from './img/stone-bg.png';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className={`${styles['layout']}`}>
        <Header />
        <Hookah />
        <MenuPosition tag='coffeTag' header='Кофе' positions={[
            "Капучино",
            "Латте",
            "Американо",
            "Эспрессо",
            "Какао",
            "Капучино с маршмеллоу",
            "Раф-кофе",
          ]}

          pricing={[
            170,
            180,
            140,
            120,
            250,
            250,
            220,
          ]}
        />

        <MenuPositionsWithOnePrice tag='' header='Ratte' positions={[
            "Вафля попкорн",
            "Малина кокос",
            "Банановое мороженое с солёной карамелью ",
            "Сырный",
          ]}

          pricing={270}
        />
        <MenuPositionsWithOnePrice tag='' header='Matcha Latte' positions={[
            "Классический",
            "Зелёный бергамот",
          ]}

          pricing={250}
        />


        <MenuPositionsByHeader 
          header='Глинтвейн'
          pricing={350}
        />

        <MenuPosition tag='' header='Добавки к чаю и кофе' positions={[
            "Сироп",
            "Сливки",
            "Мёд",
            "Мята",
            "Лимон",
          ]}

          pricing={[
            30,
            30,
            100,
            30,
            70,
          ]}
        />

        <MenuPositionsWithOnePrice tag='lemonadeTag' header='Лимонады' positions={[
            "Малина - базилик",
            "Манго - маракуйя",
          ]}

          pricing={350}
        />


        <MenuPosition tag='teaTag' header='Китайский чай' positions={[
            "Те Гуанинь",
            "ГАБА",
            "Да Хун Пао",
            "Шу Пуэр",
            "Шен Пуэр",
            "Улун Дыня",
            "Хуа ЧжуЧа (жасмин)",
            "Бай Му Дань (Белый пион)",
            "Молочный улун",
          ]}

          pricing={[
            550,
            700,
            450,
            500,
            450,
            400,
            400,
            450,
            500,
          ]}
        />

        <MenuPosition tag='' header='Согревающие чайные напитки' positions={[
            "Марокканский чай",
            "Грушевый чай с жасмином",
            "Ягодный чай",
            "Облепиховый чай с имбирем",
            "Брусника-клюква",
          ]}

          pricing={[
            400,
            550,
            450,
            500,
            550,
          ]}
        />


        <MenuPositionsWithOnePrice tag='' header='Чай чёрный' positions={[
            "Английский завтрак",
            "Эрл Грей",
            "Липовый мёд",
            "Манго – Маракуйя",
            "Яблоко – Корица",
            "Ноктюрн",
            "Чабрец",
            "Земляничный десерт",
          ]}

          pricing={350}
        />


        <MenuPositionsWithOnePrice tag='' header='Чай зелёный' positions={[
            "Японская липа",
            "Лимонный крем с женьшенем",
            "Свежая ромашка",
            "Сенча",
            "Сокровище Японии",
            "Романтика",
            "Сладкая груша",
          ]}

          pricing={350}
        />

        <MenuPositionsWithOnePrice tag='' header='Чайные напитки' positions={[
            "Вот фрукт!",
            "Тонус",
            "Айболит",
            "Освежающий",
          ]}

          pricing={350}
        />
        <MenuPositionsWithOnePrice tag='milkshakeTag' header='Милкшейки' positions={[
            "Oreo",
            "Банановый",
            "Груша-дыня",
            "Фисташковый",
          ]}

          pricing={350}
        />


        <MenuPosition tag='snacksTag' header='Снеки' positions={[
            "Оreo",
            "Choco-pie",
            "Lays STAX",
          ]}

          pricing={[
            100,
            100,
            300,
          ]}
        />

        <MenuPositionsWithOnePrice tag='beerTag' header='Пиво' positions={[
            "Белый кролик",
            "Два Бобра",
            "Червонный валет",
          ]}

          pricing={250}
        />

        <Footer />

        <Image className={styles["bg-img-1"]} src={stoneImg} alt="stone"/>
        <Image className={styles["bg-img-2"]} src={stoneImg} alt="stone"/>
      </div>
    </main>
  )
}
