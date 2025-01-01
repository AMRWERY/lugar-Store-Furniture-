import { defineStore } from "pinia";
import { db } from "@/firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";

export const useUserStore = defineStore("users", {
  state: () => ({
    users: [],
    paginatedUsers: [],
    currentPage: 1,
    usersPerPage: 8,
  }),

  actions: {
    async fetchUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        this.users = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        this.users = this.users.filter(
          (user) => user.email !== "admin@cospora.com"
        );
        this.updatePagination();
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    updatePagination() {
      this.paginatedUsers = this.users.slice(
        (this.currentPage - 1) * this.usersPerPage,
        this.currentPage * this.usersPerPage
      );
    },

    async deleteUser(userId) {
      try {
        const docRef = doc(db, "users", userId);
        await deleteDoc(docRef);
        this.users = this.users.filter((user) => user.id !== userId);
        this.updatePagination();
        // console.log(`User with ID ${userId} deleted successfully.`);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },

    async blockUser(userId) {
      try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { isBlocked: true });

        const userIndex = this.users.findIndex((user) => user.id === userId);
        if (userIndex > -1) {
          this.users[userIndex].isBlocked = true;
        } else {
          console.warn("User not found in local store while blocking:", userId);
        }
        console.log(`User with ID ${userId} blocked successfully.`);
      } catch (error) {
        console.error("Failed to block user:", error);
      }
    },

    async toggleBlockUser(userId) {
      try {
        const userIndex = this.users.findIndex((user) => user.id === userId);
        if (userIndex > -1) {
          const user = this.users[userIndex];
          const newStatus = !user.isBlocked;
          const userRef = doc(db, "users", userId);
          await updateDoc(userRef, { isBlocked: newStatus });
          this.users[userIndex].isBlocked = newStatus;
          console.log(
            `User with ID ${userId} ${
              newStatus ? "blocked" : "unblocked"
            } successfully.`
          );
        } else {
          console.warn("User not found in local store:", userId);
        }
      } catch (error) {
        console.error("Failed to toggle block status for user:", error);
      }
    },

    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePagination();
      }
    },
  },

  getters: {
    totalPages() {
      return Math.ceil(this.users.length / this.usersPerPage);
    },

    totalCustomers() {
      return this.users.length;
    },
  },
});
