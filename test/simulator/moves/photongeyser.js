'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Photon Geyser', function () {
	afterEach(function () {
		battle.destroy();
	});

	it("should use the user's special attack stat if that's higher than its attack", function () {
		battle = common.createBattle([
			[{species: 'Duosion', ability: 'trace', moves: ['photongeyser']}],
			[{species: 'Weezing', ability: 'levitate', moves: ['toxic']}],
		]);
		battle.commitDecisions();
		assert.fainted(battle.p2.active[0]);
	});

	it("should use the user's attack stat if that's higher than its special attack", function () {
		battle = common.createBattle([
			[{species: 'Rampardos', ability: 'moldbreaker', moves: ['photongeyser']}],
			[{species: 'Weezing', ability: 'levitate', moves: ['toxic']}],
		]);
		battle.commitDecisions();
		assert.fainted(battle.p2.active[0]);
	});

	it("should not be affected by burn when the user's special attack is higher", function () {
		battle = common.createBattle([
			[{species: 'Lunatone', ability: 'levitate', moves: ['photongeyser']}],
			[{species: 'Flareon', ability: 'noguard', item: 'laggingtail', moves: ['willowisp']}],
		]);
		const target = battle.p2.active[0];
		battle.commitDecisions();
		const baseDamage = target.maxhp - target.hp;
		battle.resetRNG();
		battle.resetRNG();
		battle.commitDecisions();
		assert.hurtsBy(target, baseDamage, () => battle.commitDecisions());
	});

	it("should be affected by burn when the user's attack is higher", function () {
		battle = common.createBattle([
			[{species: 'Solrock', ability: 'levitate', moves: ['photongeyser']}],
			[{species: 'Flareon', ability: 'noguard', item: 'laggingtail', moves: ['willowisp']}],
		]);
		const target = battle.p2.active[0];
		battle.commitDecisions();
		const baseDamage = target.maxhp - target.hp;
		battle.resetRNG();
		battle.commitDecisions();
		assert.hurtsBy(target, battle.modify(baseDamage, 0.5), () => battle.commitDecisions());
	});
});
