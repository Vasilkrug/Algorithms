import {swap, swapRight} from "./helpers.js";

const numbers = document.getElementById('numbers');
const mediaBtns = document.querySelectorAll('.media-button');
const sortBlock = document.querySelector('.sort');
const sortBtns = document.querySelectorAll('.algorithm-item');
const sortTextBlock = document.querySelector('.sort-text');
let isPaused = false;
let isStoped = false;
let delay = 500;

//функция, которая преобразует данные из инпута в массив, пропуская не числовые символы
const toArray = () => {
    if (!numbers.value.trim()) return [];
    return numbers.value.trim().split(',').map(v => +v).filter(v => !isNaN(v));
};

//рендер массива, который нужно преобразовать
const sortRender = () => {
    const arr = toArray();
    sortBlock.innerHTML = arr.map((item) => {
        return `<div class="sort-item">${item}</div>`;
    }).join('');
};

//рендер описания алгоритма сортировки
const sortTextRender = (text) => {
    sortTextBlock.innerHTML = `<p>${text}</p>`;
};

//функция задержки, для эмуляции анимации
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//функция, которая ставит на паузу анимацию
const pause = async () => {
    while (isPaused) {
        await sleep(100);
    }
};

//пузырьковая сортировка
const bubbleSort = async (blocks) => {
    for (let i = 0; i < blocks.length - 1; i += 1) {
        for (let j = 0; j < blocks.length - i - 1; j += 1) {
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";
            await sleep(delay);

            const value1 = Number(blocks[j].innerHTML);
            const value2 = Number(blocks[j + 1].innerHTML);

            if (isStoped) {
                return;
            }

            if (!isPaused) {
                if (value1 > value2) {
                    await swap(blocks[j], blocks[j + 1], sortBlock);
                    blocks = document.querySelectorAll(".sort-item");
                }
            } else {
                await pause();
            }
            await sleep(delay)

            blocks[j].style.backgroundColor = "#58B7FF";
            blocks[j + 1].style.backgroundColor = "#58B7FF";
        }

        blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
        blocks[0].style.backgroundColor = "#13CE66";
    }
    isPaused = false;
    isStoped = false;
};

//сортировка вставками
const insertSort = async (blocks) => {
    blocks[0].style.backgroundColor = "#13CE66";
    for (let i = 1; i < blocks.length; i += 1) {
        let j = i - 1;
        let key = parseInt(blocks[i].innerHTML);
        let title = document.querySelector('.sort-title');
        title.innerHTML = `Выбран элемент :${key}`;
        blocks[i].style.backgroundColor = "darkblue";

        await sleep(600);

        while (j >= 0 && parseInt(blocks[j].innerHTML) > key) {
            if (isStoped) {
                return;
            }

            if (!isPaused) {
                blocks[j].style.backgroundColor = "darkblue";
                blocks[j + 1].innerText = blocks[j].innerText;
                j = j - 1;
            } else {
                await pause();
            }

            await sleep(delay);

            for (let k = i; k >= 0; k--) {
                blocks[k].style.backgroundColor = "#13CE66";
            }
        }

        blocks[j + 1].innerHTML = key;

        await sleep(delay);

        blocks[i].style.backgroundColor = "#13CE66";
        title.innerHTML = `Элементы отсортированы`;
    }
    isPaused = false;
    isStoped = false;
};

//быстрая сортировка
const quickSort = async (blocks) => {
    if (blocks.length <= 1) {
        return blocks;
    }

    const pivot = blocks[blocks.length - 1];
    const leftList = [];
    const rightList = [];

    for (let i = 0; i < blocks.length - 1; i++) {
        const value = Number(blocks[i].innerHTML)
        await sleep(delay)

        if (isStoped) {
            return;
        }

        if (!isPaused) {
            if (value < Number(pivot.innerHTML)) {
                leftList.push(blocks[i]);
                blocks[i].style.backgroundColor = "#FF4949";
                await swap(pivot, blocks[i], sortBlock);
            } else {
                blocks[i].style.backgroundColor = "#58B7FF";
                rightList.push(blocks[i]);
                await swapRight(blocks[i], pivot);
            }
        } else {
            await pause();
        }
    }

    return [...await quickSort(leftList), pivot, ...await quickSort(rightList)];
};

//сортировка выбором
const selectSort = async (blocks) => {

    for (let i = 0; i < blocks.length; i += 1) {
        let min = i;
        blocks[i].style.backgroundColor = "darkblue";

        for (let j = i + 1; j < blocks.length; j += 1) {
            blocks[j].style.backgroundColor = "#FF4949";

            await sleep(delay);

            let currValue = Number(blocks[j].innerHTML);
            let minValue = Number(blocks[min].innerHTML);

            if (isStoped) {
                return;
            }

            if (!isPaused) {
                if (currValue < minValue) {
                    if (min !== i) {
                        blocks[min].style.backgroundColor = "#58B7FF";
                    }
                    min = j;
                } else {
                    blocks[j].style.backgroundColor = "#58B7FF";
                }
            } else {
                await pause();
            }
        }

        let temp = blocks[min].innerText;
        blocks[min].innerText = blocks[i].innerText;
        blocks[i].innerText = temp;

        await sleep(delay);

        blocks[min].style.backgroundColor = "#58B7FF";
        blocks[i].style.backgroundColor = "green";
    }
    isPaused = false;
};

//сортировка Шелла
const shellSort = async (blocks) => {
    for (let i = 10; i > 0; i = Math.floor(i / 2)) {

        await sleep(delay);

        for (let j = i; j < blocks.length; j++) {
            let temp = parseInt(blocks[j].innerHTML);
            let k;

            for (k = j; k >= i && Number(blocks[k - i].innerHTML) > temp; k -= i) {
                blocks[k].innerText = blocks[k - i].innerText;

                await sleep(delay);
            }

            if (isStoped) {
                return;
            }

            if (!isPaused) {
                blocks[j].style.backgroundColor = "#FF4949";
                blocks[k].style.backgroundColor = "#FF4949";
                blocks[k].innerText = temp;

                await sleep(delay);

                blocks[j].style.backgroundColor = "#13CE66";
                blocks[k].style.backgroundColor = "#13CE66";

                await sleep(delay);
            } else {
                await pause();
            }
        }
    }
    isPaused = false;
    isStoped = false;
};
//все сортировки выполнены согласно алгоритмам,
// каждая сортировка во время итерации меняет цвет фона элементов для наглядности и вызывает функцию sleep и pause

//mapping создан чтобы не прописывать if else
const mapping = {
    'quick': {
        fn: quickSort,
        text: '<span class="text-selected">Быстрая сортировка</span> - в целом это один из самых быстрых алгоритмов сортировки массивов,' +
            ' однако на практике он чаще всего применяется с разного рода модификациями. ' +
            'Является примером принципа «разделяй и властвуй».\n' +
            'Идея алгоритма заключается в том, что выбирается опорный элемент, ' +
            'относительно которого будет происходит сортировка.' +
            ' Равные и бОльшие элементы помещаются справа, меньшие – слева. ' +
            'Затем к полученным подмассивам рекурсивно применяются два первых пункта.'
    },
    'bubble': {
        fn: bubbleSort,
        text: '<span class="text-selected">Сортировка пузырьком</span> или <span class="text-selected">сортировка простыми обменами</span> – один из простейших алгоритмов сортировки.' +
            ' Он применяется\n' +
            'для упорядочивания массивов небольших размеров.\n' +
            'Суть алгоритма в том, что совершается несколько проходов по массиву. ' +
            'При каждом проходе попарно сравниваются два соседних элемента. ' +
            'Если они находятся в верном порядке, то ничего не происходит, в противном случае они меняются местами. ' +
            'В результате первого прохода максимальный элемент окажется в конце, то есть всплывет словно пузырек. ' +
            'Затем все повторяется до того момента пока весь массив не будет отсортирован.'
    },
    'insert': {
        fn: insertSort,
        text: '<span class="text-selected">Сортировка вставками</span> - сортировка, в которой элементы просматриваются по одному ' +
            'и ставятся на место в соответствии с уже упорядоченным массивом.'
    },
    'select': {
        fn: selectSort,
        text: '<span class="text-selected">Сортировка выбором</span> - здесь, чтобы отсортировать массив, находим элемент с минимальным значением,' +
            ' затем сравниваем его со значением первой неотсортированной позиции. ' +
            'Если этот элемент меньше, то он становится новым минимумом и их позиции меняются.'
    },
    'shell': {
        fn: shellSort,
        text: '<span class="text-selected">Сортировка Шелла</span> - алгоритм сортировки, являющийся усовершенствованным вариантом сортировки вставками. ' +
            'Идея метода Шелла состоит в сравнении элементов, стоящих не только рядом, ' +
            'но и на определённом расстоянии друг от друга. Иными словами — это сортировка вставками ' +
            'с предварительными «грубыми» проходами. ' +
            'Аналогичный метод усовершенствования пузырьковой сортировки. '
    }
}

let activeSort = 'quick';
let sortFn = mapping[activeSort].fn;
let sortText = mapping[activeSort].text;

sortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        //меняем класс по клику
        document.querySelector('.algorithm-item.button-active').classList.remove('button-active');
        btn.classList.add('button-active');
        //получаем атрибут активной кнопки
        activeSort = btn.dataset.sort;
        //здесь происходит диспетчирезация по ключу
        sortFn = mapping[activeSort].fn;
        sortText = mapping[activeSort].text;
        //по клику рендерим текс активного алгоритма сортировки
        sortTextRender(sortText);
    })
});


mediaBtns.forEach(button => {
    button.addEventListener('click', () => {
        const media = button.dataset.media;
        //запускаем алгоритм, дизейблим кнопку старта
        if (media === 'start') {
            document.querySelector('[data-media="start"]').setAttribute('disabled', 'disabled');
            sortRender();
            let blocks = document.querySelectorAll(".sort-item");
            sortFn(blocks);
            sortTextRender(sortText);
            isStoped = false;
            isPaused = false;
        }
        if (media === 'pause') {
            //дизейблим кнопку старт, когда начажата кнопка паузы
            if (isPaused) {
                document.querySelector('[data-media="pause"]').innerHTML = 'Пауза';
                document.querySelector('[data-media="start"]').setAttribute('disabled', 'disabled')
                isPaused = false;
            } else {
                document.querySelector('[data-media="pause"]').innerHTML = 'Продолжить';
                document.querySelector('[data-media="start"]').setAttribute('disabled', 'disabled')
                isPaused = true;
            }
        }
        //сбрасываем выполнение любого алгоритма и очищаем инпут с родителем в котором рендеритмся массив
        if (media === 'reset') {
            document.querySelector('[data-media="start"]').removeAttribute('disabled');
            isStoped = true;
            numbers.value = '';
            sortBlock.innerHTML = '';
        }
    })
});

sortTextRender(sortText);