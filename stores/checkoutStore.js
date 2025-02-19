import {
  collection,
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
    fetchStatus() {
      const endpoint = "https://lugarstore.com/api/status/get_status_list.php";
      return $fetch(endpoint, { responseType: "json" })
        .then((response) => {
          const statusArray = Array.isArray(response)
            ? response
            : response.data;
          this.status = statusArray;
          this.updatePagination();
          return statusArray;
        })
        .catch((error) => {
          console.error("Error fetching status: ", error);
          throw error;
        });
    },

    fetchOrders() {
      const endpoint = "https://lugarstore.com/api/orders/get_orders.php";
      return $fetch(endpoint, { responseType: "json" })
        .then((response) => {
          const ordersArray = Array.isArray(response)
            ? response
            : response.data;
          this.orders = ordersArray;
          this.updatePagination();
          return this.fetchTotalCheckouts();
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          throw error;
        });
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

    saveCheckoutData(cartData) {
      const currentDate = new Date().toLocaleDateString("en-CA");
      const products = cartData.map((item) => ({
        productId: item.productId,
        qty: item.quantity,
      }));
      const order = {
        name: this.name,
        email: this.email,
        state: this.state,
        phoneNumber: this.phoneNumber,
        address: this.address,
        date: currentDate,
        statusId: "2",
        products: products,
      };
      const endpoint = "https://lugarstore.com/api/orders/create_order.php";
      return $fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: order,
        responseType: "json",
      })
        .then((response) => {
          console.log("Checkout data saved:", response);
          return response;
        })
        .catch((error) => {
          console.error("Error saving checkout data:", error);
          throw error;
        });
    },

    async fetchTotalCheckouts() {
      try {
        const querySnapshot = await getDocs(collection(db, "checkout"));
        this.totalCheckouts = querySnapshot.size;
        // console.log('orders', this.orders)
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
