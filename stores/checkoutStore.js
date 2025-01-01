import { defineStore } from "pinia";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";

export const useCheckoutStore = defineStore("checkout", {
  state: () => ({
    orders: [],
    paginatedOrders: [],
    currentPage: 1,
    ordersPerPage: 2,
    deliveryDetails: {
      name: "",
      email: "",
      country: "",
      province: "",
      phoneNumber: "",
    },
    paymentDetails: {
      fullNameOnCard: "",
      cardNumber: "",
      cardExpiration: "",
      cvv: "",
    },
    totalCheckouts: 0,
  }),

  actions: {
    async fetchOrders() {
      try {
        const querySnapshot = await getDocs(collection(db, "checkout"));
        this.orders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(this.orders);
        this.updatePagination();
        await this.fetchTotalCheckouts();
      } catch (e) {
        console.error("Error fetching orders: ", e);
      }
    },

    updatePagination() {
      this.paginatedOrders = this.orders.slice(
        (this.currentPage - 1) * this.ordersPerPage,
        this.currentPage * this.ordersPerPage
      );
    },

    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePagination();
      }
    },

    async updateOrderStatus(orderId, newStatus) {
      try {
        const orderRef = doc(collection(db, "checkout"), orderId);
        await updateDoc(orderRef, { status: newStatus });
        const orderIndex = this.orders.findIndex(
          (order) => order.id === orderId
        );
        if (orderIndex !== -1) {
          this.orders[orderIndex].status = newStatus;
        }
        this.updatePagination();
      } catch (error) {
        // console.error("Error updating order status:", error);
        throw error;
      }
    },

    generateOrderId() {
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 10000);
      return `ORDER-${timestamp}-${randomNum}`;
    },

    async saveCheckoutData() {
      try {
        const orderId = this.generateOrderId();
        const docRef = await addDoc(collection(db, "checkout"), {
          orderId: orderId,
          deliveryDetails: this.deliveryDetails,
          paymentDetails: this.paymentDetails,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },

    async fetchTotalCheckouts() {
      try {
        const querySnapshot = await getDocs(collection(db, "checkout"));
        this.totalCheckouts = querySnapshot.size;
      } catch (e) {
        console.error("Error fetching total checkouts: ", e);
      }
    },
  },

  getters: {
    getOrders(state) {
      return state.orders;
    },

    getDeliveryDetails(state) {
      return state.deliveryDetails;
    },

    getPaymentDetails(state) {
      return state.paymentDetails;
    },

    getTotalCheckouts(state) {
      return state.totalCheckouts;
    },

    totalPages() {
      return Math.ceil(this.orders.length / this.ordersPerPage);
    },
  },
});
