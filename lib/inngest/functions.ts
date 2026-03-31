import { inngest } from "./client";
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
    }
  );