<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Tree</h5>
        <Tree
          :value="treeValue"
          selectionMode="checkbox"
          v-model:selectionKeys="selectedTreeValue"
        ></Tree>
      </div>
    </div>
    <div class="col-12">
      <div class="card">
        <h5>TreeTable</h5>
        <TreeTable
          :value="treeTableValue"
          selectionMode="checkbox"
          v-model:selectionKeys="selectedTreeTableValue"
        >
          <template #header> FileSystem </template>
          <Column field="name" header="Name" :expander="true"></Column>
          <Column field="size" header="Size"></Column>
          <Column field="type" header="Type"></Column>
        </TreeTable>
      </div>
    </div>
  </div>
</template>

<script>
import NodeService from '@/service/NodeService'

export default {
  data() {
    return {
      treeValue: null,
      selectedTreeValue: null,
      treeTableValue: null,
      selectedTreeTableValue: null
    }
  },
  nodeService: null,
  created() {
    this.nodeService = new NodeService()
  },
  mounted() {
    this.nodeService.getTreeNodes().then((data) => (this.treeValue = data))
    this.nodeService
      .getTreeTableNodes()
      .then((data) => (this.treeTableValue = data))
  }
}
</script>
