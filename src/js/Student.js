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
		if (!Array.isArray(arr)) {
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
		return this.studentPreferredMentorsList;
	}

	addPreferredMentor(mentor, priority) {
		if ((typeof priority === 'number') || !isNaN(mentor)) {
			priority = parseInt(priority);
		} else {
			throw new Error('Приоритет должен быть числом.')
		}

		if (!(mentor instanceof Mentor))
			mentor = Lib.select(selector);
		if (!(mentor instanceof Mentor))
			throw new Error('В список менторов можно добавлять только менторов.');

		let mentorOldIndex = this.studentPreferredMentorsList.indexOf(mentor);
		if (mentorOldIndex !== -1) {
			this.studentPreferredMentorsList.splice(mentorOldIndex, 1);
		}
		this.studentPreferredMentorsList.splice(priority-1, 0, mentor);
		
		return this;
	}

	addTasks(tasks, stop = false) {
		var self = this;
		var taskIsSet = false;
		if (tasks instanceof Task) {
			this.studentTasks.forEach(function(item, i, arr) {
				if (tasks == item.task) taskIsSet = true;
			});
			if (taskIsSet) return;
			let taskRecord = {
				task: tasks,
				mark: 0
			}
			this.studentTasks.push(taskRecord);	
			if (stop) return;
			tasks.addExecutors(this, true);
		} else if (Array.isArray(tasks)) {
			tasks.forEach(function(item, i, arr){
				item = Lib.select('item');

				self.studentTasks.forEach(function(innerItem, i, arr) {
					if (item == innerItem.task) taskIsSet = true;
				});
				if (taskIsSet) return;

				let taskRecord = {
					task: item,
					mark: 0
				}
				self.studentTasks.push(taskRecord);
				if (stop) return;
				item.addExecutors(self, true);
				
			});
		}
		return this;
	}

	removeTasks(arr) {
		let self = this;
		arr.forEach(function(item, i, arr){
			let task = Lib.select(item);
			if (!task) {
				console.log('Задание '+ item +' не найдено.');
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