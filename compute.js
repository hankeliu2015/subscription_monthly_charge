
// TODO: 
// Calculate a daily rate for the subscription tier
// For each day of the month, identify which users had an active subscription on that day
// Multiply the number of active users for the day by the daily rate to calculate the total for the day
// Return the running total for the month at the end

// helper function : firstDayOfMOnth, lastDayOfMonth, nextDay

export function monthlyCharge(yearMonth, subscription, users) {
  
    const usersSubscriptions = (yearMonth, subscription, user) => {
      
      // TODO: convert yearMonth into date Object. Make sure the yy-mm is the correct string format for new Date()
      const inputDateObj = new Date(yearMonth)
      
      //identify the month is 28, 30 or 31 days => use firstDay and lastDay helper
      const totalDatesOfInputMonth = lastDayOfMonth(inputDateObj).getDate() - firstDayOfMonth(inputDateObj).getDate() + 1
      let subAmount = 0
      
      // the yearMonth on current month: 
      if(!user.deactivatedOn) {
        // if user deactiveatedOn is null and user still active, return full subscription at the end of the monty
        subAmount = subscription.monthlyPriceInCents
      } else if(user.deactivatedOn.getMonth() === inputDateObj.getMonth() && user.deactivatedOn.getYear() === inputDateObj.getYear() ) {
        // user deactivatedDate is under current month, use the calcualted subAmount 
        // the day user deactivated need to pay
        subAmount = Math.round((user.monthlyPriceInCents / totalDatesOfInputMonth) * (user.deactivatedOn.getDate() - firstDayOfMonth(inputDateObj).getDate() + 1))
      } else if(inputDateObj.getMonth() < user.deactivatedOn.getMonth()) {
        // historical date. user already deactived before the inputDate month. User paid full on that historical month
        subAmount = user.monthlyPriceInCents
      } else {
        // user deactiveated at a different month or year, current month should return 0
        subAmount = 0
      }
      return {id: user.id, amount: subAmount}
    }

  let usersSubAmount = users.map(user => {
    return usersSubscriptions(yearMonth, subscription, user)
  })
  // return each user's subscription in an object array
  return usersSubAmount
}

  function firstDayOfMonth(date){
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }

  function lastDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
  }

  function nextDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
  }

  // export interface User {
//     id: number;
//     name: string;
//     activatedOn: Date;
//     deactivatedOn: Date | null;
//     customerId: number;
//   }

// export interface Subscription {
//   id: number;
//   customerId: number;
//   monthlyPriceInCents: number;
// }