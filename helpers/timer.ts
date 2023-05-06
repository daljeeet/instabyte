const rtf1 = new Intl.RelativeTimeFormat("en", {
    localeMatcher: "best fit",
    numeric: "always",
    style: "long", 
  })

export const CalcTime = (time: number) => {
    const currTime = Date.now();
    const diff = currTime - time;
    if (diff >= 31536000000) {
         const difference = Math.floor(diff / 31536000000);
         return rtf1.format(-difference, 'years')
    } else if (diff >= 2419200000) {
         const difference = Math.floor(diff / 2419200000);
         return rtf1.format(-difference, 'months')
    } else if (diff >= 86400000) {
         const difference = Math.floor(diff / 86400000);
         return rtf1.format(-difference, 'days')
    } else if (diff >= 3600000) {
         const difference = Math.floor(diff / 3600000);
         return rtf1.format(-difference, 'hours')
    } else if (diff >= 60000) {
         const difference = Math.floor(diff / 60000);
         return rtf1.format(-difference, 'minutes')
    } else {
         const difference = Math.floor(diff / 1000);
         return rtf1.format(-difference, 'seconds')
    }
}
export function NumberFormat(num: number) {
     return num.toLocaleString()
}