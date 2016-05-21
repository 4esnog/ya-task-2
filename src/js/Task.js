class Task extends LibObject {
	constructor(newId, newTitle, newExecutors) {
		super();
		this.taskId = newId;
		this.title = newTitle;
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



}