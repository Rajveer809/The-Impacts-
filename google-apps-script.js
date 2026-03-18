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
// 5. Create a third sheet named "Payments" with headers:
//    A1: Timestamp | B1: Plan | C1: Price (USD) | D1: Price (INR) | E1: Billing | F1: Payment ID | G1: Order ID
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
const SHEET_PAYMENTS = 'Payments';

// ⬇️ CHANGE THIS to your email address to receive notifications
const NOTIFY_EMAIL = 'rajveer@theimpacts.agency';

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

    } else if (data.type === 'payment') {
      // Handle payment logging
      const sheet = ss.getSheetByName(SHEET_PAYMENTS);

      sheet.appendRow([
        new Date().toISOString(),
        data.plan || '',
        data.priceUSD || '',
        data.priceINR || '',
        data.billing || '',
        data.paymentId || '',
        data.orderId || ''
      ]);

      // Send payment notification email
      sendPaymentNotification(data);

      return ContentService
        .createTextOutput(JSON.stringify({ status: 'success', message: 'Payment logged' }))
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

      // Send email notification to business owner
      sendNotificationEmail(data);

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

// Send email notification when a new contact form is submitted
function sendNotificationEmail(data) {
  try {
    const subject = `🔔 New Lead: ${data.name} — ${data.service || 'General Inquiry'}`;
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a1a2e; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">✨ New Contact Form Submission</h2>
          <p style="margin: 5px 0 0; opacity: 0.8;">The Impacts — Lead Notification</p>
        </div>
        <div style="border: 1px solid #e0e0e0; border-top: none; padding: 20px; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Name</td><td style="padding: 8px 0;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone</td><td style="padding: 8px 0;">${data.phone || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Service</td><td style="padding: 8px 0;">${data.service || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Budget</td><td style="padding: 8px 0;">${data.budget || 'Not specified'}</td></tr>
          </table>
          <div style="margin-top: 15px; padding: 15px; background: #f5f5f5; border-radius: 6px;">
            <p style="margin: 0 0 5px; font-weight: bold; color: #555;">Message:</p>
            <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #999;">Submitted at ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (err) {
    // Log but don't fail the form submission if email fails
    Logger.log('Email notification failed: ' + err.toString());
  }
}

// Send email notification when a payment is completed
function sendPaymentNotification(data) {
  try {
    const subject = `💰 New Payment: ${data.plan} Plan — ₹${data.priceINR}`;
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #059669; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">💰 New Payment Received!</h2>
          <p style="margin: 5px 0 0; opacity: 0.8;">The Impacts — Payment Notification</p>
        </div>
        <div style="border: 1px solid #e0e0e0; border-top: none; padding: 20px; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Plan</td><td style="padding: 8px 0;">${data.plan}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Amount (INR)</td><td style="padding: 8px 0;">₹${data.priceINR}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Amount (USD)</td><td style="padding: 8px 0;">$${data.priceUSD}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Billing</td><td style="padding: 8px 0;">${data.billing}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Payment ID</td><td style="padding: 8px 0; font-family: monospace;">${data.paymentId}</td></tr>
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #999;">Received at ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (err) {
    Logger.log('Payment notification email failed: ' + err.toString());
  }
}
