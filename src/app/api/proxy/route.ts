import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Button, Tailwind } from '@react-email/components';

const API_BASE_URL = 'https://main-server-production-bcfe.up.railway.app';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('API route received body:', body); // Debug log

    console.log('submission_id in body:', body.submission_id);

    if (body.type === 'send_verification') {
      return await handleVerificationCode(body);
    } else if (body.type === 'send_mbti_email') {
      return await handleMbtiEmail(body);
    }
    
    // Debug log before making the fetch call
    console.log('Attempting to fetch:', {
      url: `${API_BASE_URL}/receive_data`,
      body: body
    });

    const response = await fetch(`${API_BASE_URL}/receive_data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json' // Add this to ensure JSON response
      },
      body: JSON.stringify(body)
    });
    
    // Debug log for the response
    console.log('Received response from API:', {
      status: response.status,
      ok: response.ok,
      contentType: response.headers.get('content-type')
    });
    
    const responseText = await response.text();
    console.log('Response from server:', responseText);

    if (!response.ok) {
      console.error('Server error:', {
        status: response.status,
        statusText: response.statusText,
        body: responseText
      });
      throw new Error(`Server responded with ${response.status}: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    console.log('Parsed response data:', data);
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error: any) {
    console.error('POST request failed:', {
      error: error,
      stack: error.stack,
      message: error.message
    });
    return new NextResponse(
      JSON.stringify({
        error: 'Request failed',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}


async function handleVerificationCode(body: { email: string, code: string }) {
  try {
    const { email, code } = body;

    // Log to help debug
    console.log('Attempting to send email to:', email);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, // Use App Password instead of regular password
      },
      tls: {
        rejectUnauthorized: false // Only during development
      }
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('Transporter verified successfully');
    } catch (verifyError) {
      console.error('Transporter verification failed:', verifyError);
      throw new Error('Email service configuration error');
    }

    // Send the email
    const info = await transporter.sendMail({
      from: `"FurSphere-MBTI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Your Verification Code</h2>
          <p>Hi,</p>
          <p>Here is your verification code: <strong>${code}</strong></p>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `,
    });

    console.log('Email sent successfully:', info.messageId);

    return new NextResponse(
      JSON.stringify({ 
        success: true,
        messageId: info.messageId 
      }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error: any) {
    console.error('Detailed error:', error);
    
    // More specific error messages
    let errorMessage = 'Failed to send verification code';
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed';
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'Network connection error';
    }

    return new NextResponse(
      JSON.stringify({
        error: errorMessage,
        message: error.message,
        code: error.code
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}


async function handleMbtiEmail(body: { email: string, attachment1: string, attachment2: string, attachment3: string, attachment4: string, attachment5: string, attachment6: string, contentType: string, filename: string, isTestImage: boolean, surveyData: any }) {
  try {
    const { email, attachment1, attachment2, attachment3, attachment4, attachment5, attachment6, surveyData, contentType = 'image/png', filename = 'MBTI-Result.png' } = body;
    
    console.log("surveyData in proxy",surveyData);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, // Use App Password instead of regular password
      },
      tls: {
        rejectUnauthorized: false // Only during development
      }
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('Transporter verified successfully');
    } catch (verifyError) {
      console.error('Transporter verification failed:', verifyError);
      throw new Error('Email service configuration error');
    }

    // Send the email
    const info = await transporter.sendMail({
      from: `"FurSphere-MBTI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Ta-da! here’s the MBTI result for ${surveyData.pet_info.PetName}`,
      html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FurSphere Welcome Email</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #F5F5F5; font-family: 'Inter', Arial, sans-serif; letter-spacing: 0.5px;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;">
    <tr>
      <td align="center" style="padding-top: 0px;">
        <!-- Main Container -->
        <table border="0" cellpadding="0" cellspacing="0" width="960" style="width: 960px; background-color: #F5F5F5;">
          <!-- Logo Section -->
          <tr>
            <td align="center" style="padding-top: 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="196" style="width: 196px; height: 60px; background-color: #F5F5F5;">
                <tr>
                  <td>
                    <img src="https://fursphere.com/long-logo.png" alt="FurSphere" width="196" height="60" style="display: block; width: 196px; height: 60px; object-fit: cover;">
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Main Content White Card -->
          <tr>
            <td align="center" style="padding-top: 20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="760" style="width: 760px; background-color: #FFFFFF; border-radius: 30px;">
                <!-- Header with Logo -->
                <tr>
                  <td align="center" style="padding-top: 0;">
                    <table border="0" cellpadding="0" cellspacing="0" width="676" style="width: 676px; height: 125px; background-color: #FFFFFF; border-bottom: 1px solid #E0E0E0;">
                      <tr>
                        <td width="284" valign="middle" style="width: 284px; height: 125px;">
                          <p style="margin: 0; color: #101828; font-size: 20px; font-family: 'Inter', Arial, sans-serif; font-weight: 400; line-height: 1.2;">Hi ${surveyData.pet_info.PetName}'s parent,</p>
                          <p style="margin: 8px 0 0 0; color: #5777D0; font-size: 24px; font-family: 'Inter', Arial, sans-serif; font-weight: 710; line-height: 1;">Welcome to FurSphere!</p>
                        </td>
                        <td width="125" align="right" valign="middle" style="width: 125px; height: 125px;">
                          <img src="https://fursphere.com/email-logo.png" alt="Paw Logo" width="125" height="125" style="display: block; width: 125px; height: 125px; object-fit: cover;">
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Main Text Content -->
                <tr>
                  <td align="center" style="padding-top: 30px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="676" style="width: 676px; background-color: #FFFFFF;">
                      <tr>
                        <td style="font-family: 'Inter', Arial, sans-serif; color: #101828; font-size: 16px; font-weight: 400; line-height: 1.2;">
                          <p style="margin: 0 0 0 0;">
                            Thank you for participating in our early test — and for patiently waiting.
                          </p>
                          <p style="margin: 0 0 16px 0;">
                            We're excited to share the result for your adorable ${surveyData.pet_info.PetName}!
                          </p>
                          <p style="margin: 30px 0 16px 0;">
                            FurSphere is a digital pet concierge dedicated to helping pet parents like you take better care of their furry companions through food price comparison, health tracking, and personalized recommendations. Your support truly means a lot to us.
                          </p>
                          <p style="margin: 30px 0 16px 0;">
                            We'd love to hear your thoughts — feel free to reach out anytime with your feedback!
                          </p>
                          <p style="margin: 30px 0 16px 0; font-weight: 710;">
                            Loved your result? Share ${surveyData.pet_info.PetName}'s results on Instagram and tag us @fur.sphere — we'd be so excited to see and share the joy with our furry community!
                          </p>
                          <p style="margin: 30px 0 16px 0;">
                            The launch of the FurSphere App is just around the corner — and your support means everything to us. Follow along and let's build something amazing, together!
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- CTA Button -->
                <tr>
                  <td align="center" style="padding-top: 20px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="244" style="width: 244px; height: 44px; background-color: #5777D0; border-radius: 30px;">
                      <tr>
                        <td align="center" valign="middle">
                          <a href="https://instagram.com/fur.sphere" target="_blank" style="display: inline-block; font-family: 'Inter', Arial, sans-serif; font-size: 16px; font-weight: 710; line-height: 1.2; color: #FFFFFF; text-decoration: none; padding: 12px 30px; width: 100%; box-sizing: border-box;">
                            Follow us on Instagram
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer Text -->
                <tr>
                  <td align="center" style="padding: 40px 0;">
                    <table border="0" cellpadding="0" cellspacing="0" width="676" style="width: 676px;">
                      <tr>
                        <td style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 400; color: #C3C3C3; text-align: left;">
                          For any questions or feedback, feel free to reach us at <a href="mailto:marketing@fursphere.com" style="color: #5777D0; text-decoration: underline;">marketing@fursphere.com</a>.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Social Media Icons -->
          <tr>
            <td align="center" style="padding: 35px 0;">
              <table border="0" cellpadding="0" cellspacing="0" width="676">
                <tr>
                  <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <!-- Discord Icon -->
                        <td style="padding: 0 10px;">
                          <a href="https://discord.gg/fursphere" target="_blank">
                            <img src="https://fursphere.com/discord.png" alt="Discord" width="40" height="40" style="display: block; width: 40px; height: 40px;">
                          </a>
                        </td>
                        <!-- Instagram Icon -->
                        <td style="padding: 0 10px;">
                          <a href="https://www.instagram.com/fursphere" target="_blank">
                            <img src="https://fursphere.com/ins.png" alt="Instagram" width="40" height="40" style="display: block; width: 40px; height: 40px;">
                          </a>
                        </td>
                        <!-- Facebook Icon -->
                        <td style="padding: 0 10px;">
                          <a href="https://www.facebook.com/fursphere" target="_blank">
                            <img src="https://fursphere.com/facebook.png" alt="Facebook" width="40" height="40" style="display: block; width: 40px; height: 40px;">
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    
    

      `,
      attachments: [{
        filename: filename,
        content: Buffer.from(attachment1, 'base64'),
        contentType: contentType
      },
      {
        filename: filename,
        content: Buffer.from(attachment2, 'base64'),
        contentType: contentType
      },
      {
        filename: filename,
        content: Buffer.from(attachment3, 'base64'),
        contentType: contentType
      },  
      {
        filename: filename,
        content: Buffer.from(attachment4, 'base64'),
        contentType: contentType
      },  
      {
        filename: filename,
        content: Buffer.from(attachment5, 'base64'),
        contentType: contentType
      },  
      {
        filename: filename,
        content: Buffer.from(attachment6, 'base64'),
        contentType: contentType
      },  
 
    ],
   
    });

    

    console.log('Email sent successfully:', info.messageId);

    return new NextResponse(
      JSON.stringify({ 
        success: true,
        messageId: info.messageId 
      }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error: any) {
    console.error('Detailed error:', error);
    
    // More specific error messages
    let errorMessage = 'Failed to send verification code';
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed';
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'Network connection error';
    }

    return new NextResponse(
      JSON.stringify({
        error: errorMessage,
        message: error.message,
        code: error.code
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}





export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    console.log("searchParams" + searchParams);
    const submissionId = searchParams.get('submissionId');
    const email = searchParams.get('email');
    const check_signup = searchParams.get('check_signup');
    const check_test_times = searchParams.get('check_test_times');
   
    let response;

   console.log("responqwqwe" + submissionId);
   console.log("responqwqwe" + email);
   console.log("responqwqwe" + check_signup);
   if (email) {
    response = await fetch(`${API_BASE_URL}/get_user_info/${email}`);
  } else if (submissionId) {
    response = await fetch(`${API_BASE_URL}/get_result/${submissionId}`);
  } else if (check_signup) { 
    console.log(`${API_BASE_URL}/check_signup?email=${check_signup}`);
    response = await fetch(`${API_BASE_URL}/check_signup?email=${check_signup}`); 

  } else if (check_test_times) {
    console.log(`${API_BASE_URL}/check_test_times?email=${check_test_times}`);
    response = await fetch(`${API_BASE_URL}/check_test_times?email=${check_test_times}`);
  } else {
    throw new Error('No valid query parameters provided');
  }
    
    const responseText = await response.text();
    
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error: any) {
    console.error('GET request failed:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Request failed',
        message: error.message
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders
  });
} 