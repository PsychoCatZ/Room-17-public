"use strict";

const byId = (id) => document.getElementById(id);
const clues = {
  letter: "Письмо без обратного адреса. Внутри одна фраза: «Ваш номер уже готов».",
  today: "Сегодняшняя запись в журнале: номер 17, твоё имя и подпись, похожая на твою.",
  alibi: "Метрдотель В. Корнев утверждает, что пришёл работать сюда уже после закрытия отеля.",
  key: "На латунной бирке ключа — 17. Изнанка исцарапана.",
  old: "В архивном журнале семилетней давности — то же имя, та же подпись, тот же номер.",
  checkout: "Графа выезда в архиве пуста. Номер 17 так и не закрыли.",
  attendant: "Под записью семилетней давности в графе «Дежурный» стоит подпись «В. Корнев». Запись сделана в последнюю ночь перед закрытием отеля.",
  testimony: "Корнев признался, что сам оформил твоё заселение семь лет назад. По его словам, тогда ты приехал без письма. Вчера из номера 17 по телефону прозвучало: «Ваш номер уже готов».",
  mirror: "За зеркалом в номере — дверь с внутренней ручкой. За дверью видна стойка регистрации.",
  handwriting: "В свежей записи «Ключ возвращён» буква «К» выведена с маленькой петлёй внизу. Такая же петля есть в подписи «В. Корнев» в архивном журнале.",
  mirrorTestimony: "Когда ты спросил о зеркале, Корнев проговорился, что раньше его было слышно со стойки. Зеркало ты сдвинул молча.",
  previousNight: "По словам Корнева, в прошлый раз он услышал скрежет зеркала, а затем из номера 17 позвонили и попросили вычеркнуть запись. Пока он искал ручку, за его спиной на стойку упал ключ.",
  predecessor: "Корнев говорит, что его предшественница, Зоя Левина, числилась в журнале постоялицей номера 17. Утром её имя осталось только в графе «Дежурный».",
  zoeRecord: "В архивной записи номера 17 имя Зои Левиной вычеркнуто. В графе «Дежурный» стоит «З. Левина». Под чертой в графе постояльца видна подпись с тем же росчерком.",
  zoeTestimony: "Корнев утверждает, что сам вычеркнул имя Зои по её просьбе. По его словам, в тот момент Зоя уже стояла за стойкой, а он держал ручку по другую сторону зеркала.",
  kornevRecord: "Виктор Корнев записан как постоялец номера 17. Его имя вычеркнуто, в графе «Дежурный» стоит подпись Зои Левиной. В слове «Остался» в графе «Выезд» буква «л» выведена с таким же изломом, как в свежей записи о ключе.",
  kornevTestimony: "Корнев говорит, что его имя вычеркнула Зоя. Слово «Остался» он вписал сам после того, как выход на улицу вывел его обратно к стойке.",
  entranceLoop: "Ты шагнул за входную дверь, почувствовал холод и услышал, как она захлопнулась за спиной. Следующий шаг привёл тебя обратно к стойке. На ковре остался мокрый след твоего ботинка.",
  selfErasureTestimony: "Корнев видел, как один гость сам вычеркнул своё имя и дошёл до входной двери. Что случилось за порогом, Корнев не видел. Утром в журнале стояла отметка о выезде.",
  earlyCheckout: "В записи зачеркнувшего своё имя гостя указано: «Заселение — 02:17», «Выехал — 02:13». Обе отметки стоят под одной датой.",
  earlyCheckoutTestimony: "Корнев говорит, что заметил отметку «Выехал» до того, как гость дошёл до двери. Тогда он решил, что перепутал графы. Утром сверил время, но запись осталась прежней.",
  checkoutAuthorTestimony: "Корнев говорит, что не видел, кто написал «Выехал». Он помнит вдавленные буквы на чистом листе под записью.",
  checkoutImprint: "На чистом листе сразу за записью о выезде в 02:13 продавлены слова «Ключ возвращён». У буквы «К» такая же петля, как в свежей записи за зеркалом.",
  keyEntryConfession: "Корнев признался, что заранее написал «Ключ возвращён», чтобы подтолкнуть тебя вернуть ключ. По его словам, он писал, пока ты стоял у входа. Он не знает, откуда взялся оттиск в архиве.",
  backingSheetTestimony: "Корнев говорит, что подложил под страницу чистый лист с загнутым углом. Перо соскочило в конце строки. После этого он задвинул лист под журнал.",
  deskSheet: "Под журналом у стойки лежал лист с загнутым углом. На нём продавлено «Ключ возвращён», а в конце строки тянется тонкая бороздка. Других строк на листе нет.",
  secondImprint: "Загнутый угол и бороздка в конце «Ключ возвращён» совпадают на обоих листах. На архивном листе под первой строкой проступило «Дежурный принял ключ». На листе со стойки в этом месте чисто.",
  deskSecondImprint: "На листе у стойки проступило «Дежурный принял ключ». Ты всё это время держал ключ в руке. Корнев не касался ни листа, ни ручки.",
  acceptedKeyTestimony: "Корнев говорит, что сейчас дежурит он, но строка не называет ни дежурного, ни номер ключа. Твой ключ он не принимал и другого ключа не видел.",
  duplicateKey: "Корнев снял с крючка ячейки № 17 второй ключ. На обеих бирках одна и та же раздвоенная царапина у края.",
  keyReturnTime: "Когда Корнев повесил второй ключ обратно, рядом со строкой «Дежурный принял ключ» проступило 02:17. Часы над стойкой показывали 02:16. Твой ключ остался у тебя."
};

const faces = {
  neutral: "Невозмутим",
  smile: "Учтиво улыбается",
  guarded: "Щурится",
  startled: "На миг теряет самообладание",
  tense: "Сжимает челюсть",
  resigned: "Опускает взгляд"
};

const comparisons = [
  ["earlyCheckout", "earlyCheckoutTestimony", "Когда в журнале уже стояло «Выехал», гость, по словам Корнева, ещё был в отеле."],
  ["entranceLoop", "kornevTestimony", "Ты и Корнев оба шагнули за входную дверь и вернулись к стойке. Сам шаг за порог ещё не означает, что ты вышел из отеля."],
  ["zoeRecord", "kornevRecord", "В журнале и Зоя, и Корнев числятся и постояльцами номера 17, и дежурными. Зачёркнутое имя в графе постояльца само по себе не доказывает выезд."],
  ["handwriting", "checkoutImprint", "Свежая запись за зеркалом и оттиск в архиве повторяют одну фразу и один росчерк. Такой же росчерк есть в подписи Корнева."]
];

const comparisonNotes = comparisons.map(([, , conclusion]) => "Сопоставление улик. " + conclusion);
const checkoutComparisonIndex = comparisons.findIndex(([first]) => first === "earlyCheckout");
const imprintComparisonIndex = comparisons.findIndex(([, second]) => second === "checkoutImprint");

const opening = ["neutral", "Доброй ночи. Семнадцатый. Я оставил свет у стойки. Подпишите… Ах, да. Уже подписано."];
let state;

function start() {
  state = { place: "desk", clues: new Set(["letter"]), askedQuestions: new Set(), reply: opening, ending: null };
  render();
}

function speak(face, line) {
  state.reply = [face, line];
}

function find(clue) {
  state.clues.add(clue);
}

function move(place) {
  state.place = place;
}

function action(label, run, primary = false) {
  return { label, run, primary };
}

function inspect(label, clue) {
  return action(label, () => find(clue));
}

function question(label, face, line) {
  return action(label, () => speak(face, line));
}

function reception() {
  const found = state.clues;
  const returned = found.has("attendant");
  const confronted = found.has("testimony");
  const actions = [];
  if (found.has("acceptedKeyTestimony") && !found.has("duplicateKey")) {
    actions.push(action("Попросить Корнева показать ячейку № 17", () => {
      find("duplicateKey");
      speak("startled", "Семнадцатая должна быть пустой. У вас ведь ключ.");
    }, true));
  }
  if (found.has("duplicateKey") && !found.has("keyReturnTime")) {
    actions.push(inspect("Попросить повесить второй ключ обратно", "keyReturnTime"));
  }
  if (found.has("secondImprint") && !found.has("deskSecondImprint")) {
    actions.push(action("Проверить лист, не отдавая ключ", () => {
      find("deskSecondImprint");
      speak("startled", "Я ключ не брал. Вы же видите.");
    }, true));
  }
  if (found.has("backingSheetTestimony") && !found.has("deskSheet")) {
    actions.push(inspect("Осмотреть лист под журналом", "deskSheet"));
  }
  if (!found.has("today")) actions.push(inspect("Осмотреть журнал на стойке", "today"));
  if (!found.has("key")) actions.push(inspect("Взять ключ", "key"));
  if (found.has("predecessor") || (found.has("today") && found.has("alibi") && (!returned || !found.has("checkout")))) {
    actions.push(action("Спуститься в архив", () => move("archive"), true));
  }
  if (confronted && found.has("key")) {
    actions.push(action("Подняться в номер 17", () => move("room"), true));
  }
  if (found.has("kornevTestimony") && !found.has("entranceLoop")) {
    actions.push(action("Проверить входную дверь", () => {
      find("entranceLoop");
      speak("guarded", "У вас с первого раза. Я тогда трижды вышел.");
    }));
  }

  const questions = [
    question("Ты меня ждал?", "smile", "Разумеется. Ваш номер уже готов. Простите… Именно так было сказано?"),
    question("Откуда ты знаешь про письмо?", "guarded", "Письмо? У нас есть обычная формулировка. Мы пользовались ею много лет.")
  ];
  if (!confronted) {
    questions.push(action("Ты работал здесь до закрытия?", () => {
      find("alibi");
      speak("smile", "Корнев, Виктор Корнев. Я пришёл сюда уже после закрытия отеля. О прежних постояльцах знаю только то, что оставили в журналах.");
    }));
  }
  if (found.has("today")) {
    questions.push(question("Кто поставил мою подпись?", "tense", "Бумага старая. Чернила расплываются. Я бы не стал доверять сходству. Если хотите сверить почерк, архив внизу."));
  }
  if (returned && !confronted) {
    questions.push(action("Предъявить подпись дежурного", () => {
      find("testimony");
      speak("startled", "Заселение оформлял я. Вы тогда явились без письма. А вчера позвонили из семнадцатого и сказали: «Ваш номер уже готов». Я узнал голос.");
    }, true));
  }
  if (confronted) {
    questions.push(question("Чей голос ты узнал?", "resigned", "Я слышал его в ту ночь, семь лет назад. Если я назову имя, вы снова попросите показать журнал."));
  }
  if (found.has("handwriting") && !found.has("mirrorTestimony")) {
    questions.push(action("Откуда ты знал, что я полезу за зеркало?", () => {
      find("mirrorTestimony");
      speak("startled", "Вы его опять сдвинули? Я даже не слышал. В прошлый раз было слышно отсюда. Простите… Откуда вы знаете про запись?");
    }, true));
  }
  if (found.has("mirrorTestimony") && !found.has("previousNight")) {
    questions.push(action("Что случилось в прошлый раз, когда я отодвинул зеркало?", () => {
      find("previousNight");
      speak("resigned", "Я услышал скрежет. Потом зазвонил телефон. Из семнадцатого попросили вычеркнуть запись. Я полез за ручкой, а у меня за спиной на стойку упал ключ. Когда я обернулся, у стойки никого не было.");
    }, true));
  }
  if (found.has("previousNight") && !found.has("predecessor")) {
    questions.push(action("Кто дежурил до тебя?", () => {
      find("predecessor");
      speak("tense", "Зоя Левина. Я помню, как выдал ей ключ от семнадцатого. А потом помню, как она выдала его мне. В журнале её имя осталось только в графе «Дежурный». Я перестал спрашивать, какая из этих ночей была первой.");
    }, true));
  }
  if (found.has("zoeRecord") && !found.has("zoeTestimony")) {
    questions.push(action("Показать запись Зои и спросить, кто вычеркнул её имя", () => {
      find("zoeTestimony");
      speak("resigned", "Я. Она попросила вычеркнуть её имя. Я думал, она хочет уйти. Только когда поднял голову, увидел, что Зоя уже за стойкой. А я держал ручку по другую сторону зеркала.");
    }, true));
  }
  if (found.has("kornevRecord") && !found.has("kornevTestimony")) {
    questions.push(action("Показать запись Корнева и спросить про «Остался» и зачёркнутое имя", () => {
      find("kornevTestimony");
      speak("resigned", "Имя вычеркнула Зоя. Я сам её попросил. Потом открыл дверь на улицу, шагнул за порог и снова оказался у стойки. «Остался» написал я. В графе «Выезд» больше нечего было писать.");
    }, true));
  }
  if (found.has("entranceLoop") && !found.has("selfErasureTestimony")) {
    questions.push(action("Кому-нибудь удалось уйти, вычеркнув своё имя?", () => {
      find("selfErasureTestimony");
      speak("resigned", "Один гость сам себя вычеркнул. Я видел, как он дошёл до двери. Что было за порогом, не видел. К утру в журнале стояло «Выехал». Я тогда ещё верил журналу.");
    }, true));
  }
  if (found.has("earlyCheckout") && !found.has("earlyCheckoutTestimony")) {
    questions.push(action("Когда ты увидел отметку «Выехал» — до того, как он дошёл до двери, или после?", () => {
      find("earlyCheckoutTestimony");
      speak("startled", "До. Он ещё шёл по холлу. Я посмотрел на часы и решил, что перепутал графы. Утром проверил снова. Четыре минуты. Так и стояло.");
    }, true));
  }
  if (found.has(checkoutComparisonIndex) && !found.has("checkoutAuthorTestimony")) {
    questions.push(action("Ты видел, кто написал «Выехал»?", () => {
      find("checkoutAuthorTestimony");
      speak("tense", "Нет. Я только прочёл. Но на следующем листе остались вдавленные буквы. Он выглядел чистым, пока я не поднёс его к лампе.");
    }, true));
  }
  if (found.has(imprintComparisonIndex) && !found.has("keyEntryConfession")) {
    questions.push(action("Предъявить обе записи: «Ты написал „Ключ возвращён“?»", () => {
      find("keyEntryConfession");
      speak("resigned", "Свежую — я. Когда вы ещё стояли у входа. Я хотел посмотреть, вернёте ли вы ключ, если прочтёте, что уже вернули. А про лист в архиве… Мне нечего вам сказать.");
    }, true));
  }
  if (found.has("keyEntryConfession") && !found.has("backingSheetTestimony")) {
    questions.push(action("Что лежало под страницей, когда ты писал?", () => {
      find("backingSheetTestimony");
      speak("guarded", "Чистый лист. Угол был загнут. Помню, перо соскочило в конце строки. Я задвинул лист под журнал. Должен быть там.");
    }, true));
  }

  if (found.has("deskSecondImprint") && !found.has("acceptedKeyTestimony")) {
    questions.push(action("Кого журнал считает дежурным? Какой ключ он принял?", () => {
      find("acceptedKeyTestimony");
      speak("tense", "За стойкой сейчас я. В строке фамилии нет. И номера на ключе там тоже нет. Ваш ключ я не принимал. Другого не видел.");
    }, true));
  }

  let description = "В письме без обратного адреса всего одна строка. Дверь отеля подалась без ключа. Из глубины холла доносится тиканье часов.";
  if (returned) description = "На стойке лежит сегодняшний журнал. Ты раскрываешь старый на той же дате, семь лет назад. Метрдотель смотрит на строку под записью.";
  if (confronted) description = "В пустом отеле кто-то звонил из номера 17. Метрдотель переводит взгляд на лестницу.";
  if (found.has("handwriting")) description = "Ты спускаешься по лестнице. Корнев стоит за стойкой. Журнал перед ним закрыт.";
  if (found.has("entranceLoop")) description = "За порогом тебя обдаёт холодом. Дверь захлопывается за спиной. Ты делаешь ещё шаг и снова стоишь перед Корневым. На ковре темнеет мокрый след твоего ботинка.";
  if (found.has("checkoutImprint") && !found.has(imprintComparisonIndex)) {
    description = "На архивном листе продавлено «Ключ возвращён». Свежая запись с той же фразой видна за зеркалом в номере 17.";
  }
  if (found.has("deskSheet")) description = "Под журналом ты находишь лист с загнутым углом. Под светом лампы видны продавленные слова «Ключ возвращён» и тонкая бороздка в конце строки. Ты берёшь лист, чтобы сверить его с архивным.";
  if (found.has("secondImprint")) description = "Ты возвращаешься к стойке. На листе из-под журнала по-прежнему только одна строка.";
  if (found.has("deskSecondImprint")) description = "Ты кладёшь лист под лампу и сжимаешь ключ в руке. Корнев держит руки на краю стойки. Бумага тихо хрустит. Под первой строкой проступают свежие бороздки: «Дежурный принял ключ». Ты разжимаешь пальцы. Ключ всё ещё у тебя.";
  if (found.has("duplicateKey")) description = "Корнев снимает ключ с крючка ячейки № 17 и кладёт на стойку. Ты прикладываешь к его бирке свою. Даже короткое ответвление царапины у края совпадает.";
  if (found.has("keyReturnTime")) description = "Корнев вешает второй ключ обратно. В бумаге рядом со словами «Дежурный принял ключ» проступает 02:17. Ты смотришь на часы над стойкой. На них 02:16. Свой ключ ты всё ещё держишь в руке.";
  return {
    label: "Первый этаж",
    title: "Стойка регистрации",
    description,
    actions,
    questions: questions.filter(({ label }) => !state.askedQuestions.has(label))
  };
}

function archive() {
  const found = state.clues;
  const actions = [];
  if (!found.has("old")) actions.push(inspect("Сверить подпись в старом журнале", "old"));
  if (found.has("old") && !found.has("attendant")) {
    actions.push(inspect("Прочитать подпись дежурного", "attendant"));
  }
  if (found.has("old") && !found.has("checkout")) {
    actions.push(inspect("Проверить графу выезда", "checkout"));
  }
  if (found.has("predecessor") && !found.has("zoeRecord")) {
    actions.push(inspect("Найти запись Зои Левиной", "zoeRecord"));
  }
  if (found.has("zoeTestimony") && !found.has("kornevRecord")) {
    actions.push(inspect("Найти запись Виктора Корнева", "kornevRecord"));
  }
  if (found.has("selfErasureTestimony") && !found.has("earlyCheckout")) {
    actions.push(inspect("Найти запись гостя, который вычеркнул своё имя", "earlyCheckout"));
  }
  if (found.has("checkoutAuthorTestimony") && !found.has("checkoutImprint")) {
    actions.push(inspect("Посмотреть следующий лист под лампой", "checkoutImprint"));
  }
  if (found.has("deskSheet") && found.has("checkoutImprint") && !found.has("secondImprint")) {
    actions.push(inspect("Сравнить оба листа под лампой", "secondImprint"));
  }
  actions.push(action("Вернуться к стойке", () => {
    move("desk");
    if (found.has("checkoutImprint") && !found.has(imprintComparisonIndex)) speak("guarded", "Лист нашли? Тогда посмотрите, как выведена буква «К» в номере.");
    else if (found.has("earlyCheckout") && !found.has("earlyCheckoutTestimony")) speak("guarded", "Нашли его? Посмотрите на время.");
    else if (found.has("kornevRecord")) speak("guarded", "Вы долго листали.");
    else if (found.has("zoeRecord")) speak("guarded", "Её страницу всё ещё можно прочесть?");
    else if (found.has("attendant")) speak("guarded", "Нашли то, что искали? Здесь редко кто просит старые журналы.");
  }, found.has("attendant")));
  let description = found.has("old")
    ? "На странице семилетней давности твоё имя. Подпись повторяет даже маленький излом последней буквы."
    : "Зелёная лампа освещает одну раскрытую книгу. Остальные стоят корешками к стене.";
  if (found.has("predecessor")) description = "Ты листаешь журнал назад. Номер 17 встречается чаще, чем ты ожидал.";
  if (found.has("zoeRecord")) description = "Ты подвигаешь лампу. Под чертой ещё читается «Зоя Левина». В соседней графе, где расписывается дежурный, тот же росчерк. Графа выезда пуста.";
  if (found.has("kornevRecord")) description = "На другой странице тоже вычеркнуто имя постояльца семнадцатого. Под чертой читается «Виктор Корнев». Дежурная — Зоя Левина. В графе выезда одно слово: «Остался». У буквы «л» тот же излом, что в свежей записи о ключе.";
  if (found.has("earlyCheckout")) description = "Имя постояльца перечёркнуто. На одной строке стоят две отметки: заселение в 02:17, «Выехал» в 02:13. Ты сверяешь дату в обеих графах. Дата одна и та же.";
  if (found.has("checkoutImprint")) description = "Ты наклоняешь чистый лист к зелёной лампе. В бороздках проступают слова «Ключ возвращён». У буквы «К» маленькая петля, как в записи, которую ты видел за зеркалом.";
  if (found.has("secondImprint")) description = "Ты кладёшь листы рядом под зелёной лампой. Сгиб угла и бороздка от пера совпадают. Ты чуть поворачиваешь архивный лист, и под первой строкой в косом свете проступает вторая: «Дежурный принял ключ». На листе со стойки в этом месте чисто.";
  return {
    label: "Подвал", title: "Архив",
    description,
    actions
  };
}

function room() {
  const found = state.clues.has("mirror");
  const compared = state.clues.has("handwriting");
  let description = found
    ? "За зеркалом — дверь. В щель видна стойка внизу, хотя с этой стороны должна быть наружная стена. На открытой странице одна свежая строка: «Ключ возвращён». Ключ всё ещё у тебя."
    : "Кровать аккуратно застелена. Телефон снят с рычага. В беззвучной трубке ты слышишь тиканье тех же часов, что в холле. За рамой зеркала тянется узкая светлая щель.";
  if (compared) {
    description = "Ты наклоняешься к журналу. У буквы «К» в слове «Ключ» маленькая петля внизу, как в подписи Корнева. На ум приходит его голос: «О прежних постояльцах знаю только то, что оставили в журналах».";
  }
  const canCrossOut = state.clues.has("previousNight");
  const heardConfession = state.clues.has("keyEntryConfession");
  if (canCrossOut) {
    description = "Журнал всё ещё раскрыт за зеркалом. Рядом лежит ручка. Ты видишь своё имя, подпись и приписку у края страницы: «Ключ возвращён».";
  }
  if (heardConfession) {
    description = "Журнал всё ещё открыт на твоём имени. «Ключ возвращён» написал Корнев. Ключ у тебя в руке, ручка лежит у края страницы.";
  }
  return {
    label: "Второй этаж",
    title: state.ending?.title ?? "Номер 17",
    description: state.ending?.description ?? description,
    actions: state.ending ? [] : found ? [
      ...(!compared ? [inspect("Сравнить почерк с архивной подписью", "handwriting")] : []),
      ...(compared ? [action("Спуститься к стойке", () => {
        speak("guarded", "Что-нибудь не так с номером?");
        move("desk");
      })] : []),
      ...(state.clues.has("earlyCheckout") ? [action("Сопоставить записи", openComparison)] : []),
      action("Положить ключ на стойку", () => {
        state.ending = {
          title: "Ключ возвращён",
          description: heardConfession
            ? "Ты кладёшь ключ на стойку. «Можете теперь поставить время», — говоришь ты. Корнев берёт ручку и раскрывает журнал. Рядом со словами «Ключ возвращён» уже стоит 02:13. Корнев смотрит на часы. Они всё ещё показывают 02:12."
            : "Ты просовываешь руку в проём. Ключ падает на стойку. По другую сторону звонит телефон. Метрдотель снимает трубку: «Ваш номер уже готов». На этот раз у тебя в кармане шуршит бумага."
        };
      }),
      action("Уйти с ключом", () => {
        state.ending = {
          title: "Ключ при тебе",
          description: heardConfession
            ? "Ты показываешь Корневу ключ и выходишь. На этот раз второй шаг оставляет тебя на улице. Ты оборачиваешься. За стеклом Корнев тянется к пустой ячейке семнадцатого. Оттуда доносится знакомый звон, хотя ключ по-прежнему у тебя."
            : "Ты сжимаешь ключ и спускаешься по лестнице. Корнева за стойкой нет. В раскрытом журнале всё ещё написано: «Ключ возвращён». Ты выходишь на улицу. За спиной звякает латунь, и только тогда ты замечаешь, что всё ещё держишь ключ в руке."
        };
      }),
      ...(canCrossOut ? [action("Вычеркнуть свою запись", () => {
        move("epilogue");
      })] : [])
    ] : [inspect("Отодвинуть зеркало", "mirror")]
  };
}

function epilogue() {
  const heardConfession = state.clues.has("keyEntryConfession");
  const arrival = heardConfession
    ? "Ты вычёркиваешь имя, и твоя подпись проступает в графе «Дежурный». Поднимаешь голову и видишь стойку изнутри. Корнев стоит у входа, с той стороны, где ты был в начале ночи. Он смотрит на ключ рядом с твоей рукой. «Мой номер готов?»"
    : "Твоё имя исчезает под чертой. В графе «Дежурный» проступает твоя подпись. Ты поднимаешь глаза. Теперь между тобой и входом стойка, а ключ от семнадцатого лежит рядом с журналом. Звенит колокольчик. Из холла спрашивают: «Мой номер готов?»";
  return {
    label: "За стойкой",
    title: "Графа «Дежурный»",
    description: state.ending?.description ?? arrival,
    actions: state.ending ? [] : [
      action("Ответить: «Ваш номер уже готов»", () => {
        state.ending = {
          description: heardConfession
            ? "Ты произносишь фразу и пододвигаешь ключ. Корнев берёт его и идёт к лестнице. Ты раскрываешь журнал. Напротив его имени уже стоит «Ключ возвращён». Ты узнаёшь собственный почерк, хотя ручка всё ещё лежит на стойке."
            : "Ты произносишь фразу и пододвигаешь ключ к краю стойки. Гость кладёт перед тобой письмо. В журнале напротив его имени уже стоит подпись. Ты узнаёшь маленький излом на последней букве."
        };
      }),
      action("Промолчать", () => {
        state.ending = {
          description: heardConfession
            ? "Ты молчишь и накрываешь ключ ладонью. Звонит телефон. Корнев смотрит на мигающую лампочку семнадцатого, но трубку не берёт. «Тогда я подожду», — говорит он. Ты опускаешь взгляд. Под его именем в журнале уже стоит «Остался»."
            : "Ты молчишь. На стойке звонит телефон. На аппарате загорается лампочка с номером 17. Гость сам снимает трубку, и ты слышишь из неё собственный голос: «Ваш номер уже готов». Гость берёт ключ."
        };
      })
    ]
  };
}

const scenes = { desk: reception, archive, room, epilogue };

function openComparison() {
  const evidence = [...state.clues].filter(id => Object.hasOwn(clues, id));
  for (let index = evidence.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [evidence[index], evidence[other]] = [evidence[other], evidence[index]];
  }
  const options = evidence.map(id => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = id;
    label.append(checkbox, clues[id]);
    return label;
  });
  const list = byId("comparison-evidence");
  list.replaceChildren(...options);
  byId("comparison-result").textContent = "";
  byId("comparison").showModal();
  list.scrollTop = 0;
  return false;
}

byId("comparison-form").addEventListener("submit", event => {
  if (event.submitter?.formMethod === "dialog") return;
  event.preventDefault();
  const selected = [...byId("comparison-evidence").querySelectorAll("input:checked")].map(input => input.value);
  const result = byId("comparison-result");
  if (selected.length !== 2) {
    result.textContent = "Выбери ровно две улики.";
    return;
  }
  const index = comparisons.findIndex(([first, second]) => selected.includes(first) && selected.includes(second));
  if (index < 0) {
    result.textContent = "Эта пара пока не даёт вывода. Попробуй выбрать две улики об одном госте или одном событии.";
    return;
  }
  find(index);
  renderNotebook();
  renderInvestigationHint();
  result.textContent = comparisons[index][2];
});

function drawActions(id, actions) {
  const container = byId(id);
  const restoreIndex = [...container.children].indexOf(document.activeElement);
  const buttons = actions.map(({ label, run, primary }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    if (primary) button.classList.add("primary");
    button.addEventListener("click", () => {
      const previousPlace = state.place;
      if (id === "questions") state.askedQuestions.add(label);
      if (run() === false) return;
      render();
      if (previousPlace !== state.place || state.ending || !container.children.length) {
        byId("heading").focus();
      }
    });
    return button;
  });
  container.replaceChildren(...buttons);
  if (restoreIndex >= 0 && buttons.length) {
    buttons[Math.min(restoreIndex, buttons.length - 1)].focus();
  }
}

function render() {
  const scene = scenes[state.place]();
  byId("scene").dataset.place = state.place;
  byId("location").textContent = scene.label;
  byId("heading").textContent = scene.title;
  byId("description").textContent = scene.description;
  renderInvestigationHint();
  byId("restart").hidden = !state.ending;
  drawActions("actions", scene.actions);
  byId("dialogue").hidden = !scene.questions;
  if (scene.questions) {
    const [face, line] = state.reply;
    byId("portrait").dataset.face = face;
    byId("portrait").setAttribute("aria-label", "Портрет метрдотеля");
    byId("expression").textContent = faces[face];
    byId("line").textContent = line;
  }
  drawActions("questions", scene.questions || []);
  byId("live-dialogue").hidden = state.place !== "desk" || !window.kornevLiveAvailable;
  renderNotebook();
}

function renderInvestigationHint() {
  const hint = byId("investigation-hint");
  const found = state.clues;
  let message = "";
  if (!state.ending && state.place !== "epilogue") {
    const location = state.place === "room" ? "Нажми «Сопоставить записи»" : "В номере 17 нажми «Сопоставить записи»";
    if (found.has("checkoutImprint") && !found.has(imprintComparisonIndex)) {
      message = location + " и сравни архивный оттиск со свежей записью за зеркалом.";
    } else if (found.has("earlyCheckout") && found.has("earlyCheckoutTestimony") && !found.has(checkoutComparisonIndex)) {
      message = location + " и сверь время выезда с показанием Корнева.";
    }
  }
  if (hint.textContent !== message) hint.textContent = message;
  hint.hidden = !message;
}

function renderNotebook() {
  const notebook = byId("notes");
  if (notebook.children.length !== state.clues.size) {
    const notes = [...state.clues].reverse().map((id) => {
      const item = document.createElement("li");
      item.textContent = clues[id] ?? comparisonNotes[id];
      return item;
    });
    notebook.replaceChildren(...notes);
    notebook.scrollTop = 0;
  }
}

byId("heading").tabIndex = -1;
byId("restart").addEventListener("click", () => {
  start();
  byId("heading").focus();
});
start();
