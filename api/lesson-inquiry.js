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
    const parentName = cleanText(body.parent_name);
    const studentName = cleanText(body.student_name);
    const email = cleanText(body.email).toLowerCase();
    const phone = cleanText(body.phone);
    const city = cleanText(body.city);
    const studentAge = cleanText(body.student_age);
    const studentExperience = cleanText(body.student_experience);
    const studentGoals = Array.isArray(body.student_goals)
      ? body.student_goals.map(cleanText).filter(Boolean).join(", ")
      : cleanText(body.student_goals);
    const notes = cleanText(body.notes);

    if (hasHoneypot(body)) {
      sendJson(res, 400, { message: GENERIC_ERROR_MESSAGE });
      return;
    }

    if (!parentName) {
      sendJson(res, 400, { message: "Parent name is required." });
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

    if (!studentGoals && !notes) {
      sendJson(res, 400, { message: "Please choose at least one goal or add a note." });
      return;
    }

    await submitToMailerLite({
      email,
      fields: {
        name: parentName,
        parent_name: parentName,
        student_name: studentName,
        phone,
        city,
        student_age: studentAge,
        student_experience: studentExperience,
        student_goals: studentGoals,
        notes,
        source_form: "lesson_inquiry",
      },
      groupId: process.env.MAILERLITE_LESSON_INQUIRY_GROUP_ID,
      sourceForm: "lesson_inquiry",
    });

    sendJson(res, 200, {
      message: "Thanks — I’ll send you the next steps for setting up a lesson and building a chess growth path.",
    });
  } catch (error) {
    console.error("Lesson inquiry failed", error);
    sendJson(res, 500, { message: GENERIC_ERROR_MESSAGE });
  }
}
