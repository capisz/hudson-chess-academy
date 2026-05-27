/* global process */
import {
  cleanText,
  GENERIC_ERROR_MESSAGE,
  hasHoneypot,
  isValidEmail,
  readJsonBody,
  rejectNonPost,
  sendJson,
  submitToMailerLite,
} from "../src/server/mailerLite.js";

export default async function handler(req, res) {
  if (rejectNonPost(req, res)) return;

  try {
    const body = await readJsonBody(req);
    const email = cleanText(body.email).toLowerCase();

    if (hasHoneypot(body)) {
      sendJson(res, 400, { message: GENERIC_ERROR_MESSAGE });
      return;
    }

    if (!email) {
      sendJson(res, 400, { message: "Email is required." });
      return;
    }

    if (!isValidEmail(email)) {
      sendJson(res, 400, { message: "Please enter a valid email address." });
      return;
    }

    await submitToMailerLite({
      email,
      fields: {
        source_form: "homepage_popup",
      },
      groupId: process.env.MAILERLITE_BLOG_GROUP_ID,
      sourceForm: "homepage_popup",
    });

    sendJson(res, 200, {
      message: "You’re in — I’ll send you new Hudson Chess articles when they’re posted.",
    });
  } catch (error) {
    console.error("Newsletter signup failed", error);
    sendJson(res, 500, { message: GENERIC_ERROR_MESSAGE });
  }
}
