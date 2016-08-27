/* #D&D 5e Point-Buy Calculator
 ================================================== */
/*
 *  Version     1.2
 *  Author:     Sha Kong-Brooks
 *  Website:    http://shianra.com
 ================================================== */

var attrNames = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
var points = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 7, 9];
var modifiers = [-5, -5, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];

/**
 * @desc The racial stats.
 */
var racialStr = 0;
var racialDex = 0;
var racialCon = 0;
var racialInt = 0;
var racialWis = 0;
var racialCha = 0;

/**
 * @desc The table cells where the racial stats will be displayed.
 */
var racialStrTD = 'td#racialStr';
var racialDexTD = 'td#racialDex';
var racialConTD = 'td#racialCon';
var racialIntTD = 'td#racialInt';
var racialWisTD = 'td#racialWis';
var racialChaTD = 'td#racialCha';

/**
 * @desc The header for the racial traits section.
 */
var racialTraitsHeader = '<h3>Racial Traits</h3>';
var dlHorizontal = '<dl class="dl-horizontal clearfix">';
var dtColSm3 = '<dt class="col-xl-3">';
var dtEnd = '</dt>';
var ddColSm9 = '<dd class="col-xl-9">';
var ddEnd = '</dd>';
var dlEnd = '</dl>';

/**
 * @desc The table cells where the racial variant information will be displayed.
 */
var raceLabel = 'div#raceLabel';
var raceList = 'div#raceList';
var variantLabel = 'div#variantLabel';
var variantList = 'div#variantList';
var optionLabel1 = 'div#optionLabel1';
var optionChoice1 = 'div#optionChoice1';
var optionLabel2 = 'div#optionLabel2';
var optionChoice2 = 'div#optionChoice2';
var raceDescription = 'div#raceDescription';
var racialVariantInfo = 'div#racialVariant';

var racialInfo = [];
racialInfo[0] = {
    name: 'Dragonborn',
    ability: 'Your Strength score increases by 2, and your Charisma score increases by 1.',
    age: 'Young dragonborn grow quickly. They walk hours after hatching, attain the size and development of a' +
    ' 10-year-old human child by the age of 3, and reach adulthood by 15. They live to be around 80.',
    alignment: 'Dragonborn tend to extremes, making a conscious choice for one side or the other in the cosmic war' +
    ' between good and evil (represented by Bahamut and Tiamat, respectively). Most dragonborn are good, but those' +
    ' who side with Tiamat can be terrible villains.',
    size: 'Dragonborn are taller and heavier than humans, standing well over 6 feet tall and averaging almost 250' +
    ' pounds. Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common and Draconic. Draconic is thought to be one of the oldest' +
    ' languages and is often used in the study of magic. The language sounds harsh to most other creatures and' +
    ' includes numerous hard consonants and sibilants.',
    other: ['Draconic Ancestry',
        'You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon' +
        ' and damage resistance are determined by the dragon type, as shown in the table.',
        'Breath Weapon',
        'You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, ' +
        ' and damage type of the exhalation. When you use your breath weapon, each creature in the area of the' +
        ' exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC' +
        ' for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes' +
        ' 2d6 damage on a failed save. and half as much damage on a successful one. The damage increases to 3d6 at' +
        ' 6th level. 4d6 at 11th level, and 5d6 at 16th level. After you use your breath weapon, you can\'t use it' +
        ' again until you complete a short or long rest.',
        'Damage Resistance',
        'You have resistance to the damage type associated with your draconic ancestry.']
};
racialInfo[1] = {
    name: 'Dwarf',
    ability: 'Your Con score increases by 2.',
    age: 'Dwarves mature at the same rate as humans, but they&#039;re considered young until they reach the age' +
    ' of 50. On average, they live about 350 years.',
    alignment: 'Most dwarves are lawful, believing firmly in the benefits of a well-ordered society. They tend' +
    ' toward good as well, with a strong sense of fair play and a belief that everyone deserves to share in the' +
    ' benefits of a just order.',
    size: 'Dwarves stand between 4 and 5 feet tall and average about 150 pounds. Your size is Medium.',
    speed: 'Your base walking speed is 25 feet. Your speed is not reduced by wearing heavy armor.',
    language: 'You can speak, read, and write Common and Dwarvish. Dwarvish is full of hard consonants and' +
    ' guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak.',
    other: ['Darkvision',
        'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim' +
        ' light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You' +
        ' can&#039;t discern color in darkness, only shades of grey.',
        'Dwarven Resilience',
        'You have advantage on saving throws against poison, and you have resistance against poison damage.',
        'Dwarven Combat Training',
        'You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.',
        'Tool Proficiency',
        'You gain proficiency with the artisan&#039;s tools of your choice: smith&#039;s tools, brewer&#039;s' +
        ' supplies, or mason&#039;s tools.',
        'Stonecunning',
        'Whenever you make an Int (History) check related to the origin of stonework, you are' +
        ' considered proficient in the History skill and add double your proficiency bonus to the check, instead' +
        ' of your normal proficiency bonus.'],
    variants: [{
        name: 'Hill Dwarf',
        ability: 'Your Wis score increases by 1.',
        other: ['Dwarven Toughness',
            'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.']
    }, {
        name: 'Mountain Dwarf',
        ability: 'Your Str score increases by 2.',
        other: ['Dwarven Armor Training',
            'You have proficiency with light and medium armor.']
    }]
};
racialInfo[2] = {
    name: 'Elf',
    ability: 'Your Dex score increases by 2.',
    age: 'Although elves reach physical maturity at about the same age as humans, the elven understanding of' +
    ' adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and' +
    ' an adult name around the age of 100 and can live to be 750 years old.',
    alignment: 'Elves love freedom, variety, and self-expression, so they lean strongly toward the gentler aspects' +
    ' of chaos. They value and protect others&#039; freedom as well as their own, and they are more often good than' +
    ' not. The drow are an exception; their exile into the Underdark has made them vicious and dangerous. Drow are' +
    ' more often evil than not.',
    size: 'Elves range from under 5 to over 6 feet tall and have slender builds. Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common and Elvish. Elvish is fluid, with subtle intonations and' +
    ' intricate grammar. Elven literature is rich and varied, and their songs and poems are famous among other races.' +
    ' Many bards learn their language so they can add Elvish ballads to their repertoires.',
    other: ['Darkvision',
        'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim' +
        ' light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You' +
        ' can&#039;t discern color in darkness, only shades of grey.',
        'Keen Senses',
        'You have proficiency in the Perception skill.',
        'Fey Ancestry',
        'You have advantage on saving throws against being charmed, and magic can&#039;t put you to sleep.',
        'Trance',
        'Elves don&#039;t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day.' +
        ' (The Common word for such meditation is &quot;trance.&quot;) While meditating, you can dream after a' +
        ' fashion; such dreams are actually mental exercises that have become reflexive through years of practice.' +
        ' After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.'],
    variants: [{
        name: 'Dark Elf (Drow)',
        ability: 'Your Cha score increases by 1.',
        other: ['Superior Darkvision',
            'Your darkvision has a radius of 120 feet.',
            'Sunlight Sensitivity',
            'You have disadvantage on attack rolls and on Wis (Perception) checks that rely on sight when you,' +
            ' the target of your attack, or whatever you are trying to perceive is in direct sunlight.',
            'Drow Magic',
            'You know the <em>dancing lights</em> cantrip. When you reach 3rd level, you can cast the <em>faerie' +
            ' fire</em> spell once per day. When you reach 5th level, you can also cast the <em>darkness</em> spell' +
            ' once per day. Cha is your spellcasting ability for these spells.',
            'Drow Weapon Training',
            'You have proficiency with rapiers, shortswords, and hand crossbows.']
    }, {
        name: 'High Elf',
        ability: 'Your Int score increases by 1.',
        other: ['Elf Weapon Training',
            'You have proficiency with the longsword, shortsword, shortbow, and longbow.',
            'Cantrip',
            'You know one Cantrip of your choice from the wizard spell list. Int is your spellcasting ability for it.',
            'Extra Language',
            'You can speak, read, and write one extra language of your choice.']
    }, {
        name: 'Wood Elf',
        ability: 'Your Wis score increases by 1.',
        other: ['Elf Weapon Training',
            'You have proficiency with the longsword, shortsword, shortbow, and longbow.',
            'Fleet of Foot',
            'Your base walking speed increases to 35 feet.',
            'Mask of the Wild',
            'You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow,' +
            ' mist, and other natural phenomena.']
    }]
};
racialInfo[3] = {
    name: 'Gnome',
    ability: 'Your Int score increases by 2.',
    age: 'Gnomes mature at the same rate humans do, and most are expected to settle down into an adult life by' +
    ' around age 40. They can live 350 to almost 500 years.',
    alignment: 'Gnomes are most often good. Those who lend toward law are sages, engineers, researchers, scholars,' +
    ' investigators, or inventors. Those who lend toward chaos are minstrels, tricksters, wanderers, or fanciful' +
    ' jewelers. Gnomes are good-hearted, and even the tricksters among them are more playful than vicious.',
    size: 'Gnomes are between 3 and 4 feet tall and average about 40 pounds. Your size is Small.',
    speed: 'Your base walking speed is 25 feet.',
    language: 'You can speak, read, and write Common and Gnomish. The Gnomish language, which uses the Dwarvish' +
    ' script, is renowned for its technical treatises and its catalogs of knowledge about the natural world.',
    other: ['Darkvision',
        'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim' +
        ' light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You' +
        ' can&#039;t discern color in darkness, only shades of grey.',
        'Gnome Cunning',
        'You have advantage on all Int, Wis, and Cha saving throws against magic.'],
    variants: [{
        name: 'Forest Gnome',
        ability: 'Your Dex score increases by 1.',
        other: ['Natural Illusionist',
            'You know the <em>minor illusion</em> cantrip. Int is your spellcasting ability for it.',
            'Speak with Small Beasts',
            'Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts. Forest' +
            ' gnomes love animals and often keep squirrels, badgers, rabbits, moles, woodpeckers, and other' +
            ' creatures as beloved pets.']
    }, {
        name: 'Rock Gnome',
        ability: 'Your Con score increases by 1.',
        other: ['Artificer&#039;s Lore',
            'Whenever you make an Int (History) check related to magic items, alchemical objects, or technological' +
            ' devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.',
            'Tinker',
            'You have proficiency with artisan&#039;s tools (tinker&#039;s tools). Using those tools, you can spend' +
            ' 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device' +
            ' ceases to function after 24 hours (unless you spend 1 hour repairing it to keep the device' +
            ' functioning), or when you use your action to dismantle it; at that time, you can reclaim the' +
            ' materials used to create it. You can have up to three such devices active at a time. When you create' +
            ' a device, choose one of the following options:<ul><li><strong>Clockwork Toy</strong>: This toy is a' +
            ' clockwork animal, monster, or person, such as a frog, mouse, bird, dragon, or soldier. When placed on' +
            ' the ground, the toy moves 5 feet across the ground on each of your turns in a random direction. It' +
            ' makes noises as appropriate to the creature it represents.</li><li><strong>Fire Starter</strong>: The' +
            ' device produces a miniature flame, which you can use to light a candle, torch, or campfire. Using' +
            ' the device requires your action.</li><li><strong>Music Box</strong>: When opened, this music box' +
            ' plays a single song at a moderate volume. The box stops playing when it reaches the song&#039;s end' +
            ' or when it is closed.</li></ul>']
    }]
};
racialInfo[4] = {
    name: 'Half-Elf',
    ability: 'Your Cha score increases by 2, and two other ability scores of your choice increase by 1.',
    age: 'Half-elves mature at the same rate humans do and reach adulthood around the age of 20. They live much' +
    ' longer than humans, however, often exceeding 180 years.',
    alignment: 'Half-elves share the chaotic bent of their elven heritage. They value both personal freedom and' +
    ' creative expression, demonstrating neither love of leaders nor desire for followers. They chafe at rules,' +
    ' resent others&#039; demands, and sometimes prove unreliable, or at least unpredictable.',
    size: 'HaIf-elves are about the same size as humans, ranging from 5 to 6 feet tall. Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common, Elvish, and one extra language of your choice.',
    other: ['Darkvision',
        'Thanks to your elf-blood, you have superior vision in dark and dim conditions. You can see in dim light' +
        ' within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can&#039;t' +
        ' discern color in darkness, only shades of grey.',
        'Fey Ancestry',
        'You have advantage on saving throws against being charmed, and magic can&#039;t put you to sleep.',
        'Skill Versatility',
        'You gain proficiency in two skills of your choice.'],
    variants: []
};
racialInfo[5] = {
    name: 'Half-Orc',
    ability: 'Your Str score increases by 2, and your Con score increases by 1.',
    age: 'Half-orcs mature a tittle faster than humans, reaching adulthood around age 14. They age noticeably faster' +
    ' and rarely live longer than 75 years.',
    alignment: 'Half-orcs inherit a tendency toward chaos from their orc parents and are not strongly inclined toward' +
    ' good. Half-orcs raised among orcs and willing to live out their lives among them are usually evil.',
    size: 'Half-orcs are somewhat larger and bulkier than humans, and they range from 5 to well over 6 feet tall.' +
    ' Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common and Orc. Orc is a harsh, grating language with hard consonants.' +
    ' It has no script of its own but is written in the Dwarvish script.',
    other: ['Darkvision',
        'Thanks to your orc blood, you have superior vision in dark and dim conditions. You can see in dim light' +
        ' within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You ean&#039;t' +
        ' discern color in darkness, only shades of grey.',
        'Menacing',
        'You gain proficiency in the Intimidation skill.',
        'Relentless Endurance',
        'When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You' +
        ' can&#039;t use this feature again until you finish a long rest.',
        'Savage Attacks',
        'When you score a critical hit with a melee weapon attack, you can roll one of the weapon&#039;s damage' +
        ' dice one additional time and add it to the extra damage of the critical hit.']
};
racialInfo[6] = {
    name: 'Halfling',
    ability: 'Your Dex score increases by 2.',
    age: 'A halfling reaches adulthood at the age of 20 and generally lives into the middle of his or her second' +
    ' century.',
    alignment: 'Most halflings are lawful good. As a rule, they are good-hearted and kind, hate to see others in' +
    ' pain, and have no tolerance for oppression. They are also very orderly and traditional, leaning heavily on the' +
    ' support of their community and the comfort of their old ways.',
    size: 'Halflings average about 3 feet tall and weigh about 40 pounds. Your size is Small.',
    speed: 'Your base walking speed is 25 feet.',
    language: 'You can speak, read, and write Common and Halfling. The Halfling language isn&#039;t secret, but' +
    ' halflings are loath to share it with others. They write very little, so they don&#039;t have a rich body of' +
    ' literature. Their oral tradition, however, is very strong. Almost all halflings speak Common to converse with' +
    ' the people in whose lands they dwell or through which they are traveling.',
    other: ['Lucky',
        'When you roll a 1 on an attack roll, ability check, or saving throw, you can re-roll the die and must use' +
        ' the new roll.',
        'Brave',
        'You have advantage on saving throws against being frightened.',
        'Halfling Nimbleness',
        'You can move through the space of any creature that is of a size larger than yours.'],
    variants: [{
        name: 'Lightfoot Halfling',
        ability: 'Your Cha score increases by 1.',
        other: ['Naturally Stealthy',
            'You can attempt to hide even when you are obscured only by a creature that is at least one size larger' +
            ' than you.']
    }, {
        name: 'Stout Halfling',
        ability: 'Your Con score increases by 1.',
        other: ['Stout Resilience',
            'You have advantage on saving throws against poison, and you have resistance against poison damage.']
    }]
};
racialInfo[7] = {
    name: 'Human',
    ability: 'Your ability scores each increase by 1.',
    age: 'Humans reach adulthood in their late teens and live less than a century.',
    alignment: 'Humans tend toward no particular alignment. The best and the worst are found among them.',
    size: 'Humans vary widely in height and build, from barely 5 feet to well over 6 feet tall. Regardless of your' +
    ' position in that range, your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common and one extra language of your choice. Humans typically learn' +
    ' the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their' +
    ' speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military' +
    ' phrases, and so on.',
    other: [],
    variants: [{
        name: 'Disabled'
    }, {
        name: 'Enabled',
        ability: 'Two different ability scores of your choice increase by 1.',
        other: ['Skills',
        'You gain proficiency in one skill of your choice.',
        'Feat',
        'You gain one feat of your choice.']
    }]
};
racialInfo[8] = {
    name: 'Tiefling',
    ability: 'Your Int score increases by 1, and your Cha score increases by 2.',
    age: 'Tieflings mature at the same rate as humans but live a few years longer.',
    alignment: 'Tieflings might not have an innate tendency toward evil, but many of them end up there. Evil or not,' +
    ' an independent nature inclines many tieflings toward a chaotic alignment.',
    size: 'Tieflings are about the same size and build as humans. Your size is Medium.',
    speed: 'Your base walking speed is 30 feet.',
    language: 'You can speak, read, and write Common and Infernal.',
    other: ['Darkvision',
        'Thanks to your infernal heritage, you have superior vision in dark and dim conditions. You can see in dim' +
        ' light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You' +
        ' can&#039;t discern color in darkness, only shades of grey.',
        'Hellish Resistance',
        'You have resistance to fire damage.',
        'Infernal Legacy',
        'You know the <em>thaumaturgy</em> cantrip. Once you reach 3rd level, you can cast the <em>hellish' +
        ' rebuke</em> spell once per day as a 2nd-level spell. Once you reach 5th level, you can also cast the' +
        ' <em>darkness</em> spell once per day. Cha is your spellcasting ability for these spells.'],
    variants: []
};

/* -----------------------------------------------------
 All the cool stuff
 ----------------------------------------------------- */

/**
 * @func attrOptions
 * @returns {string}
 */
var attrOptions = function () {
    var options = '<option disabled selected>---</option>';
    attrNames.forEach(function (item) {
        options += '<option value="' + item + '">' + item + '</option>';
    });
    return options;
};

/**
 * @func getVariantAttrOptions
 * @param race
 */
var getVariantAttrOptions = function (race) {
    $(optionLabel1).html('<label for="option' + race +'1" class="col-form-label">' +
        'Ability Score #1:' +
        '</label>');
    $(optionChoice1).html('<select class="form-control" id="option' + race +'1"' + '">' +
        attrOptions() +
        '</select>');
    $(optionLabel2).html('<label for="option' + race +'2" class="col-form-label">' +
        'Ability Score #2:' +
        '</label>');
    $(optionChoice2).html('<select class="form-control" id="option' + race +'2"">' +
        attrOptions() +
        '</select>');
};

/**
 * @func getIntValue
 * @param source
 * @returns {Number}
 */
var getIntValue = function (source) {
    return parseInt($('input[id=' + source + ']').val())
};

/**
 * @func getRaceSelect
 * @returns {string}
 */
var getRaceSelect = function () {
    var raceSelect = '<select class="form-control" id="race" name="race" style="width: 100%;">' +
        '<option value="---" disabled selected="">---</option>';
    racialInfo.forEach(function (item) {
        raceSelect += '<option value=' + item.name + '>' + item.name + '</option>';
    });
    raceSelect += '</select>';
  return raceSelect;
};

/**
 * @func getRacialAttr
 */
var getRacialAttr = function(race) {
    var source1 = 'option' + race + '1';
    var bonusAttr1 = $('select[id=' + source1 + ']').val();
    increaseAttr(bonusAttr1, 1);

    var source2 = 'option' + race + '2';
    var bonusAttr2 = $('select[id=' + source2 + ']').val();
    increaseAttr(bonusAttr2, 1);

    getTotals();
};

/**
 * @func getRaceLabel
 * @returns {string}
 */
var getRaceLabel = function () {
    return '<label for="race" class="col-form-label">Select Race:</label>';
};

/**
 * @func getVariantLabel
 * @param race
 * @returns {string}
 */
var getVariantLabel = function (race) {
    return '<label for="race' + race.name + '" class="col-form-label">' + race.name + ' Subrace:</label>';
};

/**
 * @func getVariantSelect
 * @param race
 * @returns {string}
 */
var getVariantSelect = function (race) {
    var select = '<select class="form-control" id="raceVariant" style="width: 100%;">' +
        '<option disabled selected="">---</option>';

    race.variants.forEach(function (item) {
        select += '<option value="' + item.name + '">' + item.name + '</option>';
    });

    select += '</select>';
    return select;
};

/**
 * @func increaseAttr
 * @param attr
 * @param amount
 */
var increaseAttr = function (attr, amount) {
    switch (attr) {
        case 'Strength':
            racialStr = amount;
            $(racialStrTD).html(racialStr);
            break;
        case 'Dexterity':
            racialDex = amount;
            $(racialDexTD).html(racialDex);
            break;
        case 'Constitution':
            racialCon = amount;
            $(racialConTD).html(racialCon);
            break;
        case 'Intelligence':
            racialInt = amount;
            $(racialIntTD).html(racialInt);
            break;
        case 'Wisdom':
            racialWis = amount;
            $(racialWisTD).html(racialWis);
            break;
        case 'Charisma':
            racialCha = amount;
            $(racialChaTD).html(racialCha);
            break;
    }
};

/**
 * @func racialOther
 * @param array
 * @returns {string}
 */
var racialOther = function (array) {
    var data = '';
    array.forEach(function (item, index) {
        if (index % 2 == 0) {
            data += dtColSm3 + item + dtEnd;
        }
        else {
            data += ddColSm9 + item + ddEnd;
        }
    });
    return data;
};

/**
 * @func racialTemplate
 * @param race
 * @returns {string}
 */
var racialTemplate = function (race) {
    var other = racialOther(race.other);

    return racialTraitsHeader +
        dlHorizontal +
        dtColSm3 + 'Ability Score Modifiers' + dtEnd + ddColSm9 + race.ability + ddEnd +
        dtColSm3 + 'Age' + dtEnd + ddColSm9 + race.age + ddEnd +
        dtColSm3 + 'Alignment' + dtEnd + ddColSm9 + race.alignment + ddEnd +
        dtColSm3 + 'Size' + dtEnd + ddColSm9 + race.size + ddEnd +
        dtColSm3 + 'Speed' + dtEnd + ddColSm9 + race.speed + ddEnd +
        dtColSm3 + 'Language' + dtEnd + ddColSm9 + race.language + ddEnd +
        other +
        dlEnd;
};

/**
 * @func racialVariantTemplate
 * @param variant
 * @returns {string}
 */
var racialVariantTemplate = function (variant) {
    var racialVariantsHeader = '<h4>Variant Traits</h4>';
    var variantNote = '<p>Any trait shown below that conflicts with one above will override the above.</p>';

    var other = racialOther(variant.other);

    return racialVariantsHeader +
        variantNote +
        dlHorizontal +
        dtColSm3 + 'Ability Score Modifiers' + dtEnd + ddColSm9 + variant.ability + ddEnd +
        other +
        dlEnd;
};

/**
 * @func resetRacialAbilityScores
 */
var resetRacialAbilityScores = function () {
    racialStr = 0;
    racialDex = 0;
    racialCon = 0;
    racialInt = 0;
    racialWis = 0;
    racialCha = 0;

    $(racialStrTD).html(racialStr);
    $(racialDexTD).html(racialDex);
    $(racialConTD).html(racialCon);
    $(racialIntTD).html(racialInt);
    $(racialWisTD).html(racialWis);
    $(racialChaTD).html(racialCha);
};

/**
 * @func resetRacialOptions
 */
var resetRacialOptions = function () {
    $(variantLabel).html('');
    $(variantList).html('');
    $(optionLabel1).html('');
    $(optionChoice1).html('');
    $(optionLabel2).html('');
    $(optionChoice2).html('');
    $(raceDescription).html(racialTraitsHeader + '');
    $(racialVariantInfo).html('');
};

/**
 * @func setIntValue
 */
var setIntValue = function (target, amount) {
    $('input[id=' + target + ']').val(amount)
};

/* -----------------------------------------------------
 The big, meaty functions
 ----------------------------------------------------- */

/**
 * @func getRace
 */
var getRace = function() {
    var theRace = $('select[id=race]').val();

    resetRacialAbilityScores();
    resetRacialOptions();

    switch (theRace) {
        case 'Dragonborn':
            // +2 Str, +1 Cha
            racialStr = 2;
            $(racialStrTD).html(racialStr);
            racialCha = 1;
            $(racialChaTD).html(racialCha);

            $(raceDescription).html(racialTemplate(racialInfo[0]));
            break;

        case 'Dwarf':
            // +2 Con
            racialCon = 2;
            $(racialConTD).html(racialCon);

            $(variantLabel).html(getVariantLabel(racialInfo[1]));
            $(variantList).html(getVariantSelect(racialInfo[1]));
            $(raceDescription).html(racialTemplate(racialInfo[1]));
            break;

        case 'Elf':
            // +2 Dex
            racialDex = 2;
            $(racialDexTD).html(racialDex);

            $(variantLabel).html(getVariantLabel(racialInfo[2]));
            $(variantList).html(getVariantSelect(racialInfo[2]));
            $(raceDescription).html(racialTemplate(racialInfo[2]));
            break;

        case 'Gnome':
            // +2 Int
            racialInt = 2;
            $(racialIntTD).html(racialInt);

            $(variantLabel).html(getVariantLabel(racialInfo[3]));
            $(variantList).html(getVariantSelect(racialInfo[3]));
            $(raceDescription).html(racialTemplate(racialInfo[3]));
            break;

        case 'Half-Elf':
            // +2 Cha, +1 to two others of choice
            racialCha = 2;
            $(racialChaTD).html(racialCha);

            var currentRace = 'HalfElf';

            getVariantAttrOptions(currentRace);

            var inputVariantHalfElf1 = document.getElementById('option' + currentRace + '1');
            var inputVariantHalfElf2 = document.getElementById('option' + currentRace + '2');

            inputVariantHalfElf1.addEventListener('change', function() { getRacialAttr(currentRace) }, false);
            inputVariantHalfElf2.addEventListener('change', function() { getRacialAttr(currentRace) }, false);

            $(raceDescription).html(racialTemplate(racialInfo[4]));
            break;

        case 'Half-Orc':
            // +2 Str, +1 Con
            racialStr = 2;
            $(racialStrTD).html(racialStr);
            racialCon = 1;
            $(racialConTD).html(racialCon);

            $(raceDescription).html(racialTemplate(racialInfo[5]));
            break;

        case 'Halfling':
            // +2 Dex
            racialDex = 2;
            $(racialDexTD).html(racialDex);

            $(variantLabel).html(getVariantLabel(racialInfo[6]));
            $(variantList).html(getVariantSelect(racialInfo[6]));
            $(raceDescription).html(racialTemplate(racialInfo[6]));
            break;

        case 'Human':
            // +1 All
            racialStr = 1;
            $(racialStrTD).html(racialStr);
            racialDex = 1;
            $(racialDexTD).html(racialDex);
            racialCon = 1;
            $(racialConTD).html(racialCon);
            racialInt = 1;
            $(racialIntTD).html(racialInt);
            racialWis = 1;
            $(racialWisTD).html(racialWis);
            racialCha = 1;
            $(racialChaTD).html(racialCha);

            $(variantLabel).html(getVariantLabel(racialInfo[7]));
            $(variantList).html(getVariantSelect(racialInfo[7]));
            $(raceDescription).html(racialTemplate(racialInfo[7]));
            break;

        case 'Tiefling':
            // +1 Int, +2 Cha
            racialInt = 1;
            $(racialIntTD).html(racialInt);
            racialCha = 2;
            $(racialChaTD).html(racialCha);

            $(raceDescription).html(racialTemplate(racialInfo[8]));
            break;
    }

    var inputVariant = document.getElementById('raceVariant');
    inputVariant.addEventListener('change', getVariant, false);

    getTotals();
};

/**
 *
 */
var getVariant = function () {
    var theRace = $('select[id=race]').val();

    switch (theRace) {

        case 'Dwarf':
            racialDwarf();
            break;

        case 'Elf':
            racialElf();
            break;

        case 'Gnome':
            racialGnome();
            break;

        case 'Half-Elf':
            racialHalfElf();
            break;

        case 'Halfling':
            racialHalfling();
            break;

        case 'Human':
            racialHuman();
            break;
    }
};

/**
 * @func racialDwarf
 */
var racialDwarf = function() {
    var racialVariant = $('select[id=raceVariant]').val();

    switch (racialVariant) {
        case 'Hill Dwarf':
            racialStr = 0;
            $(racialStrTD).html(racialStr);
            racialWis = 1;
            $(racialWisTD).html(racialWis);
            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[1].variants[0]));
            break;

        case 'Mountain Dwarf':
            racialStr = 2;
            $(racialStrTD).html(racialStr);
            racialWis = 0;
            $(racialWisTD).html(racialWis);
            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[1].variants[1]));
            break;
    }

    getTotals();
};

/**
 * @func racialElf
 */
var racialElf = function() {
    var racialVariant = $('select[id=raceVariant]').val();

    switch (racialVariant) {
        case 'Dark Elf (Drow)':
            racialInt = 0;
            $(racialIntTD).html(racialInt);
            racialWis = 0;
            $(racialWisTD).html(racialWis);
            racialCha = 1;
            $(racialChaTD).html(racialCha);
            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[2].variants[0]));
            break;

        case 'High Elf':
            racialInt = 1;
            $(racialIntTD).html(racialInt);
            racialWis = 0;
            $(racialWisTD).html(racialWis);
            racialCha = 0;
            $(racialChaTD).html(racialCha);
            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[2].variants[1]));
            break;

        case 'Wood Elf':
            racialInt = 0;
            $(racialIntTD).html(racialInt);
            racialWis = 1;
            $(racialWisTD).html(racialWis);
            racialCha = 0;
            $(racialChaTD).html(racialCha);
            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[2].variants[2]));
            break;
    }

    getTotals();
};

/**
 * @func racialGnome
 */
var racialGnome = function() {
    var racialVariant = $('select[id=raceVariant]').val();

    switch (racialVariant) {
        case 'Forest Gnome':
            racialDex = 1;
            $(racialDexTD).html(racialDex);
            racialCon = 0;
            $(racialConTD).html(racialCon);
            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[3].variants[0]));
            break;

        case 'Rock Gnome':
            racialDex = 0;
            $(racialDexTD).html(racialDex);
            racialCon = 1;
            $(racialConTD).html(racialCon);
            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[3].variants[1]));
            break;
    }

    getTotals();
};

/**
 * @func racialHalfElf
 */
var racialHalfElf = function() {
    var source1 = 'optionHalfElf1';
    var bonusAttr1 = $('select[id=' + source1 + ']').val();
    increaseAttr(bonusAttr1, 1);

    var source2 = 'optionHalfElf2';
    var bonusAttr2 = $('select[id=' + source2 + ']').val();
    increaseAttr(bonusAttr2, 1);

    getTotals();
};

/**
 * @func racialHalfling
 */
var racialHalfling = function() {
    var racialVariant = $('select[id=raceVariant]').val();

    switch (racialVariant) {
        case 'Lightfoot Halfling':
            racialCon = 0;
            $(racialConTD).html(racialCon);
            racialCha = 1;
            $(racialChaTD).html(racialCha);
            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[6].variants[0]));
            break;

        case 'Stout Halfling':
            racialCon = 1;
            $(racialConTD).html(racialCon);
            racialCha = 0;
            $(racialChaTD).html(racialCha);
            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[6].variants[1]));
            break;
    }

    getTotals();
};

/**
 * @func racialHuman
 */
var racialHuman = function() {
    var variantState = $('select[id=raceVariant]').val();

    switch (variantState) {
        case 'Enabled':
            resetRacialAbilityScores();

            var currentRace = 'Human';

            getVariantAttrOptions(currentRace);

            $(racialVariantInfo).html(racialVariantTemplate(racialInfo[7].variants[1]));

            var inputVariantHuman1 = document.getElementById('option' + currentRace + '1');
            var inputVariantHuman2 = document.getElementById('option' + currentRace + '2');

            inputVariantHuman1.addEventListener('change', function() { getRacialAttr(currentRace) }, false);
            inputVariantHuman2.addEventListener('change', function() { getRacialAttr(currentRace) }, false);
            break;

        case 'Disabled':
            racialStr = 1;
            $(racialStrTD).html(racialStr);
            racialDex = 1;
            $(racialDexTD).html(racialDex);
            racialCon = 1;
            $(racialConTD).html(racialCon);
            racialInt = 1;
            $(racialIntTD).html(racialInt);
            racialWis = 1;
            $(racialWisTD).html(racialWis);
            racialCha = 1;
            $(racialChaTD).html(racialCha);

            resetRacialOptions();

            $(variantLabel).html(getVariantLabel(racialInfo[7]));
            $(variantList).html(getVariantSelect(racialInfo[7]));
            $(raceDescription).html(racialTemplate(racialInfo[7]));
            break;
    }

    getTotals();
};

/**
 * @func getTotals
 */
var getTotals = function() {
    /**
     * @func getAttrTotal
     */
    var getAttrTotal = function () {
        $('td#totalStr').html(totalStr);
        $('td#totalDex').html(totalDex);
        $('td#totalCon').html(totalCon);
        $('td#totalInt').html(totalInt);
        $('td#totalWis').html(totalWis);
        $('td#totalCha').html(totalCha);
    };

    /**
     * @func getCostAttr
     */
    var getCostAttr = function () {
        $('td#costStr').html(costStr);
        $('td#costDex').html(costDex);
        $('td#costCon').html(costCon);
        $('td#costInt').html(costInt);
        $('td#costWis').html(costWis);
        $('td#costCha').html(costCha);
    };

    /**
     * @func getCostTotal
     */
    var getCostTotal = function () {
        var costTotal = costStr + costDex + costCon + costInt + costWis + costCha;
        $('td#costTotal').html(costTotal);
    };

    /**
     * @func getMod
     */
    var getMod = function () {
        var modStr = modifiers[totalStr];
        var modDex = modifiers[totalDex];
        var modCon = modifiers[totalCon];
        var modInt = modifiers[totalInt];
        var modWis = modifiers[totalWis];
        var modCha = modifiers[totalCha];

        $('td#modStr').html(modStr);
        $('td#modDex').html(modDex);
        $('td#modCon').html(modCon);
        $('td#modInt').html(modInt);
        $('td#modWis').html(modWis);
        $('td#modCha').html(modCha);
    };

    var attrStr = getIntValue('attrStr');
    var attrDex = getIntValue('attrDex');
    var attrCon = getIntValue('attrCon');
    var attrInt = getIntValue('attrInt');
    var attrWis = getIntValue('attrWis');
    var attrCha = getIntValue('attrCha');

    var costStr = points[attrStr];
    var costDex = points[attrDex];
    var costCon = points[attrCon];
    var costInt = points[attrInt];
    var costWis = points[attrWis];
    var costCha = points[attrCha];

    var totalStr = attrStr + racialStr;
    var totalDex = attrDex + racialDex;
    var totalCon = attrCon + racialCon;
    var totalInt = attrInt + racialInt;
    var totalWis = attrWis + racialWis;
    var totalCha = attrCha + racialCha;

    getAttrTotal();
    getCostAttr();
    getCostTotal();
    getMod();
};

/**
 * @func resetAll
 */
var resetAll = function() {
    $(raceList).html(getRaceSelect());

    var inputRace = document.getElementById('race');
    inputRace.addEventListener('change', getRace, false);

    setIntValue('attrStr', '8');
    setIntValue('attrDex', '8');
    setIntValue('attrCon', '8');
    setIntValue('attrInt', '8');
    setIntValue('attrWis', '8');
    setIntValue('attrCha', '8');

    var zeroValue = 0;

    $('td#costStr').html(zeroValue);
    $('td#costDex').html(zeroValue);
    $('td#costCon').html(zeroValue);
    $('td#costInt').html(zeroValue);
    $('td#costWis').html(zeroValue);
    $('td#costCha').html(zeroValue);

    resetRacialAbilityScores();

    $('td#totalStr').html('8');
    $('td#totalDex').html('8');
    $('td#totalCon').html('8');
    $('td#totalInt').html('8');
    $('td#totalWis').html('8');
    $('td#totalCha').html('8');

    $('td#modStr').html(modifiers[8]);
    $('td#modDex').html(modifiers[8]);
    $('td#modCon').html(modifiers[8]);
    $('td#modInt').html(modifiers[8]);
    $('td#modWis').html(modifiers[8]);
    $('td#modCha').html(modifiers[8]);

    $('td#costTotal').html(zeroValue);

    resetRacialOptions();
    getTotals();
};

$(function () {
    $(raceLabel).html(getRaceLabel());
    $(raceList).html(getRaceSelect());

    var inputRace = document.getElementById('race');
    inputRace.addEventListener('change', getRace, false);

    var inputStr = document.getElementById('attrStr');
    var inputDex = document.getElementById('attrDex');
    var inputCon = document.getElementById('attrCon');
    var inputInt = document.getElementById('attrInt');
    var inputWis = document.getElementById('attrWis');
    var inputCha = document.getElementById('attrCha');

    inputStr.addEventListener('change', getTotals, false);
    inputDex.addEventListener('change', getTotals, false);
    inputCon.addEventListener('change', getTotals, false);
    inputInt.addEventListener('change', getTotals, false);
    inputWis.addEventListener('change', getTotals, false);
    inputCha.addEventListener('change', getTotals, false);

    var inputReset = document.getElementById('reset');
    inputReset.addEventListener('click', resetAll, false);
});