import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";
import {sendWelcomeEmail} from "@/lib/nodemailer";

type UserCreatedEvent = {
    data: {
      email: string;
      name: string;
      country: string;
      investmentGoals: string;
      riskTolerance: string;
      preferredIndustry: string;
    };
  };

export const sendSignUpEmail = inngest.createFunction(
    { id: "sign-up-email" },
    async ({ event, step }: { event: UserCreatedEvent; step: any }) => {
      const userProfile = `
        - Country: ${event.data.country}
        - Investment Goals: ${event.data.investmentGoals}
        - Risk Tolerance: ${event.data.riskTolerance}
        - Preferred Industry: ${event.data.preferredIndustry}
      `;
  
      await step.run("send-email", async () => {
        console.log("Sending email to:", event.data.email);
      });

      const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)

        const response = await step.ai.infer('generate-welcome-intro', {
            model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
            body: {
                contents: [
                    {
                        role: 'user',
                        parts: [
                            { text: prompt }
                        ]
                    }]
            }
        })

        await step.run('send-welcome-email', async () => {
                const part = response.candidates?.[0]?.content?.parts?.[0];
                const introText = (part && 'text' in part ? part.text : null) ||'Thanks for joining Binivex. You now have the tools to track markets and make smarter moves.'
    
                // const { data: { email, name } } = event;
    
                // return await sendWelcomeEmail({ email, name, intro: introText });
        })

        return {
            success: true,
            message: 'Welcome email sent successfully'
        }
    }
  );