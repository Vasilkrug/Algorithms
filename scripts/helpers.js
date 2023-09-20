export const swap = (el1, el2, parent) => {
    return new Promise(resolve => {
        window.requestAnimationFrame(function () {
            setTimeout(() => {
                parent.insertBefore(el2, el1);
                resolve();
            }, 250);
        });
    });
};

export const insertAfter = (newNode, existingNode) => {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
};

export const swapRight = (target, afterTarget) => {
    return new Promise(resolve => {
        window.requestAnimationFrame(function () {
            setTimeout(() => {
                insertAfter(target, afterTarget)
                resolve();
            }, 200);
        });
    });
};

//функция задержки, для эмуляции анимации
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));