import { ref } from "vue";
import type { User } from "~/models/user";

export function useFollow() {
  const followedUsers = ref<{ [key: number]: boolean }>({});

  const follow = (currentUser: User, user: User) => {
    followedUsers.value[user.id] = true;
    currentUser.favorites.push(user.id);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    // window.alert("You have successfully followed the user!");
  };

  const unfollow = (currentUser: User, user: User) => {
    followedUsers.value[user.id] = false;
    const index = currentUser.favorites.indexOf(user.id);

    if (index > -1) {
      currentUser.favorites.splice(index, 1);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      // window.alert("You have successfully unfollowed the user!");
    }
  };

  const followClicked = (
    action: "follow" | "unfollow",
    currentUser: User,
    user: User
  ) => {
    if (action === "follow") {
      follow(currentUser, user);
    } else if (action === "unfollow") {
      unfollow(currentUser, user);
    }
  };

  const isFollowed = (userId: number) => {
    return followedUsers.value[userId] || false;
  };

  const initializeFollowStatus = (currentUser: User, user: User) => {
    followedUsers.value[user.id] = currentUser.favorites.includes(user.id);
  };

  return {
    isFollowed,
    followClicked,
    initializeFollowStatus,
  };
}


