class Task {
	
	constructor(newTitle, newExecutors) {
		this.taskTitle = newTitle;
		this.taskExecutors = (newExecutors !== undefined)
			? newExecutors
			: [];
	}



}