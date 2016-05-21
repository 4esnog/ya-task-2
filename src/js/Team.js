class Team extends LibObject {
	constructor(newId, newName, newTeammates) {
		super();
		this.teamId = newId;
		this.name = newName;
		this.teamTeammates = (newTeammates !== undefined) 
			? newTeammates
			: [];
	}

	set id(newId) {
		throw new Error('Нельзя менять ID.');
		return;
	}
	get id() {
		return this.teamId;
	}

	set name(str) {
		this.teamName = str;
	}
	get name(){
		return this.teamName;
	}

	addTeammate(student) {
		this.teamTeammates.push(student);
	}

	removeTeammates(arr) {
		let self = this;
		arr.forEach(function(item, i, arr){
			let student = Lib.select(item);
			if (!student) console.log('Студент '+ item +' не найден.');
			let index = self.teamTeammates.indexOf(student);
			if (index !== -1) {
				self.teamTeammates.splice(index,1);
			}
		});
	}
}