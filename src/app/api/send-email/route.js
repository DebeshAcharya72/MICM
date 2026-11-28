import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || 're_placeholder';
const resend = new Resend(resendApiKey);

export async function POST(request) {
  console.log("--> [POST /api/send-email] Incoming email request");
  try {
    const body = await request.json();
    const { full_name, email, app_number, programme, phone, category } = body;

    console.log("--> [POST /api/send-email] Payload:", { full_name, email, app_number, programme });

    if (!email || !app_number) {
      console.warn("--> [POST /api/send-email] Missing email or app_number in request");
      return NextResponse.json(
        { success: false, error: "Missing required email or application number." },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMISSIONS_EMAIL || 'demondass72@gmail.com';
    const fromAddress = 'MICM Admissions <onboarding@resend.dev>';

    // 1. Send Applicant Confirmation Email
    let applicantEmailResult = null;
    try {
      console.log(`--> [POST /api/send-email] Sending confirmation email to applicant: ${email}`);
      applicantEmailResult = await resend.emails.send({
        from: fromAddress,
        to: email,
        subject: `Application Received - ${app_number}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0b1b3d; padding: 24px; text-align: center; color: #ffffff;">
              <h2 style="margin: 0; font-size: 20px; font-weight: bold; color: #ffffff;">Madhusudan Institute of Co-operative Management (MICM)</h2>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">Unit-8, Nayapalli, Bhubaneswar, Odisha - 751012</p>
            </div>
            <div style="padding: 24px; background-color: #ffffff;">
              <p style="font-size: 15px; margin-top: 0;">Dear <strong>${full_name || 'Applicant'}</strong>,</p>
              <p style="font-size: 14px; color: #334155;">
                Your application for the <strong>${programme || 'Management'}</strong> programme has been successfully received by MICM Bhubaneswar.
              </p>
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 16px; margin: 20px 0; text-align: center;">
                <span style="font-size: 12px; color: #166534; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">Your Application Number</span>
                <div style="font-size: 24px; font-weight: bold; color: #15803d; letter-spacing: 1px; margin-top: 4px;">${app_number}</div>
              </div>
              <p style="font-size: 14px; color: #475569;">
                Please preserve this application number for all future correspondence, document verification, and merit list announcements.
              </p>
              <div style="margin: 20px 0; padding: 16px; background-color: #f8fafc; border-radius: 6px; font-size: 13px; color: #475569;">
                <p style="margin: 0 0 8px 0; font-weight: bold; color: #1e293b;">Next Steps:</p>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>The Admissions Committee will review your eligibility and submitted credentials.</li>
                  <li>Shortlisted candidates will be notified via email and SMS for counseling/interview rounds.</li>
                </ul>
              </div>
              <p style="font-size: 13px; color: #64748b; margin-bottom: 0;">
                For any queries, contact Admissions at <a href="mailto:micmbbs@gmail.com" style="color: #0288d1;">micmbbs@gmail.com</a> or call +91 674 2562826.
              </p>
            </div>
            <div style="background-color: #f1f5f9; padding: 14px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
              © ${new Date().getFullYear()} Madhusudan Institute of Co-operative Management (MICM). All rights reserved.
            </div>
          </div>
        `,
      });
      console.log("--> [POST /api/send-email] Applicant email sent successfully:", applicantEmailResult);
    } catch (appMailErr) {
      console.error("--> [POST /api/send-email] Failed to send applicant email (Note: Resend free tier requires verified domain or test recipient):", appMailErr.message);
    }

    // 2. Send Admin Alert Email
    let adminEmailResult = null;
    try {
      console.log(`--> [POST /api/send-email] Sending admin alert email to: ${adminEmail}`);
      adminEmailResult = await resend.emails.send({
        from: 'MICM Portal <onboarding@resend.dev>',
        to: adminEmail,
        subject: `New Application: ${full_name || 'Applicant'} - ${app_number}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0288d1; padding: 20px; color: #ffffff;">
              <h3 style="margin: 0; font-size: 18px; color: #ffffff;">New Admission Application Received</h3>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #e0f2fe;">A new candidate has submitted an admission application via the portal.</p>
            </div>
            <div style="padding: 20px; background-color: #ffffff;">
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 40%;">Application No:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #0288d1;">${app_number}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Applicant Name:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${full_name || '-'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Programme:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${programme || '-'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Applicant Email:</td>
                  <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                ${phone ? `
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone Number:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${phone}</td>
                </tr>` : ''}
                ${category ? `
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Category:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${category}</td>
                </tr>` : ''}
              </table>
              <div style="margin-top: 20px; text-align: center;">
                <p style="font-size: 12px; color: #64748b;">
                  Log into the Admin Panel to review uploaded documents and application status.
                </p>
              </div>
            </div>
          </div>
        `,
      });
      console.log("--> [POST /api/send-email] Admin email sent successfully:", adminEmailResult);
    } catch (adminMailErr) {
      console.error("--> [POST /api/send-email] Failed to send admin email:", adminMailErr.message);
    }

    return NextResponse.json({
      success: true,
      message: "Resend email processing completed.",
      applicant: !!applicantEmailResult,
      admin: !!adminEmailResult,
    });
  } catch (error) {
    console.error("--> [POST /api/send-email] Unhandled Email Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
