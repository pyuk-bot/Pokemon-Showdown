'use strict';

const RandomTeams = require('../../data/random-teams');

class RandomStaffBrosTestTeams extends RandomTeams {
	randomStaffBrosTestTeam() {
		let team = [];
		let variant = (this.random(2) === 1);
		let sets = {
			'cant say': {
				species: 'Aegislash', ability: 'Stance Change', item: 'Weakness Policy', gender: 'M',
				moves: ['Shift Gear', 'Spectral Thief', 'Sacred Sword'],
				signatureMove: 'blade of ~aesthetics~',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Adamant',
			},
			'sirDonovan': {
				species: 'Togetic', ability: 'Gale Wings', item: 'Eviolite', gender: 'M',
				moves: ['Roost', 'Hurricane', 'Charm'],
				signatureMove: 'Ladies First',
				evs: {hp: 252, spa: 252, spe: 4}, nature: 'Modest',
			},
			'SpaceBass': {
				species: 'foongus', ability: 'Prankster', item: 'Eviolite', gender: 'M', // ask gender
				moves: ['Baton Pass', 'Ingrain', 'Substitute'],
				signatureMove: 'Army of Mushrooms',
				evs: {hp: 252, def: 128, spd: 128}, nature: 'Sassy',
			},
			'Tiksi': {
				species: 'Cradily', ability: 'Sand Stream', item: 'Leftovers', gender: 'M',
				moves: ['Shore Up', 'Rock Slide', ['Swords Dance', 'Curse'][this.random(2)]],
				signatureMove: 'Devolution Wave',
				evs: {hp: 248, atk: 252, spd: 8}, nature: 'Adamant',
			},
		};

		// Generate the team randomly.
		let pool = Object.keys(sets);
		while (team.length < 6 && pool.length) {
			let name = this.sampleNoReplace(pool);
			let set = sets[name];
			set.level = 100;
			set.name = name;
			if (!set.ivs) {
				set.ivs = {hp:31, atk:31, def:31, spa:31, spd:31, spe:31};
			} else {
				for (let iv in {hp:31, atk:31, def:31, spa:31, spd:31, spe:31}) {
					set.ivs[iv] = iv in set.ivs ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal.
			if (!set.evs) set.evs = {hp:84, atk:84, def:84, spa:84, spd:84, spe:84};
			set.moves = [this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves), this.sampleNoReplace(set.moves)].concat(set.signatureMove);
			team.push(set);
		}

		return team;
	}
}

module.exports = RandomStaffBrosTestTeams;
