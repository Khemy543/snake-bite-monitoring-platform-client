<template>
  <div>
    <div class="d-flex justify-content-between">
      <h4 slot="header" class="card-title">Facilities</h4>
      <base-button
        native-type="button"
        type="primary"
        class="btn-fill"
        @click="addFacility"
      >
        Add District
      </base-button>
    </div>
    <br/>
    <base-table :data="table" thead-classes="text-primary">
      <template slot="columns" slot-scope="{ columns }">
        <th>#</th>
        <th>Name of District</th>
        <th>Region</th>
        <th>Address of District health of directorate</th>
        <th class="text-right">Actions</th>
      </template>

      <template slot-scope="{ row, index }">
        <td>{{ index + 1 }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.region.name }}</td>
        <td>{{ row.address_of_district_health_directorate }}</td>
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
    const districts = await $axios.get("admin/fetch/district");
    console.log(districts.data)
    return { table: districts.data };
  },
  data() {
    return {
      table: [],
    };
  },

  methods: {
    addFacility() {
      this.$router.push("/district/add-district");
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