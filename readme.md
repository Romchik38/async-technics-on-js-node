Материалы по изучению курса асинхронного программирования JavaScript    
лекции - https://habr.com/ru/post/452974/  

## Каталоги:  
  1. Callbacks -  Асинхронное программирование на callback'ах:  
     * /app/controllers/main.js - обычная "лесенка"  
     * /app/controllers/category.js - последовательно.  

  2. Callbacks -  Неблокирующее итерирование:  
     * /app/libs/non-block-cb-fn.js - итерирующая функция  
     * /app/database.js - пример вызова.    

  3. Callbacks - Асинхронность с библиотекой async.js  
     * /app/controllers/user.js - пример последовательного вызова (serial)  

  4. Promise - Асинхронность на промисах
     * переписал весь код с callbacks на promise

  5. Async-await - Асинхронные функции и обработка ошибок
     * переписан весь код с promise на async await
     * вынесено чтение json во внешнюю библиотеку dtbase с использованием  
       async await
     * все ошибки обрабатываются в блоках catch

  6. Async-await - Необработанные ошибки в промисах
     * обработка ошибок добавлена в виде 2-го аргумента в then:
       1. app/controllers/main.js
       2. app/controllers/category.js
       3. app/controllers/user.js
     * после этого добавлен catch, который обрабатывает ошибку, если она
       возникнет в then
     * /index.js - Добавлено событие **unhandledRejection**, которое будет
        перехватывать необработанные ошибки в промисах.
     * /app/libs/readJson.js  - имитировано долгое чтение с базы в течении
        500 мсек. Для таблицы users через 300 мсек возращается ошибка
        timeout. Для таблицы pages не делается ошибка, чтобы  главная страница
        сайта загружалась. Сделано это путем оборачивания fs.primeses.readFile
        в функцию с таймером. 
