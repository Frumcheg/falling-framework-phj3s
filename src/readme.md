##### Что сделал:

- код разбит на модули: parser (разбор html-строки), NodeLocator (поиск и подсветка найденной ноды), ThreeView (отображение дерева тегов и обработка нажатий), view.js (иницализация приложения, вывод ошибок)
- валидация по whiteList тегов и атрибутов в полученном html
- отображение дерева тегов (старался максимально обойтись средствами CSS)
- выделение найденного тега иным цветом
- по нодам можно перемещаться tab-ом и по нажатию на Enter скрывать/раскрывать их
- если указать невалидный селектор, ошибка будет выведена в интрефейсе
- в index.html есть пример разметки, на которой я тестировал реализацию

Что можно улучшить:

- DOMParser в случае ошибки выбрасывает человеко-читаемое исключение с указанием на расположение ошибки, можно было бы выводить это
- порефакторить view.js, сделать вывод ошибок единообразным
- сделать отображение "красивее": добавить плавных переходов, подобрать менее вырвиглазные цвета, подровнять отступы