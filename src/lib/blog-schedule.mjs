// Pure blog visibility policy, evaluated at request time (no cron required).
export function scheduleError(record, now = Date.now()) {
  if (record.status !== "scheduled") return null;
  const raw = record.scheduledFor;
  const timestamp = typeof raw === "string" ? Date.parse(raw) : NaN;
  if (!raw || !/Z$|[+-]\d\d:\d\d$/.test(raw) || !Number.isFinite(timestamp)) {
    return "Choose a valid publishing date and time with a timezone.";
  }
  if (timestamp <= now + 60_000) {
    return "Schedule the article at least one minute in the future.";
  }
  return null;
}

export function blogIsPublic(record, now = Date.now()) {
  if (!record || record.type === "event") return false;
  if (record.status === "published") return true;
  if (record.status !== "scheduled") return false;
  const publishTime = typeof record.scheduledFor === "string" ?
    Date.parse(record.scheduledFor) : NaN;
  return Number.isFinite(publishTime) && publishTime <= now;
}

export function blogPublicDate(record) {
  if (record.status === "scheduled" && record.scheduledFor) return record.scheduledFor;
  return record.publishedAt?.toDate?.()?.toISOString() || "";
}
