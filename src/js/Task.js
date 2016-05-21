class Task extends LibObject {
	constructor(newId, newTitle, newContent, newExecutors) {
		super();
		this.taskId = newId;
		this.title = newTitle;
		this.content = newContent;
		this.taskExecutors = (newExecutors !== undefined)
			? newExecutors
			: [];
	}

	set id(newId) {
		throw new Error('Нельзя менять ID.');
		return;
	}
	get id() {
		return this.taskId;
	}

	set title(str) {
		this.taskTitle = str;
	}
	get title(){
		return this.taskTitle;
	}

	set content(str) {
		this.taskContent = str;
	}
	get content() {
		return this.taskContent;
	}

	// set executors(arr) {
	// 	this.taskExecutors = arr;
	// }
	get executors() {
		return this.taskExecutors
	}

	addExecutors(executors, stop = false) {
		var self = this;
		if (executors instanceof LibObject) {
			if (executors in this.taskExecutors) return;
			this.taskExecutors.push(executors);
			if (stop) return;
			executors.addTasks(this, true);
		} else if (Array.isArray(executors)) {
			executors.forEach(function(item, i, arr){
				if (item in self.taskExecutors) return;
				self.taskExecutors.push(item);
				if (stop) return;
				item.addTasks(self, true);
			});
		}
		return this;
	}

	removeExecutors(arr) {
		let self = this;
		arr.forEach(function(item, i, arr){
			let executor = Lib.select(item);
			if (!executor) {
				console.log('Студент '+ item +' не найден.');
				return;
			}
			let index = self.taskExecutors.indexOf(executor);
			if (index !== -1) {
				self.taskExecutors.splice(index,1);
			}
		});
		return this;
	}

}