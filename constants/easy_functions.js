// import Crypto from "crypto"

export const sanitizePhone = (number) => {
  return number.replace(/[^\d]/g, '').replace(/^.*(\d{10})$/, '$1');
};
export const formatDate = (stringDate) => {
  const date = new Date(stringDate);
  const now = new Date();
  const previousDay = new Date().setDate(now.getDate() - 1);
  const theDaybefore = new Date().setDate(now.getDate() - 2);

  // console.log(date.getTime(), now.getTime(), previousDay, theDaybefore)

  let returningDate;

  if (date.getTime() <= now.getTime() && date.getTime() > previousDay) {
    let hours = date.getHours();
    let mins = date.getMinutes();
    let AMorPM = hours > 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    mins = mins < 10 ? '0' + mins : mins;

    returningDate = `${hours}:${mins} ${AMorPM}`;
  } else if (date.getTime() <= previousDay && date.getTime() > theDaybefore) {
    returningDate = 'Yesterday';
  } else {
    // returningDate = `${date.getUTCMonth()}/${date.getDate()}/${date.getUTCFullYear()}`
    returningDate = date.toLocaleDateString();
  }

  return returningDate;
};
export const getMessageStatusFontNameAndColor = (status) => {
  switch (status) {
    case 'PENDING':
      return { name: 'clock-time-three-outline', color: 'white' };
    case 'SENT':
      return { name: 'check', color: 'white' };
    case 'DELIEVERED':
      return { name: 'check-all', color: 'white' };
    case 'READ':
      return { name: 'check-all', color: 'blue' };
  }
};
