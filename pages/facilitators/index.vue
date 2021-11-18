<template>
  <div>
    <div class="d-flex justify-content-between">
      <h4 slot="header" class="card-title">Facilitators</h4>
    </div>
    <br/>
    <div class="card p-4">
    <base-table :data="table" thead-classes="text-primary">
      <template slot="columns">
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Facility</th>
        <th>Created At</th>
        <th>Status</th>
        <th class="text-right">Actions</th>
      </template>

      <template slot-scope="{ row, index }">
        <td>{{ index + 1 }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.email }}</td>
        <td>{{ row.phone }}</td>
        <td>{{ row.facility.name }}</td>
        <td>{{ row.created_at }}</td>
        <td>{{ row.active ? 'Active' : 'InActive' }}</td>
        <td class="text-right">
          <el-tooltip
            content="Edit"
            effect="light"
            :open-delay="300"
            placement="top"
          >
          <nuxt-link :to="`/facilitators/${row.id}/edit-facilitator`">
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
</template>
<script>
import { BaseTable } from "@/components";
export default {
  components: {
    BaseTable,
  },
  async asyncData({ $axios }) {
    const response = await $axios.get("admin/fetch/facilitators");
    const { data, meta, links } = response.data;
    return { table : data, meta:meta };
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