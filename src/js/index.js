'use strict';
(function(){

//=require Student.js
//=require Task.js
//=require Team.js
//=require Mentor.js

var Lib = {
	add: function(type, options, ...args){
		switch (type) {
			
			case 'student':
				let newStudent = new Student(options.name, options.team, options.mentorsList);
				Lib.students.push(newStudent);
				console.log('Added new Student.');
				console.dir(newStudent);
				return newStudent;
			break;

			case 'task':
				let newTask = new Task(options.title, options.executors);
				Lib.tasks.push(newTask);
				console.log('Added new Task.');
				console.dir(newTask);
				return newTask;
			break;

			case 'team':
				let newTeam = new Team(options.name, options.teammates);
				Lib.teams.push(newTeam);
				console.log('Added new Team.');
				console.dir(newTeam);
				return newTeam;
			break;

			case 'mentor':
				let newMentor = new Mentor(options.name, options.preferredStudents)
				Lib.mentors.push(newMentor);
				console.log('Added new Mentor.');
				console.dir(newMentor);
				return newMentor;
				break;
		}
	},
	students: [],
	mentors: [],
	tasks: [],
	teams: []
};

var user = new Student('Никита');
window.Lib = Lib;
// Lib.students.push(new Student('Никита'));
// Lib.students.push(new Student('Леся'));
})();