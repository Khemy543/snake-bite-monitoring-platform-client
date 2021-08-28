<template>
  <div>
    <div class="d-flex justify-content-between">
      <h4 slot="header" class="card-title">Regions</h4>
      <base-button
        native-type="button"
        type="primary"
        class="btn-fill"
        @click="addFacilitators"
      >
        Add Facilitators
      </base-button>
    </div>
    <br/>
    <base-table :data="table" thead-classes="text-primary">
      <template slot="columns">
        <th>#</th>
        <th>Name</th>
        <th>Director General</th>
        <th>Address</th>
        <th>Regional Director</th>
        <th>Address</th>
        <th>Regional Minister</th>
        <th>Address</th>
        <th class="text-right">Actions</th>
      </template>

      <template slot-scope="{ row, index }">
        <td>{{ index + 1 }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.name_of_director_general }}</td>
        <td>{{ row.address_of_director_general }}</td>
        <td>{{ row.name_of_regional_health_director }}</td>
        <td>{{ row.address_of_regional_health_director }}</td>
        <td>{{ row.name_of_regional_minister }}</td>
        <td>{{ row.address_of_regional_minister }}</td>
        <td class="text-right">
          <el-tooltip
            content="Edit"
            effect="light"
            :open-delay="300"
            placement="top"
          >
          <nuxt-link :to="`/regions/${row.id}/edit-regions`">
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
</template>
<script>
import { BaseTable } from "@/components";
export default {
  components: {
    BaseTable,
  },
  async asyncData({ $axios }) {
    const regions = await $axios.get("admin/fetch/regions");
    return { table: regions.data };
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
    addFacilitators() {
      this.$router.push("/facilitators/add-facilitator");
    },
    DeleteRegion(id){
        this.$swal({
        title: "Delete Region",
        text: "This Region will be deleted",
        icon: "warning",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: "Delete",
        showLoaderOnConfirm: true,
        preConfirm: () => {
            let cancelBtn = document.getElementsByClassName("swal2-cancel")[0];
            cancelBtn.style.display = "none";

            return this.$axios.delete(`admin/delete/${id}/regions`)
            .then(response => {
                this.table = this.table.filter(item => item.id !== id);
                this.$notify({
                    type:'success',
                    message : 'Region deleted successfully'
                })
            })
            .catch(error => {

            })
        }})

    }
  },
};
</script>