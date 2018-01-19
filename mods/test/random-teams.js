'use strict';

const RandomTeams = require('../../data/random-teams');

class RandomStaffBrosTestTeams extends RandomTeams {
	randomStaffBrosTestTeam() {
		let team = [];
		let variant = (this.random(2) === 1);
		let sets = {
			'Acast': {
				species: 'Decidueye', ability: 'Stealth', item: 'Decidium Z', gender: 'M', // ask gender
				moves: ['Spirit Shackle', 'Thousand Arrows', ['High Jump Kick', 'Brave Bird', 'Shadow Sneak'][this.random(3)]],
				signatureMove: 'Arrow Dance',
				evs: {hp: 4, atk: 252, spe: 252}, nature: 'Jolly',
			},
			'Chloe': {
				species: 'Vileplume', ability: 'Prankster', item: 'Light Clay', gender: 'F',
				moves: ['Parting Shot', 'Topsy Turvy', 'Encore'],
				signatureMove: 'Added Preservatives',
				evs: {hp: 252, def: 252, spd: 4}, nature: 'Bold',
			},
			'Duck': {
				species: 'Farfetch\'d', ability: 'Sniper', item: 'Stick', gender: 'M',
				moves: ['Shift Gear', 'Superpower', 'Dragon Ascent'],
				signatureMove: 'Holy Duck!',
				evs: {atk: 252, spd: 4, spe: 252}, nature: 'Jolly',
			},
			'Iyarito': {
				species: 'Gengar', ability: 'Fur Coat', item: 'Psychium Z', gender: 'M', // Ask gender
				moves: ['Hypnosis', 'Dream Eater', 'Secret Sword'],
				signatureMove: 'Iya\'s Rage',
				evs: {hp: 184, spa: 252, spe: 60}, nature: 'Timid',
			},
			'Jasmine': {
				species: 'Mew', ability: 'Speed Boost', item: 'Focus Sash', gender: 'F',
				moves: ['Taunt', 'Explosion', 'Protect'],
				signatureMove: 'Reverse Transform',
				evs: {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84}, nature: 'Quirky',
			},
			'NOVED': {
				species: 'Kangaskhan', ability: 'Scrappy', item: 'Kangaskhanite', gender: 'F',
				moves: ['Extreme Speed', 'Knock Off', 'Snatch'],
				signatureMove: 'For the Kids',
				evs: {hp: 252, atk: 252, spe: 4}, nature: 'Adamant',
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
			if (name === 'Ascriptmaster') {
				// item hack
				let type = [this.getMove(set.moves[0]).type, this.getMove(set.moves[1]).type, this.getMove(set.moves[2]).type][this.random(3)];
				set.item = {'Grass': 'Grassium Z', 'Fire': 'Firium Z', 'Water': 'Waterium Z', 'Ice': 'Icium Z', 'Flying': 'Flyinium Z'}[type];
			}
			team.push(set);
		}

		return team;
	}
}

module.exports = RandomStaffBrosTestTeams;
