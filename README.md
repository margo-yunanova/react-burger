# Главная страница "Stellar burgers"

Stellar burgers - это учебный проект для изучения TypeScript, React, Drag-and-drop (react-dnd), Redux, ReactRouter, Websocket.

## Описание проекта

Stellar burgers - это одностраничное приложение, где пользователи могут собрать и заказать космический бургер. 

## Установка

Для запуска проекта выполните следующие шаги:

- Запуск проекта:

`npm start`

- Сборка проекта

`npm run build`

## Этапы разработки

### Первый этап - Вёрстка первого экрана

<img width="800px" src="https://github.com/margo-yunanova/react-burger/assets/67325499/fe0d3ee6-c798-47e8-a6c0-6e92932020b9" />

- На первом этапе созданы React компоненты:
  - AppHeader — шапка приложения;
  - BurgerIngredients — список ингредиентов;
  - BurgerConstructor — текущий состав бургера.
  - Modal и ModalOverlay - модальные окна для оформленного заказа, детальной информации об ингредиенте и детального состава заказа. Компоненты модальных окон:
    - IngredientDetails - детали ингредиента
    <img width="400px" src="https://github.com/margo-yunanova/react-burger/assets/67325499/514f4fb2-2741-47ac-852e-81586ecf1b21" />

    - OrderDetails - детали заказа
    <img width="400px" src="https://github.com/margo-yunanova/react-burger/assets/67325499/514f4fb2-2741-47ac-852e-81586ecf1b21" />
     
- Подключено API, запрос происходит при монтировании компонента App. Полученные данные используются в компонентах BurgerIngredients, BurgerConstructor, IngredientDetails и OrderDetails

### Второй этап - Redux и React DND
- Создано хранилище:
  - список всех полученных ингредиентов,
  - список всех ингредиентов в текущем конструкторе бургера,
  - объект текущего просматриваемого ингредиента,
  - объект созданного заказа
- Реализован Drag-and-drop c помощью библиотеки react-dnd
- Реализована сортировка ингредиентов в BurgerConstructor
- Экшены и редьюсеры:
  - получают список ингредиентов от API для компонента BurgerIngredients.
  - хранят список ингредиентов для конструктора бургера для компонента BurgerConstructor.
  - управляют модальными окнами
  - обновляют номер заказа в модальном окне OrderDetails.
- Подсчёт итоговой стоимости бургера в зависимости от тех ингредиентов, которые находятся в конструкторе.
- Создание заказа подключено к API

## Полезные ссылки

1. [Мой проект на Github Pages;](https://margo-yunanova.github.io/react-burger/)
1. [Ссылка на макет в Figma для первого этапа;](<https://www.figma.com/file/ocw9a6hNGeAejl4F3G9fp8/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8-(3-%D0%BC%D0%B5%D1%81%D1%8F%D1%86%D0%B0)_external_link?node-id=724%3A414&t=Nvfz9N3rrvFsdqPJ-0>)
1. [Чек лист первого этапа;](https://code.s3.yandex.net/web-plus/checklists/checklist_pdf/checklist_7.pdf)

Одностраничное приложение создано с помощью [Create React App](https://github.com/facebook/create-react-app).

