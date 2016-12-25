# Тестовое задание ШРИ #2

Создайте библиотеку, которая реализует такой программный интерфейс:
- добавление студентов-участников и объединение их в команды;
- создание командных и индивидуальных заданий;
- выставление оценок за задание;
- создание приоритизированных списков менторов и студентов;
- решение задачи распределения студентов среди менторов в соответствии с приоритизированными списками.

## Решение (API)

### Содержание по пунктам задания

* [Добавление студентов-участников](#libaddtype-options)
* [Объединение участников в команды](#При-type--team)
* Создание [командных](#teamprototypeaddtasks-tasks-task-object--array-of-selector-) и [индивидуальных заданий](#studentprototypeaddtasks-tasks-task-object--array-of-selector-)
* Выставление оценок за задание:
  * [Студентам](#studentprototypesetmark-selector-selector-mark-number-)
  * [Командам](#teamprototypesetmark-selector-selector-mark-number-)
* Cоздание приоритизированных списков [менторов](#studentprototypepreferredmentorslist) и [студентов](#mentorprototypepreferredstudentslist)
* [Решение задачи распределения студентов среди менторов в соответствии с приоритизированными списками](#libgetfinalprioritylist)

### Содержание по API

#### Lib:
* [Lib.add(type, options)](#libaddtype-options)
* [Lib.edit(selector, options)](#libeditselector-options)
* [Lib.select(selector)](#libselectselector)
* [Lib.getFinalPriorityList()](#libgetfinalprioritylist)

#### Объекты, их типы
* [Student](#student)
  * [Student.prototype.id](#studentprototypeid)
  * [Student.prototype.name](#studentprototypename)
  * [Student.prototype.team](#studentprototypeteam)
  * [Student.prototype.preferredMentorsList](#studentprototypepreferredmentorslist)
  * [Student.prototype.addPreferredMentor(mentor, priority)](#studentprototypeaddpreferredmentormentor-selector-priority-number)
  * [Student.prototype.addTasks(tasks)](#studentprototypeaddtasks-tasks-task-object--array-of-selector-)
  * [Student.prototype.removeTasks(tasks)](#studentprototyperemovetasks-tasks-task-object--array-of-selector-)
  * [Student.prototype.setMark(selector, mark)](#studentprototypesetmark-selector-selector-mark-number-)
* [Team](#team)
  * [Team.prototype.id](#teamprototypeid)
  * [Team.prototype.name](#teamprototypename)
  * [Team.prototype.teammates](#teamprototypeteammates)
  * [Team.prototype.addTeammates(students)](#teamprototypeaddteammates-students-student-object--array-of-selector-)
  * [Team.prototype.removeTeammates(students)](#teamprototyperemoveteammates-students-student-object--array-of-selector-)
  * [Team.prototype.addTasks(tasks)](#teamprototypeaddtasks-tasks-task-object--array-of-selector-)
  * [Team.prototype.removeTasks(tasks)](#teamprototyperemovetasks-tasks-task-object--array-of-selector-)
  * [Team.prototype.setMark(selector, mark)](#teamprototypesetmark-selector-selector-mark-number-)
* [Task](#task)
  * [Task.prototype.id](#taskprototypeid)
  * [Task.prototype.title](#taskprototypetitle)
  * [Task.prototype.content](#taskprototypecontent)
  * [Task.prototype.executors](#taskprototypeexecutors)
  * [Task.prototype.addExecutors(students)](#taskprototypeaddexecutors-students-student-object--array-of-selector-)
  * [Task.prototype.removeExecutors(students)](#taskprototyperemoveexecutors-students-student-object--array-of-selector-)
* [Mentor](#mentor)
  * [Mentor.prototype.id](#mentorprototypeid)
  * [Mentor.prototype.name](#mentorprototypename)
  * [Mentor.prototype.preferredStudentsList](#mentorprototypepreferredstudentslist)
  * [Mentor.prototype.addPreferredStudent(student, priority)](#mentorprototypeaddpreferredstudentstudent-selector-priority-number)

### Lib.add(type, options)

Позволяет добавить новый объект.

#### Параметры

##### type
`Cтрока`, содержащая тип объекта для добавления. Тип может быть одним из следующих:
* [student](#student) - при добавлении студента-участника,
* [mentor](#mentor) - при добавлении ментора,
* [team](#team) - при создании команды,
* [task](#task) - при создании задания.



##### options
`Объект`, содержащий информацию о добавляемом объекте. __*Должен*__ содержать хотя бы одно свойство (`name` или `title`).

В зависимости от заданного **type**, может принимать следующие свойства:
###### При type = `student`:

* **name** - `строка` с именем студента,
* **team** - `строка` с названием команды **или** `число` с ID команды **или** `объект команды`; если к моменту создания студента, команда не существует, *она будет создана автоматически* ([см. Lib.add('team', options)](#При-type--team)),
* **preferredMentorsList** - `массив` объектов типа `Mentor` **или** `чисел` ID менторов **или** `строк` - имён менторов, в порядке *от самого приоритетного к самому нежелаемому*.

Пример:
    
```javascript
var student = Lib.add('student', {
    name: 'Никита',
    team: 'Новая Команда',
    preferredMentorsList: [ 1, 'Иван', Lib.mentors[3] ]
});
```

###### При type = `mentor`:
* **name** - `строка` с именем ментора,
* **preferredStudentsList** - `массив` объектов типа `Student` **или** `чисел` ID студентов **или** `строк` - имён студентов, в порядке *от самого приоритетного к самому нежелаемому*.

Пример: 
```javascript
var mentor = Lib.add('mentor', {
    name: 'Иван',
    preferredStudentsList: [ 1, 'Никита', Lib.students[4] ]
});
```
  
###### При type = `task`:
* **title** - `строка` с названием задания,
* **content** - `строка` с содержанием задания,
* **executors** - `массив` объектов типа `Student` или `Team`, `строк` с именами или `чисел` ID студентов и команд, выполняющих данное задание.

Пример:
```javascript
var task = Lib.add('task', {
    title: 'Иван',
    content: 'Создайте библиотеку...',
    executors: [ 1, 'Никита', 'Новая Команда' ]
});
```

###### При type = `team`:
* **name** - `строка` с названием команды,
* **teammates** - `массив` объектов типа `Student`, `строк` с именами или `чисел` ID студентов, состоящих в команде.

Пример:
```javascript
var team = Lib.add('team', {
    name: 'Новая Команда',
    teammates: [ 1, 'Никита', Lib.students[4] ]
});
```

#### Результат
Создаётся новый объект указанного типа с информацией, данной в `options`.
Объект сохраняется в массиве Lib.**type**'s, соответствующем типу созданного объекта (Например, `Lib.students`).

**Возвращает:** созданный *объект*.

---

### Lib.edit(selector, options)

Позволяет редактировать информацию о существующих объектах.

#### Параметры

##### selector

`Строка`, соответствующая **name**/**title** объекта или `число` - ID объекта или сам `объект`.

##### options

`Объект` с *новыми* свойствами, которые будут присвоены выбранному по **селектору** объекту. Содержит свойства, соответствующие типу изменяемого объекта (те же, что в `Lib.add()`).

#### Результат

Меняет информацию о выбранном объекте на новую, переданную через **options**.

**Возвращает:** изменённый объект.

---

### Lib.select(selector)
Выбирает один из ранее добавленных объектов.

#### Параметры

##### selector

`Строка`, соответствующая **name**/**title** объекта; `число` - ID объекта или сам `объект`.

#### Результат

**Возвращает:** выбранный объект.

---

### Lib.getFinalPriorityList()
Распределяет студентов среди менторов в соответствии с приоритизированными списками.

#### Результат

**Возвращает:** `Массив` объектов, содержащих 3 элемента:

* **index:** `Число`, сумма приоритетности студента для ментора и ментора для студента. Чем меньше число, тем выше приоритетность,
* **mentor:** `Объект Mentor`, ментор, выбранный для студента,
* **student:** `Объект Student`, студент, выбранный для ментора.



## Объекты. Типы объектов

### Student
Класс студентов-участников.
Объекты класса создаются через `Lib.add('student', options)`.

#### Student.prototype.id
Свойство, содержащее `число` - уникальный ID студента.
Задается автоматически при добавлении студента через `Lib.add('student', options)`.
* Нельзя перезаписать.
* Можно получить:

  ```javascript
  var studentId = student.id;
  ```

#### Student.prototype.name
Свойство, содержащее `строку` с именем студента.
Задается в `options.name` при добавлении студента через `Lib.add('student', options)`.
* Можно перезаписать:

  ```javascript
  var student = Lib.add('student', {name: 'Никита'});
  stud.name = 'Чесноков Н.';
  ```
* Можно получить:

  ```javascript
  var studentName = student.name; // 'Чесноков Н.'
  ```

#### Student.prototype.team
Свойство, содержащее `объект` команды, к которой относится студент.
Задается в `options.team` при добавлении студента `Lib.add('student', options)`.
* Можно перезаписать:

  ```javascript
  var student = Lib.add('student', {name: 'Никита', team: 'New team'});
  student.team = Lib.add('team', {name: 'Another team'});
  ```
* Можно получить:

  ```javascript
  var studentTeam = student.team; // 'Another team'
  ```

#### Student.prototype.preferredMentorsList
Свойство, содержащее приоритизированный список менторов в виде `массива` объектов типа `Mentor` (или [селекторов](#selector-1)), в котором менторы отсортированы *от самого приоритетного к самому нежелательному*.
Задается в `options.preferredMentorsList` при добавлении студента `Lib.add('student', options)`.
* Можно перезаписать:

  ```javascript
  var student = Lib.add('student', {
      name: 'Никита',
      preferredMentorsList: ['Иван', 'Пёрт']
  });
  student.preferredMentorsList = ['Иван'];
  ```
* Можно получить:

  ```javascript
  var studentMentorsList = student.preferredMentorsList; // [ Mentor objects ]
  ```

#### Student.prototype.addPreferredMentor(mentor: [selector](#selector-1), priority: Number)
Метод для добавления ментора в приоритизированный список менторов.
Принимает 2 параметра:
* **mentor** - `селектор` ментора (ID, title или объект типа Mentor),
* **priority** - `число` приоритетности метора. **Должно** быть >= 1. В приоритизированном списке добавляемый ментор будет добавлен на место (priority-1), сдвигая при этом вниз всех менторов, начиная с того, который ранее занимал место (priority-1).

**Пример:**
```javascript
student.addPreferredMentor('Иван', 3);
```

**Возвращает:** измененный `объект` студента.

#### Student.prototype.addTasks( tasks: [Task object](#task) | Array of [selector](#selector-1) )
Метод для добавления заданий студенту.
Принимает `объект` задания или `массив` селекторов задания (ID, title или самих объектов).

**Пример:**
```javascript
student.addTasks([ 0, 'Задание 2', Lib.tasks[3] ]);
```

**Возвращает:** измененный `объект` студента.

#### Student.prototype.removeTasks( tasks: [Task object](#task) | Array of [selector](#selector-1) )
Метод для удаления заданий студента.
Принимает `объект` задания или `массив` селекторов задания (ID, title или самих объектов).

**Пример:**
```javascript
student.removeTasks([ 0, 'Задание 2', Lib.tasks[3] ]);
```

**Возвращает:** измененный `объект` студента.

#### Student.prototype.setMark( selector: [selector](#selector-1), mark: Number )
Метод для выставления оценки за выполнение задания студенту.
Принимает два параметра:
* **selector** - `Строка`, `Число` или `Объект задания`, указывающая на оцениваемое задание,
* **mark** - `Число`, оценка.

**Пример:**
```javascript
student.setMark([ 'Задание 2', 5 ]);
```

**Возвращает:** измененный `объект` студента.

---

### Team
Класс команд.
Объекты класса создаются через `Lib.add('team', options)`.

#### Team.prototype.id
Свойство, содержащее `число` - уникальный ID команды.
Задается автоматически при добавлении команды через `Lib.add('team', options)`.
* Нельзя перезаписать.
* Можно получить:

   ```javascript
   var teamId = team.id;
   ```

#### Team.prototype.name
Свойство, содержащее `строку` с именем команды.
Задается в `options.name` при добавлении команды через `Lib.add('team', options)`.
* Можно перезаписать:

  ```javascript
  var team = Lib.add('team', {name: 'Lakers'});
  team.name = 'Chicago Bulls';
  ```
* Можно получить:

  ```javascript
  var teamName = team.name; // 'Chicago Bulls'
  ```

#### Team.prototype.teammates
Свойство, содержащее `массив` объектов типа [Student](#student) студентов, состоящих в команде.
Задается в `options.team` при добавлении команды `Lib.add('team', options)`.
* Можно изменить с помощью [Team.prototype.addTeammates](#teamprototypeaddteammates-students-student-object--array-) и [Team.prototype.removeTeammates](#teamprototyperemoveteammates-students-student-object--array-) (см.ниже)
* Можно получить:

  ```javascript
  var teammates = team.teammates;
  ```

#### Team.prototype.addTeammates( students: [Student object](#student) | Array of [selector](#selector-1) )
Метод для добавления членов команды.
Принимает `объект` студента или `массив` селекторов студентов (ID, title или самих объектов).

**Пример:**
```javascript
team.addTeammates( Lib.students[0] );
```

**Возвращает:** измененный `объект` команды.

#### Team.prototype.removeTeammates( students: Student object | Array of [selector](#selector-1) )
Метод для удаления членов команды.
Принимает `объект` студента или `массив` селекторов студентов (ID, title или самих объектов).

**Пример:**
```javascript
team.removeTeammates( Lib.students[0] );
```

**Возвращает:** измененный `объект` команды.

#### Team.prototype.addTasks( tasks: Task object | Array of [selector](#selector-1) )
Метод для добавления заданий команде.
Принимает `объект` задания или `массив` селекторов задания (ID, title или самих объектов).

**Пример:**
```javascript
team.addTasks([ Lib.tasks[0], 2, 'New task' ]);
```

**Возвращает:** измененный `объект` команды.

#### Team.prototype.removeTasks( tasks: Task object | Array of [selector](#selector-1) )
Метод для удаления заданий команды.
Принимает `объект` задания или `массив` селекторов задания (ID, title или самих объектов).

**Пример:**
```javascript
team.removeTasks([ Lib.tasks[0], 2, 'New task' ]);
```

**Возвращает:** измененный `объект` команды.

#### Team.prototype.setMark( selector: [selector](#selector-1), mark: Number )
Метод для выставления оценки за выполнение задания команде.
Принимает два параметра:
* **selector** - `Строка`, `Число` или `Объект задания`, указывающая на оцениваемое задание,
* **mark** - `Число`, оценка.

**Пример:**
```javascript
team.setMark( Lib.tasks[4], 4 );
```

**Возвращает:** измененный `объект` команды.

---

### Task
Класс коммандных и индивидуальных заданий.
Объекты класса создаются через `Lib.add('task', options)`.

#### Task.prototype.id
Свойство, содержащее `число` - уникальный ID задания.
Задается автоматически при добавлении задания через `Lib.add('task', options)`.
* Нельзя перезаписать.
* Можно получить:

  ```javascript
  var taskId = task.id;
  ```

#### Task.prototype.title
Свойство, содержащее `строку` с заголовком задания.
Задается в `options.title` при добавлении задания через `Lib.add('task', options)`.
* Можно перезаписать:

  ```javascript
  var task = Lib.add('task', {title: 'Первое задание'});
  task.title = 'Второе задание';
  ```
* Можно получить:

  ```javascript
  var taskTitle = task.title; // 'Второе задание'
  ```

#### Task.prototype.content
Свойство, содержащее `строку` - содержание задания.
Задается в `options.content` при добавлении задания через `Lib.add('task', options)`.
* Можно перезаписать:

  ```javascript
  var task = Lib.add('task', {
      title: 'Первое задание',
      content: 'Создайте библиотеку...'});
  task.content = 'Найдите и исправьте ошибки...';
  ```
* Можно получить:

  ```javascript
  var taskContent = task.content; // 'Найдите и исправьте ошибки...'
  ```

#### Task.prototype.executors
Свойство, содержащее `массив` `объектов` студентов, состоящих в команде.
Задается в `options.task` при добавлении задания `Lib.add('task', options)`.
* Можно изменить с помощью [Task.prototype.addExecutors](#taskprototypeaddexecutors-students-student-object--array-) и [Task.prototype.removeexecutors](#taskprototyperemoveexecutors-students-student-object--array-) (см.ниже)
* Можно получить:

  ```javascript
  var taskExecutors = task.executors; // [...]
  ```

#### Task.prototype.addExecutors( students: [Student object](#student) | Array of [selector](#selector-1) )
Метод для добавления исполнителей задания.
Принимает `объект` студента/команды или `массив` селекторов исполнителей (ID, title или самих объектов).

**Пример:**
```javascript
task.addExecutors([1]);
```

**Возвращает:** измененный `объект` задания.

#### Task.prototype.removeExecutors( students: [Student object](#student) | Array of [selector](#selector-1) )
Метод для удаления исполнителей задания.
Принимает `объект` студента/команды или `массив` селекторов исполнителей (ID, title или самих объектов).

**Пример:**
```javascript
task.removeExecutors([1]);
```

**Возвращает:** измененный `объект` задания.

---

### Mentor
Класс менторов.
Объекты класса создаются через `Lib.add('mentor', options)`.

#### Mentor.prototype.id
Свойство, содержащее `число` - уникальный ID ментора.
Задается автоматически при добавлении ментора через `Lib.add('mentor', options)`.
* Нельзя перезаписать.
* Можно получить:

  ```javascript
  var mentorId = mentor.id;
  ```

#### Mentor.prototype.name
Свойство, содержащее `строку` с именем ментора.
Задается в `options.name` при добавлении ментора через `Lib.add('mentor', options)`.
* Можно перезаписать:

  ```javascript
  var mentor = Lib.add('mentor', {name: 'Иван'});
  mentor.name = 'Александр';
  ```
* Можно получить:

  ```javascript
  var mentorName = mentor.name; // 'Александр'
  ```

#### Mentor.prototype.preferredStudentsList
Свойство, содержащее приоритизированный список студентов в виде `массива` объектов типа `Student` (или [селекторов](#selector-1)), в котором студенты отсортированы *от самого приоритетного к самому нежелательному*.
Задается в `options.preferredStudentsList` при добавлении ментора `Lib.add('mentor', options)`.
* Можно перезаписать:

  ```javascript
  var student = Lib.add('mentor', {
      name: 'Никита',
      preferredStudentsList: ['Никита', 'Антон']
  });
  student.preferredStudentsList = ['Никита'];
  ```
* Можно получить:

  ```javascript
  var mentorStudentsList = mentor.preferredStudentsList; // [ Student objects ]
  ```

#### Mentor.prototype.addPreferredStudent(student: [selector](#selector-1), priority: Number)
Метод для добавления студента в приоритизированный список студентов.
Принимает 2 параметра:
* **student** - `селектор` студента (ID, title или объект типа Student),
* **priority** - `число` приоритетности студента. **Должно** быть >= 1. В приоритизированном списке добавляемый студент будет добавлен на место (priority-1), сдвигая при этом вниз всех студентов, начиная с того, который ранее занимал место (priority-1).

**Пример:**
```javascript
mentor.addPreferredStudent('Антон', 3);
```

**Возвращает:** измененный `объект` ментора.
