class Team extends LibObject {
	constructor(newId, newName, newTeammates) {
		super();
		this.teamId = newId;
		this.name = newName;
		this.teamTasks = [];
		this.teammates = (newTeammates !== undefined) 
			? newTeammates
			: [];
	}

	set id(newId) {
		throw new Error('Нельзя менять ID.');
		return;
	}
	get id() {
		return this.teamId;
	}

	set name(str) {
		this.teamName = str;
	}
	get name(){
		return this.teamName;
	}

	set teammates(arr) {
		this.teamTeammates = arr;
	}
	get teammates() {
		return this.teamTeammates;
	}

	addTeammates(students) {
		if (students instanceof LibObject) {
			this.teamTeammates.push(students);	
		} else if (isArray(students)) {
			students.forEach(function(item, i, arr){
				this.teamTeammates.push(item);
			});
		}
		return this;
	}

	removeTeammates(arr) {
		let self = this;
		arr.forEach(function(item, i, arr){
			let student = Lib.select(item);
			if (!student) console.log('Студент '+ item +' не найден.');
			let index = self.teamTeammates.indexOf(student);
			if (index !== -1) {
				self.teamTeammates.splice(index,1);
			}
		});
		return this;
	}

	addTasks(tasks, stop = false) {
		var self = this;
		if (tasks instanceof LibObject) {
			for (let item in self.studentTasks) {
				if (tasks == item.task) return;
			}
			let taskRecord = {
				task: tasks,
				mark: 0
			}
			this.teamTasks.push(taskRecord);
			if (stop) return;
			tasks.addExecutors(this, true);
		} else if (Array.isArray(tasks)) {
			tasks.forEach(function(item, i, arr){
				if (item instanceof Task) {
					for (let innerItem in self.teamTasks) {
						if (item == innerItem.task) return;
					}
					let taskRecord = {
						task: item,
						mark: 0
					}
					self.teamTasks.push(taskRecord);
					if (stop) return;
					item.addExecutors(self, true);
				}
			});
		}
		return this;
	}

	removeTasks(arr) {
		let self = this;
		arr.forEach(function(item, i, arr){
			let task = Lib.select(item);
			if (!task) {
				console.log('Студент '+ item +' не найден.');
				return;
			}
			let index = self.teamTasks.indexOf(task);
			if (index !== -1) {
				self.teamTasks.splice(index,1);
			}
		});
		return this;
	}

	setMark(selector, mark) {
		let task = Lib.select(selector);
		if (!task || !(task instanceof Task)) {
			throw new Error('Задание '+selector+' не найдено.');
		}
		this.teamTasks.forEach(function(item, i, arr) {
			if (item.task == task) {
				item.mark = mark;
			}
		});
		return this;
	}

}