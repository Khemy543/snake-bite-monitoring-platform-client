<template>
  <div>
    <div class="d-flex justify-content-between">
      <h4 slot="header" class="card-title">Victims</h4>
      <base-button
        native-type="button"
        type="primary"
        class="btn-fill"
        @click="issueProduct"
      >
        Issue Product
      </base-button>
    </div>
    <div class=" card p-4 mt-4">  
    <base-table :data="table" thead-classes="text-primary">
      <template slot="columns">
        <th>#</th>
        <th>Victim Name</th>
        <th>Product</th>
        <th>Quantity</th>
        <th>Issued by</th>
        <th>Date</th>
       <!--  <th class="text-right">Actions</th> -->
      </template>

      <template slot-scope="{ row, index }">
        <td>{{ index + 1 }}</td>
        <td>{{ row.victim_name }}</td>
        <td>{{ row.product_name}}</td>
        <td>{{ row.quantity_issued_out}}</td>
        <td>{{row.issued_by}}</td>
        <td>{{row.date_issued}}</td>
        <!-- <td class="text-right">
          <nuxt-link :to="`/victims/${row.id}/issue-product`">
          <el-tooltip
              content="Issue Product"
              effect="light"
              :open-delay="300"
              placement="top"
          >
              <base-button
              type="info"
              icon
              size="sm"
              class="btn-link"
              >
              <i class="tim-icons icon-upload"></i>
              </base-button>
          </el-tooltip>
          </nuxt-link>
          <el-tooltip
            content="Edit"
            effect="light"
            :open-delay="300"
            placement="top"
          >
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
              @click="DeleteVictim(row.id)"
            >
              <i class="tim-icons icon-simple-remove"></i>
            </base-button>
          </el-tooltip>
        </td> -->
      </template>
    </base-table>
    <div>
      <base-pagination 
        :pageCount="pagination.last_page" 
        :perPage="pagination.per_page" 
        :total="pagination.total">
      </base-pagination>
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
    const response = await $axios.get("view/issued-out/products");
    const { data, meta , links } = response.data
    return { 
        table: data,
        pagination : {
            per_page: meta.per_page,
            last_page : links.last_page,
            current_page : meta.current_page,
            next_page : links.next,
            first_page:links.first,
            last_page : meta.last_page,
            total : meta.total
        }
     };
  },
  data() {
    return {
      table: [],
      pagination : {}
    };
  },

  methods: {
    issueProduct(){
      this.$router.push('victims/new/issue-product')
    },
   
    DeleteVictim(id){
        this.$swal({
        title: "Delete Victim",
        text: "This Victim will be deleted",
        icon: "warning",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: "Delete",
        showLoaderOnConfirm: true,
        preConfirm: () => {
            let cancelBtn = document.getElementsByClassName("swal2-cancel")[0];
            cancelBtn.style.display = "none";

            return this.$axios.delete(`/delete/${id}/victim`)
            .then(response => {
                this.table = this.table.filter(item => item.id !== id);
                this.$notify({
                    type:'success',
                    message : 'Victim deleted successfully'
                })
            })
            .catch(error => {

            })
        }})

    }
  },
};
</script>