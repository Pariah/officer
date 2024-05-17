function Populate() {
  for (const boss of BOSSES) {
    let interested = USERS_INTERESTED.map(str => {
      const FIND_PREFERENCE = RESPONSES.find(p => p[0] == str);
      const MATCH_ROW = ROSTER.find(r => r[1] == str);
      return { rNick: MATCH_ROW[0], rClass: MATCH_ROW[2], rRole: MATCH_ROW[4], rPreference: FIND_PREFERENCE[BOSSES.indexOf(boss) + 1] };
    });

    // Sort by name then class then preference
    interested.sort((a, b) => a.rNick.localeCompare(b.rNick));
    interested.sort((a, b) => a.rClass.localeCompare(b.rClass));
    interested.sort((a, b) => PREFERENCE.indexOf(a.rPreference) - PREFERENCE.indexOf(b.rPreference));

    const bossSheet = SHEET.getSheetByName(boss);
    bossSheet.getRange(RANGES.BOSS_INTEREST).clearContent();
    for (const role of ROLES) {
      let count = 0;
      for (const person of interested) {
        if (person.rPreference == 'Pass') { continue; }
        if (person.rRole == role) {
          const affix = PREFERENCE_SYMBOL[PREFERENCE.indexOf(person.rPreference)];
          const range = bossSheet.getRange(25 + count, 1 + ROLES.indexOf(role), 1, 1);
          range.setValue(affix + person.rNick);
          count++;
        }
      }
    }
  }
}

function weeklyReset() {
  // Clear master boss ranges
  for (const range of RANGES.MASTER_BOSSES) {
    MASTER.getRange(range).clearContent();
  }

  // Update boss sheets
  for (const boss of BOSSES) {
    const bossSheet = SHEET.getSheetByName(boss);
    bossSheet.setTabColor('#FF0000'); // Use hex code for color

    bossSheet.getRange(RANGES.BOSS_THIS_WEEK).copyTo(bossSheet.getRange(RANGES.BOSS_LAST_WEEK), SpreadsheetApp.CopyPasteType.PASTE_VALUES);
    const rangesToClear = [RANGES.BOSS_COMP, RANGES.BOSS_INTEREST, RANGES.BOSS_THIS_WEEK];
    for (const rangeName of rangesToClear) {
      bossSheet.getRange(rangeName).clearContent();
    }
  }
}
