<template>
  <div>
    <div class="d-flex justify-content-between">
      <h4 slot="header" class="card-title">Products</h4>
      <base-button
        native-type="button"
        type="primary"
        class="btn-fill"
        @click="addProduct"
      >
        Add Product
      </base-button>
    </div>
    <br/>

    <div class="card">
    <div class="row">
      <div class="col-md-12 p-4">
    <base-table :data="table" thead-classes="text-primary">
      <template slot="columns">
        <th>#</th>
        <th>Name</th>
        <th>Brand</th>
        <th>Source</th>
        <th>Quantity</th>
        <th>Expiry Date</th>
        <th class="text-right">Actions</th>
      </template>

      <template slot-scope="{ row, index }">
        <td>{{ index + 1 }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.brand }}</td>
        <td>{{ row.source }}</td>
        <td>{{ row.quantity }}</td>
        <td>{{ row.expiry_date }}</td>
        <td class="text-right">
          <el-tooltip
            content="Edit"
            effect="light"
            :open-delay="300"
            placement="top"
          >
          <nuxt-link :to="`/products/${row.id}/edit-product`">
            <base-button
              type="success"
              icon
              size="sm"
              class="btn-link"
            >
              <i class="tim-icons icon-pencil"></i>
            </base-button>
          </nuxt-link>
          </el-tooltip>
          <el-tooltip
            content="Delete"
            effect="light"
            :open-delay="300"
            placement="top"
          >
            <base-button
              type="danger"
              icon
              size="sm"
              class="btn-link"
              @click="DeleteRegion(row.id)"
            >
              <i class="tim-icons icon-simple-remove"></i>
            </base-button>
          </el-tooltip>
        </td>
      </template>
    </base-table>
    </div>
      </div>
    </div>
  </div>
</template>
<script>
import { BaseTable } from "@/components";
export default {
  components: {
    BaseTable,
  },
  async asyncData({ $axios }) {
    try {
      const regions = await $axios.get("fetch/products");
      if(regions){

        const { data, meta, links } = regions.data;
        return { table: data };

      }
      
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      table: [],
      modal: false,
    };
  },

  methods: {
    openModal() {
      this.modal = true;
    },
    addProduct() {
      this.$router.push("/products/add-product");
    },
    DeleteRegion(id){
        this.$swal({
        title: "Delete Product",
        text: "This Products will be deleted",
        icon: "warning",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: "Delete",
        showLoaderOnConfirm: true,
        preConfirm: () => {
            let cancelBtn = document.getElementsByClassName("swal2-cancel")[0];
            cancelBtn.style.display = "none";

            return this.$axios.delete(`delete/${id}/product`)
            .then(response => {
                this.table = this.table.filter(item => item.id !== id);
                this.$notify({
                    type:'success',
                    message : 'Products deleted successfully'
                })
            })
            .catch(error => {

            })
        }})

    }
  },
};
</script>