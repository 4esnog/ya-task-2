class Student extends LibObject {
	constructor(newId, newName, newMentors, newTeam) {
		super();
		this.studentId = newId;
		this.studentTasks = [];
		this.name = newName;
		// if (newTeam !== undefined) this.team = newTeam;
		this.preferredMentorsList = (newMentors !== undefined)
			? newMentors
			: [];
	}


	set id(newId) {
		throw new Error('Нельзя менять ID.');
		return;
	}
	get id() {
		return this.studentId;
	}

	set name(str) {
		this.studentName = str;
	}
	get name(){
		return this.studentName;
	}

	set team(obj) {
		this.studentTeam = obj;
	}
	get team() {
		return this.studentTeam;
	}

	set preferredMentorsList(arr) {
		if (typeof arr !== typeof [] ) {
			throw new Error('Список должен быть массивом.');
			return;
		}

		arr = arr.map(function(item, i, arr){
			let mentor = Lib.select(item);
			if (!(mentor instanceof Mentor)) mentor = false;
			return mentor;
		});

		this.studentPreferredMentorsList = arr.filter(function(item, i, arr){
			if (item === false) {
				return false;
			} else {
				return true;
			}
		});
	}
	get preferredMentorsList() {
		this.studentPreferredMentorsList;
	}

	addTasks(tasks, stop = false) {
		var self = this;
		if (tasks instanceof Task) {
			for (let item in this.studentTasks) {
				if (tasks == item.task) return;
			}
			let taskRecord = {
				task: tasks,
				mark: 0
			}
			this.studentTasks.push(taskRecord);	
			if (stop) return;
			tasks.addExecutors(this, true);
		} else if (Array.isArray(tasks)) {
			tasks.forEach(function(item, i, arr){
				if (item instanceof Task) {
					for (let innerItem in self.studentTasks) {
						if (item == innerItem.task) return;
					}
					let taskRecord = {
						task: item,
						mark: 0
					}
					self.studentTasks.push(taskRecord);
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
			let index = self.studentTasks.indexOf(task);
			if (index !== -1) {
				self.studentTasks.splice(index,1);
			}
		});
		return this;
	}

	setMark(selector, mark) {
		let task = Lib.select(selector);
		if (!task || !(task instanceof Task)) {
			throw new Error('Задание '+selector+' не найдено.');
		}
		this.studentTasks.forEach(function(item, i, arr){
			if (item.task == task) {
				item.mark = mark;
			}
		});

		return this;
	}

}