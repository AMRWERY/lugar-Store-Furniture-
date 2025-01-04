import { defineStore } from "pinia";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";

export const useCheckoutStore = defineStore("checkout", {
  state: () => ({
    orders: [],
    status: [],
    paginatedOrders: [],
    currentPage: 1,
    ordersPerPage: 5,
    totalCheckouts: 0,
    name: "",
    email: "",
    state: "",
    phoneNumber: "",
    address: "",
    date: "",
  }),

  actions: {
    async fetchStatus() {
      try {
        const querySnapshot = await getDocs(collection(db, "order-status"));
        this.status = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(this.orders);
        this.updatePagination();
        // await this.fetchTotalCheckouts();
      } catch (e) {
        console.error("Error fetching orders: ", e);
      }
    },

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
        await updateDoc(orderRef, { statusId: newStatus });
        const orderIndex = this.orders.findIndex(
          (order) => order.id === orderId
        );
        if (orderIndex !== -1) {
          this.orders[orderIndex].statusId = newStatus;
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

    async saveCheckoutData(cartData) {
      try {
        const orderId = this.generateOrderId();
        const currentDate = new Date().toLocaleDateString("en-CA");
        const order = {
          orderId: orderId,
          name: this.name,
          email: this.email,
          state: this.state,
          phoneNumber: this.phoneNumber,
          address: this.address,
          date: currentDate,
          statusId: "xLNExrzubgZl81mrerlw",
          cart: cartData,
        };
        const docRef = await addDoc(collection(db, "checkout"), order);
        // console.log("Checkout data saved with ID:", docRef.id);
      } catch (e) {
        console.error("Error adding document:", e);
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

    async deleteOrder(orderId) {
      if (!orderId) {
        return;
      }
      try {
        const docRef = doc(db, "checkout", orderId);
        await deleteDoc(docRef);
        this.orders = this.orders.filter((order) => order.orderId !== orderId);
        this.updatePagination();
      } catch (error) {
        console.error("Error removing from order:", error);
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
