<template>
    <modal :show.sync="modal" :centered="true" body-classes="p-0">
      <card
        type="secondary"
        header-classes="bg-white pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0 mb-0"
      >
        <div>
          <form @submit.prevent="addProduct">
            <base-input
              type="text"
              label="Name of Product"
              placeholder="Enter Name of Product"
              v-model="form.name"
            >
            </base-input>

            <base-input
              type="text"
              label="Brand"
              placeholder="Enter Product Brand"
              v-model="form.brand"
            >
            </base-input>
            <base-input
              type="number"
              label="Quantity"
              placeholder="Quantity"
              v-model="form.quantity"
            >
            </base-input>
            <base-input
              type="text"
              label="Source"
              placeholder="Enter Product Source"
              v-model="form.source"
            >
            </base-input>
            <base-input
              type="date"
              label="Expiry Date"
              placeholder="Expiry Date"
              v-model="form.expiry_date"
            >
            </base-input>
            <base-input label="Description">
              <textarea
                class="form-control"
                id="description"
                rows="3"
                v-model="form.description"
              ></textarea>
            </base-input>

            <base-button native-type="submit" type="primary" class="btn-fill">
              Add Product
            </base-button>
          </form>
        </div>
        <template slot="footer">
          <base-button type="secondary" @click="modals.modal0 = false"
            >Close</base-button
          >
          <base-button type="primary">Save changes</base-button>
        </template>
      </card>
    </modal>
</template>

<script>
export default {
  components: {
    Modal: () => import("@/components/Modal.vue"),
  },

  data() {
    return {
      modal: true,
      loading: false,
      form: {
        name: "",
        brand: "",
        source: "",
        quantity: "",
        expiry_date: "",
        description: "",
      },
    };
  },
  methods : {
    addProduct(){
        this.loading = true; 
        this.$axios.$post('product/create',this.form)
        .then(response => {
            this.$notify({ type:'success', message : 'Product Created Successfully' });
            this.form = {
                name: "",
                brand : "",
                source : "",
                quantity : "",
                expiry_date : "",
                description : ""
            }
        })
        .catch(error => {
            this.$notify({ type : 'error', message : 'Error adding product, Please try again later' })
        })
        .finally((_) => this.loading = false)
    }
}
};
</script>

<style></style>
