class Student {
	constructor(newName, newTeam, newMentors) {
		this.tasks = [];
		this.name = newName;
		if (newTeam !== undefined) this.team = newTeam;
		this.mentorsPriorityList = (newMentors !== undefined)
			? newMentors
			: [];
	}

	setMark(task, mark) {
		this.studMarks.push({[task.id]: mark});
	}

	set marks(arr) {
		this.studMarks = arr;
	}

	set name(str) {
		this.studName = str;
	}

	get marks() {
		return this.studMarks;
	}

	get name() {
		return this.studName;
	}
}