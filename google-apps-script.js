// =============================================================
// Google Apps Script — Paste this into Google Apps Script Editor
// =============================================================
// 
// HOW TO SET UP:
// 1. Go to https://sheets.google.com and create a new spreadsheet
// 2. Rename Sheet1 to "Contacts" and create a second sheet named "Newsletter"
// 3. In "Contacts" sheet, add these headers in Row 1:
//    A1: Timestamp | B1: Name | C1: Email | D1: Phone | E1: Service | F1: Budget | G1: Message
// 4. In "Newsletter" sheet, add these headers in Row 1:
//    A1: Timestamp | B1: Email
// 5. Click Extensions > Apps Script
// 6. Delete any existing code and paste this entire file
// 7. Click Deploy > New Deployment
// 8. Select type: "Web app"
// 9. Set "Execute as" to "Me" and "Who has access" to "Anyone"
// 10. Click Deploy and copy the Web App URL
// 11. Paste that URL into frontend/.env as REACT_APP_GOOGLE_SHEET_URL=<your-url>
//
// =============================================================

const SHEET_CONTACTS = 'Contacts';
const SHEET_NEWSLETTER = 'Newsletter';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    if (data.type === 'newsletter') {
      // Handle newsletter subscription
      const sheet = ss.getSheetByName(SHEET_NEWSLETTER);
      
      // Check for duplicate email
      const emails = sheet.getRange(2, 2, Math.max(sheet.getLastRow() - 1, 1), 1).getValues();
      for (let i = 0; i < emails.length; i++) {
        if (emails[i][0] === data.email) {
          return ContentService
            .createTextOutput(JSON.stringify({ status: 'exists', message: 'Email already subscribed' }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
      
      sheet.appendRow([
        new Date().toISOString(),
        data.email
      ]);
      
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'success', message: 'Subscribed successfully' }))
        .setMimeType(ContentService.MimeType.JSON);
        
    } else {
      // Handle contact form
      const sheet = ss.getSheetByName(SHEET_CONTACTS);
      
      sheet.appendRow([
        new Date().toISOString(),
        data.name || '',
        data.email || '',
        data.phone || '',
        data.service || '',
        data.budget || '',
        data.message || ''
      ]);
      
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'success', message: 'Contact saved successfully' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run this in the Apps Script editor to verify setup
function testSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const contacts = ss.getSheetByName(SHEET_CONTACTS);
  const newsletter = ss.getSheetByName(SHEET_NEWSLETTER);
  
  if (!contacts) {
    Logger.log('ERROR: "Contacts" sheet not found. Create it first.');
  } else {
    Logger.log('✅ Contacts sheet found');
  }
  
  if (!newsletter) {
    Logger.log('ERROR: "Newsletter" sheet not found. Create it first.');
  } else {
    Logger.log('✅ Newsletter sheet found');
  }
}
