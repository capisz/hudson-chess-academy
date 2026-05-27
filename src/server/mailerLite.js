/* global process */

const MAILERLITE_ENDPOINT = "https://connect.mailerlite.com/api/subscribers";
const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again or email hello@hudsonchess.com.";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return EMAIL_PATTERN.test(String(email || "").trim());
}

export function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function hasHoneypot(body) {
  return Boolean(cleanText(body.company) || cleanText(body.website) || cleanText(body.url));
}

export async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return req.body ? JSON.parse(req.body) : {};

  let rawBody = "";
  for await (const chunk of req) {
    rawBody += String(chunk);
  }

  return rawBody ? JSON.parse(rawBody) : {};
}

export function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

export function rejectNonPost(req, res) {
  if (req.method === "POST") return false;
  res.setHeader("Allow", "POST");
  sendJson(res, 405, { message: "Method not allowed." });
  return true;
}

export async function submitToMailerLite({ email, fields, groupId, sourceForm }) {
  const apiKey = process.env.MAILERLITE_API_KEY;

  if (!apiKey || !groupId) {
    console.error("MailerLite configuration missing", {
      hasApiKey: Boolean(apiKey),
      hasGroupId: Boolean(groupId),
      sourceForm,
    });
    throw new Error("Missing MailerLite configuration.");
  }

  const response = await fetch(MAILERLITE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      fields,
      groups: [groupId],
    }),
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => "");
    console.error("MailerLite subscriber request failed", {
      status: response.status,
      sourceForm,
      responseText,
    });
    throw new Error("MailerLite request failed.");
  }

  return response.json().catch(() => ({}));
}

export { GENERIC_ERROR_MESSAGE };
