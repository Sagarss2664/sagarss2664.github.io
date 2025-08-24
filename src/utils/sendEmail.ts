// import emailjs from 'emailjs-com';

// // Your EmailJS public key
// const PUBLIC_KEY = 'fBC4yN3OKl4_PY9Ez';

// // Define the response type since EmailJS doesn't export it properly
// interface EmailJSResponse {
//   status: number;
//   text: string;
// }

// // Function to send email to yourself (notification)
// export const sendEmailToMe = async (e: React.FormEvent): Promise<EmailJSResponse> => {
//   e.preventDefault();
  
//   try {
//     const form = e.target as HTMLFormElement;
    
//     // Validate required fields
//     const formData = new FormData(form);
//     const fromName = formData.get('from_name');
//     const replyTo = formData.get('reply_to');
//     const message = formData.get('message');
    
//     if (!fromName || !replyTo || !message) {
//       throw new Error('Please fill in all required fields');
//     }
    
//     // Send the email to yourself (notification)
//     const result = await emailjs.sendForm(
//       'service_x5b4wul',  // Your service ID
//       'template_kq0rw5i', // Your template ID for notifications to you
//       form,
//       PUBLIC_KEY // Your public key
//     );
    
//     console.log('Notification email sent successfully:', result);
//     return result;
    
//   } catch (error) {
//     console.error('Notification email failed:', error);
//     throw error;
//   }
// };

// // Function to send automatic response to the person who contacted you
// export const sendAutoResponse = async (formData: {
//   from_name: string;
//   reply_to: string;
//   message: string;
// }): Promise<EmailJSResponse> => {
//   try {
//     // Send automatic response
//     const result = await emailjs.send(
//       'service_x5b4wul',  // Your service ID
//       'template_autoresponse', // Your auto-response template ID
//       {
//         to_name: formData.from_name,
//         to_email: formData.reply_to,
//         original_message: formData.message,
//       },
//       PUBLIC_KEY // Your public key
//     );
    
//     console.log('Auto-response sent successfully:', result);
//     return result;
    
//   } catch (error) {
//     console.error('Auto-response failed:', error);
//     throw error;
//   }
// };

// // Main function to handle both emails
// export const sendContactEmail = async (e: React.FormEvent): Promise<void> => {
//   e.preventDefault();
  
//   try {
//     const form = e.target as HTMLFormElement;
//     const formData = new FormData(form);
    
//     const contactData = {
//       from_name: formData.get('from_name') as string,
//       reply_to: formData.get('reply_to') as string,
//       message: formData.get('message') as string,
//     };
    
//     // Send notification to yourself
//     await sendEmailToMe(e);
    
//     // Send auto-response to the person who contacted you
//     await sendAutoResponse(contactData);
    
//   } catch (error) {
//     console.error('Email process failed:', error);
//     throw error;
//   }
// };

// // Test function to verify EmailJS setup
// export const testEmailJS = async (): Promise<EmailJSResponse> => {
//   try {
//     // Test with minimal data
//     const testResult = await emailjs.send(
//       'service_x5b4wul',  // Your service ID
//       'template_qju4y3q', // Your template ID
//       {
//         from_name: 'Test User',
//         reply_to: 'test@example.com',
//         message: 'This is a test message from EmailJS setup',
//       },
//       PUBLIC_KEY // Your public key
//     );
    
//     console.log('EmailJS test successful:', testResult);
//     return testResult;
//   } catch (error) {
//     console.error('EmailJS test failed:', error);
//     throw error;
//   }
// };

// // Backward compatibility export - ADD THIS LINE
// export const sendEmail = sendContactEmail;
import emailjs from "emailjs-com";

// 🔑 Your EmailJS keys
const PUBLIC_KEY = "fBC4yN3OKl4_PY9Ez"; // Replace with your real Public Key
const SERVICE_ID = "service_x5b4wul";   // Replace with your EmailJS Service ID

// Define the response type since EmailJS doesn't export it properly
interface EmailJSResponse {
  status: number;
  text: string;
}

// -----------------------------
// 1. Send notification to YOU (Admin)
// -----------------------------
export const sendEmailToMe = async (form: HTMLFormElement): Promise<EmailJSResponse> => {
  try {
    const result = await emailjs.sendForm(
      SERVICE_ID,
      "template_gsloawv", // ✅ Your notification template ID
      form,
      PUBLIC_KEY
    );

    console.log("✅ Notification email sent to admin:", result);
    return result;
  } catch (error) {
    console.error("❌ Notification email failed:", error);
    throw error;
  }
};

// -----------------------------
// 2. Send auto-response to USER
// -----------------------------
export const sendAutoResponse = async (formData: {
  from_name: string;
  reply_to: string;
  message: string;
}): Promise<EmailJSResponse> => {
  try {
    const result = await emailjs.send(
      SERVICE_ID,
      "template_kq0rw5i", // ✅ Your auto-response template ID
      {
        from_name: formData.from_name,
        reply_to: formData.reply_to,
        message: formData.message,
      },
      PUBLIC_KEY
    );

    console.log("✅ Auto-response sent to user:", result);
    return result;
  } catch (error) {
    console.error("❌ Auto-response failed:", error);
    throw error;
  }
};

// -----------------------------
// 3. Main handler – calls both
// -----------------------------
export const sendContactEmail = async (e: React.FormEvent): Promise<void> => {
  e.preventDefault();

  try {
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const contactData = {
      from_name: formData.get("from_name") as string,
      reply_to: formData.get("reply_to") as string,
      message: formData.get("message") as string,
    };

    if (!contactData.from_name || !contactData.reply_to || !contactData.message) {
      throw new Error("⚠️ Please fill in all required fields");
    }

    // Step 1: Send notification to YOU
    await sendEmailToMe(form);

    // Step 2: Send auto-response to USER
    await sendAutoResponse(contactData);

    console.log("🎉 Both emails sent successfully!");
  } catch (error) {
    console.error("❌ Email process failed:", error);
    throw error;
  }
};

// -----------------------------
// 4. Test EmailJS Setup
// -----------------------------

// ✅ Backward compatibility
export const sendEmail = sendContactEmail;
