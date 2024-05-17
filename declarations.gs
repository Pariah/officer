const SHEET = SpreadsheetApp.getActiveSpreadsheet();
const MASTER = SHEET.getSheetByName('Master');
const FORM = SHEET.getSheetByName('Form Responses');
const RESPONSES = FORM.getRange(2, 2, FORM.getLastRow() - 1, FORM.getLastColumn() - 2).getValues();
const ROSTER = SHEET.getSheetByName('DATA').getRange('A2:E40').getValues();
const BOSSES = ['MAG','OMN','CHI','ATR','MAL','NEF','HAL','VAL','ASC','CHO','SIN','CON','ALA']; // T11
const PREFERENCE = ['Expansion BiS','Tier BiS','MS Upgrade','OS Upgrade','Other','Pass'];
const PREFERENCE_SYMBOL = ['$','+','','-','#'];
const ROLES = ['Tank','Healer','Melee','Ranged'];
const RANGES = {
  MASTER_BOSSES: ['K2:Y6','K8:Y12','K20:Y24','K26:Y30'],
  BOSS_COMP: 'A5:D21',
  BOSS_COMP_TOTAL: 'E4',  
  BOSS_INTEREST: 'A25:D41',
  BOSS_THIS_WEEK: 'N5:R9',
  BOSS_LAST_WEEK: 'N11:R15'
}
const USERS_INTERESTED = RESPONSES.map(row => row[0]);