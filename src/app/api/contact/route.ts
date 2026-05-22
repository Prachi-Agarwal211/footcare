import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, service, notes } = body;

    // 1. Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Invalid name. Must be at least 2 characters." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 8) {
      return NextResponse.json(
        { error: "Invalid phone number. Must be at least 8 digits." },
        { status: 400 }
      );
    }

    // 2. Prepare Lead Object
    const newLead = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      phone: phone.trim(),
      service: service || "Not Specified",
      notes: notes ? notes.trim() : "",
      createdAt: new Date().toISOString(),
    };

    // 3. Write to local leads.json file
    const filePath = path.join(process.cwd(), "leads.json");
    let leads = [];

    try {
      const data = await fs.readFile(filePath, "utf-8");
      leads = JSON.parse(data);
    } catch (e) {
      const err = e as { code?: string };
      // File doesn't exist or is invalid JSON; start with empty array
      if (err.code !== "ENOENT") {
        console.error("Error reading leads file:", e);
      }
    }

    leads.push(newLead);
    await fs.writeFile(filePath, JSON.stringify(leads, null, 2), "utf-8");

    // Log the lead registration
    console.log(`[Lead Captured] ID: ${newLead.id}, Name: ${newLead.name}, Phone: ${newLead.phone}`);

    return NextResponse.json({ success: true, leadId: newLead.id });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
