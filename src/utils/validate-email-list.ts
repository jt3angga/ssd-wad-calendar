export function validateEmailList(emailList: string): boolean {
  const emailRegex: RegExp = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const emails: string[] = emailList.split(',').map((email) => email.trim());

  const uniqueEmails: string[] = [];
  for (let i = 0; i < emails.length; i++) {
    const email: string = emails[i];
    if (!uniqueEmails.includes(email)) {
      uniqueEmails.push(email);
    }
  }

  if (emails.length !== uniqueEmails.length) {
    return false;
  }

  for (const email of uniqueEmails) {
    if (!emailRegex.test(email)) {
      return false;
    }
  }

  return true;
}

export function convertEmailListToArray(emailList: string): string[] {
  const emailArray: string[] = emailList
    .split(',')
    .map((email) => email.trim());

  return emailArray;
}
