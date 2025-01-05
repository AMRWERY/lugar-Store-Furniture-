import { defineStore } from "pinia";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";

export const useContactStore = defineStore("contact", {
  state: () => ({
    name: "",
    email: "",
    phone: "",
    message: "",
    messages: [],
    paginatedMessages: [],
    currentPage: 1,
    messagesPerPage: 5,
  }),

  actions: {
    async submitForm(contactData) {
      const currentDate = new Date().toLocaleDateString("en-CA");
      try {
        await addDoc(collection(db, "contact-us"), {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          message: contactData.message,
          date: currentDate,
        });
      } catch (e) {
        console.log(e);
      } finally {
        console.log("Message saved");
      }
    },

    async fetchMessages() {
      try {
        const querySnapshot = await getDocs(collection(db, "contact-us"));
        const messages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.messages = messages;
        // console.log(messages);
        this.updatePagination();
      } catch (e) {
        console.log("Error fetching messages: ", e);
      }
    },

    updatePagination() {
      this.paginatedMessages = this.messages.slice(
        (this.currentPage - 1) * this.messagesPerPage,
        this.currentPage * this.messagesPerPage
      );
    },

    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePagination();
      }
    },

    async deleteMessage(messageId) {
      if (!messageId) {
        return;
      }
      try {
        const docRef = doc(db, "contact-us", messageId);
        await deleteDoc(docRef);
        this.messages = this.messages.filter(
          (message) => message.messageId !== messageId
        );
        this.updatePagination();
      } catch (error) {
        console.error("Error removing from message:", error);
      }
    },
  },

  getters: {
    allMessages: (state) => state.messages,
    totalPages() {
      return Math.ceil(this.messages.length / this.messagesPerPage);
    },
  },
});
