'use strict';
(function(){

class LibObject {

}

//=require Student.js
//=require Task.js
//=require Team.js
//=require Mentor.js

var uniqueId = 0;

var Lib = {

	add: function(type, options, ...args){

		// Обработка ошибок
		if ((typeof type === 'undefined') || (type.length == 0))
			throw new Error('Тип должен быть указан.')
		else if (typeof type != 'string')
			throw new Error('Тип должен быть строкой');
		
		if ((typeof options === 'undefined') || (!('name' in options) && !('title' in options)))
			throw new Error('Отсутствует \'options\'. Задайте его хотя бы с одним свойством \'name\' или \'title\'.')
		else if (typeof options != 'object')
			throw new Error('Options должен быть объектом {}.');

		// Добавление объекта
		switch (type) {
			
			case 'student':
				let studId = uniqueId++;
				let newStudent = new Student(studId, options.name, options.mentorsPriorityList);

				if (options.team) {
					let teamObj = this.select(options.team);
					if (!teamObj) {
						teamObj = Lib.add('team', {name: options.team});
					}
					teamObj.addTeammate(newStudent);
					newStudent.team = teamObj;
				}
				
				Lib.students.push(newStudent);
				console.log('Added new Student: '+ newStudent.name +'.');
				return newStudent;
			break;

			case 'task':
				let taskId = uniqueId++;
				let newTask = new Task(taskId, options.title, options.executors);
				Lib.tasks.push(newTask);
				console.log('Added new Task: '+ newTask.title +'.');
				return newTask;
			break;

			case 'team':
				let teamId = uniqueId++;
				let newTeam = new Team(teamId, options.name, options.teammates);
				Lib.teams.push(newTeam);
				console.log('Added new Team: '+ newTeam.name +'.');
				return newTeam;
			break;

			case 'mentor':
				let mentorId = uniqueId++;
				let newMentor = new Mentor(mentorId, options.name, options.preferredStudents)
				Lib.mentors.push(newMentor);
				console.log('Added new Mentor: '+ newMentor.name +'.');
				return newMentor;
			break;

			// Если тип задан неверно
			default:
				throw new Error('Типа \''+ type +'\' не существует.');
			break;
		}
	},

	edit: function(selector, options) {

		// Обработка ошибок
		if ((typeof selector === 'undefined') || (selector.length == 0))
			throw new Error('Селектор должен быть указан.')
		else if ((typeof selector != 'string') && (typeof selector != 'number'))
			throw new Error('Селектор должен быть строкой или числом');
		
		if (typeof options === 'undefined')
			throw new Error('Отсутствует \'options\'. Задайте его хотя бы с одним свойством.')
		else if (typeof options != 'object')
			throw new Error('Options должен быть объектом {}.');

		// Правка объекта
		var object = this.select(selector);
		for (let prop in options) {
			if (prop == 'id') continue;
			object[prop] = options[prop];
		}
		return object;

	},

	students: [],
	mentors: [],
	tasks: [],
	teams: [],

	select: function(selector) {
		var result = undefined;
		if ((typeof selector === 'number') || !isNaN(selector)) {
			var selector = parseInt(selector);

			Lib.students.forEach(function(item, i, arr) {
				if ((item.id == selector) && !result) {
					result = item;
				}
			});
			if (result) return result;

			
			Lib.mentors.forEach(function(item, i, arr) {
				if ((item.id == selector) && !result) {
					result = item;
				}
			});
			if (result) return result;
			
			
			Lib.tasks.forEach(function(item, i, arr) {
				if ((item.id == selector) && !result) {
					result = item;
				}
			});
			if (result) return result;
			
			
			Lib.teams.forEach(function(item, i, arr) {
				if ((item.id == selector) && !result) {
					result = item;
				}
			});
			if (result) return result;
			

		} else if (typeof selector == 'string') {

			Lib.students.forEach(function(item, i, arr) {
				if ((item.name == selector) && !result) {
					result = item;
				}
			});
			if (result) return result;

			
			Lib.mentors.forEach(function(item, i, arr) {
				if ((item.name == selector) && !result) {
					result = item;
				}
			});
			if (result) return result;
			
			
			Lib.tasks.forEach(function(item, i, arr) {
				if ((item.title == selector) && !result) {
					result = item;
				}
			});
			if (result) return result;
			
			
			Lib.teams.forEach(function(item, i, arr) {
				if ((item.name == selector) && !result) {
					result = item;
				}
			});
			if (result) return result;

		} else if (selector instanceof LibObject) {
			return selector;
		}

		if (result == undefined) {
			return false;
			// throw new Error('Объект '+selector+' не найден');
		}
		return result;

	}
};

var user = new Student('Никита');
window.Lib = Lib;
// Lib.students.push(new Student('Никита'));
// Lib.students.push(new Student('Леся'));
})();