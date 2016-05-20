class Mentor {
	constructor(newName, newPreferredStudentsList) {
		this.name = newName;
		this.preferredStudentsList = (newPreferredStudentsList !== undefined)
			? newPreferredStudentsList
			: [];
	}
	
}