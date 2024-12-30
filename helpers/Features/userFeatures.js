export function addToDB(user, fieldName, userId) {
  const isUserIdPresent = user[fieldName].some(
    (item) => item.userId === userId
  );

  // If not present, add it
  if (!isUserIdPresent) {
    user[fieldName].push({ userId });
  }
}

export function removeFromDB(user, fieldName, userId) {
  // Filter out the object containing the specified userId
  user[fieldName] = user[fieldName].filter((item) => item.userId !== userId);
}
