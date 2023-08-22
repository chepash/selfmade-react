import * as snabbdom from "snabbdom";
import React from "./react";

// propsModule отвечает за модификацию текстовых атрибутов
// eventListenersModule отвечает за обработку событий на элементах
const reconcile = snabbdom.init([
    snabbdom.propsModule,
    snabbdom.eventListenersModule,
]);

// Переменная, содержащая корневой элемент, который функция render вернула последним
let rootVNode;

const render = (el, rootDomElement) => {
    // Этот блок кода будет вызван при первом вызове функции render
    if (rootVNode == null) {
        rootVNode = rootDomElement;
    }
    // Запоминаем VNode, которую возвращает reconcile
    rootVNode = reconcile(rootVNode, el);
};

// // const root = React.createRoot(document.getElementById('root'));
// // rootDomElement -> document.getElementById('root')
// const createRoot = (rootDomElement) => {
//   return {
//     // root.render(<App />);
//     // el -> <App />
//     render: (el) => {
//       // В этой функции описывается механизм размещения элемента el в указанном узле rootDomElement
//       // Например:
//       // const root = React.createRoot(document.getElementById('root'));
//       // root.render(<App />);

//       // Этот блок кода будет вызван при первом вызове функции render
//       if (rootVNode == null) {
//         rootVNode = rootDomElement;
//       }

//       // Запоминаем VNode, которую возвращает reconcile
//       rootVNode = reconcile(rootVNode, el);
//     }
//   };
// }

// ReactDom указывает React, как обновлять DOM
React.__updater = (componentInstance) => {
    // В этом методе описана логика обновления DOM, когда вызывается this.setState в компонентах

    // Получаем текущий элемент oldVNode, который сохранён в __vNode
    const oldVNode = componentInstance.__vNode;
    // Присваеваем обновлённую версию DOM-узла с помощью вызова метода render у переданного элемента
    const newVNode = componentInstance.render();

    // Обновляем __vNode свойство — для этого заменяем oldVNode на newVNode
    componentInstance.__vNode = reconcile(oldVNode, newVNode);
};

// // Экспортируем функцию, чтоб использовать её как ReactDom.createRoot
// const ReactDom = {
//   createRoot
// };

const ReactDom = {
    render,
};

export default ReactDom;
