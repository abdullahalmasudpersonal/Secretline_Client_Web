export const formatDate = (utcTime: string): string => {
  const currentDate = new Date();
  const messageDate = new Date(utcTime);

  if (!utcTime) {
    return "";
  }

  if (isNaN(messageDate.getTime())) {
    return "";
  }

  // যদি বার্তাটি আজকের হয়
  if (currentDate.toDateString() === messageDate.toDateString()) {
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // 12-ঘণ্টার ফরম্যাট
    });
  }

  // যদি বার্তাটি গত ৭ দিনের মধ্যে হয়
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  if (messageDate >= sevenDaysAgo) {
    return messageDate.toLocaleDateString([], { weekday: "long" });
  }

  // অন্যথায় পুরো তারিখ দেখানো হবে
  return messageDate.toLocaleDateString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
