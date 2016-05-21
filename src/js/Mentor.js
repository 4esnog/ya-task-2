class Mentor extends LibObject {
	constructor(newId, newName, newPreferredStudentsList) {
		super();
		this.mentorId = newId;
		this.name = newName;
		this.preferredStudentsList = (newPreferredStudentsList !== undefined)
			? newPreferredStudentsList
			: [];
	}

	set id(newId) {
		throw new Error('Нельзя менять ID.');
		return;
	}
	get id() {
		return this.mentorId;
	}

	set name(str) {
		this.mentorName = str;
	}
	get name(){
		return this.mentorName;
	}

	set preferredStudentsList(arr) {
		if (typeof arr !== typeof [] ) {
			throw new Error('Список должен быть массивом.');
			return;
		}
	}

	
}