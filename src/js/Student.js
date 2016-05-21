class Student extends LibObject {
	constructor(newId, newName, newMentors, newTeam) {
		super();
		this.studentId = newId;
		this.tasks = [];
		this.name = newName;
		// if (newTeam !== undefined) this.team = newTeam;
		this.mentorsPriorityList = (newMentors !== undefined)
			? newMentors
			: [];
	}

	setMark(task, mark) {
		this.studMarks.push({[task.id]: mark});
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

	// set marks(arr) {
	// 	this.studMarks = arr;
	// }


	// get marks() {
	// 	return this.studMarks;
	// }

}