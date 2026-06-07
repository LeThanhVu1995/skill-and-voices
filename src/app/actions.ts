"use server";

import { prisma } from "@/lib/prisma";
import { notifyNewLead } from "@/lib/notify";

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

function cleanPhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

function isValidPhone(phone: string) {
  const p = cleanPhone(phone);
  return /^(\+?\d{9,15})$/.test(p);
}

export async function submitConsultation(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const parentName = String(formData.get("parentName") ?? "").trim();
  const studentName = String(formData.get("studentName") ?? "").trim();
  const grade = String(formData.get("grade") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const need = String(formData.get("need") ?? "").trim();

  if (!parentName) {
    return { status: "error", message: "Vui lòng nhập họ tên phụ huynh." };
  }
  if (!isValidPhone(phone)) {
    return { status: "error", message: "Vui lòng nhập số điện thoại hợp lệ." };
  }

  try {
    await prisma.consultation.create({
      data: {
        parentName,
        studentName: studentName || null,
        grade: grade || null,
        phone: cleanPhone(phone),
        email: email || null,
        need: need || null,
      },
    });
    await notifyNewLead("Đăng ký tư vấn mới", [
      `👤 Phụ huynh: ${parentName}`,
      studentName ? `🧒 Học sinh: ${studentName}` : "",
      grade ? `🏫 Lớp: ${grade}` : "",
      `📞 SĐT: ${cleanPhone(phone)}`,
      email ? `✉️ Email: ${email}` : "",
      need ? `📝 Nhu cầu: ${need}` : "",
    ]);
    return {
      status: "success",
      message:
        "Cảm ơn quý phụ huynh! Cô Duyên sẽ liên hệ lại trong thời gian sớm nhất.",
    };
  } catch (error) {
    console.error("submitConsultation error:", error);
    return {
      status: "error",
      message:
        "Hệ thống đang bận. Quý phụ huynh vui lòng gọi trực tiếp hoặc thử lại sau.",
    };
  }
}

export async function submitPartnership(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const orgName = String(formData.get("orgName") ?? "").trim();
  const contactName = String(formData.get("contactName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const partnerType = String(formData.get("partnerType") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!orgName || !contactName) {
    return {
      status: "error",
      message: "Vui lòng nhập tên đơn vị và người liên hệ.",
    };
  }
  if (!isValidPhone(phone)) {
    return { status: "error", message: "Vui lòng nhập số điện thoại hợp lệ." };
  }

  try {
    await prisma.partnership.create({
      data: {
        orgName,
        contactName,
        phone: cleanPhone(phone),
        email: email || null,
        partnerType: partnerType || null,
        message: message || null,
      },
    });
    await notifyNewLead("Yêu cầu hợp tác mới", [
      `🏢 Đơn vị: ${orgName}`,
      `👤 Liên hệ: ${contactName}`,
      `📞 SĐT: ${cleanPhone(phone)}`,
      email ? `✉️ Email: ${email}` : "",
      partnerType ? `🤝 Hình thức: ${partnerType}` : "",
      message ? `📝 Nội dung: ${message}` : "",
    ]);
    return {
      status: "success",
      message: "Cảm ơn quý đơn vị! Chúng tôi sẽ liên hệ để trao đổi chi tiết.",
    };
  } catch (error) {
    console.error("submitPartnership error:", error);
    return {
      status: "error",
      message: "Hệ thống đang bận. Vui lòng thử lại sau hoặc liên hệ trực tiếp.",
    };
  }
}
