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
