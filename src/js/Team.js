class Team {
	constructor(newName, newTeammates) {
		this.name = newName;
		this.teamTeammates = (newTeammates !== undefined) 
			? newTeammates
			: [];
	}

	addTeammate(student) {
		this.teamTeammates.push(student);
	}
}