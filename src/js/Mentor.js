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

		arr = arr.map(function(item, i, arr){
			let student = Lib.select(item);
			if (!(student instanceof Student)) student = false;
			return student;
		});

		// this.mentorPreferredStudentsList = arr;

		this.mentorPreferredStudentsList = arr.filter(function(item, i, arr){
			if (item === false) {
				return false;
			} else {
				return true;
			}
		});
	}
	get preferredStudentsList() {
		return this.mentorPreferredStudentsList;
	}
	
}