import { defineStore } from "pinia";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export const useContactStore = defineStore("contact", {
  state: () => ({
    name: "",
    email: "",
    phone: "",
    message: "",
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
  },

  getters: {},
});
