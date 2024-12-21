export function addToDB(user, fieldName, userId) {
  if (!user[fieldName].includes(userId)) {
    user[fieldName].push(userId);
  }
}

export function removeFromDB(user, fieldName, userId) {
  if (user[fieldName].includes(userId)) {
    const newArrFrnds = user[fieldName].filter(
      (friend) => !friend.equals(userId)
    );

    user[fieldName] = newArrFrnds;
  }
}
