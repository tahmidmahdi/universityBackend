import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (to: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: config.email_user,
      pass: config.email_pass,
    },
  })

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4;">
        <tr>
          <td align="center" style="padding: 20px;">
            <table role="presentation" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden;">
              <tr>
                <td style="background-color: #2c3e50; padding: 20px; color: #ffffff; text-align: center;">
                  <h1 style="margin: 0;">Password Reset</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px; color: #333333;">
                  <p style="font-size: 16px; line-height: 1.6;">Hello,</p>
                  <p style="font-size: 16px; line-height: 1.6;">
                    You requested a password reset. Click the button below to reset your password. This link will expire in 10 minutes.
                  </p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #2c3e50; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 4px;">
                      Reset Password
                    </a>
                  </div>
                  <p style="font-size: 14px; color: #666666;">
                    If you didn’t request this, please ignore this email. Your password won’t change until you access the link above and create a new one.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background-color: #f4f4f4; padding: 20px; text-align: center; color: #666666; font-size: 12px;">
                  © 2024 Your Company. All rights reserved.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `

  await transporter.sendMail({
    from: 'mahdi.tahmid.x10@gmail.com',
    to: to,
    subject: 'Password Reset',
    text: 'Reset your password within 10 minutes',
    html: html,
  })
}
