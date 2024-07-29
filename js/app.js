// Вправа 1: Базовий Async/Await

// Напишіть функцію delayedMessage, яка повертає Promise, який вирішується через 2 секунди з повідомленням «Hello, World!».
function delayedMessage() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello, World!");
    }, 2000);
  });
}

delayedMessage().then((message) => console.log(message));

// Створіть ще одну функцію printMessage, яка використовує async/await для виклику delayedMessage і реєструє повідомлення на консолі.
async function printMessage() {
  const message = await delayedMessage();
  console.log(message);
}

printMessage();

// Вправа 2: отримання даних з API

// Напишіть функцію fetchUser, яка отримує дані з API JSONPlaceholder (https://jsonplaceholder.typicode.com/users/1).
async function fetchUser() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

fetchUser().then((userData) => console.log(userData));

// Використовуйте async/await, щоб отримати дані та зареєструвати ім’я та електронну адресу користувача у консолі.
async function fetchUser() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    const userData = await response.json();
    console.log(`Username: ${userData.username}`);
    console.log(`Email: ${userData.email}`);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

fetchUser();

// Вправа 3: Виправлення помилки в асинхронних функціях

// Змініть функцію fetchUser для обробки помилок за допомогою try...catch.
async function fetchUser() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userData = await response.json();
    console.log(`Username: ${userData.username}`);
    console.log(`Email: ${userData.email}`);
  } catch (error) {
    if (
      error.name === "TypeError" &&
      error.message.includes("Failed to fetch")
    ) {
      console.error("Network error: unable to connect to API");
    } else {
      console.error("Error fetching user data:", error);
    }
  }
}

fetchUser();

// Якщо сталася помилка (наприклад, проблеми з мережею, недійсна URL-адреса), зареєструйте повідомлення про помилку у консолі.
async function fetchUser() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userData = await response.json();
    console.log(`Username: ${userData.username}`);
    console.log(`Email: ${userData.email}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

fetchUser();

// Вправа 4: Послідовні асинхронні операції

// Напишіть функцію fetchPostAndUser, яка:
// Отримує публікацію з API JSONPlaceholder (https://jsonplaceholder.typicode.com/posts/1).
// Використовує userId з публікації для отримання відповідних даних користувача.
// Запишіть назву публікації та ім’я користувача у консоль.
async function fetchPostAndUser() {
  try {
    const postResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    if (!postResponse.ok) {
      throw new Error(`HTTP error! status: ${postResponse.status}`);
    }
    const postData = await postResponse.json();
    const userId = postData.userId;
    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    if (!userResponse.ok) {
      throw new Error(`HTTP error! status: ${userResponse.status}`);
    }
    const userData = await userResponse.json();
    console.log(`Post title: ${postData.title}`);
    console.log(`Username: ${userData.username}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

fetchPostAndUser();

// Вправа 5: Одночасні асинхронні операції

// Напишіть функцію fetchMultipleUsers, яка:
// Одночасно отримує дані для користувачів з ідентифікаторами 1, 2 і 3 з JSONPlaceholder API.
// Використовуйте Promise.all, щоб дочекатися виконання всіх запитів і записати масив імен користувачів у консоль.

async function fetchMultipleUsers() {
  try {
    const userIds = [1, 2, 3];
    const promises = userIds.map((userId) =>
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    );
    const responses = await Promise.all(promises);
    const userNames = responses.map((response) =>
      response.json().then((userData) => userData.username)
    );
    const results = await Promise.all(userNames);
    console.log(results);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

fetchMultipleUsers();

// Вправа 6: ланцюжок промісів

// Напишіть функцію fetchData, яка:
// Отримує список дописів з JSONPlaceholder API (https://jsonplaceholder.typicode.com/posts).
// Використовує ідентифікатор першої публікації для отримання коментарів до цієї публікації (https://jsonplaceholder.typicode.com/comments?postId=1).
// Зареєструйте назву першої публікації та кількість коментарів до неї.

async function fetchData() {
  try {
    const postsResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    if (!postsResponse.ok) {
      throw new Error(`HTTP error! status: ${postsResponse.status}`);
    }
    const postsData = await postsResponse.json();
    const firstPostId = postsData[0].id;
    const commentsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${firstPostId}`
    );
    if (!commentsResponse.ok) {
      throw new Error(`HTTP error! status: ${commentsResponse.status}`);
    }
    const commentsData = await commentsResponse.json();
    console.log(`First post title: ${postsData[0].title}`);
    console.log(`Number of comments: ${commentsData.length}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

fetchData();
